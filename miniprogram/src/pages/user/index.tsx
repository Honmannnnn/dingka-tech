import React from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useUserStore } from '../../store/user'
import './index.scss'

export default function UserPage() {
  const { isLoggedIn, profile, cart, loginWithWeChat, logout } = useUserStore()

  const orderMenus = [
    { icon: '💳', label: '待付款', count: 0 },
    { icon: '📦', label: '待发货', count: 1 },
    { icon: '🚚', label: '待收货', count: 2 },
    { icon: '🛡️', label: '鉴定中', count: 1 }
  ]

  const serviceMenus = [
    { title: 'PSA / BGS 代送评级进度', desc: '全程顺丰保价可追踪' },
    { title: '实体合作商户加盟通道', desc: '全国现货配额支持' },
    { title: '官方在线客服与售后咨询', desc: '服务时间 9:00 - 22:00' },
    { title: '关于顶卡科技官方资质', desc: '100% 正品溯源保障' }
  ]

  return (
    <View className="page-user">
      {/* 顶部个人卡片 */}
      <View className="profile-card">
        {isLoggedIn && profile ? (
          <View className="user-logged">
            <Image className="avatar" src={profile.avatarUrl} mode="aspectFill" />
            <View className="info">
              <View className="name-row">
                <Text className="nickname">{profile.nickname}</Text>
                {profile.isVip && <Text className="vip-tag">VIP 尊享</Text>}
              </View>
              <Text className="phone">{profile.phone}</Text>
              <Text className="points">积分点数: {profile.points} PT</Text>
            </View>
          </View>
        ) : (
          <View className="user-guest">
            <View className="avatar-placeholder">
              <Text className="avatar-emoji">👤</Text>
            </View>
            <View className="guest-info">
              <Text className="guest-title">登录解锁卡牌会员特权</Text>
              <Text className="guest-sub">享首单满减、稀有卡优先抽选</Text>
              <Button
                className="wx-login-btn"
                onClick={async () => {
                  Taro.showLoading({ title: '登录中...' })
                  await loginWithWeChat()
                  Taro.hideLoading()
                  Taro.showToast({ title: '登录成功', icon: 'success' })
                }}
              >
                微信一键快捷登录
              </Button>
            </View>
          </View>
        )}
      </View>

      {/* 订单中心快捷区 */}
      <View className="card-box">
        <View className="card-box-header">
          <Text className="title">我的订单与卡牌资产</Text>
          <Text className="more">全部订单 &gt;</Text>
        </View>
        <View className="order-grid">
          {orderMenus.map((m, i) => (
            <View key={i} className="order-item">
              <View className="icon-wrap">
                <Text className="order-icon">{m.icon}</Text>
                {m.count > 0 && <Text className="badge">{m.count}</Text>}
              </View>
              <Text className="order-label">{m.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 购物车实时看板 */}
      <View className="card-box">
        <View className="card-box-header">
          <Text className="title">当前购物车 ({cart.length})</Text>
          {cart.length > 0 && (
            <Text
              className="more"
              onClick={() => {
                const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
                Taro.showModal({
                  title: '准备微信支付',
                  content: `共 ${cart.length} 款卡牌，总计 ¥${total}，是否拉起微信原生收银台？`,
                  confirmColor: '#f6ae54'
                })
              }}
            >
              去结算 &gt;
            </Text>
          )}
        </View>
        {cart.length === 0 ? (
          <View className="empty-cart">
            <Text className="empty-text">购物车空空如也，去商城选购极品卡牌吧</Text>
          </View>
        ) : (
          <View className="cart-list">
            {cart.map((c) => (
              <View key={c.id} className="cart-item">
                <Text className="cart-name truncate">{c.name}</Text>
                <Text className="cart-rarity">{c.rarity}</Text>
                <Text className="cart-price">¥{c.price} × {c.quantity}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* 服务中心列表 */}
      <View className="card-box">
        <View className="card-box-header">
          <Text className="title">顶卡生态服务</Text>
        </View>
        <View className="service-list">
          {serviceMenus.map((s, idx) => (
            <View key={idx} className="service-item">
              <View className="service-info">
                <Text className="service-title">{s.title}</Text>
                <Text className="service-desc">{s.desc}</Text>
              </View>
              <Text className="arrow">&gt;</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 退出登录 */}
      {isLoggedIn && (
        <View className="logout-box">
          <Button className="logout-btn" onClick={logout}>
            退出当前账号
          </Button>
        </View>
      )}
    </View>
  )
}
