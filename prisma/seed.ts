import {
  OperatorTaskStatus,
  OrderStatus,
  PrismaClient,
  QualityStatus,
  UserRole
} from "@prisma/client";
import { demoUsers } from "../lib/constants";

const prisma = new PrismaClient();

async function main() {
  await prisma.qualityCheck.deleteMany();
  await prisma.operatorTask.deleteMany();
  await prisma.hostedSite.deleteMany();
  await prisma.taskSpec.deleteMany();
  await prisma.order.deleteMany();
  await prisma.merchantProfile.deleteMany();
  await prisma.servicePackage.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all(
    demoUsers.map((user) =>
      prisma.user.create({
        data: {
          ...user,
          role: user.role as UserRole
        }
      })
    )
  );

  const merchantUser = users.find((user) => user.role === UserRole.MERCHANT)!;
  const operatorUser = users.find((user) => user.role === UserRole.OPERATOR)!;

  const packages = await Promise.all([
    prisma.servicePackage.create({
      data: {
        slug: "ai-trial",
        name: "AI 自动体验版",
        priceCny: 99,
        billingLabel: "托管 7 天",
        hostingDays: 7,
        revisionCount: 0,
        summary: "快速验证门店宣传页需求，适合低成本试用。",
        includes: ["AI 自动生成", "手机端单页", "托管链接", "基础文案"],
        excludes: ["人工精修", "复杂表单", "长期维护"],
        highlight: false
      }
    }),
    prisma.servicePackage.create({
      data: {
        slug: "managed-basic",
        name: "基础托管版",
        priceCny: 299,
        billingLabel: "托管 30 天",
        hostingDays: 30,
        revisionCount: 1,
        summary: "页面 + 文案 + 托管 + 1 次人工检查，适合门店宣传。",
        includes: ["营销页", "门店文案", "托管发布", "1 次人工检查", "基础后台编辑"],
        excludes: ["复杂预约系统", "多门店批量", "无限修改"],
        highlight: true
      }
    }),
    prisma.servicePackage.create({
      data: {
        slug: "growth-standard",
        name: "标准增长版",
        priceCny: 599,
        billingLabel: "托管 90 天",
        hostingDays: 90,
        revisionCount: 2,
        summary: "加入表单和素材整理，适合活动获客。",
        includes: ["营销页", "线索表单", "素材整理", "托管发布", "2 次修改"],
        excludes: ["支付交易", "会员系统", "复杂 CRM"],
        highlight: false
      }
    }),
    prisma.servicePackage.create({
      data: {
        slug: "annual-care",
        name: "年度维护版",
        priceCny: 999,
        billingLabel: "按年",
        hostingDays: 365,
        revisionCount: 12,
        summary: "页面托管 + 每月小改 + 基础客服，适合长期使用。",
        includes: ["长期托管", "每月小改", "基础客服", "质量巡检"],
        excludes: ["重新设计整站", "业务系统开发", "广告投放代运营"],
        highlight: false
      }
    })
  ]);

  const merchantProfile = await prisma.merchantProfile.create({
    data: {
      shopName: "青禾花艺工作室",
      industry: "本地生活 / 花艺",
      address: "上海市徐汇区梧桐路 88 号",
      phone: "021-5566-8899",
      businessHours: "周一至周日 10:00-21:00",
      tagline: "用一束花，把今天变得更有仪式感",
      highlights: ["同城 3 小时配送", "节日花束预定", "企业花礼定制"],
      style: "清透、现代、带一点高级感",
      assetsNote: "已有门店照片 6 张，希望突出节日花束和微信咨询。"
    }
  });

  const order = await prisma.order.create({
    data: {
      code: "AF-2406-001",
      status: OrderStatus.OPERATOR_REVIEW,
      currentStep: 3,
      merchantUserId: merchantUser.id,
      servicePackageId: packages[1].id,
      merchantProfileId: merchantProfile.id
    }
  });

  await prisma.taskSpec.create({
    data: {
      orderId: order.id,
      goal: "为青禾花艺生成一个手机端宣传页，引导用户电话或微信咨询。",
      pageType: "mobile-landing-page",
      sections: ["Hero", "服务卖点", "热销花束", "门店位置", "咨询表单"],
      formFields: ["姓名", "电话", "用途", "预算"],
      constraints: ["移动端优先", "必须保留电话 CTA", "不接真实支付", "1 次人工检查"]
    }
  });

  await prisma.hostedSite.create({
    data: {
      slug: "qinghe-floral",
      orderId: order.id,
      merchantProfileId: merchantProfile.id,
      headline: "青禾花艺工作室",
      subheadline: "同城鲜花、节日花束、企业花礼，一页完成咨询转化。",
      sections: [
        { title: "今日推荐", body: "玫瑰礼盒、向日葵花束、开业花篮可当日预约。" },
        { title: "服务承诺", body: "3 小时同城送达，花材新鲜，不满意可协调重做。" },
        { title: "适用场景", body: "生日、纪念日、探望、会议布置、企业客户答谢。" }
      ],
      editableFields: {
        phone: merchantProfile.phone,
        address: merchantProfile.address,
        businessHours: merchantProfile.businessHours,
        heroCta: "电话咨询"
      },
      published: true,
      lastPublishedAt: new Date()
    }
  });

  const task = await prisma.operatorTask.create({
    data: {
      orderId: order.id,
      operatorUserId: operatorUser.id,
      status: OperatorTaskStatus.IN_PROGRESS,
      priority: "high",
      plan: [
        { title: "核对 TaskSpec", detail: "确认行业、套餐边界、联系方式和 CTA 完整。" },
        { title: "移动端检查", detail: "检查首屏信息密度、按钮尺寸、表单字段可用性。" },
        { title: "托管发布前质检", detail: "确认链接、电话、地址和营业时间无误。" }
      ],
      logs: [
        "[10:12:03] claim AF-2406-001",
        "[10:13:44] generated mobile landing page draft",
        "[10:18:22] qa warning: phone CTA contrast below target",
        "[10:21:09] patch applied: CTA contrast and spacing"
      ]
    }
  });

  await prisma.qualityCheck.createMany({
    data: [
      {
        operatorTaskId: task.id,
        label: "信息完整性",
        status: QualityStatus.PASS,
        note: "店名、电话、地址、营业时间已齐全。"
      },
      {
        operatorTaskId: task.id,
        label: "移动端首屏",
        status: QualityStatus.PASS,
        note: "首屏有明确价值主张和电话 CTA。"
      },
      {
        operatorTaskId: task.id,
        label: "套餐边界",
        status: QualityStatus.PASS,
        note: "没有承诺支付、会员、复杂预约等超范围能力。"
      },
      {
        operatorTaskId: task.id,
        label: "视觉可读性",
        status: QualityStatus.WARN,
        note: "花束图片区域需要后续接真实素材。"
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
