// src/components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/profile", label: "Profile" },
  { to: "/diet-plans", label: "Diet Plans" },
  { to: "/progress", label: "Progress" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-60 md:w-64 flex-shrink-0">
      <div className="h-full py-5 px-3 md:px-4">
        <div className="h-full rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-50 shadow-lg shadow-emerald-100/40 flex flex-col">
          {/* Brand */}
          <div className="px-4 pt-3 pb-4 border-b border-slate-100 flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-lg font-bold">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.18em] text-emerald-600 font-semibold">
                NutriPath
              </span>
              <span className="text-xs text-slate-500">
                Personal Health Dashboard
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex w-full items-center rounded-lg px-3 py-2 transition text-sm font-medium",
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "text-slate-600 hover:bg-slate-50",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Footer / logout */}
          <div className="px-3 pb-4 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>

            <p className="mt-2 text-[10px] text-slate-400 text-center">
              Mode demo &mdash; sebagian data masih statis.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}