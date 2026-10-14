import { site } from "@/content/data";
import { LocalTime } from "./local-time";

export function Footer({ index }: { index: number }) {
  return (
    <footer className="footer" data-animate style={{ "--i": index } as React.CSSProperties}>
      <span className="place">
        Waterloo, Ontario
        <LocalTime />
      </span>
      <span className="webring">
        <a href={`${site.webring}?nav=prev`} aria-label="Previous site in CS Webring">
          ←
        </a>
        <a href={site.webring} target="_blank" rel="noreferrer" aria-label="CS Webring">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://cs.uwatering.com/icon.white.svg" alt="" />
        </a>
        <a href={`${site.webring}?nav=next`} aria-label="Next site in CS Webring">
          →
        </a>
      </span>
    </footer>
  );
}
