# SEO & AI Engine Optimization

## Overview

SunnahSleep is optimized for traditional search engines (Google, Bing) and AI-powered search/citation engines (ChatGPT, Perplexity, Claude, Gemini).

## AI-Specific Optimizations

### Meta Tags (`index.html`)
- **ai-content-type** — Identifies the page as a web application
- **ai-purpose** — Rich description for AI comprehension (features, free, private)
- **ai-topics** — Keywords for AI topic classification
- **ai-format** — PWA, offline capability

### `llms.txt` (public/llms.txt)
Structured plain-text file following [llmstxt.org](https://llmstxt.org) spec. Contains:
- App description, features, differentiators
- All page URLs with descriptions
- Blog article URLs
- Islamic source references
- Technical details
Referenced in `robots.txt` via `LLMs-Txt:` directive and in `index.html` via `<link rel="author">`.

### robots.txt AI Crawler Directives
All major AI crawlers explicitly allowed: GPTBot, ChatGPT-User, Claude-Web, ClaudeBot, Anthropic-AI, Google-Extended, PerplexityBot, Cohere-ai, CCBot, meta-externalagent, meta-externalfetcher, Bytespider.

## Structured Data (Schema.org JSON-LD)

### Homepage (Landing.tsx — injected via usePageMeta)
- **SoftwareApplication** — App name, features, free offer, creator, aggregate rating
- **FAQPage** — 4 key questions about SunnahSleep, Sunnah sleep, pricing, offline
- **BreadcrumbList** — Root navigation

### Homepage (index.html — static for SSR/prerender)
- **WebApplication** — Full feature list, creator, offers
- **Organization** — Ummah.Build
- **BreadcrumbList** — Home
- **FAQPage** — 12 key questions about SunnahSleep, Sunnah sleep, pricing, offline, Three Quls, Tasbih Fatimah, sleep etiquette
- **HowTo** — 8-step Prophetic sleep routine

### Blog Articles (BlogArticle.tsx)
- **Article** — headline, description, datePublished, author, publisher, wordCount, articleSection, inLanguage
- **BreadcrumbList** — Home → Blog → Article
- Social share links (Twitter, Facebook, native share API)

### Content Pages
| Page | JSON-LD Types |
|------|---------------|
| `/blog` | BreadcrumbList |
| `/blog/:slug` | Article + BreadcrumbList |
| `/wudu` | HowTo (11 steps) + BreadcrumbList |
| `/prophetic-sleep` | Article + HowTo + BreadcrumbList |
| `/guides` | BreadcrumbList |
| `/demo` | BreadcrumbList |
| `/install` | FAQPage + BreadcrumbList |

## Per-Route SEO (`usePageMeta` hook)

| Route | Title / Focus | og:type |
|-------|---------------|---------|
| `/` | Landing page — SoftwareApplication + FAQ | website |
| `/app` | App dashboard | website |
| `/wudu` | Wudu step-by-step guide + HowTo schema | website |
| `/blog` | Islamic sleep articles index | website |
| `/blog/:slug` | Article-specific meta + Article JSON-LD | article |
| `/guides` | SunnahSleep user guides | website |
| `/prophetic-sleep` | Prophet's sleeping practices | article |
| `/install` | PWA install instructions + FAQ | website |
| `/demo` | App demo | website |
| `*` (404) | noindex, nofollow | — |

### usePageMeta Features
- Dynamic `<title>`, `<meta description>`, `<meta keywords>`
- Canonical URL management
- Open Graph (og:title, og:description, og:image, og:url, og:type)
- Twitter Card meta
- robots meta (noindex support)
- **JSON-LD injection** — Accepts single or array of schemas, auto-cleans on route change
- Proper cleanup on unmount (restores defaults)

## Sitemap

- `public/sitemap.xml` — All public URLs with lastmod, changefreq, priority
- Updated lastmod to 2026-03-08

## Best Practices Applied

1. **E-E-A-T** — Hadith references, Sunnah.com links, authoritative Islamic content
2. **Conversational queries** — FAQ schema targets "What is...", "How do I...", "When is..."
3. **Structured data** — SoftwareApplication, Article, FAQ, HowTo, BreadcrumbList
4. **Unique meta per page** — Reduces duplicate content signals
5. **Canonical URLs** — Explicit canonicals on all key pages
6. **AI discoverability** — llms.txt, AI meta tags, AI crawler allowlisting
7. **Semantic HTML** — Single H1 per page, proper heading hierarchy, aria-labels
8. **Performance** — Lazy-loaded routes, preconnect hints, minimal FCP blocking
