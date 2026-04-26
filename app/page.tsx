import Navbar from "./components/dashboard/Navbar";
import Sidebar from "./components/dashboard/Sidebar";
import UserPage from "./(dashboard)/users/page";
import StatCard from "./components/dashboard/StatCard";
import { statsData } from "./components/dashboard/statsCard/StatsData";
import statstyles from "./components/dashboard/Users.module.scss";
import styles from "./(dashboard)/layout.module.scss";

export default function Home() {
  return (
    <div className={styles.layoutContainer}>
      <Navbar />
      <div className={styles.mainWrapper}>
        <Sidebar />
        <main className={styles.content}>
          <div className={styles.dashboardContent}>
            <h1 style={{ color: "#213F7D", marginBottom: "24px" }}>Users</h1>

            <div className={statstyles.statGrid}>
              {statsData.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  count={stat.count}
                  icon={stat.icon}
                />
              ))}
            </div>
            <div style={{ marginTop: "20px" }}>
              <UserPage />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
