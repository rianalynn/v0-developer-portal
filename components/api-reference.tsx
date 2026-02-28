"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Copy,
  Check,
  Play,
  ChevronRight,
  Lock,
  ArrowRight,
} from "lucide-react"

const endpoints = [
  {
    method: "GET",
    path: "/v3/ingredients/search",
    description: "Search the ingredient database",
    auth: true,
  },
  {
    method: "POST",
    path: "/v3/formulations/create",
    description: "Create a new formulation",
    auth: true,
  },
  {
    method: "GET",
    path: "/v3/ingredients/{id}/nutrients",
    description: "Retrieve nutrient profile for an ingredient",
    auth: true,
  },
  {
    method: "POST",
    path: "/v3/formulations/{id}/optimize",
    description: "Optimize an existing formulation",
    auth: true,
  },
]

const curlSnippet = `curl -X GET "https://api.journeyai.com/v3/ingredients/search" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "whey protein isolate",
    "filters": {
      "allergens": ["dairy"],
      "min_protein": 80,
      "organic": true
    },
    "limit": 25,
    "offset": 0
  }'`

const jsonResponse = `{
  "status": 200,
  "data": {
    "total_results": 1247,
    "ingredients": [
      {
        "id": "ing_8f3k2m",
        "name": "Whey Protein Isolate 90%",
        "category": "Protein",
        "supplier": "Fonterra Co-operative",
        "nutrients": {
          "protein_g": 90.0,
          "fat_g": 0.5,
          "carbs_g": 1.0,
          "calories_kcal": 370
        },
        "allergens": ["dairy", "milk"],
        "certifications": ["organic", "non-gmo"],
        "cost_per_kg": 12.50,
        "data_confidence": 0.97
      }
    ],
    "query_time_ms": 23,
    "cache_hit": false
  },
  "meta": {
    "request_id": "req_9x7k2p4m",
    "rate_limit_remaining": 4987,
    "api_version": "3.2.1"
  }
}`

const pythonSnippet = `import journeyai

client = journeyai.Client(api_key="YOUR_API_KEY")

results = client.ingredients.search(
    query="whey protein isolate",
    filters={
        "allergens": ["dairy"],
        "min_protein": 80,
        "organic": True
    },
    limit=25
)

for ingredient in results.ingredients:
    print(f"{ingredient.name}: {ingredient.nutrients.protein_g}g protein")`

const parametersData = [
  { name: "query", type: "string", required: true, description: "Search query string for ingredient name, category, or attribute" },
  { name: "filters", type: "object", required: false, description: "Filter object with fields: allergens, min_protein, organic, kosher, halal" },
  { name: "limit", type: "integer", required: false, description: "Maximum results to return (1-100). Default: 25" },
  { name: "offset", type: "integer", required: false, description: "Pagination offset for result set. Default: 0" },
  { name: "sort", type: "string", required: false, description: "Sort field: relevance, name, cost, protein. Default: relevance" },
  { name: "fields", type: "string[]", required: false, description: "Specific fields to include in response. Default: all" },
]

function MethodBadge({ method }: { method: string }) {
  const colorMap: Record<string, string> = {
    GET: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    POST: "bg-terminal-green-subtle text-terminal-green border-terminal-green/20",
    PUT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
  }
  return (
    <span className={cn("rounded border px-1.5 py-0.5 font-mono text-[10px] font-bold", colorMap[method] || "")}>
      {method}
    </span>
  )
}

