import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, EyeOff, Lock, Mail, Terminal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminLoginProps {
  onLogin: (credentials: { email: string; password: string }) => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate authentication
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      onLogin({ email, password })
      toast({
        title: "Authentication Successful",
        description: "Welcome to CyberShield Admin Portal",
      })
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background cyber-bg-glow cyber-grid flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      
      <Card className="w-full max-w-md cyber-border cyber-pulse" data-testid="card-admin-login">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center cyber-glow">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold cyber-text-glow">CyberShield Admin</CardTitle>
            <p className="text-muted-foreground mt-2">
              Secure access to administrative controls
            </p>
          </div>
          <Badge variant="outline" className="mx-auto">
            <Terminal className="h-3 w-3 mr-1" />
            Administrative Portal
          </Badge>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Administrator Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@cybershield.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 cyber-border"
                  required
                  data-testid="input-admin-email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admin-password">Security Passphrase</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 cyber-border"
                  required
                  data-testid="input-admin-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full cyber-glow" 
              disabled={isLoading}
              data-testid="button-admin-login"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Access Admin Portal
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Authorized personnel only. All access is monitored and logged.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}