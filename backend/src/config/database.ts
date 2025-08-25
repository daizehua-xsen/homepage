import mongoose from 'mongoose'

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xiaosheng-ai'
    
    await mongoose.connect(mongoURI)
    
    console.log('✅ MongoDB 连接成功')
  } catch (error) {
    console.error('❌ MongoDB 连接失败:', error)
    
    // 在开发环境下，如果MongoDB连接失败，继续运行但使用模拟数据
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 开发模式：使用模拟数据继续运行')
      return
    }
    
    process.exit(1)
  }
}

// 监听连接事件
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB 连接断开')
})

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB 连接错误:', error)
})