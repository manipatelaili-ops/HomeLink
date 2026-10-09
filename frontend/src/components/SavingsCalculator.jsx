import React, { useState } from 'react';
import { IndianRupee, Sparkles, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const SavingsCalculator = ({ onExploreClick }) => {
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [tenancyMonths, setTenancyMonths] = useState(12);

  // Standard broker fees: typically 1 month rent in top metros (or 15 days on renewal)
  const brokerFee = monthlyRent * 1.0;
  const renewalFee = monthlyRent * 0.5;
  const totalMiddlemanCost = brokerFee + (tenancyMonths > 11 ? renewalFee : 0);

  return (
    <div className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Interactive Cost Analysis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            How Much Do You Lose To Brokers?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            See the exact difference between standard broker-driven renting versus HomeLink's direct owner platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left: Interactive Controls */}
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-700">Estimated Monthly Rent</label>
                  <span className="text-xl font-extrabold text-brand-600">₹{monthlyRent.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="8000"
                  max="100000"
                  step="1000"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>₹8,000</span>
                  <span>₹50,000</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-700">Duration of Stay</label>
                  <span className="text-sm font-bold text-slate-900">{tenancyMonths} Months</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[6, 12, 24].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTenancyMonths(m)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        tenancyMonths === m
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m} Months
                    </button>
                  ))}
                </div>
              </div>

              {/* Comparison table */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-200 text-slate-600">
                  <span className="flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>Traditional Broker Commission (1 Month)</span>
                  </span>
                  <span className="font-bold text-rose-600">+ ₹{brokerFee.toLocaleString()}</span>
                </div>

                {tenancyMonths > 11 && (
                  <div className="flex items-center justify-between text-xs py-2 border-b border-slate-200 text-slate-600">
                    <span className="flex items-center space-x-1.5">
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>Yearly Renewal Broker Fee</span>
                    </span>
                    <span className="font-bold text-rose-600">+ ₹{renewalFee.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs py-2 text-slate-600">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-800">HomeLink Platform Brokerage Fee</span>
                  </span>
                  <span className="font-extrabold text-emerald-600 text-sm">₹0 (FREE)</span>
                </div>
              </div>
            </div>

            {/* Right: Big Impact Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl"></div>
              
              <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Total Savings</span>
              </div>

              <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight my-2">
                ₹{totalMiddlemanCost.toLocaleString()}
              </div>

              <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Money you keep straight in your bank account instead of giving it away to a middleman.
              </p>

              <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-col space-y-3">
                <button
                  onClick={onExploreClick}
                  className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Browse Brokerage-Free Homes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-slate-400">Direct owner mobile numbers & WhatsApp enabled</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
