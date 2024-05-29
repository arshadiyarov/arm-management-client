import { postAsync } from "shared";
import { WholeSaleType } from "features/wholesale-modal/model/types";

export const postWholeSale = async (
  token: string,
  body: WholeSaleType,
): Promise<any> => postAsync("/sell/wholesale/", body, token);
