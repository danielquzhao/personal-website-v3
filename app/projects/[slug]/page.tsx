import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { ZoomImage } from "@/components/zoom-image";
import { projects, type Block } from "@/content/data";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: { images: [project.cover.src] },
  };
}

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main>
      <Link href="/projects" className="back" data-animate style={delay(0)}>
        <span>←</span> Projects
      </Link>

      <header data-animate style={delay(1)}>
        <h1 className="title">{project.title}</h1>
        <p className="row-desc">{project.tagline}</p>
      </header>

      <dl className="meta" data-animate style={delay(2)}>
        <div>
          <dt>{project.event ? "Event" : "Date"}</dt>
          <dd>{project.event ? `${project.event}, ${project.date}` : project.date}</dd>
        </div>
        <div>
          <dt>Links</dt>
          <dd>
            {project.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>{project.stack.join(", ")}</dd>
        </div>
      </dl>

      <div className="frame cover" data-animate style={delay(3)}>
        <ZoomImage
          src={project.cover}
          alt={project.title}
          priority
          sizes="(max-width: 640px) 100vw, 640px"
        />
      </div>

      <article className="prose" data-animate style={delay(4)}>
        {project.body.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}
      </article>

      <nav className="next" data-animate style={delay(5)}>
        <span>Next</span>
        <Link href={`/projects/${next.slug}`}>
          {next.title} <span className="arrow">→</span>
        </Link>
      </nav>

      <Footer index={6} />
    </main>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h":
      return <h2>{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "img":
      return (
        <figure>
          <div className="frame">
            <ZoomImage src={block.src} alt={block.alt} sizes="(max-width: 640px) 100vw, 640px" />
          </div>
        </figure>
      );
    case "gallery":
      return (
        <div className="gallery">
          {block.images.map((img) => (
            <div key={img.alt} className="frame">
              <ZoomImage src={img.src} alt={img.alt} sizes="320px" />
            </div>
          ))}
        </div>
      );
    case "code":
      return (
        <pre className="code">
          <span className="code-lang">{block.lang}</span>
          <code>{block.code}</code>
        </pre>
      );
    case "credits":
      return (
        <p className="credits">
          {block.intro}{" "}
          {block.people.map((person, i) => (
            <span key={person.href}>
              <a href={person.href} target="_blank" rel="noreferrer">
                {person.name}
              </a>
              {i < block.people.length - 2 ? ", " : i === block.people.length - 2 ? " and " : "."}
            </span>
          ))}
        </p>
      );
  }
}
