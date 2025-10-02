import { VulnerabilityTable } from "@/components/vulnerability-table"
import { VulnerabilityIdentificationTool } from "@/components/vulnerability-identification-tool"
import { useLocation } from "wouter"

export default function VulnerabilitiesPage() {
  // const [path] = useLocation() // Not needed for query params
  // console.log("Current path:", path)
  const queryString = window.location.search // Get full query string
  // console.log("Query string from window.location.search:", queryString) // Debugging
  const showUpload = new URLSearchParams(queryString).get("scanStarted") === "true"
  // console.log("Show upload:", showUpload) // Debugging

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vulnerability Management</h1>
        <p className="text-muted-foreground">
          Comprehensive view and management of all detected vulnerabilities across your systems.
        </p>
      </div>
      <VulnerabilityTable />
      {showUpload && <VulnerabilityIdentificationTool />}
    </div>
  )
}