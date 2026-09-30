import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BedDouble,
  Pencil,
  X
} from 'lucide-react';
import { formatVND, getStatusBadge } from '../../utils/formatters';

export const AccommodationStatusView = () => {
  const { accommodations, updateAccommodationStatus, updateAccommodation } = useApp();

  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [accommodationToEdit, setAccommodationToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  const openEditModal = (accommodation) => {
    setAccommodationToEdit(accommodation);
    setEditFormData({
      code: accommodation.code || '',
      name: accommodation.name || '',
      type: accommodation.type || 'Bungalow',
      capacity: accommodation.capacity || '',
      pricePerNight: accommodation.pricePerNight || 0
    });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    updateAccommodation(accommodationToEdit.id, {
      ...editFormData,
      code: editFormData.code.trim(),
      name: editFormData.name.trim(),
      capacity: editFormData.capacity.trim(),
      pricePerNight: Number(editFormData.pricePerNight)
    });
    setAccommodationToEdit(null);
    setEditFormData(null);
  };

  // Filtered accommodations
  const filtered = accommodations.filter(acc => {
    if (filterType !== 'all' && acc.type !== filterType) return false;
    if (filterStatus !== 'all' && acc.status !== filterStatus) return false;
    return true;
  });

  const availableCount = accommodations.filter(a => a.status === 'available').length;
  const occupiedCount = accommodations.filter(a => a.status === 'occupied').length;
  const bookedCount = accommodations.filter(a => a.status === 'booked').length;
  const occupancyPercent = Math.round(((occupiedCount + bookedCount) / accommodations.length) * 100);

  const handleQuickStatusChange = (id, newStatus) => {
    let guest = null;
    if (newStatus === 'occupied') {
      const guestName = prompt('Nhập tên khách hoặc đoàn nhận phòng:', 'Khách nhận phòng trực tiếp');
      if (guestName) guest = guestName;
      else return;
    } else if (newStatus === 'maintenance') {
      const reason = prompt('Nhập lý do dọn dẹp / bảo trì:', 'Dọn phòng & thay chăn ga');
      if (reason) guest = reason;
      else return;
    }
    updateAccommodationStatus(id, newStatus, guest);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <BedDouble className="w-7 h-7 text-amber-600" />
            <span>Sơ Đồ Phòng, Bungalow & Khu Lều Trại</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Theo dõi trạng thái phòng trống, khách đang lưu trú, phòng nghỉ trưa đoàn và tiến độ dọn dẹp
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">Tổng Sức Chứa</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{accommodations.length} căn</div>
          <div className="text-xs text-slate-500 mt-0.5">Bungalow, Sàn, Lều</div>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
          <div className="text-xs font-bold text-emerald-800 uppercase">Phòng / Lều Trống</div>
          <div className="text-2xl font-black text-emerald-800 mt-1">{availableCount}</div>
          <div className="text-xs text-emerald-600 mt-0.5">Sẵn sàng đón khách</div>
        </div>

        <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200">
          <div className="text-xs font-bold text-indigo-800 uppercase">Đang Có Khách</div>
          <div className="text-2xl font-black text-indigo-800 mt-1">{occupiedCount}</div>
          <div className="text-xs text-indigo-600 mt-0.5">Đã check-in</div>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
          <div className="text-xs font-bold text-amber-800 uppercase">Đã Đặt Trước</div>
          <div className="text-2xl font-black text-amber-800 mt-1">{bookedCount}</div>
          <div className="text-xs text-amber-600 mt-0.5">Chờ khách tới</div>
        </div>

        <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 col-span-2 sm:col-span-1">
          <div className="text-xs font-bold text-teal-800 uppercase">Tỷ Lệ Lấp Đầy</div>
          <div className="text-2xl font-black text-teal-800 mt-1">{occupancyPercent}%</div>
          <div className="text-xs text-teal-600 mt-0.5">Công suất hôm nay</div>
        </div>

      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500">Loại phòng:</span>
          {['all', 'Bungalow', 'Nhà Sàn', 'Glamping', 'Nghỉ Trong Ngày'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type === 'all' ? 'Tất Cả Loại' : type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500">Trạng thái:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="available">Phòng trống</option>
            <option value="occupied">Đang có khách</option>
            <option value="booked">Đã đặt trước</option>
            <option value="maintenance">Đang bảo trì / Dọn</option>
          </select>
        </div>
      </div>

      {/* Room Rack Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(acc => {
          const badge = getStatusBadge(acc.status);

          let cardBorder = 'border-slate-200';

          if (acc.status === 'occupied') {
            cardBorder = 'border-indigo-300 ring-2 ring-indigo-100';
          } else if (acc.status === 'booked') {
            cardBorder = 'border-amber-300';
          } else if (acc.status === 'available') {
            cardBorder = 'border-emerald-200';
          } else if (acc.status === 'maintenance') {
            cardBorder = 'border-rose-200';
          }

          return (
            <div
              key={acc.id}
              className={`bg-white rounded-3xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden ${cardBorder}`}
            >
              <div className="p-5 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <span className="text-xs font-black font-mono bg-slate-900 text-white px-2 py-0.5 rounded-md">
                    {acc.code}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => openEditModal(acc)}
                      title={`Chỉnh sửa ${acc.name}`}
                      aria-label={`Chỉnh sửa ${acc.name}`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-slate-900 leading-snug">
                    {acc.name}
                  </h4>
                  <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                    <span>{acc.type}</span>
                    <span className="font-semibold text-slate-700">{acc.capacity}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Đơn giá niêm yết:</span>
                  <strong className="text-emerald-800 font-black">{formatVND(acc.pricePerNight)}</strong>
                </div>

                {/* Current guest info */}
                {acc.currentGuest && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      {acc.status === 'maintenance' ? 'Tình trạng:' : 'Khách hiện tại:'}
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {acc.currentGuest}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Quick Action Switcher */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium text-[11px]">Đổi trạng thái:</span>
                <select
                  value={acc.status}
                  onChange={(e) => handleQuickStatusChange(acc.id, e.target.value)}
                  className="px-2 py-1 rounded-lg border border-slate-300 bg-white font-semibold text-xs focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="available">Phòng trống</option>
                  <option value="occupied">Check-in khách</option>
                  <option value="booked">Khách đã đặt</option>
                  <option value="maintenance">Bảo trì / Dọn</option>
                </select>
              </div>

            </div>
          );
        })}
      </div>

      {accommodationToEdit && editFormData && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-emerald-800 text-white px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold">Chỉnh sửa thông tin phòng</h2>
                <p className="text-xs text-emerald-100 mt-0.5">{accommodationToEdit.name}</p>
              </div>
              <button
                type="button"
                onClick={() => { setAccommodationToEdit(null); setEditFormData(null); }}
                aria-label="Đóng"
                className="p-1.5 rounded-lg hover:bg-emerald-700 text-emerald-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-sm font-semibold text-slate-700">
                  Mã phòng *
                  <input
                    value={editFormData.code}
                    onChange={(event) => setEditFormData({ ...editFormData, code: event.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 font-normal"
                    required
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Loại phòng *
                  <select
                    value={editFormData.type}
                    onChange={(event) => setEditFormData({ ...editFormData, type: event.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 font-normal"
                    required
                  >
                    <option>Bungalow</option>
                    <option>Nhà Sàn</option>
                    <option>Glamping</option>
                    <option>Nghỉ Trong Ngày</option>
                  </select>
                </label>
              </div>

              <label className="block text-sm font-semibold text-slate-700">
                Tên phòng *
                <input
                  value={editFormData.name}
                  onChange={(event) => setEditFormData({ ...editFormData, name: event.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 font-normal"
                  required
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-sm font-semibold text-slate-700">
                  Sức chứa *
                  <input
                    value={editFormData.capacity}
                    onChange={(event) => setEditFormData({ ...editFormData, capacity: event.target.value })}
                    placeholder="Ví dụ: 2-4 khách"
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 font-normal"
                    required
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Giá mỗi đêm (VNĐ) *
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={editFormData.pricePerNight}
                    onChange={(event) => setEditFormData({ ...editFormData, pricePerNight: event.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 font-normal"
                    required
                  />
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setAccommodationToEdit(null); setEditFormData(null); }}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-semibold hover:bg-emerald-700 cursor-pointer"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
