"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
export const GlobalContext = createContext({});
export const useGlobalContext = () => {
  return useContext(GlobalContext) as IContextType;
};
export type IContextType = {
  userInfo: Partial<null | undefined>;
  userInfoLoading: boolean;
  refetch: boolean;
  setUserInfoLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setLang: React.Dispatch<
    React.SetStateAction<{ isLoading?: boolean; lng?: string }>
  >;
  lang: { isLoading?: boolean; lng?: string };
};
export default function GlobalContextApi({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}
