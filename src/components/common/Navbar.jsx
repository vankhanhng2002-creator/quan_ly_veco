import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  CalendarPlus, 
  ReceiptText, 
  Download, 
  Upload, 
  RotateCcw, 
  Bell, 
  Menu, 
  X,
  FileSpreadsheet
} from 'lucide-react';
import { formatVND } from '../../utils/formatters';

export const Navbar = ({ onOpenBookingModal, onOpenExpenseModal, onToggleSidebar, isSidebarOpen }) => {
  const { 
    bookings, 
    expenses, 
    totalReceivable, 
    exportBackupJSON, 
    importBackupJSON, 
    resetToDefaultData, 
    setActiveTab,
    addToast
  } = useApp();

  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  // File import ref
  const fileInputRef = React.useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        importBackupJSON(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
    setShowSettingsMenu(false);
  };

  // Các cảnh báo cần lưu ý
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const unpaidBookings = bookings.filter(b => b.paymentStatus === 'unpaid' || b.paymentStatus === 'partial');

  return (
    <header className="sticky top-0 z-30 bg-emerald-900 text-white shadow-md border-b border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-emerald-100 hover:bg-emerald-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-emerald-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">VECO</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-200 border border-emerald-400/40">
                    Học Viện Nông Nghiệp VN
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/90 hidden sm:block">
                  Trung Tâm Giáo Dục Trải Nghiệm Sinh Thái & Nông Nghiệp
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Nút Tạo Đặt Lịch Nhanh */}
            <button
              onClick={onOpenBookingModal}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Đặt Lịch Đoàn</span>
              <span className="sm:hidden">Đặt Lịch</span>
            </button>

            {/* Nút Thêm Phiếu Chi */}
            <button
              onClick={onOpenExpenseModal}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ReceiptText className="w-4 h-4" />
              <span className="hidden md:inline">Thêm Chi Phí</span>
              <span className="md:hidden">Chi</span>
            </button>

            {/* Thông Báo Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotificationMenu(!showNotificationMenu);
                  setShowSettingsMenu(false);
                }}
                className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors relative"
                title="Thông báo"
              >
                <Bell className="w-5 h-5" />
                {(pendingBookings.length > 0 || unpaidBookings.length > 0) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-emerald-900 animate-pulse" />
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotificationMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-sm text-slate-900">Thông Báo Cần Xử Lý</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      {pendingBookings.length + unpaidBookings.length} việc
                    </span>
                  </div>
                  <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                    {pendingBookings.map(b => (
                      <div 
                        key={b.id} 
                        onClick={() => {
                          setActiveTab('bookings');
                          setShowNotificationMenu(false);
                        }}
                        className="p-2.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-xs cursor-pointer transition-colors"
                      >
                        <p className="font-bold text-amber-900">📌 Chờ xác nhận đơn: #{b.id}</p>
                        <p className="text-amber-800">{b.organization || b.customerName} ({b.guestCounts?.total} khách)</p>
                        <p className="text-slate-500 mt-1">Ngày đến: {b.tourDate}</p>
                      </div>
                    ))}
                    {unpaidBookings.slice(0, 3).map(b => (
                      <div 
                        key={b.id}
                        onClick={() => {
                          setActiveTab('bookings');
                          setShowNotificationMenu(false);
                        }}
                        className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs cursor-pointer transition-colors"
                      >
                        <p className="font-semibold text-slate-800">💳 Công nợ còn lại: {b.customerName}</p>
                        <p className="text-rose-600 font-bold">Còn thiếu: {formatVND(b.remainingAmount)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Menu Hệ Thống (Sao lưu / Phục hồi) */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSettingsMenu(!showSettingsMenu);
                  setShowNotificationMenu(false);
                }}
                className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
                title="Dữ liệu & Cài đặt"
              >
                <FileSpreadsheet className="w-5 h-5" />
              </button>

              {/* Settings Dropdown */}
              {showSettingsMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 p-2 z-50">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                    Quản Lý Dữ Liệu V-ECO
                  </div>
                  <button
                    onClick={() => {
                      exportBackupJSON();
                      setShowSettingsMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-left"
                  >
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>Xuất Sao Lưu Dữ Liệu (JSON)</span>
                  </button>
                  <label className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer text-left">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>Nhập Dữ Liệu Từ File</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".json"
                      className="hidden"
                    />
                  </label>
                  <div className="my-1 border-t border-slate-100"></div>
                  <button
                    onClick={() => {
                      if (window.confirm('Bạn có chắc muốn khôi phục toàn bộ dữ liệu mẫu sinh thái ban đầu? Toàn bộ thay đổi tự tạo sẽ được đặt lại.')) {
                        resetToDefaultData();
                        setShowSettingsMenu(false);
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <RotateCcw className="w-4 h-4 text-rose-600" />
                    <span>Khôi Phục Dữ Liệu Mẫu</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
