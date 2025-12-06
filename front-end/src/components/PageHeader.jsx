// src/components/PageHeader.jsx
export default function PageHeader({ title, subtitle }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {subtitle && (
        <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
      )}
    </header>
  );
}