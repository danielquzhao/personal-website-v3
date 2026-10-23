import Image from "next/image";
import { Footer } from "@/components/footer";
import { Page } from "@/components/page";
import { PhotoCarousel } from "@/components/photo-carousel";
import { experience, photos, site } from "@/content/data";

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function About() {
  return (
    <Page>
      <div className="stack">
        <p data-animate style={delay(0)}>
          I study Computer Science at the University of Waterloo. Previously, I was a software
          engineer intern at{" "}
          <a href="https://www.faire.com/" target="_blank" rel="noreferrer">
            Faire
          </a>
          .
        </p>
        <p data-animate style={delay(1)}>
          I am passionate about interactive systems, human-centered design, and technology that
          brings experiences to life. In my free time, I enjoy running, swimming, and creating
          music.
        </p>
      </div>

      <section data-animate style={delay(2)}>
        <h2 className="label">Experience</h2>
        <ul className="rows">
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`}>
              <a
                href={job.href}
                target="_blank"
                rel="noreferrer"
                className="row row-banner-host"
                style={{ "--tint": job.tint } as React.CSSProperties}
              >
                <span className="row-banner" aria-hidden>
                  {job.banner ? (
                    <Image src={job.banner} alt="" fill sizes="400px" className="row-banner-image" />
                  ) : (
                    <Image src={job.logo} alt="" sizes="160px" className="row-banner-mark" />
                  )}
                </span>
                <span className="row-title">
                  <span className="logo" style={{ background: job.tint }}>
                    <Image
                      src={job.logo}
                      alt=""
                      sizes="20px"
                      style={job.logoSize ? { width: job.logoSize, height: job.logoSize } : undefined}
                    />
                  </span>
                  {job.company}
                </span>
                <span className="row-meta">{job.role}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {photos.length > 0 && (
        <section data-animate style={delay(3)}>
          <PhotoCarousel photos={photos} />
        </section>
      )}

      <section data-animate style={delay(4)}>
        <h2 className="label">Connect</h2>
        <p style={{ marginTop: 12 }}>
          Say hi at <a href={`mailto:${site.email}`}>{site.email}</a>, or find me on{" "}
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>{" "}
          and{" "}
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          .
        </p>
      </section>

      <Footer index={5} />
    </Page>
  );
}
