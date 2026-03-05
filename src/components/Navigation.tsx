'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WalletConnect } from './WalletConnect'

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[rgb(71,2,241)]/20 px-6 md:px-10 py-4 bg-[rgb(10,10,20)]/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4 text-white">
        <div className="size-8 bg-[rgb(71,2,241)] rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">💎</span>
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-tight">Bitbybit</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <nav className="hidden md:flex items-center gap-9">
          <Link 
            className={`text-sm font-medium leading-normal pb-1 transition-colors ${
              isActive('/dashboard') 
                ? 'text-white border-b-2 border-[rgb(71,2,241)]' 
                : 'text-slate-300 hover:text-[rgb(71,2,241)]'
            }`}
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link 
            className={`text-sm font-medium leading-normal pb-1 transition-colors ${
              isActive('/discover') 
                ? 'text-white border-b-2 border-[rgb(71,2,241)]' 
                : 'text-slate-300 hover:text-[rgb(71,2,241)]'
            }`}
            href="/discover"
          >
            Discover Charities
          </Link>
          <Link 
            className={`text-sm font-medium leading-normal pb-1 transition-colors ${
              isActive('/donate') 
                ? 'text-white border-b-2 border-[rgb(71,2,241)]' 
                : 'text-slate-300 hover:text-[rgb(71,2,241)]'
            }`}
            href="/donate"
          >
            Donate
          </Link>
          <Link 
            className={`text-sm font-medium leading-normal pb-1 transition-colors ${
              isActive('/bitcoin') 
                ? 'text-white border-b-2 border-[rgb(71,2,241)]' 
                : 'text-slate-300 hover:text-[rgb(71,2,241)]'
            }`}
            href="/bitcoin"
          >
            Bitcoin
          </Link>
        </nav>
        <WalletConnect />
      </div>
    </header>
  )
}
