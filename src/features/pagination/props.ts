export interface IProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}
