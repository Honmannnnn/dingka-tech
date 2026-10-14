'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Newspaper, Calendar, Clock, ArrowRight, Sparkles, Tag } from 'lucide-react'

const categories = ['全部', '新品发售', '赛事战报', '行业动态', '鉴真科普']

const newsArticles = [
  {
    id: 1,
    title: '朱/紫「黑焰支配者」简体中文版正式开箱：恶属性太晶喷火龙出目率实测',
    category: '新品发售',
    date: '2024-03-05',
    readTime: '4 分钟',
    excerpt: '本期新弹备受瞩目的黑暗太晶喷火龙SAR实卡到货！我们针对首批10箱扩充包进行了封入率与版面工艺全景评测...',
    tag: '热门头条',
    featured: true
  },
  {
    id: 2,
    title: '顶卡科技 2024 春季大师挑战赛圆满落幕：沙奈朵ex卡组斩获冠军',
    category: '赛事战报',
    date: '2024-03-02',
    readTime: '3 分钟',
    excerpt: '来自全国各地的256名顶尖卡牌选手齐聚，经过8轮瑞士轮与淘汰赛的激烈博弈，沙奈朵ex控制流体系夺得桂冠...',
    tag: '赛事'
  },
  {
    id: 3,
    title: '新手藏家指南：如何用十倍放大镜与紫光灯鉴别宝可梦卡牌真伪？',
    category: '鉴真科普',
    date: '2024-02-28',
    readTime: '6 分钟',
    excerpt: '从纸张黑芯夹层、侧边切口毛刺、字体微缩印刷到背部精灵球高光反光，顶卡首席鉴定师为您拆解五大防伪细节...',
    tag: '必读'
  },
  {
    id: 4,
    title: '全球TCG市场年度分析报告：高品相稀有卡牌的抗通胀与资产化趋势',
    category: '行业动态',
    date: '2024-02-20',
    readTime: '5 分钟',
    excerpt: '伴随国际评级机构PSA评级总量的突破，高分卡牌正逐渐成为年轻世代藏家的重要资产配置品类...',
    tag: '深度'
  },
  {
    id: 5,
    title: '经典151复刻系列特别补充包追加预订通知及配额说明',
    category: '新品发售',
    date: '2024-02-15',
    readTime: '2 分钟',
    excerpt: '为满足实体加盟商与广大卡友需求，顶卡科技已成功协调第二批官方未拆原盒货源，今日正式开启VIP预约通道...',
    tag: '通知'
  }
]

export default function NewsPage() {
  const [selectedCat, setSelectedCat] = useState('全部')

  const filteredNews = newsArticles.filter(
    (n) => selectedCat === '全部' || n.category === selectedCat
  )

  const headline = newsArticles.find((n) => n.featured)

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f4ff]">
      <Header />

      {/* 顶部主视觉 */}
      <section className="relative pt-32 pb-16 border-b border-white/5 bg-gradient-to-b from-[#0d1117] to-[#080b12]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#f48fb1]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f48fb1]/20 bg-[#f48fb1]/10 px-4 py-1 text-xs font-semibold text-[#f48fb1] mb-4">
            <Newspaper size={13} />
            顶卡快讯 · 全球TCG动态一手掌握
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            最新资讯与 <span className="text-gradient-gold">权威科普</span>
          </h1>
          <p className="text-[#a0aec0] max-w-2xl mx-auto text-sm sm:text-base">
            汇聚官方发售情报、冠军卡组战报、市场行情趋势与深度鉴真指南
          </p>
        </div>
      </section>

      {/* 分类栏 */}
      <section className="sticky top-16 lg:top-20 z-20 glass-dark border-b border-white/5 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCat === c
                    ? 'bg-gradient-to-r from-[#f6ae54] to-[#d4881a] text-[#080b12] shadow-md shadow-[#f6ae54]/20'
                    : 'bg-white/5 text-[#a0aec0] hover:text-white hover:bg-white/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#6b7280] hidden sm:block">
            共 {filteredNews.length} 篇文章
          </span>
        </div>
      </section>

      {/* 资讯内容区 */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* 头条推荐卡片 */}
          {headline && selectedCat === '全部' && (
            <div className="rounded-3xl bg-gradient-to-br from-[#161b27] via-[#0d1117] to-[#080b12] border border-white/10 p-6 sm:p-10 relative overflow-hidden group hover:border-[#f6ae54]/30 transition-all">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#f6ae54]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#080b12] bg-[#f6ae54]">
                    {headline.tag}
                  </span>
                  <span className="text-xs text-[#a0aec0]">{headline.category}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#f6ae54] transition-colors leading-snug">
                  {headline.title}
                </h2>
                <p className="text-sm text-[#a0aec0] leading-relaxed line-clamp-2">
                  {headline.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#6b7280] pt-2">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {headline.date}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {headline.readTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* 文章列表网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <div
                key={article.id}
                className="group rounded-2xl bg-[#0d1117] border border-white/5 p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[#f6ae54] font-semibold text-[11px]">
                      {article.category}
                    </span>
                    <span className="text-[#6b7280] text-[11px]">{article.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#f0f4ff] mb-3 group-hover:text-[#f6ae54] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#a0aec0] line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#6b7280]">
                  <span>阅读时间: {article.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-[#f6ae54] font-medium group-hover:translate-x-1 transition-transform">
                    阅读全文 <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
