import { ChangeEvent } from "react";
import { ProductType } from "shared";

export interface IProps {
  products: ProductType[];
  isLoading: boolean;
  title?: string;
  searchValue: string;
  searchValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clearSearchValue: () => void;
  withSearch?: boolean;
  limitChange: (val: string) => void;
}
