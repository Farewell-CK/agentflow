# AgentFlow PRD

MVP：小微商家 AI 托管营销页服务。包含需求方前台、Operator 后台、CLI/Skill 和托管管理后台。

## Product Overview

AgentFlow MVP 聚焦“小微商家手机端宣传页托管服务”。用户购买服务包并填写结构化需求，平台生成 TaskSpec，Agent 自动生成落地页、文案和表单，认证 AI Operator 完成质检与修复，最终发布到 AgentFlow 托管环境，并提供可编辑信息后台。

| 字段 | 内容 |
| --- | --- |
| 产品名称 | AgentFlow |
| 产品定位 | AI 驱动的托管式数字交付网络 |
| MVP 场景 | 小商家手机端宣传页 / 活动页 / 表单页 |
| 核心用户 | 需求方：小微商家；供给方：认证 AI Operator；平台：运营/质检管理员 |
| 核心价值 | 用户买到可持续使用的数字成果；Operator 通过标准化 Agent 工作流获得收入；平台沉淀模板、组件和质检规则 |

## Roles

| 角色 | 职责 |
| --- | --- |
| 需求方 | 购买服务包、填写需求、查看进度、确认交付、自助修改信息 |
| AI Operator | 领取平台结构化任务、使用 CLI/Skill 执行、质检修复、提交交付物 |
| 平台运营 | 配置服务包、维护行业模板、处理超范围需求、管理订单与结算 |
| 质检管理员 | 制定质检规则、抽检结果、处理异常订单与争议 |

## MVP Scope

| 功能 | 说明 | 优先级 |
| --- | --- | --- |
| 服务包选择 | 展示体验版、基础托管版、标准增长版、年度维护版，明确包含内容与不包含内容 | P0 |
| 结构化需求表单 | 按行业和服务类型采集店名、地址、联系方式、素材、风格、表单需求 | P0 |
| 订单进度页 | 展示需求提交、Agent 生成、自动质检、Operator 兜底、发布托管、用户确认 | P0 |
| 成品预览页 | 展示手机端宣传页预览、在线链接、交付清单、质检结果 | P0 |
| 可编辑后台 | 允许需求方自助修改电话、营业时间、地址、菜单价格、图片等基础信息 | P0 |
| Operator 工作台 | 任务队列、Agent 执行计划、质检清单、提交/退回操作 | P0 |
| CLI/Skill 模拟 | 提供命令行或 Skill 流程，用于演示 AI Operator 如何执行平台任务 | P0 |
| 支付/真实结算 | MVP 可模拟，后续接入真实支付和分账 | P1 |

## Core Flow

1. 需求方进入首页，理解 AgentFlow 是“买结果”的托管式数字交付服务。
2. 需求方选择服务包，例如基础托管版 299 元。
3. 需求方填写结构化表单，平台生成 TaskSpec。
4. 平台 Agent 自动生成页面、文案、表单和预览链接。
5. 自动质检规则运行，发现问题则进入 Operator 工作台。
6. Operator 使用 CLI/Skill 读取任务、修复问题、确认交付。
7. 结果发布到托管环境，用户查看预览和可编辑后台。
8. 用户确认交付；后续小修改自助完成，复杂修改发起追加需求。

## Pages And Prototype References

Prototype screenshots are stored under `prototype_images/`.

| 页面 | 原型图 |
| --- | --- |
| 首页/产品入口：强调托管交付和双入口 | `prototype_images/01_home_entry_after.png` |
| 服务包选择：从低价任务改为标准服务包 | `prototype_images/02_service_packages_after.png` |
| 需求填写：分步结构化与 TaskSpec 预览 | `prototype_images/03_requirement_form_after.png` |
| 订单进度：用户可理解的交付状态 | `prototype_images/04_order_progress_after.png` |
| 成品预览与管理后台：解决运维问题 | `prototype_images/05_delivery_preview_admin_after.png` |
| Operator 工作台：结构化任务与质检清单 | `prototype_images/06_operator_workbench_after.png` |
| CLI/Skill 后台工具：降低 Operator 交付成本 | `prototype_images/07_cli_skill_after.png` |
| UE 修复说明：旧版风险与优化后方案 | `prototype_images/08_ue_revision_rationale_after.png` |
| 移动端用户视图：移动优先 | `prototype_images/09_mobile_user_flow_after.png` |
| 产品架构与数据流：平台资产飞轮 | `prototype_images/10_architecture_flow_after.png` |

## UX Revision Summary

| UE 问题 | 修改策略 |
| --- | --- |
| 弱化“接单/众包” | 旧版本容易显得低价外包；改为“服务包 + 交付网络”表达 |
| 明确维护边界 | 每个套餐说明托管期限、修改次数、不包含内容和超范围报价 |
| 移动优先 | 需求方多为小商家，发布需求和看结果都应优先适配手机端 |
| 减少用户认知负担 | 前台不展示 CLI、Agent 细节，只展示进度、预览和可编辑后台 |
| 降低 Operator 情绪劳动 | Operator 不直接面对需求方，只面对平台 TaskSpec 和质检清单 |
| 把数据飞轮改为资产飞轮 | 沉淀模板、组件、SOP、质检规则，而不是依赖低价修补数据训练模型 |

## Out Of Scope For MVP

- 不做复杂系统开发、支付系统、会员系统、复杂后台。
- 不开放人人接单市场，早期采用平台自营或认证 Operator。
- 不做一次性源码交付作为主模式，优先托管交付。
- 不承诺无限售后，套餐内明确修改次数和维护边界。
- 不托管用户的 OpenAI/Claude/Codex API Key 或账号密码。
