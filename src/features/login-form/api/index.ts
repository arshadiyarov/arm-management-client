import { PayloadModel } from "../model";
import { IDto } from "../model";
import { postAsync, postAsyncDev } from "shared";

export const postLogin = async (body: PayloadModel): Promise<IDto> =>
  postAsync<any>("/login", body);

export const postLoginDev = async (body: PayloadModel): Promise<IDto> =>
  postAsyncDev<any>("/login", body);
