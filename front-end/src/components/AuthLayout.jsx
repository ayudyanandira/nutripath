// src/components/AuthLayout.jsx
export default function AuthLayout({ title, description, children, bottom }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md px-8 py-10">
        <p className="text-sm font-semibold text-emerald-600 mb-1">
          NutriPath
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-slate-600 mb-6">
            {description}
          </p>
        )}

        {/* form/content */}
        <div className="space-y-4">
          {children}
        </div>

        {/* teks di bagian bawah (link login/register) */}
        {bottom && (
          <div className="mt-4 text-sm text-slate-600">
            {bottom}
          </div>
        )}
      </div>
    </div>
  );
}
