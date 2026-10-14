import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '顶卡科技 | 专业集换式卡牌销售与代理',
    template: '%s | 顶卡科技',
  },
  description: '顶卡科技专注于宝可梦集换式卡牌销售、代理与鉴定服务。汇聚顶级卡品，为每一位卡牌玩家提供最专业的服务。',
  keywords: ['宝可梦卡牌', '集换式卡牌', 'TCG', '卡牌代理', '顶卡科技', 'Pokemon', '宝可梦官网'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '顶卡科技',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased font-sans">{children}</body>
    </html>
  )
}
