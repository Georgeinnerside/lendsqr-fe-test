"use client";
import Image from "next/image";
import styles from "./Sidebar.module.scss";
import { ReactNode } from "react";

type Props = {
  icon: string;
  iconBg: string;
  count: string;
  title: string;
};

export default function StatCard({ icon, count, iconBg, title }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper} style={{ backgroundColor: iconBg }}>
        <Image src={icon} width={24} height={24} alt={title} />
      </div>
      <p className={styles.title}>{title}</p>
      <h2 className={styles.count}>{count}</h2>
    </div>
  );
}
