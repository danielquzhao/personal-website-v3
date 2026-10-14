"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/content/data";

type Props = { projects: Pick<Project, "slug" | "title" | "tagline" | "cover" | "date">[] };

// A screenshot that trails the cursor while hovering a project link.
// Position is eased toward the pointer each frame, with a slight tilt from horizontal velocity.
export function ProjectList({ projects }: Props) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = previewRef.current;
    if (!el) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let visible = 0;
    let shown = false;
    let primed = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!primed) {
        pos.x = target.x;
        pos.y = target.y;
        primed = true;
      }
    };

    const tick = () => {
      shown = el.dataset.show === "true";
      const prevX = pos.x;
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      visible += ((shown ? 1 : 0) - visible) * 0.18;

      const vx = pos.x - prevX;
      const tilt = Math.max(-8, Math.min(8, vx * 0.35));
      const scale = 0.88 + visible * 0.12;
      el.style.opacity = visible.toFixed(3);
      el.style.transform = `translate3d(${pos.x + 24}px, ${pos.y - 110}px, 0) rotate(${tilt}deg) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return (
    <>
      <ul className="rows" onPointerLeave={() => setActive(null)}>
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="row"
              onPointerEnter={() => setActive(p.slug)}
            >
              <span className="row-main">
                <span className="row-title">{p.title}</span>
                <span className="row-desc">{p.tagline}</span>
              </span>
              <span className="row-meta">{p.date}</span>
            </Link>
          </li>
        ))}
      </ul>

      {enabled &&
        createPortal(
          <div
            ref={previewRef}
            className="preview"
            data-show={active !== null}
            aria-hidden
            style={{ aspectRatio: "4 / 3" }}
          >
            {projects.map((p) => (
              <Image
                key={p.slug}
                src={p.cover}
                alt=""
                sizes="300px"
                placeholder="blur"
                priority
                data-active={active === p.slug}
              />
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
