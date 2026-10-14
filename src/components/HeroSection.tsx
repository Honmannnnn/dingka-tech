'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, Star } from 'lucide-react'

const floatingCards = [
  { emoji: '✨', label: 'SSR', top: '20%', left: '5%', delay: '0s', size: 'sm' },
  { emoji: '⚡', label: '闪卡', top: '60%', left: '8%', delay: '1s', size: 'md' },
  { emoji: '🔥', label: 'SR', top: '15%', right: '6%', delay: '0.5s', size: 'md' },
  { emoji: '💎', label: 'UR', top: '55%', right: '5%', delay: '1.5s', size: 'sm' },
  { emoji: '🌟', label: 'HR', top: '80%', left: '15%', delay: '2s', size: 'sm' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景层 */}
      <div className="absolute inset-0 bg-[#080b12]">
        {/* 渐变光晕 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-radial from-[#f6ae54]/10 via-[#f6ae54]/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4fc3f7]/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#b39ddb]/5 rounded-full blur-3xl" />

        {/* 网格装饰 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(246,174,84,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(246,174,84,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* 星星粒子 */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* 浮动卡牌装饰 */}
      {floatingCards.map((card, i) => (
        <div
          key={i}
          className="absolute hidden md:flex flex-col items-center gap-1.5 animate-float"
          style={{
            top: card.top,
            left: card.left,
            right: card.right,
            animationDelay: card.delay,
            animationDuration: `${3 + i * 0.7}s`,
          }}
        >
          <div className={`border-glow-gold glass-dark rounded-xl flex items-center justify-center shadow-xl ${
            card.size === 'sm' ? 'h-14 w-10 text-xl' : 'h-20 w-14 text-3xl'
          }`}>
            {card.emoji}
          </div>
          <span className="text-[10px] text-[#f6ae54] font-semibold tracking-wider">{card.label}</span>
        </div>
      ))}

      {/* 主内容 */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* 标签 */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#f6ae54]/20 bg-[#f6ae54]/5 px-4 py-1.5 text-xs font-medium text-[#f6ae54] mb-8">
          <Sparkles size={12} />
          专注集换式卡牌 · 一站式服务平台
          <Sparkles size={12} />
        </div>

        {/* 主标题 */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6 leading-none">
          <span className="text-gradient-gold block">顶级卡牌</span>
          <span className="text-[#f0f4ff] block mt-2">触手可得</span>
        </h1>

        {/* 副标题 */}
        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-[#a0aec0] mb-10 leading-relaxed">
          顶卡科技汇聚全球顶级宝可梦卡牌资源，
          为每一位卡牌爱好者提供专业的购买、鉴定与代理服务
        </p>

        {/* CTA 按钮组 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] px-8 py-4 text-base font-bold text-[#080b12] shadow-xl shadow-[#f6ae54]/20 hover:shadow-[#f6ae54]/40 hover:scale-105 transition-all duration-300 animate-pulse-glow"
          >
            探索卡牌商城
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-[#f0f4ff] hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <Star size={18} className="text-[#f6ae54]" />
            查看卡牌图鉴
          </Link>
        </div>

        {/* 数据展示 */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: '5000+', label: '卡牌品种' },
            { value: '98%', label: '好评率' },
            { value: '10万+', label: '服务玩家' },
          ].map(({ value, label }) => (
            <div key={label} className="glass-dark rounded-2xl border border-white/5 p-4">
              <div className="text-2xl sm:text-3xl font-black text-gradient-gold">{value}</div>
              <div className="text-xs text-[#6b7280] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部渐出 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080b12] to-transparent" />
    </section>
  )
}
