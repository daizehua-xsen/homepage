import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  Award, 
  Lightbulb,
  Heart,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: '创新驱动',
      description: '持续探索AI技术前沿，为用户提供最先进的解决方案'
    },
    {
      icon: Heart,
      title: '用户至上',
      description: '以用户需求为核心，不断优化产品体验和服务质量'
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: '严格保护用户数据安全，提供稳定可靠的技术服务'
    },
    {
      icon: TrendingUp,
      title: '持续成长',
      description: '与用户共同成长，助力每一位创作者实现价值最大化'
    }
  ]

  const team = [
    {
      name: '张小圣',
      role: '创始人 & CEO',
      description: '前腾讯AI实验室技术专家，专注于自然语言处理和内容智能分析领域10年',
      avatar: '👨‍💼'
    },
    {
      name: '李智慧',
      role: '技术总监 & CTO',
      description: '前字节跳动算法工程师，在推荐系统和内容理解方面有丰富经验',
      avatar: '👩‍💻'
    },
    {
      name: '王创新',
      role: '产品总监',
      description: '前小红书产品经理，深度理解自媒体行业需求和用户痛点',
      avatar: '👨‍🎨'
    },
    {
      name: '陈数据',
      role: '数据科学家',
      description: '前阿里巴巴数据挖掘专家，在大数据分析和机器学习领域经验丰富',
      avatar: '👩‍🔬'
    }
  ]

  const milestones = [
    {
      year: '2023年1月',
      title: '公司成立',
      description: '小圣智能正式成立，专注AI驱动的自媒体营销工具开发'
    },
    {
      year: '2023年6月',
      title: '产品上线',
      description: '首个版本正式发布，获得首批1000名种子用户'
    },
    {
      year: '2023年12月',
      title: '快速增长',
      description: '用户突破5万，完成天使轮融资'
    },
    {
      year: '2024年6月',
      title: '技术升级',
      description: '发布2.0版本，AI能力全面提升'
    },
    {
      year: '2024年12月',
      title: '规模扩张',
      description: '用户突破10万，成为行业领先品牌'
    }
  ]

  const stats = [
    { number: '10万+', label: '服务用户', icon: Users },
    { number: '500万+', label: '内容分析', icon: Target },
    { number: '98%', label: '用户满意度', icon: Award },
    { number: '24/7', label: '技术支持', icon: Zap }
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
              关于小圣智能
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              我们致力于用AI技术赋能每一位内容创作者，让自媒体运营变得更加智能、高效、有价值
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
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
                我们的使命
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                在信息爆炸的时代，优质内容的创作变得越来越重要，也越来越困难。小圣智能相信，AI技术能够帮助每一位创作者突破创作瓶颈，提升内容质量，实现更大的影响力。
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                我们的使命是通过先进的AI技术，为自媒体创作者提供全方位的智能化工具，让创作变得更加轻松、高效，让每个人都能成为优秀的内容创作者。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white rounded-lg p-4 mb-3">
                        <stat.icon className="h-8 w-8 text-primary-600 mx-auto" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              我们的价值观
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              这些核心价值观指导着我们的每一个决策，塑造着我们的企业文化
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              核心团队
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们的团队由来自顶级科技公司的资深专家组成，在AI、产品、数据等领域拥有丰富经验
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-primary-600 font-medium mb-4">
                  {member.role}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              发展历程
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              从创立至今，我们始终专注于为用户提供更好的AI驱动解决方案
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-primary-600 font-semibold mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
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
              加入我们的AI创作革命
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              与数万创作者一起，体验AI为内容创作带来的无限可能
            </p>
            <button className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              立即开始使用
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About