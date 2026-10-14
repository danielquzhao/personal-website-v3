import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/content/data";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  return (
    <main>
      <p className="intro" data-animate style={{ "--i": 0 } as React.CSSProperties}>
        Things I&apos;ve built, mostly at hackathons and on weekends.
      </p>
      <div data-animate style={{ "--i": 1 } as React.CSSProperties}>
        <ProjectList
          projects={projects.map(({ slug, title, tagline, cover, date }) => ({
            slug,
            title,
            tagline,
            cover,
            date,
          }))}
        />
      </div>
      <Footer index={2} />
    </main>
  );
}
