import express from 'express'
import Joi from 'joi'
import { Analysis } from '../models/Analysis'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()

// 内容分析请求验证规则
const analysisSchema = Joi.object({
  content: Joi.string().min(10).max(10000).required().messages({
    'string.min': '内容至少10个字符',
    'string.max': '内容不能超过10000个字符',
    'any.required': '内容不能为空'
  }),
  analysisType: Joi.string().valid('style_extraction', 'content_generation', 'quality_scoring').required(),
  generationParams: Joi.object({
    targetPlatform: Joi.string().valid('xiaohongshu', 'douyin', 'bilibili', 'wechat'),
    targetAudience: Joi.string().max(100),
    contentLength: Joi.number().min(50).max(5000),
    styleReference: Joi.string().max(1000)
  }).optional()
})

// 模拟AI分析服务
class AIAnalysisService {
  // 风格提取分析
  static async extractStyle(content: string) {
    // 模拟AI分析延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      tone: this.analyzeTone(content),
      structure: this.analyzeStructure(content),
      vocabulary: this.analyzeVocabulary(content),
      length: content.length,
      keywords: this.extractKeywords(content)
    }
  }

  // 内容质量评分
  static async scoreContent(content: string) {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const readability = Math.floor(Math.random() * 30) + 70 // 70-100
    const engagement = Math.floor(Math.random() * 40) + 60 // 60-100
    const originality = Math.floor(Math.random() * 20) + 80 // 80-100
    const platformFit = Math.floor(Math.random() * 25) + 75 // 75-100
    const overall = Math.floor((readability + engagement + originality + platformFit) / 4)

    return {
      overall,
      readability,
      engagement,
      originality,
      platformFit,
      suggestions: this.generateSuggestions(overall),
      predictedMetrics: {
        estimatedViews: Math.floor(Math.random() * 50000) + 5000,
        estimatedLikes: Math.floor(Math.random() * 2000) + 200,
        estimatedShares: Math.floor(Math.random() * 500) + 50,
        viralProbability: Math.random() * 0.3 + 0.1 // 0.1-0.4
      }
    }
  }

  // 内容生成
  static async generateContent(originalContent: string, params: any) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 这里应该调用真实的AI API
    return `基于原内容风格生成的新内容：\n\n${originalContent.substring(0, 100)}...\n\n[AI生成的仿写内容会在这里显示]`
  }

  private static analyzeTone(content: string): string {
    const tones = ['正式', '轻松', '幽默', '专业', '亲切', '激励']
    return tones[Math.floor(Math.random() * tones.length)]
  }

  private static analyzeStructure(content: string): string {
    const structures = ['总分总', '并列式', '递进式', '对比式', '问答式']
    return structures[Math.floor(Math.random() * structures.length)]
  }

  private static analyzeVocabulary(content: string): string {
    const vocabularies = ['通俗易懂', '专业术语', '网络用语', '文艺范', '商务正式']
    return vocabularies[Math.floor(Math.random() * vocabularies.length)]
  }

  private static extractKeywords(content: string): string[] {
    // 简单的关键词提取模拟
    const words = content.split(/\s+/).filter(word => word.length > 2)
    return words.slice(0, 5)
  }

  private static generateSuggestions(score: number): string[] {
    const suggestions = []
    
    if (score < 70) {
      suggestions.push('建议增加更多吸引人的标题和开头')
      suggestions.push('内容结构需要优化，增强逻辑性')
    }
    if (score < 80) {
      suggestions.push('可以添加更多互动元素，如问题或号召行动')
      suggestions.push('考虑使用更生动的描述和例子')
    }
    if (score < 90) {
      suggestions.push('内容质量很好，可以考虑优化发布时间')
    }
    
    return suggestions.length > 0 ? suggestions : ['内容质量优秀，建议保持现有风格']
  }
}

// @desc    创建内容分析任务
// @route   POST /api/analysis
// @access  Private
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { error, value } = analysisSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }

    const { content, analysisType, generationParams } = value
    const userId = req.user._id

    // 创建分析记录
    const analysis = await Analysis.create({
      userId,
      originalContent: content,
      analysisType,
      generationParams,
      status: 'processing'
    })

    // 异步处理分析任务
    processAnalysis(analysis._id.toString(), content, analysisType, generationParams)

    res.status(201).json({
      success: true,
      message: '分析任务已创建，正在处理中...',
      data: {
        analysisId: analysis._id,
        status: analysis.status
      }
    })
  } catch (error) {
    next(error)
  }
})

// 异步处理分析任务
async function processAnalysis(
  analysisId: string, 
  content: string, 
  analysisType: string, 
  generationParams?: any
) {
  const startTime = Date.now()
  
  try {
    let result: any = {}

    switch (analysisType) {
      case 'style_extraction':
        result.styleAnalysis = await AIAnalysisService.extractStyle(content)
        break
      
      case 'quality_scoring':
        result.qualityScore = await AIAnalysisService.scoreContent(content)
        break
      
      case 'content_generation':
        result.generatedContent = await AIAnalysisService.generateContent(content, generationParams)
        result.styleAnalysis = await AIAnalysisService.extractStyle(content)
        break
    }

    const processingTime = Date.now() - startTime

    await Analysis.findByIdAndUpdate(analysisId, {
      ...result,
      status: 'completed',
      processingTime
    })
  } catch (error) {
    await Analysis.findByIdAndUpdate(analysisId, {
      status: 'failed',
      errorMessage: error instanceof Error ? error.message : '处理失败',
      processingTime: Date.now() - startTime
    })
  }
}

// @desc    获取分析结果
// @route   GET /api/analysis/:id
// @access  Private
router.get('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: '分析记录不存在'
      })
    }

    res.json({
      success: true,
      data: { analysis }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    获取用户的分析历史
// @route   GET /api/analysis
// @access  Private
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const {
      analysisType,
      status,
      page = 1,
      limit = 20
    } = req.query

    const query: any = { userId: req.user._id }
    
    if (analysisType) query.analysisType = analysisType
    if (status) query.status = status

    const skip = (Number(page) - 1) * Number(limit)

    const analyses = await Analysis.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-originalContent -generatedContent') // 列表页不返回内容详情

    const total = await Analysis.countDocuments(query)

    res.json({
      success: true,
      data: {
        analyses,
        pagination: {
          current: Number(page),
          total: Math.ceil(total / Number(limit)),
          count: analyses.length,
          totalCount: total
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    删除分析记录
// @route   DELETE /api/analysis/:id
// @access  Private
router.delete('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: '分析记录不存在'
      })
    }

    res.json({
      success: true,
      message: '分析记录已删除'
    })
  } catch (error) {
    next(error)
  }
})

// @desc    获取分析统计信息
// @route   GET /api/analysis/stats/summary
// @access  Private
router.get('/stats/summary', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user._id

    const stats = await Analysis.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$analysisType',
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          avgProcessingTime: {
            $avg: { $cond: [{ $ne: ['$processingTime', null] }, '$processingTime', 0] }
          }
        }
      }
    ])

    const totalStats = await Analysis.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalAnalyses: { $sum: 1 },
          completedAnalyses: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          avgQualityScore: {
            $avg: '$qualityScore.overall'
          }
        }
      }
    ])

    res.json({
      success: true,
      data: {
        typeStats: stats,
        totalStats: totalStats[0] || {
          totalAnalyses: 0,
          completedAnalyses: 0,
          avgQualityScore: 0
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router