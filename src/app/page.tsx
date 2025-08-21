// app/gate-npk2/page.tsx
"use client";

import { useState, useEffect } from "react";
import KpiCard from "../components/npk2/KpiCard";
import Clock from "../components/npk2/Clock";
import StatusPill from "../components/npk2/StatusPill";
import Image from "next/image";

type GateData = {
  totalInside: number;
  karyawanPKC: number;
  kontraktor: number;
  praktikan: number;
  visitor: number;
  lastUpdate: Date;
};

const initial: GateData = {
  totalInside: 370,
  karyawanPKC: 34,
  kontraktor: 219,
  praktikan: 0,
  visitor: 117,
  lastUpdate: new Date(),
};

export default function GateNPK2Page() {
  const [data, setData] = useState<GateData>(initial);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Initial loading simulation
    const loadingTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Data refresh simulation every 10 seconds
    const refreshInterval: ReturnType<typeof setInterval> = setInterval(() => {
      // Random connection failure (5% chance)
      const shouldFail = Math.random() < 0.05;

      if (shouldFail) {
        setIsConnected(false);
        setHasError(true);

        // Reconnect after 3 seconds
        const reTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
          setIsConnected(true);
          setHasError(false);
        }, 3000);

        // clear timeout jika effect dibersihkan sebelum selesai
        return () => clearTimeout(reTimer);
      }

      // Update data with small random variations (±2%)
      setData(() => {
        const variation = () => Math.random() * 0.04 - 0.02; // -2% to +2%

        const newKaryawan = Math.max(
          0,
          Math.round(initial.karyawanPKC * (1 + variation()))
        );
        const newKontraktor = Math.max(
          0,
          Math.round(initial.kontraktor * (1 + variation()))
        );
        const newPraktikan = Math.max(
          0,
          Math.round(
            initial.praktikan +
              (Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0)
          )
        );
        const newVisitor = Math.max(
          0,
          Math.round(initial.visitor * (1 + variation()))
        );

        return {
          karyawanPKC: newKaryawan,
          kontraktor: newKontraktor,
          praktikan: newPraktikan,
          visitor: newVisitor,
          totalInside: newKaryawan + newKontraktor + newPraktikan + newVisitor,
          lastUpdate: new Date(),
        };
      });
    }, 10000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(refreshInterval);
    };
  }, []);

  // SVG pattern aman tanpa masalah kutip (pakai style.backgroundImage)
  const patternSvg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: `url("${patternSvg}")` }}
        aria-hidden="true"
      />

      {hasError && (
        <div
          className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 text-center font-semibold text-lg shadow-lg border-l-4 border-red-400 backdrop-blur-sm"
          role="alert"
        >
          <div className="flex items-center justify-center gap-3">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Koneksi terputus, mencoba menyambung...</span>
          </div>
        </div>
      )}

      <header className="relative h-36 bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-lg border-b border-slate-600/50 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-yellow-600/10" />
        <div className="relative flex items-center justify-between px-12 h-full">
          <div className="flex-shrink-0">
            <Image
              src="/logo_pkc_light.png"
              alt="Company Logo"
              width={80}
              height={80}
              className="rounded-xl shadow-lg border-2 border-white/20"
              priority
            />
          </div>

          <div className="flex-1 text-center mx-8">
            <div className="mb-2">
              <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                PUPUK KUJANG
              </h1>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent w-24" />
              <span className="text-2xl xl:text-3xl font-semibold text-emerald-300 tracking-wide">
                GATE NPK2
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent w-24" />
            </div>
          </div>

          <div className="flex-shrink-0">
            <Clock />
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 relative">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full max-w-[1400px] mx-auto h-[calc(100vh-18rem)]">
          {/* Total Card - Takes full height on left */}
          <div className="xl:row-span-2">
            <KpiCard
              title="Total Inside NPK2"
              value={data.totalInside}
              variant="total"
              isLoading={isLoading}
              ariaLabel={`Total orang di dalam area NPK2: ${data.totalInside} orang`}
            />
          </div>

          {/* Stats Cards Grid */}
          <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            <KpiCard
              title="Karyawan PKC"
              value={data.karyawanPKC}
              variant="pkc"
              isLoading={isLoading}
              ariaLabel={`Karyawan PKC: ${data.karyawanPKC} orang`}
            />
            <KpiCard
              title="PHL & Kontraktor"
              value={data.kontraktor}
              variant="kontraktor"
              isLoading={isLoading}
              ariaLabel={`PHL dan Kontraktor: ${data.kontraktor} orang`}
            />
            <KpiCard
              title="Praktikan"
              value={data.praktikan}
              variant="praktikan"
              isLoading={isLoading}
              ariaLabel={`Praktikan: ${data.praktikan} orang`}
            />
            <KpiCard
              title="Visitor"
              value={data.visitor}
              variant="visitor"
              isLoading={isLoading}
              ariaLabel={`Visitor: ${data.visitor} orang`}
            />
          </div>
        </div>
      </main>

      <footer className="relative h-20 flex items-center justify-center px-12 bg-slate-800/60 backdrop-blur-xl border-t border-slate-600/50">
        <StatusPill
          isConnected={isConnected}
          lastUpdate={data.lastUpdate}
          hasError={hasError}
        />
      </footer>
    </div>
  );
}
