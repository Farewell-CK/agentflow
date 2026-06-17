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
          type: "QUALITY_REVIEW",
          priority: servicePackage.highlight ? "high" : "normal",
          agentOutput: {
            headline: payload.data.merchantProfile.shopName,
            sections: taskSpec.sections,
            editableFields: ["phone", "address", "businessHours", "services", "images"]
          },
          autoCheckResult: {
            status: "pending",
            message: "等待 Agent 初稿完成后自动检查。"
          },
          issues: ["等待 Operator 根据结构化交付规格进行发布前质检。"],
          plan: [
            { title: "读取交付规格", detail: "确认行业、服务包、素材和托管边界。" },
            { title: "检查 Agent 初稿", detail: "检查首屏、CTA、表单、服务项目和可编辑字段。" },
            { title: "发布前质检", detail: "完成清单后提交托管预览，避免超范围承诺。" }
          ],
          logs: [`[${new Date().toISOString()}] delivery spec generated for ${code}`],
          checklist: {
            create: [
              {
                label: "结构化需求完整性",
                status: "WARN",
                note: "等待 Operator 复核。"
              },
              {
                label: "托管可维护性",
                status: "WARN",
                note: "等待 Agent 初稿和可编辑字段检查。"
              },
              {
                label: "套餐边界",
                status: "PASS",
                note: "未包含真实支付、复杂预约排班或无限修改。"
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
            heroCta: "立即咨询",
            services: payload.data.merchantProfile.highlights,
            images: payload.data.merchantProfile.assetsNote ? ["素材待整理"] : []
          },
      formSubmissions: [],
      qualityCheckStatus: "pending",
      operatorReviewStatus: "pending",
      revisionUsed: 0,
      revisionLimit: servicePackage.revisionCount,
      maintenanceExpireAt: new Date(Date.now() + servicePackage.hostingDays * 24 * 60 * 60 * 1000),
      published: true,
      lastPublishedAt: new Date()
    }
  });

  return NextResponse.json({ id: order.id, code: order.code, siteId: site.id });
}
