"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";

export type Photo = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  // Which part of the photo stays in frame when cropped (CSS object-position), e.g. "50% 40%".
  position?: string;
};

// Photos cross-fade in place. Arrows show on hover, dots below; swipe on touch,
// and the arrow keys work once the carousel has focus.
export function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  if (photos.length === 0) return null;

  const go = (i: number) => setIndex((i + photos.length) % photos.length);
  const caption = photos[index].caption;

  return (
    <figure
      className="carousel"
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="carousel-frame">
        {photos.map((photo, i) => (
          <Image
            key={i}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            placeholder="blur"
            priority={i === 0}
            className="carousel-photo"
            style={photo.position ? { objectPosition: photo.position } : undefined}
            data-active={i === index}
            aria-hidden={i !== index}
          />
        ))}

        {photos.length > 1 && (
          <>
            <button
              type="button"
              className="carousel-arrow"
              data-side="left"
              onClick={() => go(index - 1)}
              aria-label="Previous photo"
            >
              ←
            </button>
            <button
              type="button"
              className="carousel-arrow"
              data-side="right"
              onClick={() => go(index + 1)}
              aria-label="Next photo"
            >
              →
            </button>
          </>
        )}
      </div>

      {(photos.length > 1 || caption) && (
        <figcaption className="carousel-footer">
          <span className="carousel-caption" key={index}>
            {caption}
          </span>
          {photos.length > 1 && (
            <span className="carousel-dots">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-active={i === index}
                  onClick={() => go(i)}
                  aria-label={`Photo ${i + 1} of ${photos.length}`}
                />
              ))}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
