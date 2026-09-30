import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CalendarDays,
  Compass,
  Wallet,
  Tag,
  BedDouble,
  Calculator,
  Leaf,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, bookings, expenses, budgetCategories } = useApp();

  // Navigation Items
  const navItems = [
    {
      id: 'dashboard',
      label: 'Tổng Quan Điều Hành',
      sub: 'Báo cáo & số liệu chính',
      icon: LayoutDashboard,
      badge: null,
      color: 'emerald'
    },
    {
      id: 'bookings',
      label: 'Quản Lý Đặt Lịch',
      sub: 'Đoàn trường, gia đình & lưu trú',
      icon: CalendarDays,
      badge: bookings.length,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'schedules',
      label: 'Lịch Trình Hoạt Động',
      sub: 'Timeline tour, phân công HDV',
      icon: Compass,
      badge: null
    },
    {
      id: 'finance',
      label: 'Chi Tiêu & Ngân Sách',
      sub: 'Thu - Chi - Hạn mức dự toán',
      icon: Wallet,
      badge: expenses.length,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'pricing',
      label: 'Bảng Giá & Dịch Vụ',
      sub: 'Gói tour, lưu trú, ăn uống & ws',
      icon: Tag,
      badge: null
    },
    {
      id: 'accommodations',
      label: 'Sơ Đồ Lưu Trú',
      sub: 'Bungalow, Nhà sàn & Lều trại',
      icon: BedDouble,
      badge: null
    },
    {
      id: 'quote-calculator',
      label: 'Công Cụ Báo Giá Nhanh',
      sub: 'Tính chi phí tự động cho trường',
      icon: Calculator,
      badge: 'HOT',
      badgeColor: 'bg-rose-500 text-white'
    },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 left-0 bottom-0 z-40 w-72 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 overflow-y-auto flex-1 space-y-1">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Phân Hệ Quản Trị
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-semibold truncate leading-tight">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-400 group-hover:text-slate-500 truncate mt-0.5">
                      {item.sub}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ml-1.5 ${
                      item.badgeColor || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Eco Badge Footer */}
        <div className="p-4 border-t border-slate-100 bg-emerald-50/50 m-3 rounded-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-900">VECO - HV Nông Nghiệp VN</div>
              <div className="text-[11px] text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600 inline" /> Khu Sinh Thái Trải Nghiệm
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
