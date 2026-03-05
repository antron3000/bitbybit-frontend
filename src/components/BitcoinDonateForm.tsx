'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Info } from 'lucide-react'

export function BitcoinDonateForm() {
  const [btcAmount, setBtcAmount] = useState('')
  const [lockMonths, setLockMonths] = useState(12)

  const LOCK_PERIODS = [
    { months: 6, label: '6 Months', apy: '4.2%' },
    { months: 12, label: '1 Year', apy: '5.6%' },
    { months: 24, label: '2 Years', apy: '6.8%' },
    { months: 36, label: '3 Years', apy: '7.5%' },
  ]

  const selectedPeriod = LOCK_PERIODS.find(p => p.months === lockMonths)
  const estimatedYield = btcAmount ? (parseFloat(btcAmount) * parseFloat(selectedPeriod?.apy || '0') / 100).toFixed(8) : '0'

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20 hover:border-white/40 transition-all"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">₿</span>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] bg-clip-text text-transparent">
          BTC Endowment Lock
        </h2>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-5">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-orange-200/90">
            <p className="font-semibold mb-1">BTC Never Leaves Bitcoin L1</p>
            <p className="text-xs text-orange-200/70">
              Your Bitcoin is timelocked on Bitcoin blockchain via CLTV opcodes. Yield is generated on Core DAO and distributed as USDC to charities.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            BTC Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={btcAmount}
              onChange={(e) => setBtcAmount(e.target.value)}
              placeholder="0.00000000"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white text-lg font-semibold placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(254,29,150)] focus:border-transparent"
              step="0.00000001"
              min="0"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-orange-500/20 px-3 py-1.5 rounded-full border border-orange-500/30">
              <span className="text-lg">₿</span>
              <span className="text-sm font-bold text-white">BTC</span>
            </div>
          </div>
          {btcAmount && (
            <p className="text-xs text-slate-400 mt-2">
              ≈ ${(parseFloat(btcAmount) * 100000).toLocaleString('en-US', { maximumFractionDigits: 0 })} USD
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Lock Period
          </label>
          <div className="grid grid-cols-2 gap-3">
            {LOCK_PERIODS.map((period) => (
              <motion.button
                key={period.months}
                onClick={() => setLockMonths(period.months)}
                className={`p-4 rounded-lg border text-sm font-medium transition-all ${
                  lockMonths === period.months
                    ? 'border-[rgb(254,29,150)] bg-[rgb(254,29,150)]/10 text-white shadow-lg'
                    : 'border-white/20 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-semibold mb-1">{period.label}</div>
                <div className="text-xs text-emerald-400 font-bold">{period.apy} APY</div>
              </motion.button>
            ))}
          </div>
        </div>

        {btcAmount && parseFloat(btcAmount) > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Yield Projection</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Principal (BTC)</span>
                <span className="text-white font-semibold">₿{parseFloat(btcAmount).toFixed(8)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Lock Period</span>
                <span className="text-white font-semibold">{lockMonths} months</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">APY (Core DAO × Maple)</span>
                <span className="text-emerald-400 font-bold">{selectedPeriod?.apy}</span>
              </div>
              <div className="h-px bg-white/10 my-2"></div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Estimated Yield to Charity</span>
                <span className="text-[rgb(254,29,150)] font-bold">₿{estimatedYield}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">In USDC</span>
                <span className="text-slate-400">≈ ${(parseFloat(estimatedYield) * 100000).toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="bg-[rgb(71,2,241)]/10 border border-[rgb(71,2,241)]/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">How It Works</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-[rgb(254,29,150)] mt-0.5">•</span>
              <span>BTC locked on Bitcoin L1 via CLTV (CheckLockTimeVerify)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[rgb(254,29,150)] mt-0.5">•</span>
              <span>Yield generated on Core DAO through dual staking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[rgb(254,29,150)] mt-0.5">•</span>
              <span>CORE rewards converted to USDC and sent to charities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[rgb(254,29,150)] mt-0.5">•</span>
              <span>Your BTC principal returns at maturity</span>
            </li>
          </ul>
        </div>

        <motion.div whileTap={{ scale: 0.98 }}>
          <button
            disabled={!btcAmount || parseFloat(btcAmount) <= 0}
            className="w-full bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] hover:opacity-90 text-white font-semibold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5" />
            Create {lockMonths}-Month BTC Lock
          </button>
        </motion.div>

        <p className="text-xs text-center text-slate-500">
          Foundation-only feature • 1.39% excise tax rate • IRS §4942 compliant
        </p>
      </div>
    </motion.div>
  )
}
