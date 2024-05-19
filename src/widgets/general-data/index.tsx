import styles from "./styles.module.scss";
import { IProps } from "./props";
import {
  actionTypeToString,
  convertTimestampToDate,
  convertTimestampToTime,
  truncateString,
} from "shared";
import Skeleton from "react-loading-skeleton";

export const GeneralData = ({
  historyData,
  toggleReadMoreModal,
  isLoading,
}: IProps) => {
  const shouldExtraInfoConcat = () => {
    if (historyData.extra_info) {
      return historyData.extra_info?.length > 20;
    }
    return false;
  };

  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <p>General data</p>
      </div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.left_inner}>
            <p>User:</p>
            <p>Buyer:</p>
            <p>Info:</p>
          </div>
          <div className={styles.right_inner}>
            {isLoading ? (
              <>
                <Skeleton className={styles.skeleton} />
                <Skeleton className={styles.skeleton} />
                <Skeleton className={styles.skeleton} />
              </>
            ) : (
              <>
                <p>{historyData.username}</p>
                {historyData.buyer ? (
                  <p>{historyData.buyer}</p>
                ) : (
                  <p className={styles.empty}>Empty</p>
                )}
                {historyData.extra_info ? (
                  <p>
                    {truncateString(historyData.extra_info)}
                    {shouldExtraInfoConcat() && (
                      <button
                        className={styles.readMore}
                        onClick={toggleReadMoreModal}
                      >
                        Read more
                      </button>
                    )}
                  </p>
                ) : (
                  <p className={styles.empty}>Empty</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.left_inner}>
            <p>Time:</p>
            <p>Date:</p>
            <p>Action:</p>
          </div>
          <div className={styles.right_inner}>
            {isLoading ? (
              <>
                <Skeleton className={styles.skeleton} />
                <Skeleton className={styles.skeleton} />
                <Skeleton className={styles.skeleton} />
              </>
            ) : (
              <>
                <p>{convertTimestampToTime(historyData.timestamp)}</p>
                <p>{convertTimestampToDate(historyData.timestamp)}</p>
                <p>{actionTypeToString(historyData.history_type)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
