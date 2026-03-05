'use client'

import { motion } from 'framer-motion'
import { Sparkles, ChevronRight } from 'lucide-react'
import { WHALETRAP_TIERS } from '@/lib/calculations'
import { useState } from 'react'

export function WhaletrapTeaser() {
  const [isExpanded, setIsExpanded] = useState(false)
  const currentTier = WHALETRAP_TIERS[0] // Plankton by default
  const nextTier = WHALETRAP_TIERS[1] // Dolphin

  return (
    <motion.div
      className="bg-gradient-to-r from-[rgb(71,2,241)]/20 to-[rgb(254,29,150)]/20 backdrop-blur-sm rounded-xl p-4 border border-white/20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[rgb(254,29,150)]" />
          <div>
            <div className="text-white font-semibold">Reduce Your Fees</div>
            <div className="text-xs text-white/60">Stake $BBB tokens for discounts</div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-5 h-5 text-white/60" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
          <div className="text-sm text-white/80">
            <div className="font-medium mb-2">Whaletrap Tiers:</div>
            <div className="space-y-2">
              {WHALETRAP_TIERS.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`flex justify-between items-center p-2 rounded-lg ${
                    index === 0 ? 'bg-white/10 border border-white/20' : 'bg-white/5'
                  }`}
                >
                  <div>
                    <div className="font-medium text-white">
                      {tier.name}
                      {index === 0 && (
                        <span className="ml-2 text-xs bg-[rgb(254,29,150)] px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-white/60">
                      {tier.bbbRequired === 0
                        ? 'No staking required'
                        : `Stake ${tier.bbbRequired.toLocaleString()} $BBB`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">{tier.feeRate}%</div>
                    <div className="text-xs text-white/50">fee</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-xs text-white/70">
              <div className="font-medium mb-1">Next Tier Benefit:</div>
              <div>
                Stake {nextTier.bbbRequired.toLocaleString()} $BBB to unlock{' '}
                <span className="text-[rgb(254,29,150)] font-semibold">
                  {nextTier.feeRate}% fees
                </span>
                {' '}(save ${((currentTier.feeRate - nextTier.feeRate) * 10).toFixed(0)} per $1,000 donated)
              </div>
            </div>
          </div>

          <button className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white font-medium transition-all border border-white/20">
            Learn More About $BBB
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
