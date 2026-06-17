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
  };
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function save() {
    setStatus("saving");
    const response = await fetch(`/api/sites/${site.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setStatus(response.ok ? "saved" : "error");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>托管页可编辑后台</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" onClick={save} disabled={status === "saving"}>
              {status === "saving" ? "保存中" : "保存并重新发布"}
            </Button>
            <Button asChild variant="outline">
              <Link href={`/hosted/${site.slug}`}>查看托管页</Link>
            </Button>
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
