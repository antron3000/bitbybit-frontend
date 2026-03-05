'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DonateForm } from '@/components/DonateForm'
import { BitcoinDonateForm } from '@/components/BitcoinDonateForm'
import { useAccount } from 'wagmi'

export default function DonatePage() {
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<'ethereum' | 'bitcoin'>('ethereum')

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(10,10,20)] via-[rgb(20,10,30)] to-[rgb(10,10,20)] relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[rgb(71,2,241)] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[rgb(254,29,150)] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-20 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <div className="w-full max-w-[580px]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-[rgb(254,29,150)] to-white bg-clip-text text-transparent">
              Create Charity Lock
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Lock your crypto principal, stream high-yield returns to charities. Your capital returns at maturity.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-2 mb-6 bg-white/5 backdrop-blur-md p-1 rounded-xl border border-white/10"
          >
            <button
              onClick={() => setActiveTab('ethereum')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                activeTab === 'ethereum'
                  ? 'bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">⟠</span>
                Ethereum (USDC)
              </div>
            </button>
            <button
              onClick={() => setActiveTab('bitcoin')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                activeTab === 'bitcoin'
                  ? 'bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">₿</span>
                Bitcoin (BTC)
              </div>
            </button>
          </motion.div>

          {isConnected ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'ethereum' ? <DonateForm /> : <BitcoinDonateForm />}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:border-white/40 transition-all">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Connect Your Wallet
                </h2>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Connect your wallet to view your balance and start creating charity locks.
                </p>
                <div className="text-sm text-white/60">
                  Supported wallets: MetaMask, WalletConnect, and more
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="inline-flex items-center gap-6 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter">
                  {activeTab === 'ethereum' ? 'Ethereum Mainnet' : 'Core DAO Online'}
                </span>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter">
                  {activeTab === 'ethereum' ? 'Gas: 12 Gwei' : 'BTC Secured'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
