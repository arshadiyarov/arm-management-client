import { baseFetchAsync, baseFetchAsyncDev } from "shared";

export const postAsync = async <T>(
  url: string,
  body?: any,
  token?: string,
): Promise<T> => {
  try {
    const res = await baseFetchAsync<T>(url, "POST", body, token);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const postAsyncDev = async <T>(
  url: string,
  body?: any,
  token?: string,
): Promise<T> => {
  try {
    const res = await baseFetchAsyncDev<T>(url, "POST", body, token);
    return res.data;
  } catch (err) {
    throw err;
  }
};
