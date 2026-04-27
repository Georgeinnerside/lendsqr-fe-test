"use client";

import { getUsers } from "@/service/userService";
import User from "@/service/types";
import { useState, useEffect } from "react";
import UserTable from "@/app/components/dashboard/UserTable";
import Pagination from "@/app/pagination/Pagination";

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
    <>
      <UserTable />
      <Pagination />
    </>
  );
}
