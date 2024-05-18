import styles from "./styles.module.scss";
import { IProps } from "./props";
import {
  actionTypeToString,
  Button,
  convertTimestampToDate,
  convertTimestampToTime,
  truncateString,
} from "shared";

export const GeneralData = ({ historyData, toggleReadMoreModal }: IProps) => {
  const shouldExtraInfoConcat = () => {
    if (historyData.extra_info) {
      return historyData.extra_info?.length > 40;
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
            <p>Action taken:</p>
            <p>Buyer:</p>
            <p>Additional info:</p>
          </div>
          <div className={styles.right_inner}>
            <span>{historyData.username}</span>
            {historyData.buyer ? (
              <span>{historyData.buyer}</span>
            ) : (
              <span className="text-gray">Empty</span>
            )}
            {historyData.extra_info ? (
              <span>
                {truncateString(historyData.extra_info)}
                {shouldExtraInfoConcat() && (
                  <>
                    ...
                    <button
                      className={styles.readMore}
                      onClick={toggleReadMoreModal}
                    >
                      Read more
                    </button>
                  </>
                )}
              </span>
            ) : (
              <span className="text-gray">Empty</span>
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
            <span>{convertTimestampToTime(historyData.timestamp)}</span>
            <span>{convertTimestampToDate(historyData.timestamp)}</span>
            <span>{actionTypeToString(historyData.history_type)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
