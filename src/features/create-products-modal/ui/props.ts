import { FormEvent } from "react";
import { ProductType } from "shared";

export interface IProps {
  toggleModal: () => void;
  isLoading: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  createdProductsData: ProductType[];
  removeClick: (id: number) => void;
  addMore: () => void;
  productDataChange: (
    productId: number,
    field: string,
    value: string | number,
  ) => void;
}
