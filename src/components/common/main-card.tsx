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
};

type LedData = {
  label: string;
  aisle: string;
  scans: number;
  lastScanned: string;
  lightId: string;
  lastEdit?: string;
};

type LedRowProps = LedData & {
  onLabelClick: () => void;
};

function LedRow({
  label,
  aisle,
  scans,
  lastScanned,
  onLabelClick
}: LedRowProps) {
  return (
    <div className='grid w-full grid-cols-[1.5fr_1.5fr_1.5fr_3fr_auto] items-center rounded-2xl bg-gray-100 p-3 shadow-sm'>
      <div
        className='flex cursor-pointer items-center gap-2'
        onClick={onLabelClick}
      >
        <img
          src='/images/Led.png'
          alt='led'
          className='h-7 w-7 object-contain p-0'
        />
        <span className='text-sm font-semibold text-gray-900'>
          LED Light {label}
        </span>
      </div>

      <span className='text-sm font-semibold text-gray-900'>Aisle {aisle}</span>
      <span className='text-sm font-semibold text-gray-900'>
        {scans}k scans
      </span>
      <span className='text-sm font-semibold text-gray-900'>
        Last Scanned {lastScanned} ago
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
  ...props
}: MainCardProps & React.ComponentProps<typeof Card>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLed, setSelectedLed] = useState<LedData | null>(null);

  const handleLabelClick = (led: LedData) => {
    setSelectedLed(led);
    setModalOpen(true);
  };

  return (
    <Card {...props} className='flex w-full gap-2 p-4'>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex items-center justify-between gap-2.5'>
          <h2 className='text-m font-bold font-medium'>{title}</h2>
          <h2 className='text-m font-onest font-semibold'>•</h2>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1 text-sm'>
              <Lightbulb className='h-3 w-3 font-bold' />
              <span className='font-onest font-semibold'>12</span>
            </div>
            <div className='flex items-center gap-1 text-sm'>
              <ScanText className='h-3 w-3 font-bold' />
              <span className='font-onest font-semibold'>2.5k scans</span>
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
              aisle={selectedLed.aisle}
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
