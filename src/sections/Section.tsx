import type { ReactNode } from "react";
export function Section({ id, children, flush = false, className = "" }: { id: string; children: ReactNode; flush?: boolean; className?: string; }) {
return (
<section id={id} className={`section ${flush ? "section--flush" : ""} ${className}`} aria-label={id}>
{children}
</section>
);
}
