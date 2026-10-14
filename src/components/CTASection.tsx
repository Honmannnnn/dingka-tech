import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative py-24 bg-[#0d1117] overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f6ae54]/5 via-transparent to-[#b39ddb]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#f6ae54]/8 rounded-full blur-3xl" />
      </div>

      {/* 装饰卡牌 */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="h-40 w-28 rounded-2xl border-glow-gold glass-dark flex items-center justify-center text-5xl shadow-2xl rotate-[-8deg]">🌟</div>
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block animate-float" style={{ animationDelay: '1.2s' }}>
        <div className="h-40 w-28 rounded-2xl border-glow-gold glass-dark flex items-center justify-center text-5xl shadow-2xl rotate-[8deg]">💎</div>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#f6ae54]/20 bg-[#f6ae54]/5 px-4 py-1.5 text-xs font-medium text-[#f6ae54] mb-8">
          <Sparkles size={12} />
          限时优惠 · 新人专属
          <Sparkles size={12} />
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-[#f0f4ff] mb-6 leading-tight">
          开启你的
          <span className="text-gradient-gold"> 卡牌之旅</span>
        </h2>

        <p className="text-lg text-[#a0aec0] mb-10 max-w-xl mx-auto">
          新用户注册即享 <span className="text-[#f6ae54] font-bold">88元</span> 优惠券，
          首单满300减50，与全国卡牌爱好者一起探索集换式卡牌的无限魅力
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] px-10 py-4 text-base font-bold text-[#080b12] shadow-xl shadow-[#f6ae54]/20 hover:shadow-[#f6ae54]/40 hover:scale-105 transition-all duration-300"
          >
            免费注册领券
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#a0aec0] hover:text-[#f6ae54] text-sm font-medium transition-colors group"
          >
            先逛逛商城
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 信任标志 */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#374151]">
          {['✓ 无理由退换', '✓ 正品保证', '✓ 顺丰包邮', '✓ 专业鉴定', '✓ 安全支付'].map((item) => (
            <span key={item} className="text-[#6b7280]">{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
