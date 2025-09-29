import { VulnerabilityStatsCard } from "@/components/vulnerability-stats-card"
import { SeverityDistributionChart } from "@/components/severity-distribution-chart"
import { VulnerabilityTrendChart } from "@/components/vulnerability-trend-chart"
import { VulnerabilityTable } from "@/components/vulnerability-table"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight cyber-text-glow">Security Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time overview of your system's security posture and vulnerability status.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <VulnerabilityStatsCard
          title="Critical Vulnerabilities"
          value={23}
          change={-12}
          severity="critical"
          icon="alert"
          description="Immediate attention required"
        />
        <VulnerabilityStatsCard
          title="High Severity"
          value={45}
          change={8}
          severity="high"
          icon="bug"
          description="Address within 24 hours"
        />
        <VulnerabilityStatsCard
          title="Systems Protected"
          value="98.7%"
          change={-2.1}
          severity="info"
          icon="shield"
          description="Overall security coverage"
        />
        <VulnerabilityStatsCard
          title="Active Scans"
          value={7}
          severity="info"
          icon="activity"
          description="Currently running"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SeverityDistributionChart />
        <VulnerabilityTrendChart />
      </div>

      {/* Recent Vulnerabilities */}
      <VulnerabilityTable />
    </div>
  )
}