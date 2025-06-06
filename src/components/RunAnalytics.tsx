
import React, { useState } from 'react';
import { TrendingUp, Target, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnalyticsData {
  period: string;
  totalDistance: number;
  totalRuns: number;
  avgPace: string;
  avgBPM: number;
  bestRun: {
    distance: number;
    pace: string;
    date: string;
  };
  trends: {
    distanceChange: number;
    paceChange: number;
    bpmChange: number;
  };
}

const mockAnalytics: Record<string, AnalyticsData> = {
  week: {
    period: 'На этой неделе',
    totalDistance: 28.3,
    totalRuns: 4,
    avgPace: '5:35',
    avgBPM: 128,
    bestRun: {
      distance: 12.5,
      pace: '5:20',
      date: '2024-06-06'
    },
    trends: {
      distanceChange: 12.5,
      paceChange: -8,
      bpmChange: 3
    }
  },
  month: {
    period: 'В этом месяце',
    totalDistance: 124.7,
    totalRuns: 16,
    avgPace: '5:38',
    avgBPM: 126,
    bestRun: {
      distance: 15.2,
      pace: '5:15',
      date: '2024-06-01'
    },
    trends: {
      distanceChange: 8.3,
      paceChange: -12,
      bpmChange: 5
    }
  },
  year: {
    period: 'В этом году',
    totalDistance: 1456.2,
    totalRuns: 187,
    avgPace: '5:42',
    avgBPM: 125,
    bestRun: {
      distance: 21.1,
      pace: '5:05',
      date: '2024-03-15'
    },
    trends: {
      distanceChange: 15.7,
      paceChange: -15,
      bpmChange: 8
    }
  }
};

export const RunAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
  const data = mockAnalytics[selectedPeriod];

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    unit, 
    trend, 
    trendType = 'positive' 
  }: {
    icon: any;
    title: string;
    value: string | number;
    unit?: string;
    trend?: number;
    trendType?: 'positive' | 'negative' | 'neutral';
  }) => (
    <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300 animate-scale-in">
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-lg gradient-purple-orange flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        {trend !== undefined && (
          <div className={`
            flex items-center space-x-1 text-xs px-2 py-1 rounded-full
            ${trendType === 'positive' ? 'bg-green-500/20 text-green-400' : ''}
            ${trendType === 'negative' ? 'bg-red-500/20 text-red-400' : ''}
            ${trendType === 'neutral' ? 'bg-white/20 text-white/70' : ''}
          `}>
            <TrendingUp className={`w-3 h-3 ${trendType === 'negative' ? 'rotate-180' : ''}`} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">
        {value}{unit && <span className="text-lg text-white/70 ml-1">{unit}</span>}
      </div>
      <div className="text-sm text-white/60">{title}</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-effect rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-purple-orange flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Анализ пробежек</h2>
          </div>
          
          <div className="flex space-x-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <Button
                key={period}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className={`
                  text-sm transition-all duration-200
                  ${selectedPeriod === period 
                    ? 'bg-run-orange text-white hover:bg-run-orange/90' 
                    : 'text-white/70 hover:bg-white/20 hover:text-white'
                  }
                `}
              >
                {period === 'week' && 'Неделя'}
                {period === 'month' && 'Месяц'}
                {period === 'year' && 'Год'}
              </Button>
            ))}
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-run-orange mb-2">{data.period}</div>
          <div className="text-white/70">Вот как вы прогрессируете</div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Target}
            title="Общая дистанция"
            value={data.totalDistance}
            unit="км"
            trend={data.trends.distanceChange}
            trendType="positive"
          />
          
          <StatCard
            icon={Zap}
            title="Количество пробежек"
            value={data.totalRuns}
            unit="раз"
          />
          
          <StatCard
            icon={TrendingUp}
            title="Средний темп"
            value={data.avgPace}
            unit="/км"
            trend={Math.abs(data.trends.paceChange)}
            trendType={data.trends.paceChange < 0 ? 'positive' : 'negative'}
          />
          
          <StatCard
            icon={Award}
            title="Средний BPM"
            value={data.avgBPM}
            unit="BPM"
            trend={data.trends.bpmChange}
            trendType="positive"
          />
        </div>
      </div>

      <div className="glass-effect rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-run-orange" />
          <span>Лучшая пробежка</span>
        </h3>
        
        <div className="gradient-purple-pink rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-2xl font-bold text-white mb-1">
                  {data.bestRun.distance} км
                </div>
                <div className="text-white/80">
                  Темп: {data.bestRun.pace}/км
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/70 text-sm">
                  {new Date(data.bestRun.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long'
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full gradient-purple-orange flex items-center justify-center">
                <Award className="w-3 h-3 text-white" />
              </div>
              <span className="text-white/90 text-sm">Личный рекорд скорости!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
