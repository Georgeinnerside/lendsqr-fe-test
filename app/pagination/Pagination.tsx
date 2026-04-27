import styles from "./Pagination.module.scss";
import Image from "next/image";

export default function Pagination({
  total,
  perPage,
  currentPage,
  onPageChange,
  onPerPageChange,
}: any) {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.showing}>
        Showing
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={100}>100</option>
        </select>
        out of {total}
      </div>

      <div className={styles.controls}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Image src="/assets/prev-btn.svg" alt="previous-button" />
        </button>
        {/* Simplified page numbers logic */}
        <span className={styles.activePage}>{currentPage}</span>
        <span>2</span>
        <span>3</span>
        <span>...</span>
        <span>{Math.ceil(total / perPage)}</span>
        <button onClick={() => onPageChange(currentPage + 1)}>
          {" "}
          <Image src="/assets/next-btn.svg" alt="next-button" />
        </button>
      </div>
    </div>
  );
}
