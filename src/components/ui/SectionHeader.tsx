import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  titleHighlight,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      {label && (
        <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-3 font-inter">
          {label}
        </span>
      )}
      <h2 className="font-cinzel font-bold text-3xl md:text-4xl lg:text-5xl text-[#f5f5f5] leading-tight">
        {title}
        {titleHighlight && (
          <>
            {' '}
            <span className="gold-text">{titleHighlight}</span>
          </>
        )}
      </h2>
      <div className={cn('mt-4', centered ? 'flex justify-center' : '')}>
        <div className="gold-divider" />
      </div>
      {subtitle && (
        <p className="mt-5 text-[#888] text-base md:text-lg max-w-2xl leading-relaxed font-inter mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
