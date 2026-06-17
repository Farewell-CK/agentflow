import { describe, expect, it } from "vitest";
import { OrderStatus } from "@prisma/client";
import { buildTaskSpec, nextOrderCode, statusToStep } from "@/lib/domain";

describe("domain helpers", () => {
  it("maps order status to timeline step", () => {
    expect(statusToStep(OrderStatus.REQUIREMENT_SUBMITTED)).toBe(0);
    expect(statusToStep(OrderStatus.OPERATOR_REVIEW)).toBe(3);
  });

  it("builds a TaskSpec from merchant input", () => {
    const spec = buildTaskSpec(
      {
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
      "基础托管版",
      ["姓名", "电话"]
    );

    expect(spec.goal).toContain("青禾花艺");
    expect(spec.constraints).toContain("套餐边界：基础托管版");
    expect(spec.formFields).toEqual(["姓名", "电话"]);
  });

  it("generates stable order code format", () => {
    expect(nextOrderCode(4)).toMatch(/^AF-\d{4}-005$/);
  });
});
