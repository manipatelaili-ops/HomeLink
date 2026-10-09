import React from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const FilterBar = ({ filters, setFilters, onReset, totalCount, sortBy, setSortBy }) => {
  const propertyTypes = [
    { label: 'All Types', value: '' },
    { label: 'Apartment', value: 'APARTMENT' },
    { label: 'Studio', value: 'STUDIO' },
    { label: 'Villa', value: 'VILLA' },
    { label: 'PG / Co-Living', value: 'PG_CO_LIVING' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 mb-8 shadow-xs">
      
      {/* Top search & sorting row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-5 border-b border-slate-100">
        
        {/* Keyword Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by society, locality or keyword..."
            value={filters.keyword}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Right: Results count & Sort */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-slate-900">{totalCount}</strong> verified homes
          </span>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 py-1.5 px-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Types Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto py-4 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">Type:</span>
        {propertyTypes.map((type) => (
          <button
            key={type.label}
            onClick={() => setFilters({ ...filters, propertyType: type.value })}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filters.propertyType === type.value
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Bottom Dropdowns & Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
        
        {/* City Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">City</label>
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
          >
            <option value="">All Cities</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Delhi NCR">Delhi NCR</option>
          </select>
        </div>

        {/* Bedrooms Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Bedrooms</label>
          <select
            value={filters.bedrooms}
            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
          >
            <option value="">Any BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
          </select>
        </div>

        {/* Furnishing */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Furnishing</label>
          <select
            value={filters.furnishing}
            onChange={(e) => setFilters({ ...filters, furnishing: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
          >
            <option value="">Any Furnishing</option>
            <option value="FURNISHED">Fully Furnished</option>
            <option value="SEMI_FURNISHED">Semi Furnished</option>
            <option value="UNFURNISHED">Unfurnished</option>
          </select>
        </div>

        {/* Max Budget & Reset */}
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Max Rent: {filters.maxPrice ? `₹${Number(filters.maxPrice).toLocaleString()}` : 'Any'}
            </label>
            <input
              type="range"
              min="10000"
              max="60000"
              step="5000"
              value={filters.maxPrice || 60000}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>
          <button
            onClick={onReset}
            title="Reset Filters"
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
