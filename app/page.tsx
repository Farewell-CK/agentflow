import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CircuitBoard,
  PanelsTopLeft,
  ShieldCheck,
  Smartphone,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shell/page-shell";

const flow = [
  { icon: PanelsTopLeft, title: "选择服务包", text: "门店宣传页、活动报名页、服务介绍页等交付边界先标准化。" },
  { icon: Bot, title: "填写需求资料", text: "平台把行业、门店信息、素材和维护诉求结构化为交付规格。" },
  { icon: ShieldCheck, title: "Agent + Operator 交付", text: "Agent 生成初稿，认证 AI Operator 做质检和异常兜底。" },
  { icon: Smartphone, title: "获得托管成果", text: "交付可访问、可编辑、可维护的托管数字成果。" }
];

const packages = ["门店宣传页", "活动报名页", "服务介绍页", "预约收集页", "商品展示页"];

const comparison = [
  ["AI 工具", "用户自己学习、提示、生成、部署和维护"],
  ["传统外包", "用户找人沟通需求，交付质量和后续维护不稳定"],
  ["AgentFlow", "用户买标准服务包，平台负责生成、质检、托管和维护边界"]
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
              AgentFlow：AI 驱动的托管式数字交付平台
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              用户购买标准化数字服务包，平台通过 Agent 生成初稿，由认证 AI Operator
              质检和兜底，最终交付可托管、可编辑、可维护的数字成果。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <Link href="/packages">
                我是商家 / 用户：查看服务包 <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/operator">我是 AI Operator：进入工作台</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["买结果，不是学工具", "平台托管和维护", "Operator 质量兜底"].map((item) => (
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
              ["5", "标准服务包"],
              ["7", "交付状态"],
              ["∞", "托管生命周期"]
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

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="glass-panel">
          <CardHeader>
            <Wrench className="h-6 w-6 text-cyan-600" />
            <CardTitle>服务说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
            <p>用户不需要学习复杂工具，也不需要自行部署和维护。</p>
            <p>用户选择标准服务包，提交结构化资料，平台负责生成、质检、托管和维护边界。</p>
            <p>最终交付的是能发给客户看的页面、表单和服务介绍，而不是一份难以维护的源码。</p>
          </CardContent>
        </Card>
        <Card className="dark-console border-white/10">
          <CardHeader>
            <CardTitle className="text-white">差异化说明</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {comparison.map(([name, text]) => (
              <div key={name} className="rounded-lg border border-white/10 bg-white/8 p-4">
                <p className="font-bold text-cyan-100">{name}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-slate-950">推荐服务包</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {packages.map((item) => (
            <Link
              href="/packages"
              key={item}
              className="glass-panel rounded-lg px-4 py-5 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-200"
            >
              {item}
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