export function ApiReference() {
  const [copied, setCopied] = useState(false)
  const [activeEndpoint, setActiveEndpoint] = useState(0)
  const [codeTab, setCodeTab] = useState("curl")

  function handleCopy() {
    const text = codeTab === "curl" ? curlSnippet : codeTab === "response" ? jsonResponse : pythonSnippet
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">API Reference</h2>
          <Badge
            variant="outline"
            className="border-terminal-green/30 bg-terminal-green-subtle text-terminal-green font-mono text-[10px]"
          >
            v3.2.1
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">Base URL:</span>
          <code className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-xs text-terminal-green">
            https://api.journeyai.com
          </code>
        </div>
      </div>

      {/* Endpoint List */}
      <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-2">
        {endpoints.map((ep, idx) => (
          <button
            key={idx}
            onClick={() => setActiveEndpoint(idx)}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors",
              activeEndpoint === idx
                ? "bg-terminal-green-subtle border border-terminal-green/20"
                : "border border-transparent hover:bg-secondary"
            )}
          >
            <MethodBadge method={ep.method} />
            <code className="flex-1 font-mono text-xs text-foreground">{ep.path}</code>
            {ep.auth && <Lock className="size-3 text-muted-foreground" />}
            <ChevronRight
              className={cn(
                "size-3.5 text-muted-foreground transition-transform",
                activeEndpoint === idx && "text-terminal-green"
              )}
            />
          </button>
        ))}
      </div>

      {/* Split-Pane View */}
      <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-lg border border-border lg:grid-cols-2">
        {/* Left Pane: Documentation */}
        <div className="flex flex-col gap-4 bg-card p-5">
          <div className="flex items-center gap-2">
            <MethodBadge method={endpoints[activeEndpoint].method} />
            <code className="font-mono text-sm text-foreground">{endpoints[activeEndpoint].path}</code>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {endpoints[activeEndpoint].description}. Returns paginated results with full nutrient profiles,
            allergen data, supplier information, and cost estimates. Supports advanced filtering and field selection.
          </p>

          {/* Auth Notice */}
          <div className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2">
            <Lock className="size-3.5 text-terminal-green" />
            <span className="text-xs text-muted-foreground">
              Requires <code className="text-terminal-green">Bearer</code> authentication token
            </span>
          </div>

          {/* Parameters Table */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Parameters</h4>
            <div className="flex flex-col gap-px overflow-hidden rounded-md border border-border">
              {parametersData.map((param, idx) => (
                <div
                  key={param.name}
                  className={cn(
                    "grid grid-cols-[1fr_0.6fr_0.5fr_2fr] gap-3 px-3 py-2 text-xs",
                    idx % 2 === 0 ? "bg-surface" : "bg-secondary/50"
                  )}
                >
                  <code className="font-mono text-terminal-green">{param.name}</code>
                  <span className="font-mono text-muted-foreground">{param.type}</span>
                  <span>
                    {param.required ? (
                      <span className="text-terminal-green">required</span>
                    ) : (
                      <span className="text-muted-foreground">optional</span>
                    )}
                  </span>
                  <span className="text-muted-foreground">{param.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Response Codes */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Response Codes</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { code: "200", label: "Success", color: "text-terminal-green" },
                { code: "400", label: "Bad Request", color: "text-amber-400" },
                { code: "401", label: "Unauthorized", color: "text-red-400" },
                { code: "429", label: "Rate Limited", color: "text-amber-400" },
                { code: "500", label: "Server Error", color: "text-red-400" },
              ].map((resp) => (
                <div key={resp.code} className="flex items-center gap-1.5 rounded border border-border bg-secondary px-2 py-1">
                  <code className={cn("font-mono text-xs font-bold", resp.color)}>{resp.code}</code>
                  <span className="text-[10px] text-muted-foreground">{resp.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane: Code Snippet */}
        <div className="flex flex-col bg-[#0c1f1b]">
          {/* Code Tabs Header */}
          <div className="flex items-center justify-between border-b border-[#1a3d35] px-4 py-2">
            <div className="flex items-center gap-1">
              {[
                { id: "curl", label: "cURL" },
                { id: "python", label: "Python" },
                { id: "response", label: "Response" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCodeTab(tab.id)}
                  className={cn(
                    "rounded-md px-2.5 py-1 font-mono text-xs transition-colors",
                    codeTab === tab.id
                      ? "bg-terminal-green/15 text-terminal-green"
                      : "text-[#6b9e96] hover:text-[#d0e8e4]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[#6b9e96] transition-colors hover:text-[#d0e8e4]"
              >
                {copied ? <Check className="size-3 text-terminal-green" /> : <Copy className="size-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button className="flex items-center gap-1 rounded-md bg-terminal-green/15 px-2.5 py-1 text-xs text-terminal-green transition-colors hover:bg-terminal-green/25">
                <Play className="size-3" />
                <span>Run</span>
              </button>
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto p-4">
            <pre className="font-mono text-xs leading-relaxed">
              <code>
                {codeTab === "curl" && <CurlHighlighted />}
                {codeTab === "python" && <PythonHighlighted />}
                {codeTab === "response" && <JsonHighlighted />}
              </code>
            </pre>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[#1a3d35] px-4 py-2">
            <span className="font-mono text-[10px] text-[#6b9e96]">
              Response time: <span className="text-terminal-green">23ms</span>
            </span>
            <span className="font-mono text-[10px] text-[#6b9e96]">
              Rate limit: <span className="text-[#d0e8e4]">4,987</span> remaining
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CurlHighlighted() {
  return (
    <span className="text-[#d0e8e4]">
      <span className="text-blue-400">curl</span>{" "}
      <span className="text-amber-400">-X GET</span>{" "}
      <span className="text-terminal-green">{'"https://api.journeyai.com/v3/ingredients/search"'}</span>{" "}
      <span className="text-[#6b9e96]">\</span>{"\n"}
      {"  "}<span className="text-amber-400">-H</span>{" "}
      <span className="text-terminal-green">{'"Authorization: Bearer YOUR_API_KEY"'}</span>{" "}
      <span className="text-[#6b9e96]">\</span>{"\n"}
      {"  "}<span className="text-amber-400">-H</span>{" "}
      <span className="text-terminal-green">{'"Content-Type: application/json"'}</span>{" "}
      <span className="text-[#6b9e96]">\</span>{"\n"}
      {"  "}<span className="text-amber-400">-d</span>{" "}
      <span className="text-terminal-green">{"'"}</span>
      <span className="text-[#d0e8e4]">{"{"}</span>{"\n"}
      {"    "}<span className="text-blue-400">{'"query"'}</span>
      <span className="text-[#d0e8e4]">: </span>
      <span className="text-terminal-green">{'"whey protein isolate"'}</span>
      <span className="text-[#d0e8e4]">,</span>{"\n"}
      {"    "}<span className="text-blue-400">{'"filters"'}</span>
      <span className="text-[#d0e8e4]">{": {"}</span>{"\n"}
      {"      "}<span className="text-blue-400">{'"allergens"'}</span>
      <span className="text-[#d0e8e4]">{": ["}</span>
      <span className="text-terminal-green">{'"dairy"'}</span>
      <span className="text-[#d0e8e4]">{"],"}</span>{"\n"}
      {"      "}<span className="text-blue-400">{'"min_protein"'}</span>
      <span className="text-[#d0e8e4]">: </span>
      <span className="text-amber-400">80</span>
      <span className="text-[#d0e8e4]">,</span>{"\n"}
      {"      "}<span className="text-blue-400">{'"organic"'}</span>
      <span className="text-[#d0e8e4]">: </span>
      <span className="text-amber-400">true</span>{"\n"}
      {"    "}<span className="text-[#d0e8e4]">{"},"}</span>{"\n"}
      {"    "}<span className="text-blue-400">{'"limit"'}</span>
      <span className="text-[#d0e8e4]">: </span>
      <span className="text-amber-400">25</span>
      <span className="text-[#d0e8e4]">,</span>{"\n"}
      {"    "}<span className="text-blue-400">{'"offset"'}</span>
      <span className="text-[#d0e8e4]">: </span>
      <span className="text-amber-400">0</span>{"\n"}
      {"  "}<span className="text-[#d0e8e4]">{"}"}</span>
      <span className="text-terminal-green">{"'"}</span>
    </span>
  )
}

function JsonHighlighted() {
  return (
    <span className="text-[#d0e8e4]">
      <span>{"{"}</span>{"\n"}
      {"  "}<span className="text-blue-400">{'"status"'}</span>: <span className="text-amber-400">200</span>,{"\n"}
      {"  "}<span className="text-blue-400">{'"data"'}</span>: {"{"}{"\n"}
      {"    "}<span className="text-blue-400">{'"total_results"'}</span>: <span className="text-amber-400">1247</span>,{"\n"}
      {"    "}<span className="text-blue-400">{'"ingredients"'}</span>: [{"\n"}
      {"      "}{"{"}
      {"\n"}
      {"        "}<span className="text-blue-400">{'"id"'}</span>: <span className="text-terminal-green">{'"ing_8f3k2m"'}</span>,{"\n"}
      {"        "}<span className="text-blue-400">{'"name"'}</span>: <span className="text-terminal-green">{'"Whey Protein Isolate 90%"'}</span>,{"\n"}
      {"        "}<span className="text-blue-400">{'"category"'}</span>: <span className="text-terminal-green">{'"Protein"'}</span>,{"\n"}
      {"        "}<span className="text-blue-400">{'"nutrients"'}</span>: {"{"}{"\n"}
      {"          "}<span className="text-blue-400">{'"protein_g"'}</span>: <span className="text-amber-400">90.0</span>,{"\n"}
      {"          "}<span className="text-blue-400">{'"fat_g"'}</span>: <span className="text-amber-400">0.5</span>,{"\n"}
      {"          "}<span className="text-blue-400">{'"carbs_g"'}</span>: <span className="text-amber-400">1.0</span>,{"\n"}
      {"          "}<span className="text-blue-400">{'"calories_kcal"'}</span>: <span className="text-amber-400">370</span>{"\n"}
      {"        "}{"}"},{"\n"}
      {"        "}<span className="text-blue-400">{'"allergens"'}</span>: [<span className="text-terminal-green">{'"dairy"'}</span>, <span className="text-terminal-green">{'"milk"'}</span>],{"\n"}
      {"        "}<span className="text-blue-400">{'"cost_per_kg"'}</span>: <span className="text-amber-400">12.50</span>,{"\n"}
      {"        "}<span className="text-blue-400">{'"data_confidence"'}</span>: <span className="text-amber-400">0.97</span>{"\n"}
      {"      "}{"}"}{"\n"}
      {"    "}],{"\n"}
      {"    "}<span className="text-blue-400">{'"query_time_ms"'}</span>: <span className="text-amber-400">23</span>{"\n"}
      {"  "}{"}"},{"\n"}
      {"  "}<span className="text-blue-400">{'"meta"'}</span>: {"{"}{"\n"}
      {"    "}<span className="text-blue-400">{'"request_id"'}</span>: <span className="text-terminal-green">{'"req_9x7k2p4m"'}</span>,{"\n"}
      {"    "}<span className="text-blue-400">{'"rate_limit_remaining"'}</span>: <span className="text-amber-400">4987</span>,{"\n"}
      {"    "}<span className="text-blue-400">{'"api_version"'}</span>: <span className="text-terminal-green">{'"3.2.1"'}</span>{"\n"}
      {"  "}{"}"}{"\n"}
      {"}"}
    </span>
  )
}

function PythonHighlighted() {
  return (
    <span className="text-[#d0e8e4]">
      <span className="text-blue-400">import</span> journeyai{"\n"}
      {"\n"}
      <span className="text-[#6b9e96]"># Initialize the client</span>{"\n"}
      client = journeyai.<span className="text-amber-400">Client</span>(
      {"\n"}{"    "}api_key=<span className="text-terminal-green">{'"YOUR_API_KEY"'}</span>
      {"\n"}){"\n"}
      {"\n"}
      <span className="text-[#6b9e96]"># Search for ingredients</span>{"\n"}
      results = client.ingredients.<span className="text-amber-400">search</span>({"\n"}
      {"    "}query=<span className="text-terminal-green">{'"whey protein isolate"'}</span>,{"\n"}
      {"    "}filters={"{"}{"\n"}
      {"        "}<span className="text-terminal-green">{'"allergens"'}</span>: [<span className="text-terminal-green">{'"dairy"'}</span>],{"\n"}
      {"        "}<span className="text-terminal-green">{'"min_protein"'}</span>: <span className="text-amber-400">80</span>,{"\n"}
      {"        "}<span className="text-terminal-green">{'"organic"'}</span>: <span className="text-amber-400">True</span>{"\n"}
      {"    "}{"}"},{"\n"}
      {"    "}limit=<span className="text-amber-400">25</span>{"\n"}
      ){"\n"}
      {"\n"}
      <span className="text-blue-400">for</span> ingredient <span className="text-blue-400">in</span> results.ingredients:{"\n"}
      {"    "}<span className="text-amber-400">print</span>(<span className="text-terminal-green">f"{"{"}ingredient.name{"}"}: {"{"}ingredient.nutrients.protein_g{"}"}g protein"</span>)
    </span>
  )
}
