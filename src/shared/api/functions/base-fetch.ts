import axios, { AxiosRequestConfig } from "axios";

export const baseFetchAsync = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: any,
  token?: string,
) => {
  try {
    const config: AxiosRequestConfig = {
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: body ? JSON.stringify(body) : undefined,
    };

    const res = await axios(config);

    return res;
  } catch (err) {
    throw err;
  }
};
