import { motion } from 'motion/react';

export function LoadingAnimation() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--midnight-navy)' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="mb-8"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <motion.path
              d="M40 10L70 25V55L40 70L10 55V25L40 10Z"
              stroke="var(--heritage-gold)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx="40"
              cy="40"
              r="6"
              fill="var(--heritage-gold)"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </motion.div>

        {/* Text */}
        <motion.h2
          className="text-2xl"
          style={{
            fontFamily: 'Noto Serif Arabic, Playfair Display, serif',
            color: 'var(--heritage-gold)'
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          حَدْثُ الْمَدِينَة
        </motion.h2>
      </div>
    </motion.div>
  );
}
