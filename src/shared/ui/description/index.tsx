import styles from "./styles.module.scss";
import { IProps } from "./props";

export const Description = ({ title, description }: IProps) => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
