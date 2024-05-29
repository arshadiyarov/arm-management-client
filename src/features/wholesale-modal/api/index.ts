import { getAsync, getAsyncDev, postAsync, ProductType } from "shared";
import { WholeSaleType } from "../model/types";

export const postWholeSale = async (
  token: string,
  body: WholeSaleType,
): Promise<any> => postAsync("/sell/wholesale/", body, token);

export const getItemsSearch = async (
  token: string,
  name: string,
): Promise<ProductType[]> => getAsync(`/items/search/?name=${name}`, token);
