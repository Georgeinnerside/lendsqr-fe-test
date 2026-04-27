"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import type User from "@/service/types";
import initialUsers from "../users-data/data.json";

const STORAGE_KEY = "lendsqr_users";

type UserFilter = {
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  status: User["status"] | "";
};

const DEFAULT_FILTER: UserFilter = {
  organization: "",
  username: "",
  email: "",
  dateJoined: "",
  status: "",
};

interface UserContextType {
  users: User[];
  filteredUsers: User[];
  paginatedUsers: User[];
  currentPage: number;
  perPage: number;
  filter: UserFilter;
  setPage: (page: number) => void;
  setPerPage: (count: number) => void;
  applyFilter: (filter: UserFilter) => void;
  resetFilter: () => void;
  updateUserStatus: (id: string, status: User["status"]) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    // initialize localstorage on first render
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as User[]) : (initialUsers as User[]);
    } catch {
      return initialUsers as User[];
    }
  });

  const [filter, setFilter] = useState<UserFilter>(DEFAULT_FILTER);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Persist to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  // filtered user list
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        (!filter.organization ||
          user.organization
            .toLowerCase()
            .includes(filter.organization.toLowerCase())) &&
        (!filter.username ||
          user.username
            .toLowerCase()
            .includes(filter.username.toLowerCase())) &&
        (!filter.email ||
          user.email.toLowerCase().includes(filter.email.toLowerCase())) &&
        (!filter.dateJoined ||
          user.dateJoined
            .toLowerCase()
            .includes(filter.dateJoined.toLowerCase())) &&
        (!filter.status || user.status === filter.status)
      );
    });
  }, [users, filter]);

  // Paginate filtered list
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredUsers.slice(start, start + perPage);
  }, [filteredUsers, currentPage, perPage]);

  function updateUserStatus(id: string, status: User["status"]) {
    setUsers((prev) =>
      prev.map((user): User => (user.id === id ? { ...user, status } : user))
    );
    // Reset to page 1
    setCurrentPage(1);
  }

  function applyFilter(newFilter: UserFilter) {
    setFilter(newFilter);
    setCurrentPage(1);
  }

  function resetFilter() {
    setFilter(DEFAULT_FILTER);
    setCurrentPage(1);
  }

  const value: UserContextType = {
    users,
    filteredUsers,
    paginatedUsers,
    currentPage,
    perPage,
    filter,
    setPage: setCurrentPage,
    setPerPage,
    applyFilter,
    resetFilter,
    updateUserStatus,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// custom hook for context
export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
