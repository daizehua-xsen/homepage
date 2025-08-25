import express from 'express'
import { User } from '../models/User'
import { Analysis } from '../models/Analysis'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'

const router = express.Router()

// @desc    获取用户仪表板数据
// @route   GET /api/user/dashboard
// @access  Private
router.get('/dashboard', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user._id

    // 获取用户分析统计
    const analysisStats = await Analysis.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalAnalyses: { $sum: 1 },
          completedAnalyses: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          avgQualityScore: {
            $avg: { $cond: [{ $ne: ['$qualityScore.overall', null] }, '$qualityScore.overall', 0] }
          },
          totalProcessingTime: { $sum: '$processingTime' }
        }
      }
    ])

    // 获取最近7天的分析趋势
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentAnalyses = await Analysis.find({
      userId,
      createdAt: { $gte: sevenDaysAgo }
    }).sort({ createdAt: -1 }).limit(10)

    // 按分析类型统计
    const typeStats = await Analysis.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$analysisType',
          count: { $sum: 1 },
          successRate: {
            $avg: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          }
        }
      }
    ])

    // 获取质量评分分布
    const scoreDistribution = await Analysis.aggregate([
      { 
        $match: { 
          userId,
          'qualityScore.overall': { $exists: true }
        }
      },
      {
        $bucket: {
          groupBy: '$qualityScore.overall',
          boundaries: [0, 60, 70, 80, 90, 100],
          default: 'other',
          output: {
            count: { $sum: 1 },
            avgScore: { $avg: '$qualityScore.overall' }
          }
        }
      }
    ])

    const dashboardData = {
      overview: analysisStats[0] || {
        totalAnalyses: 0,
        completedAnalyses: 0,
        avgQualityScore: 0,
        totalProcessingTime: 0
      },
      recentAnalyses,
      typeStats,
      scoreDistribution
    }

    res.json({
      success: true,
      data: dashboardData
    })
  } catch (error) {
    next(error)
  }
})

// @desc    获取用户使用统计
// @route   GET /api/user/usage-stats
// @access  Private
router.get('/usage-stats', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user._id
    const { period = '30d' } = req.query

    let dateFilter = new Date()
    switch (period) {
      case '7d':
        dateFilter.setDate(dateFilter.getDate() - 7)
        break
      case '30d':
        dateFilter.setDate(dateFilter.getDate() - 30)
        break
      case '90d':
        dateFilter.setDate(dateFilter.getDate() - 90)
        break
      default:
        dateFilter.setDate(dateFilter.getDate() - 30)
    }

    // 按日期分组统计
    const dailyStats = await Analysis.aggregate([
      {
        $match: {
          userId,
          createdAt: { $gte: dateFilter }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          avgScore: {
            $avg: { $cond: [{ $ne: ['$qualityScore.overall', null] }, '$qualityScore.overall', null] }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ])

    // 功能使用统计
    const featureUsage = await Analysis.aggregate([
      {
        $match: {
          userId,
          createdAt: { $gte: dateFilter }
        }
      },
      {
        $group: {
          _id: '$analysisType',
          count: { $sum: 1 },
          successCount: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          avgProcessingTime: {
            $avg: { $cond: [{ $ne: ['$processingTime', null] }, '$processingTime', 0] }
          }
        }
      }
    ])

    res.json({
      success: true,
      data: {
        period,
        dailyStats,
        featureUsage
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    获取所有用户列表（管理员）
// @route   GET /api/user/list
// @access  Private/Admin
router.get('/list', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      role,
      isActive
    } = req.query

    const query: any = {}
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (role) query.role = role
    if (isActive !== undefined) query.isActive = isActive === 'true'

    const skip = (Number(page) - 1) * Number(limit)

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))

    const total = await User.countDocuments(query)

    // 为每个用户添加统计信息
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const analysisCount = await Analysis.countDocuments({ userId: user._id })
        const completedCount = await Analysis.countDocuments({ 
          userId: user._id, 
          status: 'completed' 
        })
        
        return {
          ...user.toObject(),
          stats: {
            totalAnalyses: analysisCount,
            completedAnalyses: completedCount
          }
        }
      })
    )

    res.json({
      success: true,
      data: {
        users: usersWithStats,
        pagination: {
          current: Number(page),
          total: Math.ceil(total / Number(limit)),
          count: users.length,
          totalCount: total
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    更新用户状态（管理员）
// @route   PUT /api/user/:id/status
// @access  Private/Admin
router.put('/:id/status', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { isActive } = req.body
    const userId = req.params.id

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isActive 必须是布尔值'
      })
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      })
    }

    res.json({
      success: true,
      message: `用户已${isActive ? '激活' : '禁用'}`,
      data: { user }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    获取系统统计信息（管理员）
// @route   GET /api/user/system-stats
// @access  Private/Admin
router.get('/system-stats', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    // 用户统计
    const userStats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: {
            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
          },
          adminUsers: {
            $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] }
          }
        }
      }
    ])

    // 分析统计
    const analysisStats = await Analysis.aggregate([
      {
        $group: {
          _id: null,
          totalAnalyses: { $sum: 1 },
          completedAnalyses: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          failedAnalyses: {
            $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] }
          },
          avgProcessingTime: { $avg: '$processingTime' }
        }
      }
    ])

    // 最近30天新用户趋势
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const userTrend = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ])

    res.json({
      success: true,
      data: {
        userStats: userStats[0] || {
          totalUsers: 0,
          activeUsers: 0,
          adminUsers: 0
        },
        analysisStats: analysisStats[0] || {
          totalAnalyses: 0,
          completedAnalyses: 0,
          failedAnalyses: 0,
          avgProcessingTime: 0
        },
        userTrend
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router