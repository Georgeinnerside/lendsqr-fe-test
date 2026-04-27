import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./UserTable.module.scss";
import { useUserContext } from "@/context/UserContext";
import FilterModal from "../../common/Modal/FilterModals";
import ActionModal from "../../common/Modal/ActionModal";

export default function UserTable() {
  const { paginatedUsers } = useUserContext();
  const [showFilter, setShowFilter] = useState(false);
  const [activeStatusId, setActiveStatusId] = useState<string | null>(null);
  const router = useRouter();

  const toggleFilter = () => setShowFilter(!showFilter);

  const toggleStatus = (id: string) => {
    setActiveStatusId(activeStatusId === id ? null : id);
  };

  const handleRowClick = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  // format date
  const dataFormat = (yearStr: string) => {
    if (yearStr.includes("yyyy")) {
      const randomYear = Math.floor(Math.random() * (2026 - 2022 + 1)) + 2022;
      return yearStr.replace("yyyy", randomYear.toString());
    }

    return yearStr;
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            {/* Clickable Header for Filter */}
            <th onClick={toggleFilter} style={{ position: "relative" }}>
              <div className={styles.thContent}>
                ORGANIZATION
                <Image
                  src="/assets/filter-results-button.svg"
                  width={16}
                  height={16}
                  alt="filter"
                />
              </div>
              {/* Filter Modal nested in Header for absolute positioning */}
              {showFilter && (
                <FilterModal onClose={() => setShowFilter(false)} />
              )}
            </th>
            <th>
              <div className={styles.thContent}>
                USERNAME{" "}
                <Image
                  src="/assets/filter-results-button.svg"
                  width={16}
                  height={16}
                  alt="filter"
                />
              </div>
            </th>
            <th>
              <div className={styles.thContent}>
                EMAIL{" "}
                <Image
                  src="/assets/filter-results-button.svg"
                  width={16}
                  height={16}
                  alt="filter"
                />
              </div>
            </th>
            <th>
              <div className={styles.thContent}>
                STATUS{" "}
                <Image
                  src="/assets/filter-results-button.svg"
                  width={16}
                  height={16}
                  alt="filter"
                />
              </div>
            </th>
            <th>
              <div className={styles.thContent}>
                PHONE NUMBER{" "}
                <Image
                  src="/assets/filter-results-button.svg"
                  width={16}
                  height={16}
                  alt="filter"
                />
              </div>
            </th>
            <th>
              <div className={styles.thContent}>
                DATE JOINED{" "}
                <Image
                  src="/assets/filter-results-button.svg"
                  width={16}
                  height={16}
                  alt="filter"
                />
              </div>
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {paginatedUsers.map((user) => (
            <tr
              key={user.id}
              className={styles.clickableRow}
              onClick={() => handleRowClick(user.id)}
            >
              <td>{user.organization}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{dataFormat(user.dateJoined)}</td>
              <td style={{ position: "relative" }}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStatus(user.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className={`${styles.statusBadge} ${
                      styles[user.status.toLowerCase()]
                    }`}
                  >
                    {user.status}
                  </span>

                  {/* Action Modal (View Details, Blacklist, Activate) */}
                  {activeStatusId === user.id && (
                    <ActionModal
                      userId={user.id}
                      onAction={() => setActiveStatusId(null)}
                    />
                  )}
                </div>
              </td>
              <td>
                <Image
                  src="/assets/kebab.svg"
                  alt="kebab"
                  width={20}
                  height={20}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
