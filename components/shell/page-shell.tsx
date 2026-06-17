import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("min-h-screen", className)}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">{children}</div>
    </main>
  );
}
