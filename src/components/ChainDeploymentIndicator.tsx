'use client'

import { motion } from 'framer-motion'
import { Network, Info } from 'lucide-react'

interface ChainDeploymentIndicatorProps {
  currentTVL?: number // in millions
}

export function ChainDeploymentIndicator({ currentTVL = 0 }: ChainDeploymentIndicatorProps) {
  // Determine deployment chain based on TVL thresholds from whitepaper
  const getDeploymentInfo = () => {
    if (currentTVL < 50) {
      return {
        chain: 'Base',
        color: 'rgb(0, 82, 255)', // Base blue
        reason: 'Optimal for current TVL (<$50M)',
        nextThreshold: 50,
      }
    } else if (currentTVL < 250) {
      return {
        chain: 'Arbitrum',
        color: 'rgb(40, 160, 240)', // Arbitrum blue
        reason: 'Deeper yield markets ($50M-$250M TVL)',
        nextThreshold: 250,
      }
    } else {
      return {
        chain: 'Ethereum',
        color: 'rgb(98, 126, 234)', // Ethereum purple
        reason: 'Maximum liquidity (>$250M TVL)',
        nextThreshold: null,
      }
    }
  }

  const deployment = getDeploymentInfo()

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${deployment.color}20`, border: `2px solid ${deployment.color}` }}
          >
            <Network className="w-5 h-5" style={{ color: deployment.color }} />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-semibold">Deploying to {deployment.chain}</span>
            <div className="group relative">
              <Info className="w-3.5 h-3.5 text-white/40 cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-72 p-3 bg-black/90 rounded-lg text-xs text-white/90 z-10">
                <div className="font-semibold mb-2">Auto-Routing Strategy:</div>
                <div className="space-y-1.5">
                  <div>• <span className="text-blue-400">Base</span>: TVL &lt; $50M</div>
                  <div>• <span className="text-blue-300">Arbitrum</span>: TVL $50M-$250M</div>
                  <div>• <span className="text-purple-400">Ethereum</span>: TVL &gt; $250M</div>
                </div>
                <div className="mt-2 pt-2 border-t border-white/20 text-white/70">
                  Your funds are automatically routed to the optimal chain for maximum yield efficiency.
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-white/70 mb-2">
            {deployment.reason}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  backgroundColor: deployment.color,
                  width: deployment.nextThreshold 
                    ? `${Math.min((currentTVL / deployment.nextThreshold) * 100, 100)}%`
                    : '100%'
                }}
                initial={{ width: 0 }}
                animate={{ 
                  width: deployment.nextThreshold 
                    ? `${Math.min((currentTVL / deployment.nextThreshold) * 100, 100)}%`
                    : '100%'
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <div className="text-xs text-white/50 whitespace-nowrap">
              {deployment.nextThreshold 
                ? `${currentTVL.toFixed(1)}M / ${deployment.nextThreshold}M`
                : 'Max capacity'
              }
            </div>
          </div>

          {deployment.nextThreshold && (
            <div className="mt-2 text-xs text-white/50">
              Next upgrade to {deployment.nextThreshold === 250 ? 'Ethereum' : 'Arbitrum'} at ${deployment.nextThreshold}M TVL
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
