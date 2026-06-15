import React from 'react';
import Image from 'next/image';

interface IconProps {
  size?: number | string;
  className?: string;
  [key: string]: any;
}

export const Instagram = ({ size = 24, className, ...props }: IconProps) => {
  return (
    <Image 
      src="/instagram.webp" 
      alt="Instagram" 
      width={Number(size)} 
      height={Number(size)} 
      className={`object-contain hover:scale-110 transition-transform duration-200 ${className || ''}`} 
    />
  );
};

export const Facebook = ({ size = 24, className, ...props }: IconProps) => {
  return (
    <Image 
      src="/facebook.webp" 
      alt="Facebook" 
      width={Number(size)} 
      height={Number(size)} 
      className={`object-contain hover:scale-110 transition-transform duration-200 ${className || ''}`} 
    />
  );
};

export const Youtube = ({ size = 24, className, ...props }: IconProps) => {
  return (
    <Image 
      src="/youtube.webp" 
      alt="YouTube" 
      width={Number(size)} 
      height={Number(size)} 
      className={`object-contain hover:scale-110 transition-transform duration-200 ${className || ''}`} 
    />
  );
};
