import { PortalSidebar } from "@/components/portal-sidebar"
import { PortalHeader } from "@/components/portal-header"
import { SystemStatus } from "@/components/system-status"
import { ApiKeyManagement } from "@/components/settings/api-key-management"
import { UsageLogs } from "@/components/settings/usage-logs"

export default function SettingsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <PortalSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <PortalHeader
          breadcrumbs={[
            { label: "Developer Portal", href: "/" },
            { label: "Settings" },
          ]}
        />

        <main className="flex-1 overflow-y-auto bg-grid">
          <div className="flex flex-col gap-6 p-6">
            {/* Page Title */}
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Settings
              </h1>
              <p className="text-sm text-muted-foreground">
                Get and check your API key, and review recent API calls. Plans and invoices are on{" "}
                <a href="/billing" className="text-terminal-green underline-offset-4 hover:underline">
                  Billing
                </a>
                .
              </p>
            </div>

            {/* API Key Management */}
            <ApiKeyManagement />

            {/* Usage Logs */}
            <UsageLogs />
          </div>
        </main>

        <SystemStatus />
      </div>
    </div>
  )
}
