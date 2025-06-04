"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export type UserRole = "admin" | "user"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  subscription?: {
    id: string
    plan: string
    status: string
    expiresAt: string
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    subscription: {
      id: "sub_1",
      plan: "Enterprise",
      status: "active",
      expiresAt: "2024-12-31",
    },
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    subscription: {
      id: "sub_2",
      plan: "Pro",
      status: "active",
      expiresAt: "2024-06-30",
    },
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUsers[0]) // Default to admin for demo

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login logic
    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser) {
      setUser(foundUser)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const isAdmin = user?.role === "admin"

  return <AuthContext.Provider value={{ user, login, logout, isAdmin }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
