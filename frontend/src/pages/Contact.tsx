import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle
} from 'lucide-react'

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: '邮箱联系',
      content: 'contact@xiaosheng.ai',
      description: '我们会在24小时内回复您的邮件'
    },
    {
      icon: Phone,
      title: '电话咨询',
      content: '400-123-4567',
      description: '工作日 9:00-18:00 专业客服为您服务'
    },
    {
      icon: MapPin,
      title: '公司地址',
      content: '北京市朝阳区科技园区',
      description: '欢迎预约到访，深度了解我们的产品'
    },
    {
      icon: Clock,
      title: '服务时间',
      content: '7×24小时',
      description: '技术支持全天候在线，随时为您解决问题'
    }
  ]

  const faqs = [
    {
      question: '如何开始使用小圣智能？',
      answer: '您可以直接注册账号开始免费试用，我们提供30天的免费体验期，无需信用卡信息。'
    },
    {
      question: '支持哪些自媒体平台？',
      answer: '目前支持小红书、抖音、B站、微信公众号等主流平台，我们会持续增加更多平台支持。'
    },
    {
      question: '数据安全如何保障？',
      answer: '我们采用企业级安全标准，所有数据都经过加密处理，严格遵守数据保护法规。'
    },
    {
      question: '是否提供API接口？',
      answer: '是的，我们为企业用户提供完整的API接口，支持系统集成和定制化开发。'
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
              联系我们
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              有任何问题或建议？我们的专业团队随时为您提供支持和帮助
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center bg-gray-50 rounded-xl p-6"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <div className="text-primary-600 font-medium mb-3">
                  {info.content}
                </div>
                <p className="text-gray-600 text-sm">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                发送消息
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公司名称
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="请输入您的公司名称（选填）"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    咨询类型
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>产品咨询</option>
                    <option>技术支持</option>
                    <option>商务合作</option>
                    <option>其他问题</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    详细描述 *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="请详细描述您的问题或需求..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  发送消息
                </button>
              </form>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                为什么选择我们？
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">专业团队支持</h3>
                    <p className="text-gray-600">由资深AI专家和产品经理组成的专业团队，为您提供最优质的服务。</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">快速响应</h3>
                    <p className="text-gray-600">承诺24小时内回复，工作日当天解决技术问题。</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">定制化服务</h3>
                    <p className="text-gray-600">根据您的具体需求，提供个性化的解决方案和技术支持。</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">持续优化</h3>
                    <p className="text-gray-600">基于用户反馈持续改进产品，确保您始终享受最新的功能特性。</p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">办公时间</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>周一至周五</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>周六</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>周日</span>
                    <span>休息</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between font-medium text-primary-600">
                      <span>技术支持</span>
                      <span>24/7 在线</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              常见问题
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              这里是用户最常询问的问题，或许能快速解答您的疑问
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <MessageSquare className="h-5 w-5 text-primary-600 mr-3" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-8">
                  {faq.answer}
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
              准备开始了吗？
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              立即体验小圣智能的强大功能，让AI为您的内容创作赋能
            </p>
            <button className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              免费试用 30 天
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact