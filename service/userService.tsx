import users from "../users-data/data.json";
import User from "./types";

// Simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Cast once (important)
const typedUsers = users as User[];

// Get all users
export const getUsers = async (): Promise<User[]> => {
  await delay(800);
  return typedUsers;
};

// Get single user
export const getUserById = async (id: string): Promise<User | null> => {
  await delay(500);
  return typedUsers.find((user) => user.id === id) || null;
};
