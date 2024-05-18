import styles from "./styles.module.scss";
import { IProps } from "./props";
import {
  actionTypeToString,
  convertTimestampToDate,
  convertTimestampToTime,
} from "shared";

export const GeneralData = ({ historyData }: IProps) => {
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
              <span>{historyData.extra_info}</span>
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
