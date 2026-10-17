'use client';

import React, { useState } from 'react';

export default function VelozityContact() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Web App']);
  const [budget, setBudget] = useState('$5k — $10k');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const servicesList = [
    'Web App',
    'Mobile App',
    'AI & Automation',
    'Paid Ads & Marketing',
    'Brand & UI/UX',
    'Ongoing Retainer',
  ];

  const budgetOptions = [
    '$2k — $5k',
    '$5k — $10k',
    '$10k — $25k',
    '$25k+',
  ];

  const toggleService = (s: string) => {
    if (selectedServices.includes(s)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((item) => item !== s));
      }
    } else {
      setSelectedServices([...selectedServices, s]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate immediate response
    setTimeout(() => {
      setStatus('success');
    }, 900);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#f8faf8] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-xs font-semibold text-[#0a0e0c] mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]" />
            <span>START A CONVERSATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a0e0c] tracking-tight mb-4">
            Let&apos;s Build Something{' '}
            <span className="gradient-text-emerald">High-Performance.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#526159]">
            Tell us where your product or growth stands today and where you want to be. Founders Dhanush and Rishi will respond within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-black/8 p-8 sm:p-12 shadow-card">
          {status === 'success' ? (
            <div className="py-12 text-center max-w-md mx-auto">
              <span className="w-16 h-16 rounded-full bg-emerald-50 text-[#059669] text-3xl flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                ✓
              </span>
              <h3 className="text-2xl font-extrabold text-[#0a0e0c] mb-2">Message Received</h3>
              <p className="text-sm text-[#526159] mb-6">
                Thank you, {name || 'there'}. Dhanush and Rishi have received your project details and will email you back within 24 hours with initial thoughts.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-xs font-bold text-[#063d27] underline hover:text-[#059669]"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection Pills */}
              <div>
                <label className="block text-xs font-bold text-[#0a0e0c] uppercase tracking-wider mb-3">
                  I&apos;m interested in: (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-[#063d27] text-white border-[#063d27] shadow-sm'
                            : 'bg-[#f8faf8] text-[#526159] border-black/8 hover:border-black/20'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range Selection */}
              <div>
                <label className="block text-xs font-bold text-[#0a0e0c] uppercase tracking-wider mb-3">
                  Estimated Project Budget:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {budgetOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setBudget(opt)}
                      className={`p-3 rounded-xl text-xs font-bold text-center transition-all border ${
                        budget === opt
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-500 shadow-sm'
                          : 'bg-[#f8faf8] text-[#526159] border-black/8 hover:border-black/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0a0e0c] mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-black/8 text-sm text-[#0a0e0c] placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0a0e0c] mb-1.5">Your Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-black/8 text-sm text-[#0a0e0c] placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0a0e0c] mb-1.5">Company or Website (Optional)</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-black/8 text-sm text-[#0a0e0c] placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0a0e0c] mb-1.5">Tell us about your project or growth goals *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What are you building? What problems are you solving? What timeline are you targeting?"
                  className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-black/8 text-sm text-[#0a0e0c] placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-xs text-[#66756d]">
                  🔒 Your information is confidential. No spam or sales calls.
                </span>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0a0e0c] text-white font-bold text-sm hover:bg-[#063d27] transition-all shadow-md hover:shadow-emerald-950/20 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Send Project Inquiry →'}
                </button>
              </div>
            </form>
          )}

          {/* Quick Direct Contacts */}
          <div className="mt-10 pt-8 border-t border-black/8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left text-xs text-[#66756d]">
            <div>
              <div className="font-bold text-[#0a0e0c] mb-0.5">Direct Studio Email</div>
              <a href="mailto:hello@majin.studio" className="text-emerald-700 font-semibold hover:underline">
                hello@majin.studio
              </a>
            </div>
            <div>
              <div className="font-bold text-[#0a0e0c] mb-0.5">Studio Base</div>
              <span>Hyderabad, India (Global Remote Delivery)</span>
            </div>
            <div>
              <div className="font-bold text-[#0a0e0c] mb-0.5">Founders Online</div>
              <span>Dhanush & Rishi • Active Today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
