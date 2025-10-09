'use client';

import GlowButton from '@/components/common/glow-button';
import Header from '@/components/common/header';
import MainCard from '@/components/common/main-card';
import SearchBar from '@/components/common/search-bar';
import ScanChartCardNegative from '@/components/ui/chartNegative';
import ScanChartCardPositive from '@/components/ui/chartPositive';
import { useMutation, useQuery } from 'convex/react';
import {
  Lightbulb,
  MousePointer,
  Pencil,
  Plus,
  Scan,
  Text
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { api } from '@convex/_generated/api';

export default function Page() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Convex hooks
  const lights = useQuery(api.lights.getAllLights);
  const scans = useQuery(api.scans.getAllScans);
  const addLight = useMutation(api.lights.addLight);
  
  const handleAddLight = async () => {
    await addLight({
      lightId: `LGT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      name: `Light ${(lights?.length || 0) + 1}`,
    });
  };

  // Transform lights data for display
  const lightsData = useMemo(() => {
    if (!lights) return [];
    
    return lights.map((light, index) => {
      // Find all scans for this light
      const lightScans = scans?.filter(scan => scan.lightId === light._id) || [];
      const scanCount = lightScans.length;
      
      // Calculate error rate
      let errorRate = '0%';
      if (lightScans.length > 0) {
        const errorCount = lightScans.filter(scan => scan.error).length;
        const rate = (errorCount / lightScans.length) * 100;
        errorRate = `${rate.toFixed(1)}%`;
      }
      
      // Calculate average latency
      let avgLatency = '0ms';
      if (lightScans.length > 0) {
        const totalLatency = lightScans.reduce((sum, scan) => sum + scan.latency, 0);
        const avg = totalLatency / lightScans.length;
        avgLatency = `${Math.round(avg)}ms`;
      }
      
      // Get last scan time
      let lastScanned = 'Never';
      if (lightScans.length > 0) {
        // Get the most recent scan date
        const allDates = lightScans.flatMap(scan => scan.date);
        if (allDates.length > 0) {
          const mostRecent = new Date(Math.max(...allDates.map(d => new Date(d).getTime())));
          const hoursSince = Math.floor((Date.now() - mostRecent.getTime()) / (1000 * 60 * 60));
          if (hoursSince < 1) lastScanned = 'Just now';
          else if (hoursSince < 24) lastScanned = `${hoursSince}h`;
          else lastScanned = `${Math.floor(hoursSince / 24)}d`;
        }
      }
      
      return {
        label: (index + 1).toString(),
        errorRate,
        latency: avgLatency,
        scans: scanCount,
        lastScanned,
        lightId: light.lightId,
        lastEdit: 'N/A', // TODO: Add lastEdit tracking
      };
    });
  }, [lights, scans]);

  // Calculate total scans
  const totalScans = useMemo(() => {
    return scans?.length || 0;
  }, [scans]);

  return (
    <div className='flex w-full flex-col gap-6 rounded-xl'>
      <Header
        title='Lights'
        buttonText='Create'
        buttonIcon={<Plus size={20} />}
        buttonOnClick={handleAddLight}
        summary={
          <div className='text-muted-foreground flex gap-1 overflow-hidden text-base font-semibold text-ellipsis whitespace-nowrap'>
            You have{' '}
            <span className='text-foreground flex items-center gap-1'>
              <Lightbulb size={20} />
              {lights?.length || 0} lights
            </span>{' '}
            registered, covering{' '}
            <span className='text-foreground flex items-center gap-1'>
              <Scan size={20} />
              20m²
            </span>
            .
          </div>
        }
      />
      <div className='flex items-center gap-4'>
        <SearchBar />
        <div className='flex items-center gap-2'>
          <GlowButton
            className='rounded-full px-4'
            variant={selectedFilter === 'all' ? 'default' : 'muted'}
          >
            All
          </GlowButton>
          <GlowButton
            className='rounded-full px-4'
            variant={selectedFilter === 'navigation' ? 'default' : 'muted'}
          >
            Navigation systems
          </GlowButton>
          <GlowButton
            className='rounded-full px-4'
            variant={selectedFilter === 'information' ? 'default' : 'muted'}
          >
            Information
          </GlowButton>
        </div>
      </div>
      {lights === undefined ? (
        <div className='flex items-center justify-center p-12'>
          <p className='text-muted-foreground'>Loading lights...</p>
        </div>
      ) : lightsData.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-12'>
          <Lightbulb size={48} className='text-muted-foreground' />
          <p className='text-muted-foreground'>No lights found. Click "Create" to add your first light!</p>
        </div>
      ) : (
        <MainCard
          title='All Lights'
          subtitle='Light Systems'
          icon={<Lightbulb size={18} />}
          items={lightsData}
          lightCount={lights?.length || 0}
          totalScans={totalScans}
        >
          <div className='flex gap-4 p-2 text-black'>
            <div className='flex flex-col rounded-2xl bg-gray-100 px-5 py-4 shadow-sm'>
              <span className='font-onest text-xl font-bold'>{lights?.length || 0}</span>
              <span className='font-onest text-sm font-semibold'>lights</span>
            </div>
            <div className='flex flex-col rounded-2xl bg-gray-100 p-4 shadow-sm'>
              <span className='font-onest text-xl font-bold'>{(lights?.length || 0) * 10} m²</span>
              <span className='font-onest text-sm font-semibold'>covered</span>
            </div>
            <ScanChartCardPositive />
            <div className='flex flex-col rounded-xl bg-gray-100 px-5 py-4 shadow-sm'>
              <div className='flex justify-end'>
                <button className='rounded bg-white px-3 py-1 text-sm font-semibold shadow-sm hover:bg-gray-200'>
                  <div className='flex items-center gap-1 font-bold text-black'>
                    Manage Map
                    <Pencil className='h-4 w-4' />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </MainCard>
      )}
    </div>
  );
}
