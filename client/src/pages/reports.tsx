import { SeverityDistributionChart } from "@/components/severity-distribution-chart"
import { VulnerabilityTrendChart } from "@/components/vulnerability-trend-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, BarChart } from "lucide-react"

//todo: remove mock functionality
const mockReports = [
  {
    id: "RPT-001",
    title: "Monthly Security Assessment",
    type: "comprehensive",
    generatedDate: new Date("2024-01-15"),
    status: "ready",
    size: "2.4 MB"
  },
  {
    id: "RPT-002", 
    title: "Critical Vulnerabilities Summary",
    type: "critical",
    generatedDate: new Date("2024-01-14"),
    status: "ready",
    size: "1.8 MB"
  },
  {
    id: "RPT-003",
    title: "Compliance Report - SOC 2",
    type: "compliance",
    generatedDate: new Date("2024-01-13"),
    status: "generating",
    size: "Pending"
  }
]

export default function ReportsPage() {
  const generateReport = (type: string) => {
    console.log('Generating report:', type) //todo: remove mock functionality
  }

  const downloadReport = (reportId: string) => {
    console.log('Downloading report:', reportId) //todo: remove mock functionality
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Generate comprehensive security reports and analyze vulnerability trends.
        </p>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => generateReport('comprehensive')} data-testid="button-generate-comprehensive">
              <BarChart className="h-4 w-4 mr-2" />
              Comprehensive Assessment
            </Button>
            <Button onClick={() => generateReport('critical')} variant="outline" data-testid="button-generate-critical">
              <FileText className="h-4 w-4 mr-2" />
              Critical Vulnerabilities
            </Button>
            <Button onClick={() => generateReport('compliance')} variant="outline" data-testid="button-generate-compliance">
              <Calendar className="h-4 w-4 mr-2" />
              Compliance Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SeverityDistributionChart title="Current Vulnerability Distribution" />
        <VulnerabilityTrendChart title="6-Month Vulnerability Trends" />
      </div>

      {/* Recent Reports */}
      <Card data-testid="card-recent-reports">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockReports.map((report) => (
              <div 
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border hover-elevate"
                data-testid={`report-${report.id}`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Generated on {report.generatedDate.toLocaleDateString()} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={report.status === 'ready' ? 'secondary' : 'secondary'}>
                    {report.status}
                  </Badge>
                  {report.status === 'ready' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => downloadReport(report.id)}
                      data-testid={`button-download-${report.id}`}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}