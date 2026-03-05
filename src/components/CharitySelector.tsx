'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Check } from 'lucide-react'
import { VERIFIED_CHARITIES, CHARITY_CATEGORIES, type Charity } from '@/lib/charities'

interface CharitySelectorProps {
  selectedCharity: Charity | null
  onSelect: (charity: Charity) => void
}

export function CharitySelector({ selectedCharity, onSelect }: CharitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')

  const filteredCharities = VERIFIED_CHARITIES.filter(charity => {
    const matchesSearch = charity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         charity.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || charity.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-white mb-2">
        Select Charity
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white text-left flex items-center justify-between hover:bg-white/25 transition-all focus:outline-none focus:ring-2 focus:ring-[rgb(254,29,150)] focus:border-transparent"
      >
        {selectedCharity ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedCharity.logo}</span>
            <div>
              <div className="font-medium">{selectedCharity.name}</div>
              <div className="text-xs text-white/60">{selectedCharity.category}</div>
            </div>
          </div>
        ) : (
          <span className="text-white/60">Choose a verified 501(c)(3) charity...</span>
        )}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-[rgb(71,2,241)]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search charities..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[rgb(254,29,150)] focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {CHARITY_CATEGORIES.slice(0, 5).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-[rgb(254,29,150)] text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {filteredCharities.length === 0 ? (
                <div className="p-8 text-center text-white/60">
                  No charities found matching your search
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {filteredCharities.map((charity) => (
                    <button
                      key={charity.id}
                      onClick={() => {
                        onSelect(charity)
                        setIsOpen(false)
                      }}
                      className="w-full p-4 hover:bg-white/10 transition-all text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl flex-shrink-0">{charity.logo}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold text-white group-hover:text-[rgb(254,29,150)] transition-colors">
                              {charity.name}
                            </div>
                            {selectedCharity?.id === charity.id && (
                              <Check className="w-4 h-4 text-[rgb(254,29,150)]" />
                            )}
                          </div>
                          <div className="text-xs text-white/50 mb-1">{charity.category}</div>
                          <div className="text-sm text-white/70 line-clamp-2">
                            {charity.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
