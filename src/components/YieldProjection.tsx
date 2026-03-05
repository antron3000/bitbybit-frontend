'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Info } from 'lucide-react'
import { calculateLockProjection } from '@/lib/calculations'

interface YieldProjectionProps {
  amount: string
  durationMonths: number
}

export function YieldProjection({ amount, durationMonths }: YieldProjectionProps) {
  const depositAmount = parseFloat(amount) || 0
  
  if (depositAmount === 0) {
    return null
  }

  const projection = calculateLockProjection(depositAmount, durationMonths)

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-[rgb(254,29,150)]" />
        <h3 className="text-lg font-semibold text-white">Projected Impact</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/70">Your Deposit</span>
          <span className="text-white font-medium">${projection.depositAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-white/70">Tech Fee (2%)</span>
            <div className="group relative">
              <Info className="w-3.5 h-3.5 text-white/40 cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-black/90 rounded-lg text-xs text-white/90 z-10">
                <div className="font-semibold mb-1">Fee Breakdown:</div>
                <div className="space-y-1">
                  <div>• 1.40% Protocol Operations</div>
                  <div>• 0.20% Insurance Reserve</div>
                  <div>• 0.20% Protocol Reserve</div>
                  <div>• 0.20% Gas & Infrastructure</div>
                </div>
              </div>
            </div>
          </div>
          <span className="text-red-400 font-medium">-${projection.techFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white/70">Net Principal</span>
          <span className="text-white font-medium">${projection.netPrincipal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-white/70">Projected Yield</span>
            <span className="text-xs text-white/50">(12% APY × {durationMonths}mo)</span>
          </div>
          <span className="text-green-400 font-medium">+${projection.projectedYield.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        <div className="h-px bg-white/20 my-2"></div>

        <div className="flex justify-between items-center">
          <span className="text-white font-semibold">Total to Charity</span>
          <div className="text-right">
            <div className="text-[rgb(254,29,150)] font-bold text-xl">
              ${projection.totalToCharity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-green-400">
              {projection.effectiveReturn >= 0 ? '+' : ''}{projection.effectiveReturn.toFixed(2)}% of your deposit ✨
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-sm text-white/80">
            <div className="font-medium mb-1">How it works:</div>
            <div className="text-xs text-white/60 space-y-1">
              <div>• Yield flows to charity starting tomorrow</div>
              <div>• Principal releases on {projection.maturityDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div>• Tax deduction claimed at maturity</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
