import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth phải được dùng bên trong AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Theo dõi trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Đăng nhập bằng Email/Password
  const loginWithEmail = async (email, password) => {
    setAuthError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      setAuthError(getFriendlyError(error.code));
      throw error;
    }
  };

  // Đăng nhập bằng Google
  const loginWithGoogle = async () => {
    setAuthError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      setAuthError(getFriendlyError(error.code));
      throw error;
    }
  };

  // Đăng xuất
  const logout = async () => {
    setAuthError('');
    await signOut(auth);
  };

  // Gửi email đặt lại mật khẩu
  const resetPassword = async (email) => {
    setAuthError('');
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setAuthError(getFriendlyError(error.code));
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    authError,
    setAuthError,
    loginWithEmail,
    loginWithGoogle,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Chuyển lỗi Firebase thành thông báo tiếng Việt
function getFriendlyError(code) {
  const errors = {
    'auth/invalid-credential':      'Email hoặc mật khẩu không đúng.',
    'auth/user-not-found':          'Tài khoản không tồn tại.',
    'auth/wrong-password':          'Mật khẩu không đúng.',
    'auth/too-many-requests':       'Quá nhiều lần thử. Vui lòng thử lại sau.',
    'auth/user-disabled':           'Tài khoản đã bị vô hiệu hóa.',
    'auth/email-already-in-use':    'Email này đã được sử dụng.',
    'auth/weak-password':           'Mật khẩu phải có ít nhất 6 ký tự.',
    'auth/invalid-email':           'Địa chỉ email không hợp lệ.',
    'auth/popup-closed-by-user':    'Đã đóng cửa sổ đăng nhập Google.',
    'auth/popup-blocked':           'Trình duyệt đã chặn cửa sổ popup. Vui lòng cho phép popup.',
    'auth/network-request-failed':  'Lỗi kết nối mạng. Kiểm tra internet và thử lại.',
    'auth/cancelled-popup-request': '',
  };
  return errors[code] || `Lỗi đăng nhập (${code}). Vui lòng thử lại.`;
}
