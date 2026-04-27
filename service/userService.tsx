import users from "../users-data/data.json";
import User from "../users-data/types/types";

// Delay before loading
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const typedUsers = users as User[];

// Get all users
export const getUsers = async (): Promise<User[]> => {
  await delay(800);
  return typedUsers;
};

// Get user by id
export const getUserById = async (id: string): Promise<User | null> => {
  await delay(500);
  return typedUsers.find((user) => user.id === id) || null;
};
