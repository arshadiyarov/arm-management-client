import styles from "./styles.module.scss";
import { IProps } from "./props";
import classNames from "classnames";

export const Input = (props: IProps) => {
  const {
    onChange,
    value,
    placeholder,
    type,
    isLoading = false,
    className,
    ...otherProps
  } = props;
  return (
    <input
      className={classNames(
        styles.input,
        isLoading && styles.loading,
        className,
      )}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...otherProps}
    />
  );
};
