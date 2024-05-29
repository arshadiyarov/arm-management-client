"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import { CURRENCY, TableSkeleton } from "shared";
import React, { useContext } from "react";
import classNames from "classnames";
import { UserContext } from "processes";

export const TableProducts = ({
  productsData,
  toggleUpdateModal,
  selectProductId,
  isLoading,
}: IProps) => {
  const userData = useContext(UserContext);

  const handleClick = (id: number) => {
    toggleUpdateModal();
    selectProductId(id);
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Quantity available</th>
          <th className={styles.th}>Price per unit</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {isLoading ? (
          <TableSkeleton />
        ) : !productsData.length ? (
          <tr className={styles.tr}>
            <td className={styles.td}></td>
            <td className={styles.td}>Products not found</td>
            <td className={styles.td}></td>
          </tr>
        ) : (
          productsData.map((i) => (
            <tr
              key={i.id}
              className={classNames(
                styles.tr,
                userData?.role === "manager" && styles.manager,
              )}
              onClick={() => userData?.role === "admin" && handleClick(i.id)}
            >
              <td className={styles.td}>{i.name}</td>
              <td className={styles.td}>{i.quantity} pcs</td>
              <td className={styles.td}>
                {i.price} {CURRENCY}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
