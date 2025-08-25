import express from 'express'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { User } from '../models/User'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()

// 注册验证规则
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': '姓名至少2个字符',
    'string.max': '姓名不能超过50个字符',
    'any.required': '姓名不能为空'
  }),
  email: Joi.string().email().required().messages({
    'string.email': '请输入有效的邮箱地址',
    'any.required': '邮箱不能为空'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '密码至少6个字符',
    'any.required': '密码不能为空'
  }),
  company: Joi.string().max(100).optional(),
  phone: Joi.string().pattern(/^1[3-9]\d{9}$/).optional().messages({
    'string.pattern.base': '请输入有效的手机号码'
  })
})

// 登录验证规则
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '请输入有效的邮箱地址',
    'any.required': '邮箱不能为空'
  }),
  password: Joi.string().required().messages({
    'any.required': '密码不能为空'
  })
})

// 生成JWT Token
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'default-secret'
  return jwt.sign({ id: userId }, secret)
}

// @desc    用户注册
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res, next) => {
  try {
    // 验证请求数据
    const { error, value } = registerSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }

    const { name, email, password, company, phone } = value

    // 检查用户是否已存在
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '该邮箱已被注册'
      })
    }

    // 创建用户
    const user = await User.create({
      name,
      email,
      password,
      company,
      phone
    })

    // 生成Token
    const token = generateToken(user._id.toString())

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          phone: user.phone,
          avatar: user.avatar
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    用户登录
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res, next) => {
  try {
    // 验证请求数据
    const { error, value } = loginSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }

    const { email, password } = value

    // 查找用户（包含密码字段）
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '邮箱或密码错误'
      })
    }

    // 验证密码
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '邮箱或密码错误'
      })
    }

    // 检查账户状态
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: '账户已被禁用，请联系管理员'
      })
    }

    // 更新最后登录时间
    user.lastLogin = new Date()
    await user.save()

    // 生成Token
    const token = generateToken(user._id.toString())

    res.json({
      success: true,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          phone: user.phone,
          avatar: user.avatar,
          lastLogin: user.lastLogin
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    获取当前用户信息
// @route   GET /api/auth/me
// @access  Private
router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          phone: user.phone,
          avatar: user.avatar,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

// @desc    更新用户信息
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const updateSchema = Joi.object({
      name: Joi.string().min(2).max(50).optional(),
      company: Joi.string().max(100).optional(),
      phone: Joi.string().pattern(/^1[3-9]\d{9}$/).optional(),
      avatar: Joi.string().uri().optional()
    })

    const { error, value } = updateSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      value,
      { new: true, runValidators: true }
    )

    res.json({
      success: true,
      message: '用户信息更新成功',
      data: {
        user: {
          id: user!._id,
          name: user!.name,
          email: user!.email,
          role: user!.role,
          company: user!.company,
          phone: user!.phone,
          avatar: user!.avatar
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router