"use client";

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { AuthRequired, UserContext, useProducts } from "processes";
import { InfoCard, Table } from "widgets";
import { CreateProductsModal, UpdateProductModal } from "features";
import {
  Button,
  ProductType,
  SummaryType,
  Description,
  TokenStorageHelper,
  useDebounce,
} from "shared";
import {
  getProducts,
  getProductsDev,
  getProductsSearch,
  getProductsSearchDev,
  getSummary,
  getSummaryDev,
  postProducts,
} from "_pages/main/api";
import { toast } from "react-toastify";

const Main = () => {
  const token = TokenStorageHelper.getToken();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);
  const [summaryData, setSummaryData] = useState<SummaryType>({
    unique_items_count: 0,
    total_items_count: 0,
    total_price: 0,
  });
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isUpdateModalActive, setIsUpdateModalActive] = useState(false);
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState<ProductType>();
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
  const { productsData, setProductsData } = useProducts();
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const userData = useContext(UserContext);

  const clearSearchValue = () => setSearchValue("");

  const fetchSummary = async () => {
    setIsSummaryLoading(true);
    try {
      // DEV FETCH
      const res = await getSummary(token);
      // const res = await getSummaryDev(token);
      setSummaryData((prevState) => ({ ...prevState, ...res }));
      setTotalCount(res.unique_items_count);
      setIsSummaryLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const fetchProducts = async (skip: string = "0", limit: string = "10") => {
    setIsProductsLoading(true);
    try {
      // DEV FETCH
      const res = await getProducts(token, skip, limit);
      // const res = await getProductsDev(token, "0", limit);
      setProductsData(res);
      setIsProductsLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const handleLimitChange = async (val: string) => {
    const newLimit = parseInt(val, 10);
    setPageSize(newLimit);
    setCurrentPage(1);
    await fetchProducts("0", String(newLimit));
  };

  const handlePageChange = async (page: number) => {
    const skip = (page - 1) * pageSize;
    setCurrentPage(page);
    await fetchProducts(String(skip), String(pageSize));
  };

  const fetchProductsSearch = async (val: string) => {
    setIsProductsLoading(true);
    try {
      // DEV FETCH
      const res = await getProductsSearch(token, val);
      // const res = await getProductsSearchDev(token, val);
      setProductsData(res);
      setIsProductsLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const handleSearchValueChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const loadProducts = async () => {
    setIsProductsLoading(true);
    if (debouncedSearch) {
      await fetchProductsSearch(debouncedSearch);
    } else {
      await fetchProducts();
    }
    setIsProductsLoading(false);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [debouncedSearch]);

  const handleToggleUpdateModal = () => {
    setIsUpdateModalActive((prevState) => !prevState);
  };

  const handleToggleCreateModal = () => {
    setIsCreateModalActive((prevState) => !prevState);
  };

  const handleSelectProductId = (id: number) => {
    const updatingProduct = productsData.find((p) => p.id === id);
    setUpdatingProduct(updatingProduct);
  };

  const handleUpdateProductData = (updatedProduct: ProductType) => {
    setProductsData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
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

    creatingProductsData.map((p) => {
      if (p.quantity < 1 || p.price < 1) {
        toast.error("Something went wrong (check quantity or price)");
        setIsCreateLoading(false);
        return;
      }
    });

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
    if (isUpdateModalActive || isCreateModalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isUpdateModalActive, isCreateModalActive]);

  return (
    <AuthRequired>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <Description
              title={"Product Table"}
              description={
                "Here you will find a table of products. You can view all items in stock using the table below. For convenience, you can search for matches by name, enter part of the product name and only matches will remain in the table."
              }
            />
            {userData?.role === "admin" && (
              <Button className={styles.btn} onClick={handleToggleCreateModal}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="22px"
                  width="22px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M256 112v288m144-144H112"
                  ></path>
                </svg>
                <p>Add product</p>
              </Button>
            )}
          </div>
          <div className={styles.mid}>
            <InfoCard
              title={"Total unique products"}
              value={summaryData.unique_items_count}
              isLoading={isSummaryLoading}
            />
            <InfoCard
              title={"Total number of items"}
              value={summaryData.total_items_count}
              isLoading={isSummaryLoading}
            />
            <InfoCard
              title={"Total cost"}
              value={summaryData.total_price}
              withCurrency
              isLoading={isSummaryLoading}
            />
          </div>
          <div className={styles.bottom}>
            <Table
              selectProductId={handleSelectProductId}
              toggleUpdateModal={handleToggleUpdateModal}
              productsData={productsData}
              isLoading={isProductsLoading}
              searchValue={searchValue}
              searchValueChange={handleSearchValueChange}
              clearSearchValue={clearSearchValue}
              limitChange={handleLimitChange}
              pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalCount / pageSize)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        {isUpdateModalActive && updatingProduct && (
          <UpdateProductModal
            toggleModal={handleToggleUpdateModal}
            productData={updatingProduct}
            updateProductData={handleUpdateProductData}
          />
        )}
        {isCreateModalActive && (
          <CreateProductsModal
            toggleModal={handleToggleCreateModal}
            isLoading={isCreateLoading}
            handleSubmit={fetchCreateProducts}
            createdProductsData={creatingProductsData}
            addMore={handleCreateMore}
            removeClick={handleRemoveCreatedClick}
            productDataChange={handleCreatingProductDataChange}
          />
        )}
      </main>
    </AuthRequired>
  );
};

export default Main;
