"use client";
import Image from "next/image";
import styles from "./statsCard/StatCard.module.scss";

type Props = {
  icon: string;
  count: string;
  title: string;
};

export default function StatCard({ icon, count, title }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <Image src={icon} width={40} height={40} alt={title} />
      </div>
      <p className={styles.title}>{title}</p>
      <h2 className={styles.count}>{count}</h2>
    </div>
  );
}
