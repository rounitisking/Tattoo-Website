'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Instagram, Facebook, Youtube } from '@/components/ui/SocialIcons';
import { SITE_CONFIG } from '@/constants/site';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    placement: '',
    budget: '',
    date: '',
    idea: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.idea.trim()) newErrors.idea = 'Tattoo idea is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Build WhatsApp message from form data
    // Build WhatsApp message strictly following user template
    const message = [
      `Hi, I would like to book a tattoo.`,
      ``,
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Tattoo Style: ${formData.placement || 'Not specified'}`,
      `Preferred Date: ${formData.date || 'Not specified'}`,
      `Message: ${formData.idea} (Budget: ${formData.budget || 'Flexible'}, Email: ${formData.email})`
    ].join('\n');

    const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <>
            {/* Page Hero */}
      <div className="page-hero pt-28 lg:pt-36">
          <div className="container-custom text-center max-w-4xl mx-auto">
          <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-4 font-inter">
            Get In Touch
          </span>
          <h1 className="font-cinzel font-black section-heading text-[#f5f5f5] mb-5 lg:mb-6">
            Book a <span className="gold-text">Consultation</span>
          </h1>
          <div className="gold-divider mx-auto mb-5" />
            <p className="text-[#888] text-base lg:text-lg max-w-2xl mx-auto lg:text-center font-inter leading-relaxed">
  Tell us about your next tattoo idea. Our artists will help you design your permanent story.
</p>
        </div>
      </div>

      <section id="contact" className="section-padding bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Form Column */}
            <div className="lg:col-span-6 bg-[#111111] rounded-3xl border border-[#2a2a2a] p-6 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-xs font-semibold tracking-wider text-[#cccccc] uppercase font-inter">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`form-input ${errors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs font-inter">{errors.name}</p>}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-xs font-semibold tracking-wider text-[#cccccc] uppercase font-inter">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`form-input ${errors.phone ? 'border-red-500/50 focus:border-red-500' : ''}`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs font-inter">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs font-semibold tracking-wider text-[#cccccc] uppercase font-inter">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`form-input ${errors.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs font-inter">{errors.email}</p>}
                      </div>

                      {/* Placement */}
                      <div className="space-y-2">
                        <label htmlFor="placement" className="block text-xs font-semibold tracking-wider text-[#cccccc] uppercase font-inter">
                          Placement / Body Part
                        </label>
                        <input
                          type="text"
                          id="placement"
                          name="placement"
                          value={formData.placement}
                          onChange={handleChange}
                          placeholder="e.g. Forearm, Chest, Calf"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Budget */}
                      <div className="space-y-2">
                        <label htmlFor="budget" className="block text-xs font-semibold tracking-wider text-[#cccccc] uppercase font-inter">
                          Estimated Budget (Optional)
                        </label>
                        <input
                          type="text"
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder="e.g. ₹5,000 - ₹10,000"
                          className="form-input"
                        />
                      </div>

                      {/* Date */}
                      <div className="space-y-2">
                        <label htmlFor="date" className="block text-xs font-semibold tracking-wider text-[#cccccc] uppercase font-inter">
                          Preferred Consultation Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Idea Description */}
                    <div className="space-y-2">
                      <label htmlFor="idea" className="block text-xs font-semibold tracking-wider text-[#cccccc] uppercase font-inter">
                        Describe Your Tattoo Concept *
                      </label>
                      <textarea
                        id="idea"
                        name="idea"
                        rows={5}
                        value={formData.idea}
                        onChange={handleChange}
                        placeholder="Detail your tattoo design idea: style (realism, geometric, portrait, etc.), size, elements to include, and any questions."
                        className={`form-input resize-none ${errors.idea ? 'border-red-500/50 focus:border-red-500' : ''}`}
                      />
                      {errors.idea && <p className="text-red-500 text-xs font-inter">{errors.idea}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-bold text-sm rounded-xl hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit Booking Inquiry</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-20 h-20 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mx-auto border border-[#c9a84c]/30">
                      <CheckCircle2 size={40} className="text-[#c9a84c]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-cinzel font-bold text-2xl text-[#f5f5f5]">
                        Inquiry <span className="gold-text">Submitted!</span>
                      </h3>
                      <p className="text-[#888] text-sm md:text-base max-w-md mx-auto font-inter">
                        Thank you, <span className="text-[#f5f5f5] font-semibold">{formData.name}</span>. We have received your tattoo booking inquiry and will get in touch with you via phone or WhatsApp shortly!
                      </p>
                    </div>
                    <div className="pt-4 flex justify-center">
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            placement: '',
                            budget: '',
                            date: '',
                            idea: '',
                          });
                        }}
                        className="px-6 py-2.5 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-colors rounded-full text-xs font-semibold font-inter cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Studio Info Column */}
            <div className="lg:col-span-6 space-y-8 lg:sticky lg:top-28">
              
              {/* Box 1: Contact Details */}
              <div className="bg-[#111111] rounded-3xl border border-[#2a2a2a] p-8 shadow-xl space-y-6">
                <h3 className="font-cinzel font-bold text-xl text-[#f5f5f5] border-b border-[#2a2a2a] pb-3">
                  Studio <span className="gold-text">Details</span>
                </h3>
                
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#2a2a2a] text-[#c9a84c] shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-[#555] uppercase font-semibold font-inter">Address</p>
                      <p className="text-sm text-[#ccc] font-inter mt-1 leading-relaxed">{SITE_CONFIG.address}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#2a2a2a] text-[#c9a84c] shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-[#555] uppercase font-semibold font-inter">Phone</p>
                      <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm text-[#ccc] font-semibold hover:text-[#c9a84c] transition-colors mt-1 block font-inter">
                        {SITE_CONFIG.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#2a2a2a] text-[#c9a84c] shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-[#555] uppercase font-semibold font-inter">Email</p>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-[#ccc] hover:text-[#c9a84c] transition-colors mt-1 block font-inter">
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#2a2a2a] text-[#c9a84c] shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-[#555] uppercase font-semibold font-inter">Hours</p>
                      <p className="text-sm text-[#ccc] mt-1 font-inter">{SITE_CONFIG.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: Connect Socially */}
              <div className="bg-[#111111] rounded-3xl border border-[#2a2a2a] p-8 shadow-xl text-center space-y-4">
                <h3 className="font-cinzel font-bold text-lg text-[#f5f5f5]">
                  Follow Our <span className="gold-text">Journey</span>
                </h3>
                <p className="text-[#888] text-sm font-inter">
                  We post new tattoos, behind-the-scenes designs, and artist awards daily on our social media platforms.
                </p>
                <div className="flex items-center justify-center gap-4 pt-2">
                  <a
                    href={SITE_CONFIG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full flex items-center justify-center text-[#ccc] hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-colors shadow-md"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href={SITE_CONFIG.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full flex items-center justify-center text-[#ccc] hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-colors shadow-md"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href={SITE_CONFIG.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full flex items-center justify-center text-[#ccc] hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-colors shadow-md"
                    aria-label="Youtube"
                  >
                    <Youtube size={20} />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
