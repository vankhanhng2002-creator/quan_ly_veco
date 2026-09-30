import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Tag,
  Plus,
  Search,
  Filter,
  Check,
  Edit,
  Trash2,
  Power,
  Users,
  Clock,
  Sparkles,
  Calculator,
  Compass,
  Home,
  Utensils,
  Layers
} from 'lucide-react';
import { formatVND } from '../../utils/formatters';
import { PricingModal } from './PricingModal';

export const PricingView = ({ onOpenCalculator }) => {
  const {
    pricingItems,
    pricingCategories,
    togglePricingStatus,
    deletePricingItem
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Filtered pricing items
  const filteredItems = pricingItems.filter(item => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (item.name || '').toLowerCase().includes(q);
      const matchCode = (item.code || '').toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Tag className="w-7 h-7 text-emerald-600" />
            <span>Bảng Giá & Danh Mục Gói Dịch Vụ V-ECO</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quản lý đơn giá niêm yết các gói tour trải nghiệm, lưu trú sinh thái, ẩm thực và workshop giáo dục
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Công Cụ Báo Giá</span>
          </button>

          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Dịch Vụ Mới</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên dịch vụ, mã gói..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="text-xs text-slate-500">
            Hiển thị <strong>{filteredItems.length}</strong> / {pricingItems.length} mục dịch vụ
          </div>

        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất Cả ({pricingItems.length})
          </button>

          {pricingCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{cat.name}</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-black/10">
                {pricingItems.filter(p => p.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map(item => {
          const isActive = item.status === 'active';
          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
                isActive ? 'border-slate-200 hover:border-emerald-300' : 'border-slate-200 bg-slate-50/70 opacity-75'
              }`}
            >
              <div className="p-6 space-y-4">
                
                {/* Top Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {item.code && (
                      <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md uppercase">
                        {item.code}
                      </span>
                    )}
                    <div className="text-xs font-semibold text-emerald-700 mt-1">
                      {item.target}
                    </div>
                  </div>

                  <button
                    onClick={() => togglePricingStatus(item.id)}
                    className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
                    }`}
                    title="Bật/Tắt áp dụng"
                  >
                    <Power className="w-3 h-3" />
                    <span>{isActive ? 'Đang Áp Dụng' : 'Tạm Dừng'}</span>
                  </button>
                </div>

                {/* Name & Price */}
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                    {item.name}
                  </h3>
                  <div className="mt-2 text-2xl font-black text-emerald-800 tracking-tight">
                    {formatVND(item.price)}
                    <span className="text-xs font-semibold text-slate-500"> /{item.unit}</span>
                  </div>
                </div>

                {/* Info row */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 py-2 border-y border-slate-100">
                  {item.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                  {item.minGuests > 1 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Tối thiểu: {item.minGuests} khách</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                )}

                {/* Features list */}
                {item.features && item.features.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Bao gồm:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {item.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Bottom Card Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 italic">
                  ID: #{item.id}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-600 cursor-pointer"
                    title="Chỉnh sửa giá"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Bạn có chắc muốn xóa mục "${item.name}" khỏi bảng giá?`)) {
                        deletePricingItem(item.id);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 cursor-pointer"
                    title="Xóa mục"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <PricingModal
          itemToEdit={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}

      {/* Add Modal */}
      {isAddOpen && (
        <PricingModal
          itemToEdit={null}
          onClose={() => setIsAddOpen(false)}
        />
      )}

    </div>
  );
};
