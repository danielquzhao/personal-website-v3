"use client";

import { Command } from "cmdk";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTheme, setTheme, type Theme } from "@/lib/theme";
import {
  BoxIcon,
  CheckIcon,
  CopyIcon,
  ExternalIcon,
  FileIcon,
  FolderIcon,
  HomeIcon,
  MailIcon,
  MonitorIcon,
  MoonIcon,
  PenIcon,
  SearchIcon,
  SunIcon,
} from "./icons";

type Entry = { slug: string; title: string };

type Props = {
  site: { email: string; github: string; linkedin: string };
  projects: Entry[];
  posts: Entry[];
};

const pages = [
  { href: "/", label: "About", key: "H", icon: HomeIcon },
  { href: "/projects", label: "Projects", key: "P", icon: FolderIcon },
  { href: "/writing", label: "Writing", key: "W", icon: PenIcon },
];

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}

export function Header({ site, projects, posts }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setThemeState] = useState<Theme>("system");
  const [copied, setCopied] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setThemeState(getTheme());
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (open || isTyping(e.target) || !e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
      const page = pages.find((p) => p.key === e.key.toUpperCase());
      if (page) {
        e.preventDefault();
        router.push(page.href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, router]);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  const go = (href: string) => run(() => router.push(href));
  const visit = (href: string) => run(() => window.open(href, "_blank", "noopener,noreferrer"));
  const pickTheme = (t: Theme) => {
    setTheme(t);
    setThemeState(t);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="header">
        <Link href="/" className="header-name">
          Daniel Zhao
        </Link>
        <nav className="header-nav">
          {pages.slice(1).map((p) => (
            <Link key={p.href} href={p.href} data-active={isActive(p.href)}>
              {p.label.toLowerCase()}
            </Link>
          ))}
          <button
            type="button"
            className="kbd-button"
            onClick={() => setOpen(true)}
            aria-label="Open command menu"
          >
            <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>
            <kbd>K</kbd>
          </button>
        </nav>
      </header>

      <Command.Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setCopied(false);
        }}
        label="Command menu"
        className="cmdk"
        overlayClassName="cmdk-overlay"
        contentClassName="cmdk-content"
        loop
      >
        <div className="cmdk-search">
          <SearchIcon />
          <Command.Input placeholder="Search or jump to…" autoFocus />
          <kbd className="cmdk-esc">esc</kbd>
        </div>

        <Command.List>
          <Command.Empty>No results.</Command.Empty>

          <Command.Group heading="Navigation">
            {pages.map((p) => (
              <Command.Item key={p.href} value={`Go to ${p.label}`} onSelect={() => go(p.href)}>
                <p.icon />
                Go to {p.label}
                <span className="cmdk-shortcut">
                  <kbd>⇧</kbd>
                  <kbd>{p.key}</kbd>
                </span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Projects">
            {projects.map((p) => (
              <Command.Item
                key={p.slug}
                value={`Project ${p.title}`}
                onSelect={() => go(`/projects/${p.slug}`)}
              >
                <BoxIcon />
                {p.title}
              </Command.Item>
            ))}
          </Command.Group>

          {posts.length > 0 && (
            <Command.Group heading="Writing">
              {posts.map((p) => (
                <Command.Item
                  key={p.slug}
                  value={`Writing ${p.title}`}
                  onSelect={() => go(`/writing/${p.slug}`)}
                >
                  <FileIcon />
                  {p.title}
                </Command.Item>
              ))}
            </Command.Group>
          )}

          <Command.Group heading="Links">
            <Command.Item value="GitHub" onSelect={() => visit(site.github)}>
              <ExternalIcon />
              GitHub
            </Command.Item>
            <Command.Item value="LinkedIn" onSelect={() => visit(site.linkedin)}>
              <ExternalIcon />
              LinkedIn
            </Command.Item>
            <Command.Item
              value="Send email"
              onSelect={() => run(() => (window.location.href = `mailto:${site.email}`))}
            >
              <MailIcon />
              Send email
            </Command.Item>
            <Command.Item
              value="Copy email address"
              onSelect={() => {
                navigator.clipboard?.writeText(site.email);
                setCopied(true);
                setTimeout(() => setOpen(false), 700);
              }}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? "Copied!" : "Copy email address"}
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Theme">
            {(
              [
                ["light", "Light", SunIcon],
                ["dark", "Dark", MoonIcon],
                ["system", "System", MonitorIcon],
              ] as const
            ).map(([t, label, ThemeIcon]) => (
              <Command.Item key={t} value={`Theme ${label}`} onSelect={() => pickTheme(t)}>
                <ThemeIcon />
                {label}
                {theme === t && <CheckIcon className="cmdk-check" />}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
