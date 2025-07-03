"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, DollarSign } from "lucide-react"
import type { RevenueData } from "@/lib/report-data"

interface QuarterlyYearlyReportProps {
  data: RevenueData
}

export function QuarterlyYearlyReport({ data }: QuarterlyYearlyReportProps) {
  const currentQuarter = data.quarterly[data.quarterly.length - 1]
  const previousQuarter = data.quarterly[data.quarterly.length - 2]
  const quarterlyGrowth = previousQuarter
    ? ((currentQuarter.revenue - previousQuarter.revenue) / previousQuarter.revenue) * 100
    : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Quarterly Performance
          </CardTitle>
          <CardDescription>Revenue and subscription metrics by quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.quarterly.map((quarter, index) => {
              const prevQuarter = index > 0 ? data.quarterly[index - 1] : null
              const growth = prevQuarter ? ((quarter.revenue - prevQuarter.revenue) / prevQuarter.revenue) * 100 : 0

              return (
                <div key={quarter.quarter} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{quarter.quarter}</h4>
                    {index === data.quarterly.length - 1 && <Badge variant="default">Current</Badge>}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-lg font-bold">${quarter.revenue.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{quarter.subscriptions} new subscriptions</div>
                    {index > 0 && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`h-3 w-3 ${growth >= 0 ? "text-green-500" : "text-red-500"}`} />
                        <span className={`text-xs ${growth >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {growth >= 0 ? "+" : ""}
                          {growth.toFixed(1)}% QoQ
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Yearly Summary
          </CardTitle>
          <CardDescription>Annual performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {data.yearly.map((year) => (
              <div key={year.year} className="p-6 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{year.year}</h3>
                  <Badge variant="outline">Full Year</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Revenue</span>
                    <span className="text-2xl font-bold text-green-600">${year.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">New Subscriptions</span>
                    <span className="text-xl font-semibold">{year.subscriptions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg Monthly Revenue</span>
                    <span className="font-semibold">${(year.revenue / 12).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
