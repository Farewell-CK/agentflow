import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Link2 } from "lucide-react";
import { PageShell } from "@/components/shell/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteById } from "@/lib/queries";
import { compactDate } from "@/lib/utils";

export default async function PreviewPage({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await params;
  const site = await getSiteById(siteId);
  if (!site) notFound();

  return (
    <PageShell className="console-grid">
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr]">
        <PhonePreview site={site} />
        <div className="space-y-4">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>托管成果预览与管理信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["手机端页面预览", "发布链接", "托管状态", "可编辑字段", "表单数据", "修改次数"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {item}
                </div>
              ))}
              <div className="grid gap-3 rounded-lg bg-slate-950 p-4 text-sm text-cyan-100 sm:grid-cols-2">
                <p>链接：/hosted/{site.slug}</p>
                <p>托管状态：{site.published ? "已发布" : "待发布"}</p>
                <p>质检：{site.qualityCheckStatus}</p>
                <p>Operator：{site.operatorReviewStatus}</p>
                <p>修改次数：{site.revisionUsed}/{site.revisionLimit}</p>
                <p>维护到期：{site.maintenanceExpireAt ? compactDate(site.maintenanceExpireAt) : "按套餐计算"}</p>
              </div>
              <div className="rounded-lg bg-white/80 p-4">
                <p className="mb-2 text-sm font-bold text-slate-800">表单数据</p>
                <div className="space-y-2">
                  {(site.formSubmissions as Array<Record<string, string>>).length ? (
                    (site.formSubmissions as Array<Record<string, string>>).map((item, index) => (
                      <p key={index} className="text-sm text-slate-600">
                        {Object.values(item).join(" · ")}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">暂无表单提交。</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="primary">
                  <Link href={`/hosted/${site.slug}`}>
                    打开托管页 <Link2 className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/admin/sites/${site.id}`}>管理托管成果</Link>
                </Button>
                <Button variant="outline">申请人工修改</Button>
              </div>
              <p className="text-sm leading-6 text-slate-500">
                AgentFlow 不是一次性交付源码，而是持续托管的数字成果。电话、地址、营业时间、服务项目和图片可在后台维护。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function PhonePreview({ site }: { site: NonNullable<Awaited<ReturnType<typeof getSiteById>>> }) {
  const fields = site.editableFields as {
    phone: string;
    address: string;
    businessHours: string;
    heroCta: string;
    services?: string[];
    images?: string[];
  };
  return (
    <div className="mx-auto w-full max-w-sm rounded-[2rem] border-8 border-slate-950 bg-slate-950 p-2 shadow-console">
      <div className="overflow-hidden rounded-[1.45rem] bg-white">
        <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">
            AgentFlow Hosted
          </p>
          <h1 className="mt-3 text-3xl font-black text-slate-950">{site.headline}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{site.subheadline}</p>
          <button className="mt-5 rounded-md bg-slate-950 px-4 py-3 text-sm font-bold text-white">
            {fields.heroCta}
          </button>
        </div>
        <div className="space-y-3 p-5">
          {(site.sections as Array<{ title: string; body: string }>).map((section) => (
            <div key={section.title} className="rounded-lg bg-slate-50 p-4">
              <p className="font-bold text-slate-950">{section.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{section.body}</p>
            </div>
          ))}
          <div className="rounded-lg bg-slate-950 p-4 text-sm leading-6 text-white">
            <p>{fields.phone}</p>
            <p>{fields.businessHours}</p>
            <p>{fields.address}</p>
            <p>{fields.services?.join(" / ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
