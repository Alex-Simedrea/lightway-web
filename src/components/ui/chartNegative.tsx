import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useMemo } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

type ScanChartCardNegativeProps = {
  scans: Array<{
    date: string | string[];
    lightId: string;
    latency: number;
    error: boolean;
  }>;
};

export default function ScanChartCardNegative({ scans }: ScanChartCardNegativeProps) {
  // Process scans data by hour for the last 24 hours
  const chartData = useMemo(() => {
    const now = new Date();
    const last24Hours = [];
    
    // Create array of last 24 hours
    for (let i = 23; i >= 0; i--) {
      const hourDate = new Date(now);
      hourDate.setHours(now.getHours() - i, 0, 0, 0);
      
      const hour = hourDate.getHours();
      const hourLabel = hour === 0 ? '12am' : 
                       hour < 12 ? `${hour}am` : 
                       hour === 12 ? '12pm' : 
                       `${hour - 12}pm`;
      
      last24Hours.push({
        date: hourDate,
        name: hourLabel,
        scans: 0
      });
    }
    
    // Count scans for each hour
    scans.forEach(scan => {
      // Handle date as array (from schema)
      const dates = Array.isArray(scan.date) ? scan.date : [scan.date];
      
      dates.forEach(dateStr => {
        const scanDate = new Date(dateStr);
        scanDate.setMinutes(0, 0, 0);
        
        const hourData = last24Hours.find(hour => 
          hour.date.getTime() === scanDate.getTime()
        );
        
        if (hourData) {
          hourData.scans++;
        }
      });
    });
    
    return last24Hours.map(({ name, scans }) => ({ name, scans }));
  }, [scans]);

  const totalScansLast24Hours = useMemo(() => {
    return chartData.reduce((sum, hour) => sum + hour.scans, 0);
  }, [chartData]);

  // Determine if trend is positive (comparing first half vs second half of 24h period)
  const isPositiveTrend = useMemo(() => {
    const firstHalf = chartData.slice(0, 12).reduce((sum, hour) => sum + hour.scans, 0);
    const secondHalf = chartData.slice(12).reduce((sum, hour) => sum + hour.scans, 0);
    return secondHalf >= firstHalf;
  }, [chartData]);

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className='h-full w-full rounded-xl bg-gray-100 p-4 shadow-sm'>
      <div className='flex items-center gap-1 font-bold text-black'>
        {formatNumber(totalScansLast24Hours)} scans last 24h
        {isPositiveTrend ? (
          <ArrowUpRight className='h-6 w-6' />
        ) : (
          <ArrowDown className='h-6 w-6' />
        )}
      </div>
      <ResponsiveContainer width='100%' height={35}>
        <LineChart data={chartData}>
          <Line
            type='monotone'
            dataKey='scans'
            stroke={isPositiveTrend ? '#22c55e' : '#dc2626'}
            strokeWidth={2}
            dot={false}
          />
          <XAxis dataKey='name' hide />
          <YAxis hide />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
