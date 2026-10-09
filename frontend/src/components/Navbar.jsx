import React, { useState } from 'react';
import { Home, ShieldCheck, Heart, User, LogOut, PlusCircle, LayoutDashboard, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ activeTab, setActiveTab, onOpenAuth, onOpenAddProperty, favoritesCount }) => {
  const { user, logout, isOwner, isTenant, loginAsDemoOwner, loginAsDemoTenant } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('explore')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Home className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">Home<span className="text-brand-600">Link</span></span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">0% Brokerage</span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Direct Owner-to-Tenant Housing</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'explore' ? 'bg-slate-100 text-brand-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Explore Homes
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'calculator' ? 'bg-slate-100 text-brand-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Savings Calculator
            </button>
            <button
              onClick={() => setActiveTab('howItWorks')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'howItWorks' ? 'bg-slate-100 text-brand-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Why Zero-Broker?
            </button>

            {/* Tenant saved link */}
            <button
              onClick={() => setActiveTab('tenant-dashboard')}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'tenant-dashboard' ? 'bg-slate-100 text-brand-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Saved</span>
              {favoritesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-rose-500 text-white rounded-full font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Action CTAs & Auth */}
          <div className="flex items-center space-x-3">
            {/* Quick Demo shortcuts for presentations */}
            {!user && (
              <div className="hidden lg:flex items-center space-x-2 text-xs bg-slate-100 p-1 rounded-lg border border-slate-200">
                <span className="text-slate-500 pl-1 font-medium">Demo:</span>
                <button
                  onClick={loginAsDemoOwner}
                  className="px-2 py-1 bg-white hover:bg-slate-50 text-slate-700 rounded shadow-xs font-medium"
                >
                  Owner
                </button>
                <button
                  onClick={loginAsDemoTenant}
                  className="px-2 py-1 bg-white hover:bg-slate-50 text-slate-700 rounded shadow-xs font-medium"
                >
                  Tenant
                </button>
              </div>
            )}

            {/* Post Property CTA */}
            {isOwner ? (
              <button
                onClick={onOpenAddProperty}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ List Property</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!user) {
                    onOpenAuth('register');
                  } else {
                    alert('Please log in with an Owner account to list properties.');
                  }
                }}
                className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-brand-600 text-brand-700 hover:bg-brand-50 text-sm font-medium transition-all"
              >
                <KeyRound className="w-4 h-4" />
                <span>Post Free Listing</span>
              </button>
            )}

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block pr-2">
                    <p className="text-xs font-bold text-slate-900 leading-tight">{user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{user.role === 'ROLE_OWNER' ? 'Owner' : 'Tenant'}</p>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-700">
                        {user.role}
                      </span>
                    </div>

                    {isOwner && (
                      <button
                        onClick={() => {
                          setActiveTab('owner-dashboard');
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-500" />
                        <span>Owner Dashboard</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveTab('tenant-dashboard');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Heart className="w-4 h-4 text-slate-500" />
                      <span>Saved & Inquiries</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
