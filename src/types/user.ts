// @/types/user.ts
export type UserRole = "ADMIN" | "PROVIDER" | "CUSTOMER";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  status: UserStatus;
  image?: string | null;
  createdAt: Date;
}