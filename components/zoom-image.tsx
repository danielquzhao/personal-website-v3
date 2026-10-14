"use client";

import Image, { getImageProps, type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  priority?: boolean;
};

const MARGIN = 32;
const DURATION = 380;

// Click to expand an image to fill the viewport. The overlay copy animates from the
// inline image's position (FLIP), so it appears to lift off the page and settle back.
export function ZoomImage({ src, alt, sizes, priority }: Props) {
  const thumbRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<HTMLImageElement>(null);
  const [zoomed, setZoomed] = useState<{ url: string; box: DOMRect } | null>(null);
  const [closing, setClosing] = useState(false);
  // Full-resolution sources for the overlay; the inline image's bitmap shows underneath until they load.
  const { props: full } = getImageProps({ src, alt, sizes: "100vw" });

  // Transform that maps the final (centered) box back onto the inline image.
  const fromThumb = (box: DOMRect) => {
    const r = thumbRef.current!.getBoundingClientRect();
    const scale = r.width / box.width;
    const dx = r.left + r.width / 2 - (box.left + box.width / 2);
    const dy = r.top + r.height / 2 - (box.top + box.height / 2);
    return `translate(${dx}px, ${dy}px) scale(${scale})`;
  };

  const open = () => {
    const img = thumbRef.current;
    if (!img) return;
    const vw = window.innerWidth - MARGIN * 2;
    const vh = window.innerHeight - MARGIN * 2;
    const scale = Math.min(vw / src.width, vh / src.height, 1);
    const w = src.width * scale;
    const h = src.height * scale;
    const box = new DOMRect((window.innerWidth - w) / 2, (window.innerHeight - h) / 2, w, h);
    setClosing(false);
    setZoomed({ url: img.currentSrc || img.src, box });
  };

  const close = useCallback(() => {
    const el = zoomRef.current;
    if (!zoomed || !el || closing) return;
    setClosing(true);
    el.style.transform = fromThumb(zoomed.box);
    window.setTimeout(() => setZoomed(null), DURATION);
  }, [zoomed, closing]);

  // Play the open animation: start on top of the thumbnail, then release to the centered box.
  useEffect(() => {
    const el = zoomRef.current;
    if (!zoomed || !el || closing) return;
    el.style.transition = "none";
    el.style.transform = fromThumb(zoomed.box);
    el.getBoundingClientRect();
    el.style.transition = "";
    el.style.transform = "none";
  }, [zoomed, closing]);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", close, { passive: true });
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", close);
      window.removeEventListener("resize", close);
    };
  }, [zoomed, close]);

  return (
    <>
      <button type="button" className="zoom-trigger" onClick={open} aria-label={`Enlarge: ${alt}`}>
        <Image
          ref={thumbRef}
          src={src}
          alt={alt}
          sizes={sizes}
          placeholder="blur"
          priority={priority}
          style={{ visibility: zoomed ? "hidden" : undefined }}
        />
      </button>
      {zoomed &&
        createPortal(
          <div
            className="zoom-overlay"
            data-closing={closing}
            onClick={close}
            role="dialog"
            aria-label={alt}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={zoomRef}
              src={full.src}
              srcSet={full.srcSet}
              sizes={`${Math.round(zoomed.box.width)}px`}
              alt={alt}
              className="zoom-image"
              style={{
                left: zoomed.box.left,
                top: zoomed.box.top,
                width: zoomed.box.width,
                height: zoomed.box.height,
                backgroundImage: `url("${zoomed.url}")`,
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
