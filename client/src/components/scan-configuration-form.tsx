
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function ScanConfigurationForm({ onStartScan }: { onStartScan: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Scan Configuration</h2>
        <p className="text-muted-foreground">
          Configure your vulnerability scan parameters
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="target">Target</Label>
          <Input id="target" placeholder="demo.owasp-juice.shop" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="port-range">Port Range</Label>
          <Input id="port-range" placeholder="80,443,22,21,25,53" />
        </div>
        {/* Skipping "Scan Type" (timer part) for now as requested */}
        <Button className="w-full" onClick={onStartScan}>
          Start Scan
        </Button>
      </div>
    </div>
  );
}
