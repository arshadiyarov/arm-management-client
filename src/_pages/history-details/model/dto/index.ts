import { ActionType } from "shared";

export interface IHistoryDto {
  id: number;
  username: string;
  buyer: string | any;
  extra_info?: string | null;
  before_change: BeforeChange[];
  after_change: AfterChange[];
  history_type: ActionType;
  title: string;
  total_unique_items_count: number | null;
  total_items_count: number | null;
  total_price: number | null;
  timestamp: Date;
}

interface BeforeChange {
  name: string;
  price: number;
  quantity: number;
}

interface AfterChange {
  name: string;
  quantity: number;
  price: number;
}
