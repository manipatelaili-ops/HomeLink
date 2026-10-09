import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AddPropertyModal } from './components/AddPropertyModal';
import { OwnerDashboard } from './components/OwnerDashboard';
import { TenantDashboard } from './components/TenantDashboard';
import { SavingsCalculator } from './components/SavingsCalculator';
import { HowItWorks } from './components/HowItWorks';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { api } from './services/api';

function MainApp() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('explore'); // explore, calculator, howItWorks, owner-dashboard, tenant-dashboard
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: '',
    furnishing: '',
    keyword: '',
  });

  const [sortBy, setSortBy] = useState('newest');

  // Modals
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  // Load properties and platform stats
  const fetchProperties = async (currentFilters = filters) => {
    setLoading(true);
    try {
      const data = await api.getProperties(currentFilters);
      setProperties(data || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchProperties(filters);
    fetchStats();
  }, [filters.city, filters.propertyType, filters.bedrooms, filters.furnishing, filters.maxPrice]);

  const handleSearch = () => {
    fetchProperties(filters);
  };

  const handleResetFilters = () => {
    const emptyFilters = {
      city: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      propertyType: '',
      furnishing: '',
      keyword: '',
    };
    setFilters(emptyFilters);
    fetchProperties(emptyFilters);
  };

  const handleToggleFavorite = async (propertyId) => {
    const res = await api.toggleFavorite(propertyId);
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, isFavorite: res.isFavorite } : p))
    );
    if (selectedProperty && selectedProperty.id === propertyId) {
      setSelectedProperty({ ...selectedProperty, isFavorite: res.isFavorite });
    }
  };

  // Sort properties
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'price-asc') return (a.rentPrice || 0) - (b.rentPrice || 0);
    if (sortBy === 'price-desc') return (b.rentPrice || 0) - (a.rentPrice || 0);
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  const favoritesCount = properties.filter((p) => p.isFavorite).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onOpenAddProperty={() => setIsAddPropertyOpen(true)}
        favoritesCount={favoritesCount}
      />

      {/* Main Content Area based on activeTab */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <>
            <Hero
              filters={filters}
              setFilters={setFilters}
              onSearch={handleSearch}
              stats={stats}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <FilterBar
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
                totalCount={sortedProperties.length}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {loading ? (
                <div className="text-center py-24 text-slate-400">
                  <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-sm font-semibold">Loading verified homes...</p>
                </div>
              ) : sortedProperties.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border border-slate-200">
                  <p className="text-base font-bold text-slate-800">No properties matched your criteria</p>
                  <p className="text-xs text-slate-500 mt-1">Try resetting the filters to explore all available listings.</p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {sortedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSelect={(prop) => setSelectedProperty(prop)}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={property.isFavorite}
                    />
                  ))}
                </div>
              )}
            </div>

            <SavingsCalculator onExploreClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })} />
            <HowItWorks onStartExploring={() => window.scrollTo({ top: 300, behavior: 'smooth' })} />
          </>
        )}

        {activeTab === 'calculator' && (
          <div className="pt-6">
            <SavingsCalculator onExploreClick={() => setActiveTab('explore')} />
          </div>
        )}

        {activeTab === 'howItWorks' && (
          <div className="pt-6">
            <HowItWorks onStartExploring={() => setActiveTab('explore')} />
          </div>
        )}

        {activeTab === 'owner-dashboard' && (
          <OwnerDashboard
            onOpenAddProperty={() => setIsAddPropertyOpen(true)}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
          />
        )}

        {activeTab === 'tenant-dashboard' && (
          <TenantDashboard
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={selectedProperty.isFavorite}
          onInquirySent={() => {
            fetchStats();
          }}
        />
      )}

      {/* Add Property Modal */}
      {isAddPropertyOpen && (
        <AddPropertyModal
          onClose={() => setIsAddPropertyOpen(false)}
          onPropertyAdded={(newProp) => {
            setProperties([newProp, ...properties]);
            fetchStats();
            alert('Property listed successfully! Direct inquiries will appear in your dashboard.');
          }}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
