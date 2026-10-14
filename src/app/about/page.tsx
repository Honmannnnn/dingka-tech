import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { 
  ShieldCheck, 
  Cpu, 
  Award, 
  Globe2, 
  TrendingUp, 
  Users2, 
  Sparkles, 
  ArrowRight,
  Layers,
  CheckCircle2
} from 'lucide-react'

export const metadata = {
  title: '关于顶卡科技 | 专注集换式卡牌科技生态',
  description: '顶卡科技（DingKa Technology）以科技赋能集换式卡牌，打造集销售、代理、AI辅助真伪鉴定与全球送评于一体的现代卡牌生态综合服务平台。'
}

const milestones = [
  { year: '2019', title: '创立启航', desc: '顶卡科技核心团队于深圳成立，专注于TCG卡牌进出口贸易与供应链搭建。' },
  { year: '2021', title: '代理网络扩张', desc: '签约全国超200家卡牌实体店及潮玩经销商，建立华南、华东双中心保税仓储。' },
  { year: '2023', title: '数智化生态升级', desc: '自研集换式卡牌全生命周期溯源系统，推出一站式自营卡牌商城与评级代送通道。' },
  { year: '2024', title: '全球化与跨端APP', desc: '布局全平台跨端体验（Next.js官网 + 微信原生小程序 + 双端APP），服务突破10万+卡友。' }
]

const advantages = [
  {
    icon: ShieldCheck,
    title: '100% 正品溯源机制',
    desc: '每张高稀有度单卡入库均经过四重无损光谱检测与高清微距复核，假一赔十，全链路电子防伪封签。',
    color: '#f6ae54'
  },
  {
    icon: Cpu,
    title: '现代全栈技术驱动',
    desc: '采用 Next.js 15 + RSC 孤岛架构与高并发云原生架构，保障大促抢购卡盒毫秒级高可用与顺滑体验。',
    color: '#4fc3f7'
  },
  {
    icon: Globe2,
    title: '全球直通与权威评级',
    desc: '直连国际权威机构 PSA、BGS 与 CGC，为广大藏家提供专业快捷的代送评级与保价回程物流。',
    color: '#b39ddb'
  },
  {
    icon: Users2,
    title: '全国代理商赋能计划',
    desc: '为实体合作商户提供专有批发货源、现货调配、赛事支持与线上私域引流工具包，实现共赢生态。',
    color: '#a5d6a7'
  }
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f4ff]">
      <Header />

      {/* 顶部主视觉 */}
      <section className="relative pt-36 pb-20 border-b border-white/5 bg-gradient-to-b from-[#0d1117] via-[#080b12] to-[#080b12] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#f6ae54]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6ae54]/20 bg-[#f6ae54]/10 px-4 py-1 text-xs font-semibold text-[#f6ae54] mb-6">
            <Sparkles size={13} />
            关于顶卡科技 · 让每一张卡牌都有价值
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            以科技重塑 <span className="text-gradient-gold">集换式卡牌生态</span>
          </h1>
          <p className="text-[#a0aec0] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            顶卡科技（DingKa Tech）是国内领先的集换式卡牌（TCG）综合科技服务平台。
            我们融合现代Web与移动端前沿技术，打通从“原厂直供、权威鉴真、智能图鉴、全渠道销售到代送评级”的完整闭环，
            为数千万卡牌爱好者与合作伙伴创造值得信赖的潮玩数字体验。
          </p>
        </div>
      </section>

      {/* 核心实力指标 */}
      <section className="py-16 border-b border-white/5 bg-[#0d1117]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '5,000,000+', label: '累计正品流通卡牌' },
              { num: '100,000+', label: '活跃卡牌藏家与玩家' },
              { num: '300+', label: '签约代理合作门店' },
              { num: '99.98%', label: '真伪鉴定准确率' }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-3xl sm:text-4xl font-black text-gradient-gold mb-2">{stat.num}</div>
                <div className="text-xs text-[#a0aec0]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 核心竞争优势 */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              四大核心优势 铸就品质护城河
            </h2>
            <p className="text-sm text-[#6b7280]">
              坚持自营品控、坚持技术赋能，用专业态度服务每一位热爱集换式卡牌的朋友
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((adv, i) => {
              const Icon = adv.icon
              return (
                <div
                  key={i}
                  className="rounded-3xl bg-[#0d1117] border border-white/5 p-8 hover:border-white/20 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: `${adv.color}15`, border: `1px solid ${adv.color}30` }}
                    >
                      <Icon size={28} style={{ color: adv.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{adv.title}</h3>
                      <p className="text-sm text-[#a0aec0] leading-relaxed">{adv.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 发展里程碑 */}
      <section className="py-20 border-t border-white/5 bg-[#0d1117]/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-16">
            顶卡科技 <span className="text-gradient-gold">发展历程</span>
          </h2>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-white/10 hidden sm:block">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div key={item.year} className={`relative flex items-center justify-between ${isEven ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5/12 p-6 rounded-2xl bg-[#161b27] border border-white/5 shadow-xl">
                    <span className="text-xs font-black text-[#f6ae54] px-2 py-0.5 rounded bg-[#f6ae54]/10 mb-2 inline-block">
                      {item.year}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-[#a0aec0] leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#f6ae54] border-4 border-[#080b12] shadow" />
                  <div className="w-5/12" />
                </div>
              )
            })}
          </div>

          {/* 移动端垂直列表 */}
          <div className="sm:hidden space-y-6">
            {milestones.map((item) => (
              <div key={item.year} className="p-5 rounded-2xl bg-[#161b27] border border-white/5">
                <span className="text-xs font-black text-[#f6ae54] px-2 py-0.5 rounded bg-[#f6ae54]/10 mb-2 inline-block">
                  {item.year}
                </span>
                <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-[#a0aec0] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 合作致意 */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-4">期待与您携手，共拓卡牌新视界</h2>
          <p className="text-sm text-[#a0aec0] mb-8">
            无论您是卡牌品牌方、实体渠道商、专业藏家还是对顶卡科技技术团队感兴趣的伙伴，我们随时欢迎您的垂询。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#f6ae54] to-[#d4881a] text-[#080b12] font-black text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              浏览卡牌商城 <ArrowRight size={16} />
            </Link>
            <Link
              href="/catalog"
              className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors"
            >
              查阅官方图鉴
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
