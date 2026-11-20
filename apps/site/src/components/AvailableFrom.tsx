import { useEffect, useState } from 'react';

const LEAD_TIME_WEEKS = 4;

const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });

const availableFrom = (now: Date) => {
  const date = new Date(now);
  date.setDate(date.getDate() + LEAD_TIME_WEEKS * 7);
  if (date.getMonth() === 11) date.setFullYear(date.getFullYear() + 1, 0, 1);
  return {
    label: monthYear.format(date),
    datetime: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
  };
};

export const AvailableFrom = ({ builtAt }: { builtAt: number }) => {
  const [now, setNow] = useState(builtAt);
  useEffect(() => setNow(Date.now()), []);
  const { label, datetime } = availableFrom(new Date(now));
  return (
    <>
      Available for work from <time dateTime={datetime}>{label}</time>
    </>
  );
};
