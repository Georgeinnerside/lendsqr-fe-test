import Image from "next/image";
import { useUserContext } from "@/context/UserContext";
import styles from "./ActionModal.module.scss";

type UserStatus = "Blacklisted" | "Active" | "Pending" | "Inactive";

export default function ActionModal({
  userId,
  onAction,
}: {
  userId: string;
  onAction: () => void;
}) {
  const { updateUserStatus } = useUserContext();

  const handleStatusChange = (newStatus: UserStatus) => {
    updateUserStatus(userId, newStatus);
    onAction();
  };

  return (
    <div className={styles.actionModal}>
      <button onClick={() => console.log("View Details")}>
        <Image src="/assets/view.svg" width={14} height={14} alt="view" />
        View Details
      </button>
      <button onClick={() => handleStatusChange("Blacklisted")}>
        <Image
          src="/assets/blacklist-user.svg"
          width={14}
          height={14}
          alt="blacklist"
        />
        Blacklist User
      </button>
      <button onClick={() => handleStatusChange("Active")}>
        <Image
          src="/assets/activate.svg"
          width={14}
          height={14}
          alt="activate"
        />
        Activate User
      </button>
    </div>
  );
}
