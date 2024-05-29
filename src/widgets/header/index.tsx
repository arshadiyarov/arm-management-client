"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Button } from "shared";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { RetailSaleModal, WholesaleModal } from "features";
import { UserContext } from "processes";

export const Header = ({ isNavExpanded }: IProps) => {
  const [isWholeSaleModalActive, setIsWholeSaleModalActive] = useState(false);
  const [isRetailSaleModalActive, setIsRetailSaleModalActive] = useState(false);
  const userData = useContext(UserContext);

  const handleToggleWholeSaleModal = () => {
    setIsWholeSaleModalActive((prevState) => !prevState);
  };

  const handleToggleRetailSaleModal = () => {
    setIsRetailSaleModalActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (isWholeSaleModalActive || isRetailSaleModalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isWholeSaleModalActive, isRetailSaleModalActive]);

  return (
    <>
      <header
        className={classNames(
          styles.container,
          isNavExpanded && styles.expanded,
        )}
      >
        <div className={styles.content}>
          <p>Greetings, {userData?.username}</p>
          <div className={styles.buttons}>
            <Button mode={"secondary"} onClick={handleToggleWholeSaleModal}>
              Wholesale
            </Button>
            <Button mode={"secondary"} onClick={handleToggleRetailSaleModal}>
              Retail sale
            </Button>
          </div>
        </div>
      </header>
      {isWholeSaleModalActive && (
        <WholesaleModal toggleModal={handleToggleWholeSaleModal} />
      )}
      {isRetailSaleModalActive && (
        <RetailSaleModal toggleModal={handleToggleRetailSaleModal} />
      )}
    </>
  );
};
