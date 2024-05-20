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

    return await axios(config);
  } catch (err) {
    // @ts-ignore
    if (err.response) {
      // @ts-ignore
      console.error("Response error:", err.response.data);
      // @ts-ignore
    } else if (err.request) {
      // @ts-ignore
      console.error("Request error:", err.request);
    } else {
      // @ts-ignore
      console.error("Error message:", err.message);
    }
    throw err;
  }
};

export const baseFetchAsyncDev = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: any,
  token?: string,
) => {
  try {
    const config: AxiosRequestConfig = {
      url: `http://172.20.10.9:8001${url}`,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: body ? JSON.stringify(body) : undefined,
    };

    return await axios(config);
  } catch (err) {
    // @ts-ignore
    if (err.response) {
      // @ts-ignore
      console.error("Response error:", err.response.data);
      // @ts-ignore
    } else if (err.request) {
      // @ts-ignore
      console.error("Request error:", err.request);
    } else {
      // @ts-ignore
      console.error("Error message:", err.message);
    }
    throw err;
  }
};
