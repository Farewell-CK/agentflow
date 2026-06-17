import { z } from "zod";

export const merchantProfileSchema = z.object({
  shopName: z.string().min(2, "请输入至少 2 个字符的店名"),
  industry: z.string().min(2, "请选择或填写行业"),
  address: z.string().min(5, "请输入完整地址"),
  phone: z.string().min(7, "请输入可联系的电话"),
  businessHours: z.string().min(3, "请输入营业时间"),
  tagline: z.string().min(4, "请输入一句主打卖点"),
  highlights: z.array(z.string().min(1)).min(1),
  style: z.string().min(2, "请输入风格偏好"),
  assetsNote: z.string().default(""),
  needForm: z.boolean().default(false),
  needBooking: z.boolean().default(false),
  needMaintenance: z.boolean().default(false),
  remarks: z.string().default("")
});

export const createOrderSchema = z.object({
  packageSlug: z.string().min(1),
  merchantProfile: merchantProfileSchema,
  pageType: z.string().default("mobile-landing-page"),
  formFields: z.array(z.string()).default(["姓名", "电话", "需求说明"])
});

export const updateSiteSchema = z.object({
  phone: z.string().min(7),
  address: z.string().min(5),
  businessHours: z.string().min(3),
  heroCta: z.string().min(2).max(20),
  services: z.array(z.string()).default([]),
  images: z.array(z.string()).default([])
});

export const updateOperatorTaskSchema = z.object({
  status: z.enum(["QUEUED", "CLAIMED", "IN_PROGRESS", "SUBMITTED", "RETURNED"]),
  note: z.string().optional()
});
