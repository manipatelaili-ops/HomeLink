import React, { useState, useEffect } from 'react';
import { Building, Users, Calendar, Phone, Trash2, CheckCircle, XCircle, Clock, PlusCircle } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const OwnerDashboard = ({ onOpenAddProperty, onSelectProperty }) => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'listings'
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [propsData, inqsData] = await Promise.all([
        api.getMyListings(),
        api.getOwnerInquiries(),
      ]);
      setListings(propsData || []);
      setInquiries(inqsData || []);
    } catch (err) {
      console.error('Failed to load owner dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      await api.updateInquiryStatus(inquiryId, newStatus);
      setInquiries((prev) =>
        prev.map((i) => (i.id === inquiryId ? { ...i, status: newStatus } : i))
      );
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDeleteListing = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await api.deleteProperty(propertyId);
        setListings((prev) => prev.filter((p) => p.id !== propertyId));
      } catch (err) {
        alert('Failed to delete property: ' + err.message);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Owner Management Portal</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your properties and connect directly with tenants looking for rental homes.
          </p>
        </div>

        <button
          onClick={onOpenAddProperty}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add New Property</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{listings.length}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase">My Active Properties</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{inquiries.length}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase">Tenant Inquiries</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">
              {inquiries.filter((i) => i.status === 'PENDING').length}
            </p>
            <p className="text-xs font-semibold text-slate-500 uppercase">Pending Requests</p>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'inquiries'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Tenant Inquiries & Visits ({inquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'listings'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Listed Properties ({listings.length})
        </button>
      </div>

      {/* Tab Content */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading dashboard data...</div>
      ) : activeTab === 'inquiries' ? (
        <div>
          {inquiries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No inquiries yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tenants interested in your listings will appear here with their direct phone number and requested visit dates.
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
                        className="w-16 h-16 rounded-xl object-cover shrink-0 hidden sm:block border border-slate-200"
                      />
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-base">{inquiry.tenant?.name || 'Prospective Tenant'}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            inquiry.status === 'ACCEPTED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inquiry.status === 'REJECTED'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        Property: <strong className="text-slate-800">{inquiry.propertyTitle}</strong>
                      </p>

                      <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2 max-w-2xl">
                        "{inquiry.message}"
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3.5 h-3.5 text-brand-600" />
                          <span className="font-semibold">{inquiry.phone || inquiry.tenant?.phone}</span>
                        </div>
                        {inquiry.preferredVisitDate && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5 text-brand-600" />
                            <span>Requested Visit: <strong>{inquiry.preferredVisitDate}</strong></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center space-x-2 self-end md:self-center">
                    <a
                      href={`tel:${inquiry.phone || inquiry.tenant?.phone}`}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>

                    {inquiry.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(inquiry.id, 'ACCEPTED')}
                          className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Accept Visit</span>
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(inquiry.id, 'REJECTED')}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold"
                        >
                          <span>Decline</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Listings Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-4 flex flex-col justify-between"
            >
              <div>
                <img
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h4>
                  <span className="text-xs font-extrabold text-brand-600 shrink-0 ml-2">₹{item.rentPrice?.toLocaleString()}/mo</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.address}, {item.city}</p>
                <div className="flex items-center space-x-2 text-[11px] text-slate-600 mt-2">
                  <span>{item.bedrooms} BHK</span>
                  <span>•</span>
                  <span>{item.bathrooms} Bath</span>
                  <span>•</span>
                  <span>{item.furnishing}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectProperty(item)}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteListing(item.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
