---
name: paywall-visual-builder
description: >-
  Standardized engineering methodology, architectural patterns, and defensive guardrails
  for building and maintaining commercial visual paywall builders, interactive no-code editors,
  and marketing landing page demo engines. Use when building or refactoring 3-pane builders
  (catalog, canvas, inspector), designing AST JSON node trees, resolving multi-selection
  state bugs, debugging mobile viewport collisions, or verifying pre-release quality.
---

# Commercial Paywall & Visual Builder Engineering Skill

## 1. 触发情境与使用时机 (When to Use)

当面临以下任何场景时，自动或显式激活本 Skill：
1. **新建或重构搭建器/低代码平台**：需要设计三栏式可视化页面编辑器（组件库、手机画布、属性检查器）。
2. **商业化付费墙与订阅页开发**：为移动 App 开发购买页、套餐选择卡、对比表格、试用时间轴或倒计时。
3. **复杂状态机排错与治理**：遇到属性面板**“按钮同时多选高亮”**、**“选项切换无效/状态死锁”**、**“旧字段残留污染”**等状态机顽疾。
4. **移动端沉浸视口适配与避让**：处理全屏 Header、顶部关闭按钮与吉祥物/标题的重合与避让问题。
5. **发布前防御性审查 (Pre-release Audit)**：在代码提交或上线前，执行 8 项防御性检查清单把关。

---

## 2. 核心架构设计：三栏单向闭环数据流

所有低代码搭建器必须基于以下**解耦与单向闭环**架构：

```
+---------------------+------------------------------+---------------------------+
| 1. 图层与组件库      | 2. 高保真手机视口 (Canvas)    | 3. 动态属性检查器 (Inspector)|
| (Element Catalog)   | (Live Mobile Viewport)       | (Properties Inspector)    |
| - 组件挂载与树管理  | - 解释执行 Node AST          | - 基于 node.type 单选状态机|
| - 页面模版一键加载   | - 实时解析动态变量插槽       | - 严格互斥表单渲染        |
| - 节点增删与重命名   | - 主题切换与像素级真实渲染   | - 实时回写 node.config    |
+---------------------+------------------------------+---------------------------+
                                     ^
                                     | 单向数据流 (Unidirectional Data Flow)
                                     v
                       [ Central State Store: Node AST ]
```

---

## 3. 标准 5 步实施流程 (5-Step Standard Operating Procedure)

当需要新增功能、修改组件或排查问题时，严格按此 SOP 逐步推进：

### Step 1: 契约与 Schema 先行 (Schema-First Contract)
在动任何 React UI 之前，先定义好该节点的标准 AST 结构。
- 检查 [examples/standard_nodes.json](./examples/standard_nodes.json) 中的标准定义。
- 严禁在没有统一 Schema 的情况下在组件内部硬编码专有私有数据结构。

### Step 2: 严格互斥状态机配置 (Single-Source State Machine)
- 检查右侧检查器的切换按钮。每个分类必须且只能拥有一个**明确命名的枚举变量**（如 `currentRole`）。
- 按钮的高亮判定**必须为严格全等 (`===`)**，绝对禁止使用 `||` 进行模糊判定。

### Step 3: 角色切换脏数据清洗 (State Cleanup)
- 当用户在同类组件中切换不同形态（例如从“3天试用时间轴”切到“对比表格”）：
  - 必须显式执行字段清洗（如 `delete nextConfig.steps; delete nextConfig.features;`）。
  - 注入新形态的纯净默认值，防止旧数据污染新页面。

### Step 4: 视口防穿帮与自适应避让 (Adaptive Layout)
- 检查移动端全屏 Hero 区域：
  - 确认关闭按钮在 `top-left` 与 `top-right` 之间切换时，周边元素（返回键、吉祥物、主副标题）是否设置了**智能避让（Smart Repositioning）**。
  - 绝不能出现文字与图标重叠的视觉 Bug。

