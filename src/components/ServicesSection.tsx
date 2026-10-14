import { Shield, Truck, Award, HeartHandshake, Zap, Clock } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: '正品保证',
    desc: '所有卡牌均经过专业鉴定，100% 正品，假一赔十',
    color: '#f6ae54',
    glow: 'rgba(246,174,84,0.15)',
  },
  {
    icon: Zap,
    title: '极速出货',
    desc: '当日下单，24小时内发货，支持全国顺丰/京东快递',
    color: '#4fc3f7',
    glow: 'rgba(79,195,247,0.15)',
  },
  {
    icon: Award,
    title: '专业鉴定',
    desc: '资深卡牌鉴定师团队，提供 PSA/BGS 代送评级服务',
    color: '#b39ddb',
    glow: 'rgba(179,157,219,0.15)',
  },
  {
    icon: HeartHandshake,
    title: '代理合作',
    desc: '欢迎代理商洽谈合作，提供专属批发价与货源支持',
    color: '#f48fb1',
    glow: 'rgba(244,143,177,0.15)',
  },
  {
    icon: Clock,
    title: '7x24 客服',
    desc: '全天候在线客服，微信/企微/电话多渠道快速响应',
    color: '#a5d6a7',
    glow: 'rgba(165,214,167,0.15)',
  },
  {
    icon: Truck,
    title: '退换无忧',
    desc: '收到货 72 小时内可无理由退换，售后有保障',
    color: '#ffcc80',
    glow: 'rgba(255,204,128,0.15)',
  },
]

export default function ServicesSection() {
  return (
    <section className="relative py-24 bg-[#0d1117]">
      {/* 顶部分隔线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#f6ae54]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#f6ae54] tracking-widest uppercase mb-3">
            ◆ Services ◆
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f0f4ff] mb-4">
            为什么选择顶卡科技
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            六年深耕集换式卡牌行业，我们用专业和热情守护每一位玩家的卡牌梦
          </p>
        </div>

        {/* 特性网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, color, glow }) => (
            <div
              key={title}
              className="group relative rounded-2xl bg-[#080b12] border border-white/5 p-6 hover:border-white/10 transition-all duration-300 overflow-hidden"
            >
              {/* hover 光晕背景 */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${glow} 0%, transparent 70%)` }}
              />

              {/* 图标 */}
              <div
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              {/* 内容 */}
              <h3 className="relative text-base font-bold text-[#f0f4ff] mb-2 group-hover:text-white transition-colors">
                {title}
              </h3>
              <p className="relative text-sm text-[#6b7280] leading-relaxed group-hover:text-[#a0aec0] transition-colors">
                {desc}
              </p>

              {/* 右下装饰 */}
              <div
                className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ background: color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
