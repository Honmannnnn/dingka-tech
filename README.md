# 顶卡科技官网

专注集换式卡牌 · 一站式服务平台

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 15 | App Router + Turbopack |
| React | 19 | RSC (React Server Components) |
| TypeScript | 5.7 | 全量类型安全 |
| Tailwind CSS | v4 | CSS-first 配置，无 JS 配置文件 |
| next/font | 内置 | 本地托管 Noto Sans SC |
| framer-motion | 12 | 动画库（按需使用） |
| lucide-react | 0.525 | 图标库 |

## 项目结构

```
src/
├── app/
│   ├── layout.tsx        # 根布局（字体、SEO metadata）
│   ├── page.tsx          # 首页
│   ├── globals.css       # Tailwind v4 主题 + 全局样式
│   └── not-found.tsx     # 404 页面
└── components/
    ├── Header.tsx         # 顶部导航（响应式、sticky glassmorphism）
    ├── Footer.tsx         # 底部（链接、社交、订阅）
    ├── HeroSection.tsx    # 英雄区（动画背景、浮动卡牌）
    ├── FeaturedCards.tsx  # 精选卡牌展示
    ├── ServicesSection.tsx # 服务特性
    ├── NewsSection.tsx    # 最新资讯
    └── CTASection.tsx     # 行动召唤区
```

## 运行步骤

### 1. 安装 Node.js

前往 https://nodejs.org 下载 **LTS 版本（v22 或 v24）** 安装

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 http://localhost:3000

### 4. 生产构建

```bash
npm run build
npm start
```

## 设计特点

- 🌑 **暗色潮玩风格** - 深邃暗色背景 + 金色品牌色调
- ✨ **玻璃拟态效果** - Glassmorphism Header
- 🎴 **卡牌悬浮动效** - 浮动装饰卡牌 + 闪光效果
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🚀 **现代技术栈** - Next.js 15 + RSC + Tailwind v4
- 🔤 **本地字体托管** - 使用 next/font 避免 Google Fonts 外链
