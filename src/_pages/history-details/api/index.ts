import { getAsync, getAsyncDev } from "shared";
import { IHistoryDto } from "../model/dto";

export const getHistory = async (token: string): Promise<IHistoryDto[]> =>
  getAsync("/history/?skip=0&limit=99999", token); // TODO make get /history/{historyId} endpoint in backend

export const getHistoryDev = async (token: string): Promise<IHistoryDto[]> =>
  getAsyncDev("/history/?skip=0&limit=99999", token); // TODO make get /history/{historyId} endpoint in backend
