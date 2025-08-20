// components/Clock.tsx
"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  const formatTimeOnly = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  const formatDateOnly = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div
      className="text-right bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-600/50 shadow-xl"
      role="timer"
      aria-live="off"
    >
      {/* Date */}
      <div className="text-slate-300 text-lg xl:text-xl font-medium mb-2 tracking-wide">
        {formatDateOnly(time)}
      </div>

      {/* Time */}
      <time
        dateTime={time.toISOString()}
        className="text-3xl xl:text-4xl font-bold text-white font-mono tracking-wider whitespace-nowrap block drop-shadow-lg"
      >
        {formatTimeOnly(time)}
      </time>

      {/* Decorative accent */}
      <div className="mt-3 h-1 w-16 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-full ml-auto"></div>
    </div>
  );
}
