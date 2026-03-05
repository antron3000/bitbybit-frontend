'use client'

import { useAccount, useBalance, useChainId } from 'wagmi'
import { formatUnits } from 'viem'
import { getUSDCContract } from '@/lib/contracts'
import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'

export function BalanceDisplay() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const usdcContract = getUSDCContract(chainId)

  const { data: balance, isLoading } = useBalance({
    address,
    token: usdcContract.address,
  })

  if (!isConnected) return null

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20 hover:border-white/40 hover:shadow-[0_0_30px_rgba(254,29,150,0.3)] transition-all cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Wallet className="w-5 h-5 text-[rgb(254,29,150)]" />
        <h2 className="text-xl font-semibold text-white">Your USDC Balance</h2>
      </div>
      {isLoading ? (
        <div className="text-white/70 animate-pulse">Loading balance...</div>
      ) : (
        <motion.div 
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {balance ? parseFloat(formatUnits(balance.value, usdcContract.decimals)).toFixed(2) : '0.00'} USDC
        </motion.div>
      )}
    </motion.div>
  )
}
