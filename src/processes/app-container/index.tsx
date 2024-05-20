"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Header, Navbar } from "widgets";
import { FormEvent, PropsWithChildren, useEffect, useState } from "react";
import { AuthProvider } from "processes";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { CreateProductsModal } from "features";
import { ProductType, TokenStorageHelper } from "shared";
import { postProducts, postProductsDev } from "processes/app-container/api";
import { useProducts } from "processes/products-context";

const excludedPaths = ["/login"];

export const AppContainer = ({ children }: PropsWithChildren<IProps>) => {
  const token = TokenStorageHelper.getToken();
  const pathname = usePathname();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [creatingProductsData, setCreatingProductsData] = useState<
    ProductType[]
  >([
    {
      id: Date.now(),
      name: "",
      quantity: NaN,
      price: NaN,
    },
  ]);
  const { setProductsData } = useProducts();

  const handleToggleCreateModal = () => {
    setIsCreateModalActive((prevState) => !prevState);
  };

  const handleToggleNav = () => {
    setIsNavExpanded((prevState) => !prevState);
  };

  const handleCreatingProductDataChange = (
    productId: number,
    field: string,
    value: string | number,
  ) => {
    setCreatingProductsData((prevState) =>
      prevState.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product,
      ),
    );
  };

  const handleCreateMore = () => {
    setCreatingProductsData((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        name: "",
        quantity: NaN,
        price: NaN,
      },
    ]);
  };

  const handleRemoveCreatedClick = (id: number) => {
    setCreatingProductsData(() =>
      creatingProductsData.filter((p) => p.id !== id),
    );
  };

  const fetchCreateProducts = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreateLoading(true);
    const productsDataNoId = creatingProductsData.map((p) => {
      const { id, ...rest } = p;
      return rest;
    });

    try {
      const res = await postProducts(token, productsDataNoId);
      // const res = await postProductsDev(token, productsDataNoId);
      setProductsData((prevState) => [...prevState, ...res]);
      setCreatingProductsData([
        {
          id: Date.now(),
          name: "",
          quantity: NaN,
          price: NaN,
        },
      ]);
      setIsCreateLoading(false);
      handleToggleCreateModal();
    } catch (err) {
      setIsCreateLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    if (isCreateModalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCreateModalActive]);

  const displayContent = (path: string) => {
    if (!excludedPaths.includes(path)) {
      return (
        <div className={styles.content}>
          <Navbar
            isCreateModalActive={isCreateModalActive}
            toggleCreateModal={handleToggleCreateModal}
            isNavExpanded={isNavExpanded}
            toggleNav={handleToggleNav}
          />
          <div
            className={classNames(
              styles.main,
              isNavExpanded && styles.expanded,
            )}
          >
            <Header isNavExpanded={isNavExpanded} />
            {children}
          </div>
          {isCreateModalActive && (
            <CreateProductsModal
              toggleModal={handleToggleCreateModal}
              isLoading={isCreateLoading}
              removeClick={handleRemoveCreatedClick}
              productDataChange={handleCreatingProductDataChange}
              addMore={handleCreateMore}
              createdProductsData={creatingProductsData}
              handleSubmit={fetchCreateProducts}
            />
          )}
        </div>
      );
    } else {
      return children;
    }
  };

  return <AuthProvider>{displayContent(pathname)}</AuthProvider>;
};
