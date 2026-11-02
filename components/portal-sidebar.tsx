"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { CONNECT_URL, PRICE_SITE, SUPPORT_URL } from "@/lib/portal-links"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Database,
  FlaskConical,
  Store,
  ChevronRight,
  Home,
  Book,
  Key,
  FileCode,
  Layers,
  Beaker,
  Boxes,
  ShoppingCart,
  Settings,
  CreditCard,
  HelpCircle,
  ExternalLink,
  Search,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  isNew?: boolean
}

interface NavSection {
  title: string
  icon: React.ReactNode
  badge?: string
  items: NavItem[]
}

// Every item opens a real section: a page section, a selected endpoint in the
// API Reference, Settings or Billing, or the live price feed for pricing data.
const navSections: NavSection[] = [
  {
    title: "Getting Started",
    icon: <Home className="size-4" />,
    items: [
      { label: "Overview", href: "/#overview" },
      { label: "Quick Start", href: "/#quickstart" },
      { label: "SDKs & Libraries", href: "/#code-python" },
    ],
  },
  {
    title: "Authentication",
    icon: <Shield className="size-4" />,
    items: [
      { label: "API Keys", href: "/settings#api-keys" },
      { label: "Rate Limits", href: "/billing#plans" },
    ],
  },
  {
    title: "Ingredient Database",
    icon: <Database className="size-4" />,
    badge: "2B+",
    items: [
      { label: "Search Ingredients", href: "/#endpoint-ingredients-search" },
      { label: "Nutrient Profiles", href: "/#endpoint-ingredients-nutrients" },
      { label: "Cost & Pricing Data", href: PRICE_SITE },
      { label: "Commodity Tracking", href: CONNECT_URL, isNew: true },
      { label: "Allergen Data", href: "/#endpoint-ingredients-search" },
      { label: "Supply Chain Origins", href: "/#endpoint-ingredients-search" },
    ],
  },
  {
    title: "Formulation API",
    icon: <FlaskConical className="size-4" />,
    items: [
      { label: "Create Formulation", href: "/#endpoint-formulations-create" },
      { label: "Optimize Recipe", href: "/#endpoint-formulations-optimize" },
      { label: "Nutritional Analysis", href: "/#endpoint-ingredients-nutrients" },
      { label: "Cost Modeling", href: "/#endpoint-formulations-optimize", isNew: true },
    ],
  },
  {
    title: "Marketplace",
    icon: <Store className="size-4" />,
    badge: "NEW",
    items: [
      { label: "Browse APIs", href: "/#platform-overview" },
      { label: "Published Models", href: "/#platform-ml-models" },
      { label: "Pricing Tiers", href: "/billing#plans" },
    ],
  },
]

const bottomLinks = [
  { label: "API Reference", icon: <Book className="size-4" />, href: "/#api-ref" },
  { label: "Settings", icon: <Settings className="size-4" />, href: "/settings" },
  { label: "Billing", icon: <CreditCard className="size-4" />, href: "/billing" },
  { label: "Support", icon: <HelpCircle className="size-4" />, href: SUPPORT_URL },
]

const isExternal = (href: string) => href.startsWith("http")

/** The current path plus hash, kept in sync as in-page links are followed. */
function useLocationKey() {
  const [location, setLocation] = useState("")
  useEffect(() => {
    const update = () => setLocation(window.location.pathname + window.location.hash)
    update()
    window.addEventListener("hashchange", update)
    return () => window.removeEventListener("hashchange", update)
  }, [])
  return location
}

export function PortalSidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Authentication", "Ingredient Database"])
  const location = useLocationKey()
  const [clicked, setClicked] = useState<string | null>(null)

  function toggleSection(title: string) {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    )
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
        <Image
          src="/journey-foods-logo.svg"
          alt="Journey Foods Logo"
          width={120}
          height={24}
          className="brightness-0 invert opacity-90"
        />
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent px-3 py-2 text-sm text-sidebar-foreground/60">
          <Search className="size-3.5" />
          <span className="font-mono text-xs">Search docs...</span>
          <kbd className="ml-auto rounded border border-sidebar-border bg-sidebar px-1.5 py-0.5 font-mono text-[10px] text-sidebar-foreground/40">/</kbd>
        </div>
      </div>

      {/* Navigation Sections */}
      <ScrollArea className="min-h-0 flex-1">
        <nav className="flex flex-col gap-1 px-3 py-2">
          {navSections.map((section) => {
            const isExpanded = expandedSections.includes(section.title)
            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                >
                  <span className="text-sidebar-foreground/50">{section.icon}</span>
                  <span className="flex-1 text-left font-medium">{section.title}</span>
                  {section.badge && (
                    <Badge
                      variant="outline"
                      className="border-terminal-green/30 bg-terminal-green-subtle text-terminal-green font-mono text-[10px] px-1.5 py-0"
                    >
                      {section.badge}
                    </Badge>
                  )}
                  <ChevronRight
                    className={cn(
                      "size-3.5 text-sidebar-foreground/40 transition-transform duration-200",
                      isExpanded && "rotate-90"
                    )}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-4 flex flex-col gap-0.5 border-l border-sidebar-border py-1 pl-3">
                    {section.items.map((item) => {
                      const active =
                        clicked === item.label || (!clicked && location !== "" && location === item.href)
                      const external = isExternal(item.href)
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          onClick={() => !external && setClicked(item.label)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-2 py-1 text-left text-xs transition-colors",
                            active
                              ? "bg-terminal-green/15 text-terminal-green"
                              : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                          )}
                        >
                          <span>{item.label}</span>
                          {item.isNew && (
                            <span className="rounded bg-terminal-green/20 px-1 py-0 font-mono text-[9px] text-terminal-green">
                              NEW
                            </span>
                          )}
                          {external && <ExternalLink className="ml-auto size-3 opacity-50" aria-label="opens in a new tab" />}
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Bottom Links */}
      <div className="border-t border-sidebar-border px-3 py-3">
        <div className="flex flex-col gap-0.5">
          {bottomLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(isExternal(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Version */}
      <div className="border-t border-sidebar-border px-5 py-2.5">
        <span className="font-mono text-[10px] text-sidebar-foreground/40">
          API v3.2.1 <span className="text-terminal-green">stable</span>
        </span>
      </div>
    </aside>
  )
}
