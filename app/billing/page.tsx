import { PortalSidebar } from "@/components/portal-sidebar"
import { PortalHeader } from "@/components/portal-header"
import { SystemStatus } from "@/components/system-status"
import { PlansBilling } from "@/components/settings/plans-billing"

export default function BillingPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <PortalSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <PortalHeader
          breadcrumbs={[
            { label: "Developer Portal", href: "/" },
            { label: "Billing" },
          ]}
        />

        <main className="flex-1 overflow-y-auto bg-grid">
          <div className="flex flex-col gap-6 p-6">
            {/* Page Title */}
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Billing
              </h1>
              <p className="text-sm text-muted-foreground">
                Compare plans and rate limits, and manage your subscription. API keys are on{" "}
                <a href="/settings#api-keys" className="text-terminal-green underline-offset-4 hover:underline">
                  Settings
                </a>
                .
              </p>
            </div>

            {/* Plans / Billing */}
            <PlansBilling />
          </div>
        </main>

        <SystemStatus />
      </div>
    </div>
  )
}
