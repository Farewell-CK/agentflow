import { ClipboardCheck, RotateCcw, Send } from "lucide-react";
import { PageShell } from "@/components/shell/page-shell";
import { SectionHeading } from "@/components/shell/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOperatorTasks } from "@/lib/queries";

export default async function OperatorPage() {
  const tasks = await getOperatorTasks();
  const active = tasks[0];

  return (
    <PageShell className="console-grid">
      <SectionHeading
        eyebrow="Operator Workbench"
        title="认证 AI Operator 的后台交付网络"
        description="Operator 不直接面对需求方聊天，只处理平台结构化后的任务、Agent 生成结果、自动检查问题和发布前质检。"
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.72fr_1fr]">
        <div className="space-y-3">
          {tasks.map((task) => (
            <Card key={task.id} className="glass-panel">
              <CardHeader>
                <CardTitle className="text-base">{task.order.code}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>{task.order.merchantProfile.shopName}</p>
                <p>{task.order.servicePackage.name}</p>
                <p className="font-mono text-xs text-cyan-700">{task.type} · {task.status} · {task.priority}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {active ? (
          <Card className="dark-console border-white/10">
            <CardHeader>
              <CardTitle className="text-white">{active.order.code} 发布前质检面板</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 lg:grid-cols-2">
              <Panel title="结构化需求">
                <div className="rounded-lg border border-white/10 bg-white/8 p-3">
                  <p className="font-bold text-white">{active.order.merchantProfile.shopName}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {active.order.merchantProfile.industry} · {active.order.servicePackage.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {(active.order.taskSpec?.sections as string[] | undefined)?.join(" / ")}
                  </p>
                </div>
              </Panel>
              <Panel title="Agent 生成结果">
                <div className="rounded-lg border border-white/10 bg-white/8 p-3">
                  <pre className="whitespace-pre-wrap text-xs leading-6 text-slate-300">
                    {JSON.stringify(active.agentOutput, null, 2)}
                  </pre>
                </div>
              </Panel>
              <Panel title="执行计划">
                {(active.plan as Array<{ title: string; detail: string }>).map((item) => (
                  <div key={item.title} className="rounded-lg border border-white/10 bg-white/8 p-3">
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </Panel>
              <Panel title="自动检查结果">
                <div className="rounded-lg border border-white/10 bg-white/8 p-3">
                  <pre className="whitespace-pre-wrap text-xs leading-6 text-slate-300">
                    {JSON.stringify(active.autoCheckResult, null, 2)}
                  </pre>
                </div>
                <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
                  {(active.issues as string[]).join(" / ") || "暂无问题"}
                </div>
              </Panel>
              <div className="lg:col-span-2">
                <Panel title="质检清单">
                {active.checklist.map((item) => (
                  <div key={item.id} className="rounded-lg border border-white/10 bg-white/8 p-3">
                    <p className="flex items-center gap-2 font-bold text-white">
                      <ClipboardCheck className="h-4 w-4 text-cyan-200" />
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {item.status} · {item.note}
                    </p>
                  </div>
                ))}
                </Panel>
              </div>
              <div className="lg:col-span-2">
                <Panel title="终端日志">
                  <pre className="max-h-60 overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-cyan-100">
                    {(active.logs as string[]).join("\n")}
                  </pre>
                </Panel>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-2">
                <Button variant="primary">
                  <Send className="h-4 w-4" />
                  质检通过
                </Button>
                <Button variant="dark">
                  <RotateCcw className="h-4 w-4" />
                  退回重生
                </Button>
                <Button variant="dark">手动修改</Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </PageShell>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">{title}</h2>
      {children}
    </div>
  );
}
