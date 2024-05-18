import styles from "./styles.module.scss";
import { IProps } from "./props";
import React from "react";
import {
  actionTypeToString,
  convertTimestampToDate,
  convertTimestampToTime,
  CURRENCY,
} from "shared";
import { useRouter } from "next/navigation";

export const TableAfterChange = ({ afterChange }: IProps) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Quantity</th>
          <th className={styles.th}>Price per unit</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {afterChange.map((i) => (
          <tr key={i.name} className={styles.tr}>
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
