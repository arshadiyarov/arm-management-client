import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Button, convertTimestampToDate, convertTimestampToTime } from "shared";
import classNames from "classnames";
import { useEffect, useState } from "react";

export const Header = ({ isNavExpanded }: IProps) => {
  return (
    <header
      className={classNames(styles.container, isNavExpanded && styles.expanded)}
    >
      <div className={styles.content}>
        <p>Greetings, guest</p>
        <div className={styles.buttons}>
          <Button mode={"secondary"}>Wholesale</Button>
          <Button mode={"secondary"}>Retail sale</Button>
        </div>
      </div>
    </header>
  );
};
