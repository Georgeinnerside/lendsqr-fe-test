"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/common/Navbar/Navbar";
import Sidebar from "../components/common/Sidebar/Sidebar";
import styles from "./layout.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("lendsqr_auth");
    if (!auth) {
      router.replace("/"); // Redirect to root (Login)
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) return null;
  return (
    <div className={styles.layoutContainer}>
      <Navbar />
      <div className={styles.mainWrapper}>
        <Sidebar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
