import { Card, CardContent } from '../ui/card';

type CardProps = {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export default function AnalyticsCard({
  title,
  icon,
  children,
  ...props
}: CardProps) {
  return (
    <Card {...props} className='flex w-full gap-2 p-4'>
      <CardContent className='flex flex-col gap-2'>
        <div className='justify between flex items-center gap-2.5'>
          <h2 className='text-3xl font-semibold'>{title}</h2>
        </div>
        <div className='flex gap-4 p-2 text-black'>
          <div className='flex flex-col rounded-2xl bg-gray-100 px-5 py-4 shadow-sm'>
            <span className='font-onest text-xl font-bold'>12</span>
            <span className='font-onest text-sm font-semibold'>lights</span>
          </div>
          <div className='flex flex-col rounded-2xl bg-gray-100 p-4 shadow-sm'>
            <span className='font-onest text-xl font-bold'>200</span>
            <span className='font-onest text-sm font-semibold'>
              average scans
            </span>
          </div>
          <div className='flex flex-col rounded-2xl bg-gray-100 p-4 shadow-sm'>
            <span className='font-onest text-xl font-bold'>150</span>
            <span className='font-onest text-sm font-semibold'>
              average latency
            </span>
          </div>
          <div className='flex flex-col rounded-2xl bg-gray-100 p-4 shadow-sm'>
            <span className='font-onest text-xl font-bold'>3k</span>
            <span className='font-onest text-sm font-semibold'>
              unique users
            </span>
          </div>
          <div className='flex flex-col rounded-2xl bg-gray-100 p-4 shadow-sm'>
            <span className='font-onest text-xl font-bold'>2%</span>
            <span className='font-onest text-sm font-semibold'>error rate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
