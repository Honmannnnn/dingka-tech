import { NextResponse } from 'next/server'
import { getCardById } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const card = await getCardById(id)

  if (!card || !card.published) {
    return NextResponse.json(
      { code: 404, success: false, message: '卡牌不存在或已下架' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    code: 200,
    success: true,
    data: card
  })
}
