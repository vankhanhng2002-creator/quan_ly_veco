import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CalendarCheck,
  BedDouble,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Clock,
  Compass,
  CheckCircle,
  Plus
} from 'lucide-react';
import { formatVND, formatNumber, formatDate, getStatusBadge } from '../../utils/formatters';

export const DashboardView = ({ onOpenBookingModal, onOpenExpenseModal }) => {
  const {
    bookings,
    expenses,
    budgetCategories,
    schedules,
    accommodations,
    totalRevenue,
    totalCollectedRevenue,
    totalReceivable,
    totalExpenseAmount,
    netProfit,
    totalAdults,
    totalChildren,
    totalAllGuests,
    totalBudgetAllocated,
    totalBudgetSpent,
    setActiveTab
  } = useApp();

  // Occupancy rate calculation
  const totalRooms = accommodations.length;
  const occupiedOrBooked = accommodations.filter(a => a.status === 'occupied' || a.status === 'booked').length;
  const occupancyRate = Math.round((occupiedOrBooked / totalRooms) * 100);

  // Profit Margin
  const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

  // Upcoming / active schedules
  const activeSchedules = schedules.slice(0, 3);

  // Recent bookings
  const recentBookings = [...bookings].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 4);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/60 border border-emerald-400/30 text-xs font-semibold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>VECO - Học Viện Nông Nghiệp Việt Nam</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Hệ Thống Quản Lý Trải Nghiệm Sinh Thái & Lưu Trú
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
              Theo dõi chi tiêu, ngân sách dự toán, điều phối lịch trình tour, đặt lịch đoàn khách/gia đình và sơ đồ lưu trú trong tầm tay.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBookingModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-sm shadow-lg hover:bg-emerald-50 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-600" />
              <span>Tạo Booking Mới</span>
            </button>
            <button
              onClick={() => setActiveTab('quote-calculator')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900/80 text-white font-semibold text-sm border border-emerald-400/40 transition-all cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4 text-amber-300" />
              <span>Báo Giá Nhanh</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Doanh Thu Hợp Đồng */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Doanh Thu Dự Kiến</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {formatVND(totalRevenue)}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-emerald-600 font-semibold">Đã thu: {formatVND(totalCollectedRevenue)}</span>
              <span className="text-slate-400">Nợ: {formatVND(totalReceivable)}</span>
            </div>
          </div>
        </div>

        {/* Tổng Chi Phí Thực Tế */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chi Tiêu Thực Tế</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {formatVND(totalExpenseAmount)}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-amber-600 font-semibold">
                Đã dùng {Math.round((totalExpenseAmount / (totalBudgetAllocated || 1)) * 100)}% ngân sách
              </span>
              <span className="text-slate-400">Định mức: {formatVND(totalBudgetAllocated)}</span>
            </div>
          </div>
        </div>

        {/* Lợi Nhuận Ròng */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Lợi Nhuận Ròng (P&L)</span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-teal-700 tracking-tight">
              {formatVND(netProfit)}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-teal-600 font-semibold">Tỷ suất LN: {profitMargin}%</span>
              <span className="text-slate-400">{bookings.length} đoàn đặt tour</span>
            </div>
          </div>
        </div>

        {/* Lượt Khách Trải Nghiệm */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Lượt Khách Trải Nghiệm</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {formatNumber(totalAllGuests)} <span className="text-sm font-medium text-slate-400">lượt khách</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-blue-600 font-semibold">{formatNumber(totalAdults)} lớn / {formatNumber(totalChildren)} trẻ</span>
              <span className="text-slate-400">Công suất: {occupancyRate}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols): Ngân Sách Dự Toán & Tài Chính */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card Phân Bổ Ngân Sách Thực Tế */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Tình Hình Thực Hiện Ngân Sách Theo Danh Mục
                </h2>
                <p className="text-xs text-slate-500">
                  So sánh mức chi thực tế so với hạn mức dự toán được duyệt
                </p>
              </div>
              <button
                onClick={() => setActiveTab('finance')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Xem Chi Tiết</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {budgetCategories.map(cat => {
                const percent = Math.min(100, Math.round((cat.spent / (cat.allocated || 1)) * 100));
                let barColor = 'bg-emerald-500';
                let textColor = 'text-emerald-700';
                if (percent > 90) {
                  barColor = 'bg-rose-500';
                  textColor = 'text-rose-700 font-bold';
                } else if (percent > 70) {
                  barColor = 'bg-amber-500';
                  textColor = 'text-amber-700';
                }

                return (
                  <div key={cat.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-700 font-semibold">{cat.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">
                          {formatVND(cat.spent)} / {formatVND(cat.allocated)}
                        </span>
                        <span className={`w-12 text-right ${textColor}`}>
                          {percent}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick alert if any budget > 85% */}
            {budgetCategories.some(c => (c.spent / c.allocated) > 0.85) && (
              <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Cảnh báo ngân sách:</strong> Một số danh mục chi đã vượt 85% hạn mức dự toán tháng. Vui lòng kiểm tra kỹ trước khi duyệt thêm phiếu chi mới.
                </span>
              </div>
            )}
          </div>

          {/* Đoàn Khách Gần Đây (Recent Bookings) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Đoàn Trải Nghiệm & Lưu Trú Đặt Chỗ Gần Đây
                </h2>
                <p className="text-xs text-slate-500">
                  Thông tin các trường học, đoàn khách và tình trạng đặt cọc
                </p>
              </div>
              <button
                onClick={() => setActiveTab('bookings')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Xem Tất Cả ({bookings.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Mã & Tổ Chức</th>
                    <th className="pb-3">Ngày Tham Quan</th>
                    <th className="pb-3">Quy Mô</th>
                    <th className="pb-3">Tổng Tiền</th>
                    <th className="pb-3">Thanh Toán</th>
                    <th className="pb-3 text-right">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentBookings.map((b) => {
                    const statusBadge = getStatusBadge(b.status);
                    const paymentBadge = getStatusBadge(b.paymentStatus);
                    return (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 font-semibold text-slate-900">
                          <div>{b.organization || b.customerName}</div>
                          <span className="text-[11px] text-slate-400 font-mono">#{b.id}</span>
                        </td>
                        <td className="py-3 text-slate-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{formatDate(b.tourDate)}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="font-bold text-slate-800">{b.guestCounts?.total} khách</span>
                          <div className="text-[11px] text-slate-400">
                            {b.guestCounts?.adults || 0} lớn / {b.guestCounts?.children || 0} trẻ
                          </div>
                        </td>
                        <td className="py-3 font-bold text-slate-900">
                          {formatVND(b.totalAmount)}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold border text-[11px] ${paymentBadge.color}`}>
                            {paymentBadge.label}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <span className={`px-2.5 py-1 rounded-full font-bold border text-[11px] ${statusBadge.color}`}>
                            {statusBadge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column (1 col): Lịch Hoạt Động & Sơ Đồ Lưu Trú */}
        <div className="space-y-6">
          
          {/* Lịch Trình Sắp Tới */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Lịch Trình Hôm Nay & Tới</h2>
              </div>
              <button
                onClick={() => setActiveTab('schedules')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                Chi tiết
              </button>
            </div>

            <div className="space-y-3">
              {activeSchedules.map((sch) => (
                <div
                  key={sch.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {formatDate(sch.date)}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {sch.startTime} - {sch.endTime}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {sch.title}
                  </h4>
                  <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <span>Trưởng đoàn: <strong>{sch.leader}</strong></span>
                    <span>{sch.guideCount} HDV phục vụ</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tình Trạng Khu Lưu Trú (Accommodations Status) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-bold text-slate-900">Sơ Đồ Phòng & Lều Trại</h2>
              </div>
              <button
                onClick={() => setActiveTab('accommodations')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                Quản lý
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-2xl font-black text-emerald-800">
                  {accommodations.filter(a => a.status === 'available').length}
                </div>
                <div className="text-[11px] font-semibold text-emerald-700">Phòng/Lều Trống</div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
                <div className="text-2xl font-black text-indigo-800">
                  {accommodations.filter(a => a.status === 'occupied').length}
                </div>
                <div className="text-[11px] font-semibold text-indigo-700">Đang Có Khách</div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <div className="text-2xl font-black text-amber-800">
                  {accommodations.filter(a => a.status === 'booked').length}
                </div>
                <div className="text-[11px] font-semibold text-amber-700">Đã Được Đặt Trước</div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
                <div className="text-2xl font-black text-rose-800">
                  {accommodations.filter(a => a.status === 'maintenance').length}
                </div>
                <div className="text-[11px] font-semibold text-rose-700">Đang Bảo Trì</div>
              </div>
            </div>

            {/* Quick action link */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Tỷ lệ lấp đầy hôm nay:</span>
              <span className="font-extrabold text-emerald-700">{occupancyRate}%</span>
            </div>
          </div>

          {/* Quick Support / Contact Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-green-950 text-white rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Tiêu Chuẩn V-ECO</span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Tất cả hoạt động bắt cá, lội ruộng và trải nghiệm nông nghiệp đều được trang bị dụng cụ bảo hộ an toàn và có nhân viên cứu hộ túc trực 24/7.
            </p>
            <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between text-[11px] text-emerald-300">
              <span>Hotline khẩn cấp: 0988.777.666</span>
              <span>Khu Y Tế: Trạm 1</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
