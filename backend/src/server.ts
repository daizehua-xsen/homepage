import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

import { connectDB } from './config/database'
import { errorHandler } from './middleware/errorHandler'
import authRoutes from './routes/auth'
import contentRoutes from './routes/content'
import analysisRoutes from './routes/analysis'
import userRoutes from './routes/user'

// 加载环境变量
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// 连接数据库
connectDB()

// 中间件
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://xiaosheng.ai'] 
    : ['http://localhost:3000'],
  credentials: true
}))

// 请求限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: '请求过于频繁，请稍后再试'
})
app.use('/api', limiter)

app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || 'v1'
  })
})

// API路由
app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/analysis', analysisRoutes)
app.use('/api/user', userRoutes)

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: '接口不存在' 
  })
})

// 错误处理中间件
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在端口 ${PORT}`)
  console.log(`🌍 环境: ${process.env.NODE_ENV}`)
  console.log(`📊 健康检查: http://localhost:${PORT}/health`)
})