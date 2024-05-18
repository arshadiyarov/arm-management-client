import styles from "./styles.module.scss";
import { IProps } from "./props";
import { CURRENCY, InputSearch, LimitOptions } from "shared";

export const Table = ({
  products,
  title,
  searchValue,
  searchValueChange,
  clearSearchValue,
  withSearch = true,
  isLoading = true,
  limitChange,
}: IProps) => {
  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <p>{title}</p>
        {withSearch && (
          <InputSearch
            placeholder="Search"
            value={searchValue}
            onChange={searchValueChange}
            clearSearchValue={clearSearchValue}
          />
        )}
      </div>
      {isLoading ? (
        <p className="text-center p-3">Loading...</p> // TODO make shared loader component
      ) : (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Quantity available</th>
              <th className={styles.th}>Price per unit</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {products.map((p) => (
              <tr key={p.id} className={styles.tr}>
                <td className={styles.td}>{p.name}</td>
                <td className={styles.td}>{p.quantity} pcs</td>
                <td className={styles.td}>
                  {p.price} {CURRENCY}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.bottom}>
        <LimitOptions limitChange={limitChange} />
      </div>
    </div>
  );
};
