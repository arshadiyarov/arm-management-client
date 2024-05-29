"use client";

import { IProps } from "./props";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "processes";
import { useRouter } from "next/navigation";
import { TokenStorageHelper } from "shared";

export const AuthRequired = ({ children }: PropsWithChildren<IProps>) => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      logout();
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return children;
};
