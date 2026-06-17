import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shell/page-shell";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  return (
    <PageShell>
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>控制台入口</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <Button asChild variant="primary">
            <Link href="/requirements">需求方下单</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/operator">Operator 工作台</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cli">CLI/Skill 演示</Link>
          </Button>
          <p className="sm:col-span-3 text-sm text-slate-500">
            当前账号：{session.user.name} · {session.user.email} · {session.user.role}
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
