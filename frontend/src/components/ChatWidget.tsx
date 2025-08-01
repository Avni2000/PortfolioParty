"use client"

import { useState } from "react"
import { MessageCircle, X, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ContactsSidebar } from "./ContactsSidebar"
import { ChatArea } from "./ChatArea"
import { ProfileSidebar } from "./ProfileSidebar"

const contacts = [
  {
    id: "helena-hills",
    name: "Helena Hills",
    lastMessage: "Will head to the Help Center...",
    avatar: "/placeholder.svg?height=40&width=40&text=HH",
    timestamp: "20m",
    isActive: true,
  },
  {
    id: "carlo-emilio",
    name: "Carlo Emilio",
    lastMessage: "Check out this stock it's making a to...",
    avatar: "/placeholder.svg?height=40&width=40&text=CE",
    timestamp: "1h",
  },
  {
    id: "oscar-davis",
    name: "Oscar Davis",
    lastMessage: "Trueeeeee",
    avatar: "/placeholder.svg?height=40&width=40&text=OD",
    timestamp: "2h",
  },
  {
    id: "daniel-jay-park",
    name: "Daniel Jay Park",
    lastMessage: "lol yeah, are you coming to the lunc...",
    avatar: "/placeholder.svg?height=40&width=40&text=DP",
    timestamp: "3h",
  },
  {
    id: "mark-rojas",
    name: "Mark Rojas",
    lastMessage: "What do you think of that new comp...",
    avatar: "/placeholder.svg?height=40&width=40&text=MR",
    timestamp: "4h",
  },
  {
    id: "giannis-constantinou",
    name: "Giannis Constantinou",
    lastMessage: "yep 👍👍",
    avatar: "/placeholder.svg?height=40&width=40&text=GC",
    timestamp: "5h",
  },
  {
    id: "briana-lewis",
    name: "Briana Lewis",
    lastMessage: "When are you coming back to town?...",
    avatar: "/placeholder.svg?height=40&width=40&text=BL",
    timestamp: "6h",
  },
  {
    id: "mom",
    name: "Mom",
    lastMessage: "Thanks!",
    avatar: "/placeholder.svg?height=40&width=40&text=M",
    timestamp: "1d",
  },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState("helena-hills")
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "helena",
      content: "What do you think of this website",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "received" as const,
    },
    {
      id: "2",
      sender: "user",
      content: "I think it's pretty top notch",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      type: "sent" as const,
    },
    {
      id: "3",
      sender: "helena",
      content: "LOL",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      type: "received" as const,
    },
    {
      id: "4",
      sender: "helena",
      content: "Yeah I agree what stocks are you planning to buy today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: "received" as const,
    },
    {
      id: "5",
      sender: "helena",
      content: "I'm so curious about all the features",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      type: "received" as const,
    },
    {
      id: "6",
      sender: "user",
      content: "Simple",
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      type: "sent" as const,
    },
    {
      id: "7",
      sender: "user",
      content: "Look on the pages on their website that explain its purpose and what they offer!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: "received" as const,
    },
    {
      id: "8",
      sender: "user",
      content: "Boom",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      type: "sent" as const,
    },
    {
      id: "9",
      sender: "helena",
      content: "Hmmm",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      type: "received" as const,
    },
    {
      id: "10",
      sender: "helena",
      content: "I think I get it",
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      type: "received" as const,
    },
    {
      id: "11",
      sender: "helena",
      content: "Will head to the support page if I have more questions tho",
      timestamp: new Date(),
      type: "received" as const,
    },
  ])

  const addMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      content,
      timestamp: new Date(),
      type: "sent" as const,
    }
    setMessages((prev) => [...prev, newMessage])

    //normalize user input to remove case sensitivity
    const normalized = content.trim().toLowerCase().replace(/[.,!?]+$/g, "");

    const botReplies: Record<string, string> = {
        "hello": "Hi! How have you been?",
        "hi": "Hey, what's up?",
        "any advice on investing": "Connect with people on Portfolio Party and start small so that you can get comfortable with the process!",
        "what have you been investing in recently": "Green energy has really been catching my eye lately.",
        "what do you like about this website": "I really like that you can connect your Robinhood account!",
    }

    const response = botReplies[normalized] || "I would love to talk to right, but I have to run! I'll be back later."

    setTimeout(() => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          sender: "helena",
          content: response,
          timestamp: new Date(),
          type: "received" as const,
        }
        setMessages((prev) => [...prev, botMessage])
      },
      1000 + Math.random() * 1000,
    )
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#3FAC1F] hover:bg-green-400 shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[900px] h-[550px] shadow-2xl z-50 bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Header with close buttons */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
            <h1 className="text-lg font-semibold text-black">Messages</h1>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-gray-500 hover:bg-gray-200"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-gray-500 hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Original three-panel layout */}
          <div className="flex h-[calc(100%-60px)]">
            <ContactsSidebar selectedContact={selectedContact} onSelectContact={setSelectedContact} />
            <ChatArea messages={messages} onSendMessage={addMessage} />
            <ProfileSidebar />
          </div>
        </Card>
      )}
    </>
  )
}
