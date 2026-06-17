"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ServicePackage } from "@prisma/client";
import { ArrowRight, ClipboardCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildTaskSpec } from "@/lib/domain";
import { formatCny } from "@/lib/utils";

const steps = ["基本信息", "页面内容", "风格素材", "确认交付"];

type FormState = {
  packageSlug: string;
  shopName: string;
  industry: string;
  address: string;
  phone: string;
  businessHours: string;
  tagline: string;
  highlightsText: string;
  style: string;
  assetsNote: string;
  formFieldsText: string;
  needForm: boolean;
  needBooking: boolean;
  needMaintenance: boolean;
  remarks: string;
};

export function RequirementForm({
  packages,
  defaultPackageSlug
}: {
  packages: ServicePackage[];
  defaultPackageSlug?: string;
}) {
  const router = useRouter();
  const defaultPackage = packages.find((item) => item.slug === defaultPackageSlug) ?? packages[0];
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    packageSlug: defaultPackage?.slug ?? "",
    shopName: "青禾花艺工作室",
    industry: "本地生活 / 花艺",
    address: "上海市徐汇区梧桐路 88 号",
    phone: "021-5566-8899",
    businessHours: "周一至周日 10:00-21:00",
    tagline: "用一束花，把今天变得更有仪式感",
    highlightsText: "同城 3 小时配送\n节日花束预定\n企业花礼定制",
    style: "清透、现代、带一点高级感",
    assetsNote: "已有门店照片 6 张，希望突出节日花束和微信咨询。",
    formFieldsText: "姓名\n电话\n用途\n预算",
    needForm: true,
    needBooking: true,
    needMaintenance: true,
    remarks: "希望页面能发给老客户，也能用于节日活动报名。"
  });

  const selectedPackage = packages.find((item) => item.slug === form.packageSlug) ?? packages[0];
  const highlights = form.highlightsText.split("\n").map((item) => item.trim()).filter(Boolean);
  const formFields = form.formFieldsText.split("\n").map((item) => item.trim()).filter(Boolean);
  const taskSpec = useMemo(
    () =>
      buildTaskSpec(
        {
          shopName: form.shopName,
          industry: form.industry,
          address: form.address,
          phone: form.phone,
          businessHours: form.businessHours,
          tagline: form.tagline,
          highlights,
          style: form.style,
          assetsNote: form.assetsNote,
          needForm: form.needForm,
          needBooking: form.needBooking,
          needMaintenance: form.needMaintenance,
          remarks: form.remarks
        },
        selectedPackage?.name ?? "服务包",
        formFields
      ),
    [form, highlights, selectedPackage?.name, formFields]
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit() {
    setLoading(true);
    setError(null);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageSlug: form.packageSlug,
        merchantProfile: {
          shopName: form.shopName,
          industry: form.industry,
          address: form.address,
          phone: form.phone,
          businessHours: form.businessHours,
          tagline: form.tagline,
          highlights,
          style: form.style,
          assetsNote: form.assetsNote,
          needForm: form.needForm,
          needBooking: form.needBooking,
          needMaintenance: form.needMaintenance,
          remarks: form.remarks
        },
        formFields
      })
    });
    setLoading(false);
    if (!response.ok) {
      setError("提交失败，请检查信息是否完整。");
      return;
    }
    const data = (await response.json()) as { id: string };
    router.push(`/orders/${data.id}`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
      <section className="glass-panel rounded-2xl p-5">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
            Delivery Intake
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            提交资料，生成托管交付规格
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            请按模板提交资料，平台会生成交付规格，随后 Agent 生成初稿，Operator 做质检。
          </p>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {steps.map((item, index) => (
              <button
                key={item}
                className={`rounded-md px-2 py-2 text-xs font-bold transition ${
                  index === step ? "bg-slate-950 text-white" : "bg-white/70 text-slate-500"
                }`}
                onClick={() => setStep(index)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {step === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="店铺 / 品牌名称" value={form.shopName} onChange={(value) => update("shopName", value)} />
            <Field label="行业类型" value={form.industry} onChange={(value) => update("industry", value)} />
            <Field label="电话" value={form.phone} onChange={(value) => update("phone", value)} />
            <Field
              label="营业时间"
              value={form.businessHours}
              onChange={(value) => update("businessHours", value)}
            />
            <div className="sm:col-span-2">
              <Field label="地址" value={form.address} onChange={(value) => update("address", value)} />
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4">
            <Field label="一句主打卖点" value={form.tagline} onChange={(value) => update("tagline", value)} />
            <TextAreaField
              label="服务内容 / 服务项目，一行一个"
              value={form.highlightsText}
              onChange={(value) => update("highlightsText", value)}
            />
            <TextAreaField
              label="门店介绍 / 品牌介绍"
              value={form.remarks}
              onChange={(value) => update("remarks", value)}
            />
            <TextAreaField
              label="表单字段，一行一个"
              value={form.formFieldsText}
              onChange={(value) => update("formFieldsText", value)}
            />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4">
            <Field label="风格偏好" value={form.style} onChange={(value) => update("style", value)} />
            <TextAreaField
              label="图片素材说明"
              value={form.assetsNote}
              onChange={(value) => update("assetsNote", value)}
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <ToggleField
                label="需要表单收集"
                checked={form.needForm}
                onChange={(value) => update("needForm", value)}
              />
              <ToggleField
                label="需要预约收集"
                checked={form.needBooking}
                onChange={(value) => update("needBooking", value)}
              />
              <ToggleField
                label="需要后续维护"
                checked={form.needMaintenance}
                onChange={(value) => update("needMaintenance", value)}
              />
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4">
            <Label>选择套餐</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {packages.map((item) => (
                <button
                  key={item.slug}
                  className={`rounded-lg border p-4 text-left transition ${
                    item.slug === form.packageSlug
                      ? "border-cyan-300 bg-cyan-50"
                      : "border-slate-200 bg-white/70"
                  }`}
                  onClick={() => update("packageSlug", item.slug)}
                >
                  <p className="font-bold text-slate-950">{item.name}</p>
                  <p className="text-sm text-slate-500">
                    {formatCny(item.priceCny)} · {item.billingLabel}
                  </p>
                </button>
              ))}
            </div>
            {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
            <Button size="lg" variant="primary" onClick={submit} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ClipboardCheck className="h-4 w-4" />}
              提交资料并生成交付规格
            </Button>
            <p className="text-sm leading-6 text-slate-500">
              提交后平台会根据你的资料生成交付规格；接下来 Agent 生成初稿，Operator 进行质检。
            </p>
          </div>
        ) : null}

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={() => setStep((value) => Math.max(0, value - 1))}>
            上一步
          </Button>
          <Button variant="default" onClick={() => setStep((value) => Math.min(3, value + 1))}>
            下一步 <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <Card className="dark-console sticky top-24 h-fit border-white/10">
        <CardHeader>
          <CardTitle className="text-white">交付规格实时预览</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SpecBlock label="目标" values={[taskSpec.goal]} />
          <SpecBlock label="页面结构" values={taskSpec.sections} />
          <SpecBlock label="表单字段" values={taskSpec.formFields} />
          <SpecBlock label="约束" values={taskSpec.constraints} />
        </CardContent>
      </Card>
    </div>
  );
}

function ToggleField({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white/80 px-3 py-3 text-sm font-semibold text-slate-700">
      {label}
      <input
        type="checkbox"
        className="h-4 w-4 accent-cyan-500"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

function Field({
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

function TextAreaField({
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
      <Textarea value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function SpecBlock({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/8 p-3">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{label}</p>
      <div className="space-y-2">
        {values.map((value) => (
          <p key={value} className="text-sm leading-6 text-slate-200">
            {value}
          </p>
        ))}
      </div>
    </div>
  );
}
