import { NextResponse } from "next/server";
import { buildTaskSpec } from "@/lib/domain";
import { createDeliveryDraft } from "@/lib/agents/delivery-agent";
import { createOrderSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const payload = createOrderSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const taskSpec = buildTaskSpec(
    payload.data.merchantProfile,
    payload.data.packageSlug,
    payload.data.formFields
  );
  const draft = await createDeliveryDraft({
    packageName: payload.data.packageSlug,
    merchantProfile: payload.data.merchantProfile,
    taskSpec
  });

  return NextResponse.json({ taskSpec, draft });
}
