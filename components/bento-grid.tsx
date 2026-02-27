"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Database,
  FlaskConical,
  Store,
  Zap,
  Globe,
  TrendingUp,
  Shield,
  Cpu,
  ArrowUpRight,
  Activity,
  BarChart3,
  Layers,
} from "lucide-react"

interface BentoCardProps {
  title: string
  description: string
  icon: React.ReactNode
  stat?: string
  statLabel?: string
  badge?: string
  className?: string
  children?: React.ReactNode
  accent?: boolean
}

function BentoCard({ title, description, icon, stat, statLabel, badge, className, children, accent }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:border-terminal-green/30 hover:bg-surface-elevated",
        accent && "border-terminal-green/20 bg-terminal-green-subtle",
        className
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex size-8 items-center justify-center rounded-md border border-border bg-secondary",
            accent && "border-terminal-green/30 bg-terminal-green/10"
          )}>
            <span className={cn("text-muted-foreground", accent && "text-terminal-green")}>{icon}</span>
          </div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        {badge && (
          <Badge
            variant="outline"
            className="border-terminal-green/30 bg-terminal-green-subtle text-terminal-green font-mono text-[10px] px-1.5 py-0"
          >
            {badge}
          </Badge>
        )}
        <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Stat */}
      {stat && (
        <div className="mt-4 flex items-baseline gap-2">
          <span className={cn(
            "font-mono text-3xl font-bold tracking-tight",
            accent ? "text-terminal-green" : "text-foreground"
          )}>
            {stat}
          </span>
          {statLabel && <span className="text-xs text-muted-foreground">{statLabel}</span>}
        </div>
      )}

      {/* Description */}
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>

      {/* Optional Children */}
      {children && <div className="mt-4 flex-1">{children}</div>}
    </div>
  )
}

function MiniGraph() {
  const points = [12, 18, 14, 22, 19, 28, 24, 32, 30, 38, 35, 42]
  const maxVal = Math.max(...points)
  const minVal = Math.min(...points)
  const range = maxVal - minVal

  return (
    <div className="flex items-end gap-[3px]" style={{ height: 40 }}>
      {points.map((val, idx) => {
        const height = ((val - minVal) / range) * 100
        return (
          <div
            key={idx}
            className="flex-1 rounded-sm bg-terminal-green/30 transition-colors hover:bg-terminal-green/60"
            style={{ height: `${Math.max(height, 8)}%` }}
          />
        )
      })}
    </div>
  )
}

function DataTicker() {
  const items = [
    { label: "Ingredients", value: "2,147,483,647", change: "+12.3%" },
    { label: "Formulations", value: "847,293", change: "+8.7%" },
    { label: "API Calls / day", value: "14.2M", change: "+23.1%" },
    { label: "Models Active", value: "1,247", change: "+5.4%" },
  ]

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-1.5">
          <span className="text-[10px] text-muted-foreground">{item.label}</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-foreground">{item.value}</span>
            <span className="font-mono text-[10px] text-terminal-green">{item.change}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function MarketplaceItems() {
  const apis = [
    { name: "Allergen Detection v2", author: "Journey Labs", calls: "2.1M", rating: 4.9 },
    { name: "Nutrient Optimizer", author: "FoodTech AI", calls: "1.8M", rating: 4.8 },
    { name: "Cost Predictor", author: "Supply Chain Co", calls: "890K", rating: 4.7 },
  ]

  return (
    <div className="flex flex-col gap-2">
      {apis.map((api) => (
        <div key={api.name} className="flex items-center gap-3 rounded-md border border-border bg-secondary/50 px-3 py-2">
          <div className="flex size-7 items-center justify-center rounded bg-terminal-green/10">
            <Cpu className="size-3.5 text-terminal-green" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-foreground">{api.name}</div>
            <div className="text-[10px] text-muted-foreground">{api.author}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-foreground">{api.calls}</div>
            <div className="text-[10px] text-muted-foreground">calls</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function BentoGrid() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Platform Overview</h2>
        <span className="font-mono text-xs text-muted-foreground">
          Last updated: <span className="text-foreground">2 min ago</span>
        </span>
      </div>

      {/* Bento Grid */}
      <div className="grid auto-rows-auto gap-3 md:grid-cols-2 lg:grid-cols-4">
        {/* Large: Data Points */}
        <BentoCard
          title="Ingredient Database"
          description="The world's largest structured food ingredient dataset. Real-time nutrient profiles, allergen mapping, and supply chain data across 190 countries."
          icon={<Database className="size-4" />}
          stat="2B+"
          statLabel="data points"
          badge="LIVE"
          accent
          className="md:col-span-2 lg:row-span-2"
        >
          <DataTicker />
        </BentoCard>

        {/* API Calls */}
        <BentoCard
          title="API Throughput"
          description="Average daily API requests across all endpoints with 99.99% uptime SLA."
          icon={<Zap className="size-4" />}
          stat="14.2M"
          statLabel="calls / day"
        >
          <MiniGraph />
        </BentoCard>

        {/* Global Coverage */}
        <BentoCard
          title="Global Coverage"
          description="Ingredient data sourced from suppliers and regulatory bodies across 190 countries."
          icon={<Globe className="size-4" />}
          stat="190"
          statLabel="countries"
        />

        {/* Formulation Engine */}
        <BentoCard
          title="Formulation Engine"
          description="AI-powered recipe optimization with cost modeling, nutritional targeting, and regulatory compliance."
          icon={<FlaskConical className="size-4" />}
          stat="847K"
          statLabel="formulations"
          badge="v3"
        />

        {/* Marketplace */}
        <BentoCard
          title="API Marketplace"
          description="Pre-built AI models and data APIs from the Journey ecosystem. Deploy in minutes."
          icon={<Store className="size-4" />}
          badge="NEW"
          className="lg:row-span-2"
        >
          <MarketplaceItems />
        </BentoCard>

        {/* Latency */}
        <BentoCard
          title="Edge Performance"
          description="P95 latency across all global edge nodes. Sub-50ms response times for cached queries."
          icon={<Activity className="size-4" />}
          stat="23ms"
          statLabel="p95 latency"
        />

        {/* Security */}
        <BentoCard
          title="Enterprise Security"
          description="SOC 2 Type II certified. End-to-end encryption, SSO, and granular RBAC for enterprise teams."
          icon={<Shield className="size-4" />}
          badge="SOC2"
        />

        {/* ML Models */}
        <BentoCard
          title="ML Models"
          description="Production-grade machine learning models for ingredient classification, cost prediction, and nutritional analysis."
          icon={<Cpu className="size-4" />}
          stat="1,247"
          statLabel="active models"
          className="md:col-span-2"
        >
          <div className="flex items-center gap-3">
            {[
              { label: "Classification", pct: 94 },
              { label: "Cost Prediction", pct: 91 },
              { label: "Nutrient Analysis", pct: 97 },
            ].map((model) => (
              <div key={model.label} className="flex-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">{model.label}</span>
                  <span className="font-mono text-terminal-green">{model.pct}%</span>
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-terminal-green/60"
                    style={{ width: `${model.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  )
}
