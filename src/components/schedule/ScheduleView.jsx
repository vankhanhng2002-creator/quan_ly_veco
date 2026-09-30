import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Flag,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatDate, getStatusBadge } from '../../utils/formatters';
import { ScheduleModal } from './ScheduleModal';

export const ScheduleView = () => {
  const { schedules, updateSchedule, deleteSchedule } = useApp();

  const [dateFilter, setDateFilter] = useState('all');
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [expandedSchedules, setExpandedSchedules] = useState({});

  const toggleExpand = (id) => {
    setExpandedSchedules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleStatusChange = (scheduleId, status) => {
    updateSchedule(scheduleId, { status });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-emerald-600" />
            <span>Lịch Trình Hoạt Động & Tour Trải Nghiệm</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Điều phối mốc thời gian, trạm trải nghiệm nông nghiệp và phân công hướng dẫn viên (HDV)
          </p>
        </div>

        <button
          onClick={() => setIsAddScheduleOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm Lịch Trình Tour</span>
        </button>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-4">
        {schedules.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Chưa có lịch trình hoạt động nào</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Khi bạn tạo đơn đặt lịch cho trường học hoặc đoàn khách, lịch trình sẽ tự động được đồng bộ về đây.
            </p>
            <button
              onClick={() => setIsAddScheduleOpen(true)}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              + Tạo Lịch Trình Ngay
            </button>
          </div>
        ) : (
          schedules.map((sch) => {
            const isExpanded = expandedSchedules[sch.id] !== false; // Default expanded
            let statusColor = 'bg-amber-100 text-amber-800 border-amber-300';
            let statusText = 'Sắp Diễn Ra';
            if (sch.status === 'in_progress') {
              statusColor = 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse';
              statusText = 'Đang Diễn Ra';
            } else if (sch.status === 'completed') {
              statusColor = 'bg-slate-100 text-slate-700 border-slate-300';
              statusText = 'Đã Hoàn Thành';
            }

            return (
              <div
                key={sch.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                {/* Schedule Summary Banner */}
                <div className="p-5 bg-gradient-to-r from-slate-50 to-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-xs bg-emerald-800 text-white px-2.5 py-1 rounded-lg">
                        {formatDate(sch.date)}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{sch.startTime} - {sch.endTime}</span>
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${statusColor}`}>
                        {statusText}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                      {sch.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{sch.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Điều phối: <strong>{sch.leader}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        <span>Đội ngũ: <strong>{sch.guideCount} HDV</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Expand Toggle */}
                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    <select
                      value={sch.status}
                      onChange={(e) => handleStatusChange(sch.id, e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="upcoming">Sắp Diễn Ra</option>
                      <option value="in_progress">Đang Diễn Ra</option>
                      <option value="completed">Đã Hoàn Thành</option>
                    </select>

                    <button
                      onClick={() => setEditingSchedule(sch)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer"
                      title="Sửa lịch trình"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Bạn có chắc muốn xóa lịch trình "${sch.title}"?`)) {
                          deleteSchedule(sch.id);
                        }
                      }}
                      className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 cursor-pointer"
                      title="Xóa lịch trình"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleExpand(sch.id)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer"
                      title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Timeline Accordion Content */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-white space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Dòng Thời Gian Chi Tiết Từng Trạm Trải Nghiệm
                    </h4>

                    <div className="relative border-l-2 border-emerald-300 ml-4 pl-6 space-y-4">
                      {sch.timeline?.map((step, idx) => (
                        <div key={idx} className="relative group">
                          {/* Dot */}
                          <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs group-hover:scale-125 transition-transform" />

                          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="font-bold text-xs text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md inline-block">
                                {step.time}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-500">
                                Phụ trách: <strong className="text-slate-700">{step.pic}</strong>
                              </span>
                            </div>

                            <p className="font-bold text-sm text-slate-900 mt-1.5">
                              {step.title}
                            </p>

                            {step.note && (
                              <p className="text-xs text-slate-500 mt-1 italic">
                                💡 Lưu ý: {step.note}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Edit Modal */}
      {editingSchedule && (
        <ScheduleModal
          scheduleToEdit={editingSchedule}
          onClose={() => setEditingSchedule(null)}
        />
      )}

      {/* Add Modal */}
      {isAddScheduleOpen && (
        <ScheduleModal
          scheduleToEdit={null}
          onClose={() => setIsAddScheduleOpen(false)}
        />
      )}
    </div>
  );
};
