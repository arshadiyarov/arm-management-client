import styles from "./styles.module.scss";
import { IProps } from "./props";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export const Button = (props: PropsWithChildren<IProps>) => {
  const {
    children,
    size = "sm",
    mode = "primary",
    className,
    onClick,
    type,
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        styles.button,
        styles[mode],
        styles[size],
        className,
      )}
    >
      {children}
    </button>
  );
};
