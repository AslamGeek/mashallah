import React from 'react';
import { Link } from 'react-router-dom';

export interface BrandLogoProps {
  /**
   * Background theme variant:
   * 'dark' for dark backgrounds uses the white horizontal logo
   * 'light' for light backgrounds uses the standard horizontal logo
   */
  variant?: 'dark' | 'light';
  className?: string;
  imgClassName?: string;
  id?: string;
  onClick?: () => void;
  priority?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  className = '',
  imgClassName = 'w-[170px] sm:w-[190px] md:w-[210px] h-auto object-contain block transition-opacity hover:opacity-90',
  id,
  onClick,
  priority = false,
}) => {
  const logoSrc =
    variant === 'light'
      ? '/images/mashallah-welding-works-logo-horizontal.webp'
      : '/images/mashallah-welding-works-logo-horizontal-white.webp';

  return (
    <Link
      to="/"
      id={id}
      onClick={onClick}
      aria-label="Mashallah Welding Works"
      className={`inline-flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-lg ${className}`}
    >
      <img
        src={logoSrc}
        alt="Mashallah Welding Works"
        width={2172}
        height={724}
        className={imgClassName}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </Link>
  );
};
