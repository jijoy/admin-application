"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { RevenueChart } from "@/components/reports/revenue-chart"
import { QuarterlyYearlyReport } from "@/components/reports/quarterly-yearly-report"
import { ChurnAnalysis } from "@/components/reports/churn-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, TrendingUp, Users, AlertTriangle } from "lucide-react"
import { redirect } from "next/navigation"
import { mockSubscriptionMetrics, mockChurnedUsers, generateRevenueData } from "@/lib/report-data"

export default function ReportsPage() {
  const { user, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Redirect non-admin users
  if (user && !isAdmin) {
    redirect("/")
  }

  const revenueData = generateRevenueData()

  const handleExportReport = (reportType: string) => {
    // In a real application, this would generate and download a report
    console.log(`Exporting ${reportType} report...`)
    // You could implement CSV/PDF export functionality here
  }

  return (
    <DashboardLayout
      title="Reports & Analytics"
      description="Comprehensive reporting dashboard for subscription metrics, revenue analysis, and churn insights."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="text-lg font-semibold">Analytics Dashboard</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExportReport("revenue")}>
              <Download className="mr-2 h-4 w-4" />
              Export Revenue Report
            </Button>
            <Button variant="outline" onClick={() => handleExportReport("churn")}>
              <Download className="mr-2 h-4 w-4" />
              Export Churn Report
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="quarterly" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Quarterly/Yearly
            </TabsTrigger>
            <TabsTrigger value="churn" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Churn Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Annual Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${revenueData.yearly[0]?.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {revenueData.yearly[0]?.subscriptions} new subscriptions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Quarter</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${revenueData.quarterly[revenueData.quarterly.length - 1]?.revenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Q4 2024 performance</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockSubscriptionMetrics[mockSubscriptionMetrics.length - 1]?.totalActive.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Current active users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Churned Users</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{mockChurnedUsers.length}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
                <CardDescription>Key metrics and trends at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Revenue Growth</h4>
                      <p className="text-sm text-muted-foreground">
                        Monthly revenue has grown consistently, with the highest month being December 2024 at $
                        {mockSubscriptionMetrics[mockSubscriptionMetrics.length - 1]?.revenue.toLocaleString()}.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Churn Insights</h4>
                      <p className="text-sm text-muted-foreground">
                        The primary churn reason is "Price too high", suggesting potential for pricing strategy
                        optimization.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <RevenueChart data={mockSubscriptionMetrics} />
          </TabsContent>

          <TabsContent value="quarterly" className="space-y-4">
            <QuarterlyYearlyReport data={revenueData} />
          </TabsContent>

          <TabsContent value="churn" className="space-y-4">
            <ChurnAnalysis churnedUsers={mockChurnedUsers} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
