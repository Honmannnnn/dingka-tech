'use client'

import Link from 'next/link'
import { Instagram, Youtube, Mail, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  '卡牌服务': [
    { label: '卡牌商城', href: '/shop' },
    { label: '卡牌图鉴', href: '/catalog' },
    { label: '卡牌鉴定', href: '/appraise' },
    { label: '最新资讯', href: '/news' },
  ],
  '关于我们': [
    { label: '公司简介', href: '/about' },
    { label: '合作代理', href: '/partner' },
    { label: '联系我们', href: '/contact' },
    { label: '招募伙伴', href: '/join' },
  ],
  '政策条款': [
    { label: '使用条款', href: '/terms' },
    { label: '隐私政策', href: '/privacy' },
    { label: '退换货政策', href: '/refund' },
    { label: '网站地图', href: '/sitemap' },
  ],
}

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Mail, label: '邮箱联系', href: 'mailto:contact@dingka.tech' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#0d1117] border-t border-white/5 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-[#f6ae54]/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f6ae54]/3 rounded-full blur-3xl pointer-events-none" />

      {/* 吉祥物装饰区 */}
      <div className="relative border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* 左侧品牌 */}
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#f6ae54] to-[#d4881a] flex items-center justify-center shadow-lg shadow-[#f6ae54]/20">
                <span className="text-[#080b12] font-black text-2xl">顶</span>
              </div>
              <div>
                <h3 className="text-gradient-gold font-bold text-2xl">顶卡科技</h3>
                <p className="text-[#6b7280] text-sm mt-0.5">专注集换式卡牌 · 让每张卡都有价值</p>
              </div>
            </div>

            {/* 社交媒体 */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center h-10 w-10 rounded-xl border border-white/10 text-[#6b7280] hover:text-[#f6ae54] hover:border-[#f6ae54]/30 hover:bg-[#f6ae54]/5 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 链接区 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[#f0f4ff] font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[#6b7280] text-sm hover:text-[#a0aec0] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 订阅区 */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[#f0f4ff] font-semibold text-sm mb-4">订阅资讯</h4>
            <p className="text-[#6b7280] text-sm mb-4">第一时间获取最新卡牌资讯和优惠活动</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="你的邮箱"
                className="flex-1 min-w-0 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-[#f0f4ff] placeholder-[#6b7280] focus:outline-none focus:border-[#f6ae54]/50 transition-colors"
              />
              <button
                type="submit"
                className="flex items-center justify-center h-9 w-9 rounded-lg bg-[#f6ae54] text-[#080b12] hover:bg-[#ffd080] transition-colors flex-shrink-0"
              >
                <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[#6b7280] text-xs">
              © 2024 顶卡科技. All rights reserved.
            </p>
            <p className="text-[#374151] text-xs">
              本站与 The Pokémon Company 无官方关联
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
