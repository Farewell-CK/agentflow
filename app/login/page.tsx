"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shell/page-shell";

const accounts = [
  ["merchant@agentflow.dev", "需求方"],
  ["operator@agentflow.dev", "Operator"],
  ["admin@agentflow.dev", "运营管理员"]
];

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function login(email: string) {
    setLoading(email);
    const result = await signIn("credentials", {
      email,
      password: "agentflow123",
      redirect: false
    });
    setLoading(null);
    if (!result?.error) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <PageShell className="console-grid">
      <div className="mx-auto max-w-xl">
        <Card className="glass-panel">
          <CardHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-cyan-300">
              <KeyRound className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl">登录 AgentFlow 演示账号</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {accounts.map(([email, label]) => (
              <Button
                key={email}
                className="w-full justify-between"
                variant={label === "需求方" ? "primary" : "outline"}
                onClick={() => login(email)}
                disabled={Boolean(loading)}
              >
                <span>{label}</span>
                <span className="font-mono text-xs">{loading === email ? "登录中" : email}</span>
              </Button>
            ))}
            <p className="pt-3 text-sm text-slate-500">
              密码固定为 agentflow123。第一版使用 demo credentials，不接外部 OAuth。
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
