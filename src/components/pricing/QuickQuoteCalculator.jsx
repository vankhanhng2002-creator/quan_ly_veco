import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Check, Sparkles, Printer, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { formatVND, formatNumber } from '../../utils/formatters';

export const QuickQuoteCalculator = ({ onConvertToBooking }) => {
  const { pricingItems, setActiveTab } = useApp();

  const [adultCount, setAdultCount] = useState(15);
  const [childCount, setChildCount] = useState(25);

  // Selected item IDs
  const [selectedTourId, setSelectedTourId] = useState(pricingItems.find(p => p.category === 'tours')?.id || '');
  const [selectedMealId, setSelectedMealId] = useState(pricingItems.find(p => p.category === 'dining')?.id || '');
  const [selectedAccId, setSelectedAccId] = useState('');
  const [selectedWorkshopIds, setSelectedWorkshopIds] = useState([]);

  // Toggle workshop selection
  const toggleWorkshop = (id) => {
    if (selectedWorkshopIds.includes(id)) {
      setSelectedWorkshopIds(selectedWorkshopIds.filter(i => i !== id));
    } else {
      setSelectedWorkshopIds([...selectedWorkshopIds, id]);
    }
  };

  const totalAllPeople = adultCount + childCount;

  // Selected objects
  const selectedTour = pricingItems.find(p => p.id === selectedTourId);
  const selectedMeal = pricingItems.find(p => p.id === selectedMealId);
  const selectedAcc = pricingItems.find(p => p.id === selectedAccId);
  const selectedWorkshops = pricingItems.filter(p => selectedWorkshopIds.includes(p.id));

  // Cost items
  const quoteLines = [];

  // 1. Tour cost
  if (selectedTour) {
    const tourCost = selectedTour.price * totalAllPeople;
    quoteLines.push({
      name: selectedTour.name,
      detail: `${totalAllPeople} khách (${adultCount} lớn + ${childCount} trẻ) x ${formatVND(selectedTour.price)}`,
      total: tourCost,
      type: 'tour'
    });
  }

  // 2. Meal cost
  if (selectedMeal) {
    const mealCost = selectedMeal.price * totalAllPeople;
    quoteLines.push({
      name: selectedMeal.name,
      detail: `${totalAllPeople} suất x ${formatVND(selectedMeal.price)}`,
      total: mealCost,
      type: 'meal'
    });
  }

  // 3. Accommodation cost
  if (selectedAcc) {
    quoteLines.push({
      name: selectedAcc.name,
      detail: `Đơn giá ${formatVND(selectedAcc.price)} / ${selectedAcc.unit}`,
      total: selectedAcc.price,
      type: 'acc'
    });
  }

  // 4. Workshops
  selectedWorkshops.forEach(ws => {
    const wsCost = ws.price * totalAllPeople;
    quoteLines.push({
      name: ws.name,
      detail: `${totalAllPeople} người tham gia x ${formatVND(ws.price)}`,
      total: wsCost,
      type: 'ws'
    });
  });

  // Subtotal
  const subtotal = quoteLines.reduce((sum, item) => sum + item.total, 0);

  // Auto discount for groups:
  let discountRate = 0;
  let discountNote = '';
  if (totalAllPeople >= 80) {
    discountRate = 0.08;
    discountNote = 'Ưu đãi đoàn đông >80 khách (Giảm 8%)';
  } else if (totalAllPeople >= 40) {
    discountRate = 0.05;
    discountNote = 'Ưu đãi đoàn đông >40 khách (Giảm 5%)';
  }

  const discountAmount = Math.round(subtotal * discountRate);
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const costPerPerson = totalAllPeople > 0 ? Math.round(finalTotal / totalAllPeople) : 0;

  const handleCreateBookingFromQuote = () => {
    const services = [];
    if (selectedTour) {
      services.push({
        itemId: selectedTour.id,
        name: selectedTour.name,
        quantity: totalAllPeople,
        price: selectedTour.price,
        total: selectedTour.price * totalAllPeople
      });
    }
    if (selectedMeal) {
      services.push({
        itemId: selectedMeal.id,
        name: selectedMeal.name,
        quantity: totalAllPeople,
        price: selectedMeal.price,
        total: selectedMeal.price * totalAllPeople
      });
    }
    if (selectedAcc) {
      services.push({
        itemId: selectedAcc.id,
        name: selectedAcc.name,
        quantity: 1,
        price: selectedAcc.price,
        total: selectedAcc.price
      });
    }
    selectedWorkshops.forEach(ws => {
      services.push({
        itemId: ws.id,
        name: ws.name,
        quantity: totalAllPeople,
        price: ws.price,
        total: ws.price * totalAllPeople
      });
    });

    const prefillBooking = {
      customerType: 'family',
      organization: 'Đoàn Khách Trải Nghiệm (Báo giá nhanh)',
      customerName: 'Người Đại Diện Đoàn',
      guestCounts: {
        adults: adultCount,
        children: childCount,
        total: totalAllPeople
      },
      services,
      subtotal,
      discountAmount,
      discountNote,
      totalAmount: finalTotal,
      depositAmount: Math.round(finalTotal * 0.5),
      paidAmount: 0,
      remainingAmount: finalTotal,
      paymentStatus: 'unpaid',
      status: 'pending',
      notes: `Báo giá tự động: ${adultCount} người lớn, ${childCount} trẻ em. Bình quân ~${formatVND(costPerPerson)}/khách.`
    };

    onConvertToBooking(prefillBooking);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Calculator className="w-7 h-7 text-rose-500" />
            <span>Công Cụ Báo Giá Nhanh Cho Đoàn Trường & Khách</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tính toán tổng chi phí trọn gói, tự động áp dụng chính sách miễn phí giáo viên và chiết khấu đoàn đông
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left (2 cols): Input & Selection Options */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Headcount */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
              <span>Quy Mô Quân Số Đoàn Khách / Gia Đình</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200">
                <label className="block text-xs font-bold text-blue-900 mb-1">
                  Số Lượng Người Lớn
                </label>
                <input
                  type="number"
                  min="0"
                  value={adultCount}
                  onChange={(e) => setAdultCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-blue-300 font-black text-lg text-blue-950 text-center"
                />
              </div>

              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200">
                <label className="block text-xs font-bold text-emerald-900 mb-1">
                  Số Lượng Trẻ Em
                </label>
                <input
                  type="number"
                  min="0"
                  value={childCount}
                  onChange={(e) => setChildCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-emerald-300 font-black text-lg text-emerald-950 text-center"
                />
              </div>

              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 flex flex-col justify-center text-center">
                <span className="text-xs font-bold text-amber-900 block mb-1">
                  Tổng Quân Số Đoàn
                </span>
                <div className="text-2xl font-black text-amber-950">
                  {totalAllPeople} <span className="text-xs font-semibold text-slate-600">khách</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
              <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Ưu đãi đoàn đông VECO - Học Viện Nông Nghiệp VN:</strong> Đoàn từ 40 khách trở lên chiết khấu 5%, từ 80 khách trở lên chiết khấu 8% trên tổng giá trị tour!
              </span>
            </div>
          </div>

          {/* Step 2: Gói Tour Trải Nghiệm */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">2</span>
              <span>Chọn Gói Tour Trải Nghiệm Sinh Thái Chính</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pricingItems.filter(p => p.category === 'tours').map(tour => {
                const isSelected = selectedTourId === tour.id;
                return (
                  <div
                    key={tour.id}
                    onClick={() => setSelectedTourId(tour.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-sm text-slate-900 leading-snug">{tour.name}</h4>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-3" />}
                      </div>
                    </div>
                    <div className="mt-2 text-emerald-800 font-black text-base">
                      {formatVND(tour.price)} <span className="text-xs font-normal text-slate-500">/{tour.unit}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{tour.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Suất Ăn & Lưu Trú */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">3</span>
              <span>Ẩm Thực Nông Trại & Dịch Vụ Lưu Trú Nghỉ Trưa</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Suất ăn */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Thực Đơn Bữa Ăn Dinh Dưỡng
                </label>
                <select
                  value={selectedMealId}
                  onChange={(e) => setSelectedMealId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- Không đặt ăn tại trung tâm --</option>
                  {pricingItems.filter(p => p.category === 'dining').map(meal => (
                    <option key={meal.id} value={meal.id}>
                      {meal.name} ({formatVND(meal.price)}/{meal.unit})
                    </option>
                  ))}
                </select>
              </div>

              {/* Lưu trú / Nghỉ trưa */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Lưu Trú / Nghỉ Trưa Tập Thể
                </label>
                <select
                  value={selectedAccId}
                  onChange={(e) => setSelectedAccId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- Tự do nghỉ ngơi ngoài trời / lều cá nhân --</option>
                  {pricingItems.filter(p => p.category === 'accommodations').map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({formatVND(acc.price)}/{acc.unit})
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Step 4: Workshops & Hoạt Động Bổ Trợ */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">4</span>
              <span>Đăng Ký Thêm Workshops Kỹ Năng / Trải Nghiệm (Tùy chọn)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pricingItems.filter(p => p.category === 'workshops').map(ws => {
                const isChecked = selectedWorkshopIds.includes(ws.id);
                return (
                  <div
                    key={ws.id}
                    onClick={() => toggleWorkshop(ws.id)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isChecked
                        ? 'border-purple-500 bg-purple-50/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-slate-900 leading-snug">{ws.name}</h5>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                    </div>
                    <div className="mt-2 text-purple-800 font-extrabold text-sm">
                      +{formatVND(ws.price)} <span className="text-[10px] font-normal text-slate-500">/học sinh</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right (1 col): Live Quotation Summary Card */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 shadow-xl sticky top-20 border border-emerald-800 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
              <span className="font-extrabold text-sm tracking-wide text-emerald-300 uppercase">
                BẢNG TỔNG HỢP BÁO GIÁ
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                {totalAllPeople} người
              </span>
            </div>

            {/* Quote items breakdown */}
            <div className="space-y-3 text-xs max-h-72 overflow-y-auto pr-1">
              {quoteLines.map((line, idx) => (
                <div key={idx} className="pb-2 border-b border-emerald-800/60 last:border-0">
                  <div className="font-semibold text-slate-100 flex justify-between">
                    <span>{line.name}</span>
                    <span className="font-bold text-amber-300">{formatVND(line.total)}</span>
                  </div>
                  <div className="text-[11px] text-emerald-300/80 mt-0.5">{line.detail}</div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-3 border-t border-emerald-800 text-xs">
              <div className="flex justify-between text-emerald-200">
                <span>Tạm tính chi phí:</span>
                <span className="font-semibold text-white">{formatVND(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-300 font-bold">
                  <span>Ưu đãi đoàn đông:</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}

              {discountNote && (
                <p className="text-[11px] text-amber-200/90 italic">
                  * {discountNote}
                </p>
              )}

              <div className="pt-2 border-t border-emerald-700/80 flex items-baseline justify-between">
                <span className="font-bold text-sm text-emerald-200">TỔNG TRỌN GÓI:</span>
                <span className="text-2xl font-black text-amber-400 tracking-tight">
                  {formatVND(finalTotal)}
                </span>
              </div>

              {studentCount > 0 && (
                <div className="p-2.5 rounded-xl bg-emerald-900/80 border border-emerald-700/60 text-center text-xs">
                  <span className="text-emerald-200">Chi phí bình quân: </span>
                  <strong className="text-white text-sm font-black">{formatVND(costPerStudent)}</strong>
                  <span className="text-emerald-300 text-[11px]"> / học sinh</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-3">
              <button
                onClick={handleCreateBookingFromQuote}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>Chuyển Thành Đơn Đặt Lịch</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => window.print()}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In Bảng Báo Giá Này</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
