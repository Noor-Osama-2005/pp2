import { motion, useScroll, useTransform } from 'motion/react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Clock, Share2, Bookmark, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { articles } from '../data/content';

export function ArticlePage() {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Article not found</p>
      </div>
    );
  }

  // Find next article
  const currentIndex = articles.findIndex(a => a.id === id);
  const nextArticle = articles[(currentIndex + 1) % articles.length];

  return (
    <div ref={containerRef}>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ 
          scaleX: scrollYProgress,
          background: 'var(--heritage-gold)'
        }}
      />

      {/* Back Button */}
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed top-24 left-6 z-40 w-12 h-12 rounded-full bg-card border-2 border-[var(--heritage-gold)] flex items-center justify-center backdrop-blur-md"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
      </Link>

      {/* Hero Image with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0"
        >
          <img
            src={article.image}
            alt={article.titleEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        </motion.div>

        <div className="relative h-full flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Category */}
              <motion.span
                className="inline-block px-4 py-2 rounded-full text-sm mb-6"
                style={{ 
                  background: 'var(--heritage-gold)',
                  color: 'var(--midnight-navy)'
                }}
                whileHover={{ scale: 1.05 }}
              >
                {article.categoryEn}
              </motion.span>

              {/* Title */}
              <h1 
                className="text-5xl md:text-7xl mb-6 leading-tight text-white"
                style={{ fontFamily: 'Noto Serif Arabic, serif' }}
              >
                {article.titleAr}
              </h1>
              <p 
                className="text-3xl md:text-4xl mb-8 text-white/90"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {article.titleEn}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-6 text-white/80">
                <span className="text-lg">By {article.authorEn}</span>
                <span>•</span>
                <span>{article.date}</span>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Share & Save Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12 pb-8 border-b border-border"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-[var(--heritage-gold)] transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-[var(--heritage-gold)] transition-colors"
          >
            <Bookmark className="w-5 h-5" />
            <span>Save</span>
          </motion.button>
        </motion.div>

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none"
        >
          {/* Drop Cap First Paragraph */}
          <p className="text-xl leading-relaxed mb-8">
            <span 
              className="float-left text-7xl leading-none mr-4 mt-2"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: 'var(--heritage-gold)'
              }}
            >
              T
            </span>
            he city pulses with stories waiting to be told. In every corner, beneath the towering modern structures and alongside the ancient heritage sites, life unfolds in ways both familiar and extraordinary. This is a place where tradition meets innovation, where the past informs the future, and where every voice contributes to a rich, collective narrative.
          </p>

          <p className="text-lg leading-relaxed mb-8 opacity-90">
            Walking through the bustling streets at golden hour, one cannot help but notice the intricate dance between old and new. The calls to prayer echo from minarets that have stood for centuries, while below, entrepreneurs launch startups in sleek co-working spaces. Street vendors sell traditional foods that have been perfected over generations, their recipes unchanged, even as the city transforms around them.
          </p>

          {/* Pull Quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative my-16 pl-12 border-l-4 py-4"
            style={{ borderColor: 'var(--heritage-gold)' }}
          >
            <p 
              className="text-3xl leading-relaxed italic"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: 'var(--heritage-gold)'
              }}
            >
              "The city is not just a place—it is a living chronicle of human aspiration."
            </p>
            <motion.div
              className="absolute left-0 top-0 w-1 h-full origin-top"
              style={{ background: 'var(--heritage-gold)' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.blockquote>

          <p className="text-lg leading-relaxed mb-8 opacity-90">
            The transformation is not without its challenges. As development accelerates, questions arise about preservation, identity, and sustainability. How do we honor our heritage while embracing progress? How do we ensure that growth benefits all members of society? These are the conversations happening in homes, cafes, and city council chambers across the region.
          </p>

          {/* Inline Image */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-16"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <motion.img
                src={article.image}
                alt="Article visual"
                className="w-full h-96 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-border rounded-2xl" />
            </div>
            <figcaption className="mt-4 text-sm text-center text-muted-foreground italic">
              The intersection of heritage and modernity defines the contemporary urban landscape
            </figcaption>
          </motion.figure>

          <p className="text-lg leading-relaxed mb-8 opacity-90">
            Young activists and community organizers are taking matters into their own hands, creating grassroots initiatives that address local needs while building bridges between generations. They organize heritage walks, digital storytelling projects, and urban farming initiatives that reconnect people with their roots and with each other.
          </p>

          <p className="text-lg leading-relaxed mb-8 opacity-90">
            Architecture firms are pioneering designs that incorporate traditional elements—geometric patterns, natural ventilation, courtyard layouts—into contemporary buildings. The result is a unique aesthetic that feels both timeless and distinctly of this moment. These structures serve as physical manifestations of cultural continuity, proving that innovation need not come at the expense of identity.
          </p>

          <p className="text-lg leading-relaxed mb-8 opacity-90">
            As we look to the future, it's clear that the city will continue to evolve. But if recent history is any guide, this evolution will be shaped by the people who call this place home—their values, their creativity, and their unwavering commitment to building a community that honors the past while boldly imagining new possibilities.
          </p>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-muted/50 border border-border"
        >
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-[var(--heritage-gold)] flex items-center justify-center text-3xl text-[var(--midnight-navy)]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {article.authorEn[0]}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl mb-2" style={{ fontFamily: 'Noto Serif Arabic, serif' }}>
                {article.authorAr}
              </h3>
              <p className="text-xl mb-4 opacity-80" style={{ fontFamily: 'Playfair Display, serif' }}>
                {article.authorEn}
              </p>
              <p className="text-muted-foreground">
                A journalist and cultural commentator exploring the intersection of tradition and modernity in contemporary Arab cities.
              </p>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Next Article */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <Link to={`/article/${nextArticle.id}`}>
          <motion.div
            whileHover={{ x: 10 }}
            className="relative rounded-3xl overflow-hidden h-96 group"
          >
            <img
              src={nextArticle.image}
              alt={nextArticle.titleEn}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent flex items-center">
              <div className="max-w-2xl px-12">
                <p className="text-white/60 mb-4">Next Story</p>
                <h2 
                  className="text-5xl text-white mb-4"
                  style={{ fontFamily: 'Noto Serif Arabic, serif' }}
                >
                  {nextArticle.titleAr}
                </h2>
                <p 
                  className="text-3xl text-white/90 mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {nextArticle.titleEn}
                </p>
                <motion.div
                  className="flex items-center gap-3 text-white"
                  whileHover={{ x: 10 }}
                >
                  <span>Continue Reading</span>
                  <ChevronRight className="w-6 h-6" style={{ color: 'var(--heritage-gold)' }} />
                </motion.div>
              </div>
            </div>

            {/* Hover Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                boxShadow: 'inset 0 0 100px var(--heritage-gold)',
              }}
            />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
