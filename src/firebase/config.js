// =============================================================
// Firebase Configuration — VECO Quản Lý Hệ Thống
// =============================================================
// HƯỚNG DẪN CẤU HÌNH:
// 1. Truy cập https://console.firebase.google.com
// 2. Tạo project mới (hoặc chọn project có sẵn)
// 3. Vào Project Settings > General > Your apps > Add app (Web)
// 4. Copy firebaseConfig bên dưới và dán vào đây
// 5. Bật Authentication > Sign-in method > Email/Password và Google
// =============================================================

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// ⚠️ THAY THẾ CÁC GIÁ TRỊ NÀY BẰNG CONFIG THỰC TẾ TỪ FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Export Auth instance
export const auth = getAuth(app);

// Google Provider — cấu hình cho VNUA/VECO
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  hd: 'vnua.edu.vn',   // Gợi ý đăng nhập bằng email @vnua.edu.vn (tuỳ chọn)
  prompt: 'select_account'
});

export default app;
