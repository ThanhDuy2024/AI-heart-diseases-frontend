import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Bell, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    icon: Database,
    title: '1. Thông tin chúng tôi thu thập',
    content: [
      'Khi sử dụng HeartAI, chúng tôi có thể thu thập các loại thông tin sau:',
      '• **Thông tin tài khoản**: Họ tên, địa chỉ email khi bạn đăng ký tài khoản.',
      '• **Dữ liệu sức khỏe**: Các chỉ số y tế bạn nhập để dự đoán (tuổi, huyết áp, cholesterol, BMI, đường huyết, nhịp tim...). Đây là dữ liệu bạn tự nguyện cung cấp.',
      '• **Dữ liệu sử dụng**: Lịch sử dự đoán, thời gian truy cập, và các tương tác với hệ thống.',
    ],
  },
  {
    icon: Eye,
    title: '2. Mục đích sử dụng thông tin',
    content: [
      'Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:',
      '• Cung cấp dịch vụ dự đoán nguy cơ bệnh tim mạch.',
      '• Lưu trữ lịch sử dự đoán để bạn theo dõi sức khỏe theo thời gian.',
      '• Cải thiện độ chính xác và chất lượng của mô hình AI.',
      '• Gửi thông báo quan trọng liên quan đến tài khoản và dịch vụ.',
      '• Đảm bảo an ninh và phòng chống truy cập trái phép.',
    ],
  },
  {
    icon: Lock,
    title: '3. Bảo mật dữ liệu',
    content: [
      'Chúng tôi cam kết bảo vệ dữ liệu của bạn bằng các biện pháp sau:',
      '• **Mã hóa dữ liệu**: Mọi dữ liệu truyền tải được mã hóa bằng giao thức HTTPS/TLS.',
      '• **Mật khẩu bảo mật**: Mật khẩu người dùng được mã hóa một chiều (hash) trước khi lưu trữ.',
      '• **Kiểm soát truy cập**: Chỉ những người có thẩm quyền mới được phép truy cập dữ liệu.',
      '• **Xác thực JWT**: Sử dụng JSON Web Token để xác thực phiên đăng nhập an toàn.',
    ],
  },
  {
    icon: UserCheck,
    title: '4. Quyền của người dùng',
    content: [
      'Bạn có các quyền sau đối với dữ liệu cá nhân:',
      '• **Quyền truy cập**: Xem lại toàn bộ dữ liệu cá nhân đã cung cấp.',
      '• **Quyền chỉnh sửa**: Cập nhật thông tin tài khoản bất kỳ lúc nào.',
      '• **Quyền xóa**: Yêu cầu xóa tài khoản và toàn bộ dữ liệu liên quan.',
      '• **Quyền hạn chế xử lý**: Yêu cầu ngừng sử dụng dữ liệu cho mục đích cụ thể.',
      '• **Quyền di chuyển**: Yêu cầu xuất dữ liệu ở định dạng phổ biến.',
    ],
  },
  {
    icon: Bell,
    title: '5. Chia sẻ thông tin với bên thứ ba',
    content: [
      'Chúng tôi **không bán** hoặc cho thuê dữ liệu cá nhân của bạn cho bất kỳ bên thứ ba nào.',
      'Dữ liệu chỉ có thể được chia sẻ trong các trường hợp sau:',
      '• Khi có sự đồng ý rõ ràng từ bạn.',
      '• Khi được yêu cầu bởi cơ quan pháp luật có thẩm quyền.',
      '• Để bảo vệ quyền lợi hợp pháp của HeartAI và người dùng.',
    ],
  },
  {
    icon: Shield,
    title: '6. Lưu trữ và thời gian giữ dữ liệu',
    content: [
      '• Dữ liệu tài khoản được lưu trữ cho đến khi bạn yêu cầu xóa tài khoản.',
      '• Lịch sử dự đoán được giữ lại để phục vụ mục đích theo dõi sức khỏe.',
      '• Sau khi xóa tài khoản, dữ liệu sẽ được xóa hoàn toàn trong vòng 30 ngày.',
      '• Dữ liệu ẩn danh (không định danh) có thể được giữ lại để cải thiện mô hình AI.',
    ],
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Chính sách <span className="text-primary">Bảo mật</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              HeartAI cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn.
              Vui lòng đọc kỹ chính sách bảo mật dưới đây.
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
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-2.5">
                      {section.content.map((line, i) => (
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
            className="mt-10 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Liên hệ về bảo mật</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Nếu bạn có bất kỳ câu hỏi hoặc lo ngại nào về chính sách bảo mật, vui lòng liên hệ:
                </p>
                <a
                  href="mailto:phungnm5866@ut.edu.vn"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
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

export default PrivacyPolicyPage;
