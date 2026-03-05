'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock, TrendingUp, Wallet, Calendar } from 'lucide-react'
import { getCharityByAddress } from '@/lib/charities'

interface ChartiyLock {
  id: string
  amount: string
  charityAddress: string
  maturityDate: string
  createdAt: string
  durationMonths: number
  status: string
  yieldGenerated: number
  txHash: string
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const [locks, setLocks] = useState<ChartiyLock[]>([])

  useEffect(() => {
    if (address) {
      const storedLocks = localStorage.getItem(`locks_${address}`)
      if (storedLocks) {
        setLocks(JSON.parse(storedLocks))
      }
    }
  }, [address])

  const totalPrincipal = locks.reduce((sum, lock) => sum + parseFloat(lock.amount), 0)
  const totalYield = locks.reduce((sum, lock) => sum + lock.yieldGenerated, 0)
  const activeLocks = locks.filter(lock => lock.status === 'active').length

  const getCharityInfo = (charityAddress: string) => {
    const charity = getCharityByAddress(charityAddress)
    return charity || { name: 'Unknown Charity', logo: '❤️', category: 'General' }
  }

  const calculateYieldEarned = (lock: ChartiyLock) => {
    const principal = parseFloat(lock.amount)
    const monthsElapsed = Math.min(
      lock.durationMonths,
      Math.floor((Date.now() - new Date(lock.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30))
    )
    const apy = 0.12
    return (principal * apy * monthsElapsed) / 12
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[rgb(10,10,20)] via-[rgb(20,10,30)] to-[rgb(10,10,20)] flex items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Connect your wallet to view your dashboard and active charity locks.
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(10,10,20)] via-[rgb(20,10,30)] to-[rgb(10,10,20)]">
      <main className="flex-1 overflow-y-auto">
        <div className="px-8 py-8 flex items-center justify-between max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[rgb(71,2,241)] via-[rgb(254,29,150)] to-[rgb(71,2,241)] bg-clip-text text-transparent">
              User Dashboard
            </h2>
            <p className="text-slate-400">Monitor your philanthropic yield and active charity locks.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/donate"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] text-white font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[rgb(254,29,150)]/20"
            >
              <Lock className="w-5 h-5" />
              Start a new Charity Lock
            </Link>
          </motion.div>
        </div>

        <section className="px-8 pb-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="p-6 rounded-xl bg-white/5 border border-[rgb(71,2,241)]/10 flex flex-col gap-2 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="w-16 h-16 text-[rgb(254,29,150)]" />
              </div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Yield Generated</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-[rgb(71,2,241)]">${totalYield.toFixed(2)}</p>
                <span className="text-xs font-bold text-[rgb(254,29,150)] bg-[rgb(254,29,150)]/10 px-2 py-0.5 rounded-full">+12.5%</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Active yield farming for social good</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-white/5 border border-[rgb(71,2,241)]/10 flex flex-col gap-2 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Lock className="w-16 h-16 text-[rgb(71,2,241)]" />
              </div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Active Locks</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">{activeLocks}</p>
                <span className="text-xs font-bold text-slate-400 bg-slate-400/10 px-2 py-0.5 rounded-full">Neutral</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Assets contributing to the pool</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-white/5 border border-[rgb(71,2,241)]/10 flex flex-col gap-2 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wallet className="w-16 h-16 text-emerald-500" />
              </div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Principal</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">${totalPrincipal.toFixed(2)}</p>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+5.2%</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Current capital in protocol</p>
            </motion.div>
          </div>
        </section>

        <section className="px-8 pb-12 max-w-7xl mx-auto">
          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(71,2,241)]/60 text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">Powering Change with Protocol Assets</h3>
              <p className="text-white/80 mb-6">
                Your locked principal generates yield that is automatically distributed to the charities of your choice. You retain ownership of your assets while creating infinite social impact.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-[rgb(71,2,241)] px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all">
                  Learn How it Works
                </button>
                <Link
                  href="/donate"
                  className="bg-[rgb(71,2,241)]/20 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
                >
                  Stake Now
                </Link>
              </div>
            </div>
            <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
          </motion.div>
        </section>

        <section className="px-8 pb-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">My Active Charity Locks</h3>
              <button className="text-[rgb(254,29,150)] text-sm font-bold hover:underline">View Full History</button>
            </div>
            <div className="bg-white/5 border border-[rgb(71,2,241)]/10 rounded-xl overflow-hidden">
              {locks.length === 0 ? (
                <div className="text-center py-12">
                  <Lock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 mb-2">No active locks yet</p>
                  <Link href="/donate" className="text-[rgb(254,29,150)] hover:underline text-sm font-medium">
                    Create your first charity lock →
                  </Link>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[rgb(71,2,241)]/10 bg-[rgb(71,2,241)]/5">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Charity</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Maturity Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Yield Earned</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgb(71,2,241)]/10">
                    {locks.map((lock) => {
                      const charity = getCharityInfo(lock.charityAddress)
                      const yieldEarned = calculateYieldEarned(lock)
                      return (
                        <tr key={lock.id} className="hover:bg-[rgb(71,2,241)]/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-8 rounded-full bg-[rgb(71,2,241)]/10 flex items-center justify-center text-lg">
                                {charity.logo}
                              </div>
                              <span className="font-medium">{charity.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium">{lock.amount} USDC</td>
                          <td className="px-6 py-4 text-slate-400">
                            {new Date(lock.maturityDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 text-emerald-400 font-bold">+{yieldEarned.toFixed(2)} USDC</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                              lock.status === 'active' 
                                ? 'bg-emerald-500/10 text-emerald-500' 
                                : 'bg-[rgb(254,29,150)]/10 text-[rgb(254,29,150)]'
                            }`}>
                              {lock.status}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
