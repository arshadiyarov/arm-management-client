"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Header, Navbar } from "widgets";
import { PropsWithChildren, useEffect, useState } from "react";
import { AuthProvider } from "processes";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { CreateProductsModal } from "features";

const excludedPaths = ["/login"];

export const AppContainer = ({ children }: PropsWithChildren<IProps>) => {
  const pathname = usePathname();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);

  const handleToggleCreateModal = () => {
    setIsCreateModalActive((prevState) => !prevState);
  };

  const handleToggleNav = () => {
    setIsNavExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    if (isCreateModalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCreateModalActive]);

  const displayContent = (path: string) => {
    if (!excludedPaths.includes(path)) {
      return (
        <div className={styles.content}>
          <Navbar
            isCreateModalActive={isCreateModalActive}
            toggleCreateModal={handleToggleCreateModal}
            isNavExpanded={isNavExpanded}
            toggleNav={handleToggleNav}
          />
          <div
            className={classNames(
              styles.main,
              isNavExpanded && styles.expanded,
            )}
          >
            <Header isNavExpanded={isNavExpanded} />
            {children}
          </div>
          {isCreateModalActive && (
            <CreateProductsModal toggleModal={handleToggleCreateModal} />
          )}
        </div>
      );
    } else {
      return children;
    }
  };

  return <AuthProvider>{displayContent(pathname)}</AuthProvider>;
};
