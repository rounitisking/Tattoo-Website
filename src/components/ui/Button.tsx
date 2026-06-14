import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  target,
  rel,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 whitespace-nowrap font-inter';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black hover:from-[#e8c76a] hover:to-[#c9a84c] shadow-lg hover:shadow-[#c9a84c]/30 hover:scale-[1.03]',
    secondary:
      'bg-transparent border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black hover:scale-[1.03]',
    ghost:
      'bg-white/10 text-[#f5f5f5] border border-white/20 hover:bg-white/20 hover:scale-[1.02] backdrop-blur-sm',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const classes = cn(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className);

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
