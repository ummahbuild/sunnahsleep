import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, BookOpen, ChevronRight, Share2, Twitter, Facebook } from 'lucide-react';
import { getBlogArticleBySlug, getAllBlogArticles, BlogArticle } from '@/data/blogData';
import { cn } from '@/lib/utils';
import { usePageMeta } from '@/hooks/usePageMeta';

const BASE_URL = 'https://sunnahsleep.app';

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  return progress;
}

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const rawSlug = slug ? decodeURIComponent(slug) : undefined;
  const article = rawSlug ? getBlogArticleBySlug(rawSlug) : undefined;
  const readingProgress = useReadingProgress();

  const canonical = article ? `${BASE_URL}/blog/${article.slug}` : undefined;
  usePageMeta(article ? {
    title: article.metaTitle,
    description: article.metaDescription,
    canonical,
    ogTitle: article.title,
    ogDescription: article.excerpt || article.metaDescription,
    ogType: 'article',
    keywords: article.keywords,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.metaDescription,
        keywords: article.keywords.join(', '),
        wordCount: article.content.split(/\s+/).length,
        datePublished: article.publishedDate ?? '2025-01-15',
        dateModified: article.publishedDate ?? '2025-01-15',
        author: { '@type': 'Organization', name: 'Ummah.Build', url: 'https://ummah.build' },
        publisher: { '@type': 'Organization', name: 'Ummah.Build', url: 'https://ummah.build', logo: { '@type': 'ImageObject', url: `${BASE_URL}/og-image.png` } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${article.slug}` },
        url: `${BASE_URL}/blog/${article.slug}`,
        image: `${BASE_URL}/og-image.png`,
        inLanguage: 'en',
        isAccessibleForFree: true,
        articleSection: article.category,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SunnahSleep', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: article.title, item: `${BASE_URL}/blog/${article.slug}` },
        ],
      },
    ],
  } : null);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-night islamic-pattern flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-gold hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (rawSlug !== article.slug) {
    return <Navigate to={`/blog/${article.slug}`} replace />;
  }

  const categoryColors: Record<BlogArticle['category'], string> = {
    sunnah: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    health: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    worship: 'bg-gold/10 text-gold border-gold/20',
    guidance: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  const categoryLabels: Record<BlogArticle['category'], string> = {
    sunnah: 'Sunnah Practices',
    health: 'Health & Science',
    worship: 'Worship & Prayer',
    guidance: 'Islamic Guidance',
  };

  const shareUrl = `${BASE_URL}/blog/${article.slug}`;
  const shareText = `${article.title} — ${article.excerpt}`;

  const allArticles = getAllBlogArticles();
  const sameCategoryArticles = allArticles
    .filter(a => a.slug !== article.slug && a.category === article.category);
  const otherArticles = allArticles
    .filter(a => a.slug !== article.slug && a.category !== article.category);
  const relatedArticles = [...sameCategoryArticles, ...otherArticles].slice(0, 4);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, text: article.excerpt, url: shareUrl });
      } catch {}
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-night islamic-pattern">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-secondary/30">
        <div
          className="h-full bg-gold transition-[width] duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      <article className="max-w-3xl mx-auto pb-12">
        {/* Header */}
        <header className="px-4 sm:px-6 pt-6 pb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span className={cn('text-xs font-medium px-3 py-1 rounded-full border', categoryColors[article.category])}>
              {categoryLabels[article.category]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            {article.title}
          </h1>

          {/* Meta + Share */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readingTime} min read
              </span>
              {article.publishedDate && (
                <time dateTime={article.publishedDate}>
                  {new Date(article.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              )}
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-gold hover:bg-secondary/50 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-gold hover:bg-secondary/50 transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg text-muted-foreground hover:text-gold hover:bg-secondary/50 transition-colors"
                aria-label="Share article"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        {article.tableOfContents.length > 0 && (
          <nav className="px-4 sm:px-6 mb-8" aria-label="Table of contents">
            <div className="p-4 rounded-xl bg-secondary/30 border border-border">
              <h2 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">
                In This Article
              </h2>
              <ul className="space-y-2">
                {article.tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`}
                      className="text-sm text-cream-dim hover:text-gold transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="h-3 w-3" />
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        {/* Content */}
        <div className="px-4 sm:px-6 prose prose-invert prose-gold max-w-none">
          <div 
            className="
              [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:scroll-mt-20
              [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:text-cream-dim [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-base [&_p]:sm:text-lg
              [&_strong]:text-gold [&_strong]:font-semibold
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
              [&_li]:text-cream-dim [&_li]:text-base [&_li]:sm:text-lg
              [&_blockquote]:border-l-4 [&_blockquote]:border-gold/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-cream-dim
              [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-gold/80
              [&_hr]:border-border [&_hr]:my-8
            "
            dangerouslySetInnerHTML={{ 
              __html: renderMarkdown(article.content)
            }}
          />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <aside className="px-4 sm:px-6 mt-12">
            <h2 className="text-lg font-semibold text-foreground mb-4">Related Articles</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="block p-4 rounded-xl bg-secondary/30 border border-border hover:border-gold/30 transition-colors"
                >
                  <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border', categoryColors[related.category])}>
                    {categoryLabels[related.category]}
                  </span>
                  <h3 className="font-medium text-foreground mt-2 mb-1 line-clamp-2">{related.title}</h3>
                  <p className="text-sm text-cream-dim line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* Footer CTA */}
        <div className="px-4 sm:px-6 mt-12">
          <div className="p-6 rounded-2xl bg-gold/10 border border-gold/20 text-center">
            <BookOpen className="h-8 w-8 text-gold mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Start Your Sunnah Sleep Routine
            </h2>
            <p className="text-sm text-cream-dim mb-4">
              Use our free app to track your bedtime Sunnah checklist, set prayer alarms, and follow the prophetic sleep routine.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-6 py-2 bg-gold text-midnight font-medium rounded-lg hover:bg-gold/90 transition-colors"
            >
              Try SunnahSleep Free
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-4 sm:px-6 mt-8 text-center">
          <Link to="/blog" className="text-gold hover:underline text-sm">
            ← Browse All Articles
          </Link>
        </footer>
      </article>
    </div>
  );
}

/** Internal cross-links for SEO link equity */
const INTERNAL_LINKS: [RegExp, string][] = [
  [/\bAyat al-Kursi\b/gi, '<a href="/blog/ayat-al-kursi-before-sleep-benefits">Ayat al-Kursi</a>'],
  [/\bTahajjud\b/gi, '<a href="/blog/how-to-wake-up-for-tahajjud">Tahajjud</a>'],
  [/\bThree Quls\b/gi, '<a href="/blog/three-quls-before-sleep-protection">Three Quls</a>'],
  [/\bTasbih Fatimah\b/gi, '<a href="/blog/tasbih-fatimah-before-sleep">Tasbih Fatimah</a>'],
  [/\bQailulah\b/gi, '<a href="/blog/qailulah-islamic-power-nap">Qailulah</a>'],
  [/\bSurah Al-Mulk\b/gi, '<a href="/blog/surah-mulk-before-sleep-benefits">Surah Al-Mulk</a>'],
  [/\bSurah Tabarak\b/gi, '<a href="/blog/surah-mulk-before-sleep-benefits">Surah Tabarak</a>'],
  [/\bwudu before (bed|sleep|sleeping)\b/gi, '<a href="/blog/wudu-before-sleeping-benefits">wudu before $1</a>'],
  [/\bFajr prayer\b/gi, '<a href="/blog/waking-up-for-fajr-tips">Fajr prayer</a>'],
  [/\bSunnah sleep routine\b/gi, '<a href="/blog/prophetic-sleep-routine-complete-guide">Sunnah sleep routine</a>'],
  [/\bsleep paralysis\b/gi, '<a href="/blog/sleep-paralysis-islam">sleep paralysis</a>'],
  [/\bsleep deprivation\b/gi, '<a href="/blog/sleep-deprivation-effects-islamic-view">sleep deprivation</a>'],
  [/\bRamadan\b/gi, '<a href="/blog/sleep-and-fasting-ramadan">Ramadan</a>'],
  [/\bscreen time\b/gi, '<a href="/blog/sleep-and-screen-time-islamic-perspective">screen time</a>'],
];

function addInternalLinks(html: string): string {
  let result = html;
  for (const [pattern, replacement] of INTERNAL_LINKS) {
    // Only replace first occurrence of each term to avoid over-linking
    result = result.replace(pattern, (match) => {
      // Don't link if already inside an <a> tag
      const before = result.substring(0, result.indexOf(match));
      const lastOpenA = before.lastIndexOf('<a ');
      const lastCloseA = before.lastIndexOf('</a>');
      if (lastOpenA > lastCloseA) return match; // inside a link already
      return match.replace(pattern, replacement);
    });
  }
  return result;
}

/** Improved markdown-to-HTML renderer */
function renderMarkdown(content: string): string {
  const html = content
    // Headings with IDs
    .replace(/## ([^\n{]+)\{#([^}]+)\}/g, '<h2 id="$2">$1</h2>')
    .replace(/### ([^\n]+)/g, '<h3>$1</h3>')
    .replace(/## ([^\n]+)/g, '<h2>$1</h2>')
    // Bold and italic
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Ordered lists
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    // Unordered lists  
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr />')
    // Paragraphs (double newline)
    .replace(/\n\n/g, '</p><p>')
    // Single newlines in paragraphs
    .replace(/\n/g, '<br />')
    // Wrap in paragraph
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    // Clean up empty paragraphs
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<p>\s*<(h[23])/g, '<$1')
    .replace(/<\/(h[23])>\s*<\/p>/g, '</$1>')
    .replace(/<p>\s*<ul>/g, '<ul>')
    .replace(/<\/ul>\s*<\/p>/g, '</ul>')
    .replace(/<p>\s*<hr \/>\s*<\/p>/g, '<hr />');
  
  return addInternalLinks(html);
}
