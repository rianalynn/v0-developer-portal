"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Key,
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  Shield,
  Clock,
  AlertTriangle,
} from "lucide-react"

export function ApiKeyManagement() {
  const [copied, setCopied] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [showRegenDialog, setShowRegenDialog] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const maskedKey = "sk-jrny_••••••••••••••••••••x8f2"
  const fullKey = "sk-jrny_a3k8m2p9x7r4w1t6n5v0q8e3x8f2"
  const requestsUsed = 450
  const requestsLimit = 1000
  const usagePercent = (requestsUsed / requestsLimit) * 100

  function handleCopy() {
    navigator.clipboard.writeText(fullKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleRegenerate() {
    setIsRegenerating(true)
    setTimeout(() => {
      setIsRegenerating(false)
      setShowRegenDialog(false)
    }, 1500)
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Key className="size-4 text-terminal-green" />
        <h2 className="text-sm font-semibold text-foreground">API Key Management</h2>
      </div>

      <div className="rounded-lg border border-border bg-card">
        {/* Key Display Row */}
        <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Production API Key</span>
              <Badge
                variant="outline"
                className="border-terminal-green/30 bg-terminal-green-subtle text-terminal-green font-mono text-[9px] px-1.5 py-0"
              >
                LIVE
              </Badge>
            </div>

            {/* Key Field */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2">
                <Shield className="size-3.5 text-muted-foreground" />
                <code className="font-mono text-sm text-foreground">
                  {revealed ? fullKey : maskedKey}
                </code>
              </div>

              <button
                onClick={() => setRevealed(!revealed)}
                className="flex size-8 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={revealed ? "Hide API key" : "Reveal API key"}
              >
                {revealed ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {copied ? (
                  <Check className="size-3.5 text-terminal-green" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>

              <button
                onClick={() => setShowRegenDialog(true)}
                className="flex items-center gap-1.5 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive transition-colors hover:bg-destructive/10"
              >
                <RefreshCw className="size-3.5" />
                <span>Regenerate</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>Created Jan 15, 2026</span>
              </div>
              <span className="text-border">|</span>
              <span>Last used 2 minutes ago</span>
            </div>
          </div>
        </div>

        {/* Usage Bar */}
        <div className="border-t border-border px-5 py-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Requests used this month</span>
              <span className="font-mono text-xs text-muted-foreground">
                <span className="text-foreground font-semibold">{requestsUsed.toLocaleString()}</span>
                {" / "}
                {requestsLimit.toLocaleString()}
              </span>
            </div>
            <Progress value={usagePercent} className="h-2 bg-secondary" />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                {usagePercent < 80
                  ? "Usage is healthy"
                  : "Approaching limit"}
              </span>
              <span className="text-[11px] text-muted-foreground">
                Resets Mar 1, 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Regenerate Confirmation Dialog */}
      <Dialog open={showRegenDialog} onOpenChange={setShowRegenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-destructive" />
              Regenerate API Key
            </DialogTitle>
            <DialogDescription>
              This will permanently invalidate your current API key. All applications using the existing key will stop working immediately. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button className="rounded-md border border-border bg-secondary px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:opacity-50"
            >
              {isRegenerating && <RefreshCw className="size-3.5 animate-spin" />}
              {isRegenerating ? "Regenerating..." : "Regenerate Key"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
