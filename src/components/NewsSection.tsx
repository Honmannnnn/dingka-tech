import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'

const news = [
  {
    id: 1,
    category: '新品上架',
    categoryColor: '#f6ae54',
    date: '2024-12-20',
    title: '朱/紫 超电磁炮 最新系列正式开售',
    excerpt: '本期新弹包含全新机制卡牌，闪卡比例大幅提升，皮卡丘系列迎来全新设计...',
    readTime: '3 min',
  },
  {
    id: 2,
    category: '活动资讯',
    categoryColor: '#4fc3f7',
    date: '2024-12-18',
    title: '顶卡科技年终大促活动正式开始',
    excerpt: '全场卡牌低至8折，SSR以上稀有度额外享受95折，满500包邮还送限定周边...',
    readTime: '2 min',
  },
  {
    id: 3,
    category: '行业资讯',
    categoryColor: '#b39ddb',
    date: '2024-12-15',
    title: '2025年宝可梦集换式卡牌发售预告汇总',
    excerpt: '官方公布2025年全年发售计划，多个合作系列、联名版本即将与玩家见面...',
    readTime: '5 min',
  },
]

export default function NewsSection() {
  return (
    <section className="relative py-24 bg-[#080b12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题区 */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#f6ae54] tracking-widest uppercase mb-3">
              <Newspaper size={13} />
              Latest News
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#f0f4ff]">最新资讯</h2>
            <p className="text-[#6b7280] mt-2 text-sm">卡牌动态 · 活动预告 · 行业新闻</p>
          </div>
          <Link
            href="/news"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#f6ae54] hover:text-[#ffd080] font-medium transition-colors group"
          >
            查看全部
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 新闻列表 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {news.map((item, i) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className={`group relative rounded-2xl bg-[#0d1117] border border-white/5 p-6 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 ${
                i === 0 ? 'md:col-span-1 md:row-span-1' : ''
              }`}
            >
              {/* 分类标签 */}
              <div
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold mb-4"
                style={{
                  color: item.categoryColor,
                  background: `${item.categoryColor}15`,
                  border: `1px solid ${item.categoryColor}30`,
                }}
              >
                {item.category}
              </div>

              {/* 标题 */}
              <h3 className="text-base font-bold text-[#f0f4ff] mb-3 leading-snug group-hover:text-[#f6ae54] transition-colors line-clamp-2">
                {item.title}
              </h3>

              {/* 摘要 */}
              <p className="text-sm text-[#6b7280] leading-relaxed mb-4 line-clamp-2">
                {item.excerpt}
              </p>

              {/* 底部信息 */}
              <div className="flex items-center justify-between text-xs text-[#374151]">
                <time>{item.date}</time>
                <span>{item.readTime} read</span>
              </div>

              {/* 底部边框动画 */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${item.categoryColor}, transparent)` }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
