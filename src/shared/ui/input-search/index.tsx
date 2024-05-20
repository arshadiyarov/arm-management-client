import styles from "./styles.module.scss";
import { IProps } from "./props";
import classNames from "classnames";

export const InputSearch = (props: IProps) => {
  const {
    clearSearchValue,
    value,
    placeholder,
    onChange,
    type = "text",
    className,
    ...otherProps
  } = props;

  return (
    <label htmlFor="search" className={styles.content}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="20px"
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <path
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="32"
          d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64z"
        ></path>
        <path
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="32"
          d="M338.29 338.29 448 448"
        ></path>
      </svg>
      <input
        id="search"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classNames(styles.input, className)}
        {...otherProps}
      />
      {value && (
        <button className={styles.close} onClick={clearSearchValue}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M368 368 144 144m224 0L144 368"
            ></path>
          </svg>
        </button>
      )}
    </label>
  );
};
