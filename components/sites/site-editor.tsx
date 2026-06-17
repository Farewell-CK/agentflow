"use client";

import { useState } from "react";
import Link from "next/link";
import type { getSiteById } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Site = NonNullable<Awaited<ReturnType<typeof getSiteById>>>;

export function SiteEditor({ site }: { site: Site }) {
  const initial = site.editableFields as {
    phone: string;
    address: string;
    businessHours: string;
    heroCta: string;
    services?: string[];
    images?: string[];
  };
  const [form, setForm] = useState({
    ...initial,
    servicesText: (initial.services ?? []).join("\n"),
    imagesText: (initial.images ?? []).join("\n")
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function save() {
    setStatus("saving");
    const response = await fetch(`/api/sites/${site.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: form.phone,
        address: form.address,
        businessHours: form.businessHours,
        heroCta: form.heroCta,
        services: form.servicesText.split("\n").map((item) => item.trim()).filter(Boolean),
        images: form.imagesText.split("\n").map((item) => item.trim()).filter(Boolean)
      })
    });
    setStatus(response.ok ? "saved" : "error");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>托管成果管理后台</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-cyan-50 p-4 text-sm leading-6 text-cyan-900">
            这里维护的是平台托管成果，不是源码。套餐内可改电话、地址、营业时间、服务项目和图片；超出修改次数可申请人工修改。
          </div>
          <EditField label="电话" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
          <EditField
            label="营业时间"
            value={form.businessHours}
            onChange={(value) => setForm({ ...form, businessHours: value })}
          />
          <EditField
            label="地址"
            value={form.address}
            onChange={(value) => setForm({ ...form, address: value })}
          />
          <EditField
            label="按钮文案"
            value={form.heroCta}
            onChange={(value) => setForm({ ...form, heroCta: value })}
          />
          <EditTextArea
            label="服务项目，一行一个"
            value={form.servicesText}
            onChange={(value) => setForm({ ...form, servicesText: value })}
          />
          <EditTextArea
            label="图片素材，一行一个"
            value={form.imagesText}
            onChange={(value) => setForm({ ...form, imagesText: value })}
          />
          <div className="grid gap-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-2">
            <p>修改次数：{site.revisionUsed}/{site.revisionLimit}</p>
            <p>维护到期：{site.maintenanceExpireAt ? new Date(site.maintenanceExpireAt).toLocaleDateString("zh-CN") : "按套餐计算"}</p>
            <p>质检状态：{site.qualityCheckStatus}</p>
            <p>托管状态：{site.published ? "已发布" : "待发布"}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" onClick={save} disabled={status === "saving"}>
              {status === "saving" ? "保存中" : "保存并重新发布"}
            </Button>
            <Button asChild variant="outline">
              <Link href={`/hosted/${site.slug}`}>查看托管页</Link>
            </Button>
            <Button variant="outline">申请人工修改</Button>
          </div>
          {status === "saved" ? <p className="text-sm font-semibold text-emerald-600">已保存并更新发布时间。</p> : null}
          {status === "error" ? <p className="text-sm font-semibold text-red-600">保存失败，请检查字段。</p> : null}
        </CardContent>
      </Card>
      <Card className="dark-console border-white/10">
        <CardHeader>
          <CardTitle className="text-white">{site.headline}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-200">
          <p>{site.subheadline}</p>
          <div className="rounded-lg border border-white/10 bg-white/8 p-4">
            <p>{form.phone}</p>
            <p>{form.businessHours}</p>
            <p>{form.address}</p>
            <p>{form.servicesText.split("\n").filter(Boolean).join(" / ")}</p>
          </div>
          <p className="text-xs text-slate-400">托管 slug：{site.slug}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function EditTextArea({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <textarea
        className="min-h-24 w-full rounded-md border border-slate-200 bg-white/86 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
