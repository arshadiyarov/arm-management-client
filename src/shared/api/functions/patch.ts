import { baseFetchAsync, baseFetchAsyncDev } from "shared";

export const patchAsync = async <T>(
  url: string,
  body?: any,
  token?: string,
): Promise<T> => {
  try {
    const res = await baseFetchAsync<T>(url, "PATCH", body, token);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const patchAsyncDev = async <T>(
  url: string,
  body?: any,
  token?: string,
): Promise<T> => {
  try {
    const res = await baseFetchAsyncDev<T>(url, "PATCH", body, token);
    return res.data;
  } catch (err) {
    throw err;
  }
};
