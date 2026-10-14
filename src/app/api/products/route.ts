import { NextResponse } from 'next/server'
import { getCards } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const rarity = searchParams.get('rarity')
  const type = searchParams.get('type')
  const search = searchParams.get('search')

  let cards = await getCards({ onlyPublished: true })

  if (category && category !== 'all') {
    cards = cards.filter((c) => c.category === category)
  }
  if (rarity && rarity !== '全部') {
    cards = cards.filter((c) => c.rarity === rarity)
  }
  if (type && type !== 'all') {
    cards = cards.filter((c) => c.type === type)
  }
  if (search) {
    const q = search.toLowerCase()
    cards = cards.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.seriesName.toLowerCase().includes(q) ||
        c.cardNumber.toLowerCase().includes(q)
    )
  }

  return NextResponse.json({
    code: 200,
    success: true,
    data: cards,
    total: cards.length,
    timestamp: new Date().toISOString()
  })
}
