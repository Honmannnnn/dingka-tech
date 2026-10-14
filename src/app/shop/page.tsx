'use client'

import { useState, useMemo, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { PRODUCTS, CardProduct } from '@/data/products'
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles, ShieldCheck, Flame, Tag } from 'lucide-react'

const categories = [
  { id: 'all', label: '全部商品' },
  { id: 'single', label: '单卡精选' },
  { id: 'booster_box', label: '扩充包整盒' },
  { id: 'accessory', label: '周边与卡砖' }
]

const rarities = ['全部', 'SAR', 'UR', 'SSR', 'AR', 'SR']

const types = [
  { id: 'all', label: '全部属性', icon: '✨' },
  { id: 'fire', label: '火属性', icon: '🔥' },
  { id: 'electric', label: '雷属性', icon: '⚡' },
  { id: 'psychic', label: '超属性', icon: '🔮' },
  { id: 'dragon', label: '龙属性', icon: '🐲' },
]

export default function ShopPage() {
  const [products, setProducts] = useState<CardProduct[]>(PRODUCTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRarity, setSelectedRarity] = useState('全部')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'newest'>('default')

  // 动态同步后台管理端商品状态（上下架、库存动态变更）
  useEffect(() => {
    let isMounted = true
    fetch('/api/products')
      .then((res) => res.json())
      .then((resData) => {
        if (isMounted && resData.success && Array.isArray(resData.data)) {
          setProducts(resData.data)
        }
      })
      .catch((err) => console.error('同步实时卡牌数据失败:', err))

    return () => {
      isMounted = false
    }
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.seriesName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.cardNumber.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory
      const matchRarity = selectedRarity === '全部' || p.rarity === selectedRarity
      const matchType = selectedType === 'all' || p.type === selectedType

      return matchSearch && matchCategory && matchRarity && matchType
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'newest') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      return (b.hot ? 1 : 0) - (a.hot ? 1 : 0)
    })
  }, [products, searchTerm, selectedCategory, selectedRarity, selectedType, sortBy])

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f4ff]">
      <Header />

      {/* 顶部横幅 */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0d1117] to-[#080b12]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#f6ae54]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6ae54]/20 bg-[#f6ae54]/10 px-4 py-1 text-xs font-semibold text-[#f6ae54] mb-4">
            <Sparkles size={13} />
            官方正品授权 · 权威鉴定保真
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            顶卡精选 <span className="text-gradient-gold">卡牌商城</span>
          </h1>
          <p className="text-[#a0aec0] max-w-2xl mx-auto text-sm sm:text-base">
            汇聚最新朱紫系列原装包盒、稀有高分高稀度单卡与顶级防尘卡砖周边
          </p>

          {/* 信任条 */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#a0aec0]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-[#f6ae54]" /> 100% 假一赔十</span>
            <span className="flex items-center gap-1.5"><Flame size={16} className="text-[#ff5722]" /> 全密封原厂货源</span>
            <span className="flex items-center gap-1.5"><Tag size={16} className="text-[#4fc3f7]" /> 满¥299顺丰特快包邮</span>
          </div>
        </div>
      </section>

      {/* 筛选与搜索控制栏 */}
      <section className="sticky top-16 lg:top-20 z-30 glass-dark border-b border-white/5 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* 分类标签切换 */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide py-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-[#f6ae54] to-[#d4881a] text-[#080b12] shadow-md shadow-[#f6ae54]/20'
                      : 'bg-white/5 text-[#a0aec0] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 搜索框 */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="搜索卡名、编号、系列..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#161b27] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-[#f0f4ff] placeholder-[#6b7280] focus:outline-none focus:border-[#f6ae54]/50 transition-colors"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7280]" />
            </div>
          </div>

          {/* 二级过滤：稀有度 & 属性 & 排序 */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-white/5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#6b7280]">稀有度:</span>
              <div className="flex items-center gap-1.5">
                {rarities.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRarity(r)}
                    className={`px-2.5 py-1 rounded-lg border transition-all ${
                      selectedRarity === r
                        ? 'border-[#f6ae54] bg-[#f6ae54]/10 text-[#f6ae54] font-bold'
                        : 'border-white/5 text-[#a0aec0] hover:border-white/20'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* 排序方式 */}
            <div className="flex items-center gap-2">
              <span className="text-[#6b7280] flex items-center gap-1"><ArrowUpDown size={12} /> 排序:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#161b27] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-[#f0f4ff] focus:outline-none focus:border-[#f6ae54]/50"
              >
                <option value="default">综合热度</option>
                <option value="price-asc">价格: 低到高</option>
                <option value="price-desc">价格: 高到低</option>
                <option value="newest">最新上架</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 商品网格区 */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 glass-dark rounded-3xl border border-white/5">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#f0f4ff] mb-2">未找到匹配的卡牌商品</h3>
              <p className="text-sm text-[#6b7280] mb-6">试着切换筛选条件或更换搜索关键词</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedRarity('全部')
                  setSelectedType('all')
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] text-[#080b12] font-semibold text-sm"
              >
                重置所有筛选
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((card) => (
                <Link
                  key={card.id}
                  href={`/shop/${card.id}`}
                  className="group relative rounded-2xl bg-[#0d1117] border border-white/5 overflow-hidden hover:border-[#f6ae54]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#f6ae54]/10 flex flex-col justify-between"
                >
                  {/* 卡牌主视觉展示 */}
                  <div className="relative aspect-[3/4] p-4 flex flex-col items-center justify-center bg-gradient-to-br from-[#161b27] to-[#080b12] overflow-hidden">
                    {/* 卡牌背光效果 */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at center, ${card.glowColor} 0%, transparent 70%)` }}
                    />

                    {/* 卡牌模型主体 */}
                    <div className="relative card-shine w-full h-full max-h-[220px] max-w-[160px] rounded-xl border border-white/10 shadow-xl bg-gradient-to-br from-[#1e2636] to-[#283040] flex flex-col items-center justify-between p-3 group-hover:scale-105 transition-transform duration-500">
                      {/* 卡头信息 */}
                      <div className="w-full flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[#f0f4ff] truncate max-w-[90px]">{card.name}</span>
                        {card.hp && <span className="text-[#f6ae54] font-black">HP {card.hp}</span>}
                      </div>

                      {/* 卡面视觉 */}
                      <div className={`w-full aspect-square rounded-lg bg-gradient-to-tr ${card.gradient} flex items-center justify-center shadow-inner text-4xl`}>
                        {card.type === 'fire' && '🔥'}
                        {card.type === 'electric' && '⚡'}
                        {card.type === 'dragon' && '🐲'}
                        {card.type === 'psychic' && '🔮'}
                        {card.type === 'colorless' && '💎'}
                      </div>

                      {/* 卡底编号与稀有度 */}
                      <div className="w-full flex items-center justify-between text-[9px] text-[#6b7280]">
                        <span>{card.cardNumber}</span>
                        <span className="font-black text-[#f6ae54]">{card.rarity}</span>
                      </div>
                    </div>

                    {/* 标签 */}
                    {card.tag && (
                      <div className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-[#f6ae54] to-[#d4881a] px-2.5 py-0.5 text-[10px] font-bold text-[#080b12] shadow-md">
                        {card.tag}
                      </div>
                    )}

                    {/* 稀有度角标 */}
                    <div className="absolute top-3 right-3 text-xs font-black px-2 py-0.5 rounded-md border border-white/10 bg-black/40 backdrop-blur-sm text-[#f6ae54]">
                      {card.rarity}
                    </div>
                  </div>

                  {/* 信息说明与操作 */}
                  <div className="p-4 flex flex-col flex-1 justify-between bg-[#0d1117]/80">
                    <div>
                      <div className="text-[10px] text-[#6b7280] font-medium uppercase tracking-wider mb-1">
                        {card.seriesName} · {card.categoryName}
                      </div>
                      <h3 className="text-sm font-bold text-[#f0f4ff] mb-2 line-clamp-1 group-hover:text-[#f6ae54] transition-colors">
                        {card.name}
                      </h3>
                      <p className="text-xs text-[#a0aec0] line-clamp-2 mb-3">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-baseline justify-between">
                      <div>
                        <span className="text-lg font-black text-gradient-gold">¥{card.price}</span>
                        {card.originalPrice && (
                          <span className="text-xs text-[#6b7280] line-through ml-2">¥{card.originalPrice}</span>
                        )}
                      </div>
                      {card.stock > 0 ? (
                        card.stock <= 3 ? (
                          <span className="text-[11px] text-[#f6ae54] font-medium animate-pulse">仅剩 {card.stock} 件</span>
                        ) : (
                          <span className="text-[11px] text-[#6b7280]">库存 {card.stock} 件</span>
                        )
                      ) : (
                        <span className="text-[11px] text-red-400 font-semibold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">已售罄</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
