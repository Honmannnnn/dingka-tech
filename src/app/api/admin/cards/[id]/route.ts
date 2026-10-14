import { NextResponse } from 'next/server'
import { updateCard, getCardById } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const card = await getCardById(id)

  if (!card) {
    return NextResponse.json({ code: 404, success: false, message: '未找到该卡牌' }, { status: 404 })
  }
  return NextResponse.json({ code: 200, success: true, data: card })
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updated = await updateCard(id, body)

    if (!updated) {
      return NextResponse.json(
        { code: 404, success: false, message: '未找到指定卡牌' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      code: 200,
      success: true,
      data: updated,
      message: '更新成功'
    })
  } catch (error: any) {
    return NextResponse.json(
      { code: 500, success: false, message: error.message || '更新失败' },
      { status: 500 }
    )
  }
}
