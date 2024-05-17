import { PayloadModel } from "../model";
import { IDto } from "../model";
import { postAsync } from "shared";

export const postLogin = async (body: PayloadModel): Promise<IDto> =>
  postAsync<any>("/login", body);
