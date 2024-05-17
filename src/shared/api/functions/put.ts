import { baseFetchAsync } from "shared";

export const putAsync = async <T>(
  url: string,
  body?: any,
  token?: string,
): Promise<T> => {
  try {
    const res = await baseFetchAsync<T>(url, "PUT", body, token);
    return res.data;
  } catch (err) {
    throw err;
  }
};
