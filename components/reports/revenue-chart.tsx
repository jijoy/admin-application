"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import type { SubscriptionMetrics } from "@/lib/report-data"

interface RevenueChartProps {
  data: SubscriptionMetrics[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const currentMonth = data[data.length - 1]
  const previousMonth = data[data.length - 2]
  const revenueGrowth = previousMonth
    ? ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100
    : 0

  const totalRevenue = data.reduce((sum, month) => sum + month.revenue, 0)
  const averageMonthlyRevenue = totalRevenue / data.length

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (2024)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Avg: ${averageMonthlyRevenue.toLocaleString()}/month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentMonth.revenue.toLocaleString()}</div>
            <div className="flex items-center gap-1">
              {revenueGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={`text-xs ${revenueGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                {Math.abs(revenueGrowth).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonth.totalActive.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{currentMonth.newSubscriptions} new this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
          <CardDescription>Revenue and subscription growth over the past 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.slice(-6).map((month, index) => {
              const monthName = new Date(month.month + "-01").toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
              const prevMonth = index > 0 ? data.slice(-6)[index - 1] : null
              const growth = prevMonth ? ((month.revenue - prevMonth.revenue) / prevMonth.revenue) * 100 : 0

              return (
                <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{monthName}</div>
                    <Badge variant="outline">
                      {month.newSubscriptions} new, {month.canceledSubscriptions} canceled
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">${month.revenue.toLocaleString()}</span>
                    {index > 0 && (
                      <div className="flex items-center gap-1">
                        {growth >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={`text-xs ${growth >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {Math.abs(growth).toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
