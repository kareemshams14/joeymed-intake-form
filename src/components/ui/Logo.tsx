// src/components/ui/Logo.tsx
import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'medium' }) => {
  const sizeMap = {
    small: { width: 100, height: 30 },
    medium: { width: 150, height: 45 },
    large: { width: 200, height: 60 },
  };

  const dimensions = sizeMap[size];

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="https://www.joeymed.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo2.7dd72441.png&w=1080&q=100"
        alt="JoeyMed Logo"
        width={dimensions.width}
        height={dimensions.height}
        priority
      />
    </div>
  ) ;
};

export default Logo;
