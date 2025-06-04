"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, CreditCard, Settings } from "lucide-react"

export default function DashboardPage() {
  const { user, isAdmin } = useAuth()

  const adminStats = [
    {
      title: "Total Users",
      value: "1,234",
      description: "Active users in the system",
      icon: Users,
    },
    {
      title: "Active Subscriptions",
      value: "856",
      description: "Currently active subscriptions",
      icon: CreditCard,
    },
    {
      title: "Accounts Managed",
      value: "2,341",
      description: "Total accounts under management",
      icon: Settings,
    },
  ]

  const userStats = [
    {
      title: "My Subscription",
      value: user?.subscription?.plan || "No Plan",
      description: `Status: ${user?.subscription?.status || "Inactive"}`,
      icon: CreditCard,
    },
  ]

  const stats = isAdmin ? adminStats : userStats

  return (
    <DashboardLayout
      title={isAdmin ? "Admin Dashboard" : "User Dashboard"}
      description={
        isAdmin
          ? "Manage users, accounts, and subscriptions from this central hub."
          : "View your subscription details and account information."
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>{isAdmin ? "Latest system activities" : "Your recent activities"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {isAdmin ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New user registered</span>
                      <Badge variant="secondary">2 min ago</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Subscription upgraded</span>
                      <Badge variant="secondary">5 min ago</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Account settings updated</span>
                      <Badge variant="secondary">10 min ago</Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Profile updated</span>
                      <Badge variant="secondary">1 hour ago</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Subscription renewed</span>
                      <Badge variant="secondary">2 days ago</Badge>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>{isAdmin ? "Common administrative tasks" : "Available actions"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {isAdmin ? (
                  <>
                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">Add new user</div>
                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">Generate reports</div>
                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">Manage subscriptions</div>
                  </>
                ) : (
                  <>
                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">Update profile</div>
                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">View billing history</div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
