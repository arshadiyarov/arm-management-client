export type RetailSaleType = {
  extra_info: string;
  items: ItemsType[];
};

type ItemsType = {
  id: number;
  name: string;
  quantity: number;
};
