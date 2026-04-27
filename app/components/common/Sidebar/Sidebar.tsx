import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Sidebar.module.scss";
import { useUserContext } from "@/context/UserContext";
import { SidebarSection } from "@/types/types";

const SIDEBAR_LINKS: SidebarSection[] = [
  {
    category: "CUSTOMERS",
    links: [
      { name: "Users", icon: "/assets/users.svg", active: true },
      { name: "Guarantors", icon: "/assets/users-1.svg" },
      { name: "Loans", icon: "/assets/sack.svg" },
      { name: "Decision Models", icon: "/assets/handshake-regular.svg" },
      { name: "Savings", icon: "/assets/piggy-bank.svg" },
      { name: "Loan Requests", icon: "/assets/group-104.svg" },
      { name: "Whitelist", icon: "/assets/user-check.svg" },
      { name: "Karma", icon: "/assets/user-times.svg" },
    ],
  },
  {
    category: "BUSINESS",
    links: [
      { name: "Organization", icon: "/assets/briefcase.svg" },
      { name: "Loan Products", icon: "/assets/group-104.svg" },
      { name: "Savings Products", icon: "/assets/home.svg" },
      { name: "Fees and Charges", icon: "/assets/coins-solid-1.svg" },
      { name: "Transactions", icon: "/assets/icon.svg" },
      { name: "Services", icon: "/assets/galaxy.svg" },
      { name: "Serice Account", icon: "/assets/user-cog.svg" },
      { name: "Settlements", icon: "/assets/scroll-1.svg" },
      { name: "report", icon: "/assets/chart-bar.svg" },
    ],
  },
  {
    category: "SETTINGS",
    links: [
      { name: "Preferences", icon: "/assets/sliders-h.svg" },
      { name: "Fees and Pricing", icon: "/assets/badge-percent.svg" },
      { name: "Audit logs", icon: "/assets/clipboard-list.svg" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useUserContext();
  const isUserDetailsPage =
    pathname.startsWith("/users/") && pathname !== "/users";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.switchOrg}>
        <Image src="/assets/briefcase.svg" alt="" width={16} height={16} />
        <span>Switch Organization</span>
        <span>
          <Image
            src="/assets/dropdown.svg"
            alt="dropdown"
            width={12}
            height={12}
          />
        </span>
      </div>

      {SIDEBAR_LINKS.map((group) => (
        <div key={group.category} className={styles.section}>
          <h3>{group.category}</h3>

          <ul>
            {group.links.map((link) => (
              <li
                key={link.name}
                className={`${styles.sidebarItem} ${
                  link.active ? styles.active : ""
                }`}
              >
                <Image src={link.icon} alt="" width={16} height={16} />
                <span>{link.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {isUserDetailsPage && (
        <div className={styles.logoutSection}>
          <button onClick={handleLogout} className={styles.logoutButton} aria-label="logout">
            <Image
              src="/assets/logout.svg"
              alt="logout-icon"
              width={16}
              height={16}
            />
            <span>Logout</span>
          </button>
          <p className={styles.version}>v1.2.0</p>
        </div>
      )}
    </aside>
  );
}
