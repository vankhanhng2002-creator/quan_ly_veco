import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { DashboardView } from './components/dashboard/DashboardView';
import { BookingListView } from './components/booking/BookingListView';
import { BookingModal } from './components/booking/BookingModal';
import { ExpenseBudgetView } from './components/finance/ExpenseBudgetView';
import { ExpenseModal } from './components/finance/ExpenseModal';
import { ScheduleView } from './components/schedule/ScheduleView';
import { PricingView } from './components/pricing/PricingView';
import { QuickQuoteCalculator } from './components/pricing/QuickQuoteCalculator';
import { AccommodationStatusView } from './components/accommodation/AccommodationStatusView';

const MainLayout = () => {
  const { activeTab, setActiveTab } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Global modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState(null);

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const handleOpenCreateBooking = () => {
    setBookingToEdit(null);
    setIsBookingModalOpen(true);
  };

  const handleEditBooking = (booking) => {
    setBookingToEdit(booking);
    setIsBookingModalOpen(true);
  };

  const handleOpenCreateExpense = () => {
    setExpenseToEdit(null);
    setIsExpenseModalOpen(true);
  };

  const handleConvertQuoteToBooking = (prefillData) => {
    setBookingToEdit(prefillData);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenBookingModal={handleOpenCreateBooking}
        onOpenExpenseModal={handleOpenCreateExpense}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView
                onOpenBookingModal={handleOpenCreateBooking}
                onOpenExpenseModal={handleOpenCreateExpense}
              />
            )}

            {activeTab === 'bookings' && (
              <BookingListView
                onOpenCreateModal={handleOpenCreateBooking}
                onEditBooking={handleEditBooking}
              />
            )}

            {activeTab === 'schedules' && (
              <ScheduleView />
            )}

            {activeTab === 'finance' && (
              <ExpenseBudgetView
                onOpenCreateExpense={handleOpenCreateExpense}
              />
            )}

            {activeTab === 'pricing' && (
              <PricingView
                onOpenCalculator={() => setActiveTab('quote-calculator')}
              />
            )}

            {activeTab === 'quote-calculator' && (
              <QuickQuoteCalculator
                onConvertToBooking={handleConvertQuoteToBooking}
              />
            )}

            {activeTab === 'accommodations' && (
              <AccommodationStatusView />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      {isBookingModalOpen && (
        <BookingModal
          bookingToEdit={bookingToEdit}
          onClose={() => {
            setIsBookingModalOpen(false);
            setBookingToEdit(null);
          }}
        />
      )}

      {isExpenseModalOpen && (
        <ExpenseModal
          expenseToEdit={expenseToEdit}
          onClose={() => {
            setIsExpenseModalOpen(false);
            setExpenseToEdit(null);
          }}
        />
      )}

      {/* Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
