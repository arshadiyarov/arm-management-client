"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { IProps } from "./props";
import { RetailSaleType } from "./model/types";
import {
  Button,
  Input,
  ProductNoPrice,
  ProductType,
  RequiredStar,
  Textarea,
  TokenStorageHelper,
  useDebounce,
} from "shared";
import { postRetailSale } from "features/retail-sale-modal/api";
import { toast } from "react-toastify";
import { getItemsSearch } from "features/wholesale-modal/api";
import classNames from "classnames";

export const RetailSaleModal = ({ toggleModal }: IProps) => {
  const token = TokenStorageHelper.getToken();
  const [isLoading, setIsLoading] = useState(false);
  const [retailSaleData, setRetailSaleData] = useState<RetailSaleType>({
    extra_info: "",
    items: [
      {
        id: Date.now(),
        name: "",
        quantity: NaN,
      },
    ],
  });
  const [nameInput, setNameInput] = useState("");
  const debouncedSearch = useDebounce(nameInput);
  const [activeInputId, setActiveInputId] = useState<number | null>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);
  const [suggestData, setSuggestData] = useState<ProductType[]>([]);

  const handleSellingDataChange = (
    productId: number,
    field: string,
    value: string | number,
  ) => {
    setRetailSaleData((prevState) => ({
      ...prevState,
      items: prevState.items.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product,
      ),
    }));
  };

  const handleRemoveClick = (id: number) => {
    setRetailSaleData((prevState) => ({
      ...prevState,
      items: retailSaleData.items.filter((p) => p.id !== id),
    }));
  };

  const handleAddClick = () => {
    setRetailSaleData((prevState) => ({
      ...prevState,
      items: [...prevState.items, { id: Date.now(), name: "", quantity: NaN }],
    }));
  };

  const fetchRetailSale = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const hasInvalidData = retailSaleData.items.some((p) => {
      if (p.quantity < 1) {
        toast.error("Something went wrong (check product name or quantity)");
        setIsLoading(false);
        return true;
      }
      return false;
    });

    if (hasInvalidData) return;

    retailSaleData.items.forEach((p) => {
      const { id, ...rest } = p;
      return rest;
    });

    try {
      await postRetailSale(token, retailSaleData);
      setIsLoading(false);
      setRetailSaleData(() => ({
        extra_info: "",
        items: [
          {
            id: Date.now(),
            name: "",
            quantity: NaN,
          },
        ],
      }));
      toast.success("Successful sale, good job🥳");
      toggleModal();
    } catch (err) {
      setIsLoading(false);
      toast.error("Something went wrong (check product name or quantity)");
      throw err;
    }
  };

  const handleNameInputChange = async (
    e: ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setNameInput(e.target.value.trim().toLowerCase());
    setActiveInputId(id);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await getItemsSearch(token, nameInput);
        setSuggestData(res.slice(0, 7));
        console.log(res.slice(0, 7));
      } catch (err) {
        throw err;
      }
    };

    if (debouncedSearch) {
      fetchSuggestions();
    } else {
      setSuggestData([]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setSuggestData([]);
        setActiveInputId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} onClick={toggleModal}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.top}>
          <p>Retail sale</p>
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
        <form className={styles.form} onSubmit={fetchRetailSale}>
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
              {retailSaleData.items.length > 1 && <div className="w-16" />}
            </div>
            <div className={styles.bottomInputs}>
              {retailSaleData.items.map((p) => (
                // eslint-disable-next-line react/jsx-key
                <div id={p.id.toString()} className={styles.bottomInput}>
                  <Input
                    required
                    value={p.name}
                    onChange={(e) => {
                      handleNameInputChange(e, p.id);
                      handleSellingDataChange(p.id, "name", e.target.value);
                    }}
                    isLoading={isLoading}
                  />
                  {activeInputId === p.id && !!suggestData.length && (
                    <ul
                      className={classNames(
                        styles.suggestions,
                        retailSaleData.items.length > 1 && styles.more,
                      )}
                      ref={suggestionsRef}
                    >
                      {suggestData.map((n) => (
                        <li
                          key={n.id}
                          onClick={() => {
                            handleSellingDataChange(p.id, "name", n.name);
                            setSuggestData([]);
                          }}
                        >
                          {n.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Input
                    required
                    type="number"
                    value={p.quantity}
                    onChange={(e) =>
                      handleSellingDataChange(p.id, "quantity", e.target.value)
                    }
                    isLoading={isLoading}
                  />
                  {retailSaleData.items.length > 1 && (
                    <Button
                      type="button"
                      mode="icon"
                      className={styles.removeBtn}
                      onClick={() => handleRemoveClick(p.id)}
                      disabled={isLoading}
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
                disabled={isLoading}
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
          <label htmlFor="extraInfo">
            <p>Additional info</p>
            <Textarea
              isLoading={isLoading}
              id="extraInfo"
              value={retailSaleData.extra_info}
              onChange={(e) =>
                setRetailSaleData((prevState) => ({
                  ...prevState,
                  extra_info: e.target.value,
                }))
              }
              className={styles.textarea}
            />
          </label>
          <Button disabled={isLoading} size="md">
            Sale
          </Button>
        </form>
      </div>
    </div>
  );
};
