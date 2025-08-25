// MongoDB 初始化脚本
db = db.getSiblingDB('xiaosheng-ai');

// 创建用户
db.createUser({
  user: 'xiaosheng',
  pwd: 'xiaosheng123',
  roles: [
    {
      role: 'readWrite',
      db: 'xiaosheng-ai'
    }
  ]
});

// 创建索引
db.users.createIndex({ email: 1 }, { unique: true });
db.contents.createIndex({ platform: 1, isHot: -1, hotScore: -1 });
db.contents.createIndex({ tags: 1 });
db.contents.createIndex({ extractedAt: -1 });
db.analyses.createIndex({ userId: 1, createdAt: -1 });
db.analyses.createIndex({ analysisType: 1 });
db.analyses.createIndex({ status: 1 });

// 插入示例数据
db.contents.insertMany([
  {
    title: "小红书爆款文案写作技巧分享",
    content: "今天分享几个小红书爆款文案的写作技巧...",
    platform: "xiaohongshu",
    contentType: "article",
    author: "内容创作达人",
    publishDate: new Date("2024-01-15"),
    metrics: {
      views: 25000,
      likes: 1200,
      comments: 89,
      shares: 156,
      engagement: 5.8
    },
    tags: ["文案写作", "小红书", "内容营销"],
    category: "教程",
    isHot: true,
    hotScore: 92,
    extractedAt: new Date()
  },
  {
    title: "抖音短视频制作全攻略",
    content: "从脚本策划到后期剪辑，教你制作爆款短视频...",
    platform: "douyin",
    contentType: "video",
    author: "短视频专家",
    publishDate: new Date("2024-01-20"),
    metrics: {
      views: 180000,
      likes: 8900,
      comments: 567,
      shares: 1200,
      engagement: 6.2
    },
    tags: ["短视频", "抖音", "视频制作"],
    category: "教程",
    isHot: true,
    hotScore: 95,
    extractedAt: new Date()
  }
]);

print('MongoDB 初始化完成');