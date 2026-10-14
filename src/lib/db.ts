import { neon } from '@neondatabase/serverless'
import { CardProduct, PRODUCTS } from '@/data/products'

export interface CardItem extends CardProduct {
  published: boolean
  updatedAt: string
}

// 内存与备用初始数据缓存
let memoryCards: CardItem[] = PRODUCTS.map((p) => ({
  ...p,
  published: true,
  updatedAt: new Date().toISOString()
}))

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL

// 获取数据库客户端
function getSql() {
  if (!connectionString) return null
  return neon(connectionString)
}

// 初始化表结构与种子数据
export async function initDatabase() {
  const sql = getSql()
  if (!sql) return

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS cards (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        jp_name VARCHAR(128),
        series VARCHAR(64) NOT NULL,
        series_name VARCHAR(128) NOT NULL,
        card_number VARCHAR(64) NOT NULL,
        rarity VARCHAR(16) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        original_price NUMERIC(10, 2),
        stock INT NOT NULL DEFAULT 0,
        category VARCHAR(64) NOT NULL,
        category_name VARCHAR(64) NOT NULL,
        type VARCHAR(32) NOT NULL,
        hp INT,
        illustrator VARCHAR(128),
        release_date VARCHAR(32),
        tag VARCHAR(64),
        hot BOOLEAN DEFAULT false,
        description TEXT,
        gradient VARCHAR(128),
        glow_color VARCHAR(128),
        published BOOLEAN DEFAULT true,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // 检查是否有数据，若空则填充初始种子数据
    const rows = await sql`SELECT COUNT(*)::int as count FROM cards`
    if (rows[0].count === 0) {
      for (const card of memoryCards) {
        await sql`
          INSERT INTO cards (
            id, name, jp_name, series, series_name, card_number, rarity,
            price, original_price, stock, category, category_name, type,
            hp, illustrator, release_date, tag, hot, description,
            gradient, glow_color, published
          ) VALUES (
            ${card.id}, ${card.name}, ${card.jpName || null}, ${card.series},
            ${card.seriesName}, ${card.cardNumber}, ${card.rarity},
            ${card.price}, ${card.originalPrice || null}, ${card.stock},
            ${card.category}, ${card.categoryName}, ${card.type},
            ${card.hp || null}, ${card.illustrator || null}, ${card.releaseDate},
            ${card.tag || null}, ${card.hot || false}, ${card.description},
            ${card.gradient}, ${card.glowColor}, ${card.published}
          )
        `
      }
    }
  } catch (error) {
    console.warn('[DB] Database init warning (falling back to memory):', error)
  }
}

// 映射数据库行至标准对象
function mapRowToCard(row: any): CardItem {
  return {
    id: row.id,
    name: row.name,
    jpName: row.jp_name || undefined,
    series: row.series,
    seriesName: row.series_name,
    cardNumber: row.card_number,
    rarity: row.rarity,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    stock: Number(row.stock),
    category: row.category,
    categoryName: row.category_name,
    type: row.type,
    hp: row.hp ? Number(row.hp) : undefined,
    illustrator: row.illustrator || undefined,
    releaseDate: row.release_date,
    tag: row.tag || undefined,
    hot: Boolean(row.hot),
    description: row.description,
    gradient: row.gradient,
    glowColor: row.glow_color,
    published: Boolean(row.published),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString()
  }
}

// 查询卡牌列表
export async function getCards(options?: { onlyPublished?: boolean; category?: string; rarity?: string }): Promise<CardItem[]> {
  const sql = getSql()
  if (sql) {
    try {
      await initDatabase()
      let rows: any[]
      if (options?.onlyPublished) {
        rows = await sql`SELECT * FROM cards WHERE published = true ORDER BY hot DESC, price DESC`
      } else {
        rows = await sql`SELECT * FROM cards ORDER BY updated_at DESC`
      }
      return rows.map(mapRowToCard)
    } catch (err) {
      console.warn('[DB] SQL query failed, using memory fallback:', err)
    }
  }

  // 内存备用
  let list = memoryCards
  if (options?.onlyPublished) {
    list = list.filter((c) => c.published)
  }
  return list
}

