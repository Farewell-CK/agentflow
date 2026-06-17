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
        title="Operator 可以用命令行接入 AgentFlow 工作流"
        description="MVP 先演示完整流程，不接真实外部 Agent。后续可把这条链路产品化为 Operator CLI。"
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
