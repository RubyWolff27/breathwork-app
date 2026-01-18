'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { WeeklyMetrics, BaselineMetrics } from '@/types';

interface ProgressChartProps {
  baseline: BaselineMetrics;
  weeklyMetrics: WeeklyMetrics[];
  metric: 'boltScore' | 'co2Tolerance' | 'restingBreathRate';
  title: string;
  unit: string;
  color?: string;
}

export default function ProgressChart({
  baseline,
  weeklyMetrics,
  metric,
  title,
  unit,
  color = '#3b82f6',
}: ProgressChartProps) {
  // Prepare data with baseline as week 0
  const data = [
    {
      week: 'Baseline',
      value: baseline[metric] || 0,
    },
    ...weeklyMetrics
      .sort((a, b) => a.week - b.week)
      .map((m) => ({
        week: `Week ${m.week}`,
        value: m[metric],
      })),
  ];

  // Calculate improvement
  const latestValue = data[data.length - 1]?.value || 0;
  const baselineValue = data[0]?.value || 0;
  const improvement =
    baselineValue > 0
      ? ((latestValue - baselineValue) / baselineValue) * 100
      : 0;

  // For breath rate, lower is better
  const isPositive = metric === 'restingBreathRate' ? improvement < 0 : improvement > 0;

  return (
    <div className="bg-breath-card rounded-2xl p-4 border border-white/5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-breath-text">{title}</h3>
          <p className="text-sm text-breath-muted">
            Current: {latestValue} {unit}
          </p>
        </div>
        {data.length > 1 && (
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isPositive
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/20 text-rose-400'
            }`}
          >
            {improvement > 0 ? '+' : ''}
            {improvement.toFixed(1)}%
          </div>
        )}
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="week"
              tick={{ fill: '#64748b', fontSize: 10 }}
              axisLine={{ stroke: '#1e293b' }}
              tickLine={{ stroke: '#1e293b' }}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 10 }}
              axisLine={{ stroke: '#1e293b' }}
              tickLine={{ stroke: '#1e293b' }}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#131b2e',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#e2e8f0',
              }}
              formatter={(value: number) => [`${value} ${unit}`, title]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${metric})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
