"use client";

import styles from "./styles.module.scss";
import { Button } from "shared";
import { FormEvent, useEffect, useState } from "react";
import { PayloadModel } from "../model";
import { postLogin } from "../api";
import { useRouter } from "next/navigation";
import { useAuth } from "processes";
import classNames from "classnames";

export const LoginForm = () => {
  const { login } = useAuth();
  const [payload, setPayload] = useState<PayloadModel>({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const router = useRouter();

  const handleChange = (key: keyof PayloadModel, val: string) => {
    setError(false);
    setPayload((prevState) => ({ ...prevState, [key]: val }));
  };

  const handleClear = (key: keyof PayloadModel) => {
    setError(false);
    setPayload((prevState) => ({ ...prevState, [key]: "" }));
  };

  const fetchLogin = async () => {
    setIsLoading(true);
    try {
      const res = await postLogin(payload);
      login(res.access_token);
      setIsLoading(false);
      setError(false);
      setSuccess(true);
      router.push("/");
    } catch (err) {
      setIsLoading(false);
      setSuccess(false);
      setPayload((prevState) => ({ ...prevState, password: "" }));
      setError(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchLogin();
  };

  const handlePasswordShow = () => {
    setIsPasswordShown((prevState) => !prevState);
  };

  useEffect(() => {
    const allElements = document.querySelectorAll("*");

    if (isLoading) {
      allElements.forEach((el) => {
        (el as HTMLElement).style.cursor = "progress";
      });
    } else {
      allElements.forEach((el) => {
        (el as HTMLElement).style.cursor = "";
      });
    }

    return () => {
      allElements.forEach((el) => {
        (el as HTMLElement).style.cursor = "";
      });
    };
  }, [isLoading]);

  return (
    <form
      className={classNames(
        styles.form,
        isLoading && styles.loading,
        error && styles.error,
        success && styles.success,
      )}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputs}>
        <label htmlFor="username" className={styles.label}>
          <p>Username</p>
          <div
            className={classNames(
              styles.input,
              styles.username,
              isLoading && styles.loading,
              error && styles.error,
              success && styles.success,
            )}
          >
            <input
              id={"username"}
              disabled={isLoading || success}
              required
              value={payload.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
            {success ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className={styles.successIcon}
              >
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M352 176L217.6 336 160 272"
                ></path>
              </svg>
            ) : (
              !isLoading && (
                <div className={styles.options}>
                  {payload.username && (
                    <label
                      htmlFor="username"
                      onClick={() => handleClear("username")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="none"
                          strokeMiterlimit="10"
                          strokeWidth="32"
                          d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                        ></path>
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                          d="M320 320L192 192m0 128l128-128"
                        ></path>
                      </svg>
                    </label>
                  )}
                </div>
              )
            )}
          </div>
        </label>
        <label className={styles.label}>
          <p>Password</p>
          <div
            className={classNames(
              styles.input,
              styles.password,
              isLoading && styles.loading,
              error && styles.error,
              success && styles.success,
            )}
          >
            <input
              type={isPasswordShown ? "text" : "password"}
              id="password"
              disabled={isLoading || success}
              required
              value={payload.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {success ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className={styles.successIcon}
              >
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M352 176L217.6 336 160 272"
                ></path>
              </svg>
            ) : (
              !isLoading && (
                <div className={styles.options}>
                  {payload.password && (
                    <label
                      htmlFor="password"
                      onClick={() => handleClear("password")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="none"
                          strokeMiterlimit="10"
                          strokeWidth="32"
                          d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                        ></path>
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                          d="M320 320L192 192m0 128l128-128"
                        ></path>
                      </svg>
                    </label>
                  )}
                  <label htmlFor="password" onClick={handlePasswordShow}>
                    {isPasswordShown ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                      >
                        <path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zm-176.34-64c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zm235.18-145.4c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z"></path>
                        <path d="M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zm-90.22 73.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                          d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
                        ></path>
                        <circle
                          cx="256"
                          cy="256"
                          r="80"
                          fill="none"
                          strokeMiterlimit="10"
                          strokeWidth="32"
                        ></circle>
                      </svg>
                    )}
                  </label>
                </div>
              )
            )}
          </div>
        </label>
        {error && (
          <p className={styles.errorMsg}>Incorrect username or password</p>
        )}
      </div>
      <Button disabled={isLoading || success} type="submit">
        Sign in
      </Button>
    </form>
  );
};
