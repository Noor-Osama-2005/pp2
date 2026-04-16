import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useRef } from 'react';
import { issues } from '../data/content';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const currentIssue = issues[0];

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${currentIssue.coverImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </motion.div>

      {/* Floating Golden Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ 
              background: 'var(--heritage-gold)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        style={{ y }}
        className="relative h-full flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Animated Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 
              className="text-6xl md:text-8xl mb-4 leading-tight"
              style={{ 
                fontFamily: 'Noto Serif Arabic, Playfair Display, serif',
                color: 'var(--heritage-gold)',
              }}
            >
              المدينة تروي حكايتها
            </h1>
            <motion.p 
              className="text-2xl md:text-3xl opacity-90"
              style={{ fontFamily: 'Playfair Display, serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              The City Tells Its Story
            </motion.p>
          </motion.div>

          {/* Issue Cover with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-12 flex justify-center"
          >
            <Link to={`/issue/${currentIssue.id}`}>
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
                className="relative group"
              >
                <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={currentIssue.coverImage}
                    alt={`Issue ${currentIssue.number}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <p className="text-sm text-white/80 mb-2">
                      Issue {currentIssue.number} — {currentIssue.month} {currentIssue.year}
                    </p>
                    <h3 
                      className="text-2xl text-white mb-1"
                      style={{ fontFamily: 'Noto Serif Arabic, serif' }}
                    >
                      {currentIssue.titleAr}
                    </h3>
                    <p className="text-white/90" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {currentIssue.titleEn}
                    </p>
                  </div>
                  
                  {/* Golden Border Glow on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      boxShadow: '0 0 30px var(--heritage-gold), inset 0 0 30px var(--heritage-gold)',
                    }}
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Link to={`/issue/${currentIssue.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-4 rounded-full text-lg overflow-hidden group"
                style={{
                  background: 'var(--heritage-gold)',
                  color: 'var(--midnight-navy)',
                  fontFamily: 'Noto Sans Arabic, Inter, sans-serif',
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 0.3 }}
                  transition={{ duration: 0.6 }}
                  style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  افتح هذا العدد • Open This Issue
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm opacity-70">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" style={{ color: 'var(--heritage-gold)' }} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
