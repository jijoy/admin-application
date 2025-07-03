"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, CreditCard, Settings, LogOut, Shield, BarChart3 } from "lucide-react"

import { useAuth } from "@/lib/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const adminNavItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Shield,
    description: "Overview and analytics",
  },
  {
    title: "User Management",
    url: "/users",
    icon: Users,
    description: "Manage all users and their permissions",
  },
  {
    title: "Account Management",
    url: "/accounts",
    icon: Settings,
    description: "Manage user accounts and settings",
  },
  {
    title: "Subscriptions",
    url: "/subscriptions",
    icon: CreditCard,
    description: "View and manage all subscriptions",
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
    description: "Analytics and reporting dashboard",
  },
]

const userNavItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Shield,
    description: "Your dashboard overview",
  },
  {
    title: "My Subscription",
    url: "/subscriptions",
    icon: CreditCard,
    description: "View your subscription details",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout, isAdmin } = useAuth()
  const pathname = usePathname()

  const navItems = isAdmin ? adminNavItems : userNavItems

  if (!user) {
    return null
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <Shield className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <span className="font-semibold text-sidebar-foreground">Admin Panel</span>
            <span className="text-xs text-sidebar-foreground/70">Management Dashboard</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            Navigation
            {isAdmin && (
              <Badge variant="secondary" className="text-xs">
                Admin
              </Badge>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.description}>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>User Info</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-2 text-sm">
              <div className="font-medium text-sidebar-foreground">{user.name}</div>
              <div className="text-xs text-sidebar-foreground/70">{user.email}</div>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant={isAdmin ? "default" : "secondary"} className="text-xs">
                  {user.role.toUpperCase()}
                </Badge>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 py-2 text-xs text-sidebar-foreground/50 border-t border-sidebar-border">
          App Version: v1.2.3
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
