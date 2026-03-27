'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, EnvelopeSimple, CheckCircle } from '@phosphor-icons/react/dist/ssr';

const subjects = ['General Inquiry', 'Order Support', 'Product Question', 'Returns & Exchanges', 'Other'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 2000);
  }

  function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-zinc-700 mb-1.5">{label}</label>
        {children}
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  const inputClass = (err?: string) =>
    `w-full rounded-xl border ${err ? 'border-red-300' : 'border-slate-200'} px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 bg-white`;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-3">Get in Touch</h1>
        <p className="text-zinc-500 text-lg">Have a question or need help? We&apos;d love to hear from you.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 80, damping: 20 }}
        >
          <div className="space-y-5 mb-10">
            {[
              { icon: <MapPin size={18} />, label: 'Address', value: '123 Tech Boulevard\nSan Francisco, CA 94105' },
              { icon: <Phone size={18} />, label: 'Phone', value: '+1 (415) 829-7340' },
              { icon: <EnvelopeSimple size={18} />, label: 'Email', value: 'support@yeezytech.com' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-0.5">{item.label}</p>
                  <p className="text-sm text-zinc-700 whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Business Hours</p>
            <div className="text-sm text-zinc-600 space-y-1">
              <p>Mon &ndash; Fri: 9am &ndash; 6pm PST</p>
              <p>Sat &ndash; Sun: 10am &ndash; 4pm PST</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 80, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <CheckCircle size={64} weight="fill" className="text-emerald-500 mb-4" />
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Message Sent!</h3>
                <p className="text-zinc-500 mb-6">We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSuccess(false); setForm({ name: '', email: '', subject: subjects[0], message: '' }); }}
                  className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="name" label="Full Name" error={errors.name}>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass(errors.name)}
                      placeholder="Your name"
                    />
                  </Field>
                  <Field id="email" label="Email Address" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass(errors.email)}
                      placeholder="you@example.com"
                    />
                  </Field>
                </div>
                <Field id="subject" label="Subject">
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputClass()}
                  >
                    {subjects.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field id="message" label="Message" error={errors.message}>
                  <textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass(errors.message)} resize-none`}
                    placeholder="How can we help you?"
                  />
                </Field>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#000435] hover:bg-[#000328] text-white rounded-xl px-8 py-3.5 text-sm font-medium active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : 'Send Message'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}