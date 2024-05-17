import { baseFetchAsync } from "shared";

export const deleteAsync = async <T>(
  url: string,
  token?: string,
): Promise<T> => {
  try {
    const res = await baseFetchAsync<T>(url, "DELETE", null, token);
    return res.data;
  } catch (err) {
    throw err;
  }
};
