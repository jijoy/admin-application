"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { AppSidebar } from "./app-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { useAuth } from "@/lib/auth-context"
import { LoginForm } from "./login-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

// Map pathnames to breadcrumb labels
const pathToBreadcrumb: Record<string, string> = {
  "/": "Dashboard",
  "/users": "User Management",
  "/accounts": "Account Management",
  "/subscriptions": "Subscription Management",
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) {
    return <LoginForm />
  }

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    if (pathname === "/") return []

    return [
      {
        label: pathToBreadcrumb[pathname] || "Unknown",
        href: pathname,
      },
    ]
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DashboardHeader />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          {(title || description) && (
            <div className="space-y-1">
              {title && <h1 className="text-3xl font-bold tracking-tight">{title}</h1>}
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
          )}
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
