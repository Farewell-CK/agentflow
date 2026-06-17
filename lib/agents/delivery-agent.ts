import type { MerchantProfileInput, TaskSpecView } from "@/lib/types";
import { callZhipuChat, hasZhipuConfig } from "@/lib/llm/zhipu";

export type DeliveryDraftInput = {
  packageName: string;
  merchantProfile: MerchantProfileInput;
  taskSpec: TaskSpecView;
};

export type DeliveryDraft = {
  source: "glm-5.2" | "fallback";
  headline: string;
  subheadline: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  qaNotes: string[];
};

export async function createDeliveryDraft(input: DeliveryDraftInput): Promise<DeliveryDraft> {
  if (!hasZhipuConfig()) {
    return fallbackDraft(input);
  }

  const content = await callZhipuChat([
    {
      role: "system",
      content:
        "你是 AgentFlow 的托管数字交付智能体。只输出严格 JSON，不要 Markdown。为小微商家生成手机端营销页草稿，保持服务包边界，不承诺真实支付、复杂系统或无限售后。"
    },
    {
      role: "user",
      content: JSON.stringify({
        requiredShape: {
          headline: "string",
          subheadline: "string",
          sections: [{ title: "string", body: "string" }],
          qaNotes: ["string"]
        },
        packageName: input.packageName,
        merchantProfile: input.merchantProfile,
        taskSpec: input.taskSpec
      })
    }
  ]);

  return normalizeDraft(content, input);
}

function normalizeDraft(content: string, input: DeliveryDraftInput): DeliveryDraft {
  try {
    const parsed = JSON.parse(content) as Omit<DeliveryDraft, "source">;
    return {
      source: "glm-5.2",
      headline: parsed.headline,
      subheadline: parsed.subheadline,
      sections: parsed.sections?.slice(0, 5) ?? [],
      qaNotes: parsed.qaNotes?.slice(0, 6) ?? []
    };
  } catch {
    return {
      ...fallbackDraft(input),
      source: "glm-5.2",
      qaNotes: ["模型返回不是严格 JSON，已使用平台 fallback 草稿。"]
    };
  }
}

function fallbackDraft(input: DeliveryDraftInput): DeliveryDraft {
  const { merchantProfile, taskSpec } = input;
  return {
    source: "fallback",
    headline: merchantProfile.shopName,
    subheadline: merchantProfile.tagline,
    sections: [
      {
        title: "主打服务",
        body: merchantProfile.highlights.join(" / ")
      },
      {
        title: "门店信息",
        body: `${merchantProfile.address}，${merchantProfile.businessHours}`
      },
      {
        title: "咨询转化",
        body: `保留电话 CTA：${merchantProfile.phone}，表单字段：${taskSpec.formFields.join("、")}`
      }
    ],
    qaNotes: ["未配置 ZHIPU_API_KEY，当前使用确定性 fallback 草稿。", ...taskSpec.constraints]
  };
}
