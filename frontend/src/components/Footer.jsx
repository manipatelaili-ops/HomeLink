import React from 'react';
import { Home, ShieldCheck, Heart, ExternalLink, Code2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-slate-900">Home<span className="text-brand-600">Link</span></span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                Zero Brokerage
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              HomeLink is a full-stack university software engineering project designed to eliminate brokerage fees by connecting tenants directly with property owners.
            </p>
            <div className="flex items-center space-x-2 pt-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Recommended Tech Stack:</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700">Spring Boot 3</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700">React + Vite</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700">PostgreSQL</span>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Key Features</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>Direct Owner Phone & WhatsApp</li>
              <li>Schedule Property Visits</li>
              <li>Savings & Cost Calculator</li>
              <li>Role-based Access Control (JWT)</li>
              <li>Owner Property Dashboard</li>
            </ul>
          </div>

          {/* Deployment info */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Deployment Targets</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center space-x-1.5">
                <span>Frontend:</span>
                <strong className="text-slate-800">Vercel</strong>
              </li>
              <li className="flex items-center space-x-1.5">
                <span>Backend:</span>
                <strong className="text-slate-800">Render</strong>
              </li>
              <li className="flex items-center space-x-1.5">
                <span>Database:</span>
                <strong className="text-slate-800">Neon / Supabase PostgreSQL</strong>
              </li>
              <li className="flex items-center space-x-1.5">
                <span>Version Control:</span>
                <strong className="text-slate-800">GitHub</strong>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} HomeLink — Full-Stack University Capstone Project.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Direct Owner Verified</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
