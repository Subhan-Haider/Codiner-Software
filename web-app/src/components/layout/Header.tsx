"use client"

import { useState } from "react"
import { Search, Bell, Settings, User, Moon, Sun, LogOut, Zap, Crown, Sparkles, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthModal } from "@/components/auth/AuthModal"
import { GitHubConnectButton } from "@/components/auth/GitHubConnectButton"
import { AccessibilityPanel } from "@/components/accessibility/AccessibilityPanel"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { useAuth } from "@/hooks/useAuth"

interface HeaderProps {
  onMobileMenuToggle?: () => void
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const { setTheme, theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user, signOut, isAuthenticated } = useAuth()

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Codiner</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">AI App Builder</p>
            </div>
          </div>

          {/* Pro Badge - Hidden on mobile */}
          <Badge className="hidden sm:flex bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-md">
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        </div>

        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              placeholder="Search projects, templates, or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 bg-white/50 dark:bg-slate-800/50 border-2 border-slate-200/50 dark:border-slate-700/50 rounded-xl input-focus backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={onMobileMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => {/* TODO: Open mobile search */}}
          >
            <Search className="h-5 w-5" />
          </Button>
          {/* AI Credits - Hidden on mobile */}
          <div className="hidden lg:flex items-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl px-4 py-2 border border-blue-200/50 dark:border-blue-800/50">
            <Zap className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">1,247</span>
            <span className="text-xs text-blue-600 dark:text-blue-400 ml-1">credits</span>
          </div>

          {/* Theme Toggle - Hidden on small mobile */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Notifications - Hidden on small mobile */}
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:flex">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold shadow-lg animate-pulse">
              3
            </span>
          </Button>

          {/* Accessibility - Hidden on mobile */}
          <div className="hidden md:block">
            <AccessibilityPanel />
          </div>

          {/* Settings - Hidden on small mobile */}
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:flex">
            <Settings className="h-5 w-5" />
          </Button>

          {/* GitHub Connect */}
          <GitHubConnectButton />

          {/* Auth Section */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl p-0 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Avatar className="h-10 w-10 border-2 border-slate-200 dark:border-slate-700">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                <div className="flex items-center space-x-3 p-3 mb-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {user?.user_metadata?.full_name || "User"}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  <User className="mr-3 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  <Crown className="mr-3 h-4 w-4" />
                  <span>Upgrade to Pro</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="rounded-lg cursor-pointer text-red-600 dark:text-red-400"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="btn-gradient shadow-lg"
              onClick={() => setAuthModalOpen(true)}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  )
}
