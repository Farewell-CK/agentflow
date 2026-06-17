import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const packages = await prisma.servicePackage.findMany({
    orderBy: [{ highlight: "desc" }, { priceCny: "asc" }]
  });

  return NextResponse.json(packages);
}
