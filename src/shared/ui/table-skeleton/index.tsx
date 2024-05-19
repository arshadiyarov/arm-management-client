import styles from "./styles.module.scss";
import { IProps } from "./props";
import Skeleton from "react-loading-skeleton";
import React from "react";

export const TableSkeleton = ({ rows = 10, columns = 3 }: IProps) => {
  const rowsArr = Array.from({ length: rows });
  const columnsArr = Array.from({ length: columns });

  return rowsArr.map((_, rowIndex) => (
    <tr key={rowIndex} className={styles.tr}>
      {columnsArr.map((_, colIndex) => (
        <td key={colIndex} className={styles.td}>
          <Skeleton className={styles.skeleton} />
        </td>
      ))}
    </tr>
  ));
};
