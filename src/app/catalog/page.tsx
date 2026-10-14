'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { PRODUCTS, CardProduct } from '@/data/products'
import { BookOpen, Sparkles, Filter, Grid, Search, Eye } from 'lucide-react'

const seriesList = [
  { id: 'all', name: '全部系列', code: 'ALL' },
  { id: 'sv5k', name: '黑焰支配者', code: 'SV5K' },
  { id: 'sv4a', name: '闪色宝藏', code: 'SV4A' },
  { id: 'sv3pt5', name: '经典151复刻', code: 'SV3.5' }
]

const elementTypes = [
  { id: 'all', label: '全部属性', icon: '✨' },
  { id: 'fire', label: '火属性', icon: '🔥' },
  { id: 'electric', label: '雷属性', icon: '⚡' },
  { id: 'psychic', label: '超属性', icon: '🔮' },
  { id: 'dragon', label: '龙属性', icon: '🐲' }
]

export default function CatalogPage() {
  const [selectedSeries, setSelectedSeries] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalCard, setActiveModalCard] = useState<CardProduct | null>(null)

  const catalogCards = PRODUCTS.filter((card) => {
    const matchSeries = selectedSeries === 'all' || card.series === selectedSeries
    const matchType = selectedType === 'all' || card.type === selectedType
    const matchQuery =
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.cardNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (card.jpName && card.jpName.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchSeries && matchType && matchQuery
  })

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f4ff]">
      <Header />

      {/* 顶部视觉区 */}
      <section className="relative pt-32 pb-16 border-b border-white/5 bg-gradient-to-b from-[#0d1117] to-[#080b12]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#4fc3f7]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4fc3f7]/20 bg-[#4fc3f7]/10 px-4 py-1 text-xs font-semibold text-[#4fc3f7] mb-4">
            <BookOpen size={13} />
            顶卡数据库 · 官方集换式卡牌图鉴
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            宝可梦卡牌 <span className="text-gradient-blue">全图鉴数据库</span>
          </h1>
          <p className="text-[#a0aec0] max-w-2xl mx-auto text-sm sm:text-base">
            快速查询朱紫世代卡牌编号、稀有度评级、招式伤害与插画大师数据
          </p>

          {/* 快速搜索栏 */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="输入卡牌名称 / 编号 / 日文名查询..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161b27] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-[#f0f4ff] placeholder-[#6b7280] focus:outline-none focus:border-[#4fc3f7]/50 transition-colors shadow-xl"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" />
          </div>
        </div>
      </section>

      {/* 过滤条 */}
      <section className="sticky top-16 lg:top-20 z-20 glass-dark border-b border-white/5 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 系列标签 */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide py-1">
            {seriesList.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSeries(s.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedSeries === s.id
                    ? 'bg-[#4fc3f7] text-[#080b12] shadow-md shadow-[#4fc3f7]/20'
                    : 'bg-white/5 text-[#a0aec0] hover:bg-white/10 hover:text-white'
                }`}
              >
                {s.name} ({s.code})
              </button>
            ))}
          </div>

          {/* 属性筛选 */}
          <div className="flex items-center gap-2">
            {elementTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-2.5 py-1 rounded-lg text-xs border transition-all ${
                  selectedType === t.id
                    ? 'border-[#4fc3f7] bg-[#4fc3f7]/10 text-[#4fc3f7] font-bold'
                    : 'border-white/5 text-[#a0aec0] hover:border-white/20'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 图鉴网格 */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-[#6b7280]">
              已收录 <strong className="text-[#4fc3f7]">{catalogCards.length}</strong> 张卡牌数据
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {catalogCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setActiveModalCard(card)}
                className="group relative rounded-xl bg-[#0d1117] border border-white/5 p-3 hover:border-[#4fc3f7]/40 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-[#4fc3f7]/10 flex flex-col justify-between"
              >
                {/* 模拟卡面 */}
                <div className="aspect-[3/4.2] rounded-lg bg-gradient-to-br from-[#161b27] to-[#1e2636] border border-white/10 p-2 flex flex-col justify-between overflow-hidden relative group-hover:scale-105 transition-transform">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="font-bold truncate max-w-[60px] text-white">{card.name}</span>
                    {card.hp && <span className="text-[#f6ae54] font-black">HP{card.hp}</span>}
                  </div>

                  <div className={`aspect-square rounded-md bg-gradient-to-tr ${card.gradient} flex items-center justify-center text-3xl my-auto`}>
                    {card.type === 'fire' && '🔥'}
                    {card.type === 'electric' && '⚡'}
                    {card.type === 'dragon' && '🐲'}
                    {card.type === 'psychic' && '🔮'}
                    {card.type === 'colorless' && '💎'}
                  </div>

                  <div className="flex justify-between items-center text-[8px] text-[#6b7280]">
                    <span>{card.cardNumber}</span>
                    <span className="font-bold text-[#f6ae54]">{card.rarity}</span>
                  </div>

                  {/* 悬浮快速预览指示 */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#4fc3f7] font-bold">
                      <Eye size={12} /> 查看图鉴
                    </span>
                  </div>
                </div>

                {/* 卡底名 */}
                <div className="mt-2 text-center">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-[#4fc3f7] transition-colors">
                    {card.name}
                  </h4>
                  <p className="text-[10px] text-[#6b7280]">{card.seriesName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 卡牌详情弹窗 Modal */}
      {activeModalCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0d1117] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            {/* 关闭按钮 */}
            <button
              onClick={() => setActiveModalCard(null)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#a0aec0] hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* 卡牌立绘 */}
              <div className="w-48 aspect-[3/4.2] rounded-2xl bg-gradient-to-br from-[#161b27] to-[#1e2636] border-2 border-white/20 p-4 flex flex-col justify-between shadow-2xl flex-shrink-0">
                <div className="flex justify-between text-xs font-bold">
                  <span>{activeModalCard.name}</span>
                  {activeModalCard.hp && <span className="text-[#f6ae54]">HP {activeModalCard.hp}</span>}
                </div>
                <div className={`aspect-square rounded-xl bg-gradient-to-tr ${activeModalCard.gradient} flex items-center justify-center text-5xl my-auto`}>
                  {activeModalCard.type === 'fire' && '🔥'}
                  {activeModalCard.type === 'electric' && '⚡'}
                  {activeModalCard.type === 'dragon' && '🐲'}
                  {activeModalCard.type === 'psychic' && '🔮'}
                  {activeModalCard.type === 'colorless' && '💎'}
                </div>
                <div className="flex justify-between text-[10px] text-[#a0aec0]">
                  <span>{activeModalCard.cardNumber}</span>
                  <span className="font-bold text-[#f6ae54]">{activeModalCard.rarity}</span>
                </div>
              </div>

              {/* 卡牌资料 */}
              <div className="flex-1 space-y-4 text-xs">
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold text-[#4fc3f7] bg-[#4fc3f7]/10 mb-2">
                    {activeModalCard.seriesName} · {activeModalCard.rarity}
                  </div>
                  <h3 className="text-xl font-black text-white">{activeModalCard.name}</h3>
                  {activeModalCard.jpName && <p className="text-[#6b7280]">{activeModalCard.jpName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 bg-white/5 rounded-xl">
                  <div><span className="text-[#6b7280]">属性:</span> {activeModalCard.type.toUpperCase()}</div>
                  <div><span className="text-[#6b7280]">弱点:</span> {activeModalCard.weakness || '无'}</div>
                  <div><span className="text-[#6b7280]">撤退:</span> {activeModalCard.retreat ? `${activeModalCard.retreat} 能量` : '无'}</div>
                  <div><span className="text-[#6b7280]">插画:</span> {activeModalCard.illustrator || '官方'}</div>
                </div>

                {activeModalCard.skills && (
                  <div className="space-y-1.5">
                    <span className="font-bold text-[#a0aec0]">招式列表:</span>
                    {activeModalCard.skills.map((s, i) => (
                      <div key={i} className="p-2 bg-[#161b27] rounded-lg">
                        <div className="flex justify-between font-bold text-white">
                          <span>{s.name}</span>
                          <span className="text-[#f6ae54]">{s.damage}</span>
                        </div>
                        {s.effect && <p className="text-[#a0aec0] text-[11px] mt-0.5">{s.effect}</p>}
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <div className="text-sm font-bold text-gradient-gold">
                    参考市价: ¥{activeModalCard.price}
                  </div>
                  <Link
                    href={`/shop/${activeModalCard.id}`}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] text-[#080b12] font-black text-xs hover:scale-105 transition-transform"
                  >
                    去商城购买
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
