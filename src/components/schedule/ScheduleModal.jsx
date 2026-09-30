import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Trash2, Clock } from 'lucide-react';

export const ScheduleModal = ({ scheduleToEdit, onClose }) => {
  const { addSchedule, updateSchedule, bookings } = useApp();

  const [formData, setFormData] = useState({
    bookingId: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '16:30',
    location: 'Khu Trại Nông Nghiệp Hữu Cơ & Nhà Sàn',
    leader: 'Thầy Hoàng Nam',
    guideCount: 3,
    status: 'upcoming',
    timeline: [
      { time: '08:00 - 08:30', title: 'Đón tiếp đoàn & phát nón lá, áo bà ba', pic: 'Tổ Lễ tân & HDV', note: 'Chuẩn bị nước vối thảo mộc' },
      { time: '08:30 - 10:00', title: 'Tham quan nông trại & trải nghiệm làm nông dân', pic: 'HDV chính', note: 'Thu hoạch rau củ quả' },
      { time: '10:00 - 11:30', title: 'Hoạt động bắt cá lội mương truyền thống', pic: 'Đội cứu hộ & HDV', note: 'Chuẩn bị chậu và rổ' },
      { time: '11:30 - 13:30', title: 'Ăn trưa cơm quê & nghỉ trưa tại nhà sàn', pic: 'Tổ Bếp Hoa Sen', note: 'Kiểm tra vệ sinh ATTP' },
      { time: '13:30 - 15:30', title: 'Workshop làm bánh trôi nước / làm tranh lá', pic: 'Nghệ nhân', note: 'Phát nguyên liệu đầy đủ' },
      { time: '15:30 - 16:30', title: 'Tổng kết trao chứng nhận & tiễn đoàn', pic: 'Trưởng đoàn', note: 'Chụp hình kỷ niệm' }
    ]
  });

  useEffect(() => {
    if (scheduleToEdit) {
      setFormData(scheduleToEdit);
    }
  }, [scheduleToEdit]);

  const handleBookingSelect = (e) => {
    const bId = e.target.value;
    const bk = bookings.find(b => b.id === bId);
    if (bk) {
      setFormData(prev => ({
        ...prev,
        bookingId: bId,
        title: `Đoàn ${bk.organization || bk.customerName} (${bk.guestCounts?.total} khách)`,
        date: bk.tourDate || prev.date,
        leader: bk.assignedLeader || prev.leader,
        guideCount: Math.max(1, Math.ceil((bk.guestCounts?.students || 20) / 25))
      }));
    } else {
      setFormData(prev => ({ ...prev, bookingId: '' }));
    }
  };

  const handleAddTimelineStep = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [
        ...prev.timeline,
        { time: '16:00 - 17:00', title: 'Hoạt động bổ sung', pic: 'HDV', note: '' }
      ]
    }));
  };

  const handleTimelineChange = (idx, field, val) => {
    const newSteps = [...formData.timeline];
    newSteps[idx][field] = val;
    setFormData(prev => ({ ...prev, timeline: newSteps }));
  };

  const handleRemoveStep = (idx) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Vui lòng nhập tên chương trình hoạt động!');
      return;
    }

    if (scheduleToEdit) {
      updateSchedule(scheduleToEdit.id, formData);
    } else {
      addSchedule(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-base">
              {scheduleToEdit ? 'Chỉnh Sửa Lịch Trình Hoạt Động' : 'Lập Lịch Trình & Timeline Tour Trải Nghiệm'}
            </h3>
            <p className="text-xs text-emerald-200">Phân công mốc thời gian, người phụ trách và địa điểm hoạt động</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Gắn Với Đơn Đặt Lịch (Tùy chọn)
              </label>
              <select
                value={formData.bookingId}
                onChange={handleBookingSelect}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Lịch trình độc lập hoặc chọn đơn --</option>
                {bookings.map(b => (
                  <option key={b.id} value={b.id}>
                    #{b.id} - {b.organization || b.customerName} ({b.tourDate})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tên Hoạt Động / Tên Đoàn *
              </label>
              <input
                type="text"
                placeholder="VD: Đoàn Trường Vinschool - Khám Phá Nông Nghiệp"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Ngày Diễn Ra *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Giờ Bắt Đầu</label>
              <input
                type="text"
                placeholder="08:00"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-center"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Giờ Kết Thúc</label>
              <input
                type="text"
                placeholder="16:30"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Địa Điểm Khu Vực</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Trưởng Đoàn Phụ Trách</label>
              <input
                type="text"
                value={formData.leader}
                onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Số Lượng HDV Hỗ Trợ</label>
              <input
                type="number"
                min="1"
                value={formData.guideCount}
                onChange={(e) => setFormData({ ...formData, guideCount: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          {/* Timeline steps */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Mốc Thời Gian Chi Tiết (Timeline Hoạt Động)
              </span>
              <button
                type="button"
                onClick={handleAddTimelineStep}
                className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm Mốc</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {formData.timeline.map((step, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                  <div className="w-28 shrink-0">
                    <input
                      type="text"
                      placeholder="08:00 - 09:00"
                      value={step.time}
                      onChange={(e) => handleTimelineChange(idx, 'time', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-center text-xs"
                    />
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Nội dung hoạt động"
                      value={step.title}
                      onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-xs"
                    />
                  </div>

                  <div className="w-28 shrink-0">
                    <input
                      type="text"
                      placeholder="Người phụ trách"
                      value={step.pic}
                      onChange={(e) => handleTimelineChange(idx, 'pic', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveStep(idx)}
                    className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
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
              {scheduleToEdit ? 'Lưu Thay Đổi' : 'Lưu Lịch Trình'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
