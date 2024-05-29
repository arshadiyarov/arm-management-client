import styles from "./styles.module.scss";
import { IProps } from "./props";
import classNames from "classnames";

export const Textarea = (props: IProps) => {
  const {
    onChange,
    value,
    placeholder,
    isLoading = false,
    className,
    rows,
    cols,
    ...otherProps
  } = props;
  return (
    <textarea
      className={classNames(
        styles.content,
        isLoading && styles.loading,
        className,
      )}
      rows={rows}
      cols={cols}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...otherProps}
    />
  );
};
