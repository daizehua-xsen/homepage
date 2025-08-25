# 部署指南

## 开发环境部署

### 前置要求
- Node.js 18+
- MongoDB 6.0+
- npm 或 yarn

### 快速开始

1. **克隆项目**
```bash
git clone <repository-url>
cd xiaosheng-ai-website
```

2. **运行设置脚本**
```bash
# Linux/macOS
./scripts/dev-setup.sh

# Windows
# 手动执行以下步骤
```

3. **手动设置（Windows）**
```bash
# 安装依赖
npm run install:all

# 配置环境变量
cp backend/.env.example backend/.env
# 编辑 backend/.env 文件

# 启动开发服务器
npm run dev
```

4. **访问应用**
- 前端: http://localhost:3000
- 后端: http://localhost:5000
- API文档: http://localhost:5000/health

## 生产环境部署

### 使用 Docker Compose（推荐）

1. **准备环境**
```bash
# 安装 Docker 和 Docker Compose
# 克隆项目代码
```

2. **配置环境变量**
```bash
# 编辑 docker-compose.yml 中的环境变量
# 特别注意修改以下配置：
# - JWT_SECRET: 生产环境密钥
# - MongoDB 密码
# - Redis 密码
```

3. **部署**
```bash
# 运行部署脚本
./scripts/deploy.sh

# 或手动执行
docker-compose up -d --build
```

4. **验证部署**
```bash
# 检查服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 健康检查
curl http://localhost:5000/health
```

### 手动部署

#### 后端部署

1. **构建后端**
```bash
cd backend
npm install
npm run build
```

2. **配置环境变量**
```bash
# 创建 .env 文件
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/xiaosheng-ai
JWT_SECRET=your-production-secret
```

3. **启动服务**
```bash
# 使用 PM2 管理进程
npm install -g pm2
pm2 start dist/server.js --name xiaosheng-backend

# 或直接启动
npm start
```

#### 前端部署

1. **构建前端**
```bash
cd frontend
npm install
npm run build
```

2. **部署到 Nginx**
```bash
# 复制构建文件到 Nginx 目录
cp -r dist/* /var/www/html/

# 配置 Nginx
# 参考 frontend/nginx.conf
```

## 环境变量配置

### 后端环境变量

```env
# 服务器配置
NODE_ENV=production
PORT=5000

# 数据库
MONGODB_URI=mongodb://localhost:27017/xiaosheng-ai
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d

# 第三方API
OPENAI_API_KEY=your-openai-key
XIAOHONGSHU_API_KEY=your-xiaohongshu-key
DOUYIN_API_KEY=your-douyin-key
```

## 监控和维护

### 日志管理
```bash
# Docker 环境
docker-compose logs -f backend
docker-compose logs -f frontend

# PM2 环境
pm2 logs xiaosheng-backend
```

### 数据库备份
```bash
# MongoDB 备份
mongodump --uri="mongodb://localhost:27017/xiaosheng-ai" --out=/backup/$(date +%Y%m%d)

# 恢复
mongorestore --uri="mongodb://localhost:27017/xiaosheng-ai" /backup/20240101/xiaosheng-ai
```

### 性能监控
- 使用 PM2 监控进程状态
- 配置 MongoDB 性能监控
- 设置应用性能监控 (APM)

## 安全配置

### SSL/TLS 配置
```nginx
server {
    listen 443 ssl http2;
    server_name xiaosheng.ai;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # 其他配置...
}
```

### 防火墙配置
```bash
# 只开放必要端口
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
```

## 故障排除

### 常见问题

1. **MongoDB 连接失败**
   - 检查 MongoDB 服务状态
   - 验证连接字符串
   - 检查网络连接

2. **前端无法访问后端**
   - 检查 CORS 配置
   - 验证代理设置
   - 检查防火墙规则

3. **JWT 认证失败**
   - 检查 JWT_SECRET 配置
   - 验证 token 格式
   - 检查时间同步

### 日志分析
```bash
# 查看错误日志
grep "ERROR" /var/log/xiaosheng/*.log

# 分析访问日志
tail -f /var/log/nginx/access.log
```