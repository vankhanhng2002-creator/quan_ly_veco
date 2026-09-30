import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Leaf, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, RefreshCw } from 'lucide-react';

// Google icon SVG (không có trong lucide-react)
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export const LoginPage = () => {
  const { loginWithEmail, loginWithGoogle, resetPassword, authError, setAuthError } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const clearError = () => setAuthError('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    clearError();
    try {
      await loginWithEmail(email, password);
    } catch {
      // Lỗi đã được xử lý trong AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    clearError();
    try {
      await loginWithGoogle();
    } catch {
      // Lỗi đã được xử lý trong AuthContext
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    clearError();
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch {
      // Lỗi đã được xử lý trong AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-100 rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-8 text-white text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 rounded-2xl p-3 backdrop-blur-sm">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">VECO</h1>
            <p className="text-emerald-100 text-sm mt-1 font-medium">Học Viện Nông Nghiệp Việt Nam</p>
            <p className="text-white/70 text-xs mt-2">Hệ thống Quản lý Hoạt động Sinh thái</p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            {mode === 'login' ? (
              <>
                <h2 className="text-lg font-semibold text-slate-800 mb-6 text-center">
                  Đăng nhập hệ thống
                </h2>

                {/* Error message */}
                {authError && (
                  <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Email/Password Form */}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearError(); }}
                        placeholder="email@vnua.edu.vn"
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); clearError(); }}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        tabIndex={-1}
                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => { setMode('reset'); clearError(); setResetSent(false); }}
                      className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !email || !password}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-medium py-2.5 px-4 rounded-lg transition text-sm"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <LogIn className="w-4 h-4" />
                    )}
                    {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400 font-medium">hoặc</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Google Sign In */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-medium py-2.5 px-4 rounded-lg transition text-sm"
                >
                  {isGoogleLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin text-slate-400" />
                  ) : (
                    <GoogleIcon />
                  )}
                  {isGoogleLoading ? 'Đang kết nối...' : 'Đăng nhập bằng Google'}
                </button>
              </>
            ) : (
              /* Reset Password Mode */
              <>
                <button
                  onClick={() => { setMode('login'); clearError(); setResetSent(false); }}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 mb-5 transition"
                >
                  ← Quay lại đăng nhập
                </button>

                <h2 className="text-lg font-semibold text-slate-800 mb-2">
                  Đặt lại mật khẩu
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu.
                </p>

                {authError && (
                  <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {resetSent ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-4 py-4 text-sm text-center">
                    <div className="text-2xl mb-2">📧</div>
                    <p className="font-medium">Email đã được gửi!</p>
                    <p className="text-emerald-600 mt-1">Kiểm tra hộp thư <strong>{email}</strong> để đặt lại mật khẩu.</p>
                  </div>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearError(); }}
                        placeholder="email@vnua.edu.vn"
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-medium py-2.5 px-4 rounded-lg transition text-sm"
                    >
                      {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                      {isLoading ? 'Đang gửi...' : 'Gửi link đặt lại'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <p className="text-xs text-slate-400">
              Chỉ tài khoản được cấp phép mới có thể đăng nhập.
              <br />Liên hệ quản trị viên nếu cần hỗ trợ.
            </p>
          </div>
        </div>

        {/* Version note */}
        <p className="text-center text-xs text-slate-400 mt-4">
          VECO Management System v1.0
        </p>
      </div>
    </div>
  );
};
