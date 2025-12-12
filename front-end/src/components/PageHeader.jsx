// src/components/PageHeader.jsx
import React from "react";

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6 np-page-header-animate">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-sm text-slate-600 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
