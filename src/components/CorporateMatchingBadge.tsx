'use client'

import { motion } from 'framer-motion'
import { Building2, Sparkles } from 'lucide-react'

interface CorporateMatchingBadgeProps {
  matchRatio?: number // e.g., 1 for 1:1, 2 for 2:1
  companyName?: string
  isAvailable: boolean
}

export function CorporateMatchingBadge({ 
  matchRatio = 1, 
  companyName = 'Corporate Partner',
  isAvailable 
}: CorporateMatchingBadgeProps) {
  if (!isAvailable) return null

  return (
    <motion.div
      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 border-2 border-green-400/40"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-green-400" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-white font-semibold">Corporate Matching Active!</span>
          </div>
          
          <div className="text-sm text-white/90 mb-2">
            <span className="font-medium text-green-400">{companyName}</span> will match your donation{' '}
            <span className="font-bold text-green-300">{matchRatio}:1</span>
          </div>

          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-xs text-white/70">
              <div className="font-medium text-white mb-1">How it works:</div>
              <div className="space-y-1">
                <div>• Your lock triggers an automatic corporate match</div>
                <div>• Match is sent directly to the charity within minutes</div>
                <div>• No additional action required from you</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
