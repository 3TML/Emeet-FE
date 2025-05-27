"use client";
import React, { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { MdChevronLeft, MdChevronRight, MdClose, MdMenu } from "react-icons/md";

// Types
const EVENT_TYPES = [
  { key: "consultation", label: "Consultation", color: "bg-blue-500" },
  { key: "surgery", label: "Surgery", color: "bg-red-500" },
  { key: "checkup", label: "Check-up", color: "bg-green-500" },
  { key: "meeting", label: "Meeting", color: "bg-purple-500" },
  { key: "training", label: "Training", color: "bg-orange-500" },
];

const SCHEDULE_STATUS = [
  { key: "available", label: "Available", color: "bg-green-500" },
  { key: "busy", label: "Busy", color: "bg-red-500" },
  { key: "tentative", label: "Tentative", color: "bg-yellow-500" },
];

const initialEvents = [
  {
    id: 1,
    title: "Morning Consultation",
    startDate: "2024-03-06T09:00:00",
    endDate: "2024-03-06T10:30:00",
    type: "consultation",
    status: "busy",
    color: "bg-blue-500",
    description: "Regular patient consultation"
  },
  {
    id: 2,
    title: "Cardiac Surgery",
    startDate: "2024-03-13T08:00:00",
    endDate: "2024-03-13T12:00:00",
    type: "surgery",
    status: "busy",
    color: "bg-red-500",
    description: "Scheduled cardiac surgery"
  },
  {
    id: 3,
    title: "Patient Check-up",
    startDate: "2024-03-14T14:00:00",
    endDate: "2024-03-14T15:00:00",
    type: "checkup",
    status: "available",
    color: "bg-green-500",
    description: "Follow-up check-up"
  },
  {
    id: 4,
    title: "Team Meeting",
    startDate: "2024-03-22T10:00:00",
    endDate: "2024-03-22T11:00:00",
    type: "meeting",
    status: "busy",
    color: "bg-purple-500",
    description: "Weekly team meeting"
  },
  {
    id: 5,
    title: "Training Session",
    startDate: "2024-03-22T13:00:00",
    endDate: "2024-03-22T15:00:00",
    type: "training",
    status: "tentative",
    color: "bg-orange-500",
    description: "New procedure training"
  }
];

const expert = {
  name: "Dr. Mitch Bilsky",
  specialty: "Cardiothoracic surgeon",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  rating: 4.8,
  reviews: 60,
};

const getMonthMatrix = (currentMonth: Date) => {
  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(currentMonth);
  const startDate = startOfWeek(startMonth, { weekStartsOn: 0 });
  const endDate = endOfWeek(endMonth, { weekStartsOn: 0 });
  const weeks = [];
  let day = startDate;
  while (day <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    weeks.push(week);
  }
  return weeks;
};

const SchedulePage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2028, 2, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState(initialEvents);
  const [modal, setModal] = useState<{ open: boolean; mode: 'create' | 'edit'; event: any | null; date: string | null }>({ open: false, mode: 'create', event: null, date: null });
  const [filters, setFilters] = useState(EVENT_TYPES.map(t => t.key));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handlers
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleToday = () => setCurrentMonth(new Date());
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setModal({ open: true, mode: 'create', event: null, date: format(date, 'yyyy-MM-dd') });
  };
  const handleEventClick = (event: any) => {
    setModal({ open: true, mode: 'edit', event, date: event.date });
  };
  const handleModalClose = () => setModal({ open: false, mode: 'create', event: null, date: null });
  const handleEventSave = (event: any) => {
    if (modal.mode === 'create') {
      setEvents([...events, { ...event, id: Date.now() }]);
    } else {
      setEvents(events.map(e => (e.id === event.id ? event : e)));
    }
    handleModalClose();
  };
  const handleEventDelete = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
    handleModalClose();
  };
  const handleFilterToggle = (key: string) => {
    setFilters(filters.includes(key) ? filters.filter(f => f !== key) : [...filters, key]);
  };

  // Calendar matrix
  const weeks = getMonthMatrix(currentMonth);

  // Sidebar responsive
  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900">
      {/* Sidebar */}
      <aside className={`transition-all duration-200 bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700 w-72 p-4 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        {/* Mini Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">{format(currentMonth, 'MMMM yyyy')}</span>
            <button onClick={handleSidebarToggle} className="md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700" aria-label="Toggle sidebar">
              <MdClose size={18} />
            </button>
          </div>
          {/* Mini calendar grid */}
          <MiniCalendar currentMonth={currentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setCurrentMonth={setCurrentMonth} />
        </div>
        {/* My Schedules */}
        <div className="mb-6">
          <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">My Schedules</div>
          <ul className="space-y-2">
            {EVENT_TYPES.map(type => (
              <li key={type.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.includes(type.key)}
                  onChange={() => handleFilterToggle(type.key)}
                  className="accent-current"
                  id={`filter-${type.key}`}
                  aria-label={`Toggle ${type.label}`}
                />
                <span className={`w-3 h-3 rounded-full ${type.color}`}></span>
                <label htmlFor={`filter-${type.key}`} className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer">{type.label}</label>
              </li>
            ))}
          </ul>
        </div>
        {/* Categories */}
        <div>
          <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Categories</div>
          <ul className="space-y-2">
            {EVENT_TYPES.map(type => (
              <li key={type.key} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${type.color}`}></span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{type.label}</span>
                <span className="ml-auto text-xs text-gray-400">{events.filter(e => e.type === type.key).length}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Sidebar toggle button for mobile */}
      <button
        className="fixed top-4 left-4 z-30 md:hidden bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 p-2 rounded shadow"
        onClick={handleSidebarToggle}
        aria-label="Open sidebar"
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSidebarToggle()}
      >
        <MdMenu size={20} />
      </button>
      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <img src={expert.avatar} alt={expert.name} className="w-20 h-20 rounded-xl object-cover shadow-md border-4 border-white" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{expert.name}</h2>
            <div className="text-gray-500 dark:text-gray-300 mb-2">{expert.specialty}</div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-pink-500 font-semibold flex items-center gap-1">★ {expert.rating}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500">{expert.reviews} Reviews</span>
            </div>
          </div>
        </div>
        {/* Calendar Controls */}
        <div className="flex items-center gap-2 mb-4">
          <button onClick={handlePrevMonth} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-700" aria-label="Previous month"><MdChevronLeft size={22} /></button>
          <span className="font-semibold text-lg text-gray-700 dark:text-gray-200">{format(currentMonth, 'MMMM yyyy')}</span>
          <button onClick={handleNextMonth} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-700" aria-label="Next month"><MdChevronRight size={22} /></button>
          <button onClick={handleToday} className="ml-4 px-3 py-1 rounded bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600" aria-label="Go to today">Today</button>
        </div>
        {/* Calendar Grid */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-2 md:p-4 overflow-x-auto">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} className="text-xs font-semibold text-gray-400 text-center">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weeks.flat().map((day, idx) => {
              const dayEvents = events.filter(e => {
                const eventStart = new Date(e.startDate);
                return isSameDay(day, eventStart) && filters.includes(e.type);
              });
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isToday = isSameDay(day, new Date());
              return (
                <div
                  key={idx}
                  className={`rounded-lg min-h-[120px] p-1 md:p-2 flex flex-col border transition-all duration-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    isCurrentMonth ? 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800' : 'bg-gray-50 dark:bg-zinc-800 border-gray-100 dark:border-zinc-800 opacity-60'
                  } ${isToday ? 'ring-2 ring-blue-400' : ''}`}
                  tabIndex={0}
                  aria-label={`Day ${format(day, 'd MMMM yyyy')}`}
                  onClick={() => handleDayClick(day)}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleDayClick(day)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${
                      isCurrentMonth ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {format(day, 'd')}
                    </span>
                    <button
                      className="text-xs text-blue-500 hover:underline focus:outline-none"
                      tabIndex={0}
                      aria-label="Add schedule"
                      onClick={e => {
                        e.stopPropagation();
                        setModal({
                          open: true,
                          mode: 'create',
                          event: null,
                          date: format(day, 'yyyy-MM-dd')
                        });
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          setModal({
                            open: true,
                            mode: 'create',
                            event: null,
                            date: format(day, 'yyyy-MM-dd')
                          });
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    {dayEvents.map(ev => {
                      const startTime = format(new Date(ev.startDate), 'HH:mm');
                      const endTime = format(new Date(ev.endDate), 'HH:mm');
                      return (
                        <button
                          key={ev.id}
                          className={`truncate px-2 py-1 rounded text-xs font-semibold text-white ${ev.color} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                          tabIndex={0}
                          aria-label={`Edit schedule: ${ev.title} from ${startTime} to ${endTime}`}
                          onClick={e => {
                            e.stopPropagation();
                            handleEventClick(ev);
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.stopPropagation();
                              handleEventClick(ev);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{ev.title}</span>
                            <span className="text-[10px] opacity-80">{startTime}-{endTime}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      {/* Event Modal */}
      {modal.open && (
        <EventModal
          mode={modal.mode}
          event={modal.event}
          date={modal.date}
          onClose={handleModalClose}
          onSave={handleEventSave}
          onDelete={handleEventDelete}
        />
      )}
    </div>
  );
};

// Mini Calendar Component
const MiniCalendar = ({ currentMonth, selectedDate, setSelectedDate, setCurrentMonth }: any) => {
  const weeks = getMonthMatrix(currentMonth);
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700" aria-label="Previous month"><MdChevronLeft size={16} /></button>
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{format(currentMonth, 'MMM yyyy')}</span>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700" aria-label="Next month"><MdChevronRight size={16} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map(d => (
          <div key={d} className="text-[10px] font-semibold text-gray-400">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          return (
            <button
              key={idx}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isCurrentMonth ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'} ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
              tabIndex={0}
              aria-label={`Select ${format(day, 'd MMMM yyyy')}`}
              onClick={() => setSelectedDate(day)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setSelectedDate(day)}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Update EventForm type
type EventForm = {
  id?: number;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  color: string;
  description: string;
};

// Update EventModal component
const EventModal = ({ mode, event, date, onClose, onSave, onDelete }: any) => {
  const [form, setForm] = useState<EventForm>(event || {
    title: '',
    startDate: date ? `${date}T09:00:00` : '',
    endDate: date ? `${date}T10:00:00` : '',
    type: EVENT_TYPES[0].key,
    status: SCHEDULE_STATUS[0].key,
    color: EVENT_TYPES[0].color,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'type') {
      const found = EVENT_TYPES.find(t => t.key === e.target.value);
      if (found) setForm((f: EventForm) => ({ ...f, color: found.color }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate dates
    if (new Date(form.startDate) >= new Date(form.endDate)) {
      alert('End time must be after start time');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700" aria-label="Close modal"><MdClose size={18} /></button>
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{mode === 'create' ? 'Add Schedule' : 'Edit Schedule'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Start Time</label>
              <input
                name="startDate"
                type="datetime-local"
                value={form.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">End Time</label>
              <input
                name="endDate"
                type="datetime-local"
                value={form.endDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {EVENT_TYPES.map(t => (
                  <option key={t.key} value={t.key}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {SCHEDULE_STATUS.map(s => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {mode === 'create' ? 'Add Schedule' : 'Save Changes'}
            </button>
            {mode === 'edit' && (
              <button
                type="button"
                onClick={() => onDelete(form.id)}
                className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchedulePage; 