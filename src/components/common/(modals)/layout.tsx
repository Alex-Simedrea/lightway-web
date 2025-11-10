import { Button } from '@/components/ui/button';
import {
  Blocks,
  ChevronLeft,
  Copy,
  EllipsisVertical,
  Pencil
} from 'lucide-react';

type ModalLayoutProps = {
  label: string;
  errorRate: string;
  latency: string;
  scans: number;
  lastScanned: string;
  lastEdit: string;
  lightId: string;
  setModalOpen: (open: boolean) => void;
};

function getLightColor(name: string): { bg: string; shadow: string } {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('red')) {
    return { bg: 'bg-red-500', shadow: 'shadow-[0_0_10px_4px_rgba(239,68,68,0.9)]' };
  } else if (nameLower.includes('blue')) {
    return { bg: 'bg-blue-500', shadow: 'shadow-[0_0_10px_4px_rgba(59,130,246,0.9)]' };
  } else if (nameLower.includes('green')) {
    return { bg: 'bg-green-500', shadow: 'shadow-[0_0_10px_4px_rgba(34,197,94,0.9)]' };
  } else if (nameLower.includes('yellow')) {
    return { bg: 'bg-yellow-400', shadow: 'shadow-[0_0_10px_4px_rgba(250,204,21,0.9)]' };
  } else if (nameLower.includes('white')) {
    return { bg: 'bg-white', shadow: 'shadow-[0_0_10px_4px_rgba(255,255,255,1)]' };
  }
  
  // Default color if no match
  return { bg: 'bg-blue-500', shadow: 'shadow-[0_0_10px_4px_rgba(59,130,246,0.9)]' };
}

export default function ModalLayout({
  label,
  errorRate,
  latency,
  scans,
  lastScanned,
  lastEdit,
  lightId,
  setModalOpen
}: ModalLayoutProps) {
  const lightColor = getLightColor(label);
  return (
    <div className='relative h-full w-full p-2 pt-10'>
      <Button
        variant='outline'
        size='sm'
        className='absolute top-0 left-4 flex h-8 w-8 cursor-pointer items-center rounded-xl'
        onClick={() => setModalOpen(false)}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>
      <div className='absolute top-0 right-4 flex items-center gap-2'>
        <h2 className='text-xs font-medium text-gray-400'>
          {lastEdit === 'N/A' || lastEdit === 'Unknown' ? 'Never edited' : 
           lastEdit === 'Just now' ? 'Edited just now' : 
           `Last edited ${lastEdit} ago`}
        </h2>
        <Button
          variant='outline'
          size='sm'
          className='flex cursor-pointer items-center rounded-xl'
        >
          <Pencil className='h-4 w-4' />
          Edit
        </Button>
        <Button
          variant='outline'
          size='sm'
          className='flex h-8 w-8 cursor-pointer items-center rounded-xl'
        >
          <EllipsisVertical className='h-4 w-4' />
        </Button>
      </div>
      <div className='mx-3xl max-w-2xl p-2'>
        <div>
          <div className='grid grid-cols-6 gap-3.5'>
            <div className='col-span-3 row-span-2 rounded-xl border border-gray-200 bg-white p-4'>
              <div className='flex flex-col items-center gap-4'>
                <div className={`h-20 w-20 rounded-full ${lightColor.bg} ${lightColor.shadow}`} />
                <h1 className='text-black-500 text-3xl font-semibold'>
                  {label}
                </h1>
              </div>
            </div>

            <div className='col-span-1 space-y-3 rounded-xl border border-gray-200 bg-white p-2 pl-3'>
              <div className='text-black-400 text-sm font-semibold'>Error Rate</div>
              <div className='flex items-center gap-2'>
                <span className='text-lg font-bold'>{errorRate}</span>
              </div>
            </div>

            <div className='col-span-1 space-y-3 rounded-xl border border-gray-200 bg-white p-2 pl-3'>
              <div className='text-black-400 text-sm font-semibold'>Latency</div>
              <div className='flex items-center gap-2'>
                <span className='text-lg font-bold'>{latency}</span>
              </div>
            </div>

            <div className='col-span-1 space-y-2 rounded-xl border border-gray-200 bg-white p-1 pl-3'>
              <div className='text-2xl font-bold'>{scans}</div>
              <div className='text-black-500 text-sm font-semibold'>scans</div>
            </div>

            <div className='col-span-1 space-y-4 space-x-4 rounded-xl border border-gray-200 bg-white p-2 pl-3'>
              <div className='text-sm font-semibold text-gray-500'>
                Last scan
              </div>
              <div className='font-medium text-green-600'>
                {lastScanned === 'Never' ? 'Never' : 
                 lastScanned === 'Just now' ? 'Just now' : 
                 `${lastScanned} ago`}
              </div>
            </div>

            <div className='col-span-2 space-y-4 rounded-xl border border-gray-200 bg-white p-3 pl-3'>
              <div className='text-sm font-semibold text-gray-500'>
                Light ID
              </div>
              <div className='flex items-center gap-4 rounded-md bg-neutral-100'>
                <span className='font-mono text-sm'>{lightId}</span>
                <Button variant='ghost' size='sm' className='p-1'>
                  <Copy className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
