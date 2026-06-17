# AgentFlow Codex / Claude Code 实现指令

## 产品定位
AgentFlow 是一个 AI 驱动的托管式数字交付网络。MVP 聚焦“小微商家手机端宣传页托管服务”。

## 技术栈
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- lucide-react
- MVP 使用 mock 数据和 localStorage
- 部署到 Vercel

## 一次性总指令
```text
请你实现一个 Next.js + TypeScript + Tailwind CSS 的 AgentFlow MVP。
产品定位：AI 驱动的托管式数字交付网络。
MVP 场景：小微商家手机端宣传页托管服务。
要求实现页面：首页、服务包选择、需求填写、订单进度、成品预览与管理后台、Operator 工作台、CLI/Skill 演示页、托管落地页。
要求使用 mock 数据，不接真实支付，不接真实 AI API。
UI 风格：现代 SaaS，蓝白色，卡片布局，移动端优先，强调“服务包 + 托管交付 + Operator 兜底”。
交互要求：用户可以选择服务包、填写门店信息、提交后生成订单；订单页展示交付进度；预览页展示手机端营销页；后台页允许编辑电话、营业时间、地址；Operator 页展示任务队列、执行计划和质检清单；CLI 页展示模拟命令和日志。
请先生成完整项目结构，再逐步实现组件和页面，最后检查 TypeScript、lint 和响应式布局。
```

## 分阶段指令

### 阶段 1：初始化
创建 Next.js 14 App Router 项目，安装 Tailwind、shadcn/ui、lucide-react，设置基础布局和主题色。

### 阶段 2：数据模型
在 `lib/types.ts` 定义 ServicePackage、Order、TaskSpec、MerchantProfile、OperatorTask。写入 mock 数据。

### 阶段 3：首页和服务包页
实现首页 hero、双入口、服务包卡片、交付流程和套餐边界说明。

### 阶段 4：需求填写页
实现四步表单：基本信息、页面内容、风格素材、确认交付。右侧实时显示 TaskSpec。

### 阶段 5：订单进度页
实现时间线：需求提交、Agent 生成、自动质检、Operator 兜底、发布托管、用户确认。

### 阶段 6：成品预览与后台
实现手机端营销页预览、托管链接、可编辑字段后台和保存重新发布按钮。

### 阶段 7：Operator 工作台
实现任务队列、Agent 执行计划、质检清单、终端日志、确认提交/退回按钮。

### 阶段 8：CLI/Skill 演示页
实现 TerminalPanel，展示 `agentflow login/recommend/claim/plan/run/check/submit` 全流程。

### 阶段 9：检查
运行 `npm run lint` 和 `npm run build`，修复 TypeScript、布局和响应式问题。
