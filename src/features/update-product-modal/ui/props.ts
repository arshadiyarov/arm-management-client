import { ProductType } from "shared";

export interface IProps {
  toggleModal: () => void;
  productData: ProductType;
  updateProductData: (updatedProduct: ProductType) => void;
}
