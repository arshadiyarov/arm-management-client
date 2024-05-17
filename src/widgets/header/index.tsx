import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Button } from "shared";

export const Header = (props: IProps) => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <p>Greetings, guest</p>
        <div className={styles.buttons}>
          <Button mode={"secondary"}>Wholesale</Button>
          <Button mode={"secondary"}>Retail sale</Button>
        </div>
      </div>
    </header>
  );
};
