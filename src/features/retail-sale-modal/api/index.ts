import { getAsync, postAsync, ProductType } from "shared";
import { RetailSaleType } from "../model/types";

export const postRetailSale = async (
  token: string,
  body: RetailSaleType,
): Promise<any> => postAsync("/sell/retail/", body, token);

export const getItemsSearch = async (
  token: string,
  name: string,
): Promise<ProductType[]> => getAsync(`/items/search/?name=${name}`, token);
