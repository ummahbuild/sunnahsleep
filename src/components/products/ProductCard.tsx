import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UmmahProduct } from '@/lib/ummahProducts';
import { getProductLinks } from '@/lib/ummahProducts';

interface ProductCardProps {
  product: UmmahProduct;
  compact?: boolean;
  className?: string;
}

export function ProductCard({ product, compact = false, className }: ProductCardProps) {
  const links = getProductLinks(product).slice(0, compact ? 2 : 5);

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-2xl border border-border bg-gradient-card overflow-hidden',
        'hover:border-gold/40 transition-all',
        className,
      )}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/50"
      >
        <div className={cn('bg-gradient-to-br p-4', product.accent)}>
          <div className="flex items-start gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--midnight))]/80 border border-border/50 overflow-hidden">
              <img
                src={product.image}
                alt=""
                className="h-10 w-10 object-contain"
                loading="lazy"
                width={40}
                height={40}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors truncate">
                  {product.name}
                </h3>
                <span className="text-base" aria-hidden>{product.emoji}</span>
              </div>
              <p className="text-xs text-gold/90 mt-0.5 line-clamp-1">{product.tagline}</p>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1">
                {product.category} · {product.appType}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className={cn('text-cream-dim leading-relaxed', compact ? 'text-sm line-clamp-3' : 'text-sm line-clamp-4')}>
            {product.description}
          </p>
        </div>
      </Link>

      {links.length > 0 && (
        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-secondary/30 px-2.5 py-1 text-[11px] text-cream-dim hover:text-gold hover:border-gold/30 transition-colors"
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-secondary/30 px-2.5 py-1 text-[11px] text-cream-dim hover:text-gold hover:border-gold/30 transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      )}
    </article>
  );
}
