import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { formatDate, getPost, getPosts } from "@/lib/writing";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main>
      <Link href="/writing" className="back" data-animate style={delay(0)}>
        <span>←</span> Writing
      </Link>

      <header data-animate style={delay(1)}>
        <h1 className="title">{post.title}</h1>
        <p className="row-desc">{formatDate(post.date)}</p>
      </header>

      <article
        className="prose"
        data-animate
        style={delay(2)}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <Footer index={3} />
    </main>
  );
}
