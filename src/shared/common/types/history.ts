import { ActionType } from "shared";

export type HistoryType = {
  id: number;
  username: string;
  buyer: string | any;
  extra_info?: string | null;
  before_change: BeforeChangeType[];
  after_change: AfterChangeType[];
  history_type: ActionType;
  title: string;
  total_unique_items_count: number | null;
  total_items_count: number | null;
  total_price: number | null;
  timestamp: Date;
};

export interface BeforeChangeType {
  name: string;
  price: number;
  quantity: number;
}

export interface AfterChangeType {
  name: string;
  quantity: number;
  price: number;
}
