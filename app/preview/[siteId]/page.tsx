import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Link2 } from "lucide-react";
import { PageShell } from "@/components/shell/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteById } from "@/lib/queries";

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
              <CardTitle>成品预览与交付清单</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["手机端首屏", "电话 CTA", "门店地址", "营业时间", "托管链接"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {item}
                </div>
              ))}
              <div className="rounded-lg bg-slate-950 p-4 text-sm text-cyan-100">
                /hosted/{site.slug}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="primary">
                  <Link href={`/hosted/${site.slug}`}>
                    打开托管页 <Link2 className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/admin/sites/${site.id}`}>进入编辑后台</Link>
                </Button>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
