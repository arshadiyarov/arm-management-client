import { getAsync, getAsyncDev } from "shared";
import { IDto } from "../model/dto";

export const getMe = async (token: string): Promise<IDto> =>
  getAsync("/me/", token);

export const getMeDev = async (token: string): Promise<IDto> =>
  getAsyncDev("/me/", token);
