# 小圣智能 - AI驱动的自媒体营销工具

> 专业的AI驱动自媒体营销解决方案，为内容创作者提供智能化的内容分析、创作和优化工具。

## ✨ 产品功能

### 🔥 热点内容采集
- **多平台支持**: 小红书、抖音、B站、微信公众号
- **实时监控**: 自动采集热点内容和数据指标
- **智能分类**: AI自动标签和分类管理
- **数据分析**: 深度分析内容传播效果

### ✍️ 风格提取仿写
- **风格分析**: 深度学习文本风格特征
- **结构解析**: 多维度内容结构分析
- **智能仿写**: AI生成高质量原创内容
- **风格一致**: 保持原有风格特色

### 📊 内容质量评分
- **多维评估**: 可读性、互动性、原创性、平台适配度
- **效果预测**: 预估阅读量、点赞数、传播概率
- **优化建议**: 个性化内容改进建议
- **竞品分析**: 对比分析报告

## 🏗️ 技术架构

### 前端技术栈
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **路由**: React Router
- **HTTP客户端**: Axios

### 后端技术栈
- **运行时**: Node.js + Express
- **语言**: TypeScript
- **数据库**: MongoDB + Mongoose
- **缓存**: Redis
- **认证**: JWT
- **验证**: Joi
- **安全**: Helmet + CORS

### 部署架构
- **容器化**: Docker + Docker Compose
- **反向代理**: Nginx
- **进程管理**: PM2
- **监控**: 日志聚合 + 性能监控

## 🚀 快速开始

### 环境要求
- Node.js 18+
- MongoDB 6.0+
- Redis 7+ (可选)
- Docker & Docker Compose (生产环境)

### 开发环境设置

1. **克隆项目**
```bash
git clone <repository-url>
cd xiaosheng-ai-website
```

2. **自动设置 (Linux/macOS)**
```bash
chmod +x scripts/dev-setup.sh
./scripts/dev-setup.sh
```

3. **手动设置 (Windows)**
```bash
# 安装所有依赖
npm run install:all

# 配置后端环境变量
cp backend/.env.example backend/.env
# 编辑 backend/.env 文件配置数据库连接

# 启动开发服务器
npm run dev
```

4. **访问应用**
- 前端应用: http://localhost:3000
- 后端API: http://localhost:5000
- 健康检查: http://localhost:5000/health

### 生产环境部署

#### 使用 Docker Compose (推荐)
```bash
# 一键部署
./scripts/deploy.sh

# 或手动执行
docker-compose up -d --build
```

#### 手动部署
详细步骤请参考 [部署指南](docs/DEPLOYMENT.md)

## 📁 项目结构

```
xiaosheng-ai-website/
├── frontend/                 # React前端应用
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   ├── pages/          # 页面组件
│   │   ├── hooks/          # 自定义Hooks
│   │   └── utils/          # 工具函数
│   ├── public/             # 静态资源
│   └── dist/               # 构建输出
├── backend/                  # Node.js后端API
│   ├── src/
│   │   ├── routes/         # API路由
│   │   ├── models/         # 数据模型
│   │   ├── middleware/     # 中间件
│   │   ├── services/       # 业务逻辑
│   │   └── utils/          # 工具函数
│   └── dist/               # 构建输出
├── docs/                     # 项目文档
│   ├── API.md              # API文档
│   └── DEPLOYMENT.md       # 部署指南
├── scripts/                  # 部署脚本
│   ├── dev-setup.sh        # 开发环境设置
│   └── deploy.sh           # 生产环境部署
└── docker-compose.yml        # Docker编排文件
```

## 📚 文档

- [API 文档](docs/API.md) - 详细的API接口说明
- [部署指南](docs/DEPLOYMENT.md) - 生产环境部署指南
- [开发指南](docs/DEVELOPMENT.md) - 开发环境配置和规范

## 🔧 开发命令

```bash
# 安装所有依赖
npm run install:all

# 启动开发服务器 (前端 + 后端)
npm run dev

# 单独启动前端
npm run dev:frontend

# 单独启动后端
npm run dev:backend

# 构建生产版本
npm run build

# 运行测试
npm test

# 代码格式化
npm run format

# 代码检查
npm run lint
```

## 🌟 核心特性

- ✅ **现代化技术栈**: 使用最新的前后端技术
- ✅ **响应式设计**: 完美适配桌面和移动设备
- ✅ **类型安全**: 全面的TypeScript支持
- ✅ **高性能**: 优化的构建和运行时性能
- ✅ **安全可靠**: 企业级安全防护
- ✅ **易于部署**: Docker容器化部署
- ✅ **可扩展**: 模块化架构设计
- ✅ **监控完善**: 完整的日志和监控体系

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解详情。

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- 📧 邮箱: contact@xiaosheng.ai
- 📱 电话: 400-123-4567
- 🌐 官网: https://xiaosheng.ai
- 💬 微信群: 扫码加入技术交流群

---

<div align="center">
  <p>由 ❤️ 和 ☕ 驱动开发</p>
  <p>© 2024 小圣智能. 保留所有权利.</p>
</div>