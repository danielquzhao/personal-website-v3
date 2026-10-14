export type Theme = "light" | "dark";

const KEY = "theme";
const THEME_COLOR: Record<Theme, string> = { dark: "#151515", light: "#f3f3f0" };

// Dark is the default. Runs before paint so a saved light choice never flashes dark first.
export const themeScript = `try{if(localStorage.getItem("${KEY}")==="light"){document.documentElement.dataset.theme="light";var m=document.querySelector('meta[name="theme-color"]');if(m)m.content="${THEME_COLOR.light}"}}catch(e){}`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "light" ? "dark" : "light";
  const root = document.documentElement;
  const apply = () => {
    if (next === "light") root.dataset.theme = "light";
    else delete root.dataset.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[next]);
  };
  // Cross-fade between themes where the View Transitions API exists.
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !calm) document.startViewTransition(apply);
  else apply();
  try {
    if (next === "light") localStorage.setItem(KEY, "light");
    else localStorage.removeItem(KEY);
  } catch {}
  return next;
}
