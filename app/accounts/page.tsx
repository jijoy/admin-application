"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AccountTable } from "@/components/accounts/account-table"
import { redirect } from "next/navigation"

export default function AccountsPage() {
  const { user, isAdmin } = useAuth()

  // Redirect non-admin users
  if (user && !isAdmin) {
    redirect("/")
  }

  return (
    <DashboardLayout title="Account Management" description="Create and manage accounts for your organization.">
      <AccountTable />
    </DashboardLayout>
  )
}
