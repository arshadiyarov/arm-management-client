import styles from "./styles.module.scss";
import { LoginForm } from "features";

const Login = () => {
  return (
    <main className={styles.container}>
      <div className={styles.img}>
        <img src="/img/login-bg.png" alt="login-bg" />
      </div>
      <div className={styles.content}>
        <div className={styles.login}>
          <div className={styles.top}>
            <h1>Nice to see you again</h1>
          </div>
          <div className={styles.body}>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
