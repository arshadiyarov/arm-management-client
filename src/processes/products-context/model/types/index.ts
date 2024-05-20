import { ProductType } from "shared";

export interface IProductsContext {
  productsData: ProductType[];
  setProductsData: React.Dispatch<React.SetStateAction<ProductType[]>>;
}
