// src/components/AuthLayout.jsx
import React from "react";

export default function AuthLayout({ title, description, children, bottom }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 flex items-center justify-center px-4">
      {/* Wrapper utama supaya center */}
      <div className="w-full flex justify-center">
        {/* Kontainer grid, pastikan berada di tengah */}
        <div className="w-full max-w-[1150px] grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* CARD FORM */}
          <div className="bg-white/80 backdrop-blur-sm border border-emerald-50 shadow-xl shadow-emerald-100/40 rounded-2xl p-8 md:p-10 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-lg font-bold">
                  N
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.18em] text-emerald-600 font-semibold">
                    NutriPath
                  </span>
                  <span className="text-sm text-slate-500">
                    Personalized Nutrition Journey
                  </span>
                </div>
              </div>

              {/* Header */}
              <div className="space-y-2 mb-6">
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  {title}
                </h1>
                {description && (
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>

              {/* Form */}
              <div className="space-y-6">{children}</div>
            </div>

            {/* Footer form */}
            {bottom && (
              <div className="mt-6 text-xs text-slate-500">{bottom}</div>
            )}
          </div>

          {/* PANEL HIJAU */}
          <div className="hidden md:flex relative">
            <div className="flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-sky-500 text-white p-8 md:p-10 shadow-xl shadow-emerald-500/40 flex flex-col justify-between">
              
              {/* Badges */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-3 max-w-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
                    Smart Health & Nutrition
                  </span>
                  <h2 className="text-xl font-semibold leading-snug">
                    Kenali pola makanmu, turunkan risiko penyakit kronis.
                  </h2>
                </div>
                <div className="text-right text-xs text-emerald-50/80">
                  <p className="font-medium">AI-Powered Insights</p>
                  <p>Personalized diet plan setiap hari.</p>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-emerald-50/80 mb-1">Risk Check</p>
                    <p className="text-lg font-semibold">+3</p>
                    <p className="text-[11px] text-emerald-100/80">
                      Risiko utama: diabetes, obesitas, hipertensi.
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-emerald-50/80 mb-1">Diet Plan</p>
                    <p className="text-lg font-semibold">Premium</p>
                    <p className="text-[11px] text-emerald-100/80">
                      Rencana makan mingguan khusus untukmu.
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-emerald-50/80 mb-1">Progress</p>
                    <p className="text-lg font-semibold">Real-time</p>
                    <p className="text-[11px] text-emerald-100/80">
                      Lihat grafik aktivitas dan poin harian.
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-50/80 mt-2">
                  Data risiko dienkripsi. Hanya kamu yang dapat melihatnya.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
