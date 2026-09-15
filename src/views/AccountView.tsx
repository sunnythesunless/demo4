import React, { useState } from 'react';
import { ViewTab } from '../types';

interface AccountViewProps {
  onNavigate: (tab: ViewTab) => void;
  onShowToast: (msg: string) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sign In fields
  const [signInEmail, setSignInEmail] = useState('procurement@apexsecurity.in');
  const [signInPass, setSignInPass] = useState('••••••••••••');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regGstin, setRegGstin] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regPass, setRegPass] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    onShowToast('✓ Signed in to Enterprise Portal');
  };

  const handleGoogleSignIn = () => {
    setIsLoggedIn(true);
    onShowToast('✓ Signed in via Google Workspace');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone) {
      onShowToast('Please fill in all required fields');
      return;
    }
    setIsLoggedIn(true);
    onShowToast('✓ Enterprise account created successfully!');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    onShowToast('Logged out of enterprise account');
  };

  if (isLoggedIn) {
    return (
      <div className="flex flex-col w-full pb-24">
        {/* Profile Card Header */}
        <section className="bg-gradient-to-b from-[#23323e] to-[#2f6388] text-white p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#9e2016] text-white flex items-center justify-center font-bold text-lg border-2 border-white shadow">
              AS
            </div>
            <div>
              <h2 className="font-['Montserrat'] font-bold text-base">Col. Rajesh Malhotra</h2>
              <p className="text-xs text-slate-200">Apex Security Solutions Pvt. Ltd.</p>
              <span className="inline-block mt-1 bg-[#117A65] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Tier-1 Corporate Account
              </span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded font-semibold transition-colors"
          >
            Sign Out
          </button>
        </section>

        {/* Quick Enterprise Shortcuts */}
        <div className="p-4 flex flex-col gap-3">
          <button
            onClick={() => onNavigate('tracking')}
            className="w-full bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between hover:bg-slate-50 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ecf4ff] text-[#2f6388] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              </div>
              <div>
                <strong className="font-['Montserrat'] text-xs text-[#0e1d29] block">Active Consignments</strong>
                <span className="text-[11px] text-slate-500">Track 1 in-flight shipment (AWB: BD-88492019-IN)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </button>

          <button
            onClick={() => onNavigate('custom-bulk-order')}
            className="w-full bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between hover:bg-slate-50 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ecf4ff] text-[#2f6388] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">request_quote</span>
              </div>
              <div>
                <strong className="font-['Montserrat'] text-xs text-[#0e1d29] block">Institutional RFQ Quotes</strong>
                <span className="text-[11px] text-slate-500">Create new bulk uniform requisition</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </button>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2 text-xs">
            <span className="font-['Montserrat'] font-bold text-slate-800 pb-1 border-b border-slate-100">
              Verified Enterprise Tax Credentials
            </span>
            <div className="flex justify-between text-slate-600">
              <span>Legal Entity:</span>
              <strong className="text-slate-800">Apex Security Solutions Pvt. Ltd.</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GSTIN Number:</span>
              <strong className="font-mono text-slate-800">07AABCA1234F1Z9</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Registered State:</span>
              <strong className="text-slate-800">Delhi (DL-07)</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#23323e] to-[#2f6388] text-white px-4 pt-6 pb-6 text-center shadow-md">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
          B2B Procurement & Retail
        </span>
        <h1 className="font-['Montserrat'] font-bold text-xl mt-1 text-white">
          Enterprise Account Portal
        </h1>
        <p className="text-xs text-slate-200 mt-0.5 max-w-xs mx-auto">
          Manage corporate billing addresses, repeat bulk reorders, and download GST tax invoices.
        </p>
      </section>

      {/* Tab Switcher */}
      <div className="mx-4 -mt-3 bg-white rounded-xl shadow-md border border-slate-200 p-1 flex">
        <button
          onClick={() => setAuthMode('signin')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            authMode === 'signin'
              ? 'bg-[#9e2016] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setAuthMode('signup')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            authMode === 'signup'
              ? 'bg-[#9e2016] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Create Corporate Account
        </button>
      </div>

      {/* Form Container */}
      <div className="p-4 flex flex-col gap-4">
        {authMode === 'signin' ? (
          /* Sign In Form */
          <form onSubmit={handleSignIn} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3 text-xs">
            <div>
              <label className="text-slate-600 font-semibold block mb-1">Corporate Work Email</label>
              <input
                type="email"
                required
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-600 font-semibold">Password</label>
                <button
                  type="button"
                  onClick={() => onShowToast('Password reset link dispatched to your work email')}
                  className="text-[11px] text-[#2f6388] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={signInPass}
                  onChange={(e) => setSignInPass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showPass ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#9e2016] accent-[#9e2016]"
              />
              <span className="text-slate-600">Remember this procurement terminal</span>
            </label>

            <button
              type="submit"
              className="mt-1 h-11 bg-[#9e2016] hover:bg-[#c0392b] text-white font-bold text-xs rounded shadow-md transition-colors"
            >
              Sign In to Procurement Hub
            </button>

            <div className="flex items-center gap-2 my-1">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-[10px] text-slate-400 uppercase">OR</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="h-10 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
                />
              </svg>
              <span>Continue with Google Workspace</span>
            </button>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignUp} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3 text-xs">
            <div>
              <label className="text-slate-600 font-semibold block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Vikram Singhania"
                className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Mobile (+91) *</label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-600 font-semibold block mb-1">GSTIN Number (Optional)</label>
              <input
                type="text"
                value={regGstin}
                onChange={(e) => setRegGstin(e.target.value.toUpperCase())}
                placeholder="07AAAAA0000A1Z5"
                className="w-full px-3 py-2 bg-slate-50 font-mono uppercase rounded border border-slate-200"
              />
            </div>

            <div>
              <label className="text-slate-600 font-semibold block mb-1">Organization / Entity Name</label>
              <input
                type="text"
                value={regCompany}
                onChange={(e) => setRegCompany(e.target.value)}
                placeholder="e.g. Grand Royale Hotels"
                className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200"
              />
            </div>

            <div>
              <label className="text-slate-600 font-semibold block mb-1">Create Password</label>
              <input
                type="password"
                required
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200"
              />
            </div>

            <button
              type="submit"
              className="mt-1 h-11 bg-[#9e2016] hover:bg-[#c0392b] text-white font-bold text-xs rounded shadow-md transition-colors"
            >
              Register Corporate Account
            </button>
          </form>
        )}

        {/* Corporate Credit Terms Hotline Banner */}
        <div className="bg-[#ecf4ff] p-4 rounded-xl border border-[#daeafb] flex items-center justify-between gap-3 text-xs">
          <div>
            <strong className="font-['Montserrat'] text-[#2f6388] block">30-Day Net Credit Terms?</strong>
            <p className="text-slate-600 text-[11px] mt-0.5">
              Available for registered companies with annual uniform spend exceeding ₹5 Lakhs.
            </p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hello%20Everbright%2C%20inquiry%20for%2030-day%20corporate%20credit%20terms"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2f6388] hover:bg-[#1a5276] text-white font-bold px-3 py-2 rounded shrink-0"
          >
            Apply Terms
          </a>
        </div>
      </div>
    </div>
  );
};
