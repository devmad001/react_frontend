import React, { FC, useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const LazyImgComponent: FC<LazyImageProps> = ({ src, alt, width, height }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);
  return (
    <img
      ref={imageRef}
      src={isIntersecting ? src : ''}
      alt={alt}
      //   width={width}
      //   height={height}
      loading="lazy"
    />
  );
};

export default LazyImgComponent;
