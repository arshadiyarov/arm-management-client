import styles from "./styles.module.scss";
import { IProps } from "./props";
import { CURRENCY } from "shared";
import React from "react";

export const TableProducts = ({
  productsData,
  toggleUpdateModal,
  selectProductId,
}: IProps) => {
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
        {productsData.map((i) => (
          <tr
            key={i.id}
            className={styles.tr}
            onClick={() => handleClick(i.id)}
          >
            <td className={styles.td}>{i.name}</td>
            <td className={styles.td}>{i.quantity} pcs</td>
            <td className={styles.td}>
              {i.price} {CURRENCY}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
