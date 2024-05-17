"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Header, Navbar } from "widgets";
import { PropsWithChildren } from "react";
import { AuthProvider } from "processes";
import { usePathname } from "next/navigation";

const excludedPaths = ["/login"];

export const AppContainer = ({ children }: PropsWithChildren<IProps>) => {
  const pathname = usePathname();

  const displayContent = (path: string) => {
    if (!excludedPaths.includes(path)) {
      return (
        <div className={styles.content}>
          <Navbar />
          <div className={styles.main}>
            <Header />
            {children}
          </div>
        </div>
      );
    } else {
      return children;
    }
  };

  return <AuthProvider>{displayContent(pathname)}</AuthProvider>;
};
