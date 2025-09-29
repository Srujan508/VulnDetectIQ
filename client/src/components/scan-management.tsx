import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Trash2, Plus, Activity } from "lucide-react"

interface Scan {
  id: string
  name: string
  type: "network" | "web" | "code"
  status: "running" | "completed" | "paused" | "failed"
  progress: number
  startTime: Date
  estimatedCompletion?: Date
  vulnerabilitiesFound: number
}

//todo: remove mock functionality
const mockScans: Scan[] = [
  {
    id: "scan-001",
    name: "Production Network Scan",
    type: "network", 
    status: "running",
    progress: 67,
    startTime: new Date(Date.now() - 3600000),
    estimatedCompletion: new Date(Date.now() + 1800000),
    vulnerabilitiesFound: 12
  },
  {
    id: "scan-002", 
    name: "Web Application Security Test",
    type: "web",
    status: "completed",
    progress: 100,
    startTime: new Date(Date.now() - 7200000),
    vulnerabilitiesFound: 8
  },
  {
    id: "scan-003",
    name: "Source Code Analysis", 
    type: "code",
    status: "paused",
    progress: 34,
    startTime: new Date(Date.now() - 1800000),
    vulnerabilitiesFound: 3
  }
]

const statusConfig = {
  running: { color: "default", icon: Activity },
  completed: { color: "secondary", icon: Activity },
  paused: { color: "secondary", icon: Pause },
  failed: { color: "destructive", icon: Activity }
} as const

const typeConfig = {
  network: { label: "Network Scan", color: "default" },
  web: { label: "Web Application", color: "default" },
  code: { label: "Code Analysis", color: "default" }
} as const

export function ScanManagement() {
  const [scans, setScans] = useState<Scan[]>(mockScans)
  const [newScanType, setNewScanType] = useState<string>("")

  const startNewScan = () => {
    if (!newScanType) return
    
    const newScan: Scan = {
      id: `scan-${Date.now()}`,
      name: `New ${typeConfig[newScanType as keyof typeof typeConfig].label}`,
      type: newScanType as "network" | "web" | "code",
      status: "running",
      progress: 0,
      startTime: new Date(),
      vulnerabilitiesFound: 0
    }
    
    setScans(prev => [newScan, ...prev])
    setNewScanType("")
    console.log('Started new scan:', newScan) //todo: remove mock functionality
  }

  const pauseScan = (id: string) => {
    setScans(prev => prev.map(scan => 
      scan.id === id ? { ...scan, status: "paused" as const } : scan
    ))
    console.log('Paused scan:', id) //todo: remove mock functionality
  }

  const resumeScan = (id: string) => {
    setScans(prev => prev.map(scan =>
      scan.id === id ? { ...scan, status: "running" as const } : scan
    ))
    console.log('Resumed scan:', id) //todo: remove mock functionality
  }

  const deleteScan = (id: string) => {
    setScans(prev => prev.filter(scan => scan.id !== id))
    console.log('Deleted scan:', id) //todo: remove mock functionality
  }

  return (
    <Card data-testid="component-scan-management">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Scan Management</span>
          <div className="flex items-center gap-2">
            <Select value={newScanType} onValueChange={setNewScanType}>
              <SelectTrigger className="w-48" data-testid="select-scan-type">
                <SelectValue placeholder="Select scan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="network">Network Scan</SelectItem>
                <SelectItem value="web">Web Application</SelectItem>
                <SelectItem value="code">Code Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={startNewScan} 
              disabled={!newScanType}
              data-testid="button-start-scan"
            >
              <Plus className="h-4 w-4 mr-2" />
              Start Scan
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scans.map((scan) => {
            const StatusIcon = statusConfig[scan.status].icon
            
            return (
              <div 
                key={scan.id} 
                className="p-4 rounded-lg border hover-elevate"
                data-testid={`scan-${scan.id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <StatusIcon className="h-5 w-5" />
                    <div>
                      <h3 className="font-medium">{scan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Started {scan.startTime.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={typeConfig[scan.type].color as any}>
                      {typeConfig[scan.type].label}
                    </Badge>
                    <Badge variant={statusConfig[scan.status].color as any}>
                      {scan.status}
                    </Badge>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress: {scan.progress}%</span>
                    <span>{scan.vulnerabilitiesFound} vulnerabilities found</span>
                  </div>
                  <Progress value={scan.progress} className="h-2" />
                  {scan.estimatedCompletion && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Est. completion: {scan.estimatedCompletion.toLocaleTimeString()}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  {scan.status === "running" && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => pauseScan(scan.id)}
                      data-testid={`button-pause-${scan.id}`}
                    >
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                  )}
                  {scan.status === "paused" && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => resumeScan(scan.id)}
                      data-testid={`button-resume-${scan.id}`}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Resume
                    </Button>
                  )}
                  {scan.status === "completed" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      data-testid={`button-restart-${scan.id}`}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Restart
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => deleteScan(scan.id)}
                    data-testid={`button-delete-${scan.id}`}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}