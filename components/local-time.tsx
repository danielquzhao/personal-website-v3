"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

const TIME_ZONE = "America/Toronto";

function now() {
  const date = new Date();
  const time = date.toLocaleTimeString("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
  });
  const hour = Number(
    date.toLocaleString("en-US", { timeZone: TIME_ZONE, hour: "numeric", hourCycle: "h23" }),
  );
  return { time, day: hour >= 7 && hour < 19 };
}

// Current time in Waterloo. Rendered only after mount, since the server can't know the visitor's "now".
export function LocalTime() {
  const [state, setState] = useState<ReturnType<typeof now> | null>(null);

  useEffect(() => {
    setState(now());
    let interval: number | undefined;
    // Tick on the minute boundary, then every minute.
    const timeout = window.setTimeout(
      () => {
        setState(now());
        interval = window.setInterval(() => setState(now()), 60_000);
      },
      60_000 - (Date.now() % 60_000),
    );
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  if (!state) return null;

  const Icon = state.day ? SunIcon : MoonIcon;
  return (
    <span className="local-time">
      <span aria-hidden>·</span>
      <Icon width={13} height={13} aria-hidden />
      <time>{state.time}</time>
    </span>
  );
}
