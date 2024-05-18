export interface ISummaryDto {
  unique_items_count: number;
  total_items_count: number;
  total_price: number;
}

export interface IProductDto {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
