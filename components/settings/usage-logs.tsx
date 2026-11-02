"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  ScrollText,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  method: string
  endpoint: string
  status: number
  latency: string
  ip: string
}

const recentLogs: LogEntry[] = [
  {
    id: "req_a1b2c3",
    timestamp: "2026-02-27T14:32:18Z",
    method: "GET",
    endpoint: "/v3/ingredients/search",
    status: 200,
    latency: "23ms",
    ip: "192.168.1.42",
  },
  {
    id: "req_d4e5f6",
    timestamp: "2026-02-27T14:31:45Z",
    method: "POST",
    endpoint: "/v3/formulations/create",
    status: 201,
    latency: "145ms",
    ip: "192.168.1.42",
  },
  {
    id: "req_g7h8i9",
    timestamp: "2026-02-27T14:30:22Z",
    method: "GET",
    endpoint: "/v3/ingredients/ing_8f3k2m/nutrients",
    status: 200,
    latency: "18ms",
    ip: "10.0.0.15",
  },
  {
    id: "req_j0k1l2",
    timestamp: "2026-02-27T14:28:59Z",
    method: "POST",
    endpoint: "/v3/formulations/fm_2k9p/optimize",
    status: 429,
    latency: "4ms",
    ip: "192.168.1.42",
  },
  {
    id: "req_m3n4o5",
    timestamp: "2026-02-27T14:27:11Z",
    method: "GET",
    endpoint: "/v3/ingredients/search",
    status: 200,
    latency: "31ms",
    ip: "10.0.0.15",
  },
  {
    id: "req_p6q7r8",
    timestamp: "2026-02-27T14:25:44Z",
    method: "GET",
    endpoint: "/v3/marketplace/models",
    status: 200,
    latency: "56ms",
    ip: "192.168.1.42",
  },
  {
    id: "req_s9t0u1",
    timestamp: "2026-02-27T14:24:18Z",
    method: "POST",
    endpoint: "/v3/formulations/create",
    status: 400,
    latency: "12ms",
    ip: "10.0.0.15",
  },
  {
    id: "req_v2w3x4",
    timestamp: "2026-02-27T14:22:33Z",
    method: "GET",
    endpoint: "/v3/ingredients/search",
    status: 200,
    latency: "19ms",
    ip: "192.168.1.42",
  },
  {
    id: "req_y5z6a7",
    timestamp: "2026-02-27T14:20:01Z",
    method: "GET",
    endpoint: "/v3/ingredients/ing_4m7k9p/allergens",
    status: 200,
    latency: "15ms",
    ip: "192.168.1.42",
  },
  {
    id: "req_b8c9d0",
    timestamp: "2026-02-27T14:18:47Z",
    method: "POST",
    endpoint: "/v3/formulations/fm_8r2t/optimize",
    status: 500,
    latency: "2034ms",
    ip: "10.0.0.15",
  },
]

function formatTimestamp(iso: string) {
  const date = new Date(iso)
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

function StatusBadge({ status }: { status: number }) {
  const colorMap: Record<string, string> = {
    "2": "border-terminal-green/30 bg-terminal-green-subtle text-terminal-green",
    "3": "border-blue-400/30 bg-blue-400/10 text-blue-500",
    "4": "border-amber-400/30 bg-amber-400/10 text-amber-500",
    "5": "border-destructive/30 bg-destructive/10 text-destructive",
  }
  const key = String(status).charAt(0)
  return (
    <Badge
      variant="outline"
      className={cn("font-mono text-[10px] px-1.5 py-0", colorMap[key] || "")}
    >
      {status}
    </Badge>
  )
}

function MethodBadge({ method }: { method: string }) {
  const isWrite = method === "POST" || method === "PUT" || method === "DELETE"
  return (
    <div className="flex items-center gap-1">
      {isWrite ? (
        <ArrowUpRight className="size-3 text-terminal-green" />
      ) : (
        <ArrowDownLeft className="size-3 text-blue-400" />
      )}
      <span
        className={cn(
          "font-mono text-[11px] font-bold",
          isWrite ? "text-terminal-green" : "text-blue-400"
        )}
      >
        {method}
      </span>
    </div>
  )
}

export function UsageLogs() {
  return (
    <section id="usage-logs" className="flex scroll-mt-6 flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScrollText className="size-4 text-terminal-green" />
          <h2 className="text-sm font-semibold text-foreground">Usage Logs</h2>
          <span className="text-xs text-muted-foreground">Last 10 API calls</span>
        </div>
        <button className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          View All Logs
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Request ID
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Timestamp
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Method
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Endpoint
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Latency
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentLogs.map((log) => (
              <TableRow key={log.id} className="group">
                <TableCell>
                  <code className="font-mono text-[11px] text-muted-foreground">{log.id}</code>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-[11px] text-foreground">
                    {formatTimestamp(log.timestamp)}
                  </span>
                </TableCell>
                <TableCell>
                  <MethodBadge method={log.method} />
                </TableCell>
                <TableCell>
                  <code className="font-mono text-[11px] text-foreground">{log.endpoint}</code>
                </TableCell>
                <TableCell>
                  <StatusBadge status={log.status} />
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "font-mono text-[11px]",
                      parseInt(log.latency) > 1000
                        ? "text-destructive"
                        : parseInt(log.latency) > 100
                          ? "text-amber-500"
                          : "text-muted-foreground"
                    )}
                  >
                    {log.latency}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
