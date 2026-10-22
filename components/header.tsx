"use client";

import { Command } from "cmdk";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTheme, toggleTheme, type Theme } from "@/lib/theme";
import {
  BoxIcon,
  CheckIcon,
  CopyIcon,
  ExternalIcon,
  FolderIcon,
  HomeIcon,
  MailIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "./icons";

type Entry = { slug: string; title: string };

type Props = {
  site: { email: string; github: string; linkedin: string };
  projects: Entry[];
};

const pages = [
  { href: "/", label: "About", key: "H", icon: HomeIcon },
  { href: "/projects", label: "Projects", key: "P", icon: FolderIcon },
];

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}

export function Header({ site, projects }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setThemeState] = useState<Theme>("dark");
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
  const switchTheme = () => run(() => setThemeState(toggleTheme()));

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="header">
        <Link href="/" className="header-name">
          Daniel Zhao
        </Link>
        <nav className="header-nav">
          <span className="nav-links">
            {pages.slice(1).map((p) => (
              <Link key={p.href} href={p.href} data-active={isActive(p.href)}>
                {p.label.toLowerCase()}
              </Link>
            ))}
          </span>
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
            <Command.Item
              value="Toggle theme"
              keywords={["dark", "light", "mode", "appearance"]}
              onSelect={switchTheme}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              Switch to {theme === "dark" ? "light" : "dark"} theme
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
