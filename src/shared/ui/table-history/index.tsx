"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import React from "react";
import {
  actionTypeToString,
  convertTimestampToDate,
  convertTimestampToTime,
  TableSkeleton,
} from "shared";
import { useRouter } from "next/navigation";

export const TableHistory = ({ historyData, isLoading }: IProps) => {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/history/${id}`);
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Date</th>
          <th className={styles.th}>Time</th>
          <th className={styles.th}>User</th>
          <th className={styles.th}>Action</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {isLoading ? (
          <TableSkeleton columns={4} />
        ) : !historyData.length ? (
          <tr className={styles.tr}>
            <td className={styles.td}></td>
            <td className={styles.td}>Products</td>
            <td className={styles.td}>not found</td>
            <td className={styles.td}></td>
          </tr>
        ) : (
          historyData.map((i) => (
            <tr
              key={i.id}
              className={styles.tr}
              onClick={() => handleClick(i.id)}
            >
              <td className={styles.td}>
                {convertTimestampToDate(i.timestamp)}
              </td>
              <td className={styles.td}>
                {convertTimestampToTime(i.timestamp)}
              </td>
              <td className={styles.td}>{i.username}</td>
              <td className={styles.td}>
                {actionTypeToString(i.history_type)}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
