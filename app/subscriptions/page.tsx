"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SubscriptionTable } from "@/components/subscriptions/subscription-table"

export default function SubscriptionsPage() {
  const { user, isAdmin } = useAuth()

  return (
    <DashboardLayout
      title={isAdmin ? "Subscription Plans" : "My Subscription"}
      description={
        isAdmin
          ? "Create and manage subscription plans for your customers."
          : "View and manage your subscription details."
      }
    >
      {isAdmin ? (
        <SubscriptionTable />
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-2">Current Subscription</h3>
            <div className="space-y-2">
              <p>
                <strong>Plan:</strong> {user?.subscription?.plan || "No active plan"}
              </p>
              <p>
                <strong>Status:</strong> {user?.subscription?.status || "Inactive"}
              </p>
              <p>
                <strong>Expires:</strong> {user?.subscription?.expiresAt || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
