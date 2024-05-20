import styles from "./styles.module.scss";
import { IProps } from "./props";
import classNames from "classnames";
import { CURRENCY } from "shared";
import Skeleton from "react-loading-skeleton";

export const InfoCard = ({
  title,
  value,
  withCurrency = false,
  isLoading = true,
}: IProps) => {
  return (
    <div className={classNames(styles.content, "space-y-3")}>
      <p className={styles.title}>{title}</p>
      {isLoading ? (
        <Skeleton className={styles.skeleton} />
      ) : (
        value && (
          <p className={styles.value}>
            {value.toLocaleString()}
            {withCurrency && CURRENCY}
          </p>
        )
      )}
    </div>
  );
};
