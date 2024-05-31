"use client";

import styles from "./styles.module.scss";
import { AuthRequired, useProducts } from "processes";
import {
  Description,
  HistoryType,
  TokenStorageHelper,
  useDebounce,
} from "shared";
import { Table } from "widgets";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getHistory,
  getHistoryDev,
  getHistorySearch,
  getHistorySearchDev,
} from "_pages/history/api";

const History = () => {
  const token = TokenStorageHelper.getToken();
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);
  const [historyData, setHistoryData] = useState<HistoryType[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleFilterChange = (val: string) => {
    setFilterValue(val);
  };

  const handleClearSearchValue = () => {
    setSearchValue("");
  };

  const fetchHistory = async (skip: string = "0", limit: string = "10") => {
    setIsLoading(true);
    try {
      // DEV FETCH
      const res = await getHistory(token, skip, limit, filterValue);
      // const res = await getHistoryDev(token, "0", limit, filterValue);
      // DEV FETCH
      const resTotal = await getHistory(token, "0", "9999", filterValue);
      // const resTotal = await getHistoryDev(token, "0", "9999", filterValue);
      console.log("history res:", res);
      setTotalCount(resTotal.length);
      setIsLoading(false);
      setHistoryData(res);
    } catch (err) {
      throw err;
    }
  };

  const handlePageChange = async (page: number) => {
    const skip = (page - 1) * pageSize;
    setCurrentPage(page);
    await fetchHistory(String(skip), String(pageSize));
  };

  const handleLimitChange = async (val: string) => {
    const newLimit = parseInt(val, 10);
    setPageSize(newLimit);
    setCurrentPage(1);
    await fetchHistory("0", String(newLimit));
  };

  const fetchHistorySearch = async (val: string) => {
    setIsLoading(true);
    try {
      // DEV FETCH
      const res = await getHistorySearch(token, val);
      // const res = await getHistorySearchDev(token, val);
      setHistoryData(res);
      setIsLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const handleSearchValueChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const loadHistory = async () => {
    if (debouncedSearch) {
      await fetchHistorySearch(debouncedSearch);
    } else {
      await fetchHistory();
    }
  };

  useEffect(() => {
    loadHistory();
  }, [debouncedSearch, filterValue]);

  return (
    <AuthRequired>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <Description
              title={"History of action"}
              description={
                "Here you will find the history of actions. In the table below you can see each action and by whom it was performed. Click on a row in the table to see the details."
              }
            />
          </div>
          <div className={styles.bottom}>
            <Table
              historyData={historyData}
              isLoading={isLoading}
              searchValue={searchValue}
              searchValueChange={handleSearchValueChange}
              clearSearchValue={handleClearSearchValue}
              limitChange={handleLimitChange}
              filter
              filterChange={handleFilterChange}
              mode={"history"}
              pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalCount / pageSize)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </AuthRequired>
  );
};

export default History;
