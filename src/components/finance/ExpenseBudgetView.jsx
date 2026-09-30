import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  Receipt,
  PieChart,
  Plus,
  Search,
  Filter,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Edit,
  Trash2,
  Calendar,
  CreditCard,
  Building,
  CheckCircle2,
  ArrowDownRight
} from 'lucide-react';
import { formatVND, formatDate } from '../../utils/formatters';
import { ExpenseModal } from './ExpenseModal';
import { BudgetModal } from './BudgetModal';

export const ExpenseBudgetView = ({ onOpenCreateExpense }) => {
  const {
    expenses,
    budgetCategories,
    deleteExpense,
    totalExpenseAmount,
    totalBudgetAllocated,
    totalRevenue,
    netProfit
  } = useApp();

  const [activeTab, setActiveTab] = useState('expenses'); // 'expenses', 'budgets', 'pnl'
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingBudgetCat, setEditingBudgetCat] = useState(null);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);

  // Overall budget usage
  const totalBudgetSpent = budgetCategories.reduce((sum, c) => sum + Number(c.spent || 0), 0);
  const overallUsagePercent = totalBudgetAllocated > 0 ? Math.round((totalBudgetSpent / totalBudgetAllocated) * 100) : 0;
  const budgetRemaining = Math.max(0, totalBudgetAllocated - totalBudgetSpent);

  // Filtered expenses
  const filteredExpenses = expenses.filter(exp => {
    if (selectedCategoryFilter !== 'all' && exp.category !== selectedCategoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (exp.title || '').toLowerCase().includes(q);
      const matchCode = (exp.code || '').toLowerCase().includes(q);
      const matchPayer = (exp.paidBy || '').toLowerCase().includes(q);
      const matchInv = (exp.invoiceNumber || '').toLowerCase().includes(q);
      if (!matchTitle && !matchCode && !matchPayer && !matchInv) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Wallet className="w-7 h-7 text-amber-600" />
            <span>Quản Lý Chi Tiêu & Ngân Sách Dự Toán</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kiểm soát dòng tiền chi thực tế, phân bổ định mức dự toán và theo dõi lợi nhuận trung tâm
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCreateExpense}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Phiếu Chi</span>
          </button>
        </div>
      </div>

      {/* Top 4 Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">Hạn Mức Ngân Sách Dự Toán</div>
          <div className="text-xl font-black text-slate-900 mt-1">{formatVND(totalBudgetAllocated)}</div>
          <div className="text-xs text-slate-500 mt-1">{budgetCategories.length} danh mục phân bổ</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-amber-700 uppercase">Đã Thực Chi Trong Kỳ</div>
          <div className="text-xl font-black text-amber-800 mt-1">{formatVND(totalExpenseAmount)}</div>
          <div className="text-xs text-amber-600 font-semibold mt-1">
            Đạt {overallUsagePercent}% định mức ngân sách
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-emerald-700 uppercase">Hạn Mức Còn Được Chi</div>
          <div className="text-xl font-black text-emerald-800 mt-1">{formatVND(budgetRemaining)}</div>
          <div className="text-xs text-slate-500 mt-1">Khả dụng cho các đoàn tới</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-teal-700 uppercase">Lợi Nhuận Ròng (P&L)</div>
          <div className="text-xl font-black text-teal-800 mt-1">{formatVND(netProfit)}</div>
          <div className="text-xs text-teal-600 font-semibold mt-1">
            Biên LN: {totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0}%
          </div>
        </div>

      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('expenses')}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'expenses'
              ? 'border-amber-600 text-amber-900 bg-amber-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Sổ Phiếu Chi Thực Tế ({expenses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('budgets')}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'budgets'
              ? 'border-emerald-600 text-emerald-900 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Hạn Mức Ngân Sách & Cảnh Báo</span>
        </button>

        <button
          onClick={() => setActiveTab('pnl')}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'pnl'
              ? 'border-teal-600 text-teal-900 bg-teal-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Báo Cáo Lợi Nhuận (P&L)</span>
        </button>
      </div>

      {/* TAB 1: SỔ PHIẾU CHI */}
      {activeTab === 'expenses' && (
        <div className="space-y-4">
          
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm khoản chi, số hóa đơn, người chi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">Danh mục:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">Tất cả danh mục ({expenses.length})</option>
                {budgetCategories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 font-bold text-slate-600 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Ngày / Mã Chi</th>
                    <th className="py-3.5 px-4">Nội Dung Khoản Chi</th>
                    <th className="py-3.5 px-4">Danh Mục</th>
                    <th className="py-3.5 px-4">Người Chi & PTTT</th>
                    <th className="py-3.5 px-4 text-right">Số Tiền</th>
                    <th className="py-3.5 px-4 text-center">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredExpenses.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-slate-400 italic">
                        Không có phiếu chi nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredExpenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono">
                          <div className="font-bold text-slate-900">{formatDate(exp.date)}</div>
                          <span className="text-[11px] text-slate-400">#{exp.code || exp.id}</span>
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          <div>{exp.title}</div>
                          {exp.relatedBooking && (
                            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-normal inline-block mt-0.5">
                              Đoàn: #{exp.relatedBooking}
                            </span>
                          )}
                          {exp.notes && (
                            <p className="text-[11px] text-slate-400 font-normal italic mt-0.5 truncate max-w-xs">
                              {exp.notes}
                            </p>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            {exp.categoryName || exp.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 text-xs">
                          <div className="font-semibold text-slate-800">{exp.paidBy}</div>
                          <div className="text-[11px] text-slate-400">{exp.paymentMethod}</div>
                          {exp.invoiceNumber && (
                            <div className="text-[10px] text-slate-400 font-mono">HĐ: {exp.invoiceNumber}</div>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right font-black text-amber-900 text-sm">
                          {formatVND(exp.amount)}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setEditingExpense(exp)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer"
                              title="Sửa phiếu chi"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Bạn có chắc muốn xóa phiếu chi "${exp.title}"?`)) {
                                  deleteExpense(exp.id);
                                }
                              }}
                              className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 cursor-pointer"
                              title="Xóa phiếu chi"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: HẠN MỨC NGÂN SÁCH */}
      {activeTab === 'budgets' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Hạn Mức Ngân Sách Dự Toán Kỳ Này</h3>
              <p className="text-xs text-slate-500">
                Hệ thống tự động cảnh báo khi chi tiêu đạt trên 70% hoặc vượt 90% ngân sách cho phép
              </p>
            </div>
            <button
              onClick={() => setIsAddBudgetOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Danh Mục</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetCategories.map(cat => {
              const percent = Math.min(100, Math.round((cat.spent / (cat.allocated || 1)) * 100));
              const remaining = Math.max(0, cat.allocated - cat.spent);
              const isOver = cat.spent > cat.allocated;

              let statusBadge = { label: 'An Toàn', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
              let barColor = 'bg-emerald-500';

              if (percent > 90 || isOver) {
                statusBadge = { label: 'Cảnh Báo Nguy Hiểm', color: 'bg-rose-100 text-rose-800 border-rose-300' };
                barColor = 'bg-rose-500';
              } else if (percent > 70) {
                statusBadge = { label: 'Cần Giám Sát', color: 'bg-amber-100 text-amber-800 border-amber-300' };
                barColor = 'bg-amber-500';
              }

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{cat.name}</h4>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border inline-block mt-1 ${statusBadge.color}`}>
                        {statusBadge.label} ({percent}%)
                      </span>
                    </div>
                    <button
                      onClick={() => setEditingBudgetCat(cat)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Sửa Hạn Mức</span>
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Đã Chi Thực Tế:</span>
                      <strong className="text-slate-900 font-black">{formatVND(cat.spent)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Hạn Mức Định Mức:</span>
                      <strong className="text-slate-900 font-bold">{formatVND(cat.allocated)}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[11px]">Còn Lại:</span>
                      <strong className={`font-bold ${isOver ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {formatVND(remaining)}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: BÁO CÁO LỢI NHUẬN (P&L) */}
      {activeTab === 'pnl' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Báo Cáo Tóm Tắt Thu - Chi & Lợi Nhuận</h3>
              <p className="text-xs text-slate-500">
                Phân tích cơ cấu nguồn thu từ dịch vụ giáo dục, lưu trú và các nhóm chi phí vận hành
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Nguồn Thu */}
              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                  <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>CƠ CẤU DOANH THU HỢP ĐỒNG</span>
                  </h4>
                  <span className="font-black text-emerald-900">{formatVND(totalRevenue)}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-slate-700">1. Các Gói Tour Trải Nghiệm Giáo Dục</span>
                    <span className="font-bold text-slate-900">~65%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-slate-700">2. Dịch Vụ Lưu Trú Sinh Thái (Bungalow/Nhà sàn)</span>
                    <span className="font-bold text-slate-900">~18%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-slate-700">3. Ẩm Thực Nông Trại & BBQ Tối</span>
                    <span className="font-bold text-slate-900">~12%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-700">4. Workshop Gốm, Trồng Cây & Dịch Vụ Khác</span>
                    <span className="font-bold text-slate-900">~5%</span>
                  </div>
                </div>
              </div>

              {/* Nhóm Chi */}
              <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                  <h4 className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-amber-600" />
                    <span>CƠ CẤU CHI PHÍ VẬN HÀNH</span>
                  </h4>
                  <span className="font-black text-amber-900">{formatVND(totalExpenseAmount)}</span>
                </div>

                <div className="space-y-2 text-xs">
                  {budgetCategories.map(cat => (
                    <div key={cat.id} className="flex justify-between py-1 border-b border-amber-100 last:border-0">
                      <span className="text-slate-700">{cat.name}</span>
                      <span className="font-bold text-slate-900">{formatVND(cat.spent)}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Final P&L Summary */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-800 to-emerald-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-teal-200 uppercase font-bold tracking-wider">
                  KẾT QUẢ KINH DOANH TRUNG TÂM SINH THÁI
                </span>
                <div className="text-2xl sm:text-3xl font-black mt-1">
                  Lợi Nhuận Ròng: {formatVND(netProfit)}
                </div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-center sm:text-right">
                <div className="text-xs text-teal-200">Tỷ suất lợi nhuận / Doanh thu</div>
                <div className="text-xl font-black text-amber-300">
                  {totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Expense Modal */}
      {editingExpense && (
        <ExpenseModal
          expenseToEdit={editingExpense}
          onClose={() => setEditingExpense(null)}
        />
      )}

      {/* Edit Budget Modal */}
      {editingBudgetCat && (
        <BudgetModal
          categoryToEdit={editingBudgetCat}
          onClose={() => setEditingBudgetCat(null)}
        />
      )}

      {/* Add New Budget Category Modal */}
      {isAddBudgetOpen && (
        <BudgetModal
          categoryToEdit={null}
          onClose={() => setIsAddBudgetOpen(false)}
        />
      )}

    </div>
  );
};
