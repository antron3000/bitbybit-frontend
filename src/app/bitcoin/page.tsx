'use client'

import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'
import { Lock, TrendingUp, Wallet, Calendar, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function BitcoinDashboard() {
  const { isConnected } = useAccount()

  // Mock data - would come from blockchain in production
  const totalBtcLocked = 2.5
  const blendedAPY = 5.6
  const dailyYieldUsd = 383
  const mdrCoverage = 87.5
  const requiredUsd = 50000
  const distributedUsd = 43750

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[rgb(10,10,20)] via-[rgb(20,10,30)] to-[rgb(10,10,20)] flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 mx-auto">
            <span className="text-3xl">₿</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            BTC Endowment Protocol
          </h1>
          <p className="text-slate-400 mb-2">
            Stop selling Bitcoin to meet your 5% MDR. Lock BTC, earn yield, route USDC to charities automatically.
          </p>
          <p className="text-slate-600 text-sm mb-8">
            Principal is secured by Bitcoin's consensus rules. Yield powered by Core DAO × Maple Finance.
          </p>
          <p className="text-slate-500 text-sm">Connect your wallet to get started.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(10,10,20)] via-[rgb(20,10,30)] to-[rgb(10,10,20)]">
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 bg-clip-text text-transparent">
              Bitcoin Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Foundation endowment protocol</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-lg transition-colors">
              <PlusCircle className="w-4 h-4" />
              Add Tranche
            </button>
          </div>
        </motion.div>

        {/* MDR Coverage Hero */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-600/60 rounded-2xl p-8 border border-blue-500/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-white/70 uppercase tracking-wider mb-1">MDR Coverage</p>
                <p className="text-4xl font-bold text-white">{mdrCoverage}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/70 mb-1">Daily Yield</p>
                <p className="text-2xl font-bold text-emerald-400">${dailyYieldUsd}</p>
                <p className="text-xs text-white/60">in USDC/day</p>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 mb-3">
              <div 
                className="bg-gradient-to-r from-blue-400 to-orange-500 h-3 rounded-full transition-all"
                style={{ width: `${mdrCoverage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-white/70">
              <span>${distributedUsd.toLocaleString()} distributed</span>
              <span>${requiredUsd.toLocaleString()} required (5% MDR)</span>
            </div>
          </div>
          <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Lock className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Total BTC Locked</p>
            </div>
            <p className="text-2xl font-bold text-white">₿{totalBtcLocked}</p>
            <p className="text-xs text-slate-500 mt-1">3 tranches</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Blended APY</p>
            </div>
            <p className="text-2xl font-bold text-emerald-400">{blendedAPY}%</p>
            <p className="text-xs text-slate-500 mt-1">Core DAO × Maple</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Wallet className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Daily Yield</p>
            </div>
            <p className="text-2xl font-bold text-white">${dailyYieldUsd}</p>
            <p className="text-xs text-slate-500 mt-1">in USDC/day</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Last Distribution</p>
            </div>
            <p className="text-2xl font-bold text-white">Mar 4</p>
            <p className="text-xs text-slate-500 mt-1">5 recipients</p>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Principal Safety
            </p>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Your BTC is timelocked on <span className="text-white font-medium">Bitcoin L1</span> via native CLTV opcodes.
              It never leaves the Bitcoin blockchain.
            </p>
            <p className="text-xs text-slate-500">
              Even if Core chain fails, your Bitcoin unlocks at timelock expiry. Enforced by
              Bitcoin's consensus rules, not policy.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Tax Efficiency
            </p>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Foundation excise rate</span>
                <span className="text-emerald-400 font-semibold">1.39%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Individual income rate</span>
                <span className="text-slate-600">37%</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Staking yield subject to IRC §4940 excise tax only.
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">Ready to Lock Bitcoin?</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Create a new tranche to start earning yield on your Bitcoin treasury while maintaining full custody through Bitcoin L1 timelocks.
          </p>
          <Link
            href="/bitcoin/tranches"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
          >
            <PlusCircle className="w-5 h-5" />
            Create New Tranche
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
