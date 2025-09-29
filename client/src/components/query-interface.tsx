import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Search } from "lucide-react"

interface QueryMessage {
  id: string
  type: "user" | "bot"
  message: string
  timestamp: Date
  results?: Array<{
    id: string
    title: string
    severity: "critical" | "high" | "medium" | "low"
    description: string
  }>
}

//todo: remove mock functionality
const mockResults = [
  { id: "CVE-2024-001", title: "SQL Injection in User Authentication", severity: "critical" as const, description: "Critical vulnerability allowing unauthorized database access" },
  { id: "CVE-2024-002", title: "XSS in Comment System", severity: "high" as const, description: "Cross-site scripting vulnerability in user comments" },
  { id: "CVE-2024-003", title: "Outdated Library Dependencies", severity: "medium" as const, description: "Several third-party libraries need security updates" }
]

const severityColors = {
  critical: "destructive",
  high: "secondary", 
  medium: "secondary",
  low: "secondary"
} as const

export function QueryInterface() {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<QueryMessage[]>([
    {
      id: "1",
      type: "bot",
      message: "Hello! I'm your security assistant. Ask me about vulnerabilities, scan results, or system status. For example: 'Show me all critical vulnerabilities from the last 30 days'",
      timestamp: new Date()
    }
  ])

  const handleSendQuery = () => {
    if (!query.trim()) return

    const userMessage: QueryMessage = {
      id: Date.now().toString(),
      type: "user",
      message: query,
      timestamp: new Date()
    }

    const botResponse: QueryMessage = {
      id: (Date.now() + 1).toString(),
      type: "bot", 
      message: `I found ${mockResults.length} vulnerabilities matching your query. Here are the results:`,
      timestamp: new Date(),
      results: mockResults
    }

    setMessages(prev => [...prev, userMessage, botResponse])
    setQuery("")
    console.log('Query sent:', query) // todo: remove mock functionality
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendQuery()
    }
  }

  return (
    <Card className="h-[600px] flex flex-col cyber-border cyber-scan-line" data-testid="component-query-interface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 cyber-text-glow">
          <Bot className="h-5 w-5 text-primary" />
          Intelligent Query Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    {message.type === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    {message.results && (
                      <div className="mt-3 space-y-2">
                        {message.results.map((result) => (
                          <div 
                            key={result.id} 
                            className="p-2 rounded border bg-card/50 hover-elevate cursor-pointer"
                            data-testid={`result-${result.id}`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{result.id}</span>
                              <Badge variant={severityColors[result.severity]} className="text-xs">
                                {result.severity}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-sm mb-1">{result.title}</h4>
                            <p className="text-xs text-muted-foreground">{result.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            placeholder="Ask about vulnerabilities, scans, or system status..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            data-testid="input-query"
          />
          <Button 
            onClick={handleSendQuery} 
            disabled={!query.trim()}
            size="icon"
            data-testid="button-send-query"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover-elevate text-xs" onClick={() => setQuery("Show critical vulnerabilities")}>
            Show critical vulnerabilities
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover-elevate text-xs" onClick={() => setQuery("Recent scan results")}>
            Recent scan results
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover-elevate text-xs" onClick={() => setQuery("System health status")}>
            System health status
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}