import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import styles from "./FilterModal.module.scss";

type UserStatus = "Blacklisted" | "Active" | "Pending" | "Inactive" | "";

interface FilterModalProps {
  onClose: () => void;
}

export default function FilterModal({ onClose }: FilterModalProps) {
  const { applyFilter, resetFilter } = useUserContext();
  const [formData, setFormData] = useState({
    organization: "",
    username: "",
    email: "",
    dateJoined: "",
    status: "" as UserStatus,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    applyFilter(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({
      organization: "",
      username: "",
      email: "",
      dateJoined: "",
      status: "",
    });
    resetFilter();
    onClose();
  };

  return (
    <div className={styles.filterModal} onClick={(e) => e.stopPropagation()}>
      <label>Organization</label>
      <select name="org" value={formData.organization} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Lendsqr">Lendsqr</option>
        <option value="Irorun">Irorun</option>
      </select>

      <label>Username</label>
      <input type="text" placeholder="User" />

      <label>Email</label>
      <input type="email" placeholder="Email" />

      <label>Date Joined</label>
      <input type="date" placeholder="date" />

      <label>Status</label>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <div className={styles.actions}>
        <button className={styles.reset} onClick={handleReset}>
          Reset
        </button>
        <button className={styles.filter} onClick={handleFilter}>
          Filter
        </button>
      </div>
    </div>
  );
}
