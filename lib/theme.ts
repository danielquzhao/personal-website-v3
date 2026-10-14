export type Theme = "light" | "dark" | "system";

const KEY = "theme";

// Runs before paint so a saved light/dark choice never flashes the system theme first.
export const themeScript = `try{var t=localStorage.getItem("${KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  const apply = () => {
    if (theme === "system") delete root.dataset.theme;
    else root.dataset.theme = theme;
  };
  // Cross-fade between themes where the View Transitions API exists.
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !calm) document.startViewTransition(apply);
  else apply();
  try {
    if (theme === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, theme);
  } catch {}
}

export function getTheme(): Theme {
  const t = document.documentElement.dataset.theme;
  return t === "light" || t === "dark" ? t : "system";
}
