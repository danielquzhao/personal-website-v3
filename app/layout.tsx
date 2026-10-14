import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Header } from "@/components/header";
import { projects, site } from "@/content/data";
import { getPosts } from "@/lib/writing";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s — ${site.name}` },
  description:
    "Daniel Zhao studies Computer Science at the University of Waterloo and builds interactive systems.",
  openGraph: { title: site.name, url: site.url, siteName: site.name, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#151515",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="shell">
          <Header
            site={site}
            projects={projects.map(({ slug, title }) => ({ slug, title }))}
            posts={getPosts().map(({ slug, title }) => ({ slug, title }))}
          />
          {children}
        </div>
      </body>
    </html>
  );
}
