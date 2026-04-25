import styles from "./UserTable.module.scss"
import Image from "next/image";
import User from "@/service/types";



export default function UserTable({ users }: { users: User[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ORGANIZATION </th>
          <th>USERNAME </th>
          <th>EMAIL </th>
          <th>STATUS </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.organization}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <span
                className={`${styles.status} ${
                  styles[user.status.toLowerCase()]
                }`}
              >
                {user.status}
              </span>
            </td>
            <td>
              <Image src="/assets/filter-results-button.svg" width={20} height={20} alt="options" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
