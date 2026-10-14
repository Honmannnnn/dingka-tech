'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PRODUCTS } from '@/data/products'
import { 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Heart, 
  Share2, 
  ChevronRight, 
  Sparkles, 
  Award,
  Zap,
  ShoppingBag
} from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params?.id as string

  const product = PRODUCTS.find((p) => p.id === productId)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [addedToast, setAddedToast] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen bg-[#080b12] text-[#f0f4ff] flex flex-col justify-between">
        <Header />
        <div className="text-center py-32 px-4">
          <div className="text-6xl mb-4">🎴</div>
          <h2 className="text-2xl font-bold mb-2">抱歉，该卡牌商品不存在或已下架</h2>
          <p className="text-[#6b7280] text-sm mb-6">您可以前往卡牌商城浏览最新上架的藏品</p>
          <Link
            href="/shop"
            className="inline-flex px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] text-[#080b12] font-bold text-sm"
          >
            返回卡牌商城
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const handleAddToCart = () => {
    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 2500)
  }

  // 相关推荐卡牌
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f4ff]">
      <Header />

      {/* 提示消息 */}
      {addedToast && (
        <div className="fixed top-24 right-6 z-50 glass-dark border border-[#f6ae54]/40 bg-[#161b27]/95 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles size={18} className="text-[#f6ae54]" />
          <span className="text-sm font-bold text-[#f0f4ff]">成功加入购物车 ({quantity} 件)</span>
        </div>
      )}

      {/* 顶部面包屑 */}
      <div className="pt-24 pb-6 border-b border-white/5 bg-[#0d1117]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#6b7280]">
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-white transition-colors">卡牌商城</Link>
            <ChevronRight size={12} />
            <span className="text-[#a0aec0]">{product.seriesName}</span>
            <ChevronRight size={12} />
            <span className="text-[#f6ae54] font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</span>
          </div>
        </div>
      </div>

      {/* 主体详情区 */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* 左侧：3D/全息感卡牌展示大图 */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[380px] aspect-[3/4.2] rounded-3xl p-6 bg-gradient-to-br from-[#161b27] to-[#0a0d14] border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden group">
                {/* 环绕光效 */}
                <div 
                  className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-700 blur-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${product.glowColor} 0%, transparent 70%)` }}
                />

                {/* 卡牌主模型 */}
                <div className="relative w-full h-full rounded-2xl border-2 border-white/20 shadow-2xl bg-gradient-to-br from-[#1e2636] to-[#283040] flex flex-col justify-between p-5 overflow-hidden card-shine group-hover:scale-[1.02] transition-transform duration-500">
                  {/* 头部信息 */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <h4 className="text-base font-black text-white">{product.name}</h4>
                      {product.jpName && <p className="text-[10px] text-[#a0aec0]">{product.jpName}</p>}
                    </div>
                    {product.hp && (
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#a0aec0]">HP</span>
                        <span className="text-lg font-black text-[#f6ae54] ml-1">{product.hp}</span>
                      </div>
                    )}
                  </div>

                  {/* 核心插画区域 */}
                  <div className={`w-full aspect-square rounded-xl bg-gradient-to-tr ${product.gradient} flex items-center justify-center shadow-inner my-auto text-7xl`}>
                    {product.type === 'fire' && '🔥'}
                    {product.type === 'electric' && '⚡'}
                    {product.type === 'dragon' && '🐲'}
                    {product.type === 'psychic' && '🔮'}
                    {product.type === 'colorless' && '💎'}
                  </div>

                  {/* 底部属性信息 */}
                  <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[11px] text-[#a0aec0]">
                    <span>插画师: {product.illustrator || 'Official'}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px]">{product.cardNumber}</span>
                      <span className="px-1.5 py-0.5 rounded font-black text-xs text-[#080b12] bg-[#f6ae54]">
                        {product.rarity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 稀有度角标浮层 */}
                <div className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-[#f6ae54] to-[#d4881a] px-3 py-1 text-xs font-black text-[#080b12] shadow-lg">
                  {product.rarity} 级殿堂收藏
                </div>
              </div>

              {/* 快捷操作 */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    isLiked
                      ? 'border-[#f48fb1] text-[#f48fb1] bg-[#f48fb1]/10'
                      : 'border-white/10 text-[#a0aec0] hover:text-white'
                  }`}
                >
                  <Heart size={15} fill={isLiked ? '#f48fb1' : 'none'} />
                  {isLiked ? '已关注' : '加入心愿单'}
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href)
                    alert('卡牌链接已复制到剪贴板！')
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-[#a0aec0] hover:text-white transition-colors"
                >
                  <Share2 size={15} />
                  分享卡牌
                </button>
              </div>
            </div>

            {/* 右侧：产品参数与购买面板 */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[#f6ae54] bg-[#f6ae54]/10 border border-[#f6ae54]/20 mb-3">
                  <Award size={13} />
                  {product.seriesName} · 官方正品
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#f0f4ff] mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-[#6b7280]">
                  编号：{product.cardNumber} ｜ 系列代码：{product.series} ｜ 发行日期：{product.releaseDate}
                </p>
              </div>

              {/* 价格区块 */}
              <div className="glass-dark border border-white/10 rounded-2xl p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-black text-gradient-gold">¥{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#6b7280] line-through">¥{product.originalPrice}</span>
                  )}
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold text-[#4fc3f7] bg-[#4fc3f7]/10">
                    现货即发
                  </span>
                </div>
                <p className="text-xs text-[#a0aec0]">
                  支持花呗分期 / 微信支付 / 顺丰到付保价 ｜ 顺丰特快空运直发
                </p>
              </div>

              {/* 招式与对战技能 (若为单卡) */}
              {product.skills && product.skills.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#a0aec0] flex items-center gap-1.5">
                    <Zap size={15} className="text-[#f6ae54]" />
                    卡牌招式与技能描述
                  </h3>
                  <div className="space-y-2">
                    {product.skills.map((skill, idx) => (
                      <div key={idx} className="bg-[#161b27] border border-white/5 rounded-xl p-3.5 text-xs">
                        <div className="flex items-center justify-between font-bold text-[#f0f4ff] mb-1">
                          <span>{skill.name}</span>
                          <span className="text-[#f6ae54] text-sm">{skill.damage} 点伤害</span>
                        </div>
                        {skill.effect && <p className="text-[#a0aec0]">{skill.effect}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 卡牌鉴赏说明 */}
              <div>
                <h3 className="text-sm font-bold text-[#a0aec0] mb-2">卡品说明与鉴定建议</h3>
                <p className="text-sm text-[#a0aec0] leading-relaxed bg-[#161b27]/60 border border-white/5 rounded-xl p-4">
                  {product.description} 顶卡科技支持代送 PSA/BGS 评级认证服务，卡面经过高清四角预检，无白边、无折痕、居中度良好。
                </p>
              </div>

              {/* 购买与加购按钮 */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#a0aec0]">数量选择:</span>
                  <div className="flex items-center border border-white/10 rounded-xl bg-[#161b27]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-1.5 text-sm hover:text-[#f6ae54] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3.5 py-1.5 text-sm hover:text-[#f6ae54] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-[#6b7280]">库存剩余 {product.stock} 件</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-[#f0f4ff] font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <ShoppingBag size={18} />
                    加入购物车
                  </button>
                  <button
                    onClick={() => alert(`准备跳转订单结算页，购买 ${quantity} 件 ${product.name}`)}
                    className="w-full sm:flex-1 py-4 rounded-xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] text-[#080b12] font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#f6ae54]/20 hover:scale-[1.02] transition-all duration-200"
                  >
                    立即购买
                  </button>
                </div>
              </div>

              {/* 售后保障条 */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 text-xs text-[#6b7280]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#f6ae54] flex-shrink-0" />
                  <span>100% 官方正品溯源</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-[#4fc3f7] flex-shrink-0" />
                  <span>顺丰多层防折加固</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw size={18} className="text-[#b39ddb] flex-shrink-0" />
                  <span>72小时售后保障</span>
                </div>
              </div>

            </div>
          </div>

          {/* 底部推荐卡牌 */}
          <div className="mt-24 pt-12 border-t border-white/5">
            <h3 className="text-2xl font-black text-[#f0f4ff] mb-8">同系列热门卡牌推荐</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((card) => (
                <Link
                  key={card.id}
                  href={`/shop/${card.id}`}
                  className="rounded-2xl bg-[#0d1117] border border-white/5 p-4 hover:border-[#f6ae54]/30 hover:-translate-y-1 transition-all group"
                >
                  <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-[#161b27] to-[#080b12] flex items-center justify-center text-4xl mb-3">
                    {card.type === 'fire' ? '🔥' : card.type === 'dragon' ? '🐲' : card.type === 'electric' ? '⚡' : '🔮'}
                  </div>
                  <div className="text-[10px] text-[#6b7280] font-semibold">{card.rarity} · {card.cardNumber}</div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#f6ae54] truncate transition-colors">
                    {card.name}
                  </h4>
                  <div className="text-sm font-black text-gradient-gold mt-2">¥{card.price}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
