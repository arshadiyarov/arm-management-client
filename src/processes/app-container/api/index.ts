import { postAsync, postAsyncDev, ProductNoIdType } from "shared";

export const postProducts = async (
  token: string,
  body: ProductNoIdType[],
): Promise<any> => postAsync("/items/", body, token);

export const postProductsDev = async (
  token: string,
  body: ProductNoIdType[],
): Promise<any> => postAsyncDev("/items/", body, token);
