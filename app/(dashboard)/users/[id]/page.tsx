"use client";
import { useParams, useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import styles from "../UserDetails.module.scss";

export default function UserDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { users } = useUserContext();

  // Find the user by ID
  const user = users.find((u) => u.id === id);

  if (!user)
    return <div className={styles.loader}>Loading User Details...</div>;

  return (
    <div className={styles.pageContainer}>
      {/* Navigation & Header */}
      <button className={styles.backBtn} onClick={() => router.back()}>
        <Image src="/assets/back.svg" width={24} height={24} alt="back" />
        <span>Back to Users</span>
      </button>

      <div className={styles.header}>
        <h2>User Details</h2>
        <div className={styles.actionButtons}>
          <button className={styles.blacklistBtn}>BLACKLIST USER</button>
          <button className={styles.activateBtn}>ACTIVATE USER</button>
        </div>
      </div>

      {/* Summary Card */}
      <div className={styles.summaryCard}>
        <div className={styles.mainInfo}>
          <div className={styles.avatar}>
            <Image
              src="/assets/avatar.svg"
              width={100}
              height={100}
              alt="profile"
            />
          </div>
          <div className={styles.nameSection}>
            <h3>{user.personalInfo.fullName}</h3>
            <p>{user.id}</p>
          </div>
          <div className={styles.tierSection}>
            <p>User's Tier</p>
            <div className={styles.stars}>
              <Image
                src="/assets/np-star-0.svg"
                width={16}
                height={16}
                alt="star"
              />
              <Image
                src="/assets/np-star.svg"
                width={16}
                height={16}
                alt="star"
              />
              <Image
                src="/assets/np-star-2.svg"
                width={16}
                height={16}
                alt="star"
              />
            </div>
          </div>

          <div className={styles.balanceSection}>
            <h3>{user.education.monthlyIncome[0]}</h3>
            <p>9912345678/Providus Bank</p>
          </div>
        </div>

        <nav className={styles.tabNav}>
          <button className={styles.activeTab}>General Details</button>
          <button>Documents</button>
          <button>Bank Details</button>
          <button>Loans</button>
          <button>Savings</button>
          <button>App and System</button>
        </nav>
      </div>

      {/* Details Sections */}
      <div className={styles.detailsBody}>
        <section className={styles.infoSection}>
          <h4>Personal Information</h4>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h5>FULL NAME</h5>
              <p>{user.personalInfo.fullName}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>PHONE NUMBER</h5>
              <p>{user.phoneNumber}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>EMAIL ADDRESS</h5>
              <p>{user.email}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>BVN</h5>
              <p>{user.personalInfo.bvn}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>GENDER</h5>
              <p>{user.personalInfo.gender}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>MARITAL STATUS</h5>
              <p>{user.personalInfo.maritalStatus}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>CHILDREN</h5>
              <p>{user.personalInfo.children}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>TYPE OF RESIDENCE</h5>
              <p>{user.personalInfo.residence}</p>
            </div>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Education and Employment */}
        <section className={styles.infoSection}>
          <h4>Education and Employment</h4>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h5>LEVEL OF EDUCATION</h5>
              <p>{user.education.level}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>EMPLOYMENT STATUS</h5>
              <p>{user.education.employmentStatus}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>SECTOR OF EMPLOYMENT</h5>
              <p>{user.education.sector}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>DURATION OF EMPLOYMENT</h5>
              <p>{user.education.duration}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>OFFICE EMAIL</h5>
              <p>{user.education.officeEmail}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>MONTHLY INCOME</h5>
              <p>{user.education.monthlyIncome[0]}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>LOAN REPAYMENT</h5>
              <p>{user.education.loanRepayment}</p>
            </div>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Socials */}
        <section className={styles.infoSection}>
          <h4>Socials</h4>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h5>TWITTER</h5>
              <p>{user.socials.twitter}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>FACEBOOK</h5>
              <p>{user.socials.facebook}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>INSTAGRAM</h5>
              <p>{user.socials.instagram}</p>
            </div>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Guarantor */}
        <section className={styles.infoSection}>
          <h4>Guarantor</h4>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h5>FULL NAME</h5>
              <p>{user.guarantor.fullName}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>PHONE NUMBER</h5>
              <p>{user.guarantor.phoneNumber}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>EMAIL ADDRESS</h5>
              <p>{user.guarantor.email}</p>
            </div>
            <div className={styles.infoItem}>
              <h5>RELATIONSHIP</h5>
              <p>{user.guarantor.relationship}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
