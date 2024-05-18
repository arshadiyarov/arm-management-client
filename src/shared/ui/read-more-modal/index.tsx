import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Button } from "shared";
import classNames from "classnames";

export const ReadMoreModal = ({ val, toggleModal }: IProps) => {
  return (
    <div className={styles.container} onClick={toggleModal}>
      <div
        className={classNames(styles.content, "space-y-3")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.top}>
          <p className={styles.title}>Additional info</p>
          <Button
            size="sm"
            mode="icon"
            className={styles.close}
            onClick={toggleModal}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="24px"
              width="24px"
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
          </Button>
        </div>
        <p className={styles.body}>{val}</p>
      </div>
    </div>
  );
};
