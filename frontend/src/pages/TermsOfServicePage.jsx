import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, XCircle, Scale, RefreshCw, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    icon: CheckCircle,
    title: '1. Chấp nhận điều khoản',
    content: [
      'Bằng việc truy cập và sử dụng HeartAI, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản và điều kiện sau đây.',
      'Nếu bạn không đồng ý với bất kỳ phần nào của điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.',
      'Chúng tôi có quyền cập nhật điều khoản bất kỳ lúc nào và sẽ thông báo qua email hoặc trên hệ thống.',
    ],
  },
  {
    icon: FileText,
    title: '2. Mô tả dịch vụ',
    content: [
      'HeartAI cung cấp các dịch vụ sau:',
      '• **Dự đoán nguy cơ bệnh tim**: Sử dụng mô hình Machine Learning để phân tích 15 chỉ số sức khỏe và đưa ra tỷ lệ nguy cơ mắc bệnh tim mạch.',
      '• **Lưu trữ lịch sử**: Tự động lưu trữ các kết quả dự đoán để người dùng theo dõi theo thời gian.',
      '• **AI Chatbot**: Trợ lý AI hỗ trợ tư vấn thông tin về sức khỏe tim mạch.',
      '• **Khuyến nghị sức khỏe**: Đưa ra lời khuyên phòng ngừa dựa trên kết quả dự đoán.',
    ],
  },
  {
    icon: AlertTriangle,
    title: '3. Giới hạn trách nhiệm',
    color: 'yellow',
    content: [
      '⚠️ **Quan trọng**: HeartAI là đồ án nghiên cứu thuộc môn Trí tuệ Nhân tạo tại Trường Đại học Giao thông Vận tải TP.HCM (UTH).',
      '• Kết quả dự đoán chỉ mang tính chất **tham khảo**, **không thay thế** chẩn đoán y khoa chuyên nghiệp.',
      '• Người dùng **không nên** tự đưa ra quyết định y tế chỉ dựa trên kết quả từ hệ thống.',
      '• Mô hình AI có thể có sai số và **không đảm bảo** độ chính xác 100%.',
      '• Luôn tham khảo ý kiến bác sĩ chuyên khoa tim mạch để được tư vấn chính xác.',
      '• HeartAI **không chịu trách nhiệm** cho bất kỳ quyết định y tế nào dựa trên kết quả dự đoán.',
    ],
  },
  {
    icon: Scale,
    title: '4. Quyền và nghĩa vụ của người dùng',
    content: [
      '**Quyền lợi**:',
      '• Sử dụng miễn phí các tính năng dự đoán và chatbot.',
      '• Truy cập và quản lý lịch sử dự đoán cá nhân.',
      '• Yêu cầu xóa tài khoản và dữ liệu bất kỳ lúc nào.',
      '',
      '**Nghĩa vụ**:',
      '• Cung cấp thông tin chính xác khi đăng ký tài khoản.',
      '• Nhập dữ liệu sức khỏe trung thực để đảm bảo độ chính xác dự đoán.',
      '• Không sử dụng hệ thống cho mục đích bất hợp pháp hoặc gây hại.',
      '• Bảo mật thông tin đăng nhập cá nhân.',
      '• Không cố gắng truy cập trái phép hoặc phá hoại hệ thống.',
    ],
  },
  {
    icon: XCircle,
    title: '5. Hành vi bị cấm',
    content: [
      'Người dùng không được phép:',
      '• Sử dụng bot, crawler hoặc công cụ tự động để truy cập hệ thống hàng loạt.',
      '• Cố gắng truy cập dữ liệu của người dùng khác.',
      '• Can thiệp, chỉnh sửa hoặc phá hoại mã nguồn hệ thống.',
      '• Sử dụng hệ thống để phát tán nội dung có hại hoặc vi phạm pháp luật.',
      '• Mạo danh hoặc giả mạo danh tính người khác.',
      '• Vi phạm quyền sở hữu trí tuệ của HeartAI.',
    ],
  },
  {
    icon: RefreshCw,
    title: '6. Thay đổi và chấm dứt dịch vụ',
    content: [
      '• Chúng tôi có quyền thay đổi, tạm ngưng hoặc chấm dứt dịch vụ bất kỳ lúc nào mà không cần thông báo trước.',
      '• Trong trường hợp vi phạm điều khoản, chúng tôi có quyền tạm khóa hoặc xóa tài khoản người dùng.',
      '• Khi dịch vụ chấm dứt, người dùng sẽ được thông báo và có thời gian để tải xuống dữ liệu cá nhân.',
      '• HeartAI là đồ án học tập, do đó dịch vụ có thể thay đổi theo yêu cầu của chương trình đào tạo.',
    ],
  },
];

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/20 mb-6">
              <FileText className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Điều khoản <span className="text-secondary">Sử dụng</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Vui lòng đọc kỹ các điều khoản và điều kiện sử dụng dịch vụ HeartAI
              trước khi sử dụng hệ thống.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Cập nhật lần cuối: Tháng 6, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Link>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 sm:p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-yellow-800 mb-1">Lưu ý quan trọng</h3>
                <p className="text-sm text-yellow-700 leading-relaxed">
                  HeartAI là đồ án nghiên cứu học thuật. Kết quả dự đoán chỉ mang tính tham khảo
                  và không thay thế chẩn đoán của bác sĩ chuyên khoa. Luôn tham khảo ý kiến y tế chuyên nghiệp.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-border shadow-card p-6 sm:p-8 hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    section.color === 'yellow' ? 'bg-yellow-100' : 'bg-secondary/10'
                  }`}>
                    <section.icon className={`w-5 h-5 ${
                      section.color === 'yellow' ? 'text-yellow-600' : 'text-secondary'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-2.5">
                      {section.content.map((line, i) => (
                        line === '' ? <div key={i} className="h-2" /> :
                        <p
                          key={i}
                          className="text-sm sm:text-[15px] text-text-secondary leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>')
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-2xl border border-secondary/20 p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Câu hỏi về điều khoản</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Nếu bạn có bất kỳ câu hỏi nào về điều khoản sử dụng, vui lòng liên hệ:
                </p>
                <a
                  href="mailto:phungnm5866@ut.edu.vn"
                  className="inline-flex items-center gap-2 text-sm text-secondary hover:text-secondary-dark font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  phungnm5866@ut.edu.vn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
