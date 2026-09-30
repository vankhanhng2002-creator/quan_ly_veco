import fs from 'fs';
import {
  initialBookings,
  initialExpenses,
  initialBudgetCategories,
  initialSchedules,
  initialPricingItems,
  initialAccommodations
} from './src/data/initialData.js';

const backupData = {
  bookings: initialBookings,
  expenses: initialExpenses,
  budgetCategories: initialBudgetCategories,
  schedules: initialSchedules,
  pricingItems: initialPricingItems,
  accommodations: initialAccommodations,
  exportedAt: new Date().toISOString(),
  appName: 'V-ECO Ecological Center Management'
};

fs.writeFileSync('./VECO_He_Thong_Quan_Ly/Du_Lieu_Mau_Ban_Dau.json', JSON.stringify(backupData, null, 2), 'utf-8');

// Also create CSV for pricing
let csv = 'Mã Dịch Vụ,Tên Gói Dịch Vụ,Phân Loại,Đơn Giá (VNĐ),Đơn Vị Tính,Khách Tối Thiểu,Thời Lượng,Đối Tượng,Mô Tả\n';
initialPricingItems.forEach(item => {
  csv += `"${item.code || ''}","${item.name}","${item.category}",${item.price},"${item.unit}",${item.minGuests},"${item.duration || ''}","${item.target || ''}","${(item.description || '').replace(/"/g, '""')}"\n`;
});

fs.writeFileSync('./VECO_He_Thong_Quan_Ly/Bang_Gia_Dich_Vu_VECO.csv', '\uFEFF' + csv, 'utf-8');
console.log('Successfully generated JSON and CSV in VECO_He_Thong_Quan_Ly');
