"use client";

import { message } from "antd";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { IGenericErrorResponse } from "../../types/common";

import { useAppSelector } from "../../redux/hooks";
import { getSocketBaseUrl } from "../../helpers/config/envConfig";

export const SocketContext = createContext({});

export const useSocket = () => {
  return useContext(SocketContext) as {
    socket: Socket;
    socketLoading: boolean;
    error: Partial<IGenericErrorResponse>;
  };
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const [socketLoading, setLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>(undefined);

  useEffect(() => {
    setLoading(true);
    const socketStore = io(`${getSocketBaseUrl}`, {
      extraHeaders: { authorization: token as string },
      // auth: { accessToken: getFromLocalStorage(authKey) as string },
      //backend--> socket.handshake.headers.authorization; //socket.handshake.auth.token;
      reconnectionDelayMax: 2000,
      query: {
        "my-key": "my-value",
      },
    });

    socketStore.on("connection", (data, callback) => {
      setSocket(socketStore);
      message.success(data.message);
      callback({
        success: true,
        message: "client connection successfully established",
      });
    });
    socketStore.on(`notification::${user?.userId}`, (data, callback) => {
      message.success(data?.message);
    });

    socketStore.on("error", (data) => {
      console.log("🚀 ~ socketStore.on ~ data:", data);
      if (data && data.message) {
        message.error(data.message);
      } else {
        message.error("An error occurred on the server");
      }
    });
    setLoading(false);
    return () => {
      socketStore.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, socketLoading }}>
      {children}
    </SocketContext.Provider>
  );
};
