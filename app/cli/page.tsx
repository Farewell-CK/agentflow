import { Terminal } from "lucide-react";
import { PageShell } from "@/components/shell/page-shell";
import { SectionHeading } from "@/components/shell/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cliDemoLines } from "@/lib/constants";

export default function CliPage() {
  return (
    <PageShell className="console-grid">
      <SectionHeading
        eyebrow="CLI / Skill Demo"
        title="AgentFlow CLI / Skill 是 AI Operator 的后台生产工具"
        description="它帮助 AI Operator 拉取结构化任务、生成执行计划、调用本地 Agent、检查结果并提交交付物，是后台交付网络的一部分。"
      />

      <Card className="dark-console mt-8 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Terminal className="h-5 w-5 text-cyan-200" />
            agentflow terminal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-white/10 bg-slate-950 p-5 font-mono text-sm">
            {cliDemoLines.map((line, index) => (
              <p
                key={`${line.command ?? line.output}-${index}`}
                className={
                  line.tone === "success"
                    ? "text-emerald-300"
                    : line.tone === "warn"
                      ? "text-amber-300"
                      : "text-cyan-100"
                }
              >
                {line.command ? <span className="text-slate-500">$ </span> : null}
                {line.command ?? line.output}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
