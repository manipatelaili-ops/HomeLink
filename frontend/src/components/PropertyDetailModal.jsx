import React, { useState } from 'react';
import { 
  X, Heart, MapPin, Bed, Bath, Maximize2, ShieldCheck, 
  Phone, MessageSquare, Calendar, Check, Send, Sparkles, AlertCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const PropertyDetailModal = ({ property, onClose, onToggleFavorite, isFavorite, onInquirySent }) => {
  const { user } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const [visitDate, setVisitDate] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [message, setMessage] = useState(
    'Hi, I am interested in renting your property listed on HomeLink. Can we arrange a walkthrough?'
  );
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!property) return null;

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'];

  const handleSendInquiry = async (e) => {
    e.preventDefault();
    if (!user) {
      setErrorMsg('Please sign in to contact the owner and schedule a visit.');
      return;
    }

    setSending(true);
    setErrorMsg('');
    try {
      await api.createInquiry({
        propertyId: property.id,
        phone: phone || user.phone,
        preferredVisitDate: visitDate || null,
        message: message,
      });
      setSendSuccess(true);
      if (onInquirySent) onInquirySent();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const cleanOwnerPhone = property.owner?.phone ? property.owner.phone.replace(/[^0-9]/g, '') : '919876543210';
  const whatsappUrl = `https://wa.me/${cleanOwnerPhone}?text=${encodeURIComponent(
    `Hello ${property.owner?.name || 'Owner'}, I saw your listing "${property.title}" on HomeLink and would like to connect directly regarding renting.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        
        {/* Top Header sticky bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Brokerage Direct Listing</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      idx === activeImage ? 'border-brand-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Pricing Overview */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {property.title}
              </h2>
              <div className="flex items-center space-x-1.5 text-slate-500 text-sm mt-2">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <span>{property.address}, {property.city} - {property.pincode || 'Pincode on request'}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 text-left md:text-right">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                ₹{property.rentPrice?.toLocaleString()}
                <span className="text-sm font-semibold text-slate-500"> / mo</span>
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Security Deposit: <strong>₹{property.depositAmount?.toLocaleString() || 'Negotiable'}</strong>
              </div>
              <div className="text-[11px] font-bold text-emerald-600 mt-0.5">
                Saved Brokerage: ~₹{property.rentPrice?.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Key Specs Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold mb-1">
                <Bed className="w-4 h-4 text-brand-600" />
                <span>Bedrooms</span>
              </div>
              <p className="text-base font-bold text-slate-900">{property.bedrooms} BHK</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold mb-1">
                <Bath className="w-4 h-4 text-brand-600" />
                <span>Bathrooms</span>
              </div>
              <p className="text-base font-bold text-slate-900">{property.bathrooms} Bathrooms</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold mb-1">
                <Maximize2 className="w-4 h-4 text-brand-600" />
                <span>Super Built-up</span>
              </div>
              <p className="text-base font-bold text-slate-900">{property.areaSqFt ? `${property.areaSqFt} sq.ft` : 'Spacious'}</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold mb-1">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Furnishing</span>
              </div>
              <p className="text-base font-bold text-slate-900">{property.furnishing?.replace('_', ' ')}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">About this Home</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">Amenities & Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Owner Contact Card & Schedule Visit Section */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 rounded-3xl p-6 sm:p-8 border border-emerald-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-emerald-200/60">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                  {property.owner?.name ? property.owner.name.charAt(0) : 'O'}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-bold text-slate-900">{property.owner?.name || 'Verified Property Owner'}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 uppercase">
                      Direct Owner
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Member on HomeLink • Verified Identity & Property Papers
                  </p>
                </div>
              </div>

              {/* Instant Call / WhatsApp Buttons */}
              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${property.owner?.phone || '+919876543210'}`}
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Directly</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Visit / Inquiry Form */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-brand-600" />
                <span>Schedule a Free Visit / Send Direct Message</span>
              </h4>

              {sendSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-medium space-y-1">
                  <p className="font-bold flex items-center space-x-1">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Inquiry sent directly to {property.owner?.name || 'owner'}!</span>
                  </p>
                  <p>You can track the owner's response and contact details under your "Dashboard & Inquiries" tab.</p>
                </div>
              ) : (
                <form onSubmit={handleSendInquiry} className="space-y-3">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Visit Date</label>
                      <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Message to Owner</label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{sending ? 'Sending Inquiry...' : 'Submit Inquiry & Request Visit'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
