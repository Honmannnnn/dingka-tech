# 顶卡科技 · 部署与日常运维巡检手册 (Ops Guide)

> 本文档提供公司官网与微信小程序的标准化部署脚本、Nginx 反向代理配置与生产运维排障 SOP。

---

## 一、官网 Docker 容器化部署

### 1. 多阶段构建 Dockerfile

```dockerfile
# 阶段 1：依赖安装
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 阶段 2：生产构建
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 阶段 3：运行时镜像
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### 2. Docker Compose 一键启动编排

```yaml
version: '3.8'

services:
  web:
    build: .
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://dingka_admin:secret@postgres:5432/dingka_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    restart: always
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=dingka_db
      - POSTGRES_USER=dingka_admin
      - POSTGRES_PASSWORD=secret

  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --appendonly yes
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

---

## 二、生产环境 Nginx 反向代理与 SSL 最佳实践配置

```nginx
upstream dingka_web_upstream {
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    keepalive 64;
}

server {
    listen 80;
    server_name dingka.tech www.dingka.tech;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name dingka.tech www.dingka.tech;

    # SSL 证书安全加固配置
    ssl_certificate /etc/nginx/ssl/dingka.tech.crt;
    ssl_certificate_key /etc/nginx/ssl/dingka.tech.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # 安全响应头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # 静态资源缓存策略
    location /_next/static/ {
        alias /var/www/dingka/.next/static/;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 动态反向代理
    location / {
        proxy_pass http://dingka_web_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }
}
```

---

## 三、微信小程序发布与日常运维流程

### 1. 微信小程序多环境发布规范
- **开发版 (Dev)**：连接本地 Mock 服务或内网开发环境 API。
- **体验版 (Staging)**：连接预发布环境，供产品经理、测试团队与业务方内测验收。
- **线上正式版 (Release)**：通过微信开放平台开发者工具 CLI 上传代码，进行灰度发布（先放量 10%、30%、50%，观察崩溃率无异常后全量发布）。

### 2. 日常运维排障 SOP

| 故障现象 | 潜在诱因 | 应急处置步骤 |
|---------|---------|-------------|
| **卡牌页面白屏/打不开** | Next.js 进程 OOM 或 Nginx 回源失败 | 1. 执行 `docker logs --tail 200 web` 查看报错日志<br>2. 检查 Nginx 502/504 错误日志<br>3. 重启容器实例并检查内存使用率 |
| **抢购卡盒提示网络超时** | Redis 连接池爆满或消息队列积压 | 1. 查看 Redis `info clients` 连接数<br>2. 临时调大后端工作线程数与连接池阈值<br>3. 开启降级熔断策略 |
| **微信小程序登录提示鉴权失败** | 微信 AppSecret 过期或网络证书异常 | 1. 检查微信开放平台 AppID 与 AppSecret 配置<br>2. 测试服务器出网访问 `api.weixin.qq.com` 延迟 |
