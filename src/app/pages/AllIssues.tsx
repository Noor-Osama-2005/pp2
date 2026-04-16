import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { issues } from '../data/content';

export function AllIssues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [filter, setFilter] = useState<string>('all');

  const years = ['all', '2026', '2025'];

  const filteredIssues = filter === 'all' 
    ? issues 
    : issues.filter(issue => issue.year.toString() === filter);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 
            className="text-6xl md:text-7xl mb-6"
            style={{ 
              fontFamily: 'Noto Serif Arabic, Playfair Display, serif',
              color: 'var(--heritage-gold)'
            }}
          >
            أرشيف الأعداد
          </h1>
          <p className="text-2xl text-muted-foreground mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
            Complete Archive — All Issues
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-4 flex-wrap">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setFilter(year)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full transition-all ${
                  filter === year 
                    ? 'text-[var(--midnight-navy)]' 
                    : 'border-2 border-[var(--heritage-gold)] text-[var(--heritage-gold)]'
                }`}
                style={{
                  background: filter === year ? 'var(--heritage-gold)' : 'transparent',
                }}
              >
                {year === 'all' ? 'All Years' : year}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 3D Magazine Wall */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredIssues.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                delay: 0.1 * index,
                duration: 0.6,
                type: "spring"
              }}
              style={{ perspective: '1000px' }}
            >
              <Link to={`/issue/${issue.id}`}>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 8,
                    z: 50,
                  }}
                  className="group relative"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    {/* Cover Image */}
                    <div className="aspect-[3/4] relative">
                      <img
                        src={issue.coverImage}
                        alt={`Issue ${issue.number}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="text-white"
                        >
                          <p className="text-sm mb-2 opacity-80">
                            Issue {issue.number}
                          </p>
                          <h3 
                            className="text-3xl mb-2"
                            style={{ fontFamily: 'Noto Serif Arabic, serif' }}
                          >
                            {issue.titleAr}
                          </h3>
                          <p 
                            className="text-xl mb-4"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                          >
                            {issue.titleEn}
                          </p>
                          <p className="text-sm opacity-70">
                            {issue.month} {issue.year}
                          </p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Golden Border on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      style={{
                        boxShadow: '0 0 40px var(--heritage-gold), inset 0 0 40px var(--heritage-gold)',
                      }}
                    />
                  </div>

                  {/* Flip Preview on Hover (Table of Contents) */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-card p-8 overflow-hidden pointer-events-none"
                    initial={{ opacity: 0, rotateY: 180, scale: 0.8 }}
                    whileHover={{ opacity: 1, rotateY: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      border: '2px solid var(--heritage-gold)',
                    }}
                  >
                    <h4 
                      className="text-2xl mb-6"
                      style={{ 
                        fontFamily: 'Playfair Display, serif',
                        color: 'var(--heritage-gold)'
                      }}
                    >
                      Table of Contents
                    </h4>
                    <div className="space-y-3">
                      {issue.articles.slice(0, 4).map((articleId, i) => (
                        <div key={articleId} className="flex items-start gap-3">
                          <span 
                            className="text-2xl opacity-30"
                            style={{ 
                              fontFamily: 'Playfair Display, serif',
                              color: 'var(--heritage-gold)'
                            }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <p className="text-sm opacity-80">Article {i + 1}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <motion.button
                      className="absolute bottom-8 left-8 right-8 py-3 rounded-full text-center"
                      style={{
                        background: 'var(--heritage-gold)',
                        color: 'var(--midnight-navy)',
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Read Issue
                    </motion.button>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
