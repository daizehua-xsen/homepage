# 小圣智能 API 文档

## 基础信息

- **基础URL**: `http://localhost:5000/api`
- **认证方式**: Bearer Token (JWT)
- **内容类型**: `application/json`

## 认证接口

### 用户注册
```http
POST /auth/register
```

**请求体**:
```json
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "password": "password123",
  "company": "示例公司",
  "phone": "13800138000"
}
```

### 用户登录
```http
POST /auth/login
```

**请求体**:
```json
{
  "email": "zhangsan@example.com",
  "password": "password123"
}
```

### 获取用户信息
```http
GET /auth/me
Authorization: Bearer <token>
```

## 内容接口

### 获取热点内容
```http
GET /content/hot?platform=xiaohongshu&page=1&limit=20
Authorization: Bearer <token>
```

**查询参数**:
- `platform`: 平台类型 (xiaohongshu, douyin, bilibili, wechat)
- `contentType`: 内容类型 (article, video, image)
- `category`: 分类
- `page`: 页码 (默认: 1)
- `limit`: 每页数量 (默认: 20)
- `sortBy`: 排序方式 (hotScore, extractedAt, engagement)

### 搜索内容
```http
GET /content/search?keyword=文案写作&platform=xiaohongshu
Authorization: Bearer <token>
```

### 获取内容详情
```http
GET /content/:id
Authorization: Bearer <token>
```

## 分析接口

### 创建分析任务
```http
POST /analysis
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "content": "要分析的内容文本...",
  "analysisType": "quality_scoring",
  "generationParams": {
    "targetPlatform": "xiaohongshu",
    "targetAudience": "年轻女性",
    "contentLength": 500
  }
}
```

**分析类型**:
- `style_extraction`: 风格提取
- `content_generation`: 内容生成
- `quality_scoring`: 质量评分

### 获取分析结果
```http
GET /analysis/:id
Authorization: Bearer <token>
```

### 获取分析历史
```http
GET /analysis?analysisType=quality_scoring&page=1&limit=20
Authorization: Bearer <token>
```

## 用户接口

### 获取仪表板数据
```http
GET /user/dashboard
Authorization: Bearer <token>
```

### 获取使用统计
```http
GET /user/usage-stats?period=30d
Authorization: Bearer <token>
```

## 响应格式

### 成功响应
```json
{
  "success": true,
  "message": "操作成功",
  "data": {
    // 响应数据
  }
}
```

### 错误响应
```json
{
  "success": false,
  "message": "错误信息",
  "stack": "错误堆栈 (仅开发环境)"
}
```

## 状态码

- `200`: 成功
- `201`: 创建成功
- `400`: 请求参数错误
- `401`: 未授权
- `403`: 权限不足
- `404`: 资源不存在
- `500`: 服务器内部错误

## 限流

- 每个IP每15分钟最多100个请求
- 超出限制返回 `429 Too Many Requests`