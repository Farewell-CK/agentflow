import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const tasks = await prisma.operatorTask.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      checklist: true,
      order: {
        include: {
          servicePackage: true,
          merchantProfile: true,
          taskSpec: true,
          hostedSite: true
        }
      },
      operatorUser: true
    }
  });

  return NextResponse.json(tasks);
}
