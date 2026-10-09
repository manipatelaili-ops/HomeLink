import React from 'react';
import { Search, Shield, Zap, IndianRupee, MapPin, Building, Home, Users } from 'lucide-react';

export const Hero = ({ filters, setFilters, onSearch, stats }) => {
  const cities = ['All Cities', 'Bangalore', 'Mumbai', 'Pune', 'Hyderabad', 'Delhi NCR'];
  const propertyTypes = [
    { label: 'All Types', value: '' },
    { label: 'Apartment', value: 'APARTMENT' },
    { label: 'Studio', value: 'STUDIO' },
    { label: 'Villa', value: 'VILLA' },
    { label: 'PG / Co-Living', value: 'PG_CO_LIVING' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white pt-10 pb-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* University Project Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Housing Platform • 100% Zero Brokerage</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Rent Directly From Owners. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500">
              Never Pay A Broker Again.
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            HomeLink bridges tenants and verified property owners directly. Discover verified rental homes, connect instantly via phone or WhatsApp, and eliminate 1–2 months of needless broker commission.
          </p>
        </div>

        {/* Interactive Search Box */}
        <div className="mt-10 max-w-4xl mx-auto bg-white p-4 sm:p-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span>Location</span>
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value === 'All Cities' ? '' : e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-brand-600" />
                <span>Property Type</span>
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {propertyTypes.map((t) => (
                  <option key={t.label} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* BHK Bedrooms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                <Home className="w-3.5 h-3.5 text-brand-600" />
                <span>Bedrooms (BHK)</span>
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">Any BHK</option>
                <option value="1">1 BHK / Studio</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            {/* Search Submit */}
            <div className="flex items-end">
              <button
                onClick={onSearch}
                className="w-full flex items-center justify-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md shadow-brand-500/20 transition-all hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                <span>Search Homes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Metrics Strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 text-center shadow-xs">
            <p className="text-2xl font-black text-slate-900">{stats?.totalProperties || 8}+</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Verified Listings</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 text-center shadow-xs">
            <p className="text-2xl font-black text-brand-600">0%</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Middlemen & Brokerage</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 text-center shadow-xs">
            <p className="text-2xl font-black text-slate-900">{stats?.totalCities || 5}+</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Active Cities</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 text-center shadow-xs">
            <p className="text-2xl font-black text-emerald-600">
              ₹{((stats?.estimatedBrokerageSaved || 169500) / 1000).toFixed(0)}k+
            </p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Tenant Fees Saved</p>
          </div>
        </div>

      </div>
    </div>
  );
};
