import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getPackages } from "@/lib/queries";
import { PageShell } from "@/components/shell/page-shell";
import { RequirementForm } from "@/components/requirements/requirement-form";

export default async function RequirementsPage({
  searchParams
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const params = await searchParams;
  const packages = await getPackages();

  return (
    <PageShell className="console-grid">
      <RequirementForm packages={packages} defaultPackageSlug={params.package} />
    </PageShell>
  );
}
