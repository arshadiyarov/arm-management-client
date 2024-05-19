import { ProductType } from "shared";

export interface IProps {
  productsData: ProductType[];
  toggleUpdateModal: () => void;
  selectProductId: (id: number) => void;
  isLoading: boolean;
}
