import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { OrderStatus } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { buildTaskSpec, nextOrderCode, statusToStep } from "@/lib/domain";
import { prisma } from "@/lib/db";
import { createOrderSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = createOrderSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const servicePackage = await prisma.servicePackage.findUnique({
    where: { slug: payload.data.packageSlug }
  });
  if (!servicePackage) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  const orderCount = await prisma.order.count();
  const code = nextOrderCode(orderCount);
  const taskSpec = buildTaskSpec(
    payload.data.merchantProfile,
    servicePackage.name,
    payload.data.formFields
  );
  const merchantProfile = await prisma.merchantProfile.create({
    data: payload.data.merchantProfile
  });

  const order = await prisma.order.create({
    data: {
      code,
      status: OrderStatus.OPERATOR_REVIEW,
      currentStep: statusToStep(OrderStatus.OPERATOR_REVIEW),
      merchantUserId: session.user.id,
      servicePackageId: servicePackage.id,
      merchantProfileId: merchantProfile.id,
      taskSpec: {
        create: taskSpec
      },
      operatorTask: {
        create: {
          status: "QUEUED",
          priority: servicePackage.highlight ? "high" : "normal",
          plan: [
            { title: "读取 TaskSpec", detail: "确认行业、套餐、素材和交付边界。" },
            { title: "生成并修复页面", detail: "检查首屏、CTA、表单和手机端适配。" },
            { title: "发布前质检", detail: "完成清单后提交托管预览。" }
          ],
          logs: [`[${new Date().toISOString()}] order ${code} created from requirement form`],
          checklist: {
            create: [
              {
                label: "信息完整性",
                status: "WARN",
                note: "等待 Operator 复核。"
              },
              {
                label: "移动端适配",
                status: "WARN",
                note: "等待生成后检查。"
              },
              {
                label: "套餐边界",
                status: "PASS",
                note: "未包含真实支付和复杂系统。"
              }
            ]
          }
        }
      }
    },
  });

  const site = await prisma.hostedSite.create({
    data: {
      slug: `${slugify(payload.data.merchantProfile.shopName) || "merchant"}-${Date.now()}`,
      orderId: order.id,
      merchantProfileId: merchantProfile.id,
      headline: payload.data.merchantProfile.shopName,
      subheadline: payload.data.merchantProfile.tagline,
      sections: [
        { title: "主打服务", body: payload.data.merchantProfile.highlights.join(" / ") },
        { title: "门店位置", body: payload.data.merchantProfile.address },
        { title: "咨询方式", body: payload.data.merchantProfile.phone }
      ],
      editableFields: {
        phone: payload.data.merchantProfile.phone,
        address: payload.data.merchantProfile.address,
        businessHours: payload.data.merchantProfile.businessHours,
        heroCta: "立即咨询"
      },
      published: true,
      lastPublishedAt: new Date()
    }
  });

  return NextResponse.json({ id: order.id, code: order.code, siteId: site.id });
}
