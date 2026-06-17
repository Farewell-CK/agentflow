import { OrderStatus } from "@prisma/client";
import { orderTimeline } from "@/lib/constants";
import type { MerchantProfileInput, TaskSpecView } from "@/lib/types";

export function statusToStep(status: OrderStatus) {
  return Math.max(
    0,
    orderTimeline.findIndex((item) => item.key === status)
  );
}

export function buildTaskSpec(
  merchantProfile: MerchantProfileInput,
  packageName: string,
  formFields: string[]
): TaskSpecView {
  return {
    goal: `为${merchantProfile.shopName}交付一个可托管、可编辑、可维护的手机端数字成果，突出「${merchantProfile.tagline}」，引导用户咨询、预约或提交表单。`,
    pageType: "mobile-landing-page",
    sections: ["首屏介绍", "服务项目", "门店介绍", "联系方式", merchantProfile.needForm ? "线索表单" : "咨询入口"],
    formFields,
    constraints: [
      "移动端优先",
      "不接真实支付",
      `套餐边界：${packageName}`,
      merchantProfile.needBooking ? "预约收集仅做表单，不做复杂排班系统" : "不包含预约系统",
      merchantProfile.needMaintenance ? "需要后续维护说明" : "未购买长期维护时只包含套餐内修改",
      "复杂修改进入 Operator 质检和兜底"
    ]
  };
}

export function nextOrderCode(count: number) {
  return `AF-${new Date().getFullYear().toString().slice(2)}${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}-${String(count + 1).padStart(3, "0")}`;
}
