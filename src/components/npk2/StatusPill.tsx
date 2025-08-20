// components/StatusPill.tsx
"use client";

type StatusPillProps = {
  isConnected: boolean;
  lastUpdate: Date;
  hasError?: boolean;
};

export default function StatusPill({
  isConnected,
  lastUpdate,
  hasError = false,
}: StatusPillProps) {
  const getStatusStyles = () => {
    if (hasError || !isConnected) {
      return {
        dot: "bg-red-500 shadow-lg shadow-red-500/60 animate-pulse",
        text: "text-red-300",
        bg: "bg-red-500/10 border-red-500/30",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ),
      };
    }
    return {
      dot: "bg-emerald-500 shadow-lg shadow-emerald-500/60 animate-pulse",
      text: "text-emerald-300",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    };
  };

  const getStatusText = () => {
    if (hasError) return "DISCONNECTED";
    if (!isConnected) return "CONNECTING";
    return "CONNECTED";
  };

  const formatLastUpdate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  const statusStyles = getStatusStyles();

  return (
    <div
      className={`flex items-center gap-6 px-8 py-4 ${statusStyles.bg} backdrop-blur-xl rounded-2xl border shadow-2xl transition-all duration-300`}
      role="status"
      aria-live="polite"
    >
      {/* Status Section */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className={`w-5 h-5 rounded-full ${statusStyles.dot}`}></div>
          <div
            className={`absolute inset-0 w-5 h-5 rounded-full ${
              statusStyles.dot.split(" ")[0]
            } opacity-20 animate-ping`}
          ></div>
        </div>

        <div className="flex items-center gap-2">
          <div className={statusStyles.text}>{statusStyles.icon}</div>
          <span
            className={`text-lg font-bold ${statusStyles.text} tracking-wider`}
          >
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-600/50"></div>

      {/* Last Update Section */}
      <div className="flex items-center gap-3 text-slate-300">
        <svg
          className="w-5 h-5 text-slate-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-400 uppercase tracking-wide">
            Last Update
          </span>
          <span className="text-lg font-mono font-semibold">
            {formatLastUpdate(lastUpdate)}
          </span>
        </div>
      </div>
    </div>
  );
}
