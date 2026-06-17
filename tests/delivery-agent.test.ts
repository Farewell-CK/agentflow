import { describe, expect, it } from "vitest";
import { createDeliveryDraft } from "@/lib/agents/delivery-agent";

describe("delivery agent", () => {
  it("falls back when Zhipu config is absent", async () => {
    const previous = process.env.ZHIPU_API_KEY;
    delete process.env.ZHIPU_API_KEY;

    const draft = await createDeliveryDraft({
      packageName: "基础托管版",
      merchantProfile: {
        shopName: "青禾花艺",
        industry: "花艺",
        address: "上海市徐汇区",
        phone: "021-5566-8899",
        businessHours: "10:00-21:00",
        tagline: "同城鲜花",
        highlights: ["3 小时配送"],
        style: "清透",
        assetsNote: ""
      },
      taskSpec: {
        goal: "生成手机端宣传页",
        pageType: "mobile-landing-page",
        sections: ["Hero"],
        formFields: ["姓名", "电话"],
        constraints: ["移动端优先"]
      }
    });

    process.env.ZHIPU_API_KEY = previous;
    expect(draft.source).toBe("fallback");
    expect(draft.headline).toBe("青禾花艺");
  });
});
