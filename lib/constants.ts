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
    title: "资料已提交",
    description: "行业、门店资料、服务内容和托管边界已结构化为交付规格。"
  },
  {
    key: OrderStatus.AGENT_GENERATING,
    title: "Agent 生成初稿",
    description: "平台 Agent 根据交付规格生成手机端页面、文案和表单初稿。"
  },
  {
    key: OrderStatus.AUTO_QA,
    title: "自动检查",
    description: "自动检查资料完整性、移动端可读性、托管配置和服务包边界。"
  },
  {
    key: OrderStatus.OPERATOR_REVIEW,
    title: "Operator 质检",
    description: "认证 AI Operator 只处理结构化任务，对审美、内容和异常做质量兜底。"
  },
  {
    key: OrderStatus.PUBLISHED,
    title: "已发布托管",
    description: "数字成果发布到 AgentFlow 托管环境，用户可预览、转发和编辑基础信息。"
  },
  {
    key: OrderStatus.CONFIRMED,
    title: "用户确认",
    description: "用户验收交付结果，套餐内修改次数和超范围加购边界同步生效。"
  },
  {
    key: OrderStatus.MAINTENANCE,
    title: "进入维护期",
    description: "托管继续生效，用户可改电话、地址、营业时间、服务项目和图片。"
  }
];

export const cliDemoLines: TerminalLine[] = [
  { command: "agentflow login --role operator" },
  { output: "Authenticated as Operator Lin", tone: "success" },
  { command: "agentflow pull --queue quality-review" },
  { output: "Pulled structured task: AF-2406-001 · 标准获客页 · waiting for QA" },
  { command: "agentflow plan AF-2406-001" },
  { output: "Plan: review TaskSpec -> inspect Agent draft -> fix issues -> publish check" },
  { command: "agentflow generate AF-2406-001 --local-agent codex" },
  { output: "Generated managed-page patch and editable field map" },
  { command: "agentflow preview AF-2406-001" },
  { output: "Preview URL ready: /hosted/qinghe-floral" },
  { command: "agentflow check AF-2406-001" },
  { output: "5 checks passed, 1 warning: image material placeholder", tone: "warn" },
  { command: "agentflow fix AF-2406-001 --issue image-placeholder" },
  { output: "Applied fix and updated Operator notes", tone: "success" },
  { command: "agentflow submit AF-2406-001 --delivery hosted-result" },
  { output: "Submitted to AgentFlow managed delivery queue", tone: "success" }
];
