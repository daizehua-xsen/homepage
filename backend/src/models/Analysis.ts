import mongoose, { Document, Schema } from 'mongoose'

export interface IAnalysis extends Document {
  userId: mongoose.Types.ObjectId
  originalContent: string
  generatedContent?: string
  analysisType: 'style_extraction' | 'content_generation' | 'quality_scoring'
  
  // 风格分析结果
  styleAnalysis?: {
    tone: string // 语调：正式、轻松、幽默等
    structure: string // 结构：总分总、并列、递进等
    vocabulary: string // 词汇特点：专业、通俗、网络用语等
    length: number // 内容长度
    keywords: string[] // 关键词
  }
  
  // 质量评分结果
  qualityScore?: {
    overall: number // 总体评分 0-100
    readability: number // 可读性评分
    engagement: number // 互动性评分
    originality: number // 原创性评分
    platformFit: number // 平台适配度评分
    suggestions: string[] // 优化建议
    predictedMetrics: {
      estimatedViews: number
      estimatedLikes: number
      estimatedShares: number
      viralProbability: number // 爆火概率 0-1
    }
  }
  
  // 内容生成参数
  generationParams?: {
    targetPlatform: string
    targetAudience: string
    contentLength: number
    styleReference: string
  }
  
  status: 'pending' | 'processing' | 'completed' | 'failed'
  processingTime?: number // 处理时间（毫秒）
  errorMessage?: string
  createdAt: Date
  updatedAt: Date
}

const AnalysisSchema = new Schema<IAnalysis>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '用户ID不能为空']
  },
  originalContent: {
    type: String,
    required: [true, '原始内容不能为空']
  },
  generatedContent: {
    type: String
  },
  analysisType: {
    type: String,
    required: [true, '分析类型不能为空'],
    enum: ['style_extraction', 'content_generation', 'quality_scoring']
  },
  styleAnalysis: {
    tone: { type: String },
    structure: { type: String },
    vocabulary: { type: String },
    length: { type: Number },
    keywords: [{ type: String }]
  },
  qualityScore: {
    overall: { type: Number, min: 0, max: 100 },
    readability: { type: Number, min: 0, max: 100 },
    engagement: { type: Number, min: 0, max: 100 },
    originality: { type: Number, min: 0, max: 100 },
    platformFit: { type: Number, min: 0, max: 100 },
    suggestions: [{ type: String }],
    predictedMetrics: {
      estimatedViews: { type: Number, default: 0 },
      estimatedLikes: { type: Number, default: 0 },
      estimatedShares: { type: Number, default: 0 },
      viralProbability: { type: Number, min: 0, max: 1, default: 0 }
    }
  },
  generationParams: {
    targetPlatform: { type: String },
    targetAudience: { type: String },
    contentLength: { type: Number },
    styleReference: { type: String }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  processingTime: {
    type: Number
  },
  errorMessage: {
    type: String
  }
}, {
  timestamps: true
})

// 创建索引
AnalysisSchema.index({ userId: 1, createdAt: -1 })
AnalysisSchema.index({ analysisType: 1 })
AnalysisSchema.index({ status: 1 })

export const Analysis = mongoose.model<IAnalysis>('Analysis', AnalysisSchema)