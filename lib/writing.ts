import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  draft: boolean;
};

const dir = path.join(process.cwd(), "content/writing");

// Posts are Markdown files in content/writing. Drafts (`draft: true`) only show in dev.
function load(): (Post & { body: string })[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title),
        date: new Date(data.date).toISOString().slice(0, 10),
        summary: data.summary,
        draft: Boolean(data.draft),
        body: content,
      };
    })
    .filter((p) => !p.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPosts(): Post[] {
  return load().map(({ body: _body, ...post }) => post);
}

export function getPost(slug: string) {
  const post = load().find((p) => p.slug === slug);
  if (!post) return null;
  return { ...post, html: marked.parse(post.body, { async: false }) };
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
