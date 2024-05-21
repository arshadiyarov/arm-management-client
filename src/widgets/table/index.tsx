"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import {
  InputSearch,
  LimitOptions,
  TableAfterChange,
  TableBeforeChange,
  TableHistory,
  TableModeType,
  TableProducts,
  filterItems,
} from "shared";
import classNames from "classnames";
import React, { memo, useEffect, useRef, useState } from "react";

const MemoizedProductsTable = memo(TableProducts);
const MemoizedHistoryTable = memo(TableHistory);
const MemoizedAfterChangeTable = memo(TableAfterChange);
const MemoizedBeforeChangeTable = memo(TableBeforeChange);

export const Table = ({
  historyData,
  productsData,
  afterChangeData,
  beforeChangeData,
  title,
  searchValue,
  searchValueChange,
  clearSearchValue,
  limit = true,
  search = true,
  pagination = true,
  filter = false,
  isLoading = true,
  limitChange,
  mode = "products",
  toggleUpdateModal,
  selectProductId,
  filterChange,
}: IProps) => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterValue, setFilterValue] = useState("Reset");

  const handleFilterValueChange = (val: string) => {
    setFilterValue(val);
  };

  const handleToggleFilter = () => {
    setIsFilterActive((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node))
      setIsFilterActive(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const returnTable = (mode: TableModeType) => {
    switch (mode) {
      case "history":
        return (
          historyData && (
            <MemoizedHistoryTable
              historyData={historyData}
              isLoading={isLoading}
            />
          )
        );
      case "afterChange":
        return (
          afterChangeData && (
            <MemoizedAfterChangeTable
              afterChange={afterChangeData}
              isLoading={isLoading}
            />
          )
        );
      case "beforeChange":
        return (
          beforeChangeData && (
            <MemoizedBeforeChangeTable
              beforeChange={beforeChangeData}
              isLoading={isLoading}
            />
          )
        );
      case "products":
        return (
          productsData &&
          toggleUpdateModal &&
          selectProductId && (
            <MemoizedProductsTable
              productsData={productsData}
              toggleUpdateModal={toggleUpdateModal}
              selectProductId={selectProductId}
              isLoading={isLoading}
            />
          )
        );
    }
  };

  return (
    <div className={classNames(styles.content, "space-y-3")}>
      <div className={styles.top}>
        {limit && limitChange && <LimitOptions limitChange={limitChange} />}
        <p>{title}</p>
        <div className={styles.filterSearch}>
          {filter && (
            <div className={styles.filterContent} ref={filterRef}>
              <button className={styles.filterBtn} onClick={handleToggleFilter}>
                <p>{filterValue !== "Reset" ? filterValue : "Filter"}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className={classNames(
                    styles.filterIcon,
                    isFilterActive && styles.active,
                  )}
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="M112 184l144 144 144-144"
                  ></path>
                </svg>
              </button>
              <div
                className={classNames(
                  styles.filter,
                  isFilterActive && styles.active,
                )}
              >
                <ul
                  className={classNames(
                    styles.ul,
                    isFilterActive && styles.active,
                  )}
                >
                  {filterChange &&
                    filterItems.map((i) => (
                      <li
                        className={styles.li}
                        key={i.id}
                        onClick={() => {
                          handleToggleFilter();
                          filterChange(i.value);
                          handleFilterValueChange(i.title);
                        }}
                      >
                        {i.title}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
          {search && clearSearchValue && (
            <div className={styles.search}>
              <InputSearch
                placeholder="Search"
                value={searchValue}
                onChange={searchValueChange}
                clearSearchValue={clearSearchValue}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.table_wrapper}>{returnTable(mode)}</div>
    </div>
  );
};
