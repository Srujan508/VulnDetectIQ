import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, X, Maximize, Minus, Trash2, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion"; // Import motion components

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const chatVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 }
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 }
  },
};

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! I'm Django, your cybersecurity assistant. I can help with vulnerabilities, threat intelligence, MITRE ATT&CK techniques, Shodan searches, and security-related questions.",
      timestamp: "10:03 PM",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: Date.now().toString() + "-bot",
        sender: "bot",
        text: "I received your message. How can I assist you further?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 w-[350px] bg-card rounded-lg shadow-lg flex flex-col max-h-[500px]"
          variants={chatVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Chatbot Header */}
          <div className="flex items-center justify-between p-3 border-b border-border bg-background rounded-t-lg">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Django Avatar" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Django</h3>
                <p className="text-xs text-primary">Cybersecurity Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-400 block mr-1"></span>
              <span className="text-xs text-foreground">Connected</span>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                <Maximize className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                <Minus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs text-muted-foreground mt-1 text-right">{message.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="border-t border-border p-3 bg-background rounded-b-lg flex items-center gap-2">
            <Input
              placeholder="Ask about CVEs, IOCs, MITRE techniques..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              className="flex-1 bg-muted border-input text-foreground placeholder-muted-foreground focus:ring-ring focus:border-ring"
            />
            <Button onClick={handleSendMessage} disabled={inputMessage.trim() === ""} size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
