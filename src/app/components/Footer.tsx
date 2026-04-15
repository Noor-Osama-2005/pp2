import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const socialIcons = [
    { Icon: Facebook, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Instagram, href: '#' },
    { Icon: Linkedin, href: '#' },
    { Icon: Mail, href: '#' },
  ];

  return (
    <footer className="relative mt-32 border-t border-border overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="space-y-4">
            <h3 
              className="text-xl mb-4"
              style={{ 
                fontFamily: 'Noto Serif Arabic, Playfair Display, serif',
                color: 'var(--heritage-gold)'
              }}
            >
              حَدْثُ الْمَدِينَة
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium digital journalism celebrating the stories, culture, and spirit of the city.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 opacity-90">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-muted-foreground hover:text-[var(--heritage-gold)] transition-colors">Home</a></li>
              <li><a href="/issues" className="text-muted-foreground hover:text-[var(--heritage-gold)] transition-colors">All Issues</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-[var(--heritage-gold)] transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-[var(--heritage-gold)] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 opacity-90">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-[var(--heritage-gold)] transition-colors">Investigations</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-[var(--heritage-gold)] transition-colors">Culture</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-[var(--heritage-gold)] transition-colors">Architecture</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-[var(--heritage-gold)] transition-colors">Photography</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 opacity-90">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest stories delivered to your inbox.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-muted rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--heritage-gold)]"
              />
              <button 
                className="px-4 py-2 rounded-r-lg text-sm"
                style={{ background: 'var(--heritage-gold)', color: 'var(--midnight-navy)' }}
              >
                Join
              </button>
            </motion.div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6 py-8 border-t border-border">
          {socialIcons.map(({ Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-[var(--heritage-gold)] hover:text-[var(--midnight-navy)] transition-colors"
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2026 Hadth El Madina. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
