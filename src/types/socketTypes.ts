import { Socket } from 'socket.io-client';
export enum ENUM_SOCKET_EMIT_ON_TYPE {
  SERVER_TO_CLIENT_PERSONAL_MESSAGE = 'server_to_client_personal_message', //friendShipId
  CLIENT_TO_SERVER_PERSONAL_MESSAGE = 'client_to_server_personal_message', // not needed any id because any person sending data and data in all information-- then server checking and accepted
  ONLINE_OFFLINE_USER = 'online_offline_user:', //friendId
  LATEST_FRIEND = 'latest_friend',
}

//!-- socket.on
// server to get(on) any event by client
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  //
  connection: (data: Record<string, any>) => void;
  message: (data: Record<string, any>) => void;
  //
  [ENUM_SOCKET_EMIT_ON_TYPE.SERVER_TO_CLIENT_PERSONAL_MESSAGE]: (
    data: Record<string, any>,
  ) => void;
  [ENUM_SOCKET_EMIT_ON_TYPE.ONLINE_OFFLINE_USER]: (
    data: Record<string, any>,
  ) => void;
  //
  'notification_role_base::': (data: Record<string, any>) => void;
  'notification::': (data: Record<string, any>) => void;
  error: (err: Error) => void;
}

//!--emit--
//send emit client to server
interface ClientToServerEvents {
  hello: () => void;
  //
  [ENUM_SOCKET_EMIT_ON_TYPE.CLIENT_TO_SERVER_PERSONAL_MESSAGE]: (
    props: Record<string, any>,
    callback: (e: Record<string, any>) => void,
  ) => void;
  sendJoinRoom: (props: Record<string, any>) => void;
  message: (props: string) => void;
}

// export type ISocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
export type ISocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
