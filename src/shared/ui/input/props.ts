import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";

export interface IProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
