"use client"

import { cn } from "@/lib/utils"
import {
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ExternalLink,
} from "lucide-react"

const services = [
  { name: "API Gateway", status: "operational" as const, latency: "12ms" },
  { name: "Ingredient DB", status: "operational" as const, latency: "23ms" },
  { name: "Formulation Engine", status: "operational" as const, latency: "45ms" },
  { name: "Auth Service", status: "operational" as const, latency: "8ms" },
  { name: "Marketplace", status: "operational" as const, latency: "18ms" },
  { name: "Webhooks", status: "degraded" as const, latency: "120ms" },
]

type Status = "operational" | "degraded" | "outage"

function StatusDot({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "relative inline-block size-2 rounded-full",
        status === "operational" && "bg-terminal-green",
        status === "degraded" && "bg-amber-400",
        status === "outage" && "bg-red-500"
      )}
    >
      {status === "operational" && (
        <span className="absolute inset-0 animate-ping rounded-full bg-terminal-green/40" />
      )}
    </span>
  )
}

export function SystemStatus() {
  const allOperational = services.every((s) => s.status === "operational")
  const overallStatus: Status = allOperational ? "operational" : "degraded"

  return (
    <footer className="border-t border-border bg-card">
      <div className="flex flex-col gap-3 px-6 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">System Status</span>
            <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2 py-0.5">
              <StatusDot status={overallStatus} />
              <span className={cn(
                "font-mono text-[10px]",
                overallStatus === "operational" ? "text-terminal-green" : "text-amber-400"
              )}>
                {overallStatus === "operational" ? "All Systems Operational" : "Partial Degradation"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-muted-foreground">
              Uptime: <span className="text-terminal-green font-semibold">99.99%</span>
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              Incidents (30d): <span className="text-foreground font-semibold">0</span>
            </span>
            <a
              href="#status-page"
              className="flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-terminal-green"
            >
              <span>Status Page</span>
              <ExternalLink className="size-2.5" />
            </a>
          </div>
        </div>

        {/* Service Grid */}
        <div className="flex flex-wrap items-center gap-2">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-2.5 py-1"
            >
              <StatusDot status={service.status} />
              <span className="text-[10px] text-foreground">{service.name}</span>
              <span className={cn(
                "font-mono text-[10px]",
                service.status === "operational" ? "text-muted-foreground" : "text-amber-400"
              )}>
                {service.latency}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="font-mono text-[10px] text-muted-foreground">
            Journey AI Developer Portal v3.2.1
          </span>
          <div className="flex items-center gap-4">
            <a href="#terms" className="text-[10px] text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#privacy" className="text-[10px] text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#docs" className="text-[10px] text-muted-foreground transition-colors hover:text-foreground">
              Documentation
            </a>
            <span className="font-mono text-[10px] text-muted-foreground">
              2026 Journey Foods, Inc.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
