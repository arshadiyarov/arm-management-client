"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { IProductsContext } from "processes/products-context/model/types";
import { ProductType } from "shared";

const ProductsContext = createContext<IProductsContext | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  return context;
};

export const ProductsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [productsData, setProductsData] = useState<ProductType[]>([]);

  return (
    <ProductsContext.Provider value={{ productsData, setProductsData }}>
      {children}
    </ProductsContext.Provider>
  );
};
