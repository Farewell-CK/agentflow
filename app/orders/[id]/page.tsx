import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/shell/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orderTimeline } from "@/lib/constants";
import { getOrder } from "@/lib/queries";
import { compactDate } from "@/lib/utils";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <PageShell className="console-grid">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
        <section className="glass-panel rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Order Progress</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{order.code}</h1>
          <p className="mt-2 text-slate-600">
            {order.merchantProfile.shopName} · {order.servicePackage.name} · 创建于{" "}
            {compactDate(order.createdAt)}
          </p>

          <div className="mt-8 space-y-4">
            {orderTimeline.map((item, index) => {
              const done = index <= order.currentStep;
              return (
                <div key={item.key} className="flex gap-4 rounded-lg bg-white/70 p-4">
                  <div className={done ? "text-emerald-500" : "text-slate-300"}>
                    {done ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="space-y-4">
          <Card className="dark-console border-white/10">
            <CardHeader>
              <CardTitle className="text-white">交付出口</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.hostedSite ? (
                <>
                  <Button asChild className="w-full" variant="primary">
                    <Link href={`/preview/${order.hostedSite.id}`}>
                      查看成品预览 <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild className="w-full" variant="dark">
                    <Link href={`/admin/sites/${order.hostedSite.id}`}>编辑托管后台</Link>
                  </Button>
                  <Button asChild className="w-full" variant="dark">
                    <Link href={`/hosted/${order.hostedSite.slug}`}>打开托管落地页</Link>
                  </Button>
                </>
              ) : null}
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>TaskSpec</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>{order.taskSpec?.goal}</p>
              <p>页面：{order.taskSpec?.pageType}</p>
              <p>字段：{(order.taskSpec?.formFields as string[] | undefined)?.join(" / ")}</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </PageShell>
  );
}
