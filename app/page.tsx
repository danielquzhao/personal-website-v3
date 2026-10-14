import { ProjectList } from "@/components/project-list";
import { Footer } from "@/components/footer";
import { experience, projects, site } from "@/content/data";

export default function Home() {
  return (
    <main className="page">
      <header data-animate style={{ "--i": 0 } as React.CSSProperties}>
        <h1 className="name">{site.name}</h1>
      </header>

      <div className="stack" style={{ marginTop: 32 }}>
        <p data-animate style={{ "--i": 1 } as React.CSSProperties}>
          <em>Building interactive things.</em> I study Computer Science at the University of
          Waterloo, and I&apos;m currently a software engineer intern at{" "}
          <a href="https://www.faire.com/" target="_blank" rel="noreferrer">
            Faire
          </a>
          .
        </p>
        <p data-animate style={{ "--i": 2 } as React.CSSProperties}>
          I&apos;m drawn to human-centered design and technology that brings experiences to
          life: augmented reality, music, and the interfaces in between. Away from the keyboard
          I&apos;m usually running, climbing, or making music.
        </p>
      </div>

      <section className="columns">
        <div data-animate style={{ "--i": 3 } as React.CSSProperties}>
          <h2 className="label">Projects</h2>
          <ProjectList
            projects={projects.map(({ slug, title, tagline, cover }) => ({
              slug,
              title,
              tagline,
              cover,
            }))}
          />
        </div>

        <div data-animate style={{ "--i": 4 } as React.CSSProperties}>
          <h2 className="label">Experience</h2>
          <ul className="list">
            {experience.map((job) => (
              <li key={job.company}>
                <a href={job.href} target="_blank" rel="noreferrer" className="item-title">
                  {job.company}
                </a>
                <span className="item-desc">{job.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-animate style={{ "--i": 5 } as React.CSSProperties}>
        <h2 className="label">Connect</h2>
        <p style={{ marginTop: 16 }}>
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

      <Footer index={6} />
    </main>
  );
}
