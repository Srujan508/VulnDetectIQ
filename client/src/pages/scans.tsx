import { ScanManagement } from "@/components/scan-management"

export default function ScansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Scan Management</h1>
        <p className="text-muted-foreground">
          Manage and monitor your security scans across network, web, and code analysis.
        </p>
      </div>

      <ScanManagement />
    </div>
  )
}