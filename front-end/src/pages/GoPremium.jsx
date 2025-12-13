// src/pages/GoPremium.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { connectWallet } from "../utils/metamask";


/**
 * UI-only (dummy).
 * Plan diambil dari localStorage user kalau ada:
 * localStorage.setItem("user", JSON.stringify({ plan: "Free" }))
 * localStorage.setItem("user", JSON.stringify({ plan: "Premium" }))
 */
function getUserPlan() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.plan || null;
  } catch {
    return null;
  }
}

// ✅ Manfaat Premium: SAMA untuk Monthly & Yearly
const PREMIUM_BENEFITS = [
  "Next Focus (personalized) tiap minggu",
  "Weekly Challenge + tracker",
  "Diet plan lebih detail (premium days)",
  "Insight & tips konsistensi (advanced)",
  "Konsul Expert (Ahli Gizi)",
];

// ✅ Harga beda, benefit sama
const PRICING = [
  {
    id: "monthly",
    name: "Monthly",
    price: "Rp 29.000",
    period: "/bulan",
    note: "Bayar bulanan, bisa berhenti kapan saja (demo).",
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "Rp 249.000",
    period: "/tahun",
    badge: "Lebih hemat",
    note: "Benefit sama, lebih murah dibanding bulanan (demo).",
  },
];

const COMPARE = [
  {
    feature: "Rencana Diet Harian",
    free: "Basic",
    premium: "Lebih detail + variasi",
  },
  { feature: "Next Focus", free: "Locked", premium: "Personalized (weekly)" },
  { feature: "Weekly Challenge", free: "Locked", premium: "Available" },
  { feature: "Insight & Tips", free: "Umum", premium: "Advanced + rekomendasi" },
  {
    feature: "Konsul Expert",
    free: "Coming soon",
    premium: "Priority (coming soon)",
  },
];

