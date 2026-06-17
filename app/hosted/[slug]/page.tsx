import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import { getSiteBySlug } from "@/lib/queries";

export default async function HostedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);
  if (!site) notFound();

  const fields = site.editableFields as {
    phone: string;
    address: string;
    businessHours: string;
    heroCta: string;
    services?: string[];
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-cyan-50 via-white to-blue-100 px-5 py-12">
        <div className="mx-auto max-w-md">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">本地商家托管页</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">{site.headline}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{site.subheadline}</p>
          <a
            href={`tel:${fields.phone}`}
            className="mt-6 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white"
          >
            {fields.heroCta}
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-md space-y-4 px-5 py-8">
        {(site.sections as Array<{ title: string; body: string }>).map((section) => (
          <div key={section.title} className="rounded-lg border border-slate-200 p-4">
            <h2 className="font-bold text-slate-950">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{section.body}</p>
          </div>
        ))}
        {fields.services?.length ? (
          <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-4">
            <h2 className="font-bold text-slate-950">服务项目</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{fields.services.join(" / ")}</p>
          </div>
        ) : null}
        <div className="rounded-lg bg-slate-950 p-5 text-sm leading-7 text-white">
          <p className="flex gap-2">
            <Phone className="mt-1 h-4 w-4 text-cyan-300" />
            {fields.phone}
          </p>
          <p className="flex gap-2">
            <MapPin className="mt-1 h-4 w-4 text-cyan-300" />
            {fields.address}
          </p>
          <p className="mt-2 text-slate-300">{fields.businessHours}</p>
        </div>
      </section>
    </main>
  );
}
