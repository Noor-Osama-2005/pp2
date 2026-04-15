import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ar' | 'en';
}

export function NewsletterModal({ isOpen, onClose, language }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg mx-4"
          >
            <div className="relative rounded-3xl overflow-hidden bg-card border-2 border-[var(--heritage-gold)] shadow-2xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted hover:bg-[var(--heritage-gold)] hover:text-[var(--midnight-navy)] transition-colors flex items-center justify-center z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-12">
                {!submitted ? (
                  <>
                    {/* Animated Envelope Icon */}
                    <motion.div
                      className="mb-8 flex justify-center"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="relative">
                        <Mail className="w-20 h-20" style={{ color: 'var(--heritage-gold)' }} />
                        <motion.div
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                          style={{ background: 'var(--heritage-gold)' }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.5, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity
                          }}
                        />
                      </div>
                    </motion.div>

                    <h2 
                      className="text-4xl mb-4 text-center"
                      style={{ 
                        fontFamily: language === 'ar' ? 'Noto Serif Arabic, serif' : 'Playfair Display, serif',
                        color: 'var(--heritage-gold)'
                      }}
                    >
                      {language === 'ar' ? 'انضم إلى النشرة' : 'Join Our Newsletter'}
                    </h2>
                    <p className="text-center text-muted-foreground mb-8">
                      {language === 'ar' 
                        ? 'احصل على أحدث القصص مباشرة إلى بريدك الإلكتروني'
                        : 'Get the latest stories delivered directly to your inbox'
                      }
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm mb-2 opacity-80">
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={language === 'ar' ? 'your@email.com' : 'your@email.com'}
                          required
                          className="w-full px-6 py-4 rounded-xl bg-muted border-2 border-transparent focus:border-[var(--heritage-gold)] focus:outline-none transition-colors"
                          style={{
                            fontFamily: language === 'ar' ? 'Noto Sans Arabic, sans-serif' : 'Inter, sans-serif'
                          }}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl text-lg"
                        style={{
                          background: 'var(--heritage-gold)',
                          color: 'var(--midnight-navy)',
                          fontFamily: language === 'ar' ? 'Noto Sans Arabic, sans-serif' : 'Inter, sans-serif'
                        }}
                      >
                        {language === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
                      </motion.button>
                    </form>

                    <p className="text-xs text-center text-muted-foreground mt-6">
                      {language === 'ar'
                        ? 'نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.'
                        : 'We respect your privacy. Unsubscribe at any time.'
                      }
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="mb-6 flex justify-center"
                    >
                      <CheckCircle className="w-20 h-20" style={{ color: 'var(--heritage-gold)' }} />
                    </motion.div>
                    <h3 
                      className="text-3xl mb-4"
                      style={{ 
                        fontFamily: language === 'ar' ? 'Noto Serif Arabic, serif' : 'Playfair Display, serif',
                        color: 'var(--heritage-gold)'
                      }}
                    >
                      {language === 'ar' ? 'شكراً لاشتراكك!' : 'Thank You!'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'ar'
                        ? 'تم تأكيد اشتراكك بنجاح'
                        : 'Your subscription has been confirmed'
                      }
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--heritage-gold)]/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[var(--heritage-gold)]/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
