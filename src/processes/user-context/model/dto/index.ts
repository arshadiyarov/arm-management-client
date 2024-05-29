import { RoleType } from "shared";

export interface IDto {
  id: number;
  username: string;
  password: string;
  role: RoleType;
}
