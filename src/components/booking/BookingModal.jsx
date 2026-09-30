import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Trash2, Calculator, Check, AlertCircle } from 'lucide-react';
import { formatVND } from '../../utils/formatters';

export const BookingModal = ({ bookingToEdit, onClose }) => {
  const { pricingItems, addBooking, updateBooking } = useApp();

  const [formData, setFormData] = useState({
    customerName: '',
    customerType: 'school',
    organization: '',
    phone: '',
    email: '',
    tourDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days ahead by default
    duration: '1 ngày (08:00 - 16:30)',
    guestCounts: {
      adults: 10,
      children: 20,
      total: 30
    },
    services: [],
    subtotal: 0,
    discountAmount: 0,
    discountNote: '',
    totalAmount: 0,
    depositAmount: 0,
    paidAmount: 0,
    remainingAmount: 0,
    paymentStatus: 'unpaid',
    status: 'confirmed',
    assignedLeader: 'Thầy Hoàng Nam (Điều phối trưởng)',
    leadGuide: 'Lê Văn Bách',
    accommodationId: '',
    notes: ''
  });

  // Selected item to add to services
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [serviceQty, setServiceQty] = useState(40);

  // Initialize edit mode or default initial services
  useEffect(() => {
    if (bookingToEdit) {
      setFormData(bookingToEdit);
    } else {
      // Pick a default tour package
      const defaultTour = pricingItems.find(p => p.category === 'tours');
      if (defaultTour) {
        setFormData(prev => {
          const qty = prev.guestCounts.students || 30;
          const initialService = {
            itemId: defaultTour.id,
            name: defaultTour.name,
            quantity: qty,
            price: defaultTour.price,
            total: qty * defaultTour.price
          };
          const sub = initialService.total;
          return {
            ...prev,
            services: [initialService],
            subtotal: sub,
            totalAmount: sub,
            remainingAmount: sub
          };
        });
      }
    }
  }, [bookingToEdit, pricingItems]);

  // Recalculate totals whenever services, guestCounts, or discount changes
  const calculateTotals = (servicesList, discount = formData.discountAmount, deposit = formData.depositAmount) => {
    const sub = servicesList.reduce((sum, s) => sum + Number(s.total || 0), 0);
    const disc = Number(discount || 0);
    const total = Math.max(0, sub - disc);
    const dep = Number(deposit || 0);
    const remaining = Math.max(0, total - dep);

    let payStatus = 'unpaid';
    if (remaining === 0 && total > 0) payStatus = 'paid';
    else if (dep > 0) payStatus = 'partial';

    return {
      subtotal: sub,
      discountAmount: disc,
      totalAmount: total,
      paidAmount: dep,
      remainingAmount: remaining,
      paymentStatus: payStatus
    };
  };

  const handleGuestChange = (field, val) => {
    const num = Math.max(0, parseInt(val) || 0);
    const updatedCounts = {
      ...formData.guestCounts,
      [field]: num
    };
    updatedCounts.total = (updatedCounts.adults || 0) + (updatedCounts.children || 0);

    setFormData(prev => ({
      ...prev,
      guestCounts: updatedCounts
    }));
  };

  const handleAddService = () => {
    if (!selectedServiceId) return;
    const item = pricingItems.find(p => p.id === selectedServiceId);
    if (!item) return;

    const qty = Math.max(1, parseInt(serviceQty) || 1);
    const newService = {
      itemId: item.id,
      name: item.name,
      quantity: qty,
      price: item.price,
      total: qty * item.price
    };

    const newServicesList = [...formData.services, newService];
    const totals = calculateTotals(newServicesList, formData.discountAmount, formData.depositAmount);

    setFormData(prev => ({
      ...prev,
      services: newServicesList,
      ...totals
    }));

    setSelectedServiceId('');
  };

  const handleRemoveService = (index) => {
    const newServicesList = formData.services.filter((_, idx) => idx !== index);
    const totals = calculateTotals(newServicesList, formData.discountAmount, formData.depositAmount);
    setFormData(prev => ({
      ...prev,
      services: newServicesList,
      ...totals
    }));
  };

  const handleDiscountChange = (val) => {
    const disc = Math.max(0, parseInt(val) || 0);
    const totals = calculateTotals(formData.services, disc, formData.depositAmount);
    setFormData(prev => ({ ...prev, ...totals, discountAmount: disc }));
  };

  const handleDepositChange = (val) => {
    const dep = Math.max(0, parseInt(val) || 0);
    const totals = calculateTotals(formData.services, formData.discountAmount, dep);
    setFormData(prev => ({ ...prev, ...totals, depositAmount: dep }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName.trim() && !formData.organization.trim()) {
      alert('Vui lòng nhập tên người đại diện hoặc tên trường / tổ chức!');
      return;
    }

    if (bookingToEdit) {
      updateBooking(bookingToEdit.id, formData);
    } else {
      addBooking(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-bold text-lg">
              {bookingToEdit ? `Chỉnh Sửa Đơn Đặt Lịch #${bookingToEdit.id}` : 'Đặt Lịch Đoàn Mới (Trường Học & Lưu Trú)'}
            </h2>
            <p className="text-xs text-emerald-200">
              Điền thông tin đoàn, phân công nhân sự và chọn các gói dịch vụ trải nghiệm
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Section 1: Thông tin khách hàng & Trường học */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider pb-1 border-b border-slate-200">
              1. Thông Tin Khách Hàng & Trường Học
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Loại Đoàn Khách *
                </label>
                <select
                  value={formData.customerType}
                  onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="school">Trường Học (Mầm non / Cấp 1, 2, 3)</option>
                  <option value="family">Hộ Gia Đình Trải Nghiệm</option>
                  <option value="company">Doanh Nghiệp / Teambuilding</option>
                  <option value="individual">Khách Lẻ / Nhóm Bạn Trẻ</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên Trường Học / Đơn Vị Tổ Chức *
                </label>
                <input
                  type="text"
                  placeholder="VD: Trường Tiểu Học Archimedes (Khối 4)"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Người Đại Diện / Giáo Viên Phụ Trách *
                </label>
                <input
                  type="text"
                  placeholder="VD: Cô Nguyễn Hải Yến"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số Điện Thoại Liên Hệ *
                </label>
                <input
                  type="text"
                  placeholder="VD: 0912 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Nhận Xác Nhận
                </label>
                <input
                  type="email"
                  placeholder="VD: haiyen@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Thời gian & Số lượng khách */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider pb-1 border-b border-slate-200">
              2. Thời Gian & Quy Mô Quân Số
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ngày Đến Trải Nghiệm *
                </label>
                <input
                  type="date"
                  value={formData.tourDate}
                  onChange={(e) => setFormData({ ...formData, tourDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Thời Lượng Hoạt Động
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="1 ngày (08:00 - 16:30)">1 ngày trọn gói (08:00 - 16:30)</option>
                  <option value="Nửa ngày sáng (08:30 - 11:30)">Nửa ngày sáng (08:30 - 11:30)</option>
                  <option value="Nửa ngày chiều (13:30 - 16:30)">Nửa ngày chiều (13:30 - 16:30)</option>
                  <option value="2 ngày 1 đêm (Lưu trú)">2 ngày 1 đêm (Lưu trú qua đêm)</option>
                </select>
              </div>
            </div>

            {/* Guest breakdown: Người lớn / Trẻ em / Tổng */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Số Lượng Người Lớn *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.guestCounts.adults}
                  onChange={(e) => handleGuestChange('adults', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-center"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Số Lượng Trẻ Em *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.guestCounts.children}
                  onChange={(e) => handleGuestChange('children', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-center"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-800 mb-1">
                  Tổng Quân Số Khách
                </label>
                <div className="w-full px-3 py-2 rounded-xl bg-emerald-100 border border-emerald-300 font-black text-emerald-950 text-center text-sm sm:text-base">
                  {formData.guestCounts.total} người
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Gói Dịch Vụ & Bảng Giá */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider pb-1 border-b border-slate-200">
              3. Chọn Gói Dịch Vụ, Lưu Trú & Hoạt Động Trải Nghiệm
            </h3>

            {/* Quick service selector */}
            <div className="flex flex-col sm:flex-row gap-2 items-center bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200">
              <div className="flex-1 w-full">
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- Chọn dịch vụ từ bảng giá V-ECO --</option>
                  {pricingItems.map(item => (
                    <option key={item.id} value={item.id}>
                      [{item.category.toUpperCase()}] {item.name} - {formatVND(item.price)}/{item.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="number"
                  min="1"
                  placeholder="SL"
                  value={serviceQty}
                  onChange={(e) => setServiceQty(e.target.value)}
                  className="w-20 px-3 py-2 rounded-xl border border-emerald-300 bg-white font-bold text-center text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-xl text-xs cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm</span>
                </button>
              </div>
            </div>

            {/* Selected Services Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 font-bold text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Dịch Vụ Đã Chọn</th>
                    <th className="py-2.5 px-3 text-center">Số Lượng</th>
                    <th className="py-2.5 px-3 text-right">Đơn Giá</th>
                    <th className="py-2.5 px-3 text-right">Thành Tiền</th>
                    <th className="py-2.5 px-3 text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {formData.services.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-4 text-center text-slate-400 italic">
                        Chưa chọn dịch vụ nào. Vui lòng chọn từ menu ở trên.
                      </td>
                    </tr>
                  ) : (
                    formData.services.map((srv, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{srv.name}</td>
                        <td className="py-2.5 px-3 text-center font-bold">{srv.quantity}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">{formatVND(srv.price)}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900">{formatVND(srv.total)}</td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveService(idx)}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Thanh toán & Chiết khấu */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider pb-1 border-b border-slate-200">
              4. Tính Toán Thanh Toán & Tiền Cọc
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Số Tiền Chiết Khấu / Ưu Đãi (VNĐ)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={formData.discountAmount}
                    onChange={(e) => handleDiscountChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lý Do Chiết Khấu
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Trường học khối liên kết >100 học sinh"
                    value={formData.discountNote}
                    onChange={(e) => setFormData({ ...formData, discountNote: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Số Tiền Khách Đã Đặt Cọc (VNĐ)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={formData.depositAmount}
                    onChange={(e) => handleDepositChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-emerald-800"
                  />
                </div>
              </div>

              {/* Total Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex justify-between text-slate-600">
                  <span>Tạm tính (chưa giảm):</span>
                  <span className="font-semibold">{formatVND(formData.subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Giảm giá:</span>
                  <span className="font-bold">-{formatVND(formData.discountAmount)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>TỔNG HỢP ĐỒNG:</span>
                  <span className="text-emerald-800 text-base">{formatVND(formData.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Đã cọc:</span>
                  <span className="font-bold text-emerald-700">{formatVND(formData.depositAmount)}</span>
                </div>
                <div className="flex justify-between text-rose-600 font-bold pt-1 border-t border-dashed border-slate-200">
                  <span>Còn lại thu khi check-in:</span>
                  <span className="text-sm">{formatVND(formData.remainingAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Điều phối nhân sự & Ghi chú */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider pb-1 border-b border-slate-200">
              5. Phân Công Điều Phối & Yêu Cầu Riêng
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Trưởng Đoàn Điều Phối Phụ Trách
                </label>
                <input
                  type="text"
                  value={formData.assignedLeader}
                  onChange={(e) => setFormData({ ...formData, assignedLeader: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hướng Dẫn Viên (HDV) Chính
                </label>
                <input
                  type="text"
                  value={formData.leadGuide}
                  onChange={(e) => setFormData({ ...formData, leadGuide: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ghi Chú Đặc Biệt (Y tế, ăn chay, số lượng ủng trẻ em...)
              </label>
              <textarea
                rows="2"
                placeholder="VD: Có 5 học sinh ăn chay, chuẩn bị khay ăn riêng; Mang sẵn 50 nón lá cỡ nhỏ..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md active:scale-95 cursor-pointer transition-all"
            >
              {bookingToEdit ? 'Cập Nhật Đơn' : 'Xác Nhận Tạo Đặt Lịch'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
