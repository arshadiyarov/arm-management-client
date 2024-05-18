"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Header, Navbar } from "widgets";
import { PropsWithChildren, useState } from "react";
import { AuthProvider } from "processes";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const excludedPaths = ["/login"];

export const AppContainer = ({ children }: PropsWithChildren<IProps>) => {
  const pathname = usePathname();
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  const handleToggleNav = () => {
    setIsNavExpanded((prevState) => !prevState);
  };

  const displayContent = (path: string) => {
    if (!excludedPaths.includes(path)) {
      return (
        <div className={styles.content}>
          <Navbar isNavExpanded={isNavExpanded} toggleNav={handleToggleNav} />
          <div
            className={classNames(
              styles.main,
              isNavExpanded && styles.expanded,
            )}
          >
            <Header isNavExpanded={isNavExpanded} />
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
