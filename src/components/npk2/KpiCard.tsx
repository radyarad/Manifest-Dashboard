// components/KpiCard.tsx
"use client";

import { useEffect, useState } from "react";

type KpiCardProps = {
  title: string;
  value: number;
  variant: "total" | "pkc" | "kontraktor" | "praktikan" | "visitor";
  isLoading?: boolean;
  ariaLabel?: string;
};

const variantStyles = {
  total: {
    card: "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-emerald-500/30 shadow-emerald-500/20",
    title: "text-emerald-300",
    value: "text-white",
    icon: "text-emerald-400",
    iconBg: "bg-emerald-500/20",
    titleSize: "text-3xl xl:text-4xl",
    valueSize: "text-8xl xl:text-9xl 2xl:text-[10rem]",
    unitSize: "text-2xl xl:text-3xl",
    glowEffect: "shadow-2xl shadow-emerald-500/30",
  },
  pkc: {
    card: "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-emerald-500/30 shadow-emerald-500/20",
    title: "text-emerald-300",
    value: "text-white",
    icon: "text-emerald-400",
    iconBg: "bg-emerald-500/20",
    titleSize: "text-xl xl:text-2xl",
    valueSize: "text-5xl xl:text-6xl",
    unitSize: "text-lg xl:text-xl",
    glowEffect: "shadow-xl shadow-emerald-500/20",
  },
  kontraktor: {
    card: "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-yellow-500/30 shadow-yellow-500/20",
    title: "text-yellow-300",
    value: "text-white",
    icon: "text-yellow-400",
    iconBg: "bg-yellow-500/20",
    titleSize: "text-xl xl:text-2xl",
    valueSize: "text-5xl xl:text-6xl",
    unitSize: "text-lg xl:text-xl",
    glowEffect: "shadow-xl shadow-yellow-500/20",
  },
  praktikan: {
    card: "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-lime-500/30 shadow-lime-500/20",
    title: "text-lime-300",
    value: "text-white",
    icon: "text-lime-400",
    iconBg: "bg-lime-500/20",
    titleSize: "text-xl xl:text-2xl",
    valueSize: "text-5xl xl:text-6xl",
    unitSize: "text-lg xl:text-xl",
    glowEffect: "shadow-xl shadow-lime-500/20",
  },
  visitor: {
    card: "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-amber-500/30 shadow-amber-500/20",
    title: "text-amber-300",
    value: "text-white",
    icon: "text-amber-400",
    iconBg: "bg-amber-500/20",
    titleSize: "text-xl xl:text-2xl",
    valueSize: "text-5xl xl:text-6xl",
    unitSize: "text-lg xl:text-xl",
    glowEffect: "shadow-xl shadow-amber-500/20",
  },
};

const getIcon = (variant: string) => {
  const iconProps = "w-8 h-8 xl:w-10 xl:h-10";

  switch (variant) {
    case "total":
      return (
        <svg
          className={`${iconProps} w-12 h-12 xl:w-16 xl:h-16`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      );
    case "pkc":
      return (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "kontraktor":
      return (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "praktikan":
      return (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      );
    case "visitor":
      return (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function KpiCard({
  title,
  value,
  variant,
  isLoading = false,
  ariaLabel,
}: KpiCardProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  const styles = variantStyles[variant];

  useEffect(() => {
    if (displayValue !== value && !isLoading) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue, isLoading]);

  if (isLoading) {
    return (
      <div
        className={`${styles.card} ${styles.glowEffect} rounded-2xl p-8 backdrop-blur-lg h-full flex flex-col justify-between`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="animate-pulse bg-slate-600 rounded-xl w-16 h-16"></div>
          <div className="animate-pulse bg-slate-600 rounded-lg h-8 flex-1"></div>
        </div>
        <div
          className={`animate-pulse bg-slate-600 rounded-lg ${
            variant === "total" ? "h-48" : "h-32"
          } mb-4`}
        ></div>
        <div className="animate-pulse bg-slate-600 rounded-lg h-6 w-20 mx-auto"></div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.card} ${
        styles.glowEffect
      } rounded-2xl p-8 backdrop-blur-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col justify-between ${
        variant === "total" ? "min-h-[32rem]" : "min-h-[16rem]"
      } relative overflow-hidden`}
      aria-label={ariaLabel}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

      {/* Header */}
      <div className="relative flex items-center gap-4 mb-6">
        <div
          className={`${styles.iconBg} p-4 rounded-xl backdrop-blur-sm border border-white/10`}
        >
          <div className={styles.icon}>{getIcon(variant)}</div>
        </div>
        <h2
          className={`${styles.title} ${styles.titleSize} font-bold leading-tight flex-1 drop-shadow-lg`}
        >
          {title}
        </h2>
      </div>

      {/* Value */}
      <div className="relative flex-1 flex items-center justify-center">
        <div
          className={`${styles.value} ${
            styles.valueSize
          } font-black text-center transition-all duration-300 drop-shadow-2xl ${
            isAnimating ? "scale-105 opacity-80" : "scale-100 opacity-100"
          }`}
          role="status"
          aria-live="polite"
        >
          {displayValue.toLocaleString("id-ID")}
        </div>
      </div>

      {/* Unit */}
      <div className="relative mt-auto">
        <div
          className={`${styles.unitSize} text-slate-300 text-center font-semibold tracking-wider`}
        >
          ORANG
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
          variant === "total"
            ? "from-emerald-500 to-emerald-600"
            : variant === "pkc"
            ? "from-emerald-500 to-emerald-600"
            : variant === "kontraktor"
            ? "from-yellow-500 to-yellow-600"
            : variant === "praktikan"
            ? "from-lime-500 to-lime-600"
            : "from-amber-500 to-amber-600"
        } rounded-b-2xl`}
      ></div>
    </div>
  );
}
