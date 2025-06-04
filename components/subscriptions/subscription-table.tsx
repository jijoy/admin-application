"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Calendar, CreditCard, MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SubscriptionDialog } from "./subscription-dialog"

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  billingCycle: "monthly" | "yearly" | "quarterly"
  features: string[]
  isPopular: boolean
  status: "active" | "archived" | "draft"
  createdAt: string
}

const mockSubscriptions: SubscriptionPlan[] = [
  {
    id: "plan_1",
    name: "Basic",
    description: "For individuals and small teams",
    price: 9.99,
    billingCycle: "monthly",
    features: ["5 users", "10GB storage", "Basic support"],
    isPopular: false,
    status: "active",
    createdAt: "2023-01-01",
  },
  {
    id: "plan_2",
    name: "Pro",
    description: "For growing businesses",
    price: 29.99,
    billingCycle: "monthly",
    features: ["20 users", "50GB storage", "Priority support", "Advanced analytics"],
    isPopular: true,
    status: "active",
    createdAt: "2023-01-15",
  },
  {
    id: "plan_3",
    name: "Enterprise",
    description: "For large organizations",
    price: 99.99,
    billingCycle: "monthly",
    features: ["Unlimited users", "500GB storage", "24/7 support", "Custom integrations", "Dedicated account manager"],
    isPopular: false,
    status: "active",
    createdAt: "2023-02-01",
  },
  {
    id: "plan_4",
    name: "Starter",
    description: "For new users",
    price: 4.99,
    billingCycle: "monthly",
    features: ["1 user", "5GB storage", "Email support"],
    isPopular: false,
    status: "draft",
    createdAt: "2023-03-10",
  },
]

export function SubscriptionTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>(mockSubscriptions)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)

  const columns: ColumnDef<SubscriptionPlan>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Plan Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.getValue("name")}</span>
          {row.original.isPopular && <Badge variant="secondary">Popular</Badge>}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const price = Number.parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)

        return (
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span>{formatted}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "billingCycle",
      header: "Billing Cycle",
      cell: ({ row }) => {
        const cycle = row.getValue("billingCycle") as string
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">{cycle}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "active" ? "success" : status === "draft" ? "secondary" : "destructive"}>
            {status.toUpperCase()}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const plan = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedPlan(plan)
                  setDialogOpen(true)
                }}
              >
                Edit plan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSubscriptions(subscriptions.filter((p) => p.id !== plan.id))
                }}
                className="text-destructive focus:text-destructive"
              >
                Delete plan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: subscriptions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleSavePlan = (plan: SubscriptionPlan) => {
    if (selectedPlan) {
      // Update existing plan
      setSubscriptions(subscriptions.map((p) => (p.id === plan.id ? plan : p)))
    } else {
      // Add new plan
      setSubscriptions([
        ...subscriptions,
        { ...plan, id: `plan_${subscriptions.length + 1}`, createdAt: new Date().toISOString().split("T")[0] },
      ])
    }
    setDialogOpen(false)
    setSelectedPlan(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() => {
            setSelectedPlan(null)
            setDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Plan
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No subscription plans found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>

      <SubscriptionDialog open={dialogOpen} onOpenChange={setDialogOpen} plan={selectedPlan} onSave={handleSavePlan} />
    </div>
  )
}
