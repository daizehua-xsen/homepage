import mongoose, { Document, Schema } from 'mongoose'

export interface IContent extends Document {
  title: string
  content: string
  platform: 'xiaohongshu' | 'douyin' | 'bilibili' | 'wechat'
  contentType: 'article' | 'video' | 'image'
  originalUrl?: string
  author?: string
  publishDate?: Date
  metrics: {
    views?: number
    likes?: number
    comments?: number
    shares?: number
    engagement?: number
  }
  tags: string[]
  category?: string
  isHot: boolean
  hotScore?: number
  extractedAt: Date
  createdAt: Date
  updatedAt: Date
}

const ContentSchema = new Schema<IContent>({
  title: {
    type: String,
    required: [true, '标题不能为空'],
    trim: true,
    maxlength: [200, '标题不能超过200个字符']
  },
  content: {
    type: String,
    required: [true, '内容不能为空']
  },
  platform: {
    type: String,
    required: [true, '平台不能为空'],
    enum: ['xiaohongshu', 'douyin', 'bilibili', 'wechat']
  },
  contentType: {
    type: String,
    required: [true, '内容类型不能为空'],
    enum: ['article', 'video', 'image']
  },
  originalUrl: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    trim: true,
    maxlength: [100, '作者名称不能超过100个字符']
  },
  publishDate: {
    type: Date
  },
  metrics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    engagement: { type: Number, default: 0 }
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    trim: true,
    maxlength: [50, '分类不能超过50个字符']
  },
  isHot: {
    type: Boolean,
    default: false
  },
  hotScore: {
    type: Number,
    min: 0,
    max: 100
  },
  extractedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// 创建索引
ContentSchema.index({ platform: 1, isHot: -1, hotScore: -1 })
ContentSchema.index({ tags: 1 })
ContentSchema.index({ category: 1 })
ContentSchema.index({ extractedAt: -1 })

export const Content = mongoose.model<IContent>('Content', ContentSchema)