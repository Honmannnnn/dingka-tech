import { create } from 'zustand'

export interface UserProfile {
  id: string
  nickname: string
  avatarUrl: string
  phone?: string
  isVip: boolean
  points: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  rarity: string
  seriesName: string
}

interface UserState {
  isLoggedIn: boolean
  token: string | null
  profile: UserProfile | null
  cart: CartItem[]
  loginWithWeChat: () => Promise<void>
  logout: () => void
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  token: null,
  profile: null,
  cart: [],

  loginWithWeChat: async () => {
    // 微信小程序真实登录流程 (wx.login -> code -> API -> openid/token)
    // 演示状态下生成可演示的 VIP 用户数据
    const mockProfile: UserProfile = {
      id: 'dk_user_8888',
      nickname: '顶卡尊享会员',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      phone: '138****8888',
      isVip: true,
      points: 1280
    }
    set({
      isLoggedIn: true,
      token: 'jwt_token_dingka_mock_session',
      profile: mockProfile
    })
  },

  logout: () => {
    set({ isLoggedIn: false, token: null, profile: null })
  },

  addToCart: (item) => {
    set((state) => {
      const existing = state.cart.find((c) => c.id === item.id)
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
          )
        }
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] }
    })
  },

  removeFromCart: (id) => {
    set((state) => ({ cart: state.cart.filter((c) => c.id !== id) }))
  },

  clearCart: () => set({ cart: [] })
}))
