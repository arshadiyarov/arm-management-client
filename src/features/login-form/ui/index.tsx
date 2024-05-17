"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Button, Input } from "shared";
import { FormEvent, useState } from "react";
import { PayloadModel } from "../model";
import { postLogin } from "../api";
import { useRouter } from "next/navigation";
import { useAuth } from "processes";

export const LoginForm = (props: IProps) => {
  const { login } = useAuth();
  const [payload, setPayload] = useState<PayloadModel>({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (key: keyof PayloadModel, val: string) => {
    setPayload((prevState) => ({ ...prevState, [key]: val }));
  };

  const fetchLogin = async () => {
    try {
      const res = await postLogin(payload);
      console.log(res);
      login(res.access_token);
      setError(false);
      router.push("/");
    } catch (err) {
      setError(true);
      console.error("Login error:", err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchLogin();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <p>
          <label htmlFor="username">Username</label>
          <Input
            id={"username"}
            placeholder={"Enter username"}
            value={payload.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="username">Password</label>
          <Input
            type={"password"}
            id={"password"}
            placeholder={"Enter password"}
            value={payload.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </p>
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};