export default function GoPremium() {
  const navigate = useNavigate();

  // fallback dummy kalau localStorage belum ada
  const planFromStorage = useMemo(() => getUserPlan(), []);
  const dummyUser = useMemo(
    () => ({ plan: planFromStorage || "Free" }),
    [planFromStorage]
  );

  const isPremium = useMemo(
    () => String(dummyUser.plan).toLowerCase() === "premium",
    [dummyUser.plan]
  );

  const [selected, setSelected] = useState("yearly");

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <PageHeader
          title={isPremium ? "Premium Active" : "Go Premium"}
          subtitle={
            isPremium
              ? "Terima kasih! Kamu sudah Premium. Berikut ringkasan benefit & status (UI-only)."
              : "Upgrade untuk membuka fitur rekomendasi yang lebih personal dan tools konsistensi (UI-only)."
          }
        />

        <span
          className={[
            "hidden md:inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
            isPremium
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-slate-50 text-slate-700 border-slate-200",
          ].join(" ")}
        >
          Plan: {isPremium ? "Premium" : "Free"}
        </span>
      </div>

      {/* HERO (beda Free vs Premium) */}
      {!isPremium ? (
        <section className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-100/50 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <p className="text-xs uppercase tracking-[0.18em] text-white/80 font-semibold">
                NutriPath Premium
              </p>
              <h1 className="mt-2 text-2xl md:text-3xl font-bold leading-tight">
                Lebih konsisten, lebih terarah, tanpa merasa “diet ekstrem”.
              </h1>
              <p className="mt-3 text-sm text-white/85 max-w-2xl">
                Premium membantu kamu fokus pada 1–2 perbaikan kecil tiap minggu.
                Progres nyata datang dari rutinitas yang bisa dijaga.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                {[
                  "Next Focus personalized",
                  "Weekly Challenge",
                  "Diet plan lebih detail",
                  "Advanced tips & insight",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-white/15 border border-white/20 px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold">Kutipan singkat</p>
              <p className="mt-2 text-sm text-white/85 leading-relaxed">
                “Konsistensi kecil, setiap hari, mengalahkan niat besar yang cuma
                bertahan seminggu.”
              </p>
              <p className="mt-3 text-xs text-white/70">— NutriPath (demo)</p>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="mt-4 w-full rounded-lg bg-white text-slate-900 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-3xl border border-emerald-100 bg-white shadow-lg shadow-emerald-100/40 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Premium Active
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                Kamu sudah membuka semua fitur Premium.
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                Halaman ini menampilkan ringkasan benefit Premium dan beberapa
                shortcut untuk fitur yang biasa dipakai (UI-only).
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                {[
                  "Next Focus personalized",
                  "Weekly Challenge + tracker",
                  "Advanced insights",
                  "Premium diet days",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 min-w-[280px]">
              <p className="text-xs text-slate-500">Status subscription</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Premium (demo)
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Billing & renewal belum dihubungkan.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/progress")}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Buka Next Focus / Challenge
                </button>
                <button
                  type="button"
                  onClick={() => alert("Nanti: manage subscription (dummy).")}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Kelola subscription (dummy)
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Jika Premium: tampil benefit summary + comparison */}
      {isPremium ? (
        <>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
              <h3 className="text-sm font-semibold text-slate-900">
                Benefit yang kamu punya
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Ringkasan fitur Premium (demo).
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {PREMIUM_BENEFITS.map((b) => (
                  <div
                    key={b}
                    className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4"
                  >
                    <p className="text-sm font-semibold text-slate-900">{b}</p>
                    <p className="mt-1 text-xs text-slate-600">
                      (UI-only, akan dihubungkan bertahap)
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-3">
              <h3 className="text-sm font-semibold text-slate-900">
                Quick actions
              </h3>
              <button
                type="button"
                onClick={() => navigate("/diet-plans")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Lihat Diet Plans
              </button>
              <button
                type="button"
                onClick={() => navigate("/progress")}
                className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Buka Progress
              </button>
              <button
                type="button"
                onClick={() => alert("Nanti: lihat invoice (dummy).")}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Lihat billing (dummy)
              </button>

              <p className="text-[11px] text-slate-500">
                Nantinya status Premium berasal dari backend.
              </p>
            </aside>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Perbandingan fitur
              </h2>
              <span className="text-[11px] text-slate-500">
                *Sebagian fitur masih demo/coming soon
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                    <th className="text-left px-6 py-3">Feature</th>
                    <th className="text-left px-6 py-3">Free</th>
                    <th className="text-left px-6 py-3">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                    >
                      <td className="px-6 py-3 font-semibold text-slate-900">
                        {row.feature}
                      </td>
                      <td className="px-6 py-3 text-slate-700">{row.free}</td>
                      <td className="px-6 py-3 text-emerald-700 font-semibold">
                        {row.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* FREE: Pricing + checkout */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pricing cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRICING.map((p) => {
                const active = selected === p.id;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelected(p.id)}
                    className={[
                      "text-left rounded-2xl border p-6 shadow-sm transition",
                      active
                        ? "border-emerald-200 bg-emerald-50/60 shadow-emerald-100/60"
                        : "border-slate-200 bg-white hover:bg-slate-50/50",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {p.name}
                        </p>
                        <div className="mt-2 flex items-end gap-2">
                          <p className="text-2xl font-bold text-slate-900">
                            {p.price}
                          </p>
                          <p className="text-sm text-slate-500">{p.period}</p>
                        </div>
                      </div>

                      {p.badge && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                          {p.badge}
                        </span>
                      )}
                    </div>

                    {/* ✅ BENEFIT SAMA untuk semua paket */}
                    <div className="mt-4 space-y-2">
                      {PREMIUM_BENEFITS.map((perk) => (
                        <div
                          key={perk}
                          className="flex gap-2 text-sm text-slate-700"
                        >
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>

                    {/* ✅ note beda hanya pricing */}
                    {p.note && (
                      <p className="mt-4 text-xs text-slate-500">{p.note}</p>
                    )}

                    <div className="mt-5">
                      <div
                        className={[
                          "w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-center",
                          active
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-900 text-white",
                        ].join(" ")}
                      >
                        {active ? "Dipilih" : "Pilih paket"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Checkout box */}
            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-base font-semibold text-slate-900">
                Ringkasan upgrade
              </h2>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Paket dipilih</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {PRICING.find((x) => x.id === selected)?.name}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Pembayaran & backend belum dihubungkan (UI-only).
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  Benefit Premium sama untuk Monthly maupun Yearly. Bedanya hanya
                  harga.
                </p>
              </div>

              <button
                type="button"
                onClick={async () => {
                  try {
                    const walletAddress = await connectWallet();
                    if (!walletAddress) return;

                    const token = localStorage.getItem("token");

                    const res = await fetch(
                      "http://localhost:4000/api/payments/upgrade",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ walletAddress }),
                      }
                    );
                    

                    const data = await res.json();

                    if (data.success) {
                      // update localStorage
                      localStorage.setItem(
                        "user",
                        JSON.stringify({ plan: "Premium" })
                      );

                      alert("Upgrade berhasil 🎉");
                      window.location.reload();
                    } else {
                      alert("Upgrade gagal");
                    }
                  } catch (e) {
                    console.error(e);
                    alert("Error saat upgrade");
                  }
                }}
                className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Lanjut upgrade
              </button>


              <button
                type="button"
                onClick={() =>
                  alert("Nanti diarahkan ke detail paket / FAQ (dummy).")
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Lihat detail & FAQ
              </button>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Dengan melanjutkan, kamu setuju bahwa ini masih mode demo.
                Integrasi pembayaran dan status plan akan disambungkan setelah
                backend selesai.
              </p>
            </aside>
          </section>

          {/* Comparison */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Perbandingan fitur
              </h2>
              <span className="text-[11px] text-slate-500">
                *Sebagian fitur masih demo/coming soon
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                    <th className="text-left px-6 py-3">Feature</th>
                    <th className="text-left px-6 py-3">Free</th>
                    <th className="text-left px-6 py-3">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                    >
                      <td className="px-6 py-3 font-semibold text-slate-900">
                        {row.feature}
                      </td>
                      <td className="px-6 py-3 text-slate-700">{row.free}</td>
                      <td className="px-6 py-3 text-emerald-700 font-semibold">
                        {row.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA footer */}
          <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-semibold text-emerald-900">
                Siap mulai versi yang lebih konsisten?
              </p>
              <p className="text-sm text-emerald-800 mt-1">
                Ambil 1 langkah kecil hari ini. Premium bantu kamu menjaga
                ritmenya.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert("Upgrade flow (dummy).")}
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Upgrade sekarang (dummy)
            </button>
          </section>
        </>
      )}
    </div>
  );
}
