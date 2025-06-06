
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RunData {
  date: string;
  distance: number;
  duration: string;
  pace: string;
  songs: number;
}

const mockRunData: RunData[] = [
  { date: '2024-06-01', distance: 5.2, duration: '28:45', pace: '5:32', songs: 12 },
  { date: '2024-06-03', distance: 8.1, duration: '45:20', pace: '5:35', songs: 18 },
  { date: '2024-06-05', distance: 3.5, duration: '19:15', pace: '5:30', songs: 8 },
  { date: '2024-06-06', distance: 12.5, duration: '1:12:30', pace: '5:48', songs: 25 },
];

export const RunCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const getRunDataForDate = (day: number) => {
    const dateStr = formatDate(day);
    return mockRunData.find(run => run.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const selectedRunData = selectedDate ? mockRunData.find(run => run.date === selectedDate) : null;

  return (
    <div className="glass-effect rounded-2xl p-6 text-white animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl gradient-purple-orange flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Календарь пробежек</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('prev')}
            className="w-8 h-8 rounded-full text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-lg font-medium min-w-[140px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('next')}
            className="w-8 h-8 rounded-full text-white hover:bg-white/20"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm text-white/70 py-2 font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(currentDate).map((day, index) => {
          if (!day) {
            return <div key={index} className="h-12" />;
          }

          const runData = getRunDataForDate(day);
          const dateStr = formatDate(day);
          const isSelected = selectedDate === dateStr;

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(isSelected ? null : dateStr)}
              className={`
                h-12 flex items-center justify-center text-sm cursor-pointer rounded-lg transition-all duration-200 hover:scale-105
                ${runData ? 'gradient-purple-orange text-white font-bold hover:animate-pulse-glow' : 'hover:bg-white/10'}
                ${isSelected ? 'ring-2 ring-run-orange' : ''}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {selectedRunData && (
        <div className="mt-6 p-4 rounded-xl bg-white/10 animate-scale-in">
          <h3 className="text-lg font-bold mb-3 text-run-orange">
            Пробежка {new Date(selectedDate!).toLocaleDateString('ru-RU')}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold">{selectedRunData.distance} км</div>
              <div className="text-sm text-white/70">Дистанция</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{selectedRunData.duration}</div>
              <div className="text-sm text-white/70">Время</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{selectedRunData.pace}</div>
              <div className="text-sm text-white/70">Темп/км</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-run-orange">{selectedRunData.songs}</div>
              <div className="text-sm text-white/70">Песен</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
