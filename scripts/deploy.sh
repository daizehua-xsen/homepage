#!/bin/bash

# 小圣智能生产环境部署脚本

set -e

echo "🚀 开始部署小圣智能到生产环境..."

# 检查 Docker 和 Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装"
    exit 1
fi

# 停止现有服务
echo "🛑 停止现有服务..."
docker-compose down

# 清理旧镜像（可选）
read -p "是否清理旧的 Docker 镜像？(y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 清理旧镜像..."
    docker system prune -f
fi

# 构建并启动服务
echo "🔨 构建并启动服务..."
docker-compose up -d --build

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 30

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

# 健康检查
echo "🏥 执行健康检查..."
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ 后端服务健康"
else
    echo "❌ 后端服务异常"
    docker-compose logs backend
    exit 1
fi

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ 前端服务健康"
else
    echo "❌ 前端服务异常"
    docker-compose logs frontend
    exit 1
fi

echo "🎉 部署完成！"
echo ""
echo "🌐 访问地址："
echo "- 前端: http://localhost:3000"
echo "- 后端API: http://localhost:5000"
echo "- 健康检查: http://localhost:5000/health"
echo ""
echo "📊 查看日志: docker-compose logs -f"
echo "🛑 停止服务: docker-compose down"