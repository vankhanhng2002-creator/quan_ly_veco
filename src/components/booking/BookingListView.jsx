import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  Search,
  Plus,
  Filter,
  Users,
  GraduationCap,
  Briefcase,
  Home,
  Printer,
  CreditCard,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Phone,
  CheckCircle,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { formatVND, formatDate, getStatusBadge, getCustomerTypeLabel } from '../../utils/formatters';
import { BookingPrintVoucher } from './BookingPrintVoucher';
import { BookingPaymentModal } from './BookingPaymentModal';

export const BookingListView = ({ onOpenCreateModal, onEditBooking }) => {
  const { bookings, updateBooking, deleteBooking, totalRevenue, totalCollectedRevenue, totalReceivable } = useApp();

  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [customerTypeFilter, setCustomerTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected booking for printing or payment
  const [printBooking, setPrintBooking] = useState(null);
  const [payBooking, setPayBooking] = useState(null);

  // Filtered list
  const filteredBookings = bookings.filter((b) => {
    // Status filter
    if (activeStatusFilter !== 'all' && b.status !== activeStatusFilter) return false;
    // Customer type filter
    if (customerTypeFilter !== 'all' && b.customerType !== customerTypeFilter) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchOrg = (b.organization || '').toLowerCase().includes(q);
      const matchName = (b.customerName || '').toLowerCase().includes(q);
      const matchPhone = (b.phone || '').includes(q);
      const matchId = (b.id || '').toLowerCase().includes(q);
      if (!matchOrg && !matchName && !matchPhone && !matchId) return false;
    }
    return true;
  });

  const handleStatusChange = (bookingId, newStatus) => {
    updateBooking(bookingId, { status: newStatus });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar with Title & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-7 h-7 text-emerald-600" />
            <span>Quản Lý Đặt Lịch & Đoàn Trải Nghiệm</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Theo dõi danh sách đoàn trường học, gia đình, dịch vụ lưu trú và tiến độ thanh toán
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Đặt Lịch Đoàn Mới</span>
        </button>
      </div>

      {/* Mini Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Tổng Hợp Đồng</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{formatVND(totalRevenue)}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{bookings.length} đoàn đã tiếp nhận</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase">Đã Thu Thực Tế</div>
            <div className="text-xl font-black text-emerald-700 mt-0.5">{formatVND(totalCollectedRevenue)}</div>
            <div className="text-[11px] text-emerald-600 mt-0.5">Tiền mặt & Chuyển khoản</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-rose-600 uppercase">Còn Phải Thu (Công Nợ)</div>
            <div className="text-xl font-black text-rose-600 mt-0.5">{formatVND(totalReceivable)}</div>
            <div className="text-[11px] text-rose-500 mt-0.5">Thu nốt khi đoàn check-in</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        
        {/* Search & Customer Type Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên trường, khách hàng, SĐT, mã #BK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500">Đối tượng:</span>
            <select
              value={customerTypeFilter}
              onChange={(e) => setCustomerTypeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Tất cả đối tượng</option>
              <option value="school">Trường học</option>
              <option value="family">Hộ gia đình</option>
              <option value="company">Doanh nghiệp</option>
              <option value="individual">Khách lẻ / Khác</option>
            </select>
          </div>

        </div>

        {/* Status Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'Tất Cả', count: bookings.length },
            { id: 'in_progress', label: 'Đang Diễn Ra', count: bookings.filter(b => b.status === 'in_progress').length },
            { id: 'confirmed', label: 'Đã Xác Nhận', count: bookings.filter(b => b.status === 'confirmed').length },
            { id: 'pending', label: 'Chờ Xử Lý', count: bookings.filter(b => b.status === 'pending').length },
            { id: 'completed', label: 'Đã Hoàn Thành', count: bookings.filter(b => b.status === 'completed').length },
            { id: 'cancelled', label: 'Đã Hủy', count: bookings.filter(b => b.status === 'cancelled').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeStatusFilter === tab.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-black/15 font-bold">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Bookings Card List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Không tìm thấy đoàn khách nào</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Thử thay đổi bộ lọc tìm kiếm hoặc tạo một đơn đặt lịch trải nghiệm mới cho trung tâm.
            </p>
            <button
              onClick={onOpenCreateModal}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              + Đặt Lịch Ngay
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => {
            const statusBadge = getStatusBadge(b.status);
            const paymentBadge = getStatusBadge(b.paymentStatus);
            const typeInfo = getCustomerTypeLabel(b.customerType);
            const percentPaid = Math.round((Number(b.paidAmount || 0) / (Number(b.totalAmount || 1))) * 100);

            return (
              <div
                key={b.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Header row */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                      #{b.id}
                    </span>

                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${typeInfo.badgeClass}`}>
                      {typeInfo.label}
                    </span>

                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>

                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${paymentBadge.color}`}>
                      {paymentBadge.label} ({percentPaid}%)
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => setPrintBooking(b)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                      title="In phiếu xác nhận / Hóa đơn"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      <span className="hidden sm:inline">In Phiếu</span>
                    </button>

                    {b.remainingAmount > 0 && (
                      <button
                        onClick={() => setPayBooking(b)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs transition-colors cursor-pointer"
                        title="Ghi nhận thu tiền cọc / thanh toán"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Thu Tiền</span>
                      </button>
                    )}

                    <button
                      onClick={() => onEditBooking(b)}
                      className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 cursor-pointer"
                      title="Chỉnh sửa đơn"
                    >
                      <Edit className="w-4 h-4 text-slate-600" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Bạn có chắc muốn xóa đơn #${b.id} của "${b.organization || b.customerName}"?`)) {
                          deleteBooking(b.id);
                        }
                      }}
                      className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 cursor-pointer"
                      title="Xóa đơn"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Body Details */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
                  
                  {/* Column 1: Organization & Contact */}
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                        {b.organization || b.customerName}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Người đại diện: <strong>{b.customerName}</strong>
                      </p>
                    </div>

                    <div className="space-y-1 text-slate-600 text-xs pt-1">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-semibold text-slate-800">{b.phone}</span>
                      </div>
                      {b.email && (
                        <div className="text-slate-500 truncate">
                          ✉️ {b.email}
                        </div>
                      )}
                      <div className="text-slate-500">
                        👨‍🏫 Phụ trách: <strong>{b.assignedLeader || 'Chưa phân công'}</strong>
                      </div>
                      <div className="text-slate-500">
                        🚩 HDV chính: <strong>{b.leadGuide || 'Tổ Hướng dẫn viên'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Date, Guest counts & Services */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span>{formatDate(b.tourDate)}</span>
                      </div>
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {b.duration}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="font-bold text-slate-800 flex items-center justify-between">
                        <span>Quy mô đoàn:</span>
                        <span className="text-emerald-700 font-extrabold">{b.guestCounts?.total} người</span>
                      </div>
                      <div className="text-slate-500 mt-1 flex gap-3 text-[11px]">
                        <span>• <strong>{b.guestCounts?.adults || 0}</strong> người lớn</span>
                        <span>• <strong>{b.guestCounts?.children || 0}</strong> trẻ em</span>
                      </div>
                    </div>

                    {/* Services summary */}
                    <div className="text-xs space-y-1">
                      <div className="font-semibold text-slate-700">Dịch vụ đã đăng ký:</div>
                      <ul className="space-y-0.5 text-slate-600 text-[11px]">
                        {b.services?.map((s, idx) => (
                          <li key={idx} className="flex justify-between truncate">
                            <span className="truncate">• {s.name} (x{s.quantity})</span>
                            <span className="font-semibold shrink-0 ml-2">{formatVND(s.total)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Column 3: Payment Breakdown & Quick Status Switch */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-slate-600 text-xs">
                        <span>Giá trị hợp đồng:</span>
                        <strong className="text-slate-900 text-sm">{formatVND(b.totalAmount)}</strong>
                      </div>
                      
                      <div className="flex justify-between text-xs text-emerald-700">
                        <span>Đã thanh toán:</span>
                        <strong className="font-bold">{formatVND(b.paidAmount)}</strong>
                      </div>

                      <div className="flex justify-between text-xs text-rose-600 font-bold pt-1 border-t border-slate-200">
                        <span>Còn lại:</span>
                        <span>{formatVND(b.remainingAmount)}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mt-1.5">
                        <div
                          className={`h-full rounded-full transition-all ${
                            percentPaid >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(100, percentPaid)}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick status dropdown */}
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Đổi trạng thái:</span>
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-slate-300 bg-white font-semibold text-xs focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="in_progress">Đang diễn ra</option>
                        <option value="completed">Đã hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </div>

                  </div>

                </div>

                {/* Notes footnote if present */}
                {b.notes && (
                  <div className="px-5 py-2.5 bg-amber-50/60 border-t border-amber-100 text-[11px] text-amber-900 flex items-center gap-1.5">
                    <span className="font-bold">Ghi chú đoàn:</span>
                    <span>{b.notes}</span>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Printable Voucher Modal */}
      {printBooking && (
        <BookingPrintVoucher
          booking={printBooking}
          onClose={() => setPrintBooking(null)}
        />
      )}

      {/* Payment Recording Modal */}
      {payBooking && (
        <BookingPaymentModal
          booking={payBooking}
          onClose={() => setPayBooking(null)}
        />
      )}
    </div>
  );
};
