import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Camera,
  Film,
  Siren,
  Users,
} from "lucide-react"

export default function Navbar() {
  return (
    <nav className="w-full h-[76px] flex items-center border-b border-gray-800 px-6 relative" style={{
      paddingTop: '16px',
      paddingBottom: '12px',
      paddingLeft: '24px',
      paddingRight: '24px',
      maxWidth: '1440px',
      margin: '0 auto',
      background: 'rgba(10, 10, 10, 0.5)',
      backdropFilter: 'blur(12px)'
    }}>
      {/* Logo on the left */}
      <div className="flex-1">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-semibold text-white">SecureSight</span>
        </Link>
      </div>
      
      {/* Centered Navigation Links with Gradient Background */}
      <div className="relative flex-1 flex justify-center">
        <div 
          className="absolute -z-10"
          style={{
            width: '725px',
            height: '108px',
            top: '-28px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(208, 167, 4, 0.35)',
            filter: 'blur(50px)',
            zIndex: -1,
            borderRadius: '50%',
          }}
        />
        <div className="hidden md:flex items-center justify-center space-x-8 w-full">
          <Link href="/" className="text-sm font-medium text-white transition-colors flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/cameras" className="text-sm font-medium text-white transition-colors flex items-center gap-2">
            <Camera className="h-4 w-4" /> Cameras
          </Link>
          <Link href="/scenes" className="text-sm font-medium text-white transition-colors flex items-center gap-2">
            <Film className="h-4 w-4" /> Scenes
          </Link>
          <Link href="/incidents" className="text-sm font-medium text-white transition-colors flex items-center gap-2">
            <Siren className="h-4 w-4" /> Incidents
          </Link>
          <Link href="/users" className="text-sm font-medium text-white transition-colors flex items-center gap-2">
            <Users className="h-4 w-4" /> Users
          </Link>
        </div>
      </div>

      {/* User profile on the right */}
      <div className="flex-1 flex justify-end">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-white">Admin</span>
        </div>
      </div>
    </nav>
  )
}
