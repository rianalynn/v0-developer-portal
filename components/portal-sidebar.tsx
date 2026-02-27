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
  Key,
  FileCode,
  Layers,
  Beaker,
  Boxes,
  ShoppingCart,
  Settings,
  HelpCircle,
  ExternalLink,
  Search,
} from "lucide-react"

interface NavSection {
  title: string
  icon: React.ReactNode
  badge?: string
  items: { label: string; href: string; isNew?: boolean }[]
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
      { label: "Allergen Data", href: "#allergens" },
      { label: "Batch Queries", href: "#batch", isNew: true },
    ],
  },
  {
    title: "Formulation API",
    icon: <FlaskConical className="size-4" />,
    items: [
      { label: "Create Formulation", href: "#create-formulation" },
      { label: "Optimize Recipe", href: "#optimize" },
      { label: "Nutritional Analysis", href: "#analysis" },
      { label: "Cost Modeling", href: "#cost", isNew: true },
    ],
  },
  {
    title: "Marketplace",
    icon: <Store className="size-4" />,
    badge: "NEW",
    items: [
      { label: "Browse APIs", href: "#browse" },
      { label: "Published Models", href: "#models" },
      { label: "Pricing Tiers", href: "#pricing" },
      { label: "Webhooks", href: "#webhooks" },
    ],
  },
]

const bottomLinks = [
  { label: "API Reference", icon: <Book className="size-4" />, href: "#api-ref" },
  { label: "Changelog", icon: <FileCode className="size-4" />, href: "#changelog" },
  { label: "Settings", icon: <Settings className="size-4" />, href: "#settings" },
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
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <Image
          src="/journey-foods-logo.svg"
          alt="Journey Foods Logo"
          width={120}
          height={24}
          className="brightness-0 invert"
        />
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm text-muted-foreground">
          <Search className="size-3.5" />
          <span className="font-mono text-xs">Search docs...</span>
          <kbd className="ml-auto rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">/</kbd>
        </div>
      </div>

      {/* Navigation Sections */}
      <ScrollArea className="flex-1 px-3">
        <nav className="flex flex-col gap-1 py-2">
          {navSections.map((section) => {
            const isExpanded = expandedSections.includes(section.title)
            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary"
                >
                  <span className="text-muted-foreground">{section.icon}</span>
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
                      "size-3.5 text-muted-foreground transition-transform duration-200",
                      isExpanded && "rotate-90"
                    )}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-4 flex flex-col gap-0.5 border-l border-border py-1 pl-3">
                    {section.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setActiveItem(item.label)}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1 text-left text-xs transition-colors",
                          activeItem === item.label
                            ? "bg-terminal-green-subtle text-terminal-green"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        <span>{item.label}</span>
                        {item.isNew && (
                          <span className="rounded bg-terminal-green/20 px-1 py-0 font-mono text-[9px] text-terminal-green">
                            NEW
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
      <div className="border-t border-border px-3 py-3">
        <div className="flex flex-col gap-0.5">
          {bottomLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Version */}
      <div className="border-t border-border px-5 py-2.5">
        <span className="font-mono text-[10px] text-muted-foreground">
          API v3.2.1 <span className="text-terminal-green">stable</span>
        </span>
      </div>
    </aside>
  )
}
