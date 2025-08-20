"use client";

import React, { useState, useEffect } from "react";

export function Clock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <div className="text-right">
      <div className="text-xl xl:text-2xl font-semibold text-slate-900">
        {formatDate(time)}
      </div>
      <div className="text-3xl xl:text-4xl font-bold text-emerald-600 font-mono tracking-wider">
        {formatTime(time)}
      </div>
    </div>
  );
}
