import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { SizeType, ButtonModeType } from "shared";

export interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: SizeType;
  mode?: ButtonModeType;
  uppercase?: boolean;
}
