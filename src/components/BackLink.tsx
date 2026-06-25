import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackLinkProps {
  fallbackTo: string;
  label: string;
  className?: string;
}

export function BackLink({ fallbackTo, label, className }: BackLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Link
      to={fallbackTo}
      onClick={(e) => {
        if (location.key !== 'default') {
          e.preventDefault();
          navigate(-1);
        }
      }}
      className={cn(
        'inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors text-sm',
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
