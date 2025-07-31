"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Contact {
  id: string
  name: string
  message: string
  avatar: string
  active: boolean
}

const contacts: Contact[] = [
  {
    id: "helena-hills",
    name: "Helena Hills",
    message: "Will head to the Help Center...",
    avatar: "/avatars/girl.jpg",
    active: true,
  },
  {
    id: "carlo-emilio",
    name: "Carlo Emilio",
    message: "Check out this stock it's making a to...",
    avatar: "/avatars/no_icon.jpg",
    active: false,
  },
  {
    id: "oscar-davis",
    name: "Oscar Davis",
    message: "Trueeeeee",
    avatar: "/avatars/no_icon.jpg",
    active: false,
  },
  {
    id: "daniel-jay-park",
    name: "Daniel Jay Park",
    message: "lol yeah, are you coming to the lunc...",
    avatar: "/avatars/guy.jpg",
    active: false,
  },
  {
    id: "mark-rojas",
    name: "Mark Rojas",
    message: "What do you think of that new comp...",
    avatar: "/avatars/guy2.jpg",
    active: false,
  },
  {
    id: "giannis-constantinou",
    name: "Giannis Constantinou",
    message: "yep 👍",
    avatar: "/avatars/no_icon.jpg",
    active: false,
  },
  {
    id: "briana-lewis",
    name: "Briana Lewis",
    message: "When are you coming back to town?...",
    avatar: "/avatars/no_icon.jpg",
    active: false,
  },
]

interface ContactsSidebarProps {
  selectedContact: string
  onSelectContact: (contactId: string) => void
}

export function ContactsSidebar({ selectedContact, onSelectContact }: ContactsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter contacts based on searchQuery (case insensitive)
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-60 border-r border-gray-200 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search chats"
            className="pl-10 pr-20 rounded-full border-gray-300 focus:outline-none focus:ring-0 focus:ring-transparent focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact, index) => (
          <div
            key={index}
            className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
              contact.id === selectedContact ? "bg-gray-100" : ""
            }`}
            onClick={() => onSelectContact(contact.id)}
          >
            <img
              src={contact.avatar || "/placeholder.svg"}
              alt={contact.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm truncate text-black">{contact.name}</h3>
                {contact.active && <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>}
              </div>
              <p className="text-gray-500 text-sm truncate">{contact.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
