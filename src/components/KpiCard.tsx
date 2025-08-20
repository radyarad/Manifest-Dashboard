import React from "react";
//import { cn } from "@/lib/utils"; // Optional utility for className merging

type KpiCardProps = {
  title: string;
  value: number;
  variant: "total" | "pkc" | "kontraktor" | "praktikan" | "visitor";
  isLoading?: boolean;
  ariaLabel?: string;
  className?: string;
};

const variantStyles = {
  total: {
    border: "border-emerald-200",
    titleColor: "text-emerald-700",
    icon: "🏭",
    textSize: "text-[9rem]",
  },
  pkc: {
    border: "border-emerald-200",
    titleColor: "text-emerald-700",
    icon: "👥",
    textSize: "text-[6rem]",
  },
  kontraktor: {
    border: "border-teal-200",
    titleColor: "text-teal-700",
    icon: "🔧",
    textSize: "text-[6rem]",
  },
  praktikan: {
    border: "border-amber-200",
    titleColor: "text-amber-600",
    icon: "🎓",
    textSize: "text-[6rem]",
  },
  visitor: {
    border: "border-stone-200",
    titleColor: "text-stone-700",
    icon: "🚶",
    textSize: "text-[6rem]",
  },
};

export function KpiCard({
  title,
  value,
  variant,
  isLoading = false,
  ariaLabel,
  className,
}: KpiCardProps) {
  const styles = variantStyles[variant];

  if (isLoading) {
    return (
      <div
        className={cn(
          "bg-white border rounded-2xl p-8 xl:p-10 shadow-sm flex flex-col justify-center items-center h-full",
          styles.border,
          className
        )}
      >
        {/* Loading skeleton */}
        <div className="w-full space-y-6 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-slate-200 rounded"></div>
            <div className="h-8 bg-slate-200 rounded flex-1 max-w-xs"></div>
          </div>
          <div className="h-32 bg-slate-200 rounded w-full max-w-sm mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white border rounded-2xl p-8 xl:p-10 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col justify-center items-center h-full",
        styles.border,
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      {/* Title with Icon */}
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-2xl" role="img" aria-hidden="true">
          {styles.icon}
        </span>
        <h2
          className={cn(
            "text-2xl xl:text-3xl font-semibold tracking-wide text-center",
            styles.titleColor
          )}
        >
          {title}
        </h2>
      </div>

      {/* Value */}
      <div className="flex-1 flex items-center justify-center">
        <span
          className={cn(
            "leading-none font-extrabold text-slate-900 transition-all duration-500",
            styles.textSize
          )}
        >
          {value.toLocaleString("id-ID")}
        </span>
      </div>

      {/* Unit */}
      <div className="mt-4">
        <span className="text-xl text-slate-500 font-medium">orang</span>
      </div>
    </div>
  );
}

// Utility function for className merging (if not using a library)
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}
