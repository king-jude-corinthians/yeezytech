'use client';

import { useState, useEffect } from 'react';

function getTimeLeft(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="bg-zinc-800 text-white font-mono font-bold text-2xl md:text-3xl w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-xs text-zinc-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex items-end gap-3">
      <Digit value={time.days} label="Days" />
      <span className="text-white font-bold text-2xl mb-4">:</span>
      <Digit value={time.hours} label="Hours" />
      <span className="text-white font-bold text-2xl mb-4">:</span>
      <Digit value={time.minutes} label="Mins" />
      <span className="text-white font-bold text-2xl mb-4">:</span>
      <Digit value={time.seconds} label="Secs" />
    </div>
  );
}
