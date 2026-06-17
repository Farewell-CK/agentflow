import type {
  OperatorTaskStatus,
  OrderStatus,
  QualityStatus,
  UserRole
} from "@prisma/client";

export type Role = UserRole;
export type OrderStage = OrderStatus;
export type TaskStatus = OperatorTaskStatus;
export type CheckStatus = QualityStatus;

export type ServicePackageView = {
  id: string;
  slug: string;
  name: string;
  priceCny: number;
  billingLabel: string;
  hostingDays: number;
  revisionCount: number;
  summary: string;
  includes: string[];
  excludes: string[];
  highlight: boolean;
};

export type MerchantProfileInput = {
  shopName: string;
  industry: string;
  address: string;
  phone: string;
  businessHours: string;
  tagline: string;
  highlights: string[];
  style: string;
  assetsNote: string;
};

export type TaskSpecView = {
  goal: string;
  pageType: string;
  sections: string[];
  formFields: string[];
  constraints: string[];
};

export type OrderTimelineItem = {
  key: OrderStage;
  title: string;
  description: string;
};

export type QualityCheckView = {
  id: string;
  label: string;
  status: CheckStatus;
  note: string;
};

export type OperatorPlanStep = {
  title: string;
  detail: string;
};

export type TerminalLine = {
  command?: string;
  output?: string;
  tone?: "default" | "success" | "warn";
};
