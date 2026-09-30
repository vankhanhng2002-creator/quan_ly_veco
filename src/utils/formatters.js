// Các tiện ích định dạng tiền tệ, ngày tháng và tính toán cho V-ECO

export const formatVND = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const formatNumber = (num) => {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return new Intl.NumberFormat('vi-VN').format(num);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN');
  } catch {
    return dateStr;
  }
};

export const getStatusBadge = (status) => {
  switch (status) {
    case 'confirmed':
      return { label: 'Đã xác nhận', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    case 'in_progress':
      return { label: 'Đang diễn ra', color: 'bg-blue-100 text-blue-800 border-blue-300' };
    case 'pending':
      return { label: 'Chờ xử lý', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    case 'completed':
      return { label: 'Đã hoàn thành', color: 'bg-slate-100 text-slate-700 border-slate-300' };
    case 'cancelled':
      return { label: 'Đã hủy', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    case 'paid':
      return { label: 'Đã thanh toán', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    case 'partial':
      return { label: 'Đã cọc 1 phần', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    case 'unpaid':
      return { label: 'Chưa thanh toán', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    case 'available':
      return { label: 'Phòng trống', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    case 'occupied':
      return { label: 'Đang có khách', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
    case 'booked':
      return { label: 'Đã được đặt', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    case 'maintenance':
      return { label: 'Đang bảo trì', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    default:
      return { label: status, color: 'bg-slate-100 text-slate-700 border-slate-300' };
  }
};

export const getCustomerTypeLabel = (type) => {
  switch (type) {
    case 'school':
      return { label: 'Trường học / Học sinh', icon: 'GraduationCap', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' };
    case 'family':
      return { label: 'Gia đình trải nghiệm', icon: 'Users', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'company':
      return { label: 'Doanh nghiệp / Teambuilding', icon: 'Briefcase', badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' };
    default:
      return { label: 'Khách lẻ / Đoàn thể', icon: 'User', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  }
};
