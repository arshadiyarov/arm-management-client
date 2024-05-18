import { putAsync } from "shared";
import { ProductUpdateModel } from "../model";

export const putUpdateProduct = async (
  token: string,
  id: number,
  body: ProductUpdateModel,
): Promise<any> => putAsync(`/items/${id}`, body, token);
