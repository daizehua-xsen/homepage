import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  FileText, 
  Star, 
  Users, 
  Zap, 
  Shield,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: TrendingUp,
      title: '热点内容采集',
      description: '智能采集小红书、公众号、抖音、B站等平台的热点文章和视频数据，实时掌握流量密码'
    },
    {
      icon: FileText,
      title: '风格提取仿写',
      description: '深度分析爆款内容的写作风格和结构特点，AI智能仿写生成高质量原创内容'
    },
    {
      icon: Star,
      title: '内容质量打分',
      description: '基于大数据分析为您的待发表内容进行专业打分，预测传播效果和优化建议'
    }
  ]

  const stats = [
    { number: '10万+', label: '服务用户' },
    { number: '500万+', label: '内容分析' },
    { number: '98%', label: '准确率' },
    { number: '24/7', label: '技术支持' }
  ]

  const benefits = [
    '提升内容创作效率 300%',
    '增加内容传播率 250%',
    '节省市场调研时间 80%',
    '提高内容质量评分 40%'
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                AI驱动的
                <span className="text-primary-600"> 自媒体营销</span>
                <br />智能工具
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                小圣智能为内容创作者提供全方位的AI解决方案，从热点采集到内容创作，从质量评估到效果预测，让您的自媒体运营更加智能高效。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex items-center justify-center">
                  免费开始体验
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="btn-secondary flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  观看演示视频
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">正在分析热点内容...</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">内容质量评分</span>
                      <span className="text-2xl font-bold text-primary-600">92分</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-600">2.5万</div>
                      <div className="text-sm text-gray-600">预计阅读量</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">85%</div>
                      <div className="text-sm text-gray-600">传播概率</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              核心功能特性
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于先进的AI技术，为您提供全链路的自媒体内容创作和运营解决方案
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-100">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                为什么选择小圣智能？
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                我们的AI技术帮助数万内容创作者实现了显著的效果提升，让内容创作变得更加智能和高效。
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl">
                  <Zap className="h-8 w-8 text-primary-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">极速处理</h3>
                  <p className="text-sm text-gray-600">毫秒级内容分析响应</p>
                </div>
                <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-xl">
                  <Shield className="h-8 w-8 text-accent-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">数据安全</h3>
                  <p className="text-sm text-gray-600">企业级安全保障</p>
                </div>
              </div>
              <div className="space-y-6 mt-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <Users className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">专业团队</h3>
                  <p className="text-sm text-gray-600">7x24小时技术支持</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-orange-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">持续优化</h3>
                  <p className="text-sm text-gray-600">算法持续迭代升级</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              准备开始您的AI内容创作之旅？
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              立即体验小圣智能的强大功能，让AI为您的自媒体运营赋能
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                免费试用 30 天
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                预约演示
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home