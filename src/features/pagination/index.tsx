import styles from "./styles.module.scss";
import { IProps } from "./props";
import classNames from "classnames";

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: IProps) => {
  const renderPages = () => {
    const totalDisplayedPages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(totalDisplayedPages / 2),
    );
    const endPage = Math.min(totalPages, startPage + totalDisplayedPages - 1);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={styles.li}>
          <button
            className={classNames(
              styles.span,
              currentPage === i && styles.active,
            )}
            onClick={() => onPageChange && onPageChange(i)}
          >
            {i}
          </button>
        </li>,
      );
    }
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage && currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage && currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className={styles.content}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <button
            className={styles.span}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            &lsaquo;
          </button>
        </li>
        {renderPages()}
        <li className={styles.li}>
          <button
            className={styles.span}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            &rsaquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};
