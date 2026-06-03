import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import {
  Heart, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle,
  Activity, Shield, Zap, ArrowRight
} from 'lucide-react';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email không hợp lệ';
    if (!form.password) errs.password = 'Vui lòng nhập mật khẩu';
    else if (form.password.length < 6) errs.password = 'Mật khẩu tối thiểu 6 ký tự';
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
      const res = await authService.login(form.email, form.password);
      login(
        { name: form.email.split('@')[0], email: form.email },
        res.data?.token || 'demo-token'
      );
      navigate('/predict');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    login({ name: 'Demo User', email: 'demo@heartai.vn' }, 'demo-token');
    navigate('/predict');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 text-center px-12 max-w-lg">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30 animate-pulse-heart">
            <Heart className="w-14 h-14 text-white" fill="white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Heart<span className="text-red-400">AI</span> Prediction
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Đăng nhập để sử dụng hệ thống dự đoán nguy cơ bệnh tim bằng AI
          </p>

          <div className="space-y-4">
            {[
              { icon: Activity, text: 'Dự đoán nguy cơ bệnh tim chính xác' },
              { icon: Shield, text: 'Bảo mật thông tin sức khỏe tuyệt đối' },
              { icon: Zap, text: 'Kết quả phân tích trong vài giây' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-5 py-3 backdrop-blur-sm border border-white/10">
                <item.icon className="w-5 h-5 text-primary" />
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary/20">
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Heart<span className="text-primary">AI</span></h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Chào mừng trở lại! 👋
            </h2>
            <p className="text-text-secondary">
              Đăng nhập vào tài khoản của bạn để tiếp tục
            </p>
          </div>

          {apiError && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 text-primary text-sm mb-6 animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                  placeholder="example@email.com"
                  className={`input-field pl-12 ${errors.email ? 'input-error' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-primary text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />{errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                  placeholder="••••••••"
                  className={`input-field pl-12 pr-12 ${errors.password ? 'input-error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-primary text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />{errors.password}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                <span className="text-sm text-text-secondary">Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/" className="text-sm text-secondary hover:text-secondary-dark font-medium transition-colors">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Đăng nhập
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-text-muted">hoặc</span>
              </div>
            </div>

            {/* Google Button (UI only) */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-border rounded-xl text-text-primary font-medium hover:bg-gray-50 hover:shadow-card transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Đăng nhập bằng Google
            </button>

            {/* Demo Login */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-secondary/10 text-secondary rounded-xl font-medium hover:bg-secondary/20 transition-all duration-200"
            >
              <Zap className="w-4 h-4" />
              Trải nghiệm Demo (không cần đăng ký)
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-text-secondary text-sm mt-8">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-secondary font-semibold hover:text-secondary-dark transition-colors">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
