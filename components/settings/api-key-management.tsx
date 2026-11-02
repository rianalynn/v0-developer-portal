import { ArrowUpRight, Key, ShieldCheck, Terminal } from "lucide-react"
import { ACCOUNT_ENDPOINT, CONNECT_URL, SUBSCRIBE_URL, TRIAL_KEY_URL } from "@/lib/portal-links"

/**
 * How to get a real API key. The portal used to show a made-up
 * "sk-jrny_…" key that no API accepts. Keys are now issued by the Journey
 * price feed, shown once there, and never displayed or stored in this portal.
 */
export function ApiKeyManagement() {
  const steps = [
    {
      title: "Get a key",
      body: "Start a free 14-day trial (100 calls, one key per email) or subscribe for a live key. Your key is shown once, so copy it into your password manager or secret store.",
      actions: [
        { label: "Start a 14-day trial key", href: TRIAL_KEY_URL, primary: true },
        { label: "Subscribe for a live key", href: SUBSCRIBE_URL },
      ],
    },
    {
      title: "Keep it secret",
      body: "Trial keys start with jf_test_ and live keys with jf_live_. Put the key in an environment variable such as JOURNEY_API_KEY. Don't commit it or paste it into a browser app.",
    },
    {
      title: "Check that it works",
      body: "Call the account endpoint with your key. A 200 shows your plan and remaining calls; a 401 means the key is wrong or expired.",
      code: `curl -H "Authorization: Bearer $JOURNEY_API_KEY" ${ACCOUNT_ENDPOINT}`,
      actions: [{ label: "REST, MCP and terminal setup", href: CONNECT_URL }],
    },
  ]

  return (
    <section id="api-keys" className="flex scroll-mt-6 flex-col gap-4">
      <div className="flex items-center gap-2">
        <Key className="size-4 text-terminal-green" />
        <h2 className="text-sm font-semibold text-foreground">API Keys</h2>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-start gap-3 border-b border-border p-5">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-terminal-green" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your key comes from the Journey price feed at price.journeyfoods.io and works with its REST API, MCP
            server and terminal. For your security this portal never shows or stores a key.
          </p>
        </div>

        <ol className="flex flex-col divide-y divide-border">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4 p-5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-terminal-green/15 font-mono text-xs font-bold text-terminal-green">
                {i + 1}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="text-sm font-medium text-foreground">{step.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{step.body}</p>
                {step.code && (
                  <div className="flex items-start gap-2 overflow-x-auto rounded-md border border-border bg-secondary px-3 py-2">
                    <Terminal className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <code className="whitespace-pre font-mono text-[11px] text-foreground">{step.code}</code>
                  </div>
                )}
                {step.actions && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {step.actions.map((action) => (
                      <a
                        key={action.label}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          "primary" in action && action.primary
                            ? "inline-flex items-center gap-1 rounded-md bg-terminal-green px-3 py-1.5 font-mono text-xs font-bold text-primary-foreground transition-colors hover:bg-terminal-green-dim"
                            : "inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:bg-muted"
                        }
                      >
                        {action.label}
                        <ArrowUpRight className="size-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
