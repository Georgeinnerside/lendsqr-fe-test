"use client";

import { getUsers } from "@/service/userService";
import User from "@/users-data/types/types";
import { useState, useEffect } from "react";
import StatCard from "@/app/components/Users/Stats/StatCard";
import { statsData } from "@/app/components/Users/Stats/StatsData";
import UserTable from "@/app/components/Users/Table/UserTable";
import Pagination from "@/app/components/common/Pagination/Pagination";
import styles from "../../components/Users/Table/UserTable.module.scss";
import statStyles from "../../components/Users/Stats/Users.module.scss";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fectchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    };

    fectchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className={styles.pageWrapper}>
      <h1 className={statStyles.pageTitle}>Users</h1>

      <div className={statStyles.statsGrid}>
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            count={stat.count}
          />
        ))}
      </div>

      <div className={styles.tableSection}>
        <UserTable />
        <Pagination />
      </div>
    </div>
  );
}
