export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/shop/index',
    'pages/detail/index',
    'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#080b12',
    navigationBarTitleText: '顶卡科技',
    navigationBarTextStyle: 'white',
    backgroundColor: '#080b12'
  },
  tabBar: {
    color: '#6b7280',
    selectedColor: '#f6ae54',
    backgroundColor: '#0d1117',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tab-home.png',
        selectedIconPath: 'assets/tab-home-active.png'
      },
      {
        pagePath: 'pages/shop/index',
        text: '商城',
        iconPath: 'assets/tab-shop.png',
        selectedIconPath: 'assets/tab-shop-active.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'assets/tab-user.png',
        selectedIconPath: 'assets/tab-user-active.png'
      }
    ]
  }
})
