#!/bin/bash

# 小圣智能开发环境设置脚本

echo "🚀 开始设置小圣智能开发环境..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

# 检查 MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️ MongoDB 未安装，将使用 Docker 启动 MongoDB"
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker 未安装，请先安装 Docker"
        exit 1
    fi
    echo "🐳 启动 MongoDB Docker 容器..."
    docker run -d --name xiaosheng-mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password123 mongo:6.0
fi

# 安装根目录依赖
echo "📦 安装根目录依赖..."
npm install

# 安装前端依赖
echo "📦 安装前端依赖..."
cd frontend && npm install && cd ..

# 安装后端依赖
echo "📦 安装后端依赖..."
cd backend && npm install && cd ..

# 创建环境变量文件
if [ ! -f backend/.env ]; then
    echo "⚙️ 创建后端环境变量文件..."
    cp backend/.env.example backend/.env
    echo "✅ 请编辑 backend/.env 文件配置您的环境变量"
fi

# 构建后端
echo "🔨 构建后端..."
cd backend && npm run build && cd ..

echo "✅ 开发环境设置完成！"
echo ""
echo "🎯 快速开始："
echo "1. 编辑 backend/.env 文件配置数据库连接"
echo "2. 运行 'npm run dev' 启动开发服务器"
echo "3. 访问 http://localhost:3000 查看前端"
echo "4. 访问 http://localhost:5000/health 检查后端状态"
echo ""
echo "📚 更多信息请查看 README.md"