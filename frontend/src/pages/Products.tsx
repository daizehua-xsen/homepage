import { motion } from 'framer-motion'
import { 
  Database, 
  PenTool, 
  BarChart3, 
  Target,
  CheckCircle
} from 'lucide-react'

const Products = () => {
  const products = [
    {
      icon: Database,
      title: '热点内容采集系统',
      description: '智能采集多平台热点内容，实时监控流量趋势',
      features: [
        '支持小红书、抖音、B站、公众号等主流平台',
        '实时热点监控和数据更新',
        '智能内容分类和标签管理',
        '自定义采集规则和筛选条件'
      ],
      platforms: [
        { name: '小红书', icon: '📱', color: 'bg-red-100 text-red-600' },
        { name: '抖音', icon: '🎵', color: 'bg-black text-white' },
        { name: 'B站', icon: '📺', color: 'bg-blue-100 text-blue-600' },
        { name: '公众号', icon: '💬', color: 'bg-green-100 text-green-600' }
      ]
    },
    {
      icon: PenTool,
      title: '风格提取仿写引擎',
      description: '深度分析爆款内容风格，AI智能仿写生成原创内容',
      features: [
        '深度学习文本风格特征提取',
        '多维度内容结构分析',
        '智能原创内容生成',
        '风格一致性保证机制'
      ],
      capabilities: [
        { name: '文本风格', accuracy: '95%' },
        { name: '结构分析', accuracy: '92%' },
        { name: '原创度', accuracy: '98%' },
        { name: '可读性', accuracy: '94%' }
      ]
    },
    {
      icon: BarChart3,
      title: '内容质量评分系统',
      description: '基于大数据分析的专业内容评分和优化建议',
      features: [
        '多维度内容质量评估',
        '传播效果预测分析',
        '个性化优化建议',
        '竞品对比分析报告'
      ],
      metrics: [
        { name: '内容质量', weight: '30%' },
        { name: '传播潜力', weight: '25%' },
        { name: '用户互动', weight: '20%' },
        { name: '平台适配', weight: '25%' }
      ]
    }
  ]

  const workflow = [
    {
      step: '01',
      title: '数据采集',
      description: '智能采集各平台热点内容和数据',
      icon: Database
    },
    {
      step: '02',
      title: '风格分析',
      description: '深度分析内容风格和结构特征',
      icon: Target
    },
    {
      step: '03',
      title: '内容生成',
      description: 'AI智能仿写生成高质量原创内容',
      icon: PenTool
    },
    {
      step: '04',
      title: '质量评估',
      description: '专业评分和优化建议输出',
      icon: BarChart3
    }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 section-padding">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              产品功能介绍
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              小圣智能为您提供完整的AI驱动自媒体营销解决方案，从内容采集到创作优化，全流程智能化支持
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="space-y-20">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <product.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {product.title}
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    {product.description}
                  </p>
                  <div className="space-y-3">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    {/* Product 1 - Platforms */}
                    {product.platforms && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">支持平台</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {product.platforms.map((platform, platformIndex) => (
                            <div
                              key={platformIndex}
                              className={`${platform.color} rounded-lg p-4 text-center`}
                            >
                              <div className="text-2xl mb-2">{platform.icon}</div>
                              <div className="font-medium">{platform.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product 2 - Capabilities */}
                    {product.capabilities && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">核心能力</h3>
                        <div className="space-y-4">
                          {product.capabilities.map((capability, capIndex) => (
                            <div key={capIndex}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-gray-700">{capability.name}</span>
                                <span className="text-primary-600 font-semibold">{capability.accuracy}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary-600 h-2 rounded-full transition-all duration-1000"
                                  style={{ width: capability.accuracy }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product 3 - Metrics */}
                    {product.metrics && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">评分维度</h3>
                        <div className="space-y-4">
                          {product.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="flex justify-between items-center p-3 bg-white rounded-lg">
                              <span className="font-medium text-gray-700">{metric.name}</span>
                              <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
                                {metric.weight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              工作流程
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              简单四步，完成从内容采集到优化建议的全流程智能化处理
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-accent-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                  {index < workflow.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -translate-x-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              立即体验强大的AI功能
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              免费试用30天，感受AI为您的自媒体运营带来的革命性改变
            </p>
            <button className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              开始免费试用
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Products