'use client';

import GlowButton from '@/components/common/glow-button';
import Header from '@/components/common/header';
import MainCard from '@/components/common/main-card';
import SearchBar from '@/components/common/search-bar';
import ScanChartCardNegative from '@/components/ui/chartNegative';
import ScanChartCardPositive from '@/components/ui/chartPositive';
import {
  Lightbulb,
  MousePointer,
  Pencil,
  Plus,
  Scan,
  Text
} from 'lucide-react';
import { useState } from 'react';

export default function Page() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className='flex w-full flex-col gap-6 rounded-xl'>
      <Header
        title='Lights'
        buttonText='Create'
        buttonIcon={<Plus size={20} />}
        buttonOnClick={() => {}}
        summary={
          <div className='text-muted-foreground flex gap-1 overflow-hidden text-base font-semibold text-ellipsis whitespace-nowrap'>
            You have{' '}
            <span className='text-foreground flex items-center gap-1'>
              <Lightbulb size={20} />
              24 lights
            </span>{' '}
            registered, covering{' '}
            <span className='text-foreground flex items-center gap-1'>
              <Scan size={20} />
              410m²
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
      <MainCard
        title='Carrefour AFI Brasov'
        subtitle='Navigation System'
        icon={<MousePointer size={18} />}
        items={[
          {
            label: '1',
            aisle: '46',
            scans: 13,
            lastScanned: '2h',
            lightId: 'LGT-1A2B3C',
            lastEdit: '2d'
          },
          {
            label: '2',
            aisle: '73',
            scans: 89,
            lastScanned: '1d',
            lightId: 'LGT-4D5E6F',
            lastEdit: '3d'
          },
          {
            label: '3',
            aisle: '14',
            scans: 56,
            lastScanned: '3d',
            lightId: 'LGT-7G8H9I',
            lastEdit: '5h'
          },
          {
            label: '4',
            aisle: '45',
            scans: 13,
            lastScanned: '2h',
            lightId: 'LGT-0J1K2L',
            lastEdit: '1d'
          },
          {
            label: '5',
            aisle: '73',
            scans: 89,
            lastScanned: '1d',
            lightId: 'LGT-3M4N5O',
            lastEdit: '4d'
          },
          {
            label: '6',
            aisle: '14',
            scans: 56,
            lastScanned: '3d',
            lightId: 'LGT-6P7Q8R',
            lastEdit: '6d'
          }
        ]}
      >
        <div className='flex gap-4 p-2 text-black'>
          <div className='flex flex-col rounded-2xl bg-gray-100 px-5 py-4 shadow-sm'>
            <span className='font-onest text-xl font-bold'>12</span>
            <span className='font-onest text-sm font-semibold'>lights</span>
          </div>
          <div className='flex flex-col rounded-2xl bg-gray-100 p-4 shadow-sm'>
            <span className='font-onest text-xl font-bold'>200 m²</span>
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

      <MainCard
        title='Cinema City AFI Brasov'
        subtitle='Information System'
        icon={<Text size={18} />}
        items={[
          {
            label: '1',
            aisle: '43',
            scans: 14,
            lastScanned: '2h',
            lightId: 'LGT-43A',
            lastEdit: '1h'
          },
          {
            label: '2',
            aisle: '47',
            scans: 34,
            lastScanned: '1d',
            lightId: 'LGT-47B',
            lastEdit: '6h'
          }
        ]}
        className='flex items-center gap-4 rounded-xl bg-white p-4 shadow-xs'
      >
        <div className='flex gap-4 p-4 text-black'>
          <div className='flex flex-col rounded-2xl bg-gray-100 px-5 py-4 shadow-sm'>
            <span className='font-onest text-xl font-bold'>12</span>
            <span className='font-onest text-sm font-semibold'>lights</span>
          </div>
          <div className='flex flex-col rounded-2xl bg-gray-100 p-4 shadow-sm'>
            <span className='font-onest text-xl font-bold'>200 m²</span>
            <span className='font-onest text-sm font-semibold'>covered</span>
          </div>
          <ScanChartCardNegative />
          <div className='relative flex flex-col rounded-xl bg-gray-100 px-5 py-4 shadow-sm'>
            <div className='flex justify-end'>
              <button className='rounded bg-white px-3 py-1 text-sm font-semibold shadow-sm hover:bg-gray-200'>
                <div className='flex items-center gap-1 font-bold text-black'>
                  Edit Content
                  <Pencil className='h-4 w-4' />
                </div>
              </button>
            </div>
          </div>
        </div>
      </MainCard>
    </div>
  );
}
