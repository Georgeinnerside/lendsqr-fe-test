import styles from "./Pagination.module.scss";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";

export default function Pagination() {
  const { filteredUsers, perPage, currentPage, setPage, setPerPage } =
    useUserContext();

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / perPage);

  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.showing}>
        Showing
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        out of {totalUsers}
      </div>

      <div className={styles.controls}>
        <button
          disabled={currentPage === 1}
          onClick={handlePrev}
          className={styles.arrowBtn}
        >
          <Image
            src="/assets/prev-btn.svg"
            alt="previous-btn"
            width={40}
            height={40}
          />
        </button>

        <div className={styles.pages}>
          {currentPage > 2 && <span>...</span>}

          <span className={styles.activePage}>{currentPage}</span>

          {currentPage < totalPages && (
            <>
              <span>{currentPage + 1}</span>
              {currentPage + 2 <= totalPages && <span>{currentPage + 2}</span>}
              {currentPage + 3 < totalPages && <span>...</span>}
              {currentPage !== totalPages && <span>{totalPages}</span>}
            </>
          )}
        </div>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={handleNext}
          className={styles.arrowBtn}
        >
          <Image
            src="/assets/next-btn.svg"
            alt="next-btn"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  );
}
