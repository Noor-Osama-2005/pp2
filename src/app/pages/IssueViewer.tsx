import { motion } from 'motion/react';
import { useParams, Link } from 'react-router';
import { X, ChevronRight } from 'lucide-react';
import { issues, articles } from '../data/content';

export function IssueViewer() {
  const { id } = useParams();
  const issue = issues.find(i => i.id === id);

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Issue not found</p>
      </div>
    );
  }

  const issueArticles = articles.filter(a => a.issueId === issue.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Close Button */}
      <Link to="/issues">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-card border-2 border-[var(--heritage-gold)] flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </motion.button>
      </Link>

      {/* Magazine Cover Reveal */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative w-full max-w-2xl px-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Cover */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ perspective: '2000px' }}
          >
            <motion.div
              className="aspect-[3/4] relative"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: [0, -15, 0] }}
              transition={{ duration: 2, delay: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={issue.coverImage}
                alt={`Issue ${issue.number}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-white/80 text-lg mb-4">
                    Issue {issue.number} • {issue.month} {issue.year}
                  </p>
                  <h1 
                    className="text-white text-5xl mb-4"
                    style={{ fontFamily: 'Noto Serif Arabic, serif' }}
                  >
                    {issue.titleAr}
                  </h1>
                  <p 
                    className="text-white text-3xl"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {issue.titleEn}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Peel Effect Overlay */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1.5, duration: 1 }}
            />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-sm text-muted-foreground mb-2">Scroll to read</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronRight className="w-6 h-6 rotate-90 mx-auto" style={{ color: 'var(--heritage-gold)' }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-5xl mb-16 text-center"
            style={{ 
              fontFamily: 'Noto Serif Arabic, Playfair Display, serif',
              color: 'var(--heritage-gold)'
            }}
          >
            المحتويات
          </h2>

          <div className="space-y-8">
            {issueArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/article/${article.id}`}>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="group flex items-start gap-6 p-6 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-[var(--heritage-gold)]"
                  >
                    {/* Number */}
                    <div 
                      className="text-6xl opacity-20"
                      style={{ 
                        fontFamily: 'Playfair Display, serif',
                        color: 'var(--heritage-gold)',
                        minWidth: '80px'
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span 
                          className="px-3 py-1 rounded-full text-xs"
                          style={{ 
                            background: 'var(--heritage-gold)',
                            color: 'var(--midnight-navy)'
                          }}
                        >
                          {article.categoryEn}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {article.readTime} min read
                        </span>
                      </div>
                      <h3 
                        className="text-3xl mb-2"
                        style={{ fontFamily: 'Noto Serif Arabic, serif' }}
                      >
                        {article.titleAr}
                      </h3>
                      <p 
                        className="text-xl mb-3 opacity-80"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {article.titleEn}
                      </p>
                      <p className="text-muted-foreground mb-3">
                        {article.excerpt}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        By {article.authorEn}
                      </p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 10 }}
                      className="self-center"
                    >
                      <ChevronRight className="w-8 h-8" style={{ color: 'var(--heritage-gold)' }} />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
