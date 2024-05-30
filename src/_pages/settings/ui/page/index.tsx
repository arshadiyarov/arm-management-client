"use client";

import styles from "./styles.module.scss";
import {
  Button,
  Description,
  Input,
  RequiredStar,
  TokenStorageHelper,
} from "shared";
import { FormEvent, useEffect, useState } from "react";
import { PasswordParams } from "shared/ui/password-params";
import classNames from "classnames";
import { PasswordInfo } from "shared/ui/password-info";
import { AuthRequired } from "processes";
import { postPasswordChange } from "_pages/settings/api";
import { useRouter } from "next/navigation";

type PasswordsType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ValidationType = {
  length: boolean;
  number: boolean;
  symbol: boolean;
  uppercase: boolean;
};

const Settings = () => {
  const token = TokenStorageHelper.getToken();
  const router = useRouter();
  const [passwords, setPasswords] = useState<PasswordsType>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [validation, setValidation] = useState<ValidationType>({
    length: false,
    number: false,
    symbol: false,
    uppercase: false,
  });
  const [equalsToOldPassword, setEqualsToOldPassword] = useState(false);
  const [equalsToConfirmPassword, setEqualsToConfirmPassword] = useState(true);
  const [isValidOldPassword, setIsValidOldPassword] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const convertPasswordStrength = (pass: number) => {
    switch (pass) {
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Medium";
      case 4:
        return "Strong";
    }
  };

  const handlePasswordsChange = (key: keyof PasswordsType, val: string) => {
    setPasswords((prevState) => ({ ...prevState, [key]: val }));
  };

  const handleClear = (key: keyof PasswordsType) => {
    setPasswords((prevState) => ({ ...prevState, [key]: "" }));
  };

  const handlePasswordShow = (key: keyof PasswordsType) => {
    setIsPasswordShown((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleValidationCheck = () => {
    const { newPassword, confirmPassword } = passwords;

    const newValidation = {
      length: newPassword.length > 7,
      number: /\d/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      symbol: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(newPassword),
    };

    setValidation(newValidation);

    const validCriteriaCount =
      Object.values(newValidation).filter(Boolean).length;
    setPasswordStrength(validCriteriaCount);
  };

  const checkOldAndNew = (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    if (oldPassword.length === 0 || newPassword.length === 0) {
      return;
    }

    const isSameAsOld = newPassword === oldPassword;

    const isConfirmMatch = confirmPassword === newPassword;

    setEqualsToOldPassword(isSameAsOld);
    setEqualsToConfirmPassword(isConfirmMatch);
  };

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await postPasswordChange(token, {
        old_password: passwords.oldPassword,
        new_password: passwords.newPassword,
      });
      setIsLoading(false);
      setSuccess(true);
      setPasswords((prevState) => ({
        ...prevState,
        newPassword: "",
        oldPassword: "",
        confirmPassword: "",
      }));
      setEqualsToOldPassword(false);
      setEqualsToConfirmPassword(false);
      router.push("/");
    } catch (err) {
      setIsLoading(false);
      setSuccess(false);
      setIsValidOldPassword(false);
      throw err;
    }
  };

  useEffect(() => {
    handleValidationCheck();
  }, [passwords.newPassword, passwords.confirmPassword]);

  useEffect(() => {
    checkOldAndNew(
      passwords.oldPassword,
      passwords.newPassword,
      passwords.confirmPassword,
    );
  }, [passwords.newPassword, passwords.oldPassword, passwords.confirmPassword]);

  return (
    <AuthRequired>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <Description
              title={"Settings"}
              description={"Here you can change your password."}
            />
          </div>
          <div className={styles.body}>
            <form
              className={classNames(styles.form, success && styles.success)}
              onSubmit={handlePasswordChange}
            >
              <div className={styles.inputs}>
                <label className={styles.label} htmlFor="oldPassword">
                  <p>
                    Old Password
                    <RequiredStar />
                  </p>
                  <Input
                    id={"oldPassword"}
                    type={isPasswordShown.oldPassword ? "text" : "password"}
                    required
                    disabled={isLoading || success}
                    value={passwords.oldPassword}
                    onChange={(e) => {
                      setIsValidOldPassword(true);
                      handlePasswordsChange("oldPassword", e.target.value);
                    }}
                    className={classNames(!isValidOldPassword && styles.error)}
                  />
                  <PasswordParams
                    success={success}
                    isLoading={isLoading}
                    passwords={passwords}
                    isPasswordShown={isPasswordShown.oldPassword}
                    handleClear={handleClear}
                    handlePasswordShow={handlePasswordShow}
                    passwordType={"oldPassword"}
                  />
                </label>
                <label className={styles.label} htmlFor="newPassword">
                  <p>
                    New Password
                    <RequiredStar />
                  </p>
                  <Input
                    id={"newPassword"}
                    disabled={isLoading || success}
                    type={isPasswordShown.newPassword ? "text" : "password"}
                    required
                    value={passwords.newPassword}
                    onChange={(e) =>
                      handlePasswordsChange("newPassword", e.target.value)
                    }
                    className={classNames(equalsToOldPassword && styles.error)}
                  />
                  <PasswordParams
                    success={success}
                    isLoading={isLoading}
                    passwords={passwords}
                    isPasswordShown={isPasswordShown.newPassword}
                    handleClear={handleClear}
                    handlePasswordShow={handlePasswordShow}
                    passwordType={"newPassword"}
                  />
                </label>
                <label className={styles.label} htmlFor="confirmPassword">
                  <p>
                    Confirm New Password
                    <RequiredStar />
                  </p>
                  <Input
                    id={"confirmPassword"}
                    disabled={isLoading || success}
                    type={isPasswordShown.confirmPassword ? "text" : "password"}
                    required
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      handlePasswordsChange("confirmPassword", e.target.value)
                    }
                    className={classNames(
                      !equalsToConfirmPassword && styles.error,
                    )}
                  />
                  <PasswordParams
                    success={success}
                    isLoading={isLoading}
                    passwords={passwords}
                    isPasswordShown={isPasswordShown.confirmPassword}
                    handleClear={handleClear}
                    handlePasswordShow={handlePasswordShow}
                    passwordType={"confirmPassword"}
                  />
                </label>
                <div className={styles.bottom}>
                  <div className={styles.strength}>
                    <div
                      className={classNames(
                        styles.step,
                        passwordStrength > 0 && styles.weak,
                      )}
                    />
                    <div
                      className={classNames(
                        styles.step,
                        passwordStrength > 1 && styles.medium,
                      )}
                    />
                    <div
                      className={classNames(
                        styles.step,
                        passwordStrength > 3 && styles.strong,
                      )}
                    />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.infoTop}>
                      {passwordStrength > 0 &&
                        `${convertPasswordStrength(passwordStrength)} password. `}
                      Should contain:
                    </p>
                    <PasswordInfo
                      number={validation.number}
                      length={validation.length}
                      uppercase={validation.uppercase}
                      symbol={validation.symbol}
                    />
                  </div>
                </div>
              </div>
              <Button disabled={isLoading || success} size="md">
                Confirm
              </Button>
            </form>
          </div>
        </div>
      </main>
    </AuthRequired>
  );
};

export default Settings;
