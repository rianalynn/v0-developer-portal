"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Check,
  ArrowRight,
  Zap,
  Building2,
  Sparkles,
  ExternalLink,
} from "lucide-react"

interface Plan {
  name: string
  price: string
  period: string
  description: string
  icon: React.ReactNode
  features: string[]
  requestLimit: string
  isCurrent: boolean
  isPopular?: boolean
  ctaLabel: string
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: "$49",
    period: "/month",
    description: "For individual developers and small prototypes.",
    icon: <Zap className="size-5" />,
    features: [
      "1,000 API requests/month",
      "Basic ingredient search",
      "Community support",
      "Single API key",
      "Standard rate limits",
    ],
    requestLimit: "1,000",
    isCurrent: true,
    ctaLabel: "Current Plan",
  },
  {
    name: "Pro",
    price: "$199",
    period: "/month",
    description: "For growing teams with production workloads.",
    icon: <Sparkles className="size-5" />,
    features: [
      "50,000 API requests/month",
      "Full ingredient database",
      "Formulation API access",
      "Priority support",
      "5 API keys",
      "Advanced filtering",
      "Webhook integrations",
    ],
    requestLimit: "50,000",
    isCurrent: false,
    isPopular: true,
    ctaLabel: "Upgrade to Pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale deployments and custom integrations.",
    icon: <Building2 className="size-5" />,
    features: [
      "Unlimited API requests",
      "Full platform access",
      "Marketplace publishing",
      "Dedicated account manager",
      "Unlimited API keys",
      "Custom rate limits",
      "SSO & SAML",
      "SLA guarantee (99.99%)",
      "Custom ML model training",
    ],
    requestLimit: "Unlimited",
    isCurrent: false,
    ctaLabel: "Contact Sales",
  },
]

export function PlansBilling() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="size-4 text-terminal-green" />
          <h2 className="text-sm font-semibold text-foreground">Plans & Billing</h2>
        </div>

        {/* Manage Subscription Button */}
        <button className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <ExternalLink className="size-3" />
          <span>Manage Subscription</span>
        </button>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  )
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border bg-card p-5 transition-all duration-200",
        plan.isCurrent
          ? "border-terminal-green/40 shadow-sm"
          : plan.isPopular
            ? "border-terminal-green/20 hover:border-terminal-green/40 hover:shadow-sm"
            : "border-border hover:border-terminal-green/20 hover:shadow-sm"
      )}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-2.5 left-4">
          <Badge className="bg-terminal-green text-primary-foreground font-mono text-[10px] px-2 py-0.5 border-0">
            MOST POPULAR
          </Badge>
        </div>
      )}

      {/* Current Plan Badge */}
      {plan.isCurrent && (
        <div className="absolute -top-2.5 left-4">
          <Badge
            variant="outline"
            className="border-terminal-green/40 bg-card text-terminal-green font-mono text-[10px] px-2 py-0.5"
          >
            CURRENT PLAN
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between pt-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-md border",
                plan.isCurrent || plan.isPopular
                  ? "border-terminal-green/30 bg-terminal-green/10 text-terminal-green"
                  : "border-border bg-secondary text-muted-foreground"
              )}
            >
              {plan.icon}
            </div>
            <h3 className="text-base font-semibold text-foreground">{plan.name}</h3>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className={cn(
          "text-3xl font-bold tracking-tight",
          plan.isCurrent || plan.isPopular ? "text-terminal-green" : "text-foreground"
        )}>
          {plan.price}
        </span>
        {plan.period && (
          <span className="text-sm text-muted-foreground">{plan.period}</span>
        )}
      </div>

      {/* Description */}
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{plan.description}</p>

      {/* Divider */}
      <div className="my-4 h-px bg-border" />

      {/* Features */}
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Includes
        </span>
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 size-3 shrink-0 text-terminal-green" />
            <span className="text-xs text-foreground">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-5">
        {plan.isCurrent ? (
          <button
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-md border border-terminal-green/30 bg-terminal-green/10 px-4 py-2.5 text-sm font-medium text-terminal-green"
          >
            <Check className="size-4" />
            {plan.ctaLabel}
          </button>
        ) : plan.isPopular ? (
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-terminal-green px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-terminal-green-dim">
            {plan.ctaLabel}
            <ArrowRight className="size-4" />
          </button>
        ) : (
          <button className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            {plan.ctaLabel}
            <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
