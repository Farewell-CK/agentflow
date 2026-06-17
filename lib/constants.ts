import type { OrderTimelineItem, TerminalLine } from "@/lib/types";
import { OrderStatus } from "@prisma/client";

export const demoUsers = [
  {
    name: "陈店长",
    email: "merchant@agentflow.dev",
    password: "agentflow123",
    role: "MERCHANT" as const
  },
  {
    name: "Operator Lin",
    email: "operator@agentflow.dev",
    password: "agentflow123",
    role: "OPERATOR" as const
  },
  {
    name: "AgentFlow Admin",
    email: "admin@agentflow.dev",
    password: "agentflow123",
    role: "ADMIN" as const
  }
];

export const orderTimeline: OrderTimelineItem[] = [
  {
    key: OrderStatus.REQUIREMENT_SUBMITTED,
    title: "需求已结构化",
    description: "门店资料、服务边界和交付目标已生成 TaskSpec。"
  },
  {
    key: OrderStatus.AGENT_GENERATING,
    title: "Agent 生成初稿",
    description: "系统正在组合模板、文案、表单和手机端页面结构。"
  },
  {
    key: OrderStatus.AUTO_QA,
    title: "自动质检",
    description: "检查信息完整性、移动端适配、链接可用性和套餐边界。"
  },
  {
    key: OrderStatus.OPERATOR_REVIEW,
    title: "Operator 兜底",
    description: "认证 Operator 根据质检清单修复异常并确认交付质量。"
  },
  {
    key: OrderStatus.PUBLISHED,
    title: "已发布托管",
    description: "页面发布到 AgentFlow 托管环境，用户可预览和编辑基础信息。"
  },
  {
    key: OrderStatus.CONFIRMED,
    title: "用户确认",
    description: "交付完成，后续小改走自助后台，复杂修改进入追加需求。"
  }
];

export const cliDemoLines: TerminalLine[] = [
  { command: "agentflow login --role operator" },
  { output: "Authenticated as Operator Lin", tone: "success" },
  { command: "agentflow recommend --industry local-services" },
  { output: "Recommended task: AF-2406-001 · 基础托管版 · mobile landing page" },
  { command: "agentflow claim AF-2406-001" },
  { output: "Task claimed. SLA window: 2h 15m", tone: "success" },
  { command: "agentflow plan AF-2406-001" },
  { output: "Plan generated: copy audit -> layout repair -> mobile QA -> publish check" },
  { command: "agentflow run AF-2406-001 --agent page-builder" },
  { output: "Generated sections: hero, menu, address, lead form, trust badges" },
  { command: "agentflow check AF-2406-001" },
  { output: "4 checks passed, 1 warning: phone CTA contrast", tone: "warn" },
  { command: "agentflow submit AF-2406-001 --note 'ready for user preview'" },
  { output: "Submitted to AgentFlow hosting queue", tone: "success" }
];
