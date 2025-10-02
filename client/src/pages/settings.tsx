import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [apiEndpoint, setApiEndpoint] = useState("https://api.vulndetectiq.com")
  const [scanConcurrency, setScanConcurrency] = useState(5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Manage application preferences and configurations.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable Notifications</Label>
          <Switch
            id="notifications"
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="api-endpoint">API Endpoint</Label>
          <Input
            id="api-endpoint"
            type="text"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
            placeholder="Enter API endpoint"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scan-concurrency">Scan Concurrency (Max parallel scans)</Label>
          <Input
            id="scan-concurrency"
            type="number"
            value={scanConcurrency}
            onChange={(e) => setScanConcurrency(parseInt(e.target.value))}
            min={1}
            max={10}
          />
        </div>
      </div>
    </div>
  )
}
