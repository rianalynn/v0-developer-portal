import { PortalSidebar } from "@/components/portal-sidebar"
import { PortalHeader } from "@/components/portal-header"
import { ApiReference } from "@/components/api-reference"
import { BentoGrid } from "@/components/bento-grid"
import { SystemStatus } from "@/components/system-status"
import { QuickStart } from "@/components/quick-start"
import { Separator } from "@/components/ui/separator"

export default function DeveloperPortal() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <PortalSidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <PortalHeader />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto bg-grid">
          <div className="flex flex-col gap-8 p-6">
            {/* Hero Banner */}
            <HeroBanner />

            {/* Quick Start: a live call and how to get a key */}
            <QuickStart />

            {/* API Reference */}
            <ApiReference />

            {/* Separator */}
            <Separator className="bg-border" />

            {/* Bento Grid */}
            <BentoGrid />
          </div>
        </main>

        {/* System Status Footer */}
        <SystemStatus />
      </div>
    </div>
  )
}

function HeroBanner() {
  return (
    <div id="overview" className="relative scroll-mt-6 overflow-hidden rounded-lg border border-border bg-card p-6">
      {/* Glow effect */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-terminal-green/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 size-40 rounded-full bg-terminal-green/5 blur-2xl" />

      <div className="relative flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="size-2 animate-pulse-glow rounded-full bg-terminal-green" />
            <span className="font-mono text-xs text-terminal-green">DEVELOPER PORTAL</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Build with the world&apos;s largest food science dataset
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Access 2B+ ingredient data points, AI-powered formulation tools, and a growing marketplace
            of specialized food science APIs. Start building in minutes.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href="/settings#api-keys"
              className="rounded-md bg-terminal-green px-4 py-2 font-mono text-xs font-bold text-primary-foreground transition-colors hover:bg-terminal-green-dim"
            >
              Get API Key
            </a>
            <a
              href="#api-ref"
              className="rounded-md border border-border bg-secondary px-4 py-2 font-mono text-xs text-foreground transition-colors hover:bg-muted"
            >
              View Docs
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="hidden gap-3 lg:grid lg:grid-cols-2">
          {[
            { value: "2B+", label: "Data Points" },
            { value: "99.99%", label: "Uptime SLA" },
            { value: "23ms", label: "Avg Latency" },
            { value: "190", label: "Countries" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center rounded-md border border-border bg-secondary/50 px-6 py-3">
              <span className="font-mono text-xl font-bold text-terminal-green">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
