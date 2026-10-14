import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { formatDate, getPosts } from "@/lib/writing";

export const metadata: Metadata = { title: "Writing" };

export default function Writing() {
  const posts = getPosts();

  return (
    <main>
      <p className="intro" data-animate style={{ "--i": 0 } as React.CSSProperties}>
        Notes on things I&apos;m building and learning.
      </p>
      <div data-animate style={{ "--i": 1 } as React.CSSProperties}>
        {posts.length === 0 ? (
          <p className="empty">Nothing here yet. Check back soon.</p>
        ) : (
          <ul className="rows">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/writing/${post.slug}`} className="row">
                  <span className="row-main">
                    <span className="row-title">
                      {post.title}
                      {post.draft && <span className="badge">Draft</span>}
                    </span>
                    {post.summary && <span className="row-desc">{post.summary}</span>}
                  </span>
                  <span className="row-meta">{formatDate(post.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer index={2} />
    </main>
  );
}
