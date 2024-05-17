import styles from "./styles.module.scss";
import { IProps } from "./props";
import { LoginForm } from "features";

const Login = (props: IProps) => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <h1>Account login</h1>
        </div>
        <div className={styles.body}>
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default Login;
