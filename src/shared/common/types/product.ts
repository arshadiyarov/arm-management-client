export type ProductType = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

export type ProductNoIdType = {
  name: string;
  quantity: number;
  price: number;
};

export type ProductNoPrice = {
  id: number;
  name: string;
  quantity: number;
};
