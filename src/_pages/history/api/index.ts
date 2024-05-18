import { getAsync } from "shared";

export const getHistory = async (
  token: string,
  offset: string = "0",
  limit: string = "10",
): Promise<any> => getAsync(`/history/?offset=${offset}&limit=${limit}`, token);

export const getHistorySearch = async (
  token: string,
  query: string,
): Promise<any> => getAsync(`/history/search/?query_string=${query}`, token);
