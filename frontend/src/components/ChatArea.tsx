"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Smile, Mic, Phone, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  type: "sent" | "received"
}

interface ChatAreaProps {
  messages: Message[]
  onSendMessage: (content: string) => void
}

export function ChatArea({ messages, onSendMessage }: ChatAreaProps) {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim())
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src="/avatars/girl.jpg"
            alt="Helena Hills"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="font-semibold">Helena Hills</h2>
            <p className="text-sm text-gray-500">Active 10m ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.type === "sent" ? "bg-black text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        <div className="text-center">
          <span className="text-xs text-gray-500">
            {new Date().toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                })}
            </span>
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Enter your message"
              className="pr-20 rounded-full border-gray-300 focus:outline-none focus:ring-0 focus:ring-transparent focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-transparent"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Smile className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleSend} disabled={!inputValue.trim()} className="bg-[#3FAC1F] hover:bg-green-400">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

