import ModalLayout from '@/components/common/(modals)/layout';
import Modal from '@/components/common/(modals)/modal';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, ScanText } from 'lucide-react';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

type MainCardProps = {
  title: string;
  subtitle?: string;
  items: LedData[];
  icon?: React.ReactNode;
  children?: React.ReactNode;
  lightCount?: number;
  totalScans?: number;
};

type LedData = {
  label: string;
  errorRate: string;
  latency: string;
  scans: number;
  lastScanned: string;
  lightId: string;
  lastEdit?: string;
};

type LedRowProps = LedData & {
  onLabelClick: () => void;
};

function getLightColor(name: string): { bg: string; shadow: string } {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('red')) {
    return { bg: 'bg-red-500', shadow: 'shadow-[0_0_10px_4px_rgba(239,68,68,0.8)]' };
  } else if (nameLower.includes('blue')) {
    return { bg: 'bg-blue-500', shadow: 'shadow-[0_0_10px_4px_rgba(59,130,246,0.8)]' };
  } else if (nameLower.includes('green')) {
    return { bg: 'bg-green-500', shadow: 'shadow-[0_0_10px_4px_rgba(34,197,94,0.8)]' };
  } else if (nameLower.includes('yellow')) {
    return { bg: 'bg-yellow-400', shadow: 'shadow-[0_0_10px_4px_rgba(250,204,21,0.8)]' };
  } else if (nameLower.includes('white')) {
    return { bg: 'bg-white', shadow: 'shadow-[0_0_10px_4px_rgba(255,255,255,1)]' };
  }
  
  // Default color if no match
  return { bg: 'bg-blue-500', shadow: 'shadow-[0_0_10px_4px_rgba(59,130,246,0.8)]' };
}

function LedRow({
  label,
  errorRate,
  latency,
  scans,
  lastScanned,
  onLabelClick
}: LedRowProps) {
  const lightColor = getLightColor(label);
  
  return (
    <div className='grid w-full grid-cols-[2fr_1.5fr_1.5fr_1fr_2.5fr_auto] items-center rounded-2xl bg-gray-100 p-3'>
      <div
        className='flex cursor-pointer items-center gap-4'
        onClick={onLabelClick}
      >
        <div className={`h-5 w-5 rounded-full ${lightColor.bg} ${lightColor.shadow}`}/>
        <span className='text-sm font-semibold text-gray-900'>
          {label}
        </span>
      </div>

      <span className='text-sm font-semibold text-gray-900'>{errorRate}</span>
      <span className='text-sm font-semibold text-gray-900'>{latency}</span>
      <span className='text-sm font-semibold text-gray-900'>
        {scans} scans
      </span>
      <span className='text-sm font-semibold text-gray-900'>
        {lastScanned === 'Never' ? 'Never scanned' : 
         lastScanned === 'Just now' ? 'Scanned just now' : 
         `Last scanned ${lastScanned} ago`}
      </span>
      <div className='flex items-center justify-center gap-5'>
        <button className='hover:text-gray-600' title='Edit'>
          <FiEdit2 className='h-4 w-4' />
        </button>
        <button className='font-bold hover:text-gray-600' title='More'>
          ⋮
        </button>
      </div>
    </div>
  );
}

export default function MainCard({
  title,
  subtitle,
  items,
  icon,
  children,
  lightCount,
  totalScans,
  ...props
}: MainCardProps & React.ComponentProps<typeof Card>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLed, setSelectedLed] = useState<LedData | null>(null);

  const handleLabelClick = (led: LedData) => {
    setSelectedLed(led);
    setModalOpen(true);
  };

  // Calculate totals from items if not provided
  const displayLightCount = lightCount ?? items.length;
  const displayTotalScans = totalScans ?? items.reduce((sum, item) => sum + item.scans, 0);

  return (
    <Card {...props} className='flex w-full gap-2'>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex items-center justify-between gap-2.5'>
          <h2 className='font-medium'>{title}</h2>
          <h2 className='font-semibold'>•</h2>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1 text-sm'>
              <Lightbulb className='h-3 w-3 font-bold' />
              <span className='font-onest font-semibold'>{displayLightCount}</span>
            </div>
            <div className='flex items-center gap-1 text-sm'>
              <ScanText className='h-3 w-3 font-bold' />
              <span className='font-onest font-semibold'>
                {displayTotalScans > 0 ? `${displayTotalScans} scans` : '0 scans'}
              </span>
            </div>
          </div>
          <div className='ml-auto flex items-center gap-2 text-sm font-semibold text-blue-500 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]'>
            {icon && <span className='text-lg'>{icon}</span>}
            {subtitle}
          </div>
          <button className='ml-4 font-bold hover:text-gray-600' title='More'>
            ⋮
          </button>
        </div>

        {children}

        {items.map((item, i) => (
          <LedRow
            key={i}
            {...item}
            onLabelClick={() => handleLabelClick(item)}
          />
        ))}

        {selectedLed && (
          <Modal isOpen={modalOpen}>
            <ModalLayout
              label={selectedLed.label}
              errorRate={selectedLed.errorRate}
              latency={selectedLed.latency}
              scans={selectedLed.scans}
              lastScanned={selectedLed.lastScanned}
              lightId={selectedLed.lightId}
              lastEdit={selectedLed.lastEdit ?? 'Unknown'}
              setModalOpen={setModalOpen}
            />
          </Modal>
        )}
      </CardContent>
    </Card>
  );
}
