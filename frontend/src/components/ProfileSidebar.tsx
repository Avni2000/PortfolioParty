"use client"

import { Search, MoreHorizontal, Image } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProfileSidebar() {
  return (
    <div className="w-60 border-l border-gray-200 p-6 bg-white">
      <div className="text-center">
        <img
          src="/avatars/girl.jpg"
          alt="Helena Hills"
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h3 className="font-semibold text-lg">Helena</h3>
        <p className="text-sm text-gray-500 mb-4">Active 20m ago</p>

        <Button className="w-full mb-6 bg-black text-white hover:bg-gray-800">View profile</Button>

        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Search className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-black">Search chat</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center">
              <Image  />
            </div>
            <span className="text-sm text-black">Sent images</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-black">More options</span>
          </div>
        </div>
      </div>
    </div>
  )
}

