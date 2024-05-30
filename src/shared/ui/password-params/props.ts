export interface IProps {
  success: boolean;
  isLoading: boolean;
  passwords: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  isPasswordShown: boolean;
  handleClear: (key: keyof PasswordsType) => void;
  handlePasswordShow: (key: keyof PasswordsType) => void;
  passwordType: "oldPassword" | "newPassword" | "confirmPassword";
}

type PasswordsType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
