import styles from "./styles.module.scss";
import { IProps } from "./props";

export const LimitOptions = ({ limitChange }: IProps) => {
  return (
    <select
      className={styles.content}
      onChange={(e) => limitChange(e.target.value)}
    >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  );
};
