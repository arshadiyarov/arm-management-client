import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { SizeType, ModeType } from "shared";

export interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: SizeType;
  mode?: ModeType;
}
