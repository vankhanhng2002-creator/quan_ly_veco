import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';

export const BudgetModal = ({ categoryToEdit, onClose }) => {
  const { updateBudgetCategory, addBudgetCategory } = useApp();

  const [formData, setFormData] = useState({
    name: categoryToEdit?.name || '',
    allocated: categoryToEdit?.allocated || 20000000,
    color: categoryToEdit?.color || 'emerald'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.allocated <= 0) {
      alert('Vui lòng nhập tên danh mục và định mức ngân sách!');
      return;
    }

    if (categoryToEdit) {
      updateBudgetCategory(categoryToEdit.id, formData);
    } else {
      addBudgetCategory(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">
              {categoryToEdit ? 'Điều Chỉnh Hạn Mức Ngân Sách' : 'Thêm Danh Mục Ngân Sách Mới'}
            </h3>
            <p className="text-xs text-emerald-200">Thiết lập hạn mức chi tiêu dự toán định kỳ</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Tên Danh Mục Ngân Sách *
            </label>
            <input
              type="text"
              placeholder="VD: Cây Giống & Phân Bón Sinh Thái"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Hạn Mức Dự Toán Cho Phép (VNĐ) *
            </label>
            <input
              type="number"
              min="500000"
              step="500000"
              value={formData.allocated}
              onChange={(e) => setFormData({ ...formData, allocated: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-base focus:ring-2 focus:ring-emerald-500"
              required
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
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md cursor-pointer"
            >
              Lưu Hạn Mức
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
