export type WholeSaleType = {
  buyer: string;
  extra_info: string;
  items: ItemsType[];
};

type ItemsType = {
  id: number;
  name: string;
  quantity: number;
};
