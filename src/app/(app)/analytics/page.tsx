'use client';

import GlowButton from '@/components/common/glow-button';
import Header from '@/components/common/header';
import SearchBar from '@/components/common/search-bar';
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
    </div>
  );
}
