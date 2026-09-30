import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Trash2 } from 'lucide-react';

export const PricingModal = ({ itemToEdit, onClose }) => {
  const { addPricingItem, updatePricingItem, pricingCategories } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    category: 'tours',
    code: '',
    target: 'Mầm non & Tiểu học',
    price: 200000,
    unit: 'khách/học sinh',
    minGuests: 20,
    duration: '1 ngày',
    description: '',
    features: ['Bao gồm dụng cụ trải nghiệm', 'Nước uống thảo mộc'],
    status: 'active'
  });

  const [newFeatureText, setNewFeatureText] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setFormData(itemToEdit);
    }
  }, [itemToEdit]);

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeatureText.trim()]
    }));
    setNewFeatureText('');
  };

  const handleRemoveFeature = (idx) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price <= 0) {
      alert('Vui lòng nhập tên dịch vụ và giá niêm yết!');
      return;
    }

    if (itemToEdit) {
      updatePricingItem(itemToEdit.id, formData);
    } else {
      addPricingItem(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-base">
              {itemToEdit ? `Chỉnh Sửa Gói Dịch Vụ: ${itemToEdit.name}` : 'Thêm Dịch Vụ / Gói Bảng Giá Mới'}
            </h3>
            <p className="text-xs text-emerald-200">Cập nhật đơn giá niêm yết cho các hoạt động và dịch vụ V-ECO</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Phân Loại Dịch Vụ *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              >
                {pricingCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Mã Dịch Vụ
              </label>
              <input
                type="text"
                placeholder="VD: TOUR-1D-ECO"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Tên Gói Dịch Vụ / Hoạt Động *
            </label>
            <input
              type="text"
              placeholder="VD: Tour Nông Dân Nhí Tập Sự"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Đơn Giá Niêm Yết (VNĐ) *
              </label>
              <input
                type="number"
                min="0"
                step="5000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-emerald-900"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Đơn Vị Tính *
              </label>
              <input
                type="text"
                placeholder="khách/học sinh, suất, phòng/đêm..."
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Đối Tượng Phù Hợp
              </label>
              <input
                type="text"
                placeholder="Tiểu học, THCS, Mọi lứa tuổi..."
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Số Lượng Khách Tối Thiểu
              </label>
              <input
                type="number"
                min="1"
                value={formData.minGuests}
                onChange={(e) => setFormData({ ...formData, minGuests: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Mô Tả Chi Tiết Trải Nghiệm
            </label>
            <textarea
              rows="2"
              placeholder="Chi tiết trải nghiệm, lịch trình tóm tắt..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          {/* Features list */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-700">
              Quyền Lợi & Tiện Ích Đính Kèm
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Thêm tiện ích (VD: Bao gồm 01 bữa trưa...)"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl font-bold text-xs cursor-pointer"
              >
                + Thêm
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {formData.features?.map((f, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
                  <span>✓ {f}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-rose-500 hover:text-rose-700 p-0.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
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
              {itemToEdit ? 'Lưu Gói Giá' : 'Thêm Vào Bảng Giá'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
