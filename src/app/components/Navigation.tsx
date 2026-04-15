import { Link } from 'react-router';
import { Search, Moon, Sun, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { NewsletterModal } from './NewsletterModal';

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Navigation({ theme, toggleTheme }: NavigationProps) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [searchOpen, setSearchOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const menuItems = language === 'ar' 
    ? ['الرئيسية', 'الأعداد', 'المقالات', 'المدينة', 'عنا']
    : ['Home', 'Issues', 'Articles', 'City', 'About'];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-md shadow-lg border-b border-border' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <motion.path
                    d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[var(--heritage-gold)]"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <motion.circle
                    cx="20"
                    cy="20"
                    r="3"
                    fill="currentColor"
                    className="text-[var(--heritage-gold)]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </svg>
              </motion.div>
              <div className="flex flex-col">
                <span 
                  className="text-xl tracking-tight"
                  style={{ 
                    fontFamily: language === 'ar' ? 'Noto Serif Arabic, serif' : 'Playfair Display, serif',
                    fontWeight: 700,
                    color: 'var(--heritage-gold)'
                  }}
                >
                  {language === 'ar' ? 'حَدْثُ الْمَدِينَة' : 'Hadth El Madina'}
                </span>
                <span className="text-xs opacity-70">
                  {language === 'ar' ? 'صحافة رقمية راقية' : 'Premium Digital Journalism'}
                </span>
              </div>
            </Link>

            {/* Menu Items */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={index === 0 ? '/' : index === 1 ? '/issues' : '#'}
                  className="relative group"
                  whileHover={{ y: -2 }}
                  style={{ 
                    fontFamily: language === 'ar' ? 'Noto Sans Arabic, sans-serif' : 'Inter, sans-serif'
                  }}
                >
                  <span className="text-foreground/80 hover:text-foreground transition-colors">
                    {item}
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--heritage-gold)] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-muted transition-colors flex items-center gap-1"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs">{language.toUpperCase()}</span>
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-[var(--heritage-gold)]" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              {/* Subscribe Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNewsletterOpen(true)}
                className="relative px-6 py-2 rounded-full overflow-hidden group"
                style={{
                  background: 'var(--heritage-gold)',
                  color: 'var(--midnight-navy)',
                  fontFamily: language === 'ar' ? 'Noto Sans Arabic, sans-serif' : 'Inter, sans-serif'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">
                  {language === 'ar' ? 'اشترك' : 'Subscribe'}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center"
          onClick={() => setSearchOpen(false)}
        >
          <div className="max-w-3xl w-full px-6" onClick={(e) => e.stopPropagation()}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'ابحث في المقالات...' : 'Search articles...'}
                className="w-full pl-14 pr-6 py-6 bg-card rounded-2xl border-2 border-[var(--heritage-gold)] text-2xl focus:outline-none"
                autoFocus
                style={{ 
                  fontFamily: language === 'ar' ? 'Noto Sans Arabic, sans-serif' : 'Inter, sans-serif'
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Newsletter Modal */}
      <NewsletterModal 
        isOpen={newsletterOpen} 
        onClose={() => setNewsletterOpen(false)}
        language={language}
      />
    </>
  );
}