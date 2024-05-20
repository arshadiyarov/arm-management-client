"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Button, Input, RequiredStar, TokenStorageHelper } from "shared";
import { FormEvent, useState } from "react";
import { putUpdateProduct, putUpdateProductDev } from "../api";
import classNames from "classnames";
import { ProductUpdateModel } from "../model";

export const UpdateProductModal = ({
  toggleModal,
  productData,
  updateProductData,
}: IProps) => {
  const token = TokenStorageHelper.getToken();
  const [data, setData] = useState<ProductUpdateModel>({
    item_update: {
      name: productData.name,
      quantity: productData.quantity,
      price: productData.price,
    },
    extra_info: "",
  });

  const handleDataChange = (
    key: keyof ProductUpdateModel,
    value: string | number,
    nestedKey?: keyof ProductUpdateModel["item_update"],
  ) => {
    setData((prevState) => {
      if (nestedKey) {
        return {
          ...prevState,
          [key]: {
            ...(prevState[key] as ProductUpdateModel["item_update"]),
            [nestedKey]: value,
          },
        };
      } else {
        return {
          ...prevState,
          [key]: value,
        };
      }
    });
  };

  const fetchUpdateProduct = async (id: number, body: ProductUpdateModel) => {
    try {
      await putUpdateProduct(token, id, body);
      // await putUpdateProductDev(token, id, body);
      const updatedProduct = {
        ...productData,
        ...body.item_update,
      };
      updateProductData(updatedProduct);
      toggleModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchUpdateProduct(productData.id, data);
  };

  return (
    <div className={styles.container} onClick={toggleModal}>
      <div
        className={classNames(styles.content, "space-y-6")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.top}>
          <p>Update product</p>
          <Button
            size="sm"
            mode="icon"
            className={styles.close}
            onClick={toggleModal}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="24px"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M368 368 144 144m224 0L144 368"
              ></path>
            </svg>
          </Button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="name">
              <p>
                Name
                <RequiredStar />
              </p>
              <Input
                id={"name"}
                required
                value={data.item_update.name}
                onChange={(e) =>
                  handleDataChange("item_update", e.target.value, "name")
                }
              />
            </label>
            <div className="flex items-center gap-5">
              <label htmlFor="quantity">
                <p>
                  Quantity
                  <RequiredStar />
                </p>
                <Input
                  id={"quantity"}
                  type={"number"}
                  required
                  value={data.item_update.quantity}
                  onChange={(e) =>
                    handleDataChange("item_update", e.target.value, "quantity")
                  }
                />
              </label>
              <label htmlFor="price">
                <p>
                  Price
                  <RequiredStar />
                </p>
                <Input
                  id={"price"}
                  type={"number"}
                  required
                  value={data.item_update.price}
                  onChange={(e) =>
                    handleDataChange("item_update", e.target.value, "price")
                  }
                />
              </label>
            </div>
            <label htmlFor="extraInfo">
              <p>
                Reason for update
                <RequiredStar />
              </p>
              <Input
                id="extraInfo"
                required
                value={data.extra_info}
                onChange={(e) => handleDataChange("extra_info", e.target.value)}
              />
            </label>
          </div>
          <Button size="md" type={"submit"}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};
