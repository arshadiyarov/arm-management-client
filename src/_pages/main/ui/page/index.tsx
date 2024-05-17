"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import { AuthRequired, useAuth } from "processes";

const Main = (props: IProps) => {
  const { logout } = useAuth();

  return (
    <AuthRequired>
      <main>Main</main>
    </AuthRequired>
  );
};

export default Main;
