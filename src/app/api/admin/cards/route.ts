import { NextResponse } from 'next/server'
import { getCards, createCard, getDashboardStats } from '@/lib/db'

export async function GET() {
  const cards = await getCards()
  const stats = await getDashboardStats()

  return NextResponse.json({
    code: 200,
    success: true,
    data: {
      cards,
      stats
    }
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.price || body.stock === undefined) {
      return NextResponse.json(
        { code: 400, success: false, message: '请完整填写卡牌名称、价格与初始库存' },
        { status: 400 }
      )
    }

    const newCard = await createCard({
      id: body.id || `dk-${Date.now()}`,
      name: body.name,
      jpName: body.jpName,
      series: body.series || 'CUSTOM',
      seriesName: body.seriesName || '自主上架',
      cardNumber: body.cardNumber || `NO.${Math.floor(Math.random() * 900 + 100)}`,
      rarity: body.rarity || 'SSR',
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      stock: Number(body.stock),
      category: body.category || 'single',
      categoryName: body.categoryName || '单卡精选',
      type: body.type || 'fire',
      hp: body.hp ? Number(body.hp) : 280,
      illustrator: body.illustrator || '顶卡特约画师',
      releaseDate: body.releaseDate || new Date().toISOString().split('T')[0],
      tag: body.tag || '新上架',
      hot: Boolean(body.hot),
      description: body.description || '顶卡精选藏品，已通过专业全品相预审。',
      gradient: body.gradient || 'from-[#f6ae54] to-[#d4881a]',
      glowColor: body.glowColor || 'rgba(246, 174, 84, 0.4)',
      published: true
    })

    return NextResponse.json({
      code: 200,
      success: true,
      data: newCard,
      message: '新卡牌已成功入库并发布上架'
    })
  } catch (error: any) {
    return NextResponse.json(
      { code: 500, success: false, message: error.message || '入库失败' },
      { status: 500 }
    )
  }
}
