@echo off
echo 🚀 启动小圣智能开发环境...
echo.

REM 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装，请先安装 Node.js 18+
    pause
    exit /b 1
)

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo 📦 安装根目录依赖...
    npm install
)

if not exist "frontend\node_modules" (
    echo 📦 安装前端依赖...
    cd frontend
    npm install
    cd ..
)

if not exist "backend\node_modules" (
    echo 📦 安装后端依赖...
    cd backend
    npm install
    cd ..
)

REM 检查环境变量文件
if not exist "backend\.env" (
    echo ⚙️ 创建后端环境变量文件...
    copy "backend\.env.example" "backend\.env"
    echo ✅ 请编辑 backend\.env 文件配置您的环境变量
    echo.
)

echo ✅ 准备工作完成！
echo.
echo 🎯 启动开发服务器...
echo - 前端: http://localhost:3000
echo - 后端: http://localhost:5000
echo.

REM 启动开发服务器
npm run dev