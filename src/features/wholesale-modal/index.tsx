"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { IProps } from "./props";
import { WholeSaleType } from "./model/types";
import { Button, Input, ProductNoPrice, RequiredStar, Textarea } from "shared";

export const WholesaleModal = ({ toggleModal }: IProps) => {
  const [wholeSaleData, setWholeSaleData] = useState<WholeSaleType>({
    buyer: "",
    extra_info: "",
    items: [],
  });
  const [sellingProductsData, setSellingProductsData] = useState<
    ProductNoPrice[]
  >([
    {
      id: Date.now(),
      name: "",
      quantity: NaN,
    },
  ]);

  const handleSellingDataChange = (
    productId: number,
    field: string,
    value: string | number,
  ) => {
    setSellingProductsData((prevState) =>
      prevState.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product,
      ),
    );
  };

  const handleRemoveClick = (id: number) => {
    setSellingProductsData(sellingProductsData.filter((p) => p.id !== id));
  };

  const handleAddClick = () => {
    setSellingProductsData((prevState) => [
      ...prevState,
      { id: Date.now(), name: "", quantity: NaN },
    ]);
  };

  return (
    <div className={styles.container} onClick={toggleModal}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.top}>
          <p>Wholesale</p>
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
              />
            </svg>
          </Button>
        </div>
        <form className={styles.form}>
          <label htmlFor="buyer">
            <p>
              Buyer
              <RequiredStar />
            </p>
            <Input id="buyer" />
          </label>
          <div>
            <div className={styles.bottomLabels}>
              <label>
                <p>
                  Name
                  <RequiredStar />
                </p>
              </label>
              <label>
                <p>
                  Quantity
                  <RequiredStar />
                </p>
              </label>
              {sellingProductsData.length > 1 && <div className="w-16" />}
            </div>
            <div className={styles.bottomInputs}>
              {sellingProductsData.map((p) => (
                // eslint-disable-next-line react/jsx-key
                <div id={p.id.toString()} className={styles.bottomInput}>
                  <Input
                    value={p.name}
                    onChange={(e) =>
                      handleSellingDataChange(p.id, "name", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    value={p.quantity}
                    onChange={(e) =>
                      handleSellingDataChange(p.id, "quantity", e.target.value)
                    }
                  />
                  {sellingProductsData.length > 1 && (
                    <Button
                      type="button"
                      mode="icon"
                      className={styles.removeBtn}
                      onClick={() => handleRemoveClick(p.id)}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                          d="m112 112 20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="32"
                          d="M80 112h352"
                        ></path>
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                          d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40m-64 64v224m-72-224 8 224m136-224-8 224"
                        ></path>
                      </svg>
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                mode="ghost"
                className={styles.addBtn}
                onClick={handleAddClick}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="16px"
                  width="16px"
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
                <p>More</p>
              </Button>
            </div>
          </div>
          <Textarea className={styles.textarea} />
          <Button size="md">Sale</Button>
        </form>
      </div>
    </div>
  );
};
