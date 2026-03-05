'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { History, TrendingUp, ExternalLink, Clock, CheckCircle2, Loader2 } from 'lucide-react'
import { getCharityByAddress } from '@/lib/charities'

type LockStatus = 'active' | 'matured' | 'released'

interface CharityLock {
  id: string
  amount: string
  charityAddress: string
  maturityDate: Date
  createdAt: Date
  durationMonths: number
  status: LockStatus
  yieldGenerated: number
  txHash: string
}

export function DonationHistory() {
  const { address, isConnected } = useAccount()
  const [locks, setLocks] = useState<CharityLock[]>([])

  useEffect(() => {
    if (address) {
      const storedLocks = localStorage.getItem(`locks_${address}`)
      if (storedLocks) {
        const parsed = JSON.parse(storedLocks)
        setLocks(parsed.map((lock: any) => ({
          ...lock,
          createdAt: new Date(lock.createdAt),
          maturityDate: new Date(lock.maturityDate),
          status: new Date(lock.maturityDate) <= new Date() ? 'matured' : 'active'
        })))
      }
    }
  }, [address])

  if (!isConnected) return null

  const activeLocks = locks.filter(l => l.status === 'active')
  const maturedLocks = locks.filter(l => l.status === 'matured')
  const totalPrincipal = locks.reduce((sum, l) => sum + parseFloat(l.amount), 0)
  const totalYield = locks.reduce((sum, l) => sum + l.yieldGenerated, 0)
  const totalImpact = totalPrincipal + totalYield

  const getTimeRemaining = (maturityDate: Date) => {
    const now = new Date()
    const diff = maturityDate.getTime() - now.getTime()
    
    if (diff <= 0) return 'Matured'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const months = Math.floor(days / 30)
    
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} remaining`
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} remaining`
    return 'Maturing soon'
  }

  const getStatusColor = (status: LockStatus) => {
    switch (status) {
      case 'active': return 'text-blue-400'
      case 'matured': return 'text-green-400'
      case 'released': return 'text-white/50'
      default: return 'text-white'
    }
  }

  const getStatusIcon = (status: LockStatus) => {
    switch (status) {
      case 'active': return <Loader2 className="w-4 h-4 animate-spin" />
      case 'matured': return <CheckCircle2 className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20 hover:border-white/40 transition-all"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-[rgb(254,29,150)]" />
        <h2 className="text-xl font-semibold text-white">Donation History</h2>
      </div>
      
      <motion.div 
        className="mb-6 p-5 bg-white/5 rounded-xl border border-white/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="flex items-center gap-1 text-sm font-medium text-white/70 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Total Impact
            </div>
            <div className="text-2xl font-bold text-[rgb(254,29,150)]">
              ${totalImpact.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-white/70 mb-1">Principal Locked</div>
            <div className="text-2xl font-bold text-white">
              ${totalPrincipal.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-white/70 mb-1">Yield Generated</div>
            <div className="text-2xl font-bold text-green-400">
              +${totalYield.toFixed(2)}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
          <div className="text-white/60">
            <span className="font-medium text-white">{activeLocks.length}</span> active lock{activeLocks.length !== 1 ? 's' : ''}
          </div>
          <div className="text-white/60">
            <span className="font-medium text-white">{maturedLocks.length}</span> matured
          </div>
        </div>
      </motion.div>

      {locks.length === 0 ? (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white/60">No charity locks yet</p>
          <p className="text-white/40 text-sm mt-2">Create your first lock to start generating yield for charities</p>
        </motion.div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <AnimatePresence>
            {locks.map((lock, index) => {
              const charity = getCharityByAddress(lock.charityAddress)
              return (
                <motion.div 
                  key={lock.id}
                  className={`border-l-4 pl-4 py-3 bg-white/5 rounded-r-lg hover:bg-white/10 transition-all group ${
                    lock.status === 'active' ? 'border-[rgb(254,29,150)]' : 'border-green-400'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {charity && <span className="text-xl">{charity.logo}</span>}
                        <div>
                          <div className="font-semibold text-white">
                            {charity?.name || 'Unknown Charity'}
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className={`flex items-center gap-1 ${getStatusColor(lock.status)}`}>
                              {getStatusIcon(lock.status)}
                              {lock.status === 'active' ? 'Yielding' : 'Matured'}
                            </span>
                            <span className="text-white/50">•</span>
                            <span className="text-white/60">
                              {getTimeRemaining(lock.maturityDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <div className="text-white/50 text-xs">Principal</div>
                          <div className="text-white font-medium">${parseFloat(lock.amount).toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-xs">Yield</div>
                          <div className="text-green-400 font-medium">+${lock.yieldGenerated.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-xs">Duration</div>
                          <div className="text-white font-medium">{lock.durationMonths}mo</div>
                        </div>
                      </div>

                      <div className="text-xs text-white/50 mt-2">
                        Created {lock.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    
                    <motion.a
                      href={`https://etherscan.io/tx/${lock.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[rgb(254,29,150)] hover:text-white text-sm transition-colors whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
