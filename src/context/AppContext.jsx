import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialBookings,
  initialExpenses,
  initialBudgetCategories,
  initialSchedules,
  initialPricingItems,
  initialPricingCategories,
  initialAccommodations
} from '../data/initialData';

const AppContext = createContext();

const STORAGE_KEY = 'veco_vnua_mgmt_data_v3';

export const AppProvider = ({ children }) => {
  // Load initial state from localStorage or use defaults
  const loadInitialData = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          bookings: parsed.bookings || initialBookings,
          expenses: parsed.expenses || initialExpenses,
          budgetCategories: parsed.budgetCategories || initialBudgetCategories,
          schedules: parsed.schedules || initialSchedules,
          pricingItems: parsed.pricingItems || initialPricingItems,
          accommodations: parsed.accommodations || initialAccommodations,
        };
      }
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
    return {
      bookings: initialBookings,
      expenses: initialExpenses,
      budgetCategories: initialBudgetCategories,
      schedules: initialSchedules,
      pricingItems: initialPricingItems,
      accommodations: initialAccommodations,
    };
  };

  const initial = loadInitialData();

  const [bookings, setBookings] = useState(initial.bookings);
  const [expenses, setExpenses] = useState(initial.expenses);
  const [budgetCategories, setBudgetCategories] = useState(initial.budgetCategories);
  const [schedules, setSchedules] = useState(initial.schedules);
  const [pricingItems, setPricingItems] = useState(initial.pricingItems);
  const [pricingCategories] = useState(initialPricingCategories);
  const [accommodations, setAccommodations] = useState(initial.accommodations);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [toasts, setToasts] = useState([]);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      const dataToSave = {
        bookings,
        expenses,
        budgetCategories,
        schedules,
        pricingItems,
        accommodations
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [bookings, expenses, budgetCategories, schedules, pricingItems, accommodations]);

  // Recalculate spent in budget categories based on actual expenses
  useEffect(() => {
    setBudgetCategories(prevCats => {
      return prevCats.map(cat => {
        const totalSpent = expenses
          .filter(exp => exp.category === cat.id && exp.status === 'paid')
          .reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
        return { ...cat, spent: totalSpent };
      });
    });
  }, [expenses]);

  // Toast notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- BOOKING ACTIONS ---
  const addBooking = (newBooking) => {
    const id = `BK-2026-${String(bookings.length + 1).padStart(3, '0')}`;
    const bookingWithId = {
      ...newBooking,
      id,
      code: newBooking.code || `BK-${newBooking.customerType?.toUpperCase() || 'GRP'}-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings([bookingWithId, ...bookings]);
    addToast(`Tạo đơn đặt lịch #${bookingWithId.id} thành công!`);

    // Tự động tạo một lịch trình khung nếu chưa có
    if (newBooking.tourDate) {
      const newSchedule = {
        id: `SCH-${Date.now().toString().slice(-4)}`,
        bookingId: bookingWithId.id,
        title: `Đoàn ${newBooking.organization || newBooking.customerName} (${newBooking.guestCounts?.total || 0} khách)`,
        date: newBooking.tourDate,
        startTime: '08:00',
        endTime: '16:30',
        location: newBooking.duration?.includes('2') ? 'Khu Nhà Sàn & Rừng Sinh Thái' : 'Khu Vườn Trải Nghiệm Nông Nghiệp',
        leader: newBooking.assignedLeader || 'Đang phân công',
        guideCount: Math.max(1, Math.ceil((newBooking.guestCounts?.students || 20) / 25)),
        status: 'upcoming',
        timeline: [
          { time: '08:00 - 08:30', title: 'Đón tiếp đoàn & phổ biến nội quy sinh thái', pic: newBooking.leadGuide || 'HDV chính', note: 'Phát trang phục & nước thảo mộc' },
          { time: '08:30 - 11:30', title: 'Hoạt động trải nghiệm theo gói đã đăng ký', pic: 'Tổ Hướng dẫn viên', note: 'Theo phân công tại chỗ' },
          { time: '11:30 - 13:30', title: 'Dùng bữa trưa dinh dưỡng & nghỉ trưa', pic: 'Bộ phận Bếp & Lưu trú', note: 'Kiểm tra vệ sinh thực phẩm' },
          { time: '13:30 - 16:00', title: 'Workshop kỹ năng & tổng kết trao giấy chứng nhận', pic: 'Ban Điều phối', note: 'Chụp hình kỷ niệm toàn đoàn' },
        ]
      };
      setSchedules(prev => [newSchedule, ...prev]);
    }
  };

  const updateBooking = (id, updatedFields) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, ...updatedFields } : b));
    addToast(`Cập nhật đơn #${id} thành công!`);
  };

  const deleteBooking = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
    // Also remove associated schedules
    setSchedules(schedules.filter(s => s.bookingId !== id));
    addToast(`Đã xóa đơn đặt lịch #${id}`, 'info');
  };

  const recordBookingPayment = (bookingId, amount, note = '') => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        const newPaid = Number(b.paidAmount || 0) + Number(amount);
        const newRemaining = Math.max(0, Number(b.totalAmount || 0) - newPaid);
        let newStatus = b.paymentStatus;
        if (newRemaining <= 0) newStatus = 'paid';
        else if (newPaid > 0) newStatus = 'partial';
        return {
          ...b,
          paidAmount: newPaid,
          remainingAmount: newRemaining,
          paymentStatus: newStatus
        };
      }
      return b;
    }));
    addToast(`Đã ghi nhận thanh toán ${new Intl.NumberFormat('vi-VN').format(amount)} ₫ cho đơn #${bookingId}`);
  };

  // --- EXPENSE ACTIONS ---
  const addExpense = (newExpense) => {
    const id = `EXP-2026-${String(expenses.length + 1).padStart(3, '0')}`;
    const code = `CHI-${Date.now().toString().slice(-4)}`;
    const expenseWithId = {
      ...newExpense,
      id,
      code: newExpense.code || code,
      date: newExpense.date || new Date().toISOString().split('T')[0],
      status: newExpense.status || 'paid'
    };
    setExpenses([expenseWithId, ...expenses]);
    addToast(`Thêm phiếu chi ${new Intl.NumberFormat('vi-VN').format(expenseWithId.amount)} ₫ thành công!`);
  };

  const updateExpense = (id, updatedFields) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, ...updatedFields } : e));
    addToast(`Cập nhật phiếu chi #${id} thành công!`);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
    addToast(`Đã xóa phiếu chi #${id}`, 'info');
  };

  // --- BUDGET ACTIONS ---
  const updateBudgetCategory = (id, updatedFields) => {
    setBudgetCategories(budgetCategories.map(c => c.id === id ? { ...c, ...updatedFields } : c));
    addToast('Cập nhật hạn mức ngân sách thành công!');
  };

  const addBudgetCategory = (newCat) => {
    const id = `cat-${Date.now().toString().slice(-4)}`;
    setBudgetCategories([...budgetCategories, { ...newCat, id, spent: 0 }]);
    addToast('Thêm danh mục ngân sách mới thành công!');
  };

  // --- SCHEDULE ACTIONS ---
  const addSchedule = (newSch) => {
    const id = `SCH-${String(schedules.length + 1).padStart(2, '0')}`;
    setSchedules([{ ...newSch, id }, ...schedules]);
    addToast(`Tạo lịch trình hoạt động mới thành công!`);
  };

  const updateSchedule = (id, updatedFields) => {
    setSchedules(schedules.map(s => s.id === id ? { ...s, ...updatedFields } : s));
    addToast('Cập nhật lịch trình thành công!');
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
    addToast('Đã xóa lịch trình', 'info');
  };

  // --- PRICING ACTIONS ---
  const addPricingItem = (newItem) => {
    const id = `pr-${newItem.category?.slice(0, 3) || 'item'}-${Date.now().toString().slice(-4)}`;
    setPricingItems([...pricingItems, { ...newItem, id, status: 'active' }]);
    addToast(`Thêm dịch vụ / gói giá mới thành công!`);
  };

  const updatePricingItem = (id, updatedFields) => {
    setPricingItems(pricingItems.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    addToast('Cập nhật bảng giá thành công!');
  };

  const togglePricingStatus = (id) => {
    setPricingItems(pricingItems.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'active' ? 'inactive' : 'active';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const deletePricingItem = (id) => {
    setPricingItems(pricingItems.filter(p => p.id !== id));
    addToast('Đã xóa mục bảng giá', 'info');
  };

  // --- ACCOMMODATION ACTIONS ---
  const updateAccommodationStatus = (id, status, currentGuest = null) => {
    setAccommodations(accommodations.map(acc => {
      if (acc.id === id) {
        return { ...acc, status, currentGuest };
      }
      return acc;
    }));
    addToast(`Cập nhật trạng thái phòng thành công!`);
  };

  const updateAccommodation = (id, updatedFields) => {
    setAccommodations(accommodations.map(acc => acc.id === id ? { ...acc, ...updatedFields } : acc));
    addToast('Cập nhật thông tin phòng thành công!');
  };

  // --- SYSTEM UTILS: RESET / BACKUP ---
  const resetToDefaultData = () => {
    setBookings(initialBookings);
    setExpenses(initialExpenses);
    setBudgetCategories(initialBudgetCategories);
    setSchedules(initialSchedules);
    setPricingItems(initialPricingItems);
    setAccommodations(initialAccommodations);
    localStorage.removeItem(STORAGE_KEY);
    addToast('Đã khôi phục dữ liệu mẫu sinh thái ban đầu!', 'info');
  };

  const exportBackupJSON = () => {
    const backupData = {
      bookings,
      expenses,
      budgetCategories,
      schedules,
      pricingItems,
      accommodations,
      exportedAt: new Date().toISOString(),
      appName: 'V-ECO Management System'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VECO_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Xuất tệp sao lưu JSON thành công!');
  };

  const importBackupJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.bookings) setBookings(parsed.bookings);
      if (parsed.expenses) setExpenses(parsed.expenses);
      if (parsed.budgetCategories) setBudgetCategories(parsed.budgetCategories);
      if (parsed.schedules) setSchedules(parsed.schedules);
      if (parsed.pricingItems) setPricingItems(parsed.pricingItems);
      if (parsed.accommodations) setAccommodations(parsed.accommodations);
      addToast('Nhập dữ liệu sao lưu thành công!');
    } catch (e) {
      console.error(e);
      addToast('Tệp sao lưu không đúng định dạng JSON!', 'error');
    }
  };

  // --- CALCULATED SUMMARY METRICS ---
  const totalRevenue = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0);

  const totalCollectedRevenue = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + Number(b.paidAmount || 0), 0);

  const totalReceivable = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + Number(b.remainingAmount || 0), 0);

  const totalExpenseAmount = expenses
    .filter(e => e.status === 'paid')
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const netProfit = totalRevenue - totalExpenseAmount;

  const totalAdults = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + Number(b.guestCounts?.adults || 0), 0);

  const totalChildren = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + Number(b.guestCounts?.children || 0), 0);

  const totalAllGuests = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + Number(b.guestCounts?.total || (Number(b.guestCounts?.adults || 0) + Number(b.guestCounts?.children || 0))), 0);

  const totalBudgetAllocated = budgetCategories.reduce((sum, c) => sum + Number(c.allocated || 0), 0);
  const totalBudgetSpent = budgetCategories.reduce((sum, c) => sum + Number(c.spent || 0), 0);

  const value = {
    // State
    bookings,
    expenses,
    budgetCategories,
    schedules,
    pricingItems,
    pricingCategories,
    accommodations,
    activeTab,
    setActiveTab,
    toasts,

    // Metrics
    totalRevenue,
    totalCollectedRevenue,
    totalReceivable,
    totalExpenseAmount,
    netProfit,
    totalAdults,
    totalChildren,
    totalAllGuests,
    totalBudgetAllocated,
    totalBudgetSpent,

    // Actions
    addBooking,
    updateBooking,
    deleteBooking,
    recordBookingPayment,
    addExpense,
    updateExpense,
    deleteExpense,
    updateBudgetCategory,
    addBudgetCategory,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    addPricingItem,
    updatePricingItem,
    togglePricingStatus,
    deletePricingItem,
    updateAccommodationStatus,
    resetToDefaultData,
    exportBackupJSON,
    importBackupJSON,
    addToast,
    removeToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
