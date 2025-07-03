"use client"

export interface SubscriptionMetrics {
  month: string
  newSubscriptions: number
  canceledSubscriptions: number
  totalActive: number
  revenue: number
}

export interface ChurnedUser {
  id: string
  name: string
  email: string
  accountName: string
  subscriptionPlan: string
  churnDate: string
  churnReason: string
  lastLoginDate: string
  totalRevenue: number
}

export interface RevenueData {
  monthly: SubscriptionMetrics[]
  quarterly: {
    quarter: string
    revenue: number
    subscriptions: number
  }[]
  yearly: {
    year: string
    revenue: number
    subscriptions: number
  }[]
}

// Mock data for demonstration
export const mockSubscriptionMetrics: SubscriptionMetrics[] = [
  {
    month: "2024-01",
    newSubscriptions: 45,
    canceledSubscriptions: 8,
    totalActive: 234,
    revenue: 12450.0,
  },
  {
    month: "2024-02",
    newSubscriptions: 52,
    canceledSubscriptions: 12,
    totalActive: 274,
    revenue: 14680.0,
  },
  {
    month: "2024-03",
    newSubscriptions: 38,
    canceledSubscriptions: 15,
    totalActive: 297,
    revenue: 16230.0,
  },
  {
    month: "2024-04",
    newSubscriptions: 61,
    canceledSubscriptions: 9,
    totalActive: 349,
    revenue: 18940.0,
  },
  {
    month: "2024-05",
    newSubscriptions: 43,
    canceledSubscriptions: 18,
    totalActive: 374,
    revenue: 20150.0,
  },
  {
    month: "2024-06",
    newSubscriptions: 55,
    canceledSubscriptions: 11,
    totalActive: 418,
    revenue: 22780.0,
  },
  {
    month: "2024-07",
    newSubscriptions: 67,
    canceledSubscriptions: 14,
    totalActive: 471,
    revenue: 25340.0,
  },
  {
    month: "2024-08",
    newSubscriptions: 49,
    canceledSubscriptions: 22,
    totalActive: 498,
    revenue: 26890.0,
  },
  {
    month: "2024-09",
    newSubscriptions: 58,
    canceledSubscriptions: 16,
    totalActive: 540,
    revenue: 29120.0,
  },
  {
    month: "2024-10",
    newSubscriptions: 72,
    canceledSubscriptions: 19,
    totalActive: 593,
    revenue: 32450.0,
  },
  {
    month: "2024-11",
    newSubscriptions: 64,
    canceledSubscriptions: 13,
    totalActive: 644,
    revenue: 35680.0,
  },
  {
    month: "2024-12",
    newSubscriptions: 81,
    canceledSubscriptions: 25,
    totalActive: 700,
    revenue: 38920.0,
  },
]

export const mockChurnedUsers: ChurnedUser[] = [
  {
    id: "user_1",
    name: "John Smith",
    email: "john.smith@example.com",
    accountName: "Tech Solutions Inc",
    subscriptionPlan: "Pro",
    churnDate: "2024-12-15",
    churnReason: "Price too high",
    lastLoginDate: "2024-12-10",
    totalRevenue: 359.88,
  },
  {
    id: "user_2",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    accountName: "Marketing Agency",
    subscriptionPlan: "Basic",
    churnDate: "2024-12-12",
    churnReason: "Switched to competitor",
    lastLoginDate: "2024-11-28",
    totalRevenue: 119.88,
  },
  {
    id: "user_3",
    name: "Mike Davis",
    email: "mike.davis@startup.io",
    accountName: "Startup Ventures",
    subscriptionPlan: "Enterprise",
    churnDate: "2024-12-08",
    churnReason: "Budget constraints",
    lastLoginDate: "2024-12-05",
    totalRevenue: 1199.88,
  },
  {
    id: "user_4",
    name: "Emily Chen",
    email: "emily.chen@design.co",
    accountName: "Design Studio",
    subscriptionPlan: "Pro",
    churnDate: "2024-12-05",
    churnReason: "Feature limitations",
    lastLoginDate: "2024-11-30",
    totalRevenue: 299.88,
  },
  {
    id: "user_5",
    name: "Robert Wilson",
    email: "r.wilson@consulting.com",
    accountName: "Wilson Consulting",
    subscriptionPlan: "Basic",
    churnDate: "2024-12-01",
    churnReason: "No longer needed",
    lastLoginDate: "2024-11-25",
    totalRevenue: 59.88,
  },
]

export const generateRevenueData = (): RevenueData => {
  // Calculate quarterly data
  const quarterly = [
    {
      quarter: "Q1 2024",
      revenue: mockSubscriptionMetrics.slice(0, 3).reduce((sum, month) => sum + month.revenue, 0),
      subscriptions: mockSubscriptionMetrics.slice(0, 3).reduce((sum, month) => sum + month.newSubscriptions, 0),
    },
    {
      quarter: "Q2 2024",
      revenue: mockSubscriptionMetrics.slice(3, 6).reduce((sum, month) => sum + month.revenue, 0),
      subscriptions: mockSubscriptionMetrics.slice(3, 6).reduce((sum, month) => sum + month.newSubscriptions, 0),
    },
    {
      quarter: "Q3 2024",
      revenue: mockSubscriptionMetrics.slice(6, 9).reduce((sum, month) => sum + month.revenue, 0),
      subscriptions: mockSubscriptionMetrics.slice(6, 9).reduce((sum, month) => sum + month.newSubscriptions, 0),
    },
    {
      quarter: "Q4 2024",
      revenue: mockSubscriptionMetrics.slice(9, 12).reduce((sum, month) => sum + month.revenue, 0),
      subscriptions: mockSubscriptionMetrics.slice(9, 12).reduce((sum, month) => sum + month.newSubscriptions, 0),
    },
  ]

  // Calculate yearly data
  const yearly = [
    {
      year: "2024",
      revenue: mockSubscriptionMetrics.reduce((sum, month) => sum + month.revenue, 0),
      subscriptions: mockSubscriptionMetrics.reduce((sum, month) => sum + month.newSubscriptions, 0),
    },
  ]

  return {
    monthly: mockSubscriptionMetrics,
    quarterly,
    yearly,
  }
}
