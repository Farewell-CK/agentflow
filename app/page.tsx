import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CircuitBoard,
  PanelsTopLeft,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shell/page-shell";

const flow = [
  { icon: PanelsTopLeft, title: "服务包", text: "边界、价格、托管周期先标准化。" },
  { icon: Bot, title: "Agent 初稿", text: "按 TaskSpec 自动生成页面和文案。" },
  { icon: ShieldCheck, title: "Operator 质检", text: "复杂异常由认证 Operator 兜底。" },
  { icon: Smartphone, title: "托管上线", text: "交付在线链接和可编辑后台。" }
];

export default function HomePage() {
  return (
    <PageShell className="console-grid">
      <section className="grid items-center gap-8 lg:grid-cols-[1fr_0.86fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/70 px-3 py-1 text-sm font-semibold text-cyan-700">
            <CircuitBoard className="h-4 w-4" />
            AI Managed Delivery Network
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              把小商家的数字化需求，变成可托管、可维护的交付结果。
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              AgentFlow 不是低价接单市场。用户购买标准服务包，平台用 Agent
              生成初稿，由 Operator 质检兜底，最终交付在线链接和自助编辑后台。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <Link href="/packages">
                选择服务包 <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/operator">查看 Operator 工作台</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["299 元起", "移动端优先", "Operator 兜底"].map((item) => (
              <div key={item} className="glass-panel rounded-lg px-4 py-3 text-sm font-bold text-slate-800">
                <CheckCircle2 className="mr-2 inline h-4 w-4 text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="dark-console relative overflow-hidden rounded-2xl border border-white/10 p-5 shadow-console">
          <div className="absolute inset-x-8 top-10 h-px animate-pulse-line bg-cyan-300/70" />
          <div className="rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Live delivery map</p>
                <h2 className="mt-1 text-xl font-black text-white">AF-2406-001</h2>
              </div>
              <span className="rounded-md bg-emerald-400/15 px-2 py-1 text-xs font-bold text-emerald-200">
                QA active
              </span>
            </div>
            <div className="grid gap-3">
              {flow.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/36 p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-300/12 text-cyan-200">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="truncate text-xs text-slate-300">{item.text}</p>
                  </div>
                  <span className="font-mono text-xs text-cyan-200">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              ["12", "模板资产"],
              ["98%", "移动质检"],
              ["2h", "平均兜底"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/8 p-3">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="mt-1 text-xs text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-4">
        {flow.map((item) => (
          <Card key={item.title} className="glass-panel">
            <CardHeader>
              <item.icon className="h-6 w-6 text-cyan-600" />
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-600">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
