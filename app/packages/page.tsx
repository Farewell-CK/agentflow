import Link from "next/link";
import { Check, Clock, ShieldCheck, Users, X } from "lucide-react";
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
          title="服务包中心：购买可用结果，而不是购买工具"
          description="这里不是任务列表。每个服务包都明确交付内容、托管周期、修改次数和不包含范围；超出范围的修改需要加购。"
        />
        <Button asChild variant="primary">
          <Link href="/requirements">填写需求</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
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
              <p className="text-3xl font-black text-slate-950">{item.billingLabel || `${formatCny(item.priceCny)} 起`}</p>
              <p className="text-sm text-slate-500">{item.billingLabel}</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="min-h-12 text-sm leading-6 text-slate-600">{item.description || item.summary}</p>
              <div className="grid gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                <p className="flex gap-2">
                  <Clock className="h-4 w-4 text-cyan-600" />
                  交付周期：{item.deliveryTime || `${item.hostingDays} 天托管`}
                </p>
                <p className="flex gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-600" />
                  修改次数：{item.revisionCount} 次基础修改
                </p>
                <p className="flex gap-2">
                  <Users className="h-4 w-4 text-cyan-600" />
                  适合：{((item.targetUsers as string[]) ?? []).slice(0, 3).join(" / ")}
                </p>
              </div>
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
      <div className="glass-panel mt-6 rounded-lg p-5 text-sm leading-6 text-slate-600">
        平台承担托管和交付边界：服务包内的小修改按次数处理；新增页面、复杂预约排班、支付交易、会员系统、CRM
        集成等属于超出范围，需要追加购买或进入人工评估。
      </div>
    </PageShell>
  );
}
