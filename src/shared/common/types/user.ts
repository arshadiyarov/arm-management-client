export type UserType = {
  id: number;
  username: string;
  password: string;
  role: RoleType;
};

export type RoleType = "admin" | "manager";
