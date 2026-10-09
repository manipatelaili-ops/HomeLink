import React, { useState } from 'react';
import { Heart, MapPin, Bed, Bath, Maximize2, ShieldCheck, Phone, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

export const PropertyCard = ({ property, onSelect, onToggleFavorite, isFavorite }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatFurnishing = (furn) => {
    if (furn === 'FURNISHED') return 'Fully Furnished';
    if (furn === 'SEMI_FURNISHED') return 'Semi-Furnished';
    return 'Unfurnished';
  };

  return (
    <div 
      onClick={() => onSelect(property)}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group"
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Carousel buttons if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600/90 backdrop-blur-sm text-white shadow-xs">
            <ShieldCheck className="w-3 h-3" />
            <span>Direct Owner • 0% Broker</span>
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 backdrop-blur-sm text-white uppercase">
            {formatFurnishing(property.furnishing)}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md transition-all hover:scale-110"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-black text-slate-900">₹{property.rentPrice?.toLocaleString()}</span>
              <span className="text-xs text-slate-500 font-medium"> / month</span>
            </div>
            {property.depositAmount && (
              <span className="text-xs text-slate-500">
                Deposit: <strong className="text-slate-700">₹{property.depositAmount.toLocaleString()}</strong>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-brand-600 transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center space-x-1 text-slate-500 text-xs mt-1.5 mb-4">
            <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span className="truncate">{property.address}, {property.city}</span>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center space-x-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>{property.bedrooms} BHK</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              <span>{property.areaSqFt ? `${property.areaSqFt} sqft` : 'Spacious'}</span>
            </div>
          </div>
        </div>

        {/* Footer info: Owner summary & View CTA */}
        <div className="mt-4 pt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
              {property.owner?.name ? property.owner.name.charAt(0) : 'O'}
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-slate-800 leading-tight truncate max-w-[110px]">
                {property.owner?.name || 'Verified Owner'}
              </p>
              <p className="text-[9px] text-emerald-600 font-bold uppercase">Zero Middleman</p>
            </div>
          </div>

          <button 
            className="px-3 py-1.5 rounded-lg bg-slate-900 group-hover:bg-brand-600 text-white text-xs font-bold transition-colors flex items-center space-x-1"
          >
            <span>Details</span>
          </button>
        </div>

      </div>
    </div>
  );
};
