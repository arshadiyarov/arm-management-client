import { putAsync, putAsyncDev } from "shared";
import { ProductUpdateModel } from "../model";

export const putUpdateProduct = async (
  token: string,
  id: number,
  body: ProductUpdateModel,
): Promise<any> => putAsync(`/items/${id}`, body, token);

export const putUpdateProductDev = async (
  token: string,
  id: number,
  body: ProductUpdateModel,
): Promise<any> => putAsyncDev(`/items/${id}`, body, token);
