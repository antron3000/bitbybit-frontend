'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-[rgb(10,10,20)]/95 backdrop-blur-xl border border-[rgb(71,2,241)]/30 rounded-2xl shadow-2xl flex flex-col z-50"
          >
            <div className="flex items-center justify-between p-4 border-b border-[rgb(71,2,241)]/20">
              <div className="flex items-center gap-2">
                <div className="size-8 bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Bitbybit Assistant</h3>
                  <p className="text-xs text-slate-400">Ask me anything</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-[rgb(71,2,241)]/10 border border-[rgb(71,2,241)]/20 rounded-lg p-3">
                <p className="text-sm text-white">
                  👋 Hi! I'm your Bitbybit assistant. I can help you understand how our decentralized philanthropy platform works, explain yield mechanics, or guide you through creating a charity lock.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">You</p>
                <p className="text-sm text-white">How does the yield work?</p>
              </div>
              <div className="bg-[rgb(71,2,241)]/10 border border-[rgb(71,2,241)]/20 rounded-lg p-3">
                <p className="text-xs text-[rgb(254,29,150)] mb-1">Assistant</p>
                <p className="text-sm text-white">
                  Your USDC principal is locked in DeFi protocols that generate yield. 100% of the yield goes to your chosen charity, while your principal is returned to you at maturity. It's a win-win! 🎯
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-[rgb(71,2,241)]/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border border-[rgb(71,2,241)]/20 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[rgb(254,29,150)] focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setMessage('')
                    }
                  }}
                />
                <button className="bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] text-white p-2 rounded-lg hover:opacity-90 transition-opacity">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 size-14 bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </>
  )
}
