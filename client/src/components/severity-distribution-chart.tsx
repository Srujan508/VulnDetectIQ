import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

//todo: remove mock functionality
const mockData = [
  { name: "Critical", value: 23, color: "#dc2626" },
  { name: "High", value: 45, color: "#ea580c" },
  { name: "Medium", value: 78, color: "#ca8a04" },
  { name: "Low", value: 134, color: "#16a34a" }
]

interface SeverityDistributionChartProps {
  data?: Array<{ name: string; value: number; color: string }>
  title?: string
}

export function SeverityDistributionChart({ 
  data = mockData, 
  title = "Vulnerability Distribution by Severity" 
}: SeverityDistributionChartProps) {
  return (
    <Card data-testid="chart-severity-distribution">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} vulnerabilities`, 'Count']}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => (
                  <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}