import { Brain, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">小圣智能</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              专注于AI驱动的自媒体营销工具，为内容创作者提供智能化的内容分析、创作和优化解决方案。
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>contact@xiaosheng.ai</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>400-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>北京市朝阳区科技园区</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  产品功能
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  帮助中心
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">核心服务</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">热点内容采集</li>
              <li className="text-gray-300">风格提取仿写</li>
              <li className="text-gray-300">内容质量打分</li>
              <li className="text-gray-300">多平台数据分析</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 小圣智能. 保留所有权利.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                服务条款
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie政策
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer