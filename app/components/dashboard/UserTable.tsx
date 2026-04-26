import styles from "./UserTable.module.scss";
import Image from "next/image";
import User from "@/service/types";

export default function UserTable({ users }: { users: User[] }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>
              ORGANIZATION{" "}
              <span>
                {" "}
                <Image
                  src="/assets/filter-results-button.svg"
                  width={20}
                  height={20}
                  alt="options"
                />
              </span>
            </th>
            <th>
              USERNAME{" "}
              <span>
                {" "}
                <Image
                  src="/assets/filter-results-button.svg"
                  width={20}
                  height={20}
                  alt="options"
                />
              </span>
            </th>
            <th>
              EMAIL{" "}
              <span>
                {" "}
                <Image
                  src="/assets/filter-results-button.svg"
                  width={20}
                  height={20}
                  alt="options"
                />
              </span>
            </th>
            <th>
              STATUS{" "}
              <span>
                {" "}
                <Image
                  src="/assets/filter-results-button.svg"
                  width={20}
                  height={20}
                  alt="options"
                />
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.organization} </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td></td>
              <td>
                <span
                  className={`${styles.statusBadge} ${
                    styles[user.status.toLowerCase()]
                  }`}
                >
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
