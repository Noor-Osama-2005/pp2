import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { Clock, ArrowRight } from 'lucide-react';
import { issues, articles } from '../data/content';

export function LatestIssue() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const currentIssue = issues[0];
  const issueArticles = articles.filter(a => a.issueId === currentIssue.id);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 
            className="text-5xl md:text-6xl mb-4"
            style={{ 
              fontFamily: 'Noto Serif Arabic, Playfair Display, serif',
              color: 'var(--heritage-gold)'
            }}
          >
            العدد الأخير
          </h2>
          <p className="text-xl text-muted-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
            Latest Issue — {currentIssue.month} {currentIssue.year}
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto pb-8 scrollbar-hide">
            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              {issueArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 * index }}
                  className="flex-shrink-0 w-96"
                >
                  <Link to={`/article/${article.id}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="group relative h-full"
                    >
                      {/* Card */}
                      <div className="relative h-full rounded-2xl overflow-hidden bg-card border border-border">
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                          <motion.img
                            src={article.image}
                            alt={article.titleEn}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          {/* Category Badge */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs backdrop-blur-md"
                            style={{ 
                              background: 'var(--heritage-gold)',
                              color: 'var(--midnight-navy)'
                            }}
                          >
                            {article.categoryAr}
                          </motion.div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 
                            className="text-2xl mb-3 leading-tight"
                            style={{ fontFamily: 'Noto Serif Arabic, serif' }}
                          >
                            {article.titleAr}
                          </h3>
                          <p 
                            className="text-lg mb-4 opacity-80"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                          >
                            {article.titleEn}
                          </p>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          {/* Meta */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{article.authorEn}</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.readTime} min</span>
                            </div>
                          </div>

                          {/* Read More Line */}
                          <motion.div
                            className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm"
                            style={{ color: 'var(--heritage-gold)' }}
                          >
                            <span>Continue Reading</span>
                            <motion.div
                              initial={{ x: 0 }}
                              whileHover={{ x: 5 }}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Hover Glow Effect */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            boxShadow: '0 0 0 2px var(--heritage-gold)',
                          }}
                        />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
