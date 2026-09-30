import React from 'react';
import { Printer, X, CheckCircle2, QrCode, Phone, Mail, MapPin } from 'lucide-react';
import { formatVND, formatDate } from '../../utils/formatters';

export const BookingPrintVoucher = ({ booking, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Container */}
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Action bar (no-print) */}
        <div className="no-print bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm">
            <span>Phiếu Xác Nhận Đặt Lịch & Hóa Đơn Trải Nghiệm</span>
            <span className="bg-emerald-500 text-emerald-950 px-2 py-0.5 rounded text-xs">
              #{booking.id}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In Phiếu / Lưu PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Area */}
        <div className="p-8 sm:p-10 text-slate-800 space-y-6 bg-white">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-emerald-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-emerald-900">VECO</span>
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  Học Viện Nông Nghiệp Việt Nam
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Trung Tâm Giáo Dục Trải Nghiệm Sinh Thái & Nông Nghiệp Thực Nghiệm
              </p>
              <div className="text-xs text-slate-500 mt-2 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Khuôn viên Học viện Nông nghiệp Việt Nam, Trâu Quỳ, Gia Lâm, Hà Nội</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Hotline: 0988.777.666 - 024.6261.7555</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Email: veco@vnua.edu.vn | Website: veco.vnua.edu.vn</span>
                </div>
              </div>
            </div>

            <div className="sm:text-right">
              <div className="inline-block px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-900 font-extrabold text-sm mb-2">
                PHIẾU XÁC NHẬN DỊCH VỤ
              </div>
              <div className="text-xs text-slate-500">Mã đơn: <strong className="font-mono text-slate-900">#{booking.id}</strong></div>
              <div className="text-xs text-slate-500">Ngày lập phiếu: <strong>{formatDate(booking.createdAt || new Date().toISOString().split('T')[0])}</strong></div>
              <div className="text-xs text-slate-500">Người lập: <strong>{booking.assignedLeader || 'Bộ phận Điều hành'}</strong></div>
            </div>
          </div>

          {/* Customer & Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Thông Tin Đoàn Khách / Nhà Trường
              </span>
              <p className="text-sm font-bold text-slate-900">{booking.organization || booking.customerName}</p>
              <p className="text-slate-600 mt-0.5">Người đại diện: <strong>{booking.customerName}</strong></p>
              <p className="text-slate-600">Điện thoại liên hệ: <strong>{booking.phone}</strong></p>
              {booking.email && <p className="text-slate-600">Email: {booking.email}</p>}
            </div>

            <div>
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Lịch Trình & Quy Mô Đoàn
              </span>
              <p className="text-slate-700">Ngày đến trải nghiệm: <strong className="text-emerald-800 text-sm font-bold">{formatDate(booking.tourDate)}</strong></p>
              <p className="text-slate-700">Thời lượng: <strong>{booking.duration || 'Trong ngày'}</strong></p>
              <p className="text-slate-700 mt-1">
                Quy mô: <strong className="text-slate-900">{booking.guestCounts?.total} người</strong> (Gồm {booking.guestCounts?.adults || 0} người lớn, {booking.guestCounts?.children || 0} trẻ em)
              </p>
              <p className="text-slate-700">HDV phụ trách: <strong>{booking.leadGuide || 'Đội HDV V-ECO'}</strong></p>
            </div>
          </div>

          {/* Services Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Danh Mục Gói Dịch Vụ Đã Đặt
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">STT</th>
                    <th className="py-2.5 px-3">Nội Dung Hoạt Động / Dịch Vụ</th>
                    <th className="py-2.5 px-3 text-center">Số Lượng</th>
                    <th className="py-2.5 px-3 text-right">Đơn Giá</th>
                    <th className="py-2.5 px-3 text-right">Thành Tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {booking.services && booking.services.map((srv, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3 font-semibold text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{srv.name}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-700">{srv.quantity}</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">{formatVND(srv.price)}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">{formatVND(srv.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
            <div className="text-xs text-slate-500 max-w-sm space-y-1">
              <div className="font-bold text-slate-700">Ghi chú & Yêu cầu đặc biệt:</div>
              <p className="italic bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-amber-900">
                {booking.notes || 'Không có yêu cầu đặc biệt. Chuẩn bị đúng số lượng theo danh mục.'}
              </p>
              {booking.discountNote && (
                <p className="text-emerald-700 font-medium">
                  * Chính sách chiết khấu: {booking.discountNote}
                </p>
              )}
            </div>

            <div className="w-full sm:w-72 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Tổng chi phí dự kiến:</span>
                <span className="font-semibold text-slate-800">{formatVND(booking.subtotal || booking.totalAmount)}</span>
              </div>
              {booking.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Chiết khấu / Ưu đãi:</span>
                  <span className="font-semibold">-{formatVND(booking.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>TỔNG CỘNG:</span>
                <span className="text-emerald-800">{formatVND(booking.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Đã thanh toán / Cọc:</span>
                <span className="font-bold text-emerald-700">{formatVND(booking.paidAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-rose-600 pt-1 border-t border-dashed border-slate-200">
                <span>Còn lại phải thu:</span>
                <span>{formatVND(booking.remainingAmount)}</span>
              </div>
            </div>
          </div>

          {/* Guidelines for Guests */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>LƯU Ý DÀNH CHO ĐOÀN KHÁCH & GIA ĐÌNH TRẢI NGHIỆM</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-emerald-900/90 text-[11px] leading-relaxed">
              <li>Trẻ em và người lớn tham gia hoạt động lội mương bắt cá nên chuẩn bị thêm 01 bộ quần áo dự phòng & khăn tắm.</li>
              <li>Đi giày thể thao hoặc quai hậu mềm, mang mũ nón che nắng khi tham gia các hoạt động nông nghiệp ngoài trời.</li>
              <li>Tuân thủ chỉ dẫn an toàn của Hướng Dẫn Viên sinh thái và biển báo tại các khu vườn thực nghiệm, ao cá.</li>
            </ul>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200 text-center text-xs">
            <div>
              <p className="font-bold text-slate-800">ĐẠI DIỆN ĐOÀN KHÁCH</p>
              <p className="text-[11px] text-slate-400 italic">(Ký & ghi rõ họ tên)</p>
              <div className="h-20" />
              <p className="font-semibold text-slate-700">{booking.customerName}</p>
            </div>
            <div>
              <p className="font-bold text-slate-800">ĐẠI DIỆN VECO - HV NÔNG NGHIỆP VN</p>
              <p className="text-[11px] text-slate-400 italic">(Ký, đóng dấu & ghi rõ họ tên)</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-emerald-700/30 font-black text-xl border-2 border-emerald-600/30 rounded-full px-4 py-2 rotate-[-12deg]">
                  ĐÃ XÁC NHẬN
                </span>
              </div>
              <p className="font-semibold text-slate-700">BAN QUẢN LÝ KHU SINH THÁI</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
