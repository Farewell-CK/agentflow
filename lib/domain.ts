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
    goal: `为${merchantProfile.shopName}生成一个手机端宣传页，突出「${merchantProfile.tagline}」，引导用户电话咨询或提交表单。`,
    pageType: "mobile-landing-page",
    sections: ["首屏转化", "服务卖点", "门店信息", "信任背书", "咨询表单"],
    formFields,
    constraints: [
      "移动端优先",
      "不接真实支付",
      `套餐边界：${packageName}`,
      "复杂修改进入 Operator 兜底"
    ]
  };
}

export function nextOrderCode(count: number) {
  return `AF-${new Date().getFullYear().toString().slice(2)}${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}-${String(count + 1).padStart(3, "0")}`;
}
