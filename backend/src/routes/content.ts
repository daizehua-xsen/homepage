import express from 'express'
import Joi from 'joi'
import { Content } from '../models/Content'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()

// @desc    获取热点内容列表
// @route   GET /api/content/hot
// @access  Private
router.get('/hot', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const {
      platform,
      contentType,
      category,
      page = 1,
      limit = 20,
      sortBy = 'hotScore'
    } = req.query

    // 构建查询条件
    const query: any = { isHot: true }
    
    if (platform) query.platform = platform
    if (contentType) query.contentType = contentType
    if (category) query.category = category

    // 分页参数
    const skip = (Number(page) - 1) * Number(limit)

    // 排序选项
    const sortOptions: any = {}
    if (sortBy === 'hotScore') {
      sortOptions.hotScore = -1
    } else if (sortBy === 'extractedAt') {
      sortOptions.extractedAt = -1
    } else if (sortBy === 'engagement') {
      sortOptions['metrics.engagement'] = -1
    }

    const contents = await Content.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v')

    const total = await Content.countDocuments(query)

    res.json({
      success: true,
      data: {
        contents,
        pagination: {
          current: Number(page),
          total: Math.ceil(total / Number(limit)),
          count: contents.length,
          totalCount: total
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    根据ID获取内容详情
// @route   GET /api/content/:id
// @access  Private
router.get('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const content = await Content.findById(req.params.id)

    if (!content) {
      return res.status(404).json({
        success: false,
        message: '内容不存在'
      })
    }

    res.json({
      success: true,
      data: { content }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    搜索内容
// @route   GET /api/content/search
// @access  Private
router.get('/search', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const {
      keyword,
      platform,
      contentType,
      page = 1,
      limit = 20
    } = req.query

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: '搜索关键词不能为空'
      })
    }

    // 构建查询条件
    const query: any = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { content: { $regex: keyword, $options: 'i' } },
        { tags: { $in: [new RegExp(keyword as string, 'i')] } }
      ]
    }

    if (platform) query.platform = platform
    if (contentType) query.contentType = contentType

    const skip = (Number(page) - 1) * Number(limit)

    const contents = await Content.find(query)
      .sort({ hotScore: -1, extractedAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-__v')

    const total = await Content.countDocuments(query)

    res.json({
      success: true,
      data: {
        contents,
        pagination: {
          current: Number(page),
          total: Math.ceil(total / Number(limit)),
          count: contents.length,
          totalCount: total
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    获取平台统计信息
// @route   GET /api/content/stats
// @access  Private
router.get('/stats', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const stats = await Content.aggregate([
      {
        $group: {
          _id: '$platform',
          count: { $sum: 1 },
          hotCount: {
            $sum: { $cond: [{ $eq: ['$isHot', true] }, 1, 0] }
          },
          avgHotScore: { $avg: '$hotScore' },
          totalViews: { $sum: '$metrics.views' },
          totalLikes: { $sum: '$metrics.likes' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ])

    // 获取总体统计
    const totalStats = await Content.aggregate([
      {
        $group: {
          _id: null,
          totalContent: { $sum: 1 },
          totalHot: {
            $sum: { $cond: [{ $eq: ['$isHot', true] }, 1, 0] }
          },
          avgHotScore: { $avg: '$hotScore' },
          totalViews: { $sum: '$metrics.views' },
          totalLikes: { $sum: '$metrics.likes' }
        }
      }
    ])

    res.json({
      success: true,
      data: {
        platformStats: stats,
        totalStats: totalStats[0] || {
          totalContent: 0,
          totalHot: 0,
          avgHotScore: 0,
          totalViews: 0,
          totalLikes: 0
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    获取热门标签
// @route   GET /api/content/tags/popular
// @access  Private
router.get('/tags/popular', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { limit = 20 } = req.query

    const popularTags = await Content.aggregate([
      { $match: { isHot: true } },
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
          avgHotScore: { $avg: '$hotScore' }
        }
      },
      { $sort: { count: -1, avgHotScore: -1 } },
      { $limit: Number(limit) },
      {
        $project: {
          tag: '$_id',
          count: 1,
          avgHotScore: { $round: ['$avgHotScore', 1] },
          _id: 0
        }
      }
    ])

    res.json({
      success: true,
      data: { tags: popularTags }
    })
  } catch (error) {
    next(error)
  }
})

export default router