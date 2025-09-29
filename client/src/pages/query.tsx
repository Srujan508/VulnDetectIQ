import { QueryInterface } from "@/components/query-interface"

export default function QueryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Intelligent Query Interface</h1>
        <p className="text-muted-foreground">
          Ask natural language questions about your security data and get instant insights.
        </p>
      </div>

      <div className="max-w-4xl">
        <QueryInterface />
      </div>
    </div>
  )
}