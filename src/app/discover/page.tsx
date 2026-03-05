'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { VERIFIED_CHARITIES, CHARITY_CATEGORIES } from '@/lib/charities'

export default function DiscoverPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')

  const filteredCharities = VERIFIED_CHARITIES.filter(charity => {
    const matchesSearch = charity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         charity.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || charity.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Global Health': '🦟',
      'Poverty Relief': '💰',
      'Water & Sanitation': '💧',
      'Emergency Relief': '🏥',
      'Environment': '🌳',
      'Hunger Relief': '🍞',
      'Medical Research': '🎗️',
      'Wildlife Conservation': '🐼',
      'Housing': '🏠',
      'Disaster Relief': '🔴',
    }
    return icons[category] || '❤️'
  }

  const getAPY = (index: number) => {
    const apys = ['12.5%', '11.2%', '14.0%', '10.8%', '13.2%', '11.5%', '12.8%', '10.2%', '13.5%', '11.8%']
    return apys[index] || '12.0%'
  }

  const getTotalYield = (index: number) => {
    const yields = ['$450,000', '$382,000', '$295,500', '$156,000', '$210,000', '$185,000', '$320,000', '$142,000', '$265,000', '$198,000']
    return yields[index] || '$200,000'
  }

  const getDonors = (index: number) => {
    const donors = ['1,240', '956', '2,105', '842', '1,150', '1,025', '1,380', '765', '1,520', '890']
    return donors[index] || '1,000'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(10,10,20)] via-[rgb(20,10,30)] to-[rgb(10,10,20)]">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <motion.div 
          className="flex flex-col gap-6 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[rgb(71,2,241)] via-[rgb(254,29,150)] to-[rgb(71,2,241)] bg-clip-text text-transparent">
              Discover Charities
            </h1>
            <p className="text-slate-400 text-lg">
              Support global causes while earning yield through decentralized philanthropy.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="relative flex items-center w-full">
                <Search className="absolute left-4 text-slate-400 w-5 h-5" />
                <input
                  className="w-full bg-white/5 border border-[rgb(71,2,241)]/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[rgb(254,29,150)] focus:border-transparent"
                  placeholder="Search by name or keyword..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </label>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {CHARITY_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] text-white shadow-lg shadow-[rgb(254,29,150)]/20'
                      : 'bg-white/5 border border-[rgb(71,2,241)]/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {category !== 'All Categories' && <span>{getCategoryIcon(category)}</span>}
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/5 border border-[rgb(71,2,241)]/10 rounded-2xl overflow-hidden mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgb(71,2,241)]/10 bg-[rgb(71,2,241)]/5">
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Rank</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Charity</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Current APY</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Total Yield Donated</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Active Donors</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(71,2,241)]/5">
                {filteredCharities.map((charity, index) => (
                  <motion.tr
                    key={charity.id}
                    className="hover:bg-[rgb(71,2,241)]/5 transition-colors group cursor-pointer"
                    onClick={() => router.push('/donate')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-6">
                      <span className={`text-xl font-bold ${index === 0 ? 'text-[rgb(71,2,241)]' : 'text-slate-500'}`}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-[rgb(71,2,241)]/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {charity.logo}
                        </div>
                        <div>
                          <p className="font-bold text-white">{charity.name}</p>
                          <p className="text-xs text-slate-500">{charity.description.slice(0, 50)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="bg-[rgb(71,2,241)]/20 text-[rgb(71,2,241)] text-[10px] font-bold uppercase px-2 py-1 rounded">
                        {charity.category}
                      </span>
                    </td>
                    <td className="px-6 py-6 font-bold text-emerald-400">{getAPY(index)}</td>
                    <td className="px-6 py-6 text-white font-medium">{getTotalYield(index)}</td>
                    <td className="px-6 py-6 text-slate-300">{getDonors(index)}</td>
                    <td className="px-6 py-6 text-right">
                      <button 
                        className="bg-gradient-to-r from-[rgb(71,2,241)] to-[rgb(254,29,150)] hover:opacity-90 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-[rgb(254,29,150)]/30"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push('/donate')
                        }}
                      >
                        Stake Now
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
