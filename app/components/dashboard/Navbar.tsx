import Image from "next/image";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/assets/logo.svg" alt="Lendsqr" width={145} height={30} />
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search for anything" />
        <button>
          <Image src="/assets/search.svg" alt="search" width={14} height={14} />
        </button>
      </div>
      <div className={styles.profile}>
        <span>Docs</span>
        <Image
          src="/assets/bell.svg"
          alt="notification"
          width={20}
          height={20}
        />
        <div className={styles.user}>
          <Image src="/assets/image.png" alt="profile" width={40} height={40} />
          <span>Adedeji</span>
        </div>
      </div>
    </nav>
  );
}
