import { useState } from "react"
import { useLocation } from "wouter"
// import { ScanManagement } from "@/components/scan-management"
import { ScanConfigurationForm } from "@/components/scan-configuration-form"
import { VulnerabilityIdentificationTool } from "@/components/vulnerability-identification-tool"

export default function ScansPage() {
  const [location, setLocation] = useLocation()

  const handleStartScan = () => {
    setLocation("/vulnerabilities?scanStarted=true")
  }

  return (
    <div className="space-y-6">
      <ScanConfigurationForm onStartScan={handleStartScan} />
    </div>
  )
}