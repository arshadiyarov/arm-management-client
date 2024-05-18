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

const LoadingMessage = () => (
  <p className="text-center p-3">Loading...</p> // TODO make shared loader component
);

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
          historyData && <MemoizedHistoryTable historyData={historyData} />
        );
      case "afterChange":
        return (
          afterChangeData && (
            <MemoizedAfterChangeTable afterChange={afterChangeData} />
          )
        );
      case "beforeChange":
        return (
          beforeChangeData && (
            <MemoizedBeforeChangeTable beforeChange={beforeChangeData} />
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
            />
          )
        );
    }
  };

  return (
    <div className={classNames(styles.content, "space-y-3")}>
      <div className={styles.top}>
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
      <div className={styles.table_wrapper}>
        {isLoading ? <LoadingMessage /> : returnTable(mode)}
      </div>
      {limit && pagination && (
        <div className={styles.bottom}>
          {limitChange && <LimitOptions limitChange={limitChange} />}
        </div>
      )}
    </div>
  );
};
