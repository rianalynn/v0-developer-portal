"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
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
  FileCode,
  Settings,
  HelpCircle,
  Search,
} from "lucide-react"

interface NavSection {
  title: string
  icon: React.ReactNode
  badge?: string
  comingSoon?: boolean
  items: { label: string; href: string; isNew?: boolean; comingSoon?: boolean }[]
}

const navSections: NavSection[] = [
  {
    title: "Getting Started",
    icon: <Home className="size-4" />,
    items: [
      { label: "Overview", href: "#overview" },
      { label: "Quick Start", href: "#quickstart" },
      { label: "SDKs & Libraries", href: "#sdks" },
    ],
  },
  {
    title: "Authentication",
    icon: <Shield className="size-4" />,
    items: [
      { label: "API Keys", href: "#api-keys" },
      { label: "OAuth 2.0", href: "#oauth" },
      { label: "Rate Limits", href: "#rate-limits" },
      { label: "Scopes & Permissions", href: "#scopes" },
    ],
  },
  {
    title: "Ingredient Database",
    icon: <Database className="size-4" />,
    badge: "2B+",
    items: [
      { label: "Search Ingredients", href: "#search" },
      { label: "Nutrient Profiles", href: "#nutrients" },
      { label: "Cost & Pricing Data", href: "#cost-data" },
      { label: "Commodity Tracking", href: "#commodity", isNew: true },
      { label: "Allergen Data", href: "#allergens" },
      { label: "Supply Chain Origins", href: "#supply-chain" },
    ],
  },
  {
    title: "Formulation API",
    icon: <FlaskConical className="size-4" />,
    badge: "SOON",
    comingSoon: true,
    items: [
      { label: "Create Formulation", href: "#create-formulation", comingSoon: true },
      { label: "Optimize Recipe", href: "#optimize", comingSoon: true },
      { label: "Nutritional Analysis", href: "#analysis", comingSoon: true },
      { label: "Cost Modeling", href: "#cost", comingSoon: true },
    ],
  },
  {
    title: "Marketplace",
    icon: <Store className="size-4" />,
    badge: "SOON",
    comingSoon: true,
    items: [
      { label: "Browse APIs", href: "#browse", comingSoon: true },
      { label: "Published Models", href: "#models", comingSoon: true },
      { label: "Pricing Tiers", href: "#pricing", comingSoon: true },
      { label: "Webhooks", href: "#webhooks", comingSoon: true },
    ],
  },
]

const bottomLinks = [
  { label: "API Reference", icon: <Book className="size-4" />, href: "#api-ref" },
  { label: "Changelog", icon: <FileCode className="size-4" />, href: "#changelog" },
  { label: "Settings", icon: <Settings className="size-4" />, href: "/settings" },
  { label: "Support", icon: <HelpCircle className="size-4" />, href: "#support" },
]

export function PortalSidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Authentication", "Ingredient Database"])
  const [activeItem, setActiveItem] = useState("API Keys")

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
                      className={cn(
                        "font-mono text-[10px] px-1.5 py-0",
                        section.comingSoon
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          : "border-terminal-green/30 bg-terminal-green-subtle text-terminal-green"
                      )}
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
                    {section.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => !item.comingSoon && setActiveItem(item.label)}
                        disabled={item.comingSoon}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1 text-left text-xs transition-colors",
                          item.comingSoon
                            ? "text-sidebar-foreground/30 cursor-not-allowed"
                            : activeItem === item.label
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
                        {item.comingSoon && (
                          <span className="rounded bg-amber-500/20 px-1 py-0 font-mono text-[9px] text-amber-400">
                            SOON
                          </span>
                        )}
                      </button>
                    ))}
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
