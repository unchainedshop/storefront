import Image from 'next/image';
import { useState } from 'react';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';

const ImageWithFallback = ({ fallbackSrc, src, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      blurDataURL="/no-image.jpg"
      loader={defaultNextImageLoader}
      placeholder="blur"
      {...props}
      onError={() => {
        setImageSrc(fallbackSrc || '/no-image.jpg');
      }}
    />
  );
};

export default ImageWithFallback;
