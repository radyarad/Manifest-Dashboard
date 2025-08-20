import React from "react";

type StatusPillProps = {
  lastUpdate: Date;
  isError?: boolean;
  isLoading?: boolean;
};

export function StatusPill({
  lastUpdate,
  isError = false,
  isLoading = false,
}: StatusPillProps) {
  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  const getStatusConfig = () => {
    if (isError) {
      return {
        dotColor: "bg-red-500",
        textColor: "text-red-700",
        bgColor: "bg-red-50",
        status: "Koneksi Terputus",
      };
    }

    if (isLoading) {
      return {
        dotColor: "bg-amber-500",
        textColor: "text-amber-700",
        bgColor: "bg-amber-50",
        status: "Memuat...",
      };
    }

    return {
      dotColor: "bg-emerald-500",
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-50",
      status: "Terhubung",
    };
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center justify-between">
      {/* Connection Status */}
      <div
        className={`flex items-center space-x-3 px-4 py-2 rounded-full ${config.bgColor}`}
      >
        <div
          className={`w-3 h-3 rounded-full ${config.dotColor} ${
            isError ? "animate-pulse" : ""
          }`}
        ></div>
        <span className={`text-sm font-medium ${config.textColor}`}>
          {config.status}
        </span>
      </div>

      {/* Last Update */}
      <div className="flex items-center space-x-2 text-slate-600">
        <span className="text-lg font-medium">Last update:</span>
        <span className="text-xl font-bold font-mono tracking-wider text-slate-900">
          {formatTime(lastUpdate)}
        </span>
      </div>
    </div>
  );
}
