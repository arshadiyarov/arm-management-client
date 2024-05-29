"use client";

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { TokenStorageHelper, UserType } from "shared";
import { IProps } from "./props";
import { getMe } from "./api";
import { useRouter } from "next/navigation";

export const UserContext = createContext<UserType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren<IProps>) => {
  const token = TokenStorageHelper.getToken();
  const router = useRouter();
  const [userData, setUserData] = useState<UserType | null>(null);

  const fetchMe = async () => {
    if (token) {
      try {
        const res = await getMe(token);
        setUserData(res);
      } catch (err) {
        throw err;
      }
    } else {
      TokenStorageHelper.removeToken();
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchMe();
  }, [token]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
