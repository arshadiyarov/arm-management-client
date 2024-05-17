import { baseFetchAsync } from "shared";

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
