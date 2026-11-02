"use client"

import { useState } from "react"
import { Check, Copy, KeyRound, Play, RefreshCw } from "lucide-react"
import { ACCOUNT_ENDPOINT, SAMPLE_ENDPOINT, TRIAL_KEY_URL } from "@/lib/portal-links"

const sampleCurl = `curl ${SAMPLE_ENDPOINT}`
const keyCurl = `curl -H "Authorization: Bearer $JOURNEY_API_KEY" \\
  ${ACCOUNT_ENDPOINT}`

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[#6b9e96] transition-colors hover:text-[#d0e8e4]"
    >
      {copied ? <Check className="size-3 text-terminal-green" /> : <Copy className="size-3" />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}

/**
 * A call that works today. The sample endpoint needs no key, so "Run" hits the
 * live API from the browser. The second snippet checks a real key; it reads the
 * key from an environment variable and never puts one in the page.
 */
export function QuickStart() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [result, setResult] = useState("")

  async function run() {
    setState("loading")
    try {
      const res = await fetch(SAMPLE_ENDPOINT, { headers: { accept: "application/json" } })
      const body = await res.json()
      const rows = Array.isArray(body.data) ? body.data.slice(0, 3) : body.data
      setResult(JSON.stringify({ status: res.status, updatedAt: body.updatedAt, data: rows }, null, 2))
      setState(res.ok ? "done" : "error")
    } catch {
      setResult("The request didn't reach the API. Check your connection and try again.")
      setState("error")
    }
  }

  return (
    <section id="quickstart" className="flex scroll-mt-6 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground">Quick Start</h2>
        <p className="text-sm text-muted-foreground">
          Make a real call now with no key, then get your own key and check it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-[#0c1f1b]">
          <div className="flex items-center justify-between border-b border-[#1a3d35] px-4 py-2">
            <span className="font-mono text-xs text-terminal-green">1. Sample call (no key)</span>
            <div className="flex items-center gap-2">
              <CopyButton text={sampleCurl} />
              <button
                onClick={run}
                disabled={state === "loading"}
                className="flex items-center gap-1 rounded-md bg-terminal-green/15 px-2.5 py-1 text-xs text-terminal-green transition-colors hover:bg-terminal-green/25 disabled:opacity-60"
              >
                {state === "loading" ? <RefreshCw className="size-3 animate-spin" /> : <Play className="size-3" />}
                <span>Run</span>
              </button>
            </div>
          </div>
          <pre className="overflow-auto p-4 font-mono text-xs leading-relaxed text-[#d0e8e4]">
            <code>{sampleCurl}</code>
          </pre>
          {state !== "idle" && state !== "loading" && (
            <pre
              className={`max-h-64 overflow-auto border-t border-[#1a3d35] p-4 font-mono text-[11px] leading-relaxed ${
                state === "error" ? "text-red-300" : "text-[#9fd8cc]"
              }`}
            >
              <code>{result}</code>
            </pre>
          )}
        </div>

        <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-[#0c1f1b]">
          <div className="flex items-center justify-between border-b border-[#1a3d35] px-4 py-2">
            <span className="font-mono text-xs text-terminal-green">2. Check your own key</span>
            <CopyButton text={keyCurl} />
          </div>
          <pre className="overflow-auto p-4 font-mono text-xs leading-relaxed text-[#d0e8e4]">
            <code>{keyCurl}</code>
          </pre>
          <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-[#1a3d35] px-4 py-3 text-xs text-[#9fbfb8]">
            <KeyRound className="size-3.5 text-terminal-green" />
            <span>No key yet?</span>
            <a href="/settings#api-keys" className="text-terminal-green underline-offset-4 hover:underline">
              See how to get one
            </a>
            <span>or</span>
            <a
              href={TRIAL_KEY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green underline-offset-4 hover:underline"
            >
              start a 14-day trial key
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
