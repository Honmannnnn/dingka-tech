'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react'

const navItems = [
  { label: '首页', href: '/' },
  { label: '卡牌商城', href: '/shop' },
  { label: '最新资讯', href: '/news' },
  { label: '卡牌图鉴', href: '/catalog' },
  { label: '关于我们', href: '/about' },
  { label: '管理后台', href: '/admin', badge: '中台' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-dark border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-[#f6ae54] to-[#d4881a] flex items-center justify-center shadow-lg group-hover:shadow-[#f6ae54]/30 transition-shadow duration-300">
                <span className="text-[#080b12] font-black text-base leading-none">顶</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-gradient-gold font-bold text-lg tracking-wide">顶卡科技</span>
                <p className="text-[10px] text-[#6b7280] tracking-widest uppercase mt-0.5">DingKa Technology</p>
              </div>
            </Link>

            {/* 桌面端导航 */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3.5 py-2 text-sm font-medium text-[#a0aec0] hover:text-[#f0f4ff] transition-colors duration-200 group flex items-center gap-1.5"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#f6ae54]/20 text-[#f6ae54] border border-[#f6ae54]/30 leading-none">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-[#f6ae54] to-[#ffd080] rounded-full group-hover:w-4/5 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* 右侧按钮区 */}
            <div className="flex items-center gap-3">
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f6ae54] to-[#d4881a] px-5 py-2 text-sm font-semibold text-[#080b12] shadow-lg hover:shadow-[#f6ae54]/30 hover:scale-105 transition-all duration-200"
              >
                <ShoppingBag size={15} />
                进入商城
              </Link>

              {/* 移动端菜单按钮 */}
              <button
                className="lg:hidden flex items-center justify-center h-9 w-9 rounded-xl text-[#a0aec0] hover:text-[#f0f4ff] hover:bg-white/5 transition-all duration-200"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="菜单"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 移动端抽屉菜单 */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* 遮罩 */}
        <div
          className="absolute inset-0 bg-[#080b12]/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* 抽屉 */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-[#0d1117] border-l border-white/5 shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <span className="text-gradient-gold font-bold text-lg">顶卡科技</span>
            <button
              className="text-[#6b7280] hover:text-[#f0f4ff] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <nav className="p-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-[#a0aec0] hover:text-[#f0f4ff] hover:bg-white/5 transition-all duration-200"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f6ae54]/20 text-[#f6ae54] border border-[#f6ae54]/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] px-5 py-3 text-sm font-semibold text-[#080b12]"
              >
                <ShoppingBag size={15} />
                进入商城
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
