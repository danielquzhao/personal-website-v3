import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Page } from "@/components/page";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/content/data";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  return (
    <Page>
      <p className="intro" data-animate style={{ "--i": 0 } as React.CSSProperties}>
        A few things I&apos;ve built.
      </p>
      <div data-animate style={{ "--i": 1 } as React.CSSProperties}>
        <ProjectList
          projects={projects.map(({ slug, title, tagline, cover }) => ({
            slug,
            title,
            tagline,
            cover,
          }))}
        />
      </div>
      <Footer index={2} />
    </Page>
  );
}
