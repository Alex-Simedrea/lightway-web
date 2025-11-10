'use client';

import Header from '@/components/common/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from 'convex/react';
import { Activity, AlertTriangle, BarChart3, Clock, Lightbulb, Plus, Scan, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { api } from '../../../../convex/_generated/api';

export default function Page() {
  // Convex hooks
  const lights = useQuery(api.lights.getAllLights);
  const scans = useQuery(api.scans.getAllScans);

  // Calculate KPI metrics
  const kpiMetrics = useMemo(() => {
    if (!scans || !lights) return {
      totalScans: 0,
      avgScans: 0,
      avgLatency: 0,
      errorRate: '0'
    };

    const totalScans = scans.length;
    const errorCount = scans.filter(scan => scan.error).length;
    const errorRate = totalScans > 0 ? ((errorCount / totalScans) * 100).toFixed(1) : '0';
    const avgLatency = totalScans > 0 
      ? Math.round(scans.reduce((sum, scan) => sum + scan.latency, 0) / totalScans)
      : 0;
    const avgScans = lights.length > 0 ? Math.round(totalScans / lights.length) : 0;

    return {
      totalScans,
      avgScans,
      avgLatency,
      errorRate
    };
  }, [lights, scans]);

  // Scans timeseries data (last 24 hours)
  const scansTimeseries = useMemo(() => {
    if (!scans) return [];
    
    const now = new Date();
    const last24Hours = [];
    
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
    
    scans.forEach(scan => {
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

  // Alerts timeseries data (errors over time)
  const alertsTimeseries = useMemo(() => {
    if (!scans) return [];
    
    const now = new Date();
    const last24Hours = [];
    
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
        alerts: 0
      });
    }
    
    scans.filter(scan => scan.error).forEach(scan => {
      const dates = Array.isArray(scan.date) ? scan.date : [scan.date];
      dates.forEach(dateStr => {
        const scanDate = new Date(dateStr);
        scanDate.setMinutes(0, 0, 0);
        
        const hourData = last24Hours.find(hour => 
          hour.date.getTime() === scanDate.getTime()
        );
        
        if (hourData) {
          hourData.alerts++;
        }
      });
    });
    
    return last24Hours.map(({ name, alerts }) => ({ name, alerts }));
  }, [scans]);

  // Latency percentiles
  const latencyPercentiles = useMemo(() => {
    if (!scans || scans.length === 0) return [];
    
    const latencies = scans.map(scan => scan.latency).sort((a, b) => a - b);
    const getPercentile = (p: number) => {
      const index = Math.ceil((p / 100) * latencies.length) - 1;
      return latencies[Math.max(0, index)];
    };
    
    return [
      { name: 'p50', latency: getPercentile(50) },
      { name: 'p90', latency: getPercentile(90) },
      { name: 'p95', latency: getPercentile(95) },
      { name: 'p99', latency: getPercentile(99) }
    ];
  }, [scans]);

  // Scans by hour of day
  const scansByHour = useMemo(() => {
    if (!scans) return [];
    
    const hourCounts = Array(24).fill(0).map((_, i) => ({
      hour: i === 0 ? '12am' : i < 12 ? `${i}am` : i === 12 ? '12pm' : `${i - 12}pm`,
      scans: 0
    }));
    
    scans.forEach(scan => {
      const dates = Array.isArray(scan.date) ? scan.date : [scan.date];
      dates.forEach(dateStr => {
        const hour = new Date(dateStr).getHours();
        hourCounts[hour].scans++;
      });
    });
    
    return hourCounts;
  }, [scans]);

  // Error codes pie chart
  const errorCodesPie = useMemo(() => {
    if (!scans) return [];
    
    const successCount = scans.filter(scan => !scan.error).length;
    const errorCount = scans.filter(scan => scan.error).length;
    
    return [
      { name: 'Success', value: successCount, color: '#22c55e' },
      { name: 'Errors', value: errorCount, color: '#ef4444' }
    ];
  }, [scans]);

  const COLORS = ['#22c55e', '#ef4444'];

  return (
    <div className='flex w-full flex-col gap-6 rounded-xl'>
      <Header
        title='Analytics'
        buttonText='Export'
        buttonIcon={<BarChart3 size={20} />}
        buttonOnClick={() => {}}
        summary={
          <div className='text-muted-foreground flex gap-1 overflow-hidden text-base font-semibold text-ellipsis whitespace-nowrap'>
            Performance insights for{' '}
            <span className='text-foreground flex items-center gap-1'>
              <Lightbulb size={20} />
              {lights?.length || 0} lights
            </span>{' '}
            and{' '}
            <span className='text-foreground flex items-center gap-1'>
              <Scan size={20} />
              {kpiMetrics.totalScans} scans
            </span>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-500'>Total Scans</p>
                <p className='text-3xl font-bold text-gray-900'>{kpiMetrics.totalScans.toLocaleString()}</p>
              </div>
              <div className='rounded-full bg-blue-100 p-3'>
                <Scan className='h-6 w-6 text-blue-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-500'>Average Scans</p>
                <p className='text-3xl font-bold text-gray-900'>{kpiMetrics.avgScans}</p>
                <p className='text-xs text-gray-400'>per light</p>
              </div>
              <div className='rounded-full bg-green-100 p-3'>
                <TrendingUp className='h-6 w-6 text-green-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-500'>Avg Latency</p>
                <p className='text-3xl font-bold text-gray-900'>{kpiMetrics.avgLatency}ms</p>
              </div>
              <div className='rounded-full bg-purple-100 p-3'>
                <Clock className='h-6 w-6 text-purple-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-500'>Error Rate</p>
                <p className='text-3xl font-bold text-gray-900'>{kpiMetrics.errorRate}%</p>
              </div>
              <div className='rounded-full bg-red-100 p-3'>
                <AlertTriangle className='h-6 w-6 text-red-600' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphs Row 1 */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {/* Scans Stream */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Activity className='h-5 w-5' />
              Scans Stream (Last 24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={scansTimeseries}>
                <defs>
                  <linearGradient id='colorScans' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8}/>
                    <stop offset='95%' stopColor='#3b82f6' stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey='name' stroke='#888888' fontSize={12} />
                <YAxis stroke='#888888' fontSize={12} />
                <Tooltip />
                <Area type='monotone' dataKey='scans' stroke='#3b82f6' fillOpacity={1} fill='url(#colorScans)' />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts Stream */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <AlertTriangle className='h-5 w-5' />
              Alerts Stream (Last 24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={alertsTimeseries}>
                <defs>
                  <linearGradient id='colorAlerts' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#ef4444' stopOpacity={0.8}/>
                    <stop offset='95%' stopColor='#ef4444' stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey='name' stroke='#888888' fontSize={12} />
                <YAxis stroke='#888888' fontSize={12} />
                <Tooltip />
                <Area type='monotone' dataKey='alerts' stroke='#ef4444' fillOpacity={1} fill='url(#colorAlerts)' />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Graphs Row 2 */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {/* Latency Percentiles */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Clock className='h-5 w-5' />
              Latency Percentiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={latencyPercentiles}>
                <XAxis dataKey='name' stroke='#888888' fontSize={12} />
                <YAxis stroke='#888888' fontSize={12} />
                <Tooltip />
                <Bar dataKey='latency' fill='#8b5cf6' radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Scans by Hour */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BarChart3 className='h-5 w-5' />
              Scans by Hour of Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={scansByHour}>
                <XAxis dataKey='hour' stroke='#888888' fontSize={10} angle={-45} textAnchor='end' height={80} />
                <YAxis stroke='#888888' fontSize={12} />
                <Tooltip />
                <Bar dataKey='scans' fill='#10b981' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Error Codes Pie */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <AlertTriangle className='h-5 w-5' />
              Success vs Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={errorCodesPie}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {errorCodesPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
