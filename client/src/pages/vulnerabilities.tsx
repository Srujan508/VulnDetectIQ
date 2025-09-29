import { VulnerabilityTable } from "@/components/vulnerability-table"

export default function VulnerabilitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vulnerability Management</h1>
        <p className="text-muted-foreground">
          Comprehensive view and management of all detected vulnerabilities across your systems.
        </p>
      </div>

      <VulnerabilityTable />
    </div>
  )
}