import { notFound } from "next/navigation";
import { PageShell } from "@/components/shell/page-shell";
import { getSiteById } from "@/lib/queries";
import { SiteEditor } from "@/components/sites/site-editor";

export default async function SiteAdminPage({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await params;
  const site = await getSiteById(siteId);
  if (!site) notFound();

  return (
    <PageShell className="console-grid">
      <SiteEditor site={site} />
    </PageShell>
  );
}
