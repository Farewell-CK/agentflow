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
        slug: "basic-showcase",
        name: "基础展示页",
        priceCny: 299,
        billingLabel: "299 元起",
        hostingDays: 30,
        revisionCount: 1,
        summary: "手机端宣传页 + 平台托管 + 一次基础修改，适合门店基础展示。",
        description: "把门店介绍、服务项目和联系方式整理成可转发的托管页面。",
        maintenanceIncluded: false,
        deliveryTime: "1-2 个工作日",
        targetUsers: ["小微商家", "个体户", "摄影工作室", "本地服务商家"],
        includes: ["手机端宣传页", "门店介绍", "服务项目", "联系方式", "平台托管", "一次基础修改"],
        excludes: ["复杂表单", "在线支付", "会员系统", "长期维护"],
        highlight: false
      }
    }),
    prisma.servicePackage.create({
      data: {
        slug: "lead-standard",
        name: "标准获客页",
        priceCny: 599,
        billingLabel: "599 元起",
        hostingDays: 90,
        revisionCount: 2,
        summary: "宣传页 + 表单收集 + 素材整理 + Operator 质检，适合活动和获客。",
        description: "在基础展示页之上加入表单收集、移动端转化路径和发布前质检。",
        maintenanceIncluded: false,
        deliveryTime: "2-3 个工作日",
        targetUsers: ["培训机构", "民宿", "健身教练", "活动运营者"],
        includes: ["宣传页", "表单收集", "移动端适配", "素材整理", "Operator 质检", "两次基础修改"],
        excludes: ["复杂预约排班", "支付交易", "CRM 集成", "无限修改"],
        highlight: true
      }
    }),
    prisma.servicePackage.create({
      data: {
        slug: "annual-care",
        name: "年度维护版",
        priceCny: 999,
        billingLabel: "999 元 / 年起",
        hostingDays: 365,
        revisionCount: 12,
        summary: "页面托管 + 每月小修改 + 表单数据导出，适合持续经营。",
        description: "为已经上线的数字成果提供维护期服务和基础故障处理。",
        maintenanceIncluded: true,
        deliveryTime: "按月维护",
        targetUsers: ["长期经营门店", "连锁小店", "培训机构", "服务型商家"],
        includes: ["页面托管", "每月小修改", "基础故障处理", "表单数据导出", "服务内容更新"],
        excludes: ["重新设计整站", "业务系统开发", "广告投放代运营", "无限人工修改"],
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
      assetsNote: "已有门店照片 6 张，希望突出节日花束和微信咨询。",
      needForm: true,
      needBooking: true,
      needMaintenance: true,
      remarks: "希望页面能发给老客户，也能用于节日活动报名。"
    }
  });

  const order = await prisma.order.create({
    data: {
      code: "AF-2406-001",
      status: OrderStatus.PUBLISHED,
      currentStep: 4,
      merchantUserId: merchantUser.id,
      servicePackageId: packages[1].id,
      merchantProfileId: merchantProfile.id,
      previewUrl: "/preview/qinghe-floral",
      maintenanceExpireAt: new Date("2027-06-30T00:00:00.000Z")
    }
  });

  await prisma.taskSpec.create({
    data: {
      orderId: order.id,
      goal: "为青禾花艺交付一个可托管、可编辑、可维护的手机端获客页，引导用户电话、微信咨询或提交预约表单。",
      pageType: "mobile-landing-page",
      sections: ["首屏介绍", "服务项目", "热销花束", "门店位置", "预约收集表单"],
      formFields: ["姓名", "电话", "用途", "预算"],
      constraints: ["移动端优先", "必须保留电话 CTA", "不接真实支付", "预约收集仅做表单", "2 次基础修改"]
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
        heroCta: "电话咨询",
        services: ["节日花束", "企业花礼", "同城配送"],
        images: ["门店照片", "花束照片", "活动海报"]
      },
      formSubmissions: [
        { name: "王女士", phone: "138****1024", usage: "生日花束", budget: "300-500" },
        { name: "林先生", phone: "139****8801", usage: "企业花礼", budget: "1000+" }
      ],
      qualityCheckStatus: "passed",
      operatorReviewStatus: "approved",
      revisionUsed: 1,
      revisionLimit: 2,
      maintenanceExpireAt: new Date("2027-06-30T00:00:00.000Z"),
      published: true,
      lastPublishedAt: new Date()
    }
  });

  const task = await prisma.operatorTask.create({
    data: {
      orderId: order.id,
      operatorUserId: operatorUser.id,
      status: OperatorTaskStatus.IN_PROGRESS,
      type: "QUALITY_REVIEW",
      priority: "high",
      agentOutput: {
        headline: "青禾花艺工作室",
        sections: ["首屏介绍", "服务项目", "预约表单"],
        editableFields: ["phone", "address", "businessHours", "services", "images"]
      },
      autoCheckResult: {
        status: "warning",
        passed: 5,
        warnings: 1
      },
      issues: ["图片素材仍为占位，需要 Operator 发布前确认。"],
      plan: [
        { title: "核对 TaskSpec", detail: "确认行业、套餐边界、联系方式和 CTA 完整。" },
        { title: "检查 Agent 初稿", detail: "检查首屏信息密度、按钮尺寸、表单字段和可编辑字段。" },
        { title: "托管发布前质检", detail: "确认链接、电话、地址、营业时间、维护期和修改次数无误。" }
      ],
      logs: [
        "[10:12:03] pull structured task AF-2406-001",
        "[10:13:44] inspect Agent-generated managed page draft",
        "[10:18:22] auto check warning: image material placeholder",
        "[10:21:09] operator note added: verify merchant images before final publish"
      ]
    }
  });

  await prisma.qualityCheck.createMany({
    data: [
      {
        operatorTaskId: task.id,
        label: "结构化需求完整性",
        status: QualityStatus.PASS,
        note: "行业、店名、服务内容、电话、地址、营业时间已齐全。"
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
        note: "没有承诺支付、会员、复杂预约排班或无限修改。"
      },
      {
        operatorTaskId: task.id,
        label: "托管可维护性",
        status: QualityStatus.WARN,
        note: "图片素材区域仍为占位，发布前需要 Operator 确认。"
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
