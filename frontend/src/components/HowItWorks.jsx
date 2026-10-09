import React from 'react';
import { ShieldCheck, UserCheck, MessageSquare, Key, ArrowRight, Zap, CheckCircle2, Server, Database, Code2 } from 'lucide-react';

export const HowItWorks = ({ onStartExploring }) => {
  return (
    <div className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Concept & Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Housing Rental Without Middlemen
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            HomeLink eliminates unfair broker commissions by enabling direct, verified communication between genuine homeowners and prospective tenants.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-black text-xl mb-6">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Verified Owner Listings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Property owners publish accurate details, transparent monthly rents, deposit amounts, and actual photographs without broker markups.
            </p>
            <div className="mt-6 flex items-center space-x-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Zero Fake Listings</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-black text-xl mb-6">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Direct Tenant Contact</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tenants browse and directly connect with owners via telephone or WhatsApp. No gatekeeping, no agent excuses, no commissions.
            </p>
            <div className="mt-6 flex items-center space-x-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct Phone & WhatsApp</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-black text-xl mb-6">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Visit & Move In</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Schedule free property visits directly with the owner, inspect the home, agree on terms, and save ₹20,000 to ₹50,000+ per lease.
            </p>
            <div className="mt-6 flex items-center space-x-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Full 1-Month Rent</span>
            </div>
          </div>

        </div>

        {/* Technical Architecture Highlight for University Review */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Technical Foundation</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Full-Stack University Architecture</h3>
            </div>
            <button
              onClick={onStartExploring}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs self-start md:self-auto"
            >
              <span>Explore Active Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-2">
                <Code2 className="w-4 h-4 text-brand-600" />
                <span>Frontend Layer</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                React.js + Vite with Tailwind CSS. Modular component state, interactive savings calculator, responsive layouts, deployed to Vercel.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-2">
                <Server className="w-4 h-4 text-brand-600" />
                <span>Backend Services</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Java 17 & Spring Boot 3. RESTful endpoints, Spring Security with stateless JWT authorization, Jakarta Bean validation, deployed to Render.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-2">
                <Database className="w-4 h-4 text-brand-600" />
                <span>Data Persistence</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                PostgreSQL with Spring Data JPA & Hibernate. Relational models for Users, Properties, Inquiries, and Favorites with clean ER modeling.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
