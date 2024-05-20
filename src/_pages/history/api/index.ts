import { getAsync, getAsyncDev } from "shared";

export const getHistory = async (
  token: string,
  offset: string = "0",
  limit: string = "10",
): Promise<any> => getAsync(`/history/?offset=${offset}&limit=${limit}`, token);

export const getHistorySearch = async (
  token: string,
  query: string,
): Promise<any> => getAsync(`/history/search/?query_string=${query}`, token);
export const getHistoryDev = async (
  token: string,
  offset: string = "0",
  limit: string = "10",
): Promise<any> =>
  getAsyncDev(`/history/?offset=${offset}&limit=${limit}`, token);

export const getHistorySearchDev = async (
  token: string,
  query: string,
): Promise<any> => getAsyncDev(`/history/search/?query_string=${query}`, token);
