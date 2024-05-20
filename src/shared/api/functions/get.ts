import { baseFetchAsync, baseFetchAsyncDev } from "shared";

export const getAsync = async <T>(url: string, token?: string): Promise<T> => {
  try {
    const res = await baseFetchAsync<T>(url, "GET", null, token);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAsyncDev = async <T>(
  url: string,
  token?: string,
): Promise<T> => {
  try {
    const res = await baseFetchAsyncDev<T>(url, "GET", null, token);
    return res.data;
  } catch (err) {
    throw err;
  }
};
