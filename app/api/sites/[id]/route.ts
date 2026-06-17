import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { updateSiteSchema } from "@/lib/validation";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const site = await prisma.hostedSite.findUnique({
    where: { id },
    include: {
      merchantProfile: true,
      order: {
        include: { servicePackage: true }
      }
    }
  });

  if (!site) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  return NextResponse.json(site);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payload = updateSiteSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const site = await prisma.hostedSite.update({
    where: { id },
    data: {
      editableFields: payload.data,
      lastPublishedAt: new Date(),
      merchantProfile: {
        update: {
          phone: payload.data.phone,
          address: payload.data.address,
          businessHours: payload.data.businessHours
        }
      }
    },
    include: { merchantProfile: true }
  });

  return NextResponse.json(site);
}
