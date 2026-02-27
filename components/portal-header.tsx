"use client"

import { Badge } from "@/components/ui/badge"
import {
  Bell,
  ChevronDown,
  Terminal,
  Key,
} from "lucide-react"

export function PortalHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Developer Portal</span>
          <span className="text-border">/</span>
          <span className="text-foreground">API Reference</span>
          <span className="text-border">/</span>
          <span className="text-terminal-green">Ingredients</span>
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
          <span className="absolute -right-0.5 -top-0.5 flex size-3 items-center justify-center rounded-full bg-terminal-green text-[8px] font-bold text-background">
            3
          </span>
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-secondary">
          <div className="flex size-6 items-center justify-center rounded-full bg-terminal-green/20 text-xs font-bold text-terminal-green">
            J
          </div>
          <ChevronDown className="size-3 text-muted-foreground" />
        </button>
      </div>
    </header>
  )
}
