"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { UserTable } from "@/components/users/user-table"
import { redirect } from "next/navigation"

export default function UsersPage() {
  const { user, isAdmin } = useAuth()

  // Redirect non-admin users
  if (user && !isAdmin) {
    redirect("/")
  }

  return (
    <DashboardLayout
      title="User Management"
      description="Manage users, assign roles, and control access to your application."
    >
      <UserTable />
    </DashboardLayout>
  )
}
