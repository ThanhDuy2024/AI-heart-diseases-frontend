import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { getPasswordStrength } from '../utils/validators';
import {
  Heart, User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle,
  Check, Shield, Activity, Zap
} from 'lucide-react';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', agree: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const pwStrength = getPasswordStrength(form.password);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Vui lòng nhập họ tên';
    if (!form.email) errs.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email không hợp lệ';
    if (!form.password) errs.password = 'Vui lòng nhập mật khẩu';
    else if (form.password.length < 6) errs.password = 'Mật khẩu tối thiểu 6 ký tự';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Mật khẩu xác nhận không khớp';
    if (!form.agree) errs.agree = 'Bạn cần đồng ý với điều khoản';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    try {
      await authService.register({ name: form.name, email: form.email, password: form.password });
      login({ name: form.name, email: form.email }, 'demo-token');
      navigate('/predict');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 text-center px-12 max-w-lg">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-secondary/30">
            <Heart className="w-14 h-14 text-white" fill="white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Tham gia Heart<span className="text-red-400">AI</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Tạo tài khoản miễn phí để bắt đầu kiểm tra sức khỏe tim mạch với AI
          </p>

          <div className="space-y-4">
            {[
              { icon: Shield, text: 'Bảo mật thông tin cá nhân' },
              { icon: Activity, text: 'Dự đoán không giới hạn' },
              { icon: Zap, text: 'Miễn phí hoàn toàn' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-5 py-3 backdrop-blur-sm border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center mx-auto mb-3 shadow-lg shadow-secondary/20">
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Heart<span className="text-primary">AI</span></h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Tạo tài khoản mới ✨
            </h2>
            <p className="text-text-secondary">
              Đăng ký để sử dụng miễn phí hệ thống dự đoán bệnh tim
            </p>
          </div>

          {apiError && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 text-primary text-sm mb-6 animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className={`input-field pl-12 ${errors.name ? 'input-error' : ''}`}
                />
              </div>
              {errors.name && <p className="text-primary text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="example@email.com"
                  className={`input-field pl-12 ${errors.email ? 'input-error' : ''}`}
                />
              </div>
              {errors.email && <p className="text-primary text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className={`input-field pl-12 pr-12 ${errors.password ? 'input-error' : ''}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-primary text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}

              {/* Password Strength */}
              {form.password && (
                <div className="mt-2 space-y-1.5 animate-fade-in">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-1.5 flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: i <= (pwStrength.percent / 20)
                            ? pwStrength.color
                            : '#E2E8F0'
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: pwStrength.color }}>
                    {pwStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className={`input-field pl-12 pr-12 ${errors.confirmPassword ? 'input-error' : ''}`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors">
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {form.confirmPassword && form.password === form.confirmPassword && (
                  <div className="absolute right-12 top-1/2 -translate-y-1/2">
                    <Check className="w-5 h-5 text-success" />
                  </div>
                )}
              </div>
              {errors.confirmPassword && <p className="text-primary text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => handleChange('agree', e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">
                  Tôi đồng ý với{' '}
                  <Link to="/" className="text-secondary font-medium hover:underline">điều khoản sử dụng</Link>
                  {' '}và{' '}
                  <Link to="/" className="text-secondary font-medium hover:underline">chính sách bảo mật</Link>
                </span>
              </label>
              {errors.agree && <p className="text-primary text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.agree}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-secondary flex items-center justify-center gap-2 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Đăng ký tài khoản
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-text-secondary text-sm mt-8">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-secondary font-semibold hover:text-secondary-dark transition-colors">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
