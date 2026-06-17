import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updateOperatorTaskSchema } from "@/lib/validation";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const payload = updateOperatorTaskSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.operatorTask.findUnique({
    where: { id },
    select: { logs: true }
  });

  const logs = Array.isArray(existing?.logs) ? existing.logs : [];

  const task = await prisma.operatorTask.update({
    where: { id },
    data: {
      status: payload.data.status,
      operatorUserId: session.user.id,
      logs: [
        ...logs,
        `[${new Date().toISOString()}] ${payload.data.status.toLowerCase()} ${
          payload.data.note ?? ""
        }`
      ]
    },
    include: { checklist: true }
  });

  return NextResponse.json(task);
}
