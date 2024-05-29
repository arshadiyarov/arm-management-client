export type WholeSaleType = {
  buyer: string;
  extra_info: string;
  items: ItemsType[];
};

type ItemsType = {
  name: string;
  quantity: number;
};
