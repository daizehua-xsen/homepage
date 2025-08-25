import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err }
  error.message = err.message

  // 设置默认错误
  let statusCode = error.statusCode || 500
  let message = error.message || '服务器内部错误'

  // Mongoose 验证错误
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = '数据验证失败'
  }

  // Mongoose 重复键错误
  if (err.name === 'MongoError' && (err as any).code === 11000) {
    statusCode = 400
    message = '数据已存在'
  }

  // JWT 错误
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = '无效的访问令牌'
  }

  // JWT 过期错误
  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = '访问令牌已过期'
  }

  console.error('错误详情:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  })

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}