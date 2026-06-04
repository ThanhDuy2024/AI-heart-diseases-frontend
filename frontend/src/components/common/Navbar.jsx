import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Heart, Menu, X, Home, Activity, History,
  User, LogOut, ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location]);

  const publicLinks = [
    { to: '/', label: 'Trang chủ', icon: Home },
    { to: '/login', label: 'Đăng nhập' },
    { to: '/register', label: 'Đăng ký' },
  ];

  const authLinks = [
    { to: '/', label: 'Trang chủ', icon: Home },
    { to: '/predict', label: 'Dự đoán', icon: Activity },
    { to: '/history', label: 'Lịch sử', icon: History },
  ];

  const navLinks = user ? authLinks : publicLinks;

  const isActive = (path) => location.pathname === path;
  const hasDarkHero = ['/', '/privacy', '/terms'].includes(location.pathname);
  // When on pages with dark hero and transparent navbar, use light text
  const isTransparentDark = hasDarkHero && !isScrolled;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-card'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg font-bold leading-tight transition-colors duration-300 ${isTransparentDark ? 'text-white' : 'text-text-primary'}`}>
                Heart<span className={`${isTransparentDark ? 'text-red-400' : 'text-primary'}`}>AI</span>
              </h1>
              <p className={`text-[10px] leading-none transition-colors duration-300 ${isTransparentDark ? 'text-gray-300' : 'text-text-secondary'}`}>
                Prediction System
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? isTransparentDark ? 'bg-white/15 text-white' : 'bg-primary/10 text-primary'
                    : isTransparentDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${isTransparentDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-300 ${isTransparentDark ? 'text-white' : 'text-text-primary'}`}>
                    {user.name || 'User'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isTransparentDark ? 'text-gray-300' : 'text-text-secondary'} ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-card-lg border border-border py-2 z-50 animate-fade-in">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Hồ sơ cá nhân
                      </Link>
                      <hr className="my-1 border-border" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-primary/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm py-2">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2">
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-card-lg border border-border p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.to)
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <hr className="border-border my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <hr className="border-border my-2" />
                  <Link to="/login" className="block w-full text-center btn-primary text-sm">
                    Đăng nhập
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
