import Link from 'next/link'
import { ArrowRight, TrendingUp, Clock } from 'lucide-react'

const products = [
  {
    id: 1,
    name: '朱/紫 黑焰的支配者',
    series: 'sv5k',
    rarity: 'SSR',
    rarityColor: '#f6ae54',
    price: '¥ 880',
    originalPrice: '¥ 1,200',
    tag: '热销',
    tagColor: 'from-[#f6ae54] to-[#d4881a]',
    emoji: '🔥',
    hot: true,
  },
  {
    id: 2,
    name: '烈空坐ex 特别版',
    series: 'sv4',
    rarity: 'UR',
    rarityColor: '#b39ddb',
    price: '¥ 3,200',
    originalPrice: null,
    tag: '限定',
    tagColor: 'from-[#b39ddb] to-[#9575cd]',
    emoji: '💎',
    hot: false,
  },
  {
    id: 3,
    name: '黑拉帝乌斯 闪卡',
    series: 'sv4a',
    rarity: 'HR',
    rarityColor: '#4fc3f7',
    price: '¥ 560',
    originalPrice: '¥ 720',
    tag: '折扣',
    tagColor: 'from-[#4fc3f7] to-[#0288d1]',
    emoji: '✨',
    hot: false,
  },
  {
    id: 4,
    name: '皮卡丘 创始者',
    series: 'sv3pt5',
    rarity: 'SR',
    rarityColor: '#f48fb1',
    price: '¥ 2,800',
    originalPrice: null,
    tag: '稀有',
    tagColor: 'from-[#f48fb1] to-[#e91e8c]',
    emoji: '⚡',
    hot: true,
  },
]

const rarityBg: Record<string, string> = {
  SSR: 'from-[#f6ae54]/10 to-[#d4881a]/5',
  UR: 'from-[#b39ddb]/10 to-[#9575cd]/5',
  HR: 'from-[#4fc3f7]/10 to-[#0288d1]/5',
  SR: 'from-[#f48fb1]/10 to-[#e91e8c]/5',
}

export default function FeaturedCards() {
  return (
    <section className="relative py-24 bg-[#080b12]">
      {/* 背景光 */}
      <div className="absolute inset-0 bg-card-glow pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题区 */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#f6ae54] tracking-widest uppercase mb-3">
              <TrendingUp size={13} />
              Featured
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#f0f4ff]">
              精选热门卡牌
            </h2>
            <p className="text-[#6b7280] mt-2 text-sm">每日精选 · 价格透明 · 正品保证</p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#f6ae54] hover:text-[#ffd080] font-medium transition-colors group"
          >
            查看全部
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 卡牌网格 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="group relative rounded-2xl bg-[#0d1117] border border-white/5 overflow-hidden hover:border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* 卡牌展示区 */}
              <div className={`relative aspect-[3/4] flex items-center justify-center bg-gradient-to-br ${rarityBg[product.rarity]}`}>
                {/* 卡牌发光背景 */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${product.rarityColor}18 0%, transparent 70%)` }}
                />

                {/* 模拟卡牌 */}
                <div className="relative card-shine h-32 w-24 sm:h-44 sm:w-32 rounded-xl border border-white/10 shadow-2xl bg-gradient-to-br from-[#1e2636] to-[#283040] flex flex-col items-center justify-center gap-2 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <span className="text-4xl sm:text-5xl">{product.emoji}</span>
                  <div
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ color: product.rarityColor, background: `${product.rarityColor}20` }}
                  >
                    {product.rarity}
                  </div>
                </div>

                {/* 标签 */}
                <div className={`absolute top-3 left-3 rounded-full bg-gradient-to-r ${product.tagColor} px-2.5 py-0.5 text-[10px] font-bold text-white shadow-lg`}>
                  {product.tag}
                </div>

                {/* 热门标记 */}
                {product.hot && (
                  <div className="absolute top-3 right-3 text-base animate-bounce">🔥</div>
                )}
              </div>

              {/* 信息区 */}
              <div className="p-4">
                <div className="text-[10px] text-[#6b7280] font-medium uppercase tracking-wider mb-1">
                  {product.series}
                </div>
                <h3 className="text-sm font-semibold text-[#f0f4ff] leading-snug mb-3 group-hover:text-[#f6ae54] transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-gradient-gold">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-[#6b7280] line-through">{product.originalPrice}</span>
                  )}
                </div>
              </div>

              {/* Hover 浮层按钮 */}
              <div className="absolute inset-x-0 bottom-0 h-12 flex items-center justify-center bg-gradient-to-r from-[#f6ae54] to-[#d4881a] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-sm font-bold text-[#080b12]">立即购买</span>
              </div>
            </Link>
          ))}
        </div>

        {/* 移动端更多按钮 */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-[#a0aec0] hover:text-[#f0f4ff] hover:border-white/20 transition-all"
          >
            查看全部卡牌 <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
