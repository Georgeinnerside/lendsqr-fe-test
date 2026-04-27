"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import type User from "@/types/types";
import initialUsers from "../users-data/data.json";
import { UserFilter } from "@/types/types";
import { DEFAULT_FILTER } from "@/types/types";

const STORAGE_KEY = "lendsqr_users";

interface UserContextType {
  users: User[];
  filteredUsers: User[];
  paginatedUsers: User[];
  currentPage: number;
  perPage: number;
  filter: UserFilter;
  isLoggedIn: Boolean;
  login: (email: string) => void;
  logout: () => void;
  applyFilterSearch: (query: string) => void;
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [filter, setFilter] = useState<UserFilter>(DEFAULT_FILTER);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  //   check if user exists on local storage
  useEffect(() => {
    const auth = localStorage.getItem("lendsqr_auth");
    if (auth) setIsLoggedIn(true);
  }, []);

  // Persist to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const applyFilterSearch = (query: string) => {
    console.log("Context receiving search query:", query);
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1);
  };

  // filtered user list
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchInputFilter =
        !searchQuery ||
        user.username.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery) ||
        user.organization.toLowerCase().includes(searchQuery) ||
        user.personalInfo.fullName.toLowerCase().includes(searchQuery);

      const modalFilters =
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
        (!filter.status || user.status === filter.status);

      return searchInputFilter && modalFilters;
    });
  }, [users, filter, searchQuery]);

  // Paginate filtered list
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredUsers.slice(start, start + perPage);
  }, [filteredUsers, currentPage, perPage]);

  function updateUserStatus(id: string, status: User["status"]) {
    setUsers((prev) =>
      prev.map((user): User => (user.id === id ? { ...user, status } : user))
    );

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

  const login = (email: string) => {
    localStorage.setItem("lendsqr_auth", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("lendsqr_auth");
    setIsLoggedIn(false);
  };

  const value: UserContextType = {
    users,
    filteredUsers,
    paginatedUsers,
    currentPage,
    perPage,
    filter,
    isLoggedIn,
    login,
    logout,
    applyFilterSearch,
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
