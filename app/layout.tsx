import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { site } from "@/content/data";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfb" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
