import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Page } from "@/components/page";
import { experience, site } from "@/content/data";

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function About() {
  return (
    <Page>
      <div className="stack">
        <p data-animate style={delay(0)}>
          <em>Building interactive things.</em> I study Computer Science at the University of
          Waterloo, and I&apos;m currently a software engineer intern at{" "}
          <a href="https://www.faire.com/" target="_blank" rel="noreferrer">
            Faire
          </a>
          .
        </p>
        <p data-animate style={delay(1)}>
          I&apos;m drawn to human-centered design and technology that brings experiences to
          life: augmented reality, music, and the interfaces in between. Have a look at{" "}
          <Link href="/projects">what I&apos;ve built</Link>. Away from the keyboard I&apos;m
          usually running, climbing, or making music.
        </p>
      </div>

      <section data-animate style={delay(2)}>
        <h2 className="label">Experience</h2>
        <ul className="rows">
          {experience.map((job) => (
            <li key={job.company}>
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

      <section data-animate style={delay(3)}>
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

      <Footer index={4} />
    </Page>
  );
}
