"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  ChevronDown,
  Terminal,
  Key,
  Settings,
  CreditCard,
  User,
  LogOut,
  HelpCircle,
} from "lucide-react"

interface Breadcrumb {
  label: string
  href?: string
}

interface PortalHeaderProps {
  breadcrumbs?: Breadcrumb[]
}

export function PortalHeader({ breadcrumbs }: PortalHeaderProps) {
  const defaultBreadcrumbs: Breadcrumb[] = [
    { label: "Developer Portal", href: "/" },
    { label: "API Reference" },
    { label: "Ingredients" },
  ]

  const crumbs = breadcrumbs || defaultBreadcrumbs

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground" aria-label="Breadcrumb">
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1
            return (
              <span key={crumb.label} className="flex items-center gap-1">
                {idx > 0 && <span className="text-border">/</span>}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-terminal-green" : "text-foreground"}>
                    {crumb.label}
                  </span>
                )}
              </span>
            )
          })}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* API Key */}
        <div className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5">
          <Key className="size-3 text-muted-foreground" />
          <code className="font-mono text-[10px] text-muted-foreground">
            sk-jrny_...x8f2
          </code>
          <Badge
            variant="outline"
            className="border-terminal-green/30 bg-terminal-green-subtle text-terminal-green font-mono text-[9px] px-1 py-0"
          >
            LIVE
          </Badge>
        </div>

        {/* Console */}
        <button className="flex items-center gap-1.5 rounded-md border border-terminal-green/30 bg-terminal-green/10 px-3 py-1.5 text-xs text-terminal-green transition-colors hover:bg-terminal-green/20">
          <Terminal className="size-3" />
          <span className="font-mono text-[11px]">Console</span>
        </button>

        {/* Notifications */}
        <button className="relative flex size-8 items-center justify-center rounded-md border border-border transition-colors hover:bg-secondary">
          <Bell className="size-3.5 text-muted-foreground" />
          <span className="absolute -right-0.5 -top-0.5 flex size-3 items-center justify-center rounded-full bg-terminal-green text-[8px] font-bold text-primary-foreground">
            3
          </span>
        </button>

        {/* Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-secondary focus:outline-none">
              <div className="flex size-7 items-center justify-center rounded-full bg-terminal-green/20 text-xs font-bold text-terminal-green">
                J
              </div>
              <div className="hidden flex-col items-start sm:flex">
                <span className="text-xs font-medium text-foreground">Journey Dev</span>
                <span className="text-[10px] text-muted-foreground">Basic Plan</span>
              </div>
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Journey Dev</span>
                <span className="text-xs font-normal text-muted-foreground">dev@journeyfoods.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <User className="mr-2 size-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 size-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <CreditCard className="mr-2 size-4" />
                  Billing
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" className="cursor-pointer">
                <HelpCircle className="mr-2 size-4" />
                Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 size-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
