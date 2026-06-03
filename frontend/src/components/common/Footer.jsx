import { Link } from 'react-router-dom';
import { Heart, ExternalLink, Mail, Shield, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Heart<span className="text-primary">AI</span>
                </h3>
                <p className="text-xs text-gray-500">Prediction System</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Hệ thống dự đoán nguy cơ mắc bệnh tim mạch bằng Trí tuệ Nhân tạo, 
              sử dụng mô hình Machine Learning từ bộ dữ liệu Framingham Heart Study.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Trang chủ' },
                { to: '/predict', label: 'Dự đoán bệnh tim' },
                { to: '/history', label: 'Lịch sử dự đoán' },
                { to: '/chatbot', label: 'AI Chatbot' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-white font-semibold mb-4">Công nghệ</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>React + Vite</li>
              <li>Node.js + Express</li>
              <li>FastAPI + Python</li>
              <li>Machine Learning (sklearn)</li>
              <li>TailwindCSS</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Thông tin</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@heartai.vn"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contact@heartai.vn
                </a>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2025 HeartAI Prediction System. Đồ án Trí tuệ Nhân tạo - UTH.
            </p>
            <p className="text-xs text-gray-600">
              ⚠️ Kết quả dự đoán chỉ mang tính chất tham khảo, không thay thế chẩn đoán của bác sĩ.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
