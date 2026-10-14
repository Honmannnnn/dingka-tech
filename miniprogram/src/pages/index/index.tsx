import React, { useState } from 'react'
import { View, Text, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useUserStore } from '../../store/user'
import './index.scss'

const banners = [
  { id: 1, title: '朱紫「黑焰支配者」火热开售', subtitle: '恶属性太晶喷火龙震撼降临', bg: '#ff5722' },
  { id: 2, title: '顶卡权威代送评级通道开启', subtitle: '直通 PSA/BGS，限时特惠', bg: '#4fc3f7' },
  { id: 3, title: '经典151复刻现货专场', subtitle: '大师球闪卡限量发售', bg: '#f6ae54' }
]

const quickNavs = [
  { icon: '🔥', name: '单卡爆款', path: '/pages/shop/index?category=single' },
  { icon: '📦', name: '原装整盒', path: '/pages/shop/index?category=booster_box' },
  { icon: '💎', name: '高分藏品', path: '/pages/shop/index?rarity=SAR' },
  { icon: '🛡️', name: '评级鉴定', path: '/pages/about/index' }
]

const mockHotCards = [
  { id: 'sv5k-001', name: '恶属性 喷火龙ex', rarity: 'SAR', price: 1280, icon: '🔥', stock: 8 },
  { id: 'sv4a-002', name: '烈空坐ex 特别艺术', rarity: 'UR', price: 3200, icon: '🐲', stock: 3 },
  { id: 'sv3pt5-003', name: '皮卡丘 经典大师版', rarity: 'AR', price: 680, icon: '⚡', stock: 15 },
  { id: 'sv4a-004', name: '沙奈朵ex 超能异画', rarity: 'SAR', price: 1850, icon: '🔮', stock: 5 }
]

export default function IndexPage() {
  const { addToCart } = useUserStore()

  const handleCardClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${id}` })
  }

  return (
    <View className="page-home">
      {/* 顶部品牌状态 */}
      <View className="header-bar">
        <View className="brand-logo">
          <Text className="logo-text">顶</Text>
        </View>
        <View className="brand-info">
          <Text className="brand-title">顶卡科技</Text>
          <Text className="brand-sub">官方正品集换式卡牌</Text>
        </View>
      </View>

      {/* 轮播图广告 */}
      <Swiper className="banner-swiper" circular autoplay interval={3500} indicatorDots>
        {banners.map((b) => (
          <SwiperItem key={b.id}>
            <View className="banner-card" style={{ background: `linear-gradient(135deg, ${b.bg} 0%, #0d1117 100%)` }}>
              <Text className="banner-tag">OFFICIAL</Text>
              <Text className="banner-title">{b.title}</Text>
              <Text className="banner-subtitle">{b.subtitle}</Text>
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      {/* 金刚区四大入口 */}
      <View className="quick-grid">
        {quickNavs.map((nav, i) => (
          <View
            key={i}
            className="quick-item"
            onClick={() => Taro.switchTab({ url: '/pages/shop/index' })}
          >
            <View className="quick-icon">{nav.icon}</View>
            <Text className="quick-label">{nav.name}</Text>
          </View>
        ))}
      </View>

      {/* 本周人气热榜 */}
      <View className="section-container">
        <View className="section-head">
          <Text className="section-title">今日热门卡牌</Text>
          <Text className="section-more" onClick={() => Taro.switchTab({ url: '/pages/shop/index' })}>
            查看全部 &gt;
          </Text>
        </View>

        <View className="card-flow">
          {mockHotCards.map((card) => (
            <View key={card.id} className="card-cell" onClick={() => handleCardClick(card.id)}>
              <View className="card-visual">
                <Text className="card-emoji">{card.icon}</Text>
                <Text className="card-rarity">{card.rarity}</Text>
              </View>
              <View className="card-detail">
                <Text className="card-name">{card.name}</Text>
                <View className="price-row">
                  <Text className="card-price">¥{card.price}</Text>
                  <View
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart({
                        id: card.id,
                        name: card.name,
                        price: card.price,
                        rarity: card.rarity,
                        seriesName: '朱/紫最新弹'
                      })
                      Taro.showToast({ title: '已加购', icon: 'success', duration: 1500 })
                    }}
                  >
                    +
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
