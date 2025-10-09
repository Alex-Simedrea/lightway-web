'use client';

import AnalyticsCard from '@/components/common/analytics-card';
import Header from '@/components/common/header';
import { Lightbulb, Plus, Scan } from 'lucide-react';
import { useState } from 'react';

export default function Page() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className='flex w-full flex-col gap-6 rounded-xl'>
      <Header
        title='Analytics'
        buttonText='Create'
        buttonIcon={<Plus size={20} />}
        buttonOnClick={() => {}}
        summary={
          <div className="text-muted-foreground whitespace-nowrap' flex gap-1 overflow-hidden text-base font-semibold text-ellipsis">
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
      <AnalyticsCard title='Carrefour AFI Brasov'></AnalyticsCard>
    </div>
  );
}
