import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Zap, Lock } from "lucide-react"

interface AuthSelectorProps {
  onSelectRole: (role: "admin" | "customer") => void
}

export function AuthSelector({ onSelectRole }: AuthSelectorProps) {
  return (
    <div className="min-h-screen bg-background cyber-bg-glow cyber-grid flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 pointer-events-none" />
      
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center cyber-glow cyber-pulse">
            <Zap className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold cyber-text-glow">CyberShield</h1>
          <p className="text-xl text-muted-foreground">
            Centralized Vulnerability Detection & Intelligence
          </p>
          <Badge variant="outline" className="text-sm">
            <Lock className="h-3 w-3 mr-1" />
            Secure Access Portal
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Portal */}
          <Card 
            className="cyber-border hover-elevate cursor-pointer cyber-scan-line transition-all duration-300"
            onClick={() => onSelectRole("admin")}
            data-testid="card-admin-access"
          >
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center cyber-glow">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Administrative Access</CardTitle>
              <Badge variant="destructive" className="mx-auto">
                Restricted Access
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Full system control and security management
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  System configuration & monitoring
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  User management & permissions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  Advanced threat analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  Security policy enforcement
                </li>
              </ul>
              <Button className="w-full cyber-glow" data-testid="button-admin-portal">
                <Shield className="h-4 w-4 mr-2" />
                Admin Portal
              </Button>
            </CardContent>
          </Card>

          {/* Customer Portal */}
          <Card 
            className="cyber-border hover-elevate cursor-pointer transition-all duration-300"
            onClick={() => onSelectRole("customer")}
            data-testid="card-customer-access"
          >
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl">Client Dashboard</CardTitle>
              <Badge variant="secondary" className="mx-auto">
                Enterprise Access
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Monitor your organization's security posture
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  Vulnerability reporting & analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  Real-time security alerts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  Compliance tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  Custom security reports
                </li>
              </ul>
              <Button variant="outline" className="w-full" data-testid="button-customer-portal">
                <User className="h-4 w-4 mr-2" />
                Client Portal
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>Powered by advanced AI-driven threat detection • Enterprise-grade security</p>
        </div>
      </div>
    </div>
  )
}