import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-[#080b12]">
        <div className="text-center">
          <div className="text-8xl mb-6">🃏</div>
          <h1 className="text-6xl font-black text-gradient-gold mb-4">404</h1>
          <p className="text-[#a0aec0] text-lg mb-8">这张卡不在我们的图鉴里...</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] px-8 py-3 font-bold text-[#080b12] hover:scale-105 transition-transform"
          >
            返回首页
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
