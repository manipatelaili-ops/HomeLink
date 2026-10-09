import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MessageSquare, Phone, MapPin, Building, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { PropertyCard } from './PropertyCard';

export const TenantDashboard = ({ onSelectProperty, onToggleFavorite }) => {
  const [activeTab, setActiveTab] = useState('favorites'); // 'favorites' | 'inquiries'
  const [favorites, setFavorites] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [favData, inqData] = await Promise.all([
        api.getFavorites(),
        api.getMyInquiries(),
      ]);
      setFavorites(favData || []);
      setInquiries(inqData || []);
    } catch (err) {
      console.error('Failed to load tenant dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveFavorite = async (propertyId) => {
    await onToggleFavorite(propertyId);
    setFavorites((prev) => prev.filter((p) => p.id !== propertyId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Tenant Portal</h1>
        <p className="text-slate-500 text-sm mt-1">
          Track your favorite shortlisted rental homes and manage your direct owner visit requests.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 my-6">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'favorites'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-500" />
          <span>Saved Favorites ({favorites.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'inquiries'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4 text-brand-600" />
          <span>My Inquiries & Visits ({inquiries.length})</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading your saved properties...</div>
      ) : activeTab === 'favorites' ? (
        favorites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No saved homes yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Click the heart icon on any property card to bookmark homes you love and compare them later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
                onToggleFavorite={handleRemoveFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )
      ) : (
        /* Inquiries Tab */
        inquiries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No active inquiries</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              When you send messages or request visits for rental properties, they will appear here with owner contact details.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  {inquiry.propertyImage && (
                    <img
                      src={inquiry.propertyImage}
                      alt="property"
                      className="w-20 h-20 rounded-xl object-cover shrink-0 hidden sm:block border border-slate-200"
                    />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-base">{inquiry.propertyTitle}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          inquiry.status === 'ACCEPTED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inquiry.status === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {inquiry.status === 'ACCEPTED' ? 'Visit Approved' : inquiry.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-600" />
                      <span>{inquiry.propertyAddress}, {inquiry.propertyCity}</span>
                      {inquiry.rentPrice && (
                        <>
                          <span>•</span>
                          <span className="font-bold text-slate-900">₹{inquiry.rentPrice.toLocaleString()}/mo</span>
                        </>
                      )}
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2 text-xs text-slate-600">
                      <p className="font-medium text-slate-700">Your message:</p>
                      <p className="italic text-slate-500">"{inquiry.message}"</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-600">
                      {inquiry.preferredVisitDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-600" />
                          <span>Scheduled Visit: <strong>{inquiry.preferredVisitDate}</strong></span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Owner: <strong>{inquiry.owner?.name || 'Verified Owner'}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Action with Owner */}
                <div className="flex items-center space-x-2 self-end md:self-center">
                  <a
                    href={`tel:${inquiry.owner?.phone || '+919876543210'}`}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Owner</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )
      )}

    </div>
  );
};