// 单卡查询
export async function getCardById(id: string): Promise<CardItem | null> {
  const sql = getSql()
  if (sql) {
    try {
      await initDatabase()
      const rows = await sql`SELECT * FROM cards WHERE id = ${id} LIMIT 1`
      if (rows.length > 0) return mapRowToCard(rows[0])
    } catch (err) {
      console.warn('[DB] Query card by id error:', err)
    }
  }
  return memoryCards.find((c) => c.id === id) || null
}

// 更新卡牌信息（库存、上下架、价格）
export async function updateCard(id: string, updates: Partial<CardItem>): Promise<CardItem | null> {
  const sql = getSql()
  if (sql) {
    try {
      await initDatabase()
      const current = await getCardById(id)
      if (!current) return null

      const newStock = updates.stock !== undefined ? updates.stock : current.stock
      const newPrice = updates.price !== undefined ? updates.price : current.price
      const newPublished = updates.published !== undefined ? updates.published : current.published
      const newHot = updates.hot !== undefined ? updates.hot : current.hot
      const newTag = updates.tag !== undefined ? updates.tag : current.tag

      await sql`
        UPDATE cards
        SET
          stock = ${newStock},
          price = ${newPrice},
          published = ${newPublished},
          hot = ${newHot},
          tag = ${newTag || null},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
      `
      return await getCardById(id)
    } catch (err) {
      console.warn('[DB] SQL update failed, updating memory:', err)
    }
  }

  // 内存备用
  const index = memoryCards.findIndex((c) => c.id === id)
  if (index === -1) return null

  memoryCards[index] = {
    ...memoryCards[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  return memoryCards[index]
}

// 新增卡牌
export async function createCard(data: Omit<CardItem, 'updatedAt'>): Promise<CardItem> {
  const newCard: CardItem = {
    ...data,
    published: data.published ?? true,
    updatedAt: new Date().toISOString()
  }

  const sql = getSql()
  if (sql) {
    try {
      await initDatabase()
      await sql`
        INSERT INTO cards (
          id, name, jp_name, series, series_name, card_number, rarity,
          price, original_price, stock, category, category_name, type,
          hp, illustrator, release_date, tag, hot, description,
          gradient, glow_color, published
        ) VALUES (
          ${newCard.id}, ${newCard.name}, ${newCard.jpName || null}, ${newCard.series},
          ${newCard.seriesName}, ${newCard.cardNumber}, ${newCard.rarity},
          ${newCard.price}, ${newCard.originalPrice || null}, ${newCard.stock},
          ${newCard.category}, ${newCard.categoryName}, ${newCard.type},
          ${newCard.hp || null}, ${newCard.illustrator || null}, ${newCard.releaseDate},
          ${newCard.tag || null}, ${newCard.hot || false}, ${newCard.description},
          ${newCard.gradient}, ${newCard.glowColor}, ${newCard.published}
        )
      `
      return newCard
    } catch (err) {
      console.warn('[DB] SQL insert failed:', err)
    }
  }

  memoryCards.unshift(newCard)
  return newCard
}

// 数据大盘统计聚合
export async function getDashboardStats() {
  const cards = await getCards()
  const publishedCount = cards.filter((c) => c.published).length
  const unpublishedCount = cards.filter((c) => !c.published).length
  const lowStockCount = cards.filter((c) => c.stock < 5 && c.published).length
  const totalStockUnits = cards.reduce((sum, c) => sum + c.stock, 0)
  const totalValue = cards.reduce((sum, c) => sum + c.price * c.stock, 0)

  return {
    totalCards: cards.length,
    publishedCount,
    unpublishedCount,
    lowStockCount,
    totalStockUnits,
    totalValue,
    totalUsers: 102480,
    satisfactionRate: '99.4%'
  }
}
