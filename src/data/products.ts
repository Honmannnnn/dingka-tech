export interface CardProduct {
  id: string
  name: string
  jpName?: string
  series: string
  seriesName: string
  cardNumber: string
  rarity: 'SSR' | 'UR' | 'HR' | 'SR' | 'AR' | 'SAR'
  price: number
  originalPrice?: number
  stock: number
  category: 'single' | 'booster_box' | 'deck' | 'accessory'
  categoryName: string
  type: 'fire' | 'water' | 'electric' | 'grass' | 'psychic' | 'dragon' | 'colorless'
  hp?: number
  illustrator?: string
  releaseDate: string
  tag?: string
  hot?: boolean
  description: string
  skills?: {
    name: string
    cost: string[]
    damage?: string
    effect?: string
  }[]
  weakness?: string
  retreat?: number
  gradient: string
  glowColor: string
}

export const PRODUCTS: CardProduct[] = [
  {
    id: 'sv5k-001',
    name: '恶属性 喷火龙ex',
    jpName: 'リザードンex',
    series: 'sv5k',
    seriesName: '黑焰支配者',
    cardNumber: '134/108',
    rarity: 'SAR',
    price: 1280,
    originalPrice: 1580,
    stock: 8,
    category: 'single',
    categoryName: '单卡精选',
    type: 'fire',
    hp: 330,
    illustrator: 'AKIRA EGAWA',
    releaseDate: '2024-03-01',
    tag: '镇店之宝',
    hot: true,
    description: '黑暗太晶属性喷火龙，红莲与暗影交织的极品艺术卡面，全品相已过预审。',
    skills: [
      {
        name: '爆裂之翼',
        cost: ['fire', 'fire'],
        damage: '180',
        effect: '弃置该宝可梦身上的一个能量。'
      },
      {
        name: '真红炼狱',
        cost: ['fire', 'fire', 'colorless'],
        damage: '330',
        effect: '对手每获得一张奖赏卡，此招式增加30点伤害。'
      }
    ],
    weakness: 'grass ×2',
    retreat: 2,
    gradient: 'from-[#ff5722] via-[#e64a19] to-[#bf360c]',
    glowColor: 'rgba(255, 87, 34, 0.4)'
  },
  {
    id: 'sv4a-002',
    name: '烈空坐ex (特别艺术)',
    jpName: 'レックウザex',
    series: 'sv4a',
    seriesName: '闪色宝藏',
    cardNumber: '348/190',
    rarity: 'UR',
    price: 3200,
    originalPrice: 3600,
    stock: 3,
    category: 'single',
    categoryName: '单卡精选',
    type: 'dragon',
    hp: 280,
    illustrator: 'PLANETA Mochizuki',
    releaseDate: '2024-01-15',
    tag: '殿堂收藏',
    hot: true,
    description: '闪光烈空坐撕裂苍穹的金色立体浮雕UR，高评级潜力卡。',
    skills: [
      {
        name: '画龙点睛',
        cost: ['fire', 'electric', 'colorless'],
        damage: '280',
        effect: '丢弃该宝可梦身上的所有能量。'
      }
    ],
    weakness: 'none',
    retreat: 1,
    gradient: 'from-[#ffd700] via-[#ffa000] to-[#ff6f00]',
    glowColor: 'rgba(255, 215, 0, 0.4)'
  },
  {
    id: 'sv3pt5-003',
    name: '皮卡丘 经典大师版',
    jpName: 'ピカチュウ',
    series: 'sv3pt5',
    seriesName: '经典151复刻',
    cardNumber: '025/165',
    rarity: 'AR',
    price: 680,
    originalPrice: 850,
    stock: 15,
    category: 'single',
    categoryName: '单卡精选',
    type: 'electric',
    hp: 70,
    illustrator: 'Teeziro',
    releaseDate: '2023-11-20',
    tag: '人气爆款',
    hot: true,
    description: '温馨画风的草地皮卡丘AR，高人气治愈系插画，收藏家必入。',
    skills: [
      {
        name: '充电闪电',
        cost: ['electric'],
        damage: '30',
        effect: '从弃牌区将一张雷能量附于此宝可梦。'
      }
    ],
    weakness: 'fighting ×2',
    retreat: 1,
    gradient: 'from-[#ffeb3b] via-[#fbc02d] to-[#f57f17]',
    glowColor: 'rgba(255, 235, 59, 0.4)'
  },
  {
    id: 'sv5k-box',
    name: '【整盒】朱/紫「黑焰支配者」扩充包',
    series: 'sv5k',
    seriesName: '黑焰支配者',
    cardNumber: 'BOX-30包入',
    rarity: 'SSR',
    price: 499,
    originalPrice: 580,
    stock: 45,
    category: 'booster_box',
    categoryName: '扩充包整盒',
    type: 'fire',
    releaseDate: '2024-03-01',
    tag: '现货包邮',
    hot: true,
    description: '官方原装塑封未拆盒，每盒保底包含1张SR及以上稀有卡牌，支持防伪溯源。',
    gradient: 'from-[#f6ae54] to-[#d4881a]',
    glowColor: 'rgba(246, 174, 84, 0.3)'
  },
  {
    id: 'sv4a-004',
    name: '沙奈朵ex (超能力特异)',
    jpName: 'サーナイトex',
    series: 'sv4a',
    seriesName: '闪色宝藏',
    cardNumber: '328/190',
    rarity: 'SAR',
    price: 1850,
    originalPrice: 2100,
    stock: 5,
    category: 'single',
    categoryName: '单卡精选',
    type: 'psychic',
    hp: 310,
    illustrator: 'Jiro Sasumo',
    releaseDate: '2024-01-15',
    tag: '竞技核心',
    hot: false,
    description: '超能力能量流转核心卡牌，赛场统治级强度与唯美插画的完美结合。',
    skills: [
      {
        name: '超能拥抱',
        cost: ['psychic', 'colorless'],
        damage: '190',
        effect: '每回合一次，可将弃牌区超能能量附于己方宝可梦。'
      }
    ],
    weakness: 'dark ×2',
    retreat: 2,
    gradient: 'from-[#ab47bc] via-[#8e24aa] to-[#4a148c]',
    glowColor: 'rgba(171, 71, 188, 0.4)'
  },
  {
    id: 'sv-acc-01',
    name: '顶卡定制 碳纤维磁吸卡砖 (UV99%防护)',
    series: 'DK-ACC',
    seriesName: '周边收纳',
    cardNumber: 'DK-35PT',
    rarity: 'SR',
    price: 88,
    originalPrice: 120,
    stock: 200,
    category: 'accessory',
    categoryName: '卡牌周边',
    type: 'colorless',
    releaseDate: '2024-02-01',
    tag: '顶级保护',
    hot: false,
    description: '航空级亚克力材质，带99%抗紫外线镀膜，强力四角磁吸，保真透光率99.6%。',
    gradient: 'from-[#607d8b] to-[#263238]',
    glowColor: 'rgba(96, 125, 139, 0.3)'
  }
]
