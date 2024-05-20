import {
  getAsync,
  getAsyncDev,
  postAsync,
  postAsyncDev,
  ProductNoIdType,
} from "shared";
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

export const getSummaryDev = async (token: string): Promise<ISummaryDto> =>
  getAsyncDev("/items/summary/", token);

export const getProductsDev = async (
  token: string,
  skip: string = "0",
  limit: string = "10",
): Promise<IProductDto[]> =>
  getAsyncDev(`/items/?skip=${skip}&limit=${limit}`, token);

export const getProductsSearchDev = async (
  token: string,
  name: string,
): Promise<IProductDto[]> => getAsyncDev(`/items/search/?name=${name}`, token);

export const postProducts = async (
  token: string,
  body: ProductNoIdType[],
): Promise<any> => postAsync("/items/", body, token);

export const postProductsDev = async (
  token: string,
  body: ProductNoIdType[],
): Promise<any> => postAsyncDev("/items/", body, token);
