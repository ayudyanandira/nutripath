// src/components/DashboardLayout.jsx
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 px-6 py-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
