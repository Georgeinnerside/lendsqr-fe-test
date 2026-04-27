"use client";

import { useState } from "react";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const { applyFilterSearch } = useUserContext();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    applyFilterSearch(query);
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src="/assets/logo.svg"
          alt="Lendsqr"
          loading="eager"
          width={145}
          height={30}
        />
      </div>

      <form className={styles.searchBar} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for anything"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <Image src="/assets/search.svg" alt="search" width={14} height={14} />
        </button>
      </form>

      <div className={styles.profile}>
        <span>Docs</span>
        <Image
          src="/assets/bell.svg"
          alt="notification"
          width={20}
          height={20}
        />
        <div className={styles.user}>
          <Image
            src="/assets/image.png"
            alt="profile"
            width={40}
            height={40}
            className={styles.avatar}
          />
          <span>Adedeji</span>
        </div>
      </div>
    </nav>
  );
}
