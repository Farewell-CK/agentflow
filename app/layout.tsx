import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentFlow",
  description: "AI 驱动的托管式数字交付平台"
};

const navItems = [
  { href: "/packages", label: "服务包" },
  { href: "/requirements", label: "提交需求" },
  { href: "/operator", label: "Operator" },
  { href: "/cli", label: "CLI" }
];

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="zh-CN">
      <body>
        <header className="sticky top-0 z-50 border-b border-white/60 bg-white/78 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3" aria-label="AgentFlow 首页">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-cyan-300 shadow-console">
                AF
              </span>
              <span>
                <span className="block text-sm font-semibold tracking-wide text-slate-950">
                  AgentFlow
                </span>
                <span className="hidden text-xs text-slate-500 sm:block">
                  Managed Digital Delivery Platform
                </span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href={session ? "/dashboard" : "/login"}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold transition",
                session
                  ? "bg-slate-950 text-white hover:bg-slate-800"
                  : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
              )}
            >
              {session ? session.user.name ?? "控制台" : "登录演示"}
            </Link>
          </div>
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
