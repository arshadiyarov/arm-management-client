export type RetailSaleType = {
  extra_info: string;
  items: ItemsType[];
};

type ItemsType = {
  name: string;
  quantity: number;
};
