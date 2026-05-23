'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

const contactInfo = [
  { icon: 'schedule', label: 'Office Hours', value: 'Mon Fri: 09:00 - 17:00', sub: 'Always on for critical alerts' },
  { icon: 'alternate_email', label: 'Email', value: 'webxautomation@gmail.com', sub: 'Response within 4 hours' },
]

const PHP_ENDPOINT = '/api/contact/'
const RECAPTCHA_SITE_KEY = '6LfGJfMsAAAAALzd9Cj2zUOlnNVLahi0q-cswIPg' // your v3 key

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [agreeError, setAgreeError] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const getRecaptchaToken = () => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject(new Error('reCAPTCHA not loaded'))
        return
      }
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' })
          .then(resolve)
          .catch(reject)
      })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!agreed) {
      setAgreeError(true)
      return
    }

    setAgreeError(false)
    setLoading(true)
    setError('')

    try {
      const token = await getRecaptchaToken()

      const res = await fetch(PHP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recaptcha_token: token, agreed }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        setForm({ name: '', email: '', subject: '', message: '' })
        setAgreed(false)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Could not connect. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">

      <style>{`
        .terms-check-box {
          width: 20px; height: 20px;
          border-radius: 6px;
          border: 2px solid rgba(214,0,141,0.3);
          background: rgba(214,0,141,0.04);
          flex-shrink: 0;
          margin-top: 2px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .terms-check-box.checked {
          background: #D6008D;
          border-color: #D6008D;
        }
        .terms-check-box.shake {
          border-color: #ef4444;
          background: rgba(239,68,68,0.06);
          animation: shake 0.3s ease;
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          25%      { transform: translateX(-5px); }
          75%      { transform: translateX(5px); }
        }
        /* Hide the reCAPTCHA v3 badge — legal if you disclose in T&C/Privacy */
        .grecaptcha-badge { visibility: hidden !important; }
      `}</style>

      {/* ── HERO ── */}
      <section className="mb-16 md:mb-24 relative pt-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse at 50% -5%, rgba(214,0,141,0.16) 0%, transparent 55%)' }} />
        <FadeIn>
          <h1 className="font-headline font-black tracking-tighter leading-[0.88] mb-8"
            style={{ fontSize: 'clamp(3rem,7vw,7rem)', color: '#ffffff' }}>
            Let&apos;s automate<br />
            <span style={{ color: '#FFB84C' }}>your future.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-xl max-w-2xl leading-relaxed" style={{ color: '#ffffff' }}>
            Ready to transcend the ordinary? Reach out to our technical architects and let&apos;s build the kinetic infrastructure of tomorrow.
          </p>
        </FadeIn>
      </section>

      {/* ── BENTO GRID ── */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn delay={0.2}>
              <div className="glass-panel rounded-xl border border-outline-variant/20 p-8 space-y-6"
                style={{ background: 'rgba(255, 255, 255, 0)', border: '2px solid #FFB84C' }}>
                <h3 className="font-headline text-2xl font-bold mb-2 text-white">Connect Directly</h3>
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"
                      style={{ boxShadow: '0 0 10px rgba(255,0,154,0.1)' }}>
                      <span className="material-symbols-outlined" style={{ color: '#FFB84C' }}>{info.icon}</span>
                    </div>
                    <div>
                      <p className="font-headline text-xs tracking-widest uppercase mb-1" style={{ color: '#FFB84C' }}>{info.label}</p>
                      <p className="text-white font-medium break-all sm:break-normal">{info.value}</p>
                      <p className="text-white text-sm">{info.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <FadeIn delay={0.1} className="lg:col-span-7">
            <div className="glass-panel rounded-xl p-8 md:p-12 border border-outline-variant/20 relative overflow-hidden"
              style={{ background: 'rgba(255, 255, 255, 0)', border: '2px solid #FFB84C' }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #ac89ff 0%, transparent 70%)', filter: 'blur(40px)' }} />

              <h2 className="font-headline text-3xl text-white font-bold mb-10">Send a Transmission</h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}
                      className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6"
                      style={{ boxShadow: '0 0 40px rgba(255,0,154,0.3)' }}>
                      <span className="material-symbols-outlined text-primary text-4xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </motion.div>
                    <h3 className="text-2xl font-headline font-bold text-webx-purple mb-3">Transmission Received!</h3>
                    <p className="text-on-surface-variant">We&apos;ll get back to you within 4 hours.</p>
                    <button onClick={() => setSubmitted(false)}
                      className="mt-8 text-primary font-bold text-sm hover:underline">
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-8">

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { id: 'name', label: 'Full Name', type: 'text' },
                        { id: 'email', label: 'Email Address', type: 'email' },
                      ].map(field => (
                        <div key={field.id} className="relative group">
                          <input
                            id={field.id} type={field.type} placeholder=" "
                            value={form[field.id]}
                            onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                            className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant/40 py-3 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent text-white outline-none"
                            style={{ color: '#ffffffff' }}
                            required
                          />
                          <label htmlFor={field.id}
                            className="absolute left-0 -top-5 text-xs font-headline text-white transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-primary"
                            style={{ color: '#ffffffff' }}>
                            {field.label}
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* Inquiry Type */}
                    <div className="relative">
                      <label className="block text-xs font-headline text-white mb-2">Inquiry Type</label>
                      <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface-variant focus:border-primary focus:ring-0 outline-none appearance-none transition-colors">
                        <option value="">Select an Inquiry Type</option>
                        <option>Social Media Marketing</option>
                        <option>SEO & Content Marketing</option>
                        <option>Paid Ads</option>
                        <option>Branding & Creative Design</option>
                        <option>Web Design & Development</option>
                        <option>Video Production & Editing</option>
                        <option>AI Automation</option>
                        <option>White Label Services</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="relative group">
                      <textarea placeholder=" " rows={3} value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant/40 py-3 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent text-white resize-none outline-none"
                        required />
                      <label className="absolute left-0 -top-5 text-xs font-headline text-primary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-primary"
                        style={{ color: '#ffffffff' }}>
                        Your Message
                      </label>
                    </div>

                    {/* Terms checkbox */}
                    <div>
                      <label
                        className="flex items-start gap-3 cursor-pointer select-none"
                        onClick={() => { setAgreed(!agreed); setAgreeError(false) }}
                      >
                        <motion.div
                          className={`terms-check-box ${agreed ? 'checked' : ''} ${agreeError ? 'shake' : ''}`}
                          animate={{ scale: agreed ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 0.18 }}
                        >
                          <AnimatePresence>
                            {agreed && (
                              <motion.svg
                                initial={{ opacity: 0, scale: 0.4 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.4 }}
                                transition={{ duration: 0.15 }}
                                width="11" height="11" viewBox="0 0 11 11" fill="none"
                              >
                                <path d="M1.5 5.5L4 8L9.5 2.5" stroke="white" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <span className="text-sm leading-relaxed" style={{ color: '#ffffffff' }}>
                          I agree to the{' '}
                          <a href="/terms-conditions" target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="font-bold underline underline-offset-2 hover:opacity-75 transition-opacity"
                            style={{ color: '#D6008D' }}>
                            Terms & Conditions
                          </a>
                          {' '}and{' '}
                          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="font-bold underline underline-offset-2 hover:opacity-75 transition-opacity"
                            style={{ color: '#D6008D' }}>
                            Privacy Policy
                          </a>
                          . I consent to Webxautomation contacting me regarding my inquiry.
                        </span>
                      </label>
                      <AnimatePresence>
                        {agreeError && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="text-xs font-bold mt-2 ml-8" style={{ color: '#ef4444' }}>
                            Please accept the Terms & Conditions to continue.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Error */}
                    {error && (
                      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-headline font-bold px-4 py-3 rounded-lg"
                        style={{ background: 'rgba(214,0,141,0.08)', border: '1px solid rgba(214,0,141,0.2)', color: '#D6008D' }}>
                        {error}
                      </motion.p>
                    )}

                    {/* Submit */}
                    <motion.button type="submit" disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.03 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                      className="w-full md:w-auto px-10 py-4 font-bold rounded-full font-headline uppercase tracking-widest text-sm flex items-center gap-3"
                      style={{
                        background: loading ? 'rgba(214,0,141,0.5)' : '#D6008D',
                        color: '#ffffff', border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: loading ? 'none' : '0 0 30px rgba(214,0,141,0.35)',
                        transition: 'all 0.2s ease',
                      }}>
                      {loading ? (
                        <>
                          <motion.span animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="material-symbols-outlined text-base">
                            progress_activity
                          </motion.span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Contact Us
                          <span className="material-symbols-outlined text-base">send</span>
                        </>
                      )}
                    </motion.button>

                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>

        </div>
      </section>
    </div>
  )
}