import Link from "next/link";
import { Check, X } from "lucide-react";
import { PageShell } from "@/components/shell/page-shell";
import { SectionHeading } from "@/components/shell/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPackages } from "@/lib/queries";
import { formatCny } from "@/lib/utils";

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <PageShell className="console-grid">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Service Packages"
          title="先锁定边界，再启动交付"
          description="AgentFlow 用标准服务包替代低价接单。每个套餐都明确托管周期、修改次数、包含项和不包含项。"
        />
        <Button asChild variant="primary">
          <Link href="/requirements">填写需求</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {packages.map((item) => (
          <Card
            key={item.id}
            className={item.highlight ? "border-cyan-300 bg-cyan-50/80 shadow-console" : "glass-panel"}
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{item.name}</CardTitle>
                {item.highlight ? (
                  <span className="rounded-md bg-cyan-300 px-2 py-1 text-xs font-black text-slate-950">
                    推荐
                  </span>
                ) : null}
              </div>
              <p className="text-3xl font-black text-slate-950">{formatCny(item.priceCny)}</p>
              <p className="text-sm text-slate-500">{item.billingLabel}</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="min-h-12 text-sm leading-6 text-slate-600">{item.summary}</p>
              <div>
                <p className="mb-2 text-sm font-bold text-slate-800">包含</p>
                <ul className="space-y-2">
                  {(item.includes as string[]).map((text) => (
                    <li key={text} className="flex gap-2 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-sm font-bold text-slate-800">不包含</p>
                <ul className="space-y-2">
                  {(item.excludes as string[]).map((text) => (
                    <li key={text} className="flex gap-2 text-sm text-slate-500">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="w-full" variant={item.highlight ? "default" : "outline"}>
                <Link href={`/requirements?package=${item.slug}`}>选择套餐</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
