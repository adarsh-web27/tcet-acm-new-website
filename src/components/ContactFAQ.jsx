import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CONTACT_FAQS } from '../data/contactData';

export default function ContactFAQ({ faqs = CONTACT_FAQS }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="space-y-10 pt-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block font-mono text-xs sm:text-sm font-bold text-[#0B1F33] uppercase tracking-wider px-3 py-1 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30">
          Frequently Asked Questions
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0B1F33] uppercase tracking-tight">
          Chapter Membership & Operations
        </h2>
        <p className="text-xs sm:text-sm text-[#1E40AF] font-medium">
          Answers to common queries about ACM eligibility, hackathon participation, and publications.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/95 border-2 border-[#93C5FD] rounded-2xl overflow-hidden shadow-md hover:border-[#1D4ED8]/40 transition-all"
            >
              <button
                id={`faq-btn-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenFaq(isOpen ? -1 : index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-black text-base sm:text-lg text-[#0B1F33] cursor-pointer hover:text-[#1E40AF] transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#0B1F33] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#1E40AF]' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 pt-0 border-t border-[#93C5FD] text-xs sm:text-sm text-[#1E40AF] font-medium leading-relaxed text-left bg-[#DBEAFE]/40">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
