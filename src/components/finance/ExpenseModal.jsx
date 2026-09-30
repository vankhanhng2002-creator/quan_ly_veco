import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import { formatVND } from '../../utils/formatters';

export const ExpenseModal = ({ expenseToEdit, onClose }) => {
  const { budgetCategories, bookings, addExpense, updateExpense } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: budgetCategories[0]?.id || 'cat-food',
    categoryName: budgetCategories[0]?.name || 'Nguyên Liệu Thực Phẩm & Ăn Uống',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    paidBy: 'Chị Mai (Trưởng Bếp)',
    paymentMethod: 'Chuyển khoản (Vietcombank)',
    relatedBooking: '',
    invoiceNumber: '',
    notes: '',
    status: 'paid'
  });

  useEffect(() => {
    if (expenseToEdit) {
      setFormData(expenseToEdit);
    }
  }, [expenseToEdit]);

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    const cat = budgetCategories.find(c => c.id === catId);
    setFormData(prev => ({
      ...prev,
      category: catId,
      categoryName: cat ? cat.name : ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.amount || Number(formData.amount) <= 0) {
      alert('Vui lòng nhập nội dung chi và số tiền hợp lệ!');
      return;
    }

    if (expenseToEdit) {
      updateExpense(expenseToEdit.id, formData);
    } else {
      addExpense(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        <div className="bg-amber-800 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">
              {expenseToEdit ? `Chỉnh Sửa Phiếu Chi #${expenseToEdit.id}` : 'Lập Phiếu Chi Mới (V-ECO)'}
            </h3>
            <p className="text-xs text-amber-200">
              Ghi nhận chi phí nguyên vật liệu, dụng cụ giáo dục, thù lao nhân sự & bảo trì
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-amber-700 text-amber-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nội Dung Khoản Chi *
            </label>
            <input
              type="text"
              placeholder="VD: Mua 100 nón lá trẻ em & 50 đôi ủng lội mương"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Danh Mục Ngân Sách *
              </label>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500"
              >
                {budgetCategories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Số Tiền Chi (VNĐ) *
              </label>
              <input
                type="number"
                min="1000"
                step="10000"
                placeholder="VD: 2500000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-amber-900 focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Ngày Chi *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Người Thực Hiện Chi
              </label>
              <input
                type="text"
                placeholder="VD: Kế toán Hương / Chị Mai bếp"
                value={formData.paidBy}
                onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Hình Thức Thanh Toán
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              >
                <option value="Chuyển khoản (Vietcombank)">Chuyển khoản (Vietcombank)</option>
                <option value="Chuyển khoản (Techcombank)">Chuyển khoản (Techcombank)</option>
                <option value="Tiền mặt">Tiền mặt từ quỹ lễ tân</option>
                <option value="Thẻ tín dụng công ty">Thẻ tín dụng công ty</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Số Hóa Đơn / Phiếu Thu Đối Tác
              </label>
              <input
                type="text"
                placeholder="VD: HD-2026-990 hoặc BL-01"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Phục Vụ Cho Đoàn Nào (Nếu có)
            </label>
            <select
              value={formData.relatedBooking}
              onChange={(e) => setFormData({ ...formData, relatedBooking: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            >
              <option value="">-- Chi hoạt động chung toàn trung tâm --</option>
              {bookings.map(b => (
                <option key={b.id} value={b.id}>
                  #{b.id} - {b.organization || b.customerName} ({b.tourDate})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Ghi Chú Chi Tiết
            </label>
            <textarea
              rows="2"
              placeholder="Chi tiết nguồn mua hàng, quy cách số lượng..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-md cursor-pointer"
            >
              {expenseToEdit ? 'Lưu Thay Đổi' : 'Lập Phiếu Chi'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
