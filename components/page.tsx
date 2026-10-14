import { ViewTransition } from "react";

// Page content as its own view-transition group: on navigation the old page fades out
// while the new one plays its staggered entrance, instead of snapping at the end.
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <main>{children}</main>
    </ViewTransition>
  );
}
