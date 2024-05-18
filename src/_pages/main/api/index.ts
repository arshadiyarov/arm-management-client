import { getAsync } from "shared";
import { IProductDto, ISummaryDto } from "../model/dto";

export const getSummary = async (token: string): Promise<ISummaryDto> =>
  getAsync("/items/summary/", token);

export const getProducts = async (
  token: string,
  skip: string = "0",
  limit: string = "10",
): Promise<IProductDto[]> =>
  getAsync(`/items/?skip=${skip}&limit=${limit}`, token);

export const getProductsSearch = async (
  token: string,
  name: string,
): Promise<IProductDto[]> => getAsync(`/items/search/?name=${name}`, token);
