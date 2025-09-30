import { useState } from "react"
// import { ScanManagement } from "@/components/scan-management"
import { ScanConfigurationForm } from "@/components/scan-configuration-form"
import { VulnerabilityIdentificationTool } from "@/components/vulnerability-identification-tool"

export default function ScansPage() {
  const [scanStarted, setScanStarted] = useState(false)

  const handleStartScan = () => {
    setScanStarted(true)
  }

  return (
    <div className="space-y-6">
      {scanStarted ? (
        <VulnerabilityIdentificationTool />
      ) : (
        <ScanConfigurationForm onStartScan={handleStartScan} />
      )}
    </div>
  )
}