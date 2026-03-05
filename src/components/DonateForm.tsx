'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi'
import { parseUnits } from 'viem'
import { getUSDCContract } from '@/lib/contracts'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Heart, Loader2, CheckCircle2, Calendar, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { YieldProjection } from './YieldProjection'
import { CharitySelector } from './CharitySelector'
import { CorporateMatchingBadge } from './CorporateMatchingBadge'
import { LOCK_DURATIONS, calculateLockProjection } from '@/lib/calculations'
import { type Charity } from '@/lib/charities'

const USDC_ABI = [
  {
    constant: false,
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

const PRESET_AMOUNTS = [100, 500, 1000, 5000, 10000]

export function DonateForm() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash } = useWriteContract()
  const [amount, setAmount] = useState('')
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null)
  const [durationMonths, setDurationMonths] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const [currentTVL] = useState(5.2) // Mock TVL in millions - would come from API
  const [hasMatching] = useState(false) // Mock corporate matching - would come from API
  const chainId = useChainId()
  const usdcContract = getUSDCContract(chainId)
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })
  
  const projection = amount ? calculateLockProjection(parseFloat(amount), durationMonths) : null

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (!selectedCharity) {
      toast.error('Please select a charity')
      return
    }

    setIsLoading(true)
    try {
      const amountInWei = parseUnits(amount, usdcContract.decimals)
      
      toast.loading('Waiting for wallet confirmation...', { id: 'donation' })
      
      writeContract({
        address: usdcContract.address,
        abi: USDC_ABI,
        functionName: 'transfer',
        args: [selectedCharity.address as `0x${string}`, amountInWei],
      })
      
      toast.success('Charity Lock Created!', { id: 'donation' })
      
      // Store lock in localStorage
      if (address && projection) {
        const locks = JSON.parse(localStorage.getItem(`locks_${address}`) || '[]')
        locks.unshift({
          id: Date.now().toString(),
          amount,
          charityAddress: selectedCharity.address,
          maturityDate: projection.maturityDate.toISOString(),
          createdAt: new Date().toISOString(),
          durationMonths,
          status: 'active',
          yieldGenerated: 0, // Will be updated as yield accrues
          txHash: hash || '0x...',
        })
        localStorage.setItem(`locks_${address}`, JSON.stringify(locks))
      }
      
      setAmount('')
    } catch (error: any) {
      console.error('Donation failed:', error)
      toast.error(error?.message || 'Donation failed. Please try again.', { id: 'donation' })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handlePresetAmount = (preset: number) => {
    setAmount(preset.toString())
  }

  if (!isConnected) return null

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20 hover:border-white/40 transition-all"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-[rgb(254,29,150)]" />
        <h2 className="text-xl font-semibold bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] bg-clip-text text-transparent">Create Charity Lock</h2>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Quick Amount
          </label>
          <div className="grid grid-cols-5 gap-2">
            {PRESET_AMOUNTS.map((preset) => (
              <motion.button
                key={preset}
                onClick={() => handlePresetAmount(preset)}
                className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  amount === preset.toString()
                    ? 'bg-[rgb(254,29,150)] text-white shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ${preset >= 1000 ? `${preset/1000}k` : preset}
              </motion.button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Amount (USDC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(254,29,150)] focus:border-transparent"
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Lock Duration
            </div>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {LOCK_DURATIONS.map((duration) => (
              <motion.button
                key={duration.months}
                onClick={() => setDurationMonths(duration.months)}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                  durationMonths === duration.months
                    ? 'bg-[rgb(254,29,150)] text-white shadow-lg border-2 border-white/40'
                    : 'bg-white/20 text-white hover:bg-white/30 border-2 border-transparent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="font-semibold">{duration.months}</div>
                <div className="text-xs opacity-80">months</div>
              </motion.button>
            ))}
          </div>
          {projection && (
            <motion.div 
              className="mt-3 flex items-center gap-2 text-sm text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Calendar className="w-4 h-4 text-[rgb(254,29,150)]" />
              <span>
                Maturity: <span className="text-white font-medium">
                  {projection.maturityDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </span>
            </motion.div>
          )}
        </div>

        <CharitySelector 
          selectedCharity={selectedCharity}
          onSelect={setSelectedCharity}
        />

        {hasMatching && (
          <CorporateMatchingBadge 
            isAvailable={true}
            matchRatio={1}
            companyName="Coinbase"
          />
        )}

        {amount && parseFloat(amount) > 0 && (
          <YieldProjection amount={amount} durationMonths={durationMonths} />
        )}

        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleDonate}
            disabled={!amount || parseFloat(amount) <= 0 || !selectedCharity || isLoading || isConfirming}
            className="w-full bg-[rgb(254,29,150)] hover:bg-[rgb(254,29,150)]/90 text-white font-semibold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-base"
          >
            {isLoading || isConfirming ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {isConfirming ? 'Confirming Transaction...' : 'Processing...'}
              </span>
            ) : isSuccess ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Lock Created Successfully!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Create {durationMonths}-Month Lock
              </span>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
