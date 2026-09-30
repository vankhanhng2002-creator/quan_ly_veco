import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, DollarSign, CreditCard, Banknote } from 'lucide-react';
import { formatVND } from '../../utils/formatters';

export const BookingPaymentModal = ({ booking, onClose }) => {
  const { recordBookingPayment } = useApp();
  const [amount, setAmount] = useState(booking.remainingAmount || 0);
  const [method, setMethod] = useState('Chuyển khoản (Vietcombank)');
  const [note, setNote] = useState('Thanh toán phần còn lại');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert('Vui lòng nhập số tiền thanh toán hợp lệ!');
      return;
    }
    recordBookingPayment(booking.id, amount, `${method} - ${note}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Ghi Nhận Thu Tiền / Đặt Cọc</h3>
            <p className="text-xs text-emerald-200">Đơn #{booking.id} - {booking.organization || booking.customerName}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Tổng giá trị hợp đồng:</span>
              <strong className="text-slate-900">{formatVND(booking.totalAmount)}</strong>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>Đã thanh toán trước:</span>
              <strong>{formatVND(booking.paidAmount)}</strong>
            </div>
            <div className="flex justify-between text-rose-600 font-bold pt-1 border-t border-slate-200">
              <span>Số tiền còn nợ:</span>
              <strong>{formatVND(booking.remainingAmount)}</strong>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Số Tiền Thu Đợt Này (VNĐ) *
            </label>
            <input
              type="number"
              min="10000"
              step="50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-black text-emerald-800 text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Hình Thức Thanh Toán
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Chuyển khoản (Vietcombank)">Chuyển khoản Ngân hàng (Vietcombank)</option>
              <option value="Chuyển khoản (Techcombank/MBBank)">Chuyển khoản Ngân hàng (Techcombank/MBBank)</option>
              <option value="Tiền mặt tại quầy lễ tân">Tiền mặt tại quầy lễ tân V-ECO</option>
              <option value="Quẹt thẻ POS">Quẹt thẻ POS nội bộ</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Ghi Chú Giao Dịch
            </label>
            <input
              type="text"
              placeholder="VD: Thu nốt 50% còn lại khi đoàn làm thủ tục check-in"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md cursor-pointer"
            >
              Xác Nhận Thu Tiền
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
