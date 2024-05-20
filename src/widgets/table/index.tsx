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
} from "shared";
import classNames from "classnames";
import React, { memo } from "react";

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
  isLoading = true,
  limitChange,
  mode = "products",
  toggleUpdateModal,
  selectProductId,
}: IProps) => {
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
        {search && clearSearchValue && (
          <InputSearch
            placeholder="Search"
            value={searchValue}
            onChange={searchValueChange}
            clearSearchValue={clearSearchValue}
          />
        )}
      </div>
      <div className={styles.table_wrapper}>{returnTable(mode)}</div>
    </div>
  );
};
