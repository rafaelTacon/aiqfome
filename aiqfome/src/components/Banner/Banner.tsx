import type { FC } from 'react';
import { BannerPromocionalProps } from './interfaces';

const Banner: FC<BannerPromocionalProps> = ({
  src = 'src/assets/banner-home.svg',
  alt = 'Banner promocional',
}) => {
  const isRemote = src.startsWith('http');

  if (isRemote) {
    return (
      <div className="w-full overflow-hidden">
        <img src={src} alt={alt} className="w-full max-w-none" />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full max-w-none"
      />
    </div>
  );
};

export default Banner;
