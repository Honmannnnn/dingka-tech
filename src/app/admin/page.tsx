'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CardItem } from '@/lib/db'
import { 
  Package, 
  Layers, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  ExternalLink,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react'

export default function AdminPage() {
  const [cards, setCards] = useState<CardItem[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'unpublished'>('all')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // 新卡表单状态
  const [newCard, setNewCard] = useState({
    name: '',
    seriesName: '朱/紫最新弹',
    rarity: 'SAR',
    price: 990,
    stock: 10,
    type: 'fire',
    tag: '新上架',
    hot: false
  })

  // 提示信息
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // 获取后台全量卡牌与大盘指标
  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/cards')
      const json = await res.json()
      if (json.success) {
        setCards(json.data.cards)
        setStats(json.data.stats)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 快捷切换上下架状态
  const handleTogglePublished = async (card: CardItem) => {
    setUpdatingId(card.id)
    try {
      const nextState = !card.published
      const res = await fetch(`/api/admin/cards/${card.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: nextState })
      })
      const json = await res.json()
      if (json.success) {
        setCards((prev) =>
          prev.map((c) => (c.id === card.id ? { ...c, published: nextState } : c))
        )
        showToast(`已${nextState ? '成功上架' : '下架'}：${card.name}`)
        fetchData()
      }
    } catch (e) {
      alert('更新失败')
    } finally {
      setUpdatingId(null)
    }
  }

  // 快捷修改库存
  const handleStockChange = async (card: CardItem, newStock: number) => {
    if (newStock < 0) return
    setUpdatingId(card.id)
    try {
      const res = await fetch(`/api/admin/cards/${card.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      })
      const json = await res.json()
      if (json.success) {
        setCards((prev) =>
          prev.map((c) => (c.id === card.id ? { ...c, stock: newStock } : c))
        )
        fetchData()
      }
    } catch (e) {
      alert('库存更新失败')
    } finally {
      setUpdatingId(null)
    }
  }

  // 提交新增卡牌
  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard)
      })
      const json = await res.json()
      if (json.success) {
        showToast('新卡牌成功入库并上架！')
        setShowAddModal(false)
        setNewCard({
          name: '',
          seriesName: '朱/紫最新弹',
          rarity: 'SAR',
          price: 990,
          stock: 10,
          type: 'fire',
          tag: '新上架',
          hot: false
        })
        fetchData()
      } else {
        alert(json.message)
      }
    } catch (err) {
      alert('提交失败')
    }
  }

  // 过滤展示
  const filteredCards = cards.filter((c) => {
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && c.published) ||
      (statusFilter === 'unpublished' && !c.published)

    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.seriesName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cardNumber.toLowerCase().includes(searchTerm.toLowerCase())

    return matchStatus && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#080b12] text-[#f0f4ff] font-sans pb-24">
      {/* 提示条 Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 glass-dark border border-[#f6ae54]/50 bg-[#161b27]/95 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
          <Sparkles size={16} className="text-[#f6ae54]" />
          <span className="text-sm font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* 顶部导航 */}
      <header className="glass-dark border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#f6ae54] to-[#d4881a] flex items-center justify-center font-black text-[#080b12] text-sm">
              顶
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide text-white">顶卡科技 · 运营控制台</span>
              <span className="ml-2 text-[10px] text-[#f6ae54] px-2 py-0.5 rounded bg-[#f6ae54]/10 border border-[#f6ae54]/20 font-bold">
                POSTGRES & 云端驱动
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/" target="_blank" className="flex items-center gap-1.5 text-[#a0aec0] hover:text-white transition-colors">
              官网首页 <ExternalLink size={12} />
            </Link>
            <Link href="/shop" target="_blank" className="flex items-center gap-1.5 text-[#f6ae54] hover:text-[#ffd080] transition-colors">
              卡牌商城 <ExternalLink size={12} />
            </Link>
            <button
              onClick={fetchData}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#a0aec0] hover:text-white transition-colors"
              title="刷新数据"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* 数据大盘统计卡 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-dark border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[#a0aec0] mb-2">
              <span>在售卡牌总数</span>
              <Package size={16} className="text-[#f6ae54]" />
            </div>
            <div className="text-3xl font-black text-white">{stats ? stats.publishedCount : '--'}</div>
            <div className="text-[11px] text-[#6b7280] mt-1">前台实时展示中</div>
          </div>

          <div className="glass-dark border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[#a0aec0] mb-2">
              <span>已下架 / 待调价</span>
              <XCircle size={16} className="text-[#a0aec0]" />
            </div>
            <div className="text-3xl font-black text-[#a0aec0]">{stats ? stats.unpublishedCount : '--'}</div>
            <div className="text-[11px] text-[#6b7280] mt-1">前台自动隐藏</div>
          </div>

          <div className="glass-dark border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[#a0aec0] mb-2">
              <span>库存告急预警 (&lt;5件)</span>
              <AlertTriangle size={16} className="text-[#ff5722]" />
            </div>
            <div className="text-3xl font-black text-[#ff5722]">{stats ? stats.lowStockCount : '--'}</div>
            <div className="text-[11px] text-[#ff5722]/80 mt-1">需尽快安排调仓补货</div>
          </div>

          <div className="glass-dark border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[#a0aec0] mb-2">
              <span>在库卡牌总货值</span>
              <TrendingUp size={16} className="text-[#4fc3f7]" />
            </div>
            <div className="text-3xl font-black text-gradient-gold">
              ¥{stats ? stats.totalValue.toLocaleString() : '--'}
            </div>
            <div className="text-[11px] text-[#6b7280] mt-1">基于当前现货实时核算</div>
          </div>
        </div>

        {/* 控制工具条 */}
        <div className="glass-dark border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* 状态筛选 */}
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'all'
                  ? 'bg-gradient-to-r from-[#f6ae54] to-[#d4881a] text-[#080b12]'
                  : 'bg-white/5 text-[#a0aec0] hover:text-white'
              }`}
            >
              全部 ({cards.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'published'
                  ? 'bg-[#a5d6a7] text-[#080b12]'
                  : 'bg-white/5 text-[#a0aec0] hover:text-white'
              }`}
            >
              已上架 ({cards.filter((c) => c.published).length})
            </button>
            <button
              onClick={() => setStatusFilter('unpublished')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'unpublished'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-[#a0aec0] hover:text-white'
              }`}
            >
              已下架 ({cards.filter((c) => !c.published).length})
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* 搜索框 */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="搜索卡名、编号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#161b27] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#6b7280] focus:outline-none focus:border-[#f6ae54]/50"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
            </div>

            {/* 新增按钮 */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] text-[#080b12] font-black text-xs flex items-center gap-1.5 shadow-lg shadow-[#f6ae54]/20 hover:scale-105 transition-all flex-shrink-0"
            >
              <Plus size={14} /> 新增卡牌
            </button>
          </div>
        </div>

        {/* 卡牌库存管理表格 */}
        <div className="glass-dark border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-[#a0aec0] border-b border-white/5 font-bold">
                <tr>
                  <th className="py-3.5 px-4">卡牌信息</th>
                  <th className="py-3.5 px-4">系列 / 编号</th>
                  <th className="py-3.5 px-4">单价 (¥)</th>
                  <th className="py-3.5 px-4">现货库存</th>
                  <th className="py-3.5 px-4">当前状态 (点击一键切换)</th>
                  <th className="py-3.5 px-4 text-right">前台操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCards.map((card) => (
                  <tr key={card.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* 卡牌信息 */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${card.gradient} flex items-center justify-center text-xl flex-shrink-0 shadow`}>
                          {card.type === 'fire' && '🔥'}
                          {card.type === 'electric' && '⚡'}
                          {card.type === 'dragon' && '🐲'}
                          {card.type === 'psychic' && '🔮'}
                          {card.type === 'colorless' && '💎'}
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            {card.name}
                            <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-[#f6ae54]/15 text-[#f6ae54]">
                              {card.rarity}
                            </span>
                            {card.hot && <span className="text-xs">🔥</span>}
                          </div>
                          <div className="text-[10px] text-[#6b7280]">{card.categoryName}</div>
                        </div>
                      </div>
                    </td>

                    {/* 系列 */}
                    <td className="py-3.5 px-4 text-[#a0aec0]">
                      <div>{card.seriesName}</div>
                      <div className="text-[10px] font-mono text-[#6b7280]">{card.cardNumber}</div>
                    </td>

                    {/* 售价 */}
                    <td className="py-3.5 px-4">
                      <span className="font-black text-sm text-gradient-gold">¥{card.price}</span>
                      {card.originalPrice && (
                        <span className="text-[10px] text-[#6b7280] line-through ml-1.5">¥{card.originalPrice}</span>
                      )}
                    </td>

                    {/* 库存修改器 */}
                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center border border-white/10 rounded-xl bg-[#161b27] overflow-hidden">
                        <button
                          onClick={() => handleStockChange(card, card.stock - 1)}
                          disabled={updatingId === card.id || card.stock <= 0}
                          className="px-2.5 py-1 text-xs hover:text-[#f6ae54] disabled:opacity-30 transition-colors"
                        >
                          -
                        </button>
                        <span className={`px-3 py-1 font-mono font-bold ${card.stock < 5 ? 'text-[#ff5722]' : 'text-white'}`}>
                          {card.stock}
                        </span>
                        <button
                          onClick={() => handleStockChange(card, card.stock + 1)}
                          disabled={updatingId === card.id}
                          className="px-2.5 py-1 text-xs hover:text-[#f6ae54] disabled:opacity-30 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      {card.stock === 0 && (
                        <span className="ml-2 text-[10px] text-[#ff5722] font-bold">已断货</span>
                      )}
                    </td>

                    {/* 上下架开关 */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublished(card)}
                        disabled={updatingId === card.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          card.published
                            ? 'bg-[#a5d6a7]/15 text-[#a5d6a7] border border-[#a5d6a7]/30 hover:bg-[#a5d6a7]/25'
                            : 'bg-white/10 text-[#6b7280] border border-white/10 hover:bg-white/15'
                        }`}
                      >
                        {card.published ? <CheckCircle size={13} /> : <XCircle size={13} />}
                        {card.published ? '已上架售卖' : '已下架隐藏'}
                      </button>
                    </td>

                    {/* 链接 */}
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/shop/${card.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[#f6ae54] hover:text-[#ffd080] font-semibold transition-colors"
                      >
                        <Eye size={13} /> 前台预览
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* 新增卡牌弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#6b7280] hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-black text-white mb-6">入库并上架新卡牌</h3>

            <form onSubmit={handleCreateCard} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#a0aec0] mb-1 font-bold">卡牌名称 *</label>
                <input
                  type="text"
                  required
                  placeholder="例如：捷克罗姆ex 闪光特别版"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  className="w-full bg-[#161b27] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a0aec0] mb-1 font-bold">系列名称</label>
                  <input
                    type="text"
                    value={newCard.seriesName}
                    onChange={(e) => setNewCard({ ...newCard, seriesName: e.target.value })}
                    className="w-full bg-[#161b27] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#a0aec0] mb-1 font-bold">稀有度</label>
                  <select
                    value={newCard.rarity}
                    onChange={(e) => setNewCard({ ...newCard, rarity: e.target.value })}
                    className="w-full bg-[#161b27] border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="SAR">SAR (特异稀有)</option>
                    <option value="UR">UR (超稀有浮雕)</option>
                    <option value="SSR">SSR (闪光极稀)</option>
                    <option value="AR">AR (艺术插画)</option>
                    <option value="SR">SR (超级稀有)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a0aec0] mb-1 font-bold">售价 (¥) *</label>
                  <input
                    type="number"
                    required
                    value={newCard.price}
                    onChange={(e) => setNewCard({ ...newCard, price: Number(e.target.value) })}
                    className="w-full bg-[#161b27] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#a0aec0] mb-1 font-bold">初始库存 *</label>
                  <input
                    type="number"
                    required
                    value={newCard.stock}
                    onChange={(e) => setNewCard({ ...newCard, stock: Number(e.target.value) })}
                    className="w-full bg-[#161b27] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a0aec0] mb-1 font-bold">属性类型</label>
                  <select
                    value={newCard.type}
                    onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
                    className="w-full bg-[#161b27] border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="fire">火属性 🔥</option>
                    <option value="electric">雷属性 ⚡</option>
                    <option value="dragon">龙属性 🐲</option>
                    <option value="psychic">超属性 🔮</option>
                    <option value="colorless">普通/无色 💎</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#a0aec0] mb-1 font-bold">推荐标签</label>
                  <input
                    type="text"
                    value={newCard.tag}
                    onChange={(e) => setNewCard({ ...newCard, tag: e.target.value })}
                    className="w-full bg-[#161b27] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#a0aec0] font-bold"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] text-[#080b12] font-black"
                >
                  确认入库并上架
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
