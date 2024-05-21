import { ChangeEvent } from "react";
import {
  AfterChangeType,
  BeforeChangeType,
  HistoryType,
  ProductType,
  TableModeType,
} from "shared";

export interface IProps {
  productsData?: ProductType[];
  historyData?: HistoryType[];
  afterChangeData?: AfterChangeType[];
  beforeChangeData?: BeforeChangeType[];
  isLoading: boolean;
  title?: string;
  searchValue?: string;
  searchValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  clearSearchValue?: () => void;
  search?: boolean;
  limit?: boolean;
  pagination?: boolean;
  filter?: boolean;
  limitChange?: (val: string) => void;
  mode?: TableModeType;
  toggleUpdateModal?: () => void;
  selectProductId?: (id: number) => void;
  filterChange?: (val: string) => void;
}
