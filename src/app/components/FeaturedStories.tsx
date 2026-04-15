import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { Clock } from 'lucide-react';
import { articles } from '../data/content';

export function FeaturedStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const featuredArticles = articles.filter(a => a.featured);

  return (
    <section ref={ref} className="py-24 px-6 bg-muted/30">
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
            القصص المميزة
          </h2>
          <p className="text-xl text-muted-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
            Featured Stories
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.1 * index,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
            >
              <Link to={`/article/${article.id}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group relative h-full"
                >
                  <div className={`relative rounded-3xl overflow-hidden bg-card ${
                    index === 0 ? 'h-[600px]' : 'h-[400px]'
                  }`}>
                    {/* Image with Parallax */}
                    <div className="relative h-full overflow-hidden">
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      >
                        <img
                          src={article.image}
                          alt={article.titleEn}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                    </div>

                    {/* Content Overlay */}
                    <div className={`absolute inset-0 flex flex-col justify-end ${
                      index === 0 ? 'p-12' : 'p-6'
                    }`}>
                      {/* Category */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index }}
                        className="inline-block self-start px-3 py-1 rounded-full text-xs mb-4"
                        style={{ 
                          background: 'var(--heritage-gold)',
                          color: 'var(--midnight-navy)'
                        }}
                      >
                        {article.categoryEn}
                      </motion.div>

                      {/* Title */}
                      <h3 
                        className={`text-white mb-2 leading-tight ${
                          index === 0 ? 'text-4xl md:text-5xl' : 'text-2xl'
                        }`}
                        style={{ fontFamily: 'Noto Serif Arabic, serif' }}
                      >
                        {article.titleAr}
                      </h3>
                      <p 
                        className={`text-white/90 mb-4 ${
                          index === 0 ? 'text-2xl' : 'text-lg'
                        }`}
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {article.titleEn}
                      </p>

                      {/* Excerpt (only for large card) */}
                      {index === 0 && (
                        <p className="text-white/80 mb-6 line-clamp-2 max-w-2xl">
                          {article.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-white/70 text-sm">
                        <span>{article.authorEn}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime} min</span>
                        </div>
                      </div>

                      {/* Hover Line */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 origin-left"
                        style={{ background: 'var(--heritage-gold)' }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>

                    {/* Glow Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        boxShadow: 'inset 0 0 60px var(--heritage-gold)',
                      }}
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link to="/issues">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full border-2 transition-all"
              style={{
                borderColor: 'var(--heritage-gold)',
                color: 'var(--heritage-gold)',
              }}
            >
              Explore All Issues
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
