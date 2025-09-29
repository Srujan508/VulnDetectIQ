import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Eye, EyeOff, Lock, Mail, Building } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CustomerLoginProps {
  onLogin: (credentials: { email: string; password: string }) => void
}

export function CustomerLogin({ onLogin }: CustomerLoginProps) {
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
        title: "Login Successful",
        description: "Welcome to your security dashboard",
      })
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background cyber-bg-glow cyber-grid flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 pointer-events-none" />
      
      <Card className="w-full max-w-md cyber-border" data-testid="card-customer-login">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center cyber-glow">
            <User className="h-8 w-8 text-accent" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Customer Portal</CardTitle>
            <p className="text-muted-foreground mt-2">
              Access your security monitoring dashboard
            </p>
          </div>
          <Badge variant="outline" className="mx-auto">
            <Building className="h-3 w-3 mr-1" />
            Enterprise Client Access
          </Badge>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="customer-email"
                  type="email"
                  placeholder="your@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 cyber-border"
                  required
                  data-testid="input-customer-email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customer-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="customer-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 cyber-border"
                  required
                  data-testid="input-customer-password"
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
              className="w-full" 
              disabled={isLoading}
              data-testid="button-customer-login"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          
          <Separator className="my-6" />
          
          <div className="space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?
            </p>
            <Button variant="outline" className="w-full" data-testid="button-contact-sales">
              <Building className="h-4 w-4 mr-2" />
              Contact Sales
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Protected by enterprise-grade security
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}