### Step 5: 动态变量连通与自动化交付 (Hydration & Release)
- 文本组件必须接入 `renderInterpolated`，确保学员画像模拟器（林凡/Sakura/Carlos）能动态注水。
- 运行 [scripts/validate_schema.js](./scripts/validate_schema.js) 静态扫描。
- 运行 [scripts/deploy_gh_pages.sh](./scripts/deploy_gh_pages.sh) 一键构建并交付线上可体验站点。

---

## 4. 发布前 8 项防御性检查清单 (Pre-flight Checklist)

在任何代码交付或向用户答复前，必须逐项核对：

- [ ] **1. W3C 原生全局变量防冲突**：是否使用了未显式导入的 DOM/Web 构造器名称（如 `Lock`, `Image`, `Element`, `Option`）？
- [ ] **2. 单选按钮 100% 互斥**：检查是否有任何两枚按钮会在同一时刻被判定为 `isSelected === true`？
- [ ] **3. 静态 ID 彻底解耦**：检查所有 `active.id?.includes(...)`，是否已全部替换为运行时 `active.type` 或 `config.variant`？
- [ ] **4. 套餐档位数完整性**：切换到横向三列时，`tiers` 数组长度是否强制确保为 3 项？
- [ ] **5. 全局 CSS 隔离保护**：全局样式中是否有 `input { min-height: 37px }` 误伤 `checkbox` 或 `radio`？
- [ ] **6. 角色切换脏数据清空**：切换角色时，旧组件的私有字段是否已显式 `delete`？
- [ ] **7. 双向联动毫秒级同步**：右侧修改任意文案或开关，中间 iPhone 画布是否立刻无缝响应？
- [ ] **8. 沉浸顶栏自适应避让**：关闭按钮切换到右上角时，吉祥物是否安全避让至左侧？

---

## 5. 反模式警示库 (Anti-Patterns vs Best Practices)

### ❌ 反模式 1：静态 ID 劫持动态类型
```javascript
// ❌ 错误示范：模版四的 ID 是 trial-t1-timeline，导致即便类型改成了对比表格，也永远判定为时间轴！
const isTimeline = active.id?.includes("timeline");
```
```javascript
// ✅ 正确做法：只看当前运行时的实际类型
const currentRole = active.type === "Comparison Table" ? "Comparison Table"
  : active.type === "Dynamic Metrics" ? "Dynamic Metrics"
  : "Trial Timeline";
```

### ❌ 反模式 2：按钮激活条件“或”逻辑叠加导致同时多选
```javascript
// ❌ 错误示范：父分类叫“对比与时间轴”，raw.includes("对比") 恒为 true，多个条件同时为真！
const isSelected = subRole === role.label || active.type === role.id || active.config?.variant === role.variant;
```
```javascript
// ✅ 正确做法：严格单值匹配，从数学上杜绝多选
const isSelected = currentRole === role.id;
```

### ❌ 反模式 3：硬编码造成档位空缺
```javascript
// ❌ 错误示范：以为只要 tiers 存在就不初始化，导致原本存有 2 项的模版在 3 列排版中缺了一列！
if (targetVariant === "3-column-tiers" && !nextConfig.tiers) { ... }
```
```javascript
// ✅ 正确做法：强制校验档位数量契约
if (targetVariant === "3-column-tiers" && (!nextConfig.tiers || nextConfig.tiers.length !== 3)) {
  nextConfig.tiers = DEFAULT_3_TIERS;
}
```

---

## 6. 配套工具与脚本 (Tooling & Scripts)

- **校验脚本**：`node .agents/skills/paywall-visual-builder/scripts/validate_schema.js`
- **一键部署**：`bash .agents/skills/paywall-visual-builder/scripts/deploy_gh_pages.sh`
- **标准 Schema 示例**：查阅 `.agents/skills/paywall-visual-builder/examples/standard_nodes.json`
