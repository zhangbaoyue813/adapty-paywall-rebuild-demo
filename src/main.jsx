import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Archive,
  ArrowLeft,
  BarChart3,
  Bell,
  Blocks,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  Copy,
  Database,
  Download,
  Eye,
  Pencil,
  GripVertical,
  Image as ImageIcon,
  LayoutTemplate,
  MoreVertical,
  Plus,
  RotateCw,
  Search,
  Smartphone,
  Sparkles,
  Upload,
  WandSparkles,
  X,
  Clock,
  Tag,
  Layers,
  Globe,
  Zap,
  Sliders,
  Sparkle,
  Trash2,
  Crown,
  Gift,
  Users,
  Flame,
  ArrowRight,
  Settings,
  Lock,
  Type,
  CreditCard,
  MousePointer,
} from "lucide-react";
import "./styles.css";
import "./paywall-components.css";
import BackendArchitectureDocs from "./views/BackendArchitectureDocs";
import PrivilegeSwitchManager, { ALL_HELLOTALK_PRIVILEGES } from "./components/PrivilegeSwitchManager";
import BenefitChecklistManager from "./components/BenefitChecklistManager";
import CoreBenefitsManager, { HELLOTALK_OFFICIAL_PRIVILEGES } from "./components/CoreBenefitsManager";
import { DEFAULT_ENTRY_CONFIG } from "./components/EntryPriceConfigManager";
import ComparisonTableManager, { DEFAULT_FREE_VS_VIP_ITEMS, DEFAULT_VIP_VS_PLUS_ITEMS } from "./components/ComparisonTableManager";
import HelloTalkMascot from "./components/HelloTalkMascot";
import ContentPaywallManager from "./components/ContentPaywallManager";
import TrialTimelineManager from "./components/TrialTimelineManager";
import OnboardingMultiSlidesManager from "./components/OnboardingMultiSlidesManager";
import {
  ContentCrownMascot,
  ContentBinocularsMascot,
  ContentTranslateCoinMascot,
} from "./components/ContentPaywallMascots";

const originalPaywalls = [
  // HelloTalk CMS「VIP 样式管理」核心 Paywall 商业化矩阵
  { id: "ht-content-paywall", name: "内容Paywall样式 (CONTENT_PAYWALL)", state: "Live", products: 1, startedAt: "20 Sep 2026", templateId: "ht-content-paywall", scene: "内容弹窗/访客/失效挽留" },
  { id: "ht-vip-package", name: "会员套餐与蓝色特权页 (VIP_PACKAGE · BLUE_PRIVILEGE)", state: "Live", products: 3, startedAt: "01 Jan 2026", templateId: "ht-vip-package", scene: "会员套餐与蓝色特权主售卖" },
  { id: "ht-entry-aggregation", name: "入门价格页 (ENTRY_PRICE)", state: "Live", products: 2, startedAt: "22 Jun 2026", templateId: "ht-entry-aggregation", scene: "新手特惠 (双模板+倒计时)" },
  { id: "ht-onboarding", name: "注册引导与免费试用页 (FREE_TRIAL)", state: "Live", products: 2, startedAt: "12 Apr 2026", templateId: "ht-onboarding", scene: "0元试用与新客引导" },
  { id: "ht-retain", name: "支付未完成页 (PAYMENT_UNFINISHED)", state: "Live", products: 2, startedAt: "10 May 2026", templateId: "ht-retain", scene: "支付流失挽留" },
  { id: "ht-vip-pop", name: "SKU半窗 (SKU_POPUP)", state: "Live", products: 3, startedAt: "14 Jun 2026", templateId: "ht-vip-pop", scene: "额度拦截半屏" },
  { id: "ht-send-gift", name: "赠送礼物页 (SEND_GIFT)", state: "Live", products: 2, startedAt: "18 Nov 2025", templateId: "ht-black-friday", scene: "商业化礼物赠送" },
  { id: "ht-switch-compare", name: "VIP分级页面-默认VIP (VIP_LEVEL)", state: "Live", products: 2, startedAt: "25 May 2026", templateId: "ht-switch-compare", scene: "VIP进阶方案" },
  { id: "ht-tier-compare", name: "VIP分级页面-默认VIPPlus (VIP_PLUS_LEVEL)", state: "Draft", products: 2, startedAt: "01 Jun 2026", templateId: "ht-tier-compare", scene: "VIP+黑金旗舰" },
  // 高频特权阻断与营销卡片
  { id: "ht-guest-card", name: "谁看过我访客特权拦截 (GUEST_CARD)", state: "Live", products: 2, startedAt: "20 Mar 2026", templateId: "ht-guest-card", scene: "访客足迹拦截" },
  { id: "ht-nearby-city", name: "寻找语伴定位漫游拦截 (NEARBY & CITY CARD)", state: "Live", products: 2, startedAt: "15 Feb 2026", templateId: "ht-nearby-city", scene: "定位漫游拦截" },
  { id: "ht-multi-languages", name: "多语种同时学习特权卡 (TEACH_MULTIPLE_LANGUAGES)", state: "Live", products: 2, startedAt: "08 Mar 2026", templateId: "ht-multi-languages", scene: "多语言学习门槛" },
];

const nav = [
  ["Paywalls", Smartphone, "list"],
  ["内容Paywall样式", Layers, "content-paywall"],
  ["CMS 架构摸底", Database, "backend"],
];

const missingItems = [
  {
    id: "M-01",
    feature: "Live 发布与回退",
    known: "Live 的 General 页在有改动时显示 Save & publish；从 Live Duplicate、命名、Save 后会出现 Paywall publishing confirmation，Accept 后副本以 Live 状态打开。Draft 的 Save 不出现发布确认，点击后仍为 Draft；Draft 额外有 Test on Device。",
    unknown: "Draft 直接升 Live、审核、版本快照、Rollback 与 Inactivate 逻辑未实测。",
  },
  {
    id: "M-02",
    feature: "AI 生成提交",
    known: "已见 Chats / Examples、提示词、8 个风格标签与示例入口。提交实际提示词后，当前账号返回：无法检测 App Store 应用，需在 iOS SDK settings 填写 Apple App ID。",
    unknown: "填写有效 Apple App ID 后的生成结果、耗时、额度、覆盖与编辑规则未实测。",
  },
  {
    id: "M-03",
    feature: "模板应用与 Change template",
    known: "选择模板后 Open in Builder 可用，已实际进入 Builder；首次保存会提示 Custom Fonts，并要求 Links 中的 Terms of Service / Privacy Policy URL。",
    unknown: "模板覆盖范围、撤销、与既有节点的合并规则未实测。",
  },
  {
    id: "M-04",
    feature: "Copy a Design 最终复制",
    known: "入口打开 Search 与 Copy Selected Paywall（未选择时禁用）；说明为仅复制视觉 Builder 配置。当前账号没有可选择的其他应用设计候选。",
    unknown: "有来源候选时的最终复制、资产、字体、组件与错误恢复规则未实测。",
  },
  {
    id: "M-05",
    feature: "SDK 与真实交易",
    known: "产品首笔交易后被锁定；Test on Device 会提供二维码与 mobile-app.adapty.io/paywall-preview 链接。",
    unknown: "设备测试、购买、恢复、权益、事件归因与非零报表未实测。",
  },
  {
    id: "G-01",
    feature: "应用切换",
    known: "顶部存在当前应用切换入口。",
    unknown: "应用目录、权限范围、切换后的数据刷新和异常处理未实测。",
  },
  {
    id: "B-01",
    feature: "Builder 属性保存",
    known: "已见 Layout settings、Links 的 Content 字段/开关、Hero Image、Card、Timer、Products 的 Content / Style / Layout 面板、设备预览与语言列表。十个 Add element 入口均已逐项点击。",
    unknown: "字段校验、多语言覆盖、Discard / Undo 以及未逐项记录的 Card 布局字段未实测。",
  },
  {
    id: "MT-01",
    feature: "Metrics 数据结果与导出",
    known: "已见日期、粒度、State、Product、Audience 与 install date 控件，以及零数据卡片和明细表。",
    unknown: "真实指标口径、归因、筛选结果、非零数据与下载导出未实测。",
  },
];

const templates = [
  // HelloTalk CMS「VIP 样式管理」10 大核心与拓展商业化模版
  {
    id: "ht-vip-package",
    title: "会员套餐与蓝色特权页 (VIP_PACKAGE · BLUE_PRIVILEGE)",
    subtitle: "整合 HelloTalk 经典蓝色特权轮播与 3 档会员套餐主售卖",
    tags: ["3 products", "16项特权轮播", "双开关管理", "日单价折算"],
    productCount: 3,
    media: "image",
    category: "HelloTalk 官方 (VIP样式管理)",
    theme: "violet",
    visual: "vipplus",
  },
  {
    id: "ht-onboarding",
    title: "注册引导与免费试用页 (FREE_TRIAL)",
    subtitle: "模版四-单张样式新版 / 模版五-多张轮播图新版 · 3天会员免费试用 · 官方后台 1:1 对标",
    tags: ["模版四-单张样式", "模版五-多张轮播图", "3天VIP免费试用", "挽留弹窗"],
    productCount: 2,
    media: "image",
    category: "HelloTalk 官方",
    theme: "violet",
    visual: "onboarding",
  },
  {
    id: "ht-guest-card",
    title: "谁看过我访客特权拦截 (GUEST_CARD)",
    subtitle: "Visitor blur avatar wall & visitor history unlock",
    tags: ["2 products", "Badges", "Dual buttons"],
    productCount: 2,
    media: "image",
    category: "HelloTalk 官方",
    theme: "night",
    visual: "guest",
  },
  {
    id: "ht-nearby-city",
    title: "寻找语伴定位漫游拦截 (NEARBY & CITY CARD)",
    subtitle: "Distance radar & instant global city teleport",
    tags: ["2 products", "Badges", "Map Radar"],
    productCount: 2,
    media: "image",
    category: "HelloTalk 官方",
    theme: "ocean",
    visual: "nearby",
  },
  {
    id: "ht-multi-languages",
    title: "多语种同时学习特权卡 (TEACH_MULTIPLE_LANGUAGES)",
    subtitle: "Learn English, Japanese, Korean simultaneously",
    tags: ["2 products", "Badges", "Language chips"],
    productCount: 2,
    media: "image",
    category: "HelloTalk 官方",
    theme: "lavender",
    visual: "languages",
  },
  {
    id: "ht-black-friday",
    title: "黑五限时 5 折狂欢大促 (YEAR_PRICE_TEMPLATE1)",
    subtitle: "50% discount with ticking countdown timer",
    tags: ["2 products", "Timer", "Badges"],
    productCount: 2,
    media: "none",
    category: "HelloTalk 官方",
    theme: "sale",
    visual: "black-friday",
  },
  {
    id: "ht-retain",
    title: "VIP 到期专属流失挽留 (PrivilegeRetainStyle)",
    subtitle: "Jinja dynamic interpolation with ¥50 coupon",
    tags: ["2 products", "Badges", "Jinja Variables"],
    productCount: 2,
    media: "image",
    category: "HelloTalk 官方",
    theme: "peach",
    visual: "retain",
  },
  {
    id: "ht-switch-compare",
    title: "VIP / VIP+ 双档位切换模版 (SwitchComparisonStyle)",
    subtitle: "Top tab switcher between VIP & VIP+ plans",
    tags: ["2 products", "Switch Tabs", "VIP+ Perks"],
    productCount: 2,
    media: "image",
    category: "HelloTalk 官方",
    theme: "violet",
    visual: "switch",
  },
  {
    id: "ht-tier-compare",
    title: "VIP / VIP+ 双阶特权对比矩阵 (PrivilegeComparisonStyle)",
    subtitle: "3-column matrix comparing Free, VIP and VIP+",
    tags: ["2 products", "Comparison Table"],
    productCount: 2,
    media: "none",
    category: "HelloTalk 官方",
    theme: "white",
    visual: "compare",
  },
  {
    id: "ht-vip-pop",
    title: "SKU半窗 (SKU_POPUP)",
    subtitle: "In-app quota bottom sheet with 3-tier selector",
    tags: ["3 products", "Bottom Sheet", "Fast IAP"],
    productCount: 3,
    media: "image",
    category: "HelloTalk 官方",
    theme: "white",
    visual: "bottom-sheet",
  },
  {
    id: "ht-entry-aggregation",
    title: "入门价格页 (ENTRY_PRICE)",
    subtitle: "官方双模板 (粉白折扣版 / 暖橙礼包版) · 24h倒计时 · 5维色值系统",
    tags: ["双模板切换", "24h倒计时", "5维色值系统", "最多3项特权"],
    productCount: 2,
    media: "image",
    category: "HelloTalk 官方 (VIP样式管理)",
    theme: "lime",
    visual: "entry",
  },
  {
    id: "ht-vip-plus-aggregation",
    title: "旗舰 VIP+ 全语种进阶模版 (VIP_PLUS_AGGREGATION)",
    subtitle: "AI tutor, 1-on-1 coaching & black gold skin",
    tags: ["2 products", "VIP+ Perks", "Lifetime Plan"],
    productCount: 2,
    media: "image",
    category: "HelloTalk 官方",
    theme: "night",
    visual: "vipplus",
  },
  {
    id: "ht-content-paywall",
    title: "内容Paywall样式 (CONTENT_PAYWALL)",
    subtitle: "官方三套内容弹窗 (VIP失效/非VIP访客/非订阅状态) · 动态变量插值",
    tags: ["3套样式类型", "动态变量矩阵", "1:1官方对标"],
    productCount: 1,
    media: "image",
    category: "HelloTalk 官方 (VIP样式管理)",
    theme: "violet",
    visual: "content-paywall",
  },
  // Adapty 国际化模版库
  { id: "knowledge", title: "Unlock the World of Knowledge", subtitle: "Premium learning library", tags: ["1 product", "Trial timeline", "Reviews"], productCount: 1, media: "image", category: "Popular", theme: "lavender", visual: "knowledge" },
  { id: "trial", title: "What to expect during your free trial", subtitle: "Day-by-day trial guide", tags: ["1 product", "Trial timeline"], productCount: 1, media: "image", category: "Popular", theme: "violet", visual: "trial" },
  { id: "family", title: "Unlock fluency for the whole family", subtitle: "Speak Easy with Family Plan", tags: ["1 product", "Image"], productCount: 1, media: "image", category: "Popular", theme: "night", visual: "family" },
];

const sourceTreeObserved = new Set([
  "ht-content-paywall",
  "ht-vip-package",
  "ht-onboarding",
  "ht-guest-card",
  "ht-nearby-city",
  "ht-multi-languages",
  "ht-black-friday",
  "ht-retain",
  "ht-switch-compare",
  "ht-tier-compare",
  "ht-vip-pop",
  "ht-entry-aggregation",
  "ht-vip-plus-aggregation",
  "ht-carousel-style",
  "knowledge",
  "trial",
  "family",
]);

export const SIMULATED_USERS = [
  {
    id: "user-linfan",
    name: "林凡",
    avatar: "👤",
    targetLang: "英语",
    nativeLang: "中文",
    nearbyCount: 24,
    visitorsCount: 36,
    todayTranslations: 15,
    vipExpireDays: 3,
    vipExpireDate: "2026-05-18",
    discount: "8折",
    saveAmount: "¥100",
    vipMax: "无限制",
    description: "英语进阶学员 · 深圳",
  },
  {
    id: "user-sakura",
    name: "Sakura",
    avatar: "🌸",
    targetLang: "日语",
    nativeLang: "中文",
    nearbyCount: 42,
    visitorsCount: 58,
    todayTranslations: 28,
    vipExpireDays: 0,
    vipExpireDate: "已过期",
    discount: "7折",
    saveAmount: "¥138",
    vipMax: "无限制",
    description: "日语N1备考 · 上海",
  },
  {
    id: "user-carlos",
    name: "Carlos",
    avatar: "🌎",
    targetLang: "西班牙语",
    nativeLang: "中文",
    nearbyCount: 18,
    visitorsCount: 19,
    todayTranslations: 8,
    vipExpireDays: 7,
    vipExpireDate: "2026-06-01",
    discount: "85折",
    saveAmount: "¥88",
    vipMax: "无限制",
    description: "西语新手 · 北京",
  },
];

const componentTypeLabelsZh = {
  "Header": "标题",
  "Subhead": "副标题",
  "Badge Tag": "徽标标签",
  "Benefit List": "核心特权",
  "Comparison Table": "对比表格",
  "Switch Tabs": "切换标签",
  "Carousel Cards": "特权轮播",
  "Products": "产品套餐",
  "横向套餐卡片": "横向套餐卡片",
  "纵向套餐列表": "纵向套餐列表",
  "产品双套餐": "产品双套餐",
  "特惠价格": "特惠价格",
  "Timer": "倒计时",
  "Toggle": "开关选项",
  "Purchase Button": "购买按钮",
  "Dismiss Button": "关闭按钮",
  "Legal Footer": "免责声明",
  "Hero Image": "背景图",
  "Language Chips": "语言标签",
  "User Profile": "用户画像",
  "Dynamic Metrics": "动态指标",
  "Mascot Illustration": "吉祥物插画",
  "Text": "文本",
  // Common aliases
  "purchase": "购买按钮",
  "dismiss": "关闭按钮",
  "headline": "标题",
  "subhead": "副标题",
  "badge": "徽标标签",
  "products": "产品套餐",
  "benefits": "核心特权",
  "timer": "倒计时",
  "toggle": "开关选项",
  "links": "免责声明",
  "hero-image": "背景图",
  "hero": "背景图",
  "user-profile": "用户画像",
  "metrics": "动态指标",
  "mascot": "吉祥物插画",
};

const zhToTypeMap = {
  "标题": "Header",
  "主标题": "Header",
  "副标题": "Subhead",
  "徽标标签": "Badge Tag",
  "背景图": "Hero Image",
  "顶部大图": "Hero Image",
  "顶部头图": "Hero Image",
  "顶部头图与吉祥物": "Hero Image",
  "顶部头图与两行标题": "Hero Image",
  "核心特权": "Benefit List",
  "核心特权卡片": "Benefit List",
  "对比表格": "Comparison Table",
  "切换标签": "Switch Tabs",
  "特权轮播": "Carousel Cards",
  "轮播卡片": "Carousel Cards",
  "3张轮播卡片": "Carousel Cards",
  "多张轮播图": "Carousel Cards",
  "试用多张轮播": "Carousel Cards",
  "3天试用时间轴": "Toggle",
  "试用时间轴": "Toggle",
  "产品套餐": "Products",
  "文本与排版": "Header",
  "操作按钮": "Purchase Button",
  "对比与时间轴": "Comparison Table",
  "产品双套餐": "Products",
  "横向套餐卡片": "Products",
  "纵向套餐列表": "Products",
  "横向三档套餐": "Products",
  "3档会员套餐": "Products",
  "特惠价格": "Products",
  "倒计时": "Timer",
  "开关选项": "Toggle",
  "购买按钮": "Purchase Button",
  "主购买按钮": "Purchase Button",
  "主购买": "Purchase Button",
  "关闭按钮": "Dismiss Button",
  "免责声明": "Legal Footer",
  "法律免责": "Legal Footer",
  "语言标签": "Language Chips",
  "用户画像": "User Profile",
  "动态指标": "Dynamic Metrics",
  "动态指标矩阵": "Dynamic Metrics",
  "吉祥物插画": "Mascot Illustration",
  "文本": "Text",
};

const typeToZhMap = componentTypeLabelsZh;

const cleanLabel = (text = "") => {
  if (!text) return "";
  let cleaned = text.replace(/\s*[\(（][^\)）]*[\)）]/g, "").trim();
  if (cleaned.includes("时间轴")) return "3天试用时间轴";
  if (cleaned.includes("多张轮播")) return "多张轮播图";
  if (cleaned.includes("法律免责") || cleaned.includes("免责声明")) return "免责声明";
  if (cleaned.includes("顶部大图") || cleaned.includes("头图") || cleaned.includes("背景图")) return "背景图";
  if (cleaned.includes("购买按钮") || cleaned === "主购买按钮" || cleaned === "主购买") return "购买按钮";
  if (cleaned.includes("倒计时") || cleaned.toLowerCase().includes("timer")) return "倒计时";
  if (componentTypeLabelsZh[cleaned]) return componentTypeLabelsZh[cleaned];
  for (const [en, zh] of Object.entries(componentTypeLabelsZh)) {
    if (cleaned.toLowerCase() === en.toLowerCase()) return zh;
  }
  return cleaned || text;
};

const getNodeCategory = (node) => {
  if (!node) return "";
  const type = node.type || "";
  const raw = node.label || type || "";

  // 1. 文本与排版 (优先判定文本类组件，避免包含“特权”的标题或徽标误判为特权)
  if (
    type === "Header" ||
    type === "Subhead" ||
    type === "Text" ||
    type === "Badge Tag" ||
    type === "User Profile" ||
    type === "Language Chips" ||
    type === "Legal Footer" ||
    type === "Links" ||
    raw.includes("标题") ||
    raw.includes("正文") ||
    raw.includes("用户画像") ||
    raw.includes("语言标签") ||
    raw.includes("徽标") ||
    raw.includes("免责")
  ) {
    return "文本与排版";
  }

  // 2. 核心特权
  if (
    type === "Benefit List" ||
    type === "Carousel Cards" ||
    raw.includes("特权") ||
    raw.includes("权益") ||
    raw.includes("轮播") ||
    node.config?.variant === "onboarding-3slides" ||
    node.id === "trial-t2-carousel"
  ) {
    return "核心特权";
  }

  // 3. 产品套餐
  if (
    type === "Products" ||
    raw.includes("套餐") ||
    raw.includes("价格") ||
    node.config?.tiers ||
    node.config?.listTiers ||
    node.config?.variant === "entry-price-tier" ||
    node.config?.variant === "onboarding-dual-tiers" ||
    node.config?.variant === "3-column-tiers" ||
    node.config?.variant === "vertical-list-tiers"
  ) {
    return "产品套餐";
  }

  // 4. 背景图
  if (
    type === "Hero Image" ||
    type === "Mascot Illustration" ||
    raw.includes("背景图") ||
    raw.includes("头图") ||
    raw.includes("插画") ||
    raw.includes("吉祥物") ||
    node.id?.includes("hero") ||
    node.id?.includes("mascot")
  ) {
    return "背景图";
  }

  // 5. 操作按钮
  if (
    type === "Purchase Button" ||
    type === "Dismiss Button" ||
    type === "Switch Tabs" ||
    (type === "Toggle" && !node.config?.variant?.includes("timeline") && !raw.includes("时间轴")) ||
    raw.includes("按钮") ||
    raw.includes("开关") ||
    node.id?.includes("purchase") ||
    node.id?.includes("dismiss") ||
    node.id?.includes("toggle") ||
    node.id?.includes("close")
  ) {
    return "操作按钮";
  }

  // 6. 倒计时
  if (
    type === "Timer" ||
    raw.includes("倒计时") ||
    node.id?.includes("timer")
  ) {
    return "倒计时";
  }

  // 7. 对比与时间轴
  if (
    type === "Comparison Table" ||
    type === "Dynamic Metrics" ||
    raw.includes("对比") ||
    raw.includes("时间轴") ||
    raw.includes("指标") ||
    node.config?.variant === "trial-timeline" ||
    node.config?.variant === "comparison-table" ||
    node.id?.includes("timeline") ||
    node.id?.includes("metrics")
  ) {
    return "对比与时间轴";
  }

  // 默认归入文本与排版
  return "文本与排版";
};

const getNodeSubRole = (node) => {
  if (!node) return "";
  const type = node.type || "";
  const raw = node.label || "";

  // 核心特权
  if (node.config?.variant === "onboarding-3slides" || node.id === "trial-t2-carousel" || raw.includes("多张轮播") || raw.includes("3页")) return "3页引导轮播";
  if (node.config?.styleVariant === "carousel" || node.config?.variant === "carousel" || type === "Carousel Cards") return "卡片轮播";
  if (node.config?.styleVariant === "checklist" || node.config?.variant === "entry-checks") return "打勾清单";
  if (node.config?.styleVariant === "grid" || node.config?.variant === "grid-matrix") return "双列网格";
  if (node.config?.styleVariant === "cards" || node.config?.variant === "onboarding-privilege-card") return "圆角大卡";
  if (type === "Benefit List" || raw.includes("特权") || raw.includes("权益")) return "特权清单";

  // 产品套餐
  if (node.config?.variant === "3-column-tiers") return "横向三列";
  if (node.config?.variant === "onboarding-dual-tiers") return "双套餐";
  if (node.config?.variant === "vertical-list-tiers" || node.config?.listTiers) return "纵向列表";
  if (node.config?.variant === "entry-price-tier" || raw.includes("特惠价格")) return "特惠价格";
  if (type === "Products" || raw.includes("套餐")) return "套餐卡片";

  // 背景图
  if (type === "Mascot Illustration" || raw.includes("吉祥物") || raw.includes("插画")) return "吉祥物插画";
  if (node.config?.bgMode === "image") return "自定义图片";
  if (node.config?.bgMode === "gradient") return "渐变底色";
  if (type === "Hero Image" || raw.includes("背景图") || raw.includes("头图")) return "原生插画";

  // 操作按钮
  if (type === "Purchase Button" || raw.includes("购买")) return "购买按钮";
  if (type === "Dismiss Button" || raw.includes("关闭")) return "关闭按钮";
  if (type === "Switch Tabs" || raw.includes("切换标签")) return "切换标签";
  if (type === "Toggle" || raw.includes("开关")) return "开关选项";

  // 倒计时
  if (type === "Timer" || raw.includes("倒计时")) {
    if (node.config?.variant === "badge-pill") return "胶囊提示条";
    if (node.config?.variant === "clean-text") return "极简纯文本";
    return "色块数字框";
  }

  // 对比与时间轴
  if (type === "Dynamic Metrics" || raw.includes("指标") || node.id?.includes("metrics")) return "动态指标";
  if (node.config?.variant === "trial-timeline" || (type === "Toggle" && node.id?.includes("timeline")) || raw.includes("试用时间轴") || (raw.includes("时间轴") && !raw.startsWith("对比与时间轴"))) return "3天试用时间轴";
  if (type === "Comparison Table" || raw.includes("对比表格") || raw.includes("对比矩阵") || (raw.includes("对比") && !raw.startsWith("对比与时间轴"))) return "对比表格";

  // 文本与排版
  if (type === "Subhead" || raw.includes("副标题")) return "副标题";
  if (type === "Header" || raw.includes("主标题") || (raw.includes("标题") && !raw.includes("副标题"))) return "主标题";
  if (type === "Badge Tag" || raw.includes("徽标")) return "徽标标签";
  if (type === "User Profile" || raw.includes("用户画像")) return "用户画像";
  if (type === "Language Chips" || raw.includes("语言标签")) return "语言标签";
  if (type === "Legal Footer" || raw.includes("免责声明") || raw.includes("免责说明") || type === "Links") return "免责声明";
  if (type === "Text" || raw.includes("正文") || raw.includes("文本")) return "正文段落";

  return cleanLabel(raw);
};

const getNodeLabel = (node) => {
  if (!node) return "";
  const cat = getNodeCategory(node);
  const sub = getNodeSubRole(node);
  if (sub && sub !== cat) {
    return `${cat} (${sub})`;
  }
  return cat;
};

const componentCatalog = [
  "核心特权",
  "产品套餐",
  "文本与排版",
  "背景图",
  "操作按钮",
  "倒计时",
  "对比与时间轴",
];

function nodeParentId(nodes, index) {
  const depth = nodes[index]?.depth ?? 0;
  if (depth === 0) return null;
  for (let cursor = index - 1; cursor >= 0; cursor--) {
    if ((nodes[cursor].depth ?? 0) === depth - 1) return nodes[cursor].id;
  }
  return null;
}

function nodeSubtreeEnd(nodes, start) {
  const depth = nodes[start]?.depth ?? 0;
  let end = start + 1;
  while (end < nodes.length && (nodes[end].depth ?? 0) > depth) end += 1;
  return end;
}

function canMoveBuilderNode(nodes, sourceId, targetId) {
  const sourceIndex = nodes.findIndex((node) => node.id === sourceId);
  const targetIndex = nodes.findIndex((node) => node.id === targetId);
  if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return false;
  if (targetIndex >= sourceIndex && targetIndex < nodeSubtreeEnd(nodes, sourceIndex)) return false;
  return nodeParentId(nodes, sourceIndex) === nodeParentId(nodes, targetIndex);
}

function moveBuilderNode(nodes, sourceId, targetId, position) {
  if (!canMoveBuilderNode(nodes, sourceId, targetId)) return nodes;
  const sourceIndex = nodes.findIndex((node) => node.id === sourceId);
  const sourceEnd = nodeSubtreeEnd(nodes, sourceIndex);
  const moving = nodes.slice(sourceIndex, sourceEnd);
  const remaining = [...nodes.slice(0, sourceIndex), ...nodes.slice(sourceEnd)];
  const targetIndex = remaining.findIndex((node) => node.id === targetId);
  const insertAt = position === "before" ? targetIndex : nodeSubtreeEnd(remaining, targetIndex);
  return [...remaining.slice(0, insertAt), ...moving, ...remaining.slice(insertAt)];
}

function createBuilderNodes(templateId = "ht-onboarding") {
  const template = templates.find((item) => item.id === templateId) ?? templates[0];
  const node = (id, type, content, depth = 0, config = {}) => {
    let nodeLabel = config.label;
    if (!nodeLabel || nodeLabel === "purchase" || nodeLabel.toLowerCase() === type.toLowerCase()) {
      nodeLabel = componentTypeLabelsZh[type] || type;
    } else {
      nodeLabel = cleanLabel(nodeLabel);
    }
    return {
      id,
      type,
      content,
      depth,
      config,
      label: nodeLabel,
    };
  };
  const hero = () => node("hero-image", "Hero Image", template.theme === "violet" ? "learning" : template.id, 0);

  // -1. 内容Paywall模版 (VIP样式管理 - 内容Paywall样式)
  if (template.id === "ht-content-paywall") {
    return [
      node("cp-close", "Dismiss Button", "✕", 0, { variant: "close-icon", position: "top-left", label: "操作按钮 (关闭按钮)" }),
      node("cp-user", "User Profile", "Yeah|🇩🇪", 0, { userName: "Yeah", userFlag: "🇩🇪", label: "文本与排版 (用户画像)" }),
      node("cp-metrics", "Dynamic Metrics", "972、762、487、673、837、899、116、156、939、446、650、442", 0, {
        styleType: "VIP失效样式",
        metricValues: [972, 762, 487, 673, 837, 899, 116, 156, 939, 446, 650, 442],
        visitorCount: 21,
        label: "对比与时间轴 (动态指标)",
      }),
      node("cp-subhead", "Subhead", "你的进步有目共睹！", 0, { variant: "body", label: "文本与排版 (副标题)" }),
      node("cp-headline", "Header", "VIP现已过期\n立即续订，别让沟通速度慢下来！", 0, {
        variant: "content-headline",
        highlightWord: "立即续订",
        highlightColor: "#6C3EDE",
        label: "文本与排版 (主标题)",
      }),
      node("cp-mascot", "Mascot Illustration", "crown-gift", 0, { mascotType: "crown-gift", label: "背景图 (吉祥物插画)" }),
      node("cp-purchase", "Purchase Button", "立即续订", 0, { label: "操作按钮 (购买按钮)", color: "#6C3EDE" }),
    ];
  }

  // 0. 会员套餐与蓝色特权页 (VIP_PACKAGE · BLUE_PRIVILEGE) - 深度整合
  if (template.id === "ht-vip-package" || template.id === "ht-carousel-style") {
    return [
      hero(),
      node("badge", "Badge Tag", "VIP 特权中心", 0, { color: "#6366F1", variant: "pill" }),
      node("headline", "Header", "成为 HelloTalk VIP · 解锁核心特权", 0, { variant: "headline" }),
      node("subhead", "Subhead", "左右滑动探索 16 大母语学习特权与专属功能", 0, { variant: "body" }),
      node("carousel-cards", "Carousel Cards", "📍 搜索附近的人|与附近的人畅聊更多语言\n🌐 搜索全世界的语伴|一键瞬移至全球 150+ 城市母语圈\n👀 解锁谁看了我|查看完整访客足迹，开启隐身访问\n🤖 无限翻译&字幕|实时母语级纠错，告别中式表达\n⚡ 匹配不同母语语伴|优先匹配多母语语伴\n🎧 无损原声发音下载|离线随时随地跟读练习，纯正发音纠偏", 0, { privileges: ALL_HELLOTALK_PRIVILEGES }),
      node("products", "Products", "12 个月|¥368|¥30.67/月|节省56%\n3 个月|¥208|¥67.33/月|季卡灵活\n终身 VIP|¥798|终身尊享|一次付费", 0, { variant: "rich-tiers" }),
      node("purchase", "Purchase Button", "开启 VIP 特权 · 继续", 0, { label: "purchase", subtitle: "加入全球 5000 万语言学习者的行列" }),
      node("dismiss", "Dismiss Button", "暂时不用，谢谢", 0, { color: "#94a3b8" }),
      node("links", "Legal Footer", "服务条款 · 隐私政策 · 恢复购买", 0),
    ];
  }

  // 1. 新客引导 0 元试用
  if (template.id === "ht-onboarding") {
    return [
      hero(),
      node("badge", "Badge Tag", "7天免费体验", 0, { color: "#1ECA92", variant: "pill" }),
      node("headline", "Header", "免费开启 HelloTalk VIP 特权", 0, { variant: "headline" }),
      node("subhead", "Subhead", "零门槛体验全球语伴畅聊与 AI 实时纠错", 0, { variant: "body" }),
      node("benefits", "Benefit List", "每日无限制即时翻译与纠错\nAI 语法助手实时母语级润色\n全球漫游找语伴与高级筛选\n听原声发音与专属头像标识", 0),
      node("trial-toggle", "Toggle", "免费试用 7 天|试用期结束前可随时取消，不收取费用", 0, { defaultState: "On" }),
      node("products", "Products", "年费 VIP (赠7天试用)|¥0 免费试用|7天后扣款 ¥198/年 (¥0.54/天)|超值推荐\n连续包月 VIP|¥28/月|折合 ¥0.93/天|灵活月付", 0, { variant: "rich-tiers" }),
      node("purchase", "Purchase Button", "立即免费开启 7 天试用", 0, { label: "purchase", subtitle: "到期后 ¥198/年，试用期间可随时取消" }),
      node("links", "Legal Footer", "服务条款 · 隐私政策 · 恢复购买", 0),
    ];
  }

  // 2. 谁看过我访客拦截
  if (template.id === "ht-guest-card") {
    return [
      hero(),
      node("badge", "Badge Tag", "谁看过我专享特权", 0, { color: "#FAAD14", variant: "pill" }),
      node("headline", "Header", "谁刚刚访问了你的主页？", 0, { variant: "headline" }),
      node("subhead", "Subhead", "已有 38 位母语语伴查看了你的个人档案", 0, { variant: "body" }),
      node("benefits", "Benefit List", "解锁全部 38 位来访者完整个人资料\n解除访客头像高斯模糊与真实在线状态\n优先推荐向来访语伴打招呼与已读回执", 0),
      node("products", "Products", "访客特惠包月|¥18/月|仅 ¥0.60/天|首月特惠\n畅享季卡 VIP|¥45/季|¥0.50/天|人气推荐", 0, { variant: "rich-tiers" }),
      node("purchase", "Purchase Button", "立即解锁访客记录", 0, { label: "purchase", subtitle: "查看全部对你感兴趣的跨国母语者" }),
      node("links", "Legal Footer", "服务条款 · 隐私政策 · 恢复购买", 0),
    ];
  }

  // 3. 定位漫游与同城找语伴
  if (template.id === "ht-nearby-city") {
    return [
      hero(),
      node("badge", "Badge Tag", "城市漫游特权", 0, { color: "#13C2C2", variant: "pill" }),
      node("headline", "Header", "定位漫游 · 结识全球本地语伴", 0, { variant: "headline" }),
      node("subhead", "Subhead", "突破地理距离限制，一键瞬移至东京、巴黎、纽约", 0, { variant: "body" }),
      node("benefits", "Benefit List", "任意切换目标城市，精准结识本地母语者\n同城语伴精准推荐，沟通回复率提升 300%\n优先匹配当前在线的高活跃度跨国语伴", 0),
      node("products", "Products", "漫游包年 VIP|¥198/年|低至 ¥0.54/天|最推荐\n漫游单月尝鲜|¥30/月|¥1.00/天|体验包", 0, { variant: "rich-tiers" }),
      node("purchase", "Purchase Button", "立即解锁全球漫游", 0, { label: "purchase", subtitle: "开启全球文化交流无界探索" }),
      node("links", "Legal Footer", "服务条款 · 隐私政策 · 恢复购买", 0),
    ];
  }

  // 4. 多语种同时学习特权卡
  if (template.id === "ht-multi-languages") {
    return [
      hero(),
      node("badge", "Badge Tag", "多语种畅学特权", 0, { color: "#722ED1", variant: "pill" }),
      node("headline", "Header", "同时学习多门外语", 0, { variant: "headline" }),
      node("subhead", "Subhead", "解除单语种限制，轻松掌握多国语言交流", 0, { variant: "body" }),
      node("lang-chips", "Language Chips", "🇺🇸 英语|🇯🇵 日语|🇰🇷 韩语|🇪🇸 西语|🇫🇷 法语", 0),
      node("benefits", "Benefit List", "同时开启 3 门外语专属动态与语伴信息流\n各语种独立词库与原声跟读进度自动云同步\n享受多语言专业导师 1 对 1 专属答疑通道", 0),
      node("products", "Products", "多语种全能年卡|¥268/年|¥0.73/天|全语种畅学\n双语种进阶年卡|¥218/年|¥0.59/天|精通两门", 0, { variant: "rich-tiers" }),
      node("purchase", "Purchase Button", "立即解锁多语种学习", 0, { label: "purchase", subtitle: "随时随地自由切换母语交流环境" }),
      node("links", "Legal Footer", "服务条款 · 隐私政策 · 恢复购买", 0),
    ];
  }

  // 5. 黑五限时 5 折狂欢
  if (template.id === "ht-black-friday") {
    return [
      hero(),
      node("timer", "Timer", "04:59:59", 0, { label: "倒计时", timerLabel: "黑五限时活动倒计时", variant: "card", hours: 24 }),
      node("badge", "Badge Tag", "黑五年度 5 折大促", 0, { color: "#FF4D4F", variant: "pill" }),
      node("headline", "Header", "HelloTalk 黑五狂欢 · 限时 5 折", 0, { variant: "headline" }),
      node("subhead", "Subhead", "全年仅此一次最低折扣，外语学习特权全部解锁", 0, { variant: "body" }),
      node("benefits", "Benefit List", "无限制翻译与 AI 语法智能纠错\n全球任意国家和城市无缝漫游\n专属黑五金色 VIP 身份勋章与头像框\n尊享客服通道与优先语伴匹配", 0),
      node("products", "Products", "终身 VIP 会员|¥398 (原价 ¥796)|仅需一次付费，终身享用|立省 ¥398\n年度 VIP 会员|¥128/年|仅 ¥0.35/天|5折特惠", 0, { variant: "rich-tiers" }),
      node("purchase", "Purchase Button", "立即以 5 折锁定特权", 0, { label: "purchase", subtitle: "倒计时结束即恢复原价" }),
      node("links", "Legal Footer", "服务条款 · 隐私政策 · 恢复购买", 0),
    ];
  }

  // 6. VIP 到期专属流失挽留
  if (template.id === "ht-retain") {
    return [
      hero(),
      node("badge", "Badge Tag", "老用户专属挽留", 0, { color: "#FF7A45", variant: "pill" }),
      node("headline", "Header", "{{ nick_name }}，别错过你的特权！", 0, { variant: "headline" }),
      node("subhead", "Subhead", "你的 VIP 会员特权将在 {{ vip_expired_days }} 天后失效", 0, { variant: "body" }),
      node("benefits", "Benefit List", "保留你的 12 位常聊专属语伴置顶\n保留离线词库与原声发音下载特权\n赠送老用户专享续费立减 ¥50 礼券", 0),
      node("products", "Products", "专属续费年卡|¥148/年 (券后价)|立减 ¥50 |专享保留\n专属续费月卡|¥25/月|折合 ¥0.83/天|月度过渡", 0, { variant: "rich-tiers" }),
      node("purchase", "Purchase Button", "领取 ¥50 礼券并特惠续订", 0, { label: "purchase", subtitle: "已自动抵扣 ¥50 专属优惠券" }),
      node("links", "Legal Footer", "服务条款 · 隐私政策 · 恢复购买", 0),
    ];
  }

  // 7. VIP分级页面-默认VIP (Figure 1 官方规范拆解)
  if (template.id === "ht-switch-compare") {
    return [
      node("switch-tabs", "Switch Tabs", "VIP|VIP+", 0, {
        label: "切换标签",
        activeTab: 0,
      }),
      node("headline", "Header", "HelloTalk VIP", 0, {
        label: "标题",
        variant: "brand-hero",
        bullets: [
          "无限翻译",
          "查看谁喜欢了你",
          "搜索全世界的语伴",
        ],
      }),
      node("compare-table", "Comparison Table", "", 0, {
        label: "对比表格",
        compareMode: "free-vs-vip",
        featureColTitle: "特权功能",
        col1Title: "普通会员",
        col2Title: "VIP会员",
        items: DEFAULT_FREE_VS_VIP_ITEMS,
        showExpandCaret: true,
      }),
      node("timer", "Timer", "20% OFF 14:43:23", 0, {
        label: "倒计时",
        variant: "pill-capsule",
        discount: "20% OFF",
        time: "14:43:23",
      }),
      node("products", "Products", "1个月|¥78|¥78/月\n12个月|¥488|¥40.6/月|最受欢迎\n终身|¥998|原价 ¥1698", 0, {
        label: "横向套餐卡片",
        variant: "3-column-tiers",
        tiers: [
          { name: "1个月", monthly: "¥78", total: "¥78/月", isRecommended: false },
          { name: "12个月", monthly: "¥488", total: "¥40.6/月", badge: "最受欢迎", isRecommended: true },
          { name: "终身", monthly: "¥998", total: "原价 ¥1698", isRecommended: false },
        ],
      }),
      node("purchase", "Purchase Button", "升级 VIP", 0, {
        label: "购买按钮",
        variant: "pill-gradient",
      }),
      node("links", "Legal Footer", "如果当前缴费期限24小时没有取消续订，系统会自动续订，费用将从你的iTunes账户收取，你可随时前往iTunes商店的设置界面管理自己的订阅设定。有关详细信息，请访问我们的服务条款及隐私政策", 0, {
        label: "免责声明",
      }),
    ];
  }

  // 8. VIP分级页面-默认VIPPlus (Figure 4 官方规范拆解)
  if (template.id === "ht-tier-compare") {
    return [
      node("switch-tabs", "Switch Tabs", "VIP|VIP+", 0, {
        label: "切换标签",
        activeTab: 1,
      }),
      node("headline", "Header", "HelloTalk VIP PLUS +", 0, {
        label: "标题",
        variant: "brand-hero",
        bullets: [
          "无限翻译",
          "查看谁喜欢了你",
          "结识全球母语者",
        ],
      }),
      node("compare-table", "Comparison Table", "", 0, {
        label: "对比表格",
        compareMode: "vip-vs-plus",
        featureColTitle: "特权功能",
        col1Title: "VIP会员",
        col2Title: "VIP+会员",
        items: DEFAULT_VIP_VS_PLUS_ITEMS,
        showExpandCaret: true,
      }),
      node("timer", "Timer", "20% OFF 14:43:23", 0, {
        label: "倒计时",
        variant: "pill-capsule",
        discount: "20% OFF",
        time: "14:43:23",
      }),
      node("products", "Products", "1个月|¥78|¥78/月\n12个月|¥488|¥40.6/月|最受欢迎\n终身|¥998|原价 ¥1698", 0, {
        label: "横向套餐卡片",
        variant: "3-column-tiers",
        tiers: [
          { name: "1个月", monthly: "¥78", total: "¥78/月", isRecommended: false },
          { name: "12个月", monthly: "¥488", total: "¥40.6/月", badge: "最受欢迎", isRecommended: true },
          { name: "终身", monthly: "¥998", total: "原价 ¥1698", isRecommended: false },
        ],
      }),
      node("purchase", "Purchase Button", "升级 VIP+", 0, {
        label: "购买按钮",
        variant: "pill-gradient",
      }),
      node("links", "Legal Footer", "如果当前缴费期限24小时没有取消续订，系统会自动续订，费用将从你的iTunes账户收取，你可随时前往iTunes商店的设置界面管理自己的订阅设定。有关详细信息，请访问我们的服务条款及隐私政策", 0, {
        label: "免责声明",
      }),
    ];
  }


  // 9. SKU半窗 (SKU_POPUP) - 官方真实半窗规范，组件化自由组装
  if (template.id === "ht-vip-pop") {
    return [
      node("close", "Dismiss Button", "✕", 0, { variant: "circle-close", position: "top-right", label: "关闭按钮" }),
      node("headline", "Header", "标题标题标题标题", 0, { variant: "pop-headline", align: "left", label: "标题" }),
      node("subhead", "Subhead", "副标题副标题副标题副标题副标题", 0, { align: "left", color: "#000000", label: "副标题" }),
      node("hero", "Hero Image", "媒体展示位", 0, { variant: "media-placeholder", label: "背景图" }),
      node("products", "Products", "1 个月|¥78|¥78/ 月\n12 个月|¥388 (原价 ¥488)|节省 59%|🔥 8折\n终身|¥798 (原价 ¥1698)|永久会员权益|🔥 4.8折", 0, {
        variant: "3-column-tiers",
        label: "横向套餐卡片",
        tiers: [
          { name: "1 个月", monthly: "¥78", total: "¥78/ 月", badge: "", save: "", isRecommended: false },
          { name: "12 个月", monthly: "¥388", originalPrice: "¥488", total: "¥388", badge: "🔥 8折", save: "节省 59%", isRecommended: true },
          { name: "终身", monthly: "¥798", originalPrice: "¥1698", total: "¥798", badge: "🔥 4.8折", save: "永久会员权益", isRecommended: false },
        ],
      }),
      node("purchase", "Purchase Button", "领取 8折优惠", 0, { label: "购买按钮", color: "#7C5CFC" }),
      node("links", "Legal Footer", "如果当前缴费期前 24 小时没有取消续订，系统会自动续订，费用将从你的 iTunes 账户收取，你可随时前往 iTunes 商店的设置界面管理自己的订阅设定。有关详细信息，请访问我们的[服务条款]及[隐私政策]", 0, { label: "免责声明" }),
    ];
  }

  // 10. 入门价格页 (ENTRY_PRICE) - 官方双模板规范，组件化自由组装
  if (template.id === "ht-entry-aggregation") {
    return [
      node("close", "Dismiss Button", "✕", 0, { variant: "close-icon", position: "top-left", label: "关闭按钮" }),
      node("headline", "Header", "首年额外 20% 优惠！", 0, { variant: "headline", kicker: "HelloTalk VIP 👑", label: "主标题" }),
      node("subhead", "Subhead", "仅限今日", 0, { variant: "body", color: "#DE6876", label: "副标题" }),
      node("products", "Products", "原价 ¥488/年\n折扣价 ¥388/年", 0, {
        variant: "entry-price-tier",
        displayMode: "clean-text",
        priceOriginal: "原价 ¥488/年",
        priceNow: "折扣价 ¥388/年",
        label: "特惠价格",
      }),
      node("benefits", "Benefit List", "搜索附近的人\n解锁谁看了我\n无限翻译&字幕", 0, {
        maxCount: 3,
        styleVariant: "entry-checks",
        selectedBenefits: ["搜索附近的人", "解锁谁看了我", "无限翻译&字幕"],
        label: "核心特权",
      }),
      node("timer", "Timer", "优惠截止时间 20:08:08", 0, {
        label: "优惠截止时间",
        hours: 20,
        minutes: 8,
        seconds: 8,
        variant: "clean-text",
      }),
      node("purchase", "Purchase Button", "继续", 0, { label: "购买按钮", color: "#C85B6B" }),
      node("links", "Legal Footer", "可随时取消\n如果当前缴费期前24小时没有取消续订，系统会自动续订，费用将从你的 iTunes 账户收取，你可随时前往 iTunes 商店的设置界面管理自己的订阅设定。有关详细信息，请访问我们的[服务条款]及[隐私政策]", 0, { variant: "entry-legal", label: "免责声明" }),
    ];
  }

  // 11. 旗舰 VIP+ 全语种高阶模版
  if (template.id === "ht-vip-plus-aggregation") {
    return [
      hero(),
      node("badge", "Badge Tag", "VIP+ 旗舰特权", 0, { color: "#F59E0B", variant: "pill" }),
      node("headline", "Header", "HelloTalk VIP+ 旗舰会员", 0, { variant: "headline" }),
      node("subhead", "Subhead", "面向深度语言学者与国际职场人士的全语种高端定制特权", 0, { variant: "body" }),
      node("benefits", "Benefit List", "AI 母语导师 24 小时随身口语对话陪练\n无限次全球任意城市漫游与母语者精准结对\n每周独家外教直播微课与学习打卡督导\n专属黑金 VIP+ 徽章与优先客服通道", 0),
      node("products", "Products", "VIP+ 旗舰终身会员|¥898 (限时)|一次付费，终身尊享|尊享首选\nVIP+ 旗舰包年|¥298/年|¥0.81/天|含全套外教微课", 0, { variant: "rich-tiers" }),
      node("purchase", "Purchase Button", "开通 VIP+ 旗舰特权", 0, { label: "购买按钮", subtitle: "支持全平台多设备数据实时无缝同步" }),
      node("links", "Legal Footer", "服务条款 · 隐私政策 · 恢复购买", 0),
    ];
  }

  // 默认兜底模版
  return [
    hero(),
    node("headline", "Header", template.title, 0, { variant: "headline" }),
    node("subhead", "Subhead", template.subtitle, 0, { variant: "body" }),
    node("benefits", "Benefit List", "核心学习特权|无限制解锁使用\n专属客服支持|1小时内极速响应\n跨设备同步|iPhone、iPad与网页端无缝同步", 0),
    node("products", "Products", "年度会员|¥198/年|¥0.54/天|立省50%\n连续包月|¥28/月|按月扣费", 0),
    node("purchase", "Purchase Button", "立即继续", 0, { label: "购买按钮" }),
    node("links", "Legal Footer", "服务条款 · 隐私政策 · 恢复购买", 0),
  ];
}

function createComponentNode(rawType, index) {
  const type = zhToTypeMap[rawType] || rawType;
  let label = typeToZhMap[type] || rawType;
  let config = {};
  let content = "";

  if (rawType === "核心特权" || rawType === "特权轮播") {
    label = "核心特权";
    config = {
      variant: "carousel",
      styleVariant: "carousel",
      privilegeMode: "carousel",
      items: [
        { id: "p-1", title: "无限翻译", desc: "随聊随翻，提高你的词汇量", icon: "文A" },
        { id: "p-2", title: "多语言学习", desc: "150种语言随时添加和切换", icon: "🌐" },
        { id: "p-3", title: "动态曝光加速", desc: "让更多母语者看到你的动态", icon: "⚡" },
      ],
    };
    content = "无限翻译|随聊随翻，提高你的词汇量\n多语言学习|150种语言随时添加和切换\n动态曝光加速|让更多母语者看到你的动态";
  } else if (rawType === "文本与排版") {
    label = "文本与排版";
    config = {
      textRole: "headline",
      color: "#1e293b",
    };
    content = "HelloTalk VIP 会员专享";
  } else if (rawType === "操作按钮") {
    label = "操作按钮";
    config = {
      label: "购买按钮",
      subtitle: "订阅可随时取消，无需支付任何费用",
      color: "#6144e8",
    };
    content = "立即升级 VIP";
  } else if (rawType === "对比与时间轴") {
    label = "对比与时间轴";
    config = {
      variant: "comparison-table",
      compareMode: "free-vs-vip",
      featureColTitle: "特权功能",
      col1Title: "普通会员",
      col2Title: "VIP会员",
    };
    content = "特权对比|普通VIP|VIP+旗舰\n每日翻译|50次/天|无限制\n全球漫游|2个城市|无限制";
  } else if (rawType === "产品双套餐") {
    label = "产品双套餐";
    config = {
      variant: "onboarding-dual-tiers",
      selectedTier: 0,
      tiers: [
        { name: "12个月", monthly: "¥40.67/月", total: "总价 ¥488", discount: "48%OFF", badge: "免费试用", hasTrial: true },
        { name: "月费会员", monthly: "¥78.00/月", total: "按月扣费", discount: "", badge: "直接购买", hasTrial: false },
      ],
    };
    content = "12个月|¥40.67/月|总价 ¥488|48%OFF|免费试用\n月费会员|¥78.00/月|按月扣费||直接购买";
  } else if (rawType === "特惠价格") {
    label = "特惠价格";
    config = {
      variant: "entry-price-tier",
      displayMode: "clean-text",
      priceOriginal: "原价 ¥488/年",
      priceNow: "折扣价 ¥388/年",
    };
    content = "原价 ¥488/年\n折扣价 ¥388/年";
  } else if (rawType === "横向套餐卡片" || rawType === "横向三档套餐") {
    label = "横向套餐卡片";
    config = {
      variant: "3-column-tiers",
      selectedTier: 1,
      tiers: [
        { name: "3个月", monthly: "¥37.33/月", total: "总价 ¥112", period: "3个月", badge: "", save: "" },
        { name: "12个月", monthly: "¥24.99/月", total: "总价 ¥298", period: "12个月", badge: "推荐", save: "省54%", isRecommended: true },
        { name: "终身", monthly: "¥798", total: "一次性购买", period: "终身", badge: "", save: "永久有效" },
      ],
    };
    content = "3个月|¥37.33/月|¥112\n12个月|¥24.99/月|¥298|省54%|推荐\n终身|¥798|一次性购买";
  } else if (rawType === "纵向套餐列表" || rawType === "产品套餐" || type === "Products") {
    label = rawType === "产品套餐" ? "产品套餐" : "纵向套餐列表";
    config = {
      variant: "vertical-list-tiers",
      listTiers: [
        { name: "连续包年 VIP", price: "¥198/年", daily: "¥0.54/天", tag: "推荐", isDefault: true },
        { name: "连续包月 VIP", price: "¥28/月", daily: "¥0.93/天", tag: "月付", isDefault: false },
      ],
    };
    content = "连续包年 VIP|¥198/年|¥0.54/天|推荐\n连续包月 VIP|¥28/月|¥0.93/天|月付";
  } else if (rawType === "3天试用时间轴" || rawType === "试用时间轴") {
    label = "3天试用时间轴";
    config = {
      variant: "trial-timeline",
      steps: [
        { day: "今天", title: "开始试用", icon: "crown" },
        { day: "第2天", title: "即将结束通知", icon: "bell" },
        { day: "第3天", title: "试用结束", icon: "clock" },
      ],
    };
    content = "今天|开始试用\n第2天|即将结束通知\n第3天|试用结束";
  } else if (rawType === "多张轮播图" || rawType === "试用多张轮播") {
    label = "多张轮播图";
    config = {
      variant: "onboarding-3slides",
      slide1Title: "免费体验HelloTalk会员",
      slide1Items: [
        { title: "翻译", desc: "随聊随翻，提高你的词汇量", icon: "文A" },
        { title: "多语言", desc: "150种语言随时添加和切换", icon: "globe" },
        { title: "更多曝光", desc: "专属身份特权，让更多人看到你", icon: "zap" },
        { title: "无广告", desc: "更沉浸专心的学语言！", icon: "ad" },
      ],
      slide2Title: "到期前提醒",
      slide2Timeline: [
        { day: "Day 1", desc: "成为HelloTalk会员，享受学习与交流的乐趣", icon: "crown" },
        { day: "Day 2", desc: "收到体验即将结束的通知", icon: "bell" },
        { day: "Day 3", desc: "24小时前取消则无需支付任何费用，否则当日扣款", icon: "clock" },
      ],
      slide3Title: "选择试用结束后的套餐",
      slide3Yearly: { name: "12 个月", monthly: "¥40.67/ 月", total: "¥488", discount: "48% OFF", badge: "免费试用" },
      slide3Monthly: { name: "1 个月", monthly: "¥78/ 月" },
      slide3SafetyNote: "可随时在 App Store 取消",
    };
    content = "Slide 1: 免费体验HelloTalk会员\nSlide 2: 到期前提醒\nSlide 3: 选择试用结束后的套餐";
  } else if (rawType === "背景图" || type === "Hero Image") {
    label = "背景图";
    config = {
      bgMode: "illustration",
      sloganText: "寻找身边母语者",
      themeColor: "orange",
      showCloseBtn: true,
      bubbleBg: "#2563eb",
    };
    content = "寻找身边母语者";
  } else {
    const contentByType = {
      Header: "新建标题内容",
      Subhead: "新建副标题说明文案",
      "Badge Tag": "新特权标签",
      "Benefit List": "核心特权一|特权详细说明\n核心特权二|特权详细说明",
      "Comparison Table": "特权对比|普通VIP|VIP+旗舰\n每日翻译|50次/天|无限制\n全球漫游|2个城市|无限制",
      "Switch Tabs": "VIP 进阶版|VIP+ 旗舰版",
      "Carousel Cards": "特权一|特权描述介绍\n特权二|特权描述介绍",
      "Language Chips": "🇺🇸 英语|🇯🇵 日语|🇰🇷 韩语|🇪🇸 西语",
      Timer: "04:59:59",
      Toggle: "免费试用 7 天|随时可取消",
      "Purchase Button": "立即开始试用",
      "Dismiss Button": "暂时不用，谢谢",
      "Legal Footer": "服务条款 · 隐私政策 · 恢复购买",
      "Hero Image": "banner-hero",
      Text: "文本内容",
    };
    content = contentByType[type] ?? "";
  }

  return {
    id: `added-${type.toLowerCase().replace(/[^a-z]+/g, "-")}-${index}`,
    type,
    label,
    depth: 0,
    content,
    config,
  };
}

function getVerticalListTiers(node) {
  if (node?.config?.listTiers && node.config.listTiers.length > 0) {
    return node.config.listTiers;
  }
  const lines = (node?.content || "").split("\n").filter(Boolean);
  if (lines.length > 0) {
    return lines.map((line, idx) => {
      const [name, price, daily, tag] = line.split("|");
      return {
        name: name || `套餐 ${idx + 1}`,
        price: price || "¥198/年",
        daily: daily || "",
        tag: tag || "",
        isDefault: idx === 0,
      };
    });
  }
  return [
    { name: "连续包年 VIP", price: "¥198/年", daily: "¥0.54/天", tag: "推荐", isDefault: true },
    { name: "连续包月 VIP", price: "¥28/月", daily: "¥0.93/天", tag: "月付", isDefault: false },
  ];
}

function saveVerticalListTiers(node, newTiers, updateNode) {
  const newContent = newTiers.map((t) => `${t.name}|${t.price}|${t.daily || ""}|${t.tag || ""}`).join("\n");
  updateNode(node.id, {
    content: newContent,
    config: {
      ...node.config,
      variant: "vertical-list-tiers",
      listTiers: newTiers,
    },
  });
}

const productOptions = [
  "HelloTalk VIP 年度会员 / Annual",
  "HelloTalk VIP 连续包月 / Monthly",
  "HelloTalk VIP+ 旗舰全语种 / Annual",
];

const observedProductRows = [
  { product: "HelloTalk VIP 年度会员", period: "Annual", offer: "黑五大促 5 折" },
  { product: "HelloTalk VIP 连续包月", period: "Monthly", offer: "首月特惠" },
  { product: "HelloTalk VIP+ 旗舰年卡", period: "Annual", offer: "赠外教微课" },
];

const zhCopy = {
  "Paywalls": "付费墙", "Test": "测试", "Help": "帮助", "App settings": "应用设置", "Account": "账户",
  "Add a new app": "新建应用", "Evidence & gaps": "已验证与缺口",
  "Create paywall": "创建付费墙", "Create as draft": "创建草稿", "General": "基础设置", "Products": "产品套餐",
  "Paywall name": "付费墙名称", "Paywall screenshot": "付费墙截图", "Upload screenshot": "上传截图",
  "Build no-code paywall": "使用无代码构建器", "Choose a template": "选择模板", "Generate Paywall with AI": "使用 AI 生成付费墙",
  "Copy a Design from Your Apps": "从其他应用复制设计", "Builder & Generator": "构建器与生成器", "Choose how to start": "选择创建方式",
  "Metrics": "指标", "View in analytics": "在分析中查看", "Duplicate": "复制", "Test on Device": "在设备上测试", "Archive": "归档",
  "State": "状态", "Started at": "创建时间", "Open Builder": "打开构建器",
  "Discard": "放弃更改", "Save": "保存", "Save & publish": "保存并发布", "Add product": "添加产品",
  "Template": "模板", "Change template": "更换模板", "Layout settings": "布局设置", "Elements": "元素", "Show on device": "在设备上展示",
  "Source visual": "源端画面", "Editable structure": "可编辑结构",
  "On": "开启", "Add element": "添加元素", "Localization": "本地化", "English": "英语", "French": "法语", "Simplified Chinese": "简体中文",
  "Add locale": "添加语言", "Content": "内容", "Style": "样式", "Layout": "布局", "Text": "文本", "Image": "图片", "Card": "卡片",
  "Button": "按钮", "List": "列表", "Links": "链接", "Timer": "倒计时", "Carousel": "轮播图",
  "Toggle": "试用开关", "Header": "标题", "Headline": "主标题", "Subhead": "副标题", "Purchase Button": "购买按钮",
  "Close": "关闭", "Cancel": "取消", "Accept": "确认", "All paywalls": "全部付费墙",
};

const enCopy = Object.fromEntries(Object.entries(zhCopy).map(([english, chinese]) => [chinese, english]));

function localizeInterface(root, locale) {
  if (!root) return;
  const dictionary = locale === "zh-CN" ? zhCopy : enCopy;
  const replace = (value) => {
    const leading = value.match(/^\s*/)?.[0] ?? "";
    const trailing = value.match(/\s*$/)?.[0] ?? "";
    const core = value.slice(leading.length, value.length - trailing.length);
    return dictionary[core] ? leading + dictionary[core] + trailing : value;
  };
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      return parent && !parent.closest("[data-no-translate]") && !["SCRIPT", "STYLE"].includes(parent.tagName) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => { const next = replace(node.nodeValue); if (next !== node.nodeValue) node.nodeValue = next; });
  root.querySelectorAll("[placeholder],[aria-label],[title]").forEach((element) => {
    ["placeholder", "aria-label", "title"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value && dictionary[value]) element.setAttribute(attribute, dictionary[value]);
    });
  });
}

function App() {
  const defaultTemplateIdx = templates.findIndex((t) => t.id === "ht-entry-aggregation");
  const initialIdx = defaultTemplateIdx >= 0 ? defaultTemplateIdx : 0;
  const [view, setView] = useState("builder");
  const [paywalls, setPaywalls] = useState(originalPaywalls);
  const [selectedId, setSelectedId] = useState("ht-entry-aggregation");
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("Live,Draft,Inactive");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [draft, setDraft] = useState({
    name: "入门价格页 (ENTRY_PRICE)",
    products: ["VIP 超值年卡 / Annual", "VIP 连续包月 / Monthly"],
  });
  const [compliance, setCompliance] = useState(false);
  const [rememberCompliance, setRememberCompliance] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(initialIdx);
  const [appliedTemplate, setAppliedTemplate] = useState(initialIdx);
  const [templateLinks, setTemplateLinks] = useState({ terms: "https://hellotalk.com/terms", privacy: "https://hellotalk.com/privacy" });
  const [builderTab, setBuilderTab] = useState("tree");
  const [builderNodes, setBuilderNodes] = useState(() => createBuilderNodes("ht-entry-aggregation"));
  const [activeNode, setActiveNode] = useState("t1-headline");
  const [unknownOpen, setUnknownOpen] = useState(false);
  const [placementFilter, setPlacementFilter] = useState([]);
  const [placementDraft, setPlacementDraft] = useState([]);
  const [placementMenuOpen, setPlacementMenuOpen] = useState(false);
  const [rowMenuId, setRowMenuId] = useState(null);
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const [locale, setLocale] = useState("zh-CN");

  useEffect(() => {
    const root = document.querySelector(".app");
    document.documentElement.lang = locale === "zh-CN" ? "zh-CN" : "en";
    localizeInterface(root, locale);
    const observer = new MutationObserver(() => localizeInterface(root, locale));
    if (root) observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [locale]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const filteredPaywalls = useMemo(() => {
    const allowedStates = stateFilter.split(",");
    return paywalls.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) && allowedStates.includes(item.state));
  }, [paywalls, search, stateFilter]);

  const selected = paywalls.find((item) => item.id === selectedId) ?? paywalls[0];

  const openPaywall = (item) => {
    setSelectedId(item.id);
    const tId = item.templateId || item.id;
    const templateIdx = templates.findIndex((t) => t.id === tId);
    if (templateIdx !== -1) {
      setTemplateSelected(templateIdx);
      setAppliedTemplate(templateIdx);
      setBuilderNodes(createBuilderNodes(tId));
      setActiveNode(
        tId === "ht-onboarding"
          ? "trial-t1-hero"
          : tId === "ht-content-paywall"
          ? "cp-metrics"
          : "headline"
      );
    }
    setView("builder");
  };

  const createDraft = () => {
    if (!compliance) return;
    const id = `ht-custom-${Date.now()}`;
    const created = { id, name: draft.name || "Untitled paywall", state: "Draft", products: draft.products.length, startedAt: "17 Sep 2026", templateId: "ht-onboarding", scene: "自定义" };
    setPaywalls((current) => [...current, created]);
    setSelectedId(id);
    setBuilderNodes(createBuilderNodes("ht-onboarding"));
    setView("builder");
    setModal(null);
    setCompliance(false);
    notify(rememberCompliance ? "草稿创建成功并进入构建器。" : "草稿创建成功。");
  };

  const duplicate = (source = selected) => {
    setDraft((current) => ({ ...current, name: `${source.name} (Copy)`, products: productOptions.slice(0, source.products) }));
    setView("create");
    notify("已创建未保存副本，请在基础设置中确认。");
  };

  const archiveCurrent = () => {
    setPaywalls((current) => current.filter((item) => item.id !== selected.id));
    setView("list");
    notify("付费墙已归档。");
  };

  const markUnknown = (id) => {
    setSelectedId(id);
    setUnknownOpen(true);
  };
  const updateBuilderNode = (id, partial) => {
    setBuilderNodes((current) => current.map((item) => (item.id === id ? { ...item, ...partial } : item)));
  };
  const removeBuilderNode = (id) => {
    setBuilderNodes((current) => {
      const remaining = current.filter((item) => item.id !== id);
      setActiveNode((cur) => (cur === id ? (remaining[0]?.id || "") : cur));
      return remaining;
    });
  };
  const applyTemplate = (templateIndex) => {
    const template = templates[templateIndex];
    setTemplateSelected(templateIndex);
    setAppliedTemplate(templateIndex);
    setBuilderNodes(createBuilderNodes(template.id));
    setActiveNode(
      template.id === "ht-onboarding"
        ? "trial-t1-hero"
        : template.id === "ht-content-paywall"
        ? "cp-metrics"
        : "headline"
    );
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand" style={{ background: "linear-gradient(135deg, #1ECA92 0%, #6366F1 100%)" }}>H</div>
        <nav>
          {nav.map(([label, Icon, targetView]) => (
            <button
              className={`nav-item ${view === targetView || (targetView === "list" && ["list", "create", "general", "builder", "metrics"].includes(view)) ? "active" : ""}`}
              key={label}
              onClick={() => setView(targetView)}
            >
              <Icon size={18} />
              <span>{label}</span>
              {targetView === "list" && <em style={{ background: "#f0fdf4", color: "#15803d" }}>{paywalls.length}</em>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="app-switcher-wrap">
            <button className="app-switcher" onClick={() => setAppMenuOpen((open) => !open)}>
              <b style={{ background: "#1ECA92" }}>HT</b> HelloTalk VIP 商业化中心 <ChevronDown size={15} />
            </button>
            {appMenuOpen && (
              <div className="app-menu">
                <button className="app-menu-current"><b style={{ background: "#1ECA92" }}>HT</b><span>HelloTalk VIP 商业化</span><Check size={15} /></button>
                <button onClick={() => { setAppMenuOpen(false); setModal({ kind: "add-app" }); }}><Plus size={16} /> 新建业务线</button>
              </div>
            )}
          </div>
          <div className="top-actions">
            <div className="language-console" data-no-translate>
              <span>{locale === "zh-CN" ? "界面语言" : "Interface language"}</span>
              <button className={locale === "zh-CN" ? "active" : ""} onClick={() => setLocale("zh-CN")}>中文</button>
              <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>EN</button>
            </div>
            <Bell size={18} color="#71717a" />
            <span style={{ color: "#71717a", cursor: "pointer" }}>配置指南</span>
            <span style={{ color: "#71717a", cursor: "pointer" }}>账号设置</span>
          </div>
        </header>

        <div className="content">
          {view === "backend" && <BackendArchitectureDocs />}
          {view === "content-paywall" && (
            <ContentPaywallManager
              onOpenInBuilder={(tplId) => {
                const targetId = tplId || "ht-content-paywall";
                openPaywall({
                  id: targetId,
                  templateId: targetId,
                  name: "内容Paywall样式 (CONTENT_PAYWALL)",
                });
              }}
              notify={notify}
            />
          )}
          {view === "list" && (
            <PaywallList
              paywalls={filteredPaywalls}
              search={search}
              setSearch={setSearch}
              stateFilter={stateFilter}
              setStateFilter={setStateFilter}
              placementFilter={placementFilter}
              setPlacementFilter={setPlacementFilter}
              placementDraft={placementDraft}
              setPlacementDraft={setPlacementDraft}
              placementMenuOpen={placementMenuOpen}
              setPlacementMenuOpen={setPlacementMenuOpen}
              rowMenuId={rowMenuId}
              setRowMenuId={setRowMenuId}
              openPaywall={openPaywall}
              setView={setView}
              setModal={setModal}
              duplicate={duplicate}
              locale={locale}
            />
          )}
          {view === "create" && (
            <CreatePaywall
              draft={draft}
              setDraft={setDraft}
              setView={setView}
              setModal={setModal}
              createDraft={createDraft}
              markUnknown={markUnknown}
            />
          )}
          {(view === "general" || view === "builder") && (
            <PaywallWorkspace
              selected={selected}
              draft={draft}
              setDraft={setDraft}
              view={view}
              setView={setView}
              duplicate={duplicate}
              setModal={setModal}
              markUnknown={markUnknown}
              builderNodes={builderNodes}
              setBuilderNodes={setBuilderNodes}
              updateBuilderNode={updateBuilderNode}
              removeBuilderNode={removeBuilderNode}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              builderTab={builderTab}
              setBuilderTab={setBuilderTab}
              templateSelected={templateSelected}
              setTemplateSelected={setTemplateSelected}
              appliedTemplate={appliedTemplate}
              templateLinks={templateLinks}
              setTemplateLinks={setTemplateLinks}
              notify={notify}
              applyTemplate={applyTemplate}
            />
          )}
          {view === "metrics" && <Metrics setView={setView} markUnknown={markUnknown} />}
        </div>
      </main>

      <aside className={`evidence-panel ${unknownOpen ? "open" : ""}`}>
        <button className="evidence-head" onClick={() => setUnknownOpen((open) => !open)}>
          <span><CircleHelp size={17} /> 摸底缺口与实测边界</span>
          <ChevronRight size={16} />
        </button>
        {unknownOpen && (
          <div className="evidence-body">
            <p>基于真实后台与 Adapty 逆向证据，未验证行为均已标注。</p>
            {missingItems.map((item) => (
              <button className="gap-card" key={item.id} onClick={() => markUnknown(item)}>
                <small>{item.id}</small>
                <strong>{item.feature}</strong>
                <span>{item.unknown}</span>
              </button>
            ))}
          </div>
        )}
      </aside>

      {toast && <div className="toast"><Check size={17} /> {toast}</div>}
      {modal?.kind === "compliance" && (
        <ComplianceModal
          compliance={compliance}
          setCompliance={setCompliance}
          rememberCompliance={rememberCompliance}
          setRememberCompliance={setRememberCompliance}
          onClose={() => setModal(null)}
          onAccept={createDraft}
        />
      )}
      {modal?.kind === "builder-save" && (
        <ComplianceModal
          compliance={compliance}
          setCompliance={setCompliance}
          rememberCompliance={rememberCompliance}
          setRememberCompliance={setRememberCompliance}
          onClose={() => setModal(null)}
          onAccept={() => { setModal(null); setCompliance(false); notify("构建器改动已成功保存。"); }}
          context="builder"
        />
      )}
      {modal?.kind === "template-requirements" && (
        <TemplateRequirementsModal
          onClose={() => setModal(null)}
          onContinue={(links) => { setTemplateLinks(links); setModal({ kind: "builder-save" }); }}
        />
      )}
      {modal?.kind === "archive" && <ArchiveModal name={selected.name} onClose={() => setModal(null)} onArchive={archiveCurrent} />}
      {modal?.kind === "device-test" && <DeviceTestModal onClose={() => setModal(null)} />}
      {modal?.kind === "templates" && (
        <TemplatesModal
          selected={templateSelected}
          setSelected={setTemplateSelected}
          onClose={() => setModal(null)}
          onOpenAi={() => setModal({ kind: "ai" })}
          onOpenBuilder={(templateIndex) => {
            applyTemplate(templateIndex);
            setModal(null);
            setView("builder");
            notify(`已成功应用模版：${templates[templateIndex].title}`);
          }}
          markUnknown={markUnknown}
        />
      )}
      {modal?.kind === "ai" && <AiModal onClose={() => setModal(null)} markUnknown={markUnknown} />}
      {modal?.kind === "migration" && <MigrationModal onClose={() => setModal(null)} markUnknown={markUnknown} />}
      {modal?.kind === "add-app" && <AddAppModal onClose={() => setModal(null)} markUnknown={markUnknown} />}
      {modal?.kind === "unknown" && <UnknownModal item={modal.item} onClose={() => setModal(null)} />}
    </div>
  );
}

function PaywallList({
  paywalls,
  search,
  setSearch,
  stateFilter,
  setStateFilter,
  placementFilter,
  setPlacementFilter,
  placementDraft,
  setPlacementDraft,
  placementMenuOpen,
  setPlacementMenuOpen,
  rowMenuId,
  setRowMenuId,
  openPaywall,
  setView,
  setModal,
  duplicate,
  locale,
}) {
  const placementName = placementFilter.length ? placementFilter.join(", ") : `全部业务场景 (${paywalls.length})`;
  const paginationText = locale === "zh-CN" ? `第 1 - ${paywalls.length} 项，共 ${paywalls.length} 项` : `1 - ${paywalls.length} of ${paywalls.length}`;
  const togglePlacement = (placement) => setPlacementDraft((current) => current.includes(placement) ? current.filter((item) => item !== placement) : [...current, placement]);
  const applyPlacementFilter = () => {
    setPlacementFilter(placementDraft);
    setPlacementMenuOpen(false);
  };

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>HelloTalk Paywalls <span>↗</span></h1>
          <p>涵盖新客破冰、功能阻断、节日大促、到期挽留与双阶对比等 {paywalls.length} 套全场景模版</p>
        </div>
        <button className="primary" onClick={() => setView("create")}>创建付费墙</button>
      </div>
      <div className="list-controls">
        <label className="search">
          <Search size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索付费墙名称或业务场景..." />
        </label>
        <div className="placement-filter">
          <button className="select" onClick={() => { setPlacementDraft(placementFilter); setPlacementMenuOpen((open) => !open); }}>
            <span>{placementName}</span> <ChevronDown size={16} style={{ flexShrink: 0 }} />
          </button>
          {placementMenuOpen && (
            <div className="placement-menu">
              <label><input type="checkbox" checked={placementDraft.includes("新客引导")} onChange={() => togglePlacement("新客引导")} /> 新客引导</label>
              <label><input type="checkbox" checked={placementDraft.includes("功能阻断")} onChange={() => togglePlacement("功能阻断")} /> 功能阻断</label>
              <label><input type="checkbox" checked={placementDraft.includes("大促运营")} onChange={() => togglePlacement("大促运营")} /> 大促运营</label>
              <label><input type="checkbox" checked={placementDraft.includes("到期挽留")} onChange={() => togglePlacement("到期挽留")} /> 到期挽留</label>
              <label><input type="checkbox" checked={placementDraft.includes("会员中心")} onChange={() => togglePlacement("会员中心")} /> 会员中心</label>
              <div><button className="secondary" onClick={() => setPlacementMenuOpen(false)}>取消</button><button className="primary" onClick={applyPlacementFilter}>应用</button></div>
            </div>
          )}
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th><span>付费墙名称</span> <Sort /></th>
              <th><Help /> 业务触发场景</th>
              <th><Help /> 关联模版架构</th>
              <th><Help /> 产品套餐数</th>
              <th>创建时间 <Sort /></th>
            </tr>
          </thead>
          <tbody>
            {paywalls.map((item) => {
              const match = (item.name || "").match(/^(.*?)\s*\((.*?)\)$/);
              const title = match ? match[1] : item.name;
              const code = match ? match[2] : "";

              return (
                <tr key={item.id} onClick={() => openPaywall(item)} style={{ cursor: "pointer" }}>
                  <td>
                    <div className="paywall-row-title-container">
                      <div className="paywall-device-icon" title="移动端真机付费墙">
                        <Smartphone size={16} />
                      </div>
                      <div className="paywall-name-content">
                        <strong className="paywall-name-primary" title={title}>{title}</strong>
                        {code && (
                          <div className="paywall-name-secondary" title={code}>
                            <span className="paywall-code-pill">{code}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: 11, padding: "3px 8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 4, color: "#334155", fontWeight: 500 }}>
                      {item.scene || "常规"}
                    </span>
                  </td>
                  <td><code style={{ fontSize: 11, color: "#475569" }}>{item.templateId}</code></td>
                  <td>{item.products} 个套餐</td>
                  <td>{item.startedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <span>{paginationText}</span>
        <div><button disabled><ChevronLeft size={18} /></button><button className="current">1</button><button disabled><ChevronRight size={18} /></button></div>
      </div>
    </section>
  );
}

function CreatePaywall({ draft, setDraft, setView, setModal, createDraft, markUnknown }) {
  return (
    <section className="create">
      <button className="back" onClick={() => setView("list")}><ArrowLeft size={18} /> 返回付费墙列表</button>
      <div className="create-header">
        <div><h1>新建付费墙</h1><p>创建草稿并直接进入 iPhone 15 Pro 实时无代码构建器。</p></div>
        <button className="primary" onClick={() => setModal({ kind: "compliance" })}>创建为草稿</button>
      </div>
      <div className="create-grid">
        <div className="form-card">
          <h2>基础信息</h2>
          <Field label="付费墙名称"><input value={draft.name} onChange={(event) => setDraft((state) => ({ ...state, name: event.target.value }))} /></Field>
          <Field label="关联合约套餐">
            {draft.products.map((product, index) => (
              <ProductRow
                key={`${product}-${index}`}
                product={product}
                index={index}
                onProductChange={(nextProduct) => setDraft((state) => ({ ...state, products: state.products.map((current, currentIndex) => currentIndex === index ? nextProduct : current) }))}
                onRemove={() => setDraft((state) => ({ ...state, products: state.products.filter((_, currentIndex) => currentIndex !== index) }))}
                markUnknown={markUnknown}
              />
            ))}
            <button className="secondary" onClick={() => setDraft((state) => ({ ...state, products: [...state.products, productOptions[0]] }))}><Plus size={16} /> 添加产品套餐</button>
          </Field>
          <Field label="原型截图"><button className="upload unknown-action" onClick={() => markUnknown({ id: "U-01", feature: "Screenshot upload", known: "PNG / WEBP / JPG, maximum 10 MB", unknown: "本地暂不模拟文件二进制上传。" })}><Upload size={18} /> 点击上传或拖拽截图文件 <small>支持 PNG、JPG，最大 10 MB</small></button></Field>
        </div>
        <div className="start-card">
          <span className="eyebrow">Builder & Generator</span><h2>选择创建方式</h2>
          <button onClick={() => setView("builder")}><Blocks size={22} /><span><strong>进入可视化构建器</strong><small>3 栏式元素图层与真机预览。</small></span><ChevronRight size={18} /></button>
          <button onClick={() => setModal({ kind: "templates" })}><LayoutTemplate size={22} /><span><strong>从官方模版库选择</strong><small>12 套 HelloTalk 现网全场景模版。</small></span><ChevronRight size={18} /></button>
          <button onClick={() => setModal({ kind: "ai" })}><WandSparkles size={22} /><span><strong>AI 智能生成付费墙</strong><small>根据提示词自动拼装模版。</small></span><ChevronRight size={18} /></button>
          <button onClick={() => setModal({ kind: "migration" })}><Copy size={22} /><span><strong>从其他应用复制设计</strong><small>复用已有视觉 Builder 配置。</small></span><ChevronRight size={18} /></button>
        </div>
      </div>
      <button className="subtle-action" onClick={createDraft}>快捷入口：直接创建并打开构建器</button>
    </section>
  );
}

function MiniTemplateVisual({ tpl }) {
  const isBottomSheet = tpl.displayMode === "bottom-sheet";
  const isModal = tpl.displayMode === "modal";
  const isDark = Boolean(tpl.theme?.isDark || tpl.id === "pkg-tpl-1");
  const primaryColor = tpl.theme?.primaryColor || tpl.theme?.otherColor || (tpl.id === "pkg-tpl-1" ? "#0284C7" : tpl.id === "tpl-1" ? "#FF4D6D" : tpl.id === "trial-tpl-1" ? "#10B981" : "#6366F1");

  return (
    <div
      style={{
        width: 32,
        height: 44,
        borderRadius: 4,
        border: "1.5px solid #cbd5e1",
        background: isDark
          ? "#0f172a"
          : isBottomSheet
          ? "linear-gradient(180deg, #dbeafe 0%, #bfdbfe 36%, #ffffff 37%)"
          : tpl.id === "tpl-1"
          ? "linear-gradient(180deg, #ffe4e6 0%, #ffffff 50%)"
          : tpl.id === "trial-tpl-1"
          ? "linear-gradient(180deg, #ecfdf5 0%, #ffffff 50%)"
          : "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: isBottomSheet ? "flex-end" : "space-between",
        padding: isBottomSheet ? 0 : 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        flexShrink: 0,
      }}
    >
      {isBottomSheet ? (
        <>
          <div style={{ position: "absolute", top: 3, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 2 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", opacity: 0.8 }} />
            <div style={{ width: 12, height: 4, borderRadius: 2, background: "#93c5fd", marginTop: 2 }} />
          </div>
          <div
            style={{
              height: 27,
              background: "#ffffff",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              borderTop: "1px solid #e2e8f0",
              boxShadow: "0 -2px 4px rgba(0,0,0,0.06)",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "70%", height: 3, background: "#f59e0b", borderRadius: 1, margin: "1px auto 0" }} />
            <div style={{ width: "88%", height: 5, background: "#f8fafc", border: "0.5px solid #e2e8f0", borderRadius: 1, margin: "0 auto" }} />
            <div style={{ width: "90%", height: 6, background: primaryColor || "#f59e0b", borderRadius: 2, margin: "0 auto 1px" }} />
          </div>
        </>
      ) : isModal ? (
        <>
          <div style={{ position: "absolute", inset: 0, background: "rgba(15, 23, 42, 0.25)" }} />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: 25,
              height: 31,
              margin: "auto",
              background: "#ffffff",
              borderRadius: 3,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              border: "1px solid #fef3c7",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "75%", height: 3, background: "#f59e0b", borderRadius: 1, margin: "1px auto 0" }} />
            <div style={{ width: "90%", height: 7, background: "#fef9ee", borderRadius: 1, margin: "0 auto" }} />
            <div style={{ width: "90%", height: 5, background: primaryColor || "#f59e0b", borderRadius: 1.5, margin: "0 auto 1px" }} />
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              width: "100%",
              height: 12,
              borderRadius: 2,
              background: isDark ? "#1e293b" : tpl.id === "tpl-1" ? "#ffe4e6" : tpl.id === "trial-tpl-1" ? "#d1fae5" : "#ede9fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 12, height: 2.5, background: isDark ? "#60a5fa" : primaryColor, borderRadius: 1 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1.5, padding: "0 1px" }}>
            <div style={{ width: "100%", height: 4, background: isDark ? "#334155" : "#f1f5f9", borderRadius: 1 }} />
            <div style={{ width: "85%", height: 4, background: isDark ? "#334155" : "#f1f5f9", borderRadius: 1 }} />
          </div>
          <div style={{ width: "100%", height: 6, background: primaryColor, borderRadius: 1.5 }} />
        </>
      )}
    </div>
  );
}

function PaywallWorkspace({ selected, draft, setDraft, view, setView, duplicate, setModal, markUnknown, builderNodes, setBuilderNodes, updateBuilderNode, removeBuilderNode, activeNode, setActiveNode, builderTab, setBuilderTab, appliedTemplate, templateLinks, setTemplateLinks, notify, applyTemplate }) {
  const [addElementOpen, setAddElementOpen] = useState(false);
  const [productPickerOpen, setProductPickerOpen] = useState(false);
  const [transientProducts, setTransientProducts] = useState([]);
  const [dragState, setDragState] = useState(null);
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOverNodeId, setDragOverNodeId] = useState(null);
  const [dragOverPosition, setDragOverPosition] = useState("below");
  const [showRetainModal, setShowRetainModal] = useState(false);
  const [selectedOnboardingTier, setSelectedOnboardingTier] = useState(0);
  const [onboardingCarouselSlide, setOnboardingCarouselSlide] = useState(0);

  // HelloTalk Multi-template Presets Map (Both Entry Price & VIP Package)
  const [templatePresetsMap, setTemplatePresetsMap] = useState(() => ({
    "ht-entry-aggregation": [
      {
        id: "tpl-1",
        name: "模板 1",
        title: "全屏平铺版 (粉白 20% 折扣)",
        displayMode: "fullscreen",
        desc: "全屏页面 · HelloTalk VIP 额外 20% 优惠",
        image: "/templates/template1.jpg",
        theme: {
          ...DEFAULT_ENTRY_CONFIG,
          subTemplate: "tpl-1",
          otherColor: "#DE6876",
          btnColor: "#C85B6B",
          mainFontColor: "#2D1832",
          titleText: "首年额外 20% 优惠！",
          titleKicker: "HelloTalk VIP 👑",
          promoText: "仅限今日",
          priceNow: "折扣价 ¥388/年",
          priceOriginal: "原价 ¥488/年",
          priceSub: "",
          btnText: "继续",
        },
        nodes: [
          { id: "t1-close", type: "Dismiss Button", label: "关闭按钮", content: "✕", depth: 0, enabled: true, config: { variant: "close-icon", position: "top-left" } },
          { id: "t1-headline", type: "Header", label: "主标题", content: "首年额外 20% 优惠！", depth: 0, enabled: true, config: { variant: "headline", kicker: "HelloTalk VIP 👑" } },
          { id: "t1-subhead", type: "Subhead", label: "副标题", content: "仅限今日", depth: 0, enabled: true, config: { variant: "body", color: "#DE6876" } },
          { id: "t1-products", type: "Products", label: "特惠价格", content: "原价 ¥488/年\n折扣价 ¥388/年", depth: 0, enabled: true, config: { variant: "entry-price-tier", displayMode: "clean-text", priceOriginal: "原价 ¥488/年", priceNow: "折扣价 ¥388/年" } },
          { id: "t1-benefits", type: "Benefit List", label: "核心特权", content: "搜索附近的人\n解锁谁看了我\n无限翻译&字幕", depth: 0, enabled: true, config: { maxCount: 3, styleVariant: "entry-checks", selectedBenefits: ["搜索附近的人", "解锁谁看了我", "无限翻译&字幕"] } },
          { id: "t1-timer", type: "Timer", label: "倒计时", content: "优惠截止时间 20:08:08", depth: 0, enabled: true, config: { label: "优惠截止时间", hours: 20, minutes: 8, seconds: 8, variant: "clean-text" } },
          { id: "t1-purchase", type: "Purchase Button", label: "购买按钮", content: "继续", depth: 0, enabled: true, config: { label: "购买按钮", color: "#C85B6B" } },
          { id: "t1-links", type: "Legal Footer", label: "免责声明", content: "可随时取消\n如果当前缴费期前24小时没有取消续订，系统会自动续订，费用将从你的 iTunes 账户收取，你可随时前往 iTunes 商店的设置界面管理自己的订阅设定。有关详细信息，请访问我们的[服务条款]及[隐私政策]", depth: 0, enabled: true, config: { variant: "entry-legal" } },
        ],
      },
      {
        id: "tpl-2",
        name: "模板 2",
        title: "半屏底窗版 (给新用户专属礼包)",
        displayMode: "bottom-sheet",
        desc: "顶部搜附近母语者大图 + 下半屏弹窗卡片",
        image: "/templates/template2.jpg",
        theme: {
          ...DEFAULT_ENTRY_CONFIG,
          subTemplate: "tpl-2",
          otherColor: "#F59E0B",
          titleText: "给新用户的专属礼包",
          flexibleText: "限时新客专属优惠，解锁全部翻译与口语特权",
          promoText: "优惠倒计时 23:59:59",
          priceNow: "特惠价 ¥128/年",
          priceOriginal: "原价 ¥248/年",
          priceSub: "仅 ¥0.35/天 · 新客立省 20% · 随时取消",
          btnText: "立即继续",
        },
        nodes: [
          { id: "t2-hero", type: "Hero Image", label: "背景图", content: "寻找身边母语者", depth: 0, enabled: true, config: { bgMode: "illustration", sloganText: "寻找身边母语者", themeColor: "orange", showCloseBtn: true, bubbleBg: "#2563eb" } },
          { id: "t2-headline", type: "Header", label: "主标题", content: "给新用户的专属礼包", depth: 0, enabled: true, config: { variant: "headline" } },
          { id: "t2-products", type: "Products", label: "特惠价格", content: "HelloTalk VIP 新客专属礼包|特惠价 ¥128/年|原价 ¥248/年|限时优惠", depth: 0, enabled: true, config: { variant: "entry-price-tier", promoBadge: "限时优惠", discountTag: "-20% 折扣", priceNow: "特惠价 ¥128/年", priceOriginal: "原价 ¥248/年", priceSub: "仅 ¥0.35/天 · 新客立省 20% · 随时取消" } },
          { id: "t2-purchase", type: "Purchase Button", label: "购买按钮", content: "立即继续", depth: 0, enabled: true, config: { label: "购买按钮", color: "#F59E0B" } },
          { id: "t2-links", type: "Legal Footer", label: "免责声明", content: "服务条款 · 隐私政策 · 恢复购买", depth: 0, enabled: true },
          { id: "t2-benefits", type: "Benefit List", label: "核心特权", content: "搜索附近的人\n解锁谁看了我\n无限翻译&字幕", depth: 0, enabled: false, config: { maxCount: 3, styleVariant: "entry-checks", selectedBenefits: ["搜索附近的人", "解锁谁看了我", "无限翻译&字幕"] } },
        ],
      },
    ],
    "ht-vip-package": [
      {
        id: "pkg-tpl-1",
        name: "模板 1",
        title: "全屏版 (蓝色特权轮播)",
        displayMode: "fullscreen",
        desc: "经典全屏特权页 · 底部按钮总价",
        image: "/templates/vip_pkg_tpl1.png",
        theme: {
          primaryColor: "#0284C7",
          btnColor: "#0284C7",
          btnTextColor: "#FFFFFF",
          subTemplate: "pkg-tpl-1",
          otherColor: "#0284C7",
          titleText: "成为 HelloTalk VIP",
          btnText: "立即开通",
          bgGradient: "linear-gradient(180deg, #0F172A 0%, #1E293B 40%, #0F172A 100%)",
          isDark: true,
        },
        nodes: [
          { id: "pkg-t1-banner", type: "Header", label: "顶部横幅", content: "成为 HelloTalk VIP", depth: 0, enabled: true, config: { variant: "vip-banner", badge: "VIP 特权", subtitle: "畅享 16 项高阶语言学习特权" } },
          { id: "pkg-t1-carousel", type: "Carousel Cards", label: "特权轮播", content: "📍 搜索附近的人|与附近的人畅聊更多语言\n🌐 搜索全世界的语伴|一键瞬移至全球 150+ 城市母语圈\n👀 解锁谁看了我|查看完整访客记录，开启无痕访问\n🤖 无限翻译&字幕|实时母语级纠错，告别中式表达\n⚡ 匹配不同母语语伴|优先匹配目标语种正统母语者\n🎧 无损原声发音下载|离线随时随地跟读练习", depth: 0, enabled: true, config: { privileges: ALL_HELLOTALK_PRIVILEGES, autoScroll: true } },
          { id: "pkg-t1-products", type: "Products", label: "横向套餐卡片", content: "3个月|¥37.33/月|¥112\n12个月|¥24.99/月|¥298|省54%|推荐\n终身|¥798|一次性购买", depth: 0, enabled: true, config: { variant: "3-column-tiers", selectedTier: 1, tiers: [
            { name: "3个月", monthly: "¥37.33/月", total: "总价 ¥112", period: "3个月", badge: "", save: "" },
            { name: "12个月", monthly: "¥24.99/月", total: "总价 ¥298", period: "12个月", badge: "推荐", save: "省54%", isRecommended: true },
            { name: "终身", monthly: "¥798", total: "一次性购买", period: "终身", badge: "", save: "永久有效" },
          ] } },
          { id: "pkg-t1-purchase", type: "Purchase Button", label: "购买按钮", content: "立即开通", depth: 0, enabled: true, config: { label: "purchase", color: "#0284C7" } },
          { id: "pkg-t1-links", type: "Legal Footer", label: "免责声明", content: "随时到期，谢谢 · 自动续费说明 · 恢复购买", depth: 0, enabled: true },
        ],
      },
      {
        id: "pkg-tpl-2",
        name: "模板 2",
        title: "弹窗版 (新客轻量浮层)",
        displayMode: "modal",
        desc: "居中/半屏弹窗 · 右上角关闭按钮 · 暖橙特惠",
        image: "/templates/vip_pkg_tpl2.png",
        theme: {
          primaryColor: "#F59E0B",
          btnColor: "#F59E0B",
          btnTextColor: "#FFFFFF",
          subTemplate: "pkg-tpl-2",
          otherColor: "#F59E0B",
          titleText: "拥有 7 项专属特权",
          btnText: "免费试用",
          bgGradient: "linear-gradient(180deg, #FFFDF7 0%, #FEF9EE 40%, #FFFFFF 100%)",
          isDark: false,
        },
        nodes: [
          { id: "pkg-t2-header", type: "Header", label: "顶部特权卡", content: "拥有 7 项专属特权", depth: 0, enabled: true, config: { variant: "vip-badge-header", badge: "7 项特权已解锁", subtitle: "开启全球无障碍母语交流" } },
          { id: "pkg-t2-products", type: "Products", label: "横向套餐卡片", content: "1个月|¥28|¥28\n12个月|¥10.83/月|¥128|省60%|热门推荐\n终身|¥518|一次性购买", depth: 0, enabled: true, config: { variant: "3-column-tiers", selectedTier: 1, tiers: [
            { name: "1个月", monthly: "¥28/月", total: "总价 ¥28", period: "1个月", badge: "", save: "" },
            { name: "12个月", monthly: "¥10.83/月", total: "总价 ¥128", period: "12个月", badge: "热门推荐", save: "省60%", isRecommended: true },
            { name: "终身", monthly: "¥518", total: "一次性购买", period: "终身", badge: "", save: "特惠买断" },
          ] } },
          { id: "pkg-t2-timer", type: "Timer", label: "倒计时", content: "特惠倒计时", depth: 0, enabled: true, config: { hours: 24, label: "特惠倒计时" } },
          { id: "pkg-t2-purchase", type: "Purchase Button", label: "购买按钮", content: "免费试用", depth: 0, enabled: true, config: { label: "purchase", color: "#F59E0B" } },
          { id: "pkg-t2-links", type: "Legal Footer", label: "免责声明", content: "随时取消 · 自动续订说明 · 恢复购买", depth: 0, enabled: true },
          { id: "pkg-t2-benefits", type: "Benefit List", label: "核心特权", content: "解锁谁看了我|查看访客足迹与无痕浏览\n无广告纯净学习|移除全站商业推荐\n搜索全世界的语伴|一键瞬移至全球母语圈\n搜索附近的人|结识身边母语伙伴\n无限翻译与语法纠错|AI 实时助你地道表达\n优先匹配母语语伴|官方流量优先推荐\n离线语音原声下载|随时随地纯正跟读", depth: 0, enabled: false, config: { maxCount: 7, styleVariant: "checklist" } },
        ],
      },
    ],
    "ht-onboarding": [
      {
        id: "trial-tpl-1",
        name: "模版四",
        title: "单张样式新版",
        displayMode: "fullscreen",
        desc: "3天会员免费试用 · 阶段时间轴 · 核心特权与双套餐切换",
        theme: {
          primaryColor: "#6144E8",
          btnColor: "#6144E8",
          btnTextColor: "#FFFFFF",
          subTemplate: "trial-tpl-1",
          otherColor: "#6144E8",
          titleText: "3天会员免费试用",
          btnText: "开启3天 VIP免费试用",
          btnTextAlt: "继续",
          showDismissBtn: false,
          dismissBtnText: "不，谢谢",
          retainModal: {
            title: "提示",
            prompt: "你确定要放弃免费试用 VIP 的机会吗？关闭后无法再打开此页面。",
            primaryBtn: "不，我不放弃",
            cancelBtn: "是，暂时不用",
          },
          bgGradient: "linear-gradient(180deg, #6144E8 0%, #5B3FE6 100%)",
          isDark: false,
        },
        nodes: [
          { id: "trial-t1-hero", type: "Hero Image", label: "背景图", content: "3天会员免费试用", depth: 0, enabled: true, config: { variant: "onboarding-wave-hero", mascot: true, closeBtn: true } },
          { id: "trial-t1-timeline", type: "Toggle", label: "3天试用时间轴", content: "今天|开始试用\n第2天|即将结束通知\n第3天|试用结束", depth: 0, enabled: true, config: { variant: "trial-timeline" } },
          { id: "trial-t1-privileges", type: "Benefit List", label: "核心特权", content: "翻译|随聊随翻，提高你的词汇量|刚需\n多语言|150种语言随时添加和切换|热门\n更多曝光|专属身份特权，让更多人看到你|曝光", depth: 0, enabled: true, config: { variant: "onboarding-privilege-card", styleVariant: "cards", showSubtitle: true, showMoreLink: true, moreLinkText: "更多权益等待开启 >", items: [
            { id: "ht-p-translate", name: "无限翻译&字幕", title: "翻译", desc: "随聊随翻，提高你的词汇量", icon: "文A", tag: "刚需" },
            { id: "ht-p-world", name: "更多语伴沟通与多语言", title: "多语言", desc: "150种语言随时添加和切换", icon: "🌐", tag: "热门" },
            { id: "ht-p-boost", name: "动态曝光加速", title: "更多曝光", desc: "专属身份特权，让更多人看到你", icon: "⚡", tag: "曝光" },
          ] } },
          { id: "trial-t1-products", type: "Products", label: "产品双套餐", content: "12个月|¥40.67/月|总价 ¥488|48%OFF|免费试用\n月费会员|¥78.00月|||直接购买", depth: 0, enabled: true, config: { variant: "onboarding-dual-tiers", selectedTier: 0, tiers: [
            { name: "12个月", monthly: "¥40.67/月", total: "¥488", discount: "48%OFF", badge: "免费试用", hasTrial: true, ctaText: "开启3天 VIP免费试用" },
            { name: "月费会员", monthly: "¥78.00月", total: "", discount: "", badge: "直接购买", hasTrial: false, ctaText: "继续" },
          ] } },
          { id: "trial-t1-safenote", type: "Text", label: "安全取消说明", content: "订阅可随时取消，无需支付任何费用", depth: 0, enabled: true, config: { variant: "safety-note" } },
          { id: "trial-t1-purchase", type: "Purchase Button", label: "购买按钮", content: "开启3天 VIP免费试用", depth: 0, enabled: true, config: { label: "购买按钮", color: "#6144E8" } },
          { id: "trial-t1-links", type: "Legal Footer", label: "免责声明", content: "免费3天试用后,系统会以¥488自动续订,可随时取消。费用将从你的iTunes账户收取,你可随时前往iTunes商店的设置界面管理自己的订阅设定。有关详细信息,请访问我们的[服务条款]及[隐私政策]", depth: 0, enabled: true, config: { itunesDisclaimer: true } },
        ],
      },
      {
        id: "trial-tpl-2",
        name: "模版五",
        title: "多张轮播图新版",
        displayMode: "fullscreen",
        desc: "3张轮播卡片 · 垂直到期提醒 · 试用后套餐选择",
        theme: {
          primaryColor: "#6144E8",
          btnColor: "#6144E8",
          btnTextColor: "#FFFFFF",
          subTemplate: "trial-tpl-2",
          otherColor: "#6144E8",
          titleText: "专享会员\n更好练习外语",
          btnText: "开启3天 VIP免费试用",
          btnTextAlt: "开启3天 VIP免费试用",
          showDismissBtn: true,
          dismissBtnText: "不，谢谢",
          retainModal: {
            title: "提示",
            prompt: "你确定要放弃免费试用 VIP 的机会吗？关闭后无法再打开此页面。",
            primaryBtn: "不，我不放弃",
            cancelBtn: "是，暂时不用",
          },
          bgGradient: "linear-gradient(180deg, #6144E8 0%, #5B3FE6 100%)",
          isDark: false,
        },
        nodes: [
          { id: "trial-t2-hero", type: "Hero Image", label: "背景图", content: "专享会员\n更好练习外语", depth: 0, enabled: true, config: { variant: "onboarding-carousel-hero", mascot: true, closeBtn: true } },
          { id: "trial-t2-carousel", type: "Carousel Cards", label: "多张轮播图", content: "Slide 1: 免费体验HelloTalk会员\nSlide 2: 到期前提醒\nSlide 3: 选择试用结束后的套餐", depth: 0, enabled: true, config: {
            variant: "onboarding-3slides",
            currentSlide: 0,
            slide1Title: "免费体验HelloTalk会员",
            slide1Items: [
              { title: "翻译", desc: "随聊随翻，提高你的词汇量", icon: "文A" },
              { title: "多语言", desc: "150种语言随时添加和切换", icon: "globe" },
              { title: "更多曝光", desc: "专属身份特权，让更多人看到你", icon: "zap" },
              { title: "无广告", desc: "更沉浸专心的学语言！", icon: "ad" },
            ],
            slide2Title: "到期前提醒",
            slide2Timeline: [
              { day: "Day 1", desc: "成为HelloTalk会员，享受学习与交流的乐趣", icon: "crown" },
              { day: "Day 2", desc: "收到体验即将结束的通知", icon: "bell" },
              { day: "Day 3", desc: "24小时前取消则无需支付任何费用，否则当日扣款", icon: "clock" },
            ],
            slide3Title: "选择试用结束后的套餐",
            slide3Yearly: { name: "12 个月", monthly: "¥40.67/ 月", total: "¥488", discount: "48% OFF", badge: "免费试用" },
            slide3Monthly: { name: "1 个月", monthly: "¥78/ 月" },
            slide3SafetyNote: "可随时在 App Store 取消",
          } },
          { id: "trial-t2-safenote", type: "Text", label: "安全取消说明", content: "订阅可随时取消，无需支付任何费用", depth: 0, enabled: true, config: { variant: "safety-pill" } },
          { id: "trial-t2-purchase", type: "Purchase Button", label: "购买按钮", content: "开启3天 VIP免费试用", depth: 0, enabled: true, config: { label: "购买按钮", color: "#6144E8" } },
          { id: "trial-t2-dismiss", type: "Dismiss Button", label: "关闭按钮", content: "不，谢谢", depth: 0, enabled: true, config: { variant: "text-dismiss" } },
          { id: "trial-t2-links", type: "Legal Footer", label: "免责声明", content: "This subscription will automatically renew and be charged 24 hours prior to the end of the current subscription, unless auto-renew is turned off before this 24-hour period. Payment is charged to your Google Play Account. This subscription can be managed in your Account Settings. [Terms of Service] and [Privacy Policy]", depth: 0, enabled: true },
        ],
      },
    ],
    "ht-content-paywall": [
      {
        id: "cp-tpl-1",
        name: "模板 1",
        title: "VIP失效样式 (所有变量)",
        displayMode: "modal",
        desc: "针对 VIP 失效用户，呈现历史学习进步与续订激励 (图一官方规范)",
        theme: {
          subTemplate: "cp-tpl-1",
          styleType: "VIP失效样式",
          userName: "Yeah",
          userFlag: "🇩🇪",
          themeColor: "#6C3EDE",
          bgGradient: "linear-gradient(180deg, #EBE4FA 0%, #F5F0FF 25%, #FFFFFF 65%)",
          subtitle: "你的进步有目共睹！",
          headlineBold: "VIP现已过期",
          headlineSub: "立即续订，别让沟通速度慢下来！",
          highlightWord: "立即续订",
          mascotType: "crown-gift",
          btnText: "立即续订",
          btnColor: "#6C3EDE",
        },
        nodes: [
          { id: "cp1-close", type: "Dismiss Button", label: "操作按钮 (关闭按钮)", content: "✕", depth: 0, enabled: true, config: { variant: "close-icon", position: "top-left" } },
          { id: "cp1-user", type: "User Profile", label: "文本与排版 (用户画像)", content: "Yeah|🇩🇪", depth: 0, enabled: true, config: { userName: "Yeah", userFlag: "🇩🇪" } },
          { id: "cp1-metrics", type: "Dynamic Metrics", label: "对比与时间轴 (动态指标)", content: "972、762、487、673、837、899、116、156、939、446、650、442", depth: 0, enabled: true, config: { styleType: "VIP失效样式", metricValues: [972, 762, 487, 673, 837, 899, 116, 156, 939, 446, 650, 442] } },
          { id: "cp1-subhead", type: "Subhead", label: "文本与排版 (副标题)", content: "你的进步有目共睹！", depth: 0, enabled: true, config: { variant: "body" } },
          { id: "cp1-headline", type: "Header", label: "文本与排版 (主标题)", content: "VIP现已过期\n立即续订，别让沟通速度慢下来！", depth: 0, enabled: true, config: { variant: "content-headline", highlightWord: "立即续订", highlightColor: "#6C3EDE" } },
          { id: "cp1-mascot", type: "Mascot Illustration", label: "背景图 (吉祥物插画)", content: "crown-gift", depth: 0, enabled: true, config: { mascotType: "crown-gift" } },
          { id: "cp1-purchase", type: "Purchase Button", label: "操作按钮 (购买按钮)", content: "立即续订", depth: 0, enabled: true, config: { label: "操作按钮 (购买按钮)", color: "#6C3EDE" } },
        ],
      },
      {
        id: "cp-tpl-2",
        name: "模板 2",
        title: "【历史未付费】访客",
        displayMode: "modal",
        desc: "针对访客足迹场景，高亮显示 7 天内访客数与解锁权益 (图二官方规范)",
        theme: {
          subTemplate: "cp-tpl-2",
          styleType: "非VIP样式",
          userName: "Yeah",
          userFlag: "🇩🇪",
          themeColor: "#FF6A00",
          bgGradient: "linear-gradient(180deg, #FFF5EB 0%, #FEF3E2 25%, #FFFFFF 65%)",
          visitorCount: 21,
          visitorTitle: "21 new visitors in the past 7 days 👀",
          subtitle: "Your profile is getting noticed",
          hook1: "Let more people know you",
          hook2: "Reach more people",
          mascotType: "binoculars",
          disclaimer: "Upgrade to VIP to see who viewed your profile",
          btnText: "Upgrade Now",
          btnColor: "#FF6A00",
        },
        nodes: [
          { id: "cp2-close", type: "Dismiss Button", label: "操作按钮 (关闭按钮)", content: "✕", depth: 0, enabled: true, config: { variant: "close-icon", position: "top-left" } },
          { id: "cp2-user", type: "User Profile", label: "文本与排版 (用户画像)", content: "Yeah|🇩🇪", depth: 0, enabled: true, config: { userName: "Yeah", userFlag: "🇩🇪" } },
          { id: "cp2-metrics", type: "Dynamic Metrics", label: "对比与时间轴 (动态指标)", content: "21 new visitors in the past 7 days 👀", depth: 0, enabled: true, config: { styleType: "非VIP样式", visitorCount: 21, visitorTitle: "21 new visitors in the past 7 days 👀" } },
          { id: "cp2-subhead", type: "Subhead", label: "文本与排版 (副标题)", content: "Your profile is getting noticed", depth: 0, enabled: true, config: { variant: "body" } },
          { id: "cp2-headline", type: "Header", label: "文本与排版 (主标题)", content: "Let more people know you\nReach more people", depth: 0, enabled: true, config: { variant: "content-headline", hook1: "Let more people know you", hook2: "Reach more people" } },
          { id: "cp2-mascot", type: "Mascot Illustration", label: "背景图 (吉祥物插画)", content: "binoculars", depth: 0, enabled: true, config: { mascotType: "binoculars" } },
          { id: "cp2-links", type: "Legal Footer", label: "文本与排版 (免责声明)", content: "Upgrade to VIP to see who viewed your profile", depth: 0, enabled: true, config: { variant: "clean-center" } },
          { id: "cp2-purchase", type: "Purchase Button", label: "操作按钮 (购买按钮)", content: "Upgrade Now", depth: 0, enabled: true, config: { label: "操作按钮 (购买按钮)", color: "#FF6A00", shape: "pill" } },
        ],
      },
      {
        id: "cp-tpl-3",
        name: "模板 3",
        title: "非订阅状态样式 (所有变量)",
        displayMode: "modal",
        desc: "针对高频活跃但未曾订阅用户，呈现交友努力指标与关系推进 (图三官方规范)",
        theme: {
          subTemplate: "cp-tpl-3",
          styleType: "非订阅状态样式",
          userName: "Yeah",
          userFlag: "🇩🇪",
          themeColor: "#FF8A00",
          bgGradient: "linear-gradient(180deg, #FFF9EB 0%, #FEF7E5 25%, #FFFFFF 65%)",
          subtitle: "你已经在为交朋友认真努力了",
          headlineBold: "升级VIP",
          headlineSub: "让关系继续发生。",
          highlightWord: "升级VIP",
          mascotType: "translate-coin",
          btnText: "升级 VIP",
          btnColor: "#FF8A00",
        },
        nodes: [
          { id: "cp3-close", type: "Dismiss Button", label: "操作按钮 (关闭按钮)", content: "✕", depth: 0, enabled: true, config: { variant: "close-icon", position: "top-left" } },
          { id: "cp3-user", type: "User Profile", label: "文本与排版 (用户画像)", content: "Yeah|🇩🇪", depth: 0, enabled: true, config: { userName: "Yeah", userFlag: "🇩🇪" } },
          { id: "cp3-metrics", type: "Dynamic Metrics", label: "对比与时间轴 (动态指标)", content: "899、164、681、640、367、223、292、164、670、150、169、267", depth: 0, enabled: true, config: { styleType: "非订阅状态样式", metricValues: [899, 164, 681, 640, 367, 223, 292, 164, 670, 150, 169, 267] } },
          { id: "cp3-subhead", type: "Subhead", label: "文本与排版 (副标题)", content: "你已经在为交朋友认真努力了", depth: 0, enabled: true, config: { variant: "body" } },
          { id: "cp3-headline", type: "Header", label: "文本与排版 (主标题)", content: "升级VIP\n让关系继续发生。", depth: 0, enabled: true, config: { variant: "content-headline", highlightWord: "升级VIP", highlightColor: "#FF8A00" } },
          { id: "cp3-mascot", type: "Mascot Illustration", label: "背景图 (吉祥物插画)", content: "translate-coin", depth: 0, enabled: true, config: { mascotType: "translate-coin" } },
          { id: "cp3-purchase", type: "Purchase Button", label: "操作按钮 (购买按钮)", content: "升级 VIP", depth: 0, enabled: true, config: { label: "操作按钮 (购买按钮)", color: "#FF8A00" } },
        ],
      },
    ],
  }));

  const [activeSubTemplateByPage, setActiveSubTemplateByPage] = useState({
    "ht-entry-aggregation": "tpl-1",
    "ht-vip-package": "pkg-tpl-1",
    "ht-onboarding": "trial-tpl-1",
    "ht-content-paywall": "cp-tpl-1",
  });

  const currentTemplate = templates[appliedTemplate] ?? templates[0];
  const [activeCompareTab, setActiveCompareTab] = useState(() => (currentTemplate?.id === "ht-tier-compare" ? 1 : 0));
  const [simulatedUserId, setSimulatedUserId] = useState("user-linfan");
  const currentSimulatedUser = SIMULATED_USERS.find((u) => u.id === simulatedUserId) || SIMULATED_USERS[0];

  useEffect(() => {
    if (currentTemplate?.id === "ht-tier-compare") {
      setActiveCompareTab(1);
    } else if (currentTemplate?.id === "ht-switch-compare") {
      setActiveCompareTab(0);
    }
  }, [currentTemplate?.id]);

  const isEntryPricePage = currentTemplate?.id === "ht-entry-aggregation";
  const isVipPackagePage = currentTemplate?.id === "ht-vip-package";
  const isOnboardingPage = currentTemplate?.id === "ht-onboarding";
  const hasSubTemplates = Boolean(templatePresetsMap[currentTemplate.id]?.length);

  const subTemplates = templatePresetsMap[currentTemplate.id] || [];
  const activeSubTemplateId = activeSubTemplateByPage[currentTemplate.id] || subTemplates[0]?.id;
  const activeSubTemplate = hasSubTemplates
    ? subTemplates.find((t) => t.id === activeSubTemplateId) || subTemplates[0]
    : null;
  const currentEffectiveNodes = hasSubTemplates ? (activeSubTemplate?.nodes || []) : builderNodes;
  const effectiveTheme = hasSubTemplates ? activeSubTemplate?.theme : DEFAULT_ENTRY_CONFIG;
  const currentDisplayMode = activeSubTemplate?.displayMode || (currentTemplate?.visual === "bottom-sheet" || currentTemplate?.id === "ht-vip-pop" ? "bottom-sheet" : (currentTemplate?.visual === "pop" || currentTemplate?.id === "ht-content-paywall") ? "modal" : "fullscreen");
  const isBottomSheetMode = !isOnboardingPage && (activeSubTemplate?.displayMode === "bottom-sheet" || currentDisplayMode === "bottom-sheet" || currentTemplate?.id === "ht-vip-pop" || activeSubTemplateId === "tpl-2");
  const isModalMode = !isBottomSheetMode && (activeSubTemplate?.displayMode === "modal" || currentDisplayMode === "modal" || currentTemplate?.id === "ht-content-paywall");
  const isModalLikeMode = isBottomSheetMode || isModalMode;

  const toggleDisplayMode = (mode) => {
    if (hasSubTemplates) {
      const targetMode = mode === "popup"
        ? (isEntryPricePage ? "bottom-sheet" : "modal")
        : mode;
      setTemplatePresetsMap((prev) => ({
        ...prev,
        [currentTemplate.id]: (prev[currentTemplate.id] || []).map((t) => {
          if (t.id === activeSubTemplateId) {
            return {
              ...t,
              displayMode: targetMode,
            };
          }
          return t;
        }),
      }));
    }
  };

  const getTemplateBadge = (tpl) => {
    if (tpl.displayMode === "bottom-sheet") return "底部半窗";
    if (tpl.displayMode === "modal") return "居中弹窗";
    return "全屏模式";
  };

  useEffect(() => {
    if (view !== "builder") return;
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || document.activeElement?.isContentEditable) {
        return;
      }
      if ((e.key === "Delete" || e.key === "Backspace") && activeNode) {
        const nodeToDelete = currentEffectiveNodes.find((n) => n.id === activeNode);
        if (nodeToDelete) {
          e.preventDefault();
          removeEffectiveNode(activeNode);
          notify?.(`已删除组件: ${nodeToDelete.type}`);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [view, activeNode, currentEffectiveNodes, notify]);

  const updateEffectiveNode = (id, patch) => {
    if (hasSubTemplates) {
      setTemplatePresetsMap((prev) => ({
        ...prev,
        [currentTemplate.id]: (prev[currentTemplate.id] || []).map((t) => {
          if (t.id === activeSubTemplateId) {
            return {
              ...t,
              nodes: t.nodes.map((n) => (n.id === id ? { ...n, ...patch } : n)),
            };
          }
          return t;
        }),
      }));
    } else {
      updateBuilderNode(id, patch);
    }
  };

  const removeEffectiveNode = (id) => {
    if (hasSubTemplates) {
      let nextActiveId = null;
      setTemplatePresetsMap((prev) => ({
        ...prev,
        [currentTemplate.id]: (prev[currentTemplate.id] || []).map((t) => {
          if (t.id === activeSubTemplateId) {
            const remaining = t.nodes.filter((n) => n.id !== id);
            nextActiveId = remaining[0]?.id || null;
            return {
              ...t,
              nodes: remaining,
            };
          }
          return t;
        }),
      }));
      if (activeNode === id) {
        setActiveNode(nextActiveId);
      }
    } else {
      removeBuilderNode(id);
      const remaining = builderNodes.filter((n) => n.id !== id);
      if (activeNode === id) {
        setActiveNode(remaining[0]?.id || null);
      }
    }
  };

  const moveNodeByOffset = (id, offset) => {
    if (hasSubTemplates) {
      setTemplatePresetsMap((prev) => ({
        ...prev,
        [currentTemplate.id]: (prev[currentTemplate.id] || []).map((t) => {
          if (t.id === activeSubTemplateId) {
            const idx = t.nodes.findIndex((n) => n.id === id);
            if (idx < 0) return t;
            const targetIdx = idx + offset;
            if (targetIdx < 0 || targetIdx >= t.nodes.length) return t;
            const nextNodes = [...t.nodes];
            const [item] = nextNodes.splice(idx, 1);
            nextNodes.splice(targetIdx, 0, item);
            return {
              ...t,
              nodes: nextNodes,
            };
          }
          return t;
        }),
      }));
      setActiveNode(id);
      notify("已更新组件排序");
    } else {
      setBuilderNodes((current) => {
        const idx = current.findIndex((n) => n.id === id);
        if (idx < 0) return current;
        const targetIdx = idx + offset;
        if (targetIdx < 0 || targetIdx >= current.length) return current;
        const nextNodes = [...current];
        const [item] = nextNodes.splice(idx, 1);
        nextNodes.splice(targetIdx, 0, item);
        return nextNodes;
      });
      setActiveNode(id);
      notify("已更新组件排序");
    }
  };

  const reorderNode = (sourceId, targetId, position = "below") => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    if (hasSubTemplates) {
      setTemplatePresetsMap((prev) => ({
        ...prev,
        [currentTemplate.id]: (prev[currentTemplate.id] || []).map((t) => {
          if (t.id === activeSubTemplateId) {
            const fromIdx = t.nodes.findIndex((n) => n.id === sourceId);
            if (fromIdx < 0) return t;
            const nextNodes = [...t.nodes];
            const [item] = nextNodes.splice(fromIdx, 1);
            let toIdx = nextNodes.findIndex((n) => n.id === targetId);
            if (toIdx < 0) toIdx = nextNodes.length;
            if (position === "below") toIdx += 1;
            nextNodes.splice(toIdx, 0, item);
            return {
              ...t,
              nodes: nextNodes,
            };
          }
          return t;
        }),
      }));
      setActiveNode(sourceId);
      notify("已拖拽更新组件顺序");
    } else {
      setBuilderNodes((current) => {
        const fromIdx = current.findIndex((n) => n.id === sourceId);
        if (fromIdx < 0) return current;
        const nextNodes = [...current];
        const [item] = nextNodes.splice(fromIdx, 1);
        let toIdx = nextNodes.findIndex((n) => n.id === targetId);
        if (toIdx < 0) toIdx = nextNodes.length;
        if (position === "below") toIdx += 1;
        nextNodes.splice(toIdx, 0, item);
        return nextNodes;
      });
      setActiveNode(sourceId);
      notify("已拖拽更新组件顺序");
    }
  };

  const toggleNodeEnabled = (id, isEnabled) => {
    if (hasSubTemplates) {
      setTemplatePresetsMap((prev) => ({
        ...prev,
        [currentTemplate.id]: (prev[currentTemplate.id] || []).map((t) => {
          if (t.id === activeSubTemplateId) {
            return {
              ...t,
              nodes: t.nodes.map((n) => (n.id === id ? { ...n, enabled: isEnabled } : n)),
            };
          }
          return t;
        }),
      }));
      notify(isEnabled ? "已在当前模版开启展示该组件" : "已在当前模版隐藏该组件");
    }
  };

  const updateSubTemplateTheme = (patch) => {
    if (hasSubTemplates) {
      setTemplatePresetsMap((prev) => ({
        ...prev,
        [currentTemplate.id]: (prev[currentTemplate.id] || []).map((t) => {
          if (t.id === activeSubTemplateId) {
            return {
              ...t,
              theme: { ...t.theme, ...patch },
            };
          }
          return t;
        }),
      }));
    }
  };

  const handleAddSubTemplate = () => {
    const list = templatePresetsMap[currentTemplate.id] || [];
    const nextNum = list.length + 1;
    const newId = `${currentTemplate.id}-tpl-${Date.now()}`;
    let newTemplate;

    if (isVipPackagePage) {
      newTemplate = {
        id: newId,
        name: `模板 ${nextNum}`,
        title: `翡翠尊享版 ${nextNum}`,
        desc: `第 ${nextNum} 套独立会员套餐方案`,
        image: nextNum % 2 === 0 ? "/templates/vip_pkg_tpl2.png" : "/templates/vip_pkg_tpl1.png",
        theme: {
          primaryColor: "#10B981",
          btnColor: "#10B981",
          btnTextColor: "#FFFFFF",
          subTemplate: newId,
          otherColor: "#10B981",
          titleText: `HelloTalk VIP 尊享方案 ${nextNum}`,
          btnText: "立即开通 VIP",
          bgGradient: "linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 40%, #FFFFFF 100%)",
          isDark: false,
        },
        nodes: [
          { id: `${newId}-banner`, type: "Header", label: "顶部 VIP Banner", content: `HelloTalk VIP 尊享方案 ${nextNum}`, depth: 0, enabled: true, config: { variant: "vip-badge-header", badge: "VIP 进阶特权", subtitle: "尊享全球语伴交流与 AI 纠错" } },
          { id: `${newId}-carousel`, type: "Carousel Cards", label: "特权轮播卡片", content: "📍 搜索附近的人|与附近的人畅聊更多语言\n🌐 搜索全世界的语伴|一键瞬移至全球母语圈\n👀 解锁谁看了我|查看访客足迹", depth: 0, enabled: true, config: { privileges: ALL_HELLOTALK_PRIVILEGES, autoScroll: true } },
          { id: `${newId}-products`, type: "Products", label: "横向套餐卡片", content: "1个月|¥28|¥28\n12个月|¥19.99/月|¥238|省50%|推荐\n终身|¥698|一次性购买", depth: 0, enabled: true, config: { variant: "3-column-tiers", selectedTier: 1, tiers: [
            { name: "1个月", monthly: "¥28/月", total: "总价 ¥28", period: "1个月", badge: "", save: "" },
            { name: "12个月", monthly: "¥19.99/月", total: "总价 ¥238", period: "12个月", badge: "推荐", save: "省50%", isRecommended: true },
            { name: "终身", monthly: "¥698", total: "一次性购买", period: "终身", badge: "", save: "终身买断" },
          ] } },
          { id: `${newId}-purchase`, type: "Purchase Button", label: "购买按钮", content: "立即开通 VIP", depth: 0, enabled: true, config: { label: "purchase", color: "#10B981" } },
          { id: `${newId}-links`, type: "Legal Footer", label: "免责声明", content: "随时取消 · 自动续订说明 · 恢复购买", depth: 0, enabled: true },
        ],
      };
    } else {
      newTemplate = {
        id: newId,
        name: `模板 ${nextNum}`,
        title: `自定义新客模版 ${nextNum}`,
        desc: `第 ${nextNum} 套独立搭配组件`,
        image: nextNum % 2 === 0 ? "/templates/template2.jpg" : "/templates/template1.jpg",
        theme: {
          ...DEFAULT_ENTRY_CONFIG,
          subTemplate: newId,
          otherColor: nextNum % 2 === 0 ? "#F59E0B" : "#7C3AED",
          titleText: `HelloTalk VIP 专属新礼遇 ${nextNum}`,
          flexibleText: "新客专享限时破冰特惠 · 自定义配置",
          promoText: "限时专享礼遇",
          btnText: "立即领取特惠",
        },
        nodes: [
          { id: `${newId}-hero`, type: "Hero Image", label: "背景图", content: "寻找身边母语者", depth: 0, enabled: true, config: { bgMode: "illustration", sloganText: "寻找身边母语者", themeColor: "orange", showCloseBtn: true, bubbleBg: "#2563eb" } },
          { id: `${newId}-headline`, type: "Header", label: "标题", content: `HelloTalk VIP 专属新礼遇 ${nextNum}`, depth: 0, enabled: true, config: { variant: "headline" } },
          { id: `${newId}-subhead`, type: "Subhead", label: "副标题", content: "新客特惠 · 额外立省 20% · 仅此一次机会", depth: 0, enabled: true, config: { variant: "body" } },
          { id: `${newId}-timer`, type: "Timer", label: "倒计时", content: "限时优惠结束倒计时", depth: 0, enabled: true, config: { hours: 24, label: "限时优惠结束倒计时" } },
          { id: `${newId}-products`, type: "Products", label: "产品套餐", content: "VIP 超值会员|$19.99/year|$24.99/year|限时专享礼遇", depth: 0, enabled: true, config: { variant: "entry-price-tier", promoBadge: "限时专享礼遇", discountTag: "-20% OFF", priceNow: "$19.99/year", priceOriginal: "$24.99/year", priceSub: "仅 $0.05/天 · 随时取消" } },
          { id: `${newId}-benefits`, type: "Benefit List", label: "核心特权", content: "搜索附近的人|与附近母语者直接交流\n无限翻译与纠错|AI 语法实时纠正\n专属母语者推荐|优先匹配高活跃母语伙伴", depth: 0, enabled: true, config: { maxCount: 3, styleVariant: "entry-checks" } },
          { id: `${newId}-purchase`, type: "Purchase Button", label: "购买按钮", content: "立即领取特惠", depth: 0, enabled: true, config: { label: "purchase" } },
          { id: `${newId}-links`, type: "Legal Footer", label: "免责声明", content: "服务条款 · 隐私政策 · 恢复购买", depth: 0, enabled: true },
        ],
      };
    }

    setTemplatePresetsMap((prev) => ({
      ...prev,
      [currentTemplate.id]: [...(prev[currentTemplate.id] || []), newTemplate],
    }));
    setActiveSubTemplateByPage((prev) => ({
      ...prev,
      [currentTemplate.id]: newId,
    }));
    setActiveNode(newTemplate.nodes[0]?.id || null);
    notify(`成功添加「模板 ${nextNum}」！已在左侧模版那一列展示，可自由搭配组件。`);
  };

  const handleDeleteSubTemplate = (id, name, e) => {
    e.stopPropagation();
    const list = templatePresetsMap[currentTemplate.id] || [];
    if (list.length <= 1) {
      notify("至少需要保留一个模版预设");
      return;
    }
    const remaining = list.filter((t) => t.id !== id);
    setTemplatePresetsMap((prev) => ({
      ...prev,
      [currentTemplate.id]: remaining,
    }));
    if (activeSubTemplateId === id) {
      setActiveSubTemplateByPage((prev) => ({
        ...prev,
        [currentTemplate.id]: remaining[0].id,
      }));
      setActiveNode(remaining[0].nodes[0]?.id || null);
    }
    notify(`已移除模版预设: ${name}`);
  };

  if (view === "builder") {
    const active = currentEffectiveNodes.find((node) => node.id === activeNode) ?? currentEffectiveNodes[1] ?? currentEffectiveNodes[0];
    const builderBoundary = missingItems.find((item) => item.id === "B-01");

    const addElement = (type) => {
      const enType = zhToTypeMap[type] || type;
      const cleanEnKey = enType.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const nextId = `added-${cleanEnKey}-${Date.now()}`;
      if (hasSubTemplates) {
        const nextNode = {
          ...createComponentNode(type, currentEffectiveNodes.length + 1),
          id: nextId,
          enabled: true,
        };
        setTemplatePresetsMap((prev) => ({
          ...prev,
          [currentTemplate.id]: (prev[currentTemplate.id] || []).map((t) => {
            if (t.id === activeSubTemplateId) {
              return {
                ...t,
                nodes: [...t.nodes, nextNode],
              };
            }
            return t;
          }),
        }));
        setActiveNode(nextId);
        setBuilderTab("tree");
        setAddElementOpen(false);
        notify(`已将「${type}」添加到【${activeSubTemplate.name}】搭配组件中！`);
      } else {
        const next = {
          ...createComponentNode(type, builderNodes.filter((node) => node.id.startsWith("added-")).length + 1),
          id: nextId,
          enabled: true,
        };
        setBuilderNodes((current) => [...current, next]);
        setActiveNode(next.id);
        setBuilderTab("tree");
        setAddElementOpen(false);
        notify(`已将「${type}」添加到图层列表中！`);
      }
    };

    const addNestedElement = (parentId, type) => {
      const enType = zhToTypeMap[type] || type;
      const cleanEnKey = enType.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const nextId = `added-${cleanEnKey}-${Date.now()}`;
      if (hasSubTemplates) {
        setTemplatePresetsMap((prev) => ({
          ...prev,
          [currentTemplate.id]: (prev[currentTemplate.id] || []).map((t) => {
            if (t.id === activeSubTemplateId) {
              const parentIndex = t.nodes.findIndex((node) => node.id === parentId);
              if (parentIndex < 0) return t;
              const parent = t.nodes[parentIndex];
              const next = {
                ...createComponentNode(type, t.nodes.length + 1),
                id: nextId,
                depth: (parent.depth ?? 0) + 1,
                parentId,
                enabled: true,
              };
              let insertAt = parentIndex + 1;
              while (insertAt < t.nodes.length && (t.nodes[insertAt].depth ?? 0) > (parent.depth ?? 0)) insertAt += 1;
              return { ...t, nodes: [...t.nodes.slice(0, insertAt), next, ...t.nodes.slice(insertAt)] };
            }
            return t;
          }),
        }));
        setActiveNode(nextId);
        setBuilderTab("tree");
        notify(`${type} 已添加。`);
      } else {
        const nextId = `added-${type.toLowerCase().replace(/[^a-z]+/g, "-")}-${builderNodes.filter((node) => node.id.startsWith("added-")).length + 1}`;
        setBuilderNodes((current) => {
          const parentIndex = current.findIndex((node) => node.id === parentId);
          if (parentIndex < 0) return current;
          const parent = current[parentIndex];
          const next = { ...createComponentNode(type, current.filter((node) => node.id.startsWith("added-")).length + 1), depth: (parent.depth ?? 0) + 1, parentId };
          let insertAt = parentIndex + 1;
          while (insertAt < current.length && (current[insertAt].depth ?? 0) > (parent.depth ?? 0)) insertAt += 1;
          return [...current.slice(0, insertAt), next, ...current.slice(insertAt)];
        });
        setActiveNode(nextId);
        setBuilderTab("tree");
        notify(`${type} 已添加。`);
      }
    };

    const getNodeDropTarget = (clientX, clientY, sourceId) => {
      const target = document.elementFromPoint(clientX, clientY)?.closest("[data-node-id]");
      const targetId = target?.dataset.nodeId;
      if (!targetId || !canMoveBuilderNode(currentEffectiveNodes, sourceId, targetId)) return null;
      const { top, height } = target.getBoundingClientRect();
      return { targetId, position: clientY < top + height / 2 ? "before" : "after" };
    };

    const beginNodeDrag = (event, id) => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragState({ id, targetId: null, position: null });
      setActiveNode(id);
      setBuilderTab("tree");
    };

    const updateNodeDropTarget = (event) => {
      const sourceId = dragState?.id;
      if (!sourceId) return;
      const nextTarget = getNodeDropTarget(event.clientX, event.clientY, sourceId);
      if (!nextTarget) return;
      event.preventDefault();
      setDragState({ id: sourceId, ...nextTarget });
    };

    const dropNode = (event) => {
      const sourceId = dragState?.id;
      const nextTarget = sourceId ? getNodeDropTarget(event.clientX, event.clientY, sourceId) : null;
      if (sourceId && nextTarget) {
        if (hasSubTemplates) {
          setTemplatePresetsMap((prev) => ({
            ...prev,
            [currentTemplate.id]: (prev[currentTemplate.id] || []).map((t) => {
              if (t.id === activeSubTemplateId) {
                return {
                  ...t,
                  nodes: moveBuilderNode(t.nodes, sourceId, nextTarget.targetId, nextTarget.position),
                };
              }
              return t;
            }),
          }));
        } else {
          setBuilderNodes((current) => moveBuilderNode(current, sourceId, nextTarget.targetId, nextTarget.position));
        }
        setActiveNode(sourceId);
      }
      setDragState(null);
    };

    return (
      <section className="builder-page">
        <WorkspaceHeader selected={selected} setView={setView} duplicate={duplicate} setModal={setModal} markUnknown={markUnknown} notify={notify} />
        <div className="detail-tabs">
          <button onClick={() => setView("general")}>基础设置</button>
          <button className="active">构建器</button>
        </div>

        {/* Compact Horizontal Multi-Template Bar (Saves 160px+ vertical height) */}
        {hasSubTemplates && (
          <div className="entry-template-shelf-compact">
            <div className="shelf-compact-title">
              <span className="shelf-required-star">*</span>
              <span>模板选择:</span>
            </div>
            <div className="shelf-compact-list">
              {subTemplates.map((tpl) => {
                const isActive = activeSubTemplateId === tpl.id;
                const canDelete = !["tpl-1", "tpl-2", "pkg-tpl-1", "pkg-tpl-2", "trial-tpl-1", "trial-tpl-2"].includes(tpl.id);

                return (
                  <button
                    key={tpl.id}
                    type="button"
                    className={`shelf-pill-btn ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setActiveSubTemplateByPage((prev) => ({
                        ...prev,
                        [currentTemplate.id]: tpl.id,
                      }));
                      setActiveNode(tpl.nodes[0]?.id || null);
                      notify(`已切换至「${tpl.name}」搭配组件`);
                    }}
                  >
                    <MiniTemplateVisual tpl={tpl} />
                    <div className="shelf-pill-info">
                      <div className="shelf-pill-top">
                        <div className="shelf-pill-radio">
                          {isActive && <div className="shelf-pill-radio-dot" />}
                        </div>
                        <strong>{tpl.name.replace(/[-·].*$/, "").trim()}</strong>
                        <span className="shelf-pill-mode-tag">
                          {tpl.displayMode === "bottom-sheet" ? "底部弹窗" : tpl.displayMode === "modal" ? "浮层弹窗" : "全屏"}
                        </span>
                      </div>
                      <span className="shelf-pill-sub">
                        {tpl.title || (tpl.name.includes("-") ? tpl.name.split("-")[1] : tpl.name.includes("·") ? tpl.name.split("·")[1] : tpl.desc)}
                      </span>
                    </div>
                    {canDelete && (
                      <span
                        role="button"
                        tabIndex={0}
                        className="shelf-pill-del"
                        title={`删除 ${tpl.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSubTemplate(tpl.id, tpl.name, e);
                        }}
                      >
                        <X size={12} />
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                type="button"
                className="shelf-pill-add"
                onClick={handleAddSubTemplate}
                title="添加新模版"
              >
                <Plus size={14} />
                <span>添加模版</span>
              </button>
            </div>
          </div>
        )}

        {/* Builder Layout: Standard Spacious 3 Columns */}
        <div className="builder">
          {/* Column 1: Matching Components / Node Tree Panel */}
          <aside className="node-panel">
            {hasSubTemplates ? (
              <div className="matching-components-header">
                <div className="matching-components-title">
                  <Sliders size={13} color="#6366f1" />
                  <span>【{activeSubTemplate.name}】搭配组件</span>
                </div>
                <span className="matching-badge">{currentEffectiveNodes.filter((n) => n.enabled !== false).length} 项启用</span>
              </div>
            ) : (
              <>
                <label className="device-toggle"><input type="checkbox" defaultChecked /> <span>开启</span> 在设备上展示</label>
                <div className="panel-tabs">
                  <button className={builderTab === "tree" ? "active" : ""} onClick={() => setBuilderTab("tree")}>元素图层</button>
                  <button className={builderTab === "settings" ? "active" : ""} onClick={() => setBuilderTab("settings")}>全局布局</button>
                </div>
              </>
            )}

            <div className="add-element-wrap">
              <button className="add-element" onClick={() => setAddElementOpen((open) => !open)}>
                <Plus size={15} /> 添加组件
              </button>
              {addElementOpen && (
                <div className="add-element-menu" style={{ width: 220, padding: 6, borderRadius: 8, boxShadow: "0 10px 25px rgba(0,0,0,0.12)" }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#64748b", padding: "4px 8px 6px", borderBottom: "1px solid #f1f5f9", marginBottom: 4 }}>
                    选择要添加的核心组件
                  </div>
                  {[
                    { name: "核心特权", sub: "轮播 / 清单 / 网格 / 大卡", icon: <Sparkles size={14} color="#d97706" /> },
                    { name: "产品套餐", sub: "横向三列 / 双套餐 / 纵向单选 / 特惠", icon: <CreditCard size={14} color="#2563eb" /> },
                    { name: "文本与排版", sub: "主标题 / 副标题 / 正文 / 条款", icon: <Type size={14} color="#7c3aed" /> },
                    { name: "背景图", sub: "插画 / 自选图片 / 渐变底色", icon: <ImageIcon size={14} color="#059669" /> },
                    { name: "操作按钮", sub: "购买按钮 / 关闭按钮 / 切换标签", icon: <MousePointer size={14} color="#ea580c" /> },
                    { name: "倒计时", sub: "色块数字框 / 胶囊条 / 极简文本", icon: <Clock size={14} color="#dc2626" /> },
                    { name: "对比与时间轴", sub: "权益对比表格 / 试用时间轴", icon: <BarChart3 size={14} color="#4f46e5" /> },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => addElement(item.name)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "7px 8px",
                        borderRadius: 6,
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 5, background: "#f1f5f9" }}>{item.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>+ {item.name}</div>
                        <div style={{ fontSize: 9.5, color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="node-list">
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "2px 8px 6px", fontSize: 10, color: "#64748b" }}>
                <GripVertical size={12} color="#6366f1" />
                <span>按住手柄可上下拖动排序</span>
              </div>
              {currentEffectiveNodes.map((node, index) => {
                const isDragging = draggingNodeId === node.id;
                const isOver = dragOverNodeId === node.id;
                const dropClass = isOver ? (dragOverPosition === "above" ? "drop-target-above" : "drop-target-below") : "";
                const isEnabled = node.enabled !== false;
                const cat = getNodeCategory(node);
                const sub = getNodeSubRole(node);
                const displayName = node.customName || cat;
                return (
                  <div
                    role="button"
                    tabIndex={0}
                    data-node-id={node.id}
                    draggable={true}
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", node.id);
                      e.dataTransfer.effectAllowed = "move";
                      setDraggingNodeId(node.id);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = "move";
                      const rect = e.currentTarget.getBoundingClientRect();
                      const isTopHalf = e.clientY < rect.top + rect.height / 2;
                      const pos = isTopHalf ? "above" : "below";
                      if (dragOverNodeId !== node.id || dragOverPosition !== pos) {
                        setDragOverNodeId(node.id);
                        setDragOverPosition(pos);
                      }
                    }}
                    onDragLeave={(e) => {
                      if (dragOverNodeId === node.id && !e.currentTarget.contains(e.relatedTarget)) {
                        setDragOverNodeId(null);
                      }
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggingNodeId && draggingNodeId !== node.id) {
                        reorderNode(draggingNodeId, node.id, dragOverPosition);
                      }
                      setDraggingNodeId(null);
                      setDragOverNodeId(null);
                    }}
                    onDragEnd={() => {
                      setDraggingNodeId(null);
                      setDragOverNodeId(null);
                    }}
                    style={{ paddingLeft: `${6 + (node.depth ?? 0) * 10}px` }}
                    className={`node ${activeNode === node.id ? "selected" : ""} ${isDragging ? "dragging" : ""} ${!isEnabled ? "node-disabled" : ""} ${dropClass}`}
                    onClick={() => { setBuilderTab("tree"); setActiveNode(node.id); }}
                    key={node.id}
                  >
                    {hasSubTemplates && (
                      <div
                        className="node-checkbox-wrap"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={(e) => toggleNodeEnabled(node.id, e.target.checked)}
                          title={isEnabled ? "点击在当前模版中隐藏" : "点击在当前模版中展示"}
                        />
                      </div>
                    )}
                    <div className="node-title" style={{ display: "flex", alignItems: "center", gap: 5, flex: 1, minWidth: 0, overflow: "hidden" }}>
                      <strong style={{ fontSize: 12, color: "#1e293b", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {displayName}
                      </strong>
                    </div>

                    <div className="node-actions" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                      <div
                        className="node-drag-handle"
                        title="按住上下拖拽排序"
                        draggable={true}
                        onDragStart={(e) => {
                          e.stopPropagation();
                          e.dataTransfer.setData("text/plain", node.id);
                          e.dataTransfer.effectAllowed = "move";
                          setDraggingNodeId(node.id);
                        }}
                      >
                        <GripVertical size={14} />
                      </div>
                      <button
                        type="button"
                        className="node-action-btn delete"
                        title={`删除 ${displayName} 组件`}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeEffectiveNode(node.id);
                          notify?.(`已删除组件: ${displayName}`);
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="builder-locales">
              <div><strong>多语言本地化</strong><button className="icon tiny"><Plus size={14} /></button></div>
              <button className="locale-row selected">简体中文 (zh-CN) <i /></button>
              <button className="locale-row">English (en) <i /></button>
              <button className="locale-row">日本語 (ja) <i /></button>
              <button className="locale-row">한국어 (ko) <i /></button>
            </div>
          </aside>

          {/* Column 3: Centered iPhone 15 Pro Canvas */}
          <div className="canvas-area">
            {/* Quick Live Visitor Persona Switcher */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 auto 8px", width: 330, background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "4px 8px", borderRadius: 6, fontSize: 10, color: "#166534" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
                <span>👤 模拟访问用户：</span>
                <span style={{ color: "#15803d" }}>{currentSimulatedUser.name} ({currentSimulatedUser.targetLang})</span>
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {SIMULATED_USERS.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setSimulatedUserId(u.id);
                      notify?.(`已切换模拟访客画像为：${u.name}（${u.targetLang}）`);
                    }}
                    style={{
                      padding: "1px 6px",
                      fontSize: 9.5,
                      borderRadius: 3,
                      cursor: "pointer",
                      fontWeight: simulatedUserId === u.id ? 700 : 500,
                      background: simulatedUserId === u.id ? "#15803d" : "#fff",
                      color: simulatedUserId === u.id ? "#fff" : "#166534",
                      border: simulatedUserId === u.id ? "1px solid #15803d" : "1px solid #86efac",
                    }}
                  >
                    {u.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Authentic iPhone Frame */}
            <div className="iphone-frame-wrapper">
              <div className={`iphone-inner-screen ${isModalMode ? "modal-view-mode" : isBottomSheetMode ? "bottom-sheet-mode" : ""}`}>
                {/* Simulated App Background (When in Modal Mode only) */}
                {isModalMode && (
                  <div className="iphone-app-backdrop">
                    <div className="iphone-app-backdrop-header">
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <ChevronLeft size={16} />
                        <span>HelloTalk 会员</span>
                      </div>
                      <MoreVertical size={15} />
                    </div>
                    <div className="iphone-app-backdrop-feed">
                      <div className="backdrop-feed-item">
                        <div className="backdrop-avatar" />
                        <div className="backdrop-lines">
                          <div className="backdrop-line" />
                          <div className="backdrop-line short" />
                        </div>
                      </div>
                      <div className="backdrop-feed-item">
                        <div className="backdrop-avatar" />
                        <div className="backdrop-lines">
                          <div className="backdrop-line" />
                          <div className="backdrop-line short" />
                        </div>
                      </div>
                      <div className="backdrop-feed-item">
                        <div className="backdrop-avatar" />
                        <div className="backdrop-lines">
                          <div className="backdrop-line" />
                          <div className="backdrop-line short" />
                        </div>
                      </div>
                    </div>
                    <div className="iphone-modal-dim-overlay" />
                  </div>
                )}

                {/* iPhone Status Bar */}
                <div className={`iphone-notch-bar ${isOnboardingPage ? "onboarding-theme" : isModalMode || isBottomSheetMode || ((currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare") && activeCompareTab === 1) ? "dark-theme" : ""}`}>
                  <span>9:41</span>
                  <div className="iphone-dynamic-island" />
                  <div style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 10 }}>
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Main Content Area: Bottom Sheet vs Modal Dialog vs Fullscreen Scroll */}
                {isBottomSheetMode ? (
                  <div className="iphone-bottom-sheet-screen">
                    {currentTemplate?.id === "ht-vip-pop" ? (
                      <div className="ht-pop-app-backdrop" style={{ height: "28%", minHeight: 165, position: "relative", background: "#f8fafc", overflow: "hidden" }}>
                        {/* HelloTalk In-App Top Navbar & Content matching Figure 2 */}
                        <div style={{ padding: "8px 14px 4px", display: "flex", flexDirection: "column", gap: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <ChevronLeft size={20} color="#1e293b" style={{ cursor: "pointer" }} />
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                              <span style={{ fontSize: 13, fontWeight: 800, color: "#1e293b" }}>HelloTalk VIP</span>
                              <span style={{ fontSize: 9, fontWeight: 900, background: "#10b981", color: "#fff", padding: "1px 4px", borderRadius: 3 }}>HT</span>
                            </div>
                            <Settings size={18} color="#1e293b" style={{ cursor: "pointer" }} />
                          </div>
                          <button
                            type="button"
                            style={{
                              background: "#4F46E5",
                              color: "#fff",
                              border: "none",
                              borderRadius: 16,
                              padding: "6px 14px",
                              fontSize: 12,
                              fontWeight: 700,
                              alignSelf: "center",
                              width: "75%",
                              cursor: "pointer",
                            }}
                          >
                            Discover now
                          </button>
                          <div style={{ textAlign: "center", fontSize: 10, color: "#64748b" }}>昨天 21:40</div>
                          <div style={{ background: "#e2e8f0", borderRadius: 10, padding: "8px 12px" }}>
                            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#1e293b" }}>VIP Day: 20% OFF Now</div>
                            <div style={{ fontSize: 9.5, color: "#64748b" }}>Exclusive Badge</div>
                          </div>
                        </div>
                        {/* Dark Mask Overlay */}
                        <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.45)", pointerEvents: "none" }} />
                      </div>
                    ) : (
                      /* Top 38% Hero Area: 背景图 */
                      (() => {
                        const heroNode = currentEffectiveNodes.find((n) => n.id === "t2-hero" || n.type === "Hero Image");
                        const bgMode = heroNode?.config?.bgMode || "illustration";
                        const sloganText = heroNode?.config?.sloganText || heroNode?.content || "寻找身边母语者";
                        const bubbleBg = heroNode?.config?.bubbleBg || "#2563eb";
                        const themeColor = heroNode?.config?.themeColor || "orange";
                        const showClose = heroNode?.config?.showCloseBtn !== false;
                        const customImageUrl = heroNode?.config?.imageUrl;
                        const customGradient = heroNode?.config?.gradientBg || "linear-gradient(180deg, #ea580c 0%, #f97316 100%)";

                        const themeGradients = {
                          orange: "linear-gradient(180deg, #ea580c 0%, #f97316 100%)",
                          gold: "linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)",
                          blue: "linear-gradient(180deg, #1e3a8a 0%, #3b82f6 100%)",
                          purple: "linear-gradient(180deg, #831843 0%, #ec4899 100%)",
                        };
                        const computedBg = bgMode === "image" && customImageUrl
                          ? `url("${customImageUrl}") center/cover no-repeat`
                          : bgMode === "gradient"
                          ? customGradient
                          : (themeGradients[themeColor] || themeGradients.orange);

                        return (
                          <div
                            className={`entry-sheet-hero-area ${activeNode === (heroNode?.id || "t2-hero") ? "selected" : ""}`}
                            style={{ background: computedBg }}
                            onClick={() => {
                              setActiveNode(heroNode?.id || "t2-hero");
                              setBuilderTab("tree");
                            }}
                          >
                            {showClose && (
                              <button
                                type="button"
                                className="iphone-modal-close-icon-btn"
                                style={{ top: 8, right: 8, background: "rgba(0,0,0,0.3)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  notify("已触发关闭动作 (Dismiss Page)");
                                }}
                                title="关闭页面"
                              >
                                <X size={14} />
                              </button>
                            )}

                            {isOnboardingPage ? (
                              <div style={{ textAlign: "center", color: "#fff", padding: "30px 16px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                <div style={{ fontSize: 36, marginBottom: 4 }}>👋 🌍</div>
                                <div style={{ fontSize: 13, fontWeight: 800, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>注册新客专属体验礼包</div>
                                <div style={{ fontSize: 10, opacity: 0.9, marginTop: 4 }}>与全球 5000 万母语者即刻开启交流</div>
                              </div>
                            ) : bgMode === "image" && customImageUrl ? null : (
                              <div className="nearby-globe-illustration">
                                <div className="nearby-speech-bubble" style={{ background: bubbleBg }}>
                                  {sloganText}
                                </div>
                                <div className="nearby-globe-circle-wrap">
                                  <div className="nearby-earth-globe">
                                    <div className="earth-continent earth-continent-1" />
                                    <div className="earth-continent earth-continent-2" />
                                    <div className="earth-continent earth-continent-3" />
                                  </div>
                                  <div className="nearby-avatar-node top-left">
                                    <div className="nearby-avatar-circle">👩🏻</div>
                                    <span className="nearby-name-label">Sarah (US) 🇺🇸</span>
                                  </div>
                                  <div className="nearby-avatar-node top-right">
                                    <div className="nearby-avatar-circle">👱🏻‍♂️</div>
                                    <span className="nearby-name-label">Kenji (JP) 🇯🇵</span>
                                  </div>
                                  <div className="nearby-avatar-node bottom-left">
                                    <div className="nearby-avatar-circle">🧑🏽</div>
                                    <span className="nearby-name-label">Maria (ES) 🇪🇸</span>
                                  </div>
                                  <div className="nearby-avatar-node bottom-right">
                                    <div className="nearby-avatar-circle">👦🏻</div>
                                    <span className="nearby-name-label">Li (CN) 🇨🇳</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()
                    )}

                    {/* Bottom Sheet Dialog docked at bottom */}
                    <div className="entry-bottom-sheet-dialog" style={currentTemplate?.id === "ht-vip-pop" ? { position: "relative", borderRadius: "22px 22px 0 0" } : {}}>
                      {currentTemplate?.id !== "ht-vip-pop" && <div className="entry-sheet-handle-bar" />}
                      <div className="entry-sheet-content-scroll" style={currentTemplate?.id === "ht-vip-pop" ? { padding: "14px 14px 16px", position: "relative" } : {}}>
                        {currentEffectiveNodes
                          .filter((node) => {
                            if (node.enabled === false) return false;
                            if (currentTemplate?.id === "ht-vip-pop") return true;
                            return node.id !== "t2-hero" && node.type !== "Hero Image";
                          })
                          .map((node) => (
                            <PreviewElement
                              key={node.id}
                              node={node}
                              active={node.id === activeNode}
                              onSelect={(id) => {
                                setActiveNode(id);
                                setBuilderTab("tree");
                              }}
                              updateNode={updateEffectiveNode}
                              themeConfig={hasSubTemplates ? effectiveTheme : null}
                              currentTemplate={currentTemplate}
                              currentSimulatedUser={currentSimulatedUser}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                ) : isModalMode ? (
                  <div className="iphone-modal-container">
                    <div
                      className="iphone-modal-dialog"
                      style={
                        currentTemplate?.id === "ht-content-paywall"
                          ? {
                              background: effectiveTheme.bgGradient || "linear-gradient(180deg, #EBE4FA 0%, #F5F0FF 25%, #FFFFFF 65%)",
                              padding: "10px 14px 14px",
                            }
                          : {}
                      }
                    >
                      {currentTemplate?.id !== "ht-content-paywall" && (
                        <button
                          type="button"
                          className="iphone-modal-close-icon-btn"
                          title="关闭弹窗 (Dismiss)"
                          onClick={() => notify("已触发弹窗关闭动作 (Dismiss Dialog)")}
                        >
                          <X size={14} />
                        </button>
                      )}

                      <div className="iphone-modal-scroll-body">
                        {currentEffectiveNodes
                          .filter((node) => node.enabled !== false)
                          .map((node) => (
                            <PreviewElement
                              key={node.id}
                              node={node}
                              active={node.id === activeNode}
                              onSelect={(id) => {
                                setActiveNode(id);
                                setBuilderTab("tree");
                              }}
                              updateNode={updateEffectiveNode}
                              themeConfig={hasSubTemplates ? effectiveTheme : null}
                              currentTemplate={currentTemplate}
                              currentSimulatedUser={currentSimulatedUser}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="iphone-scroll-content"
                    style={
                      isOnboardingPage
                        ? { background: "#ffffff", padding: "0 0 20px" }
                        : hasSubTemplates
                        ? {
                            background: effectiveTheme.bgImage
                              ? `url(${effectiveTheme.bgImage}) center / cover no-repeat`
                              : effectiveTheme.bgGradient
                              ? effectiveTheme.bgGradient
                              : activeSubTemplateId === "tpl-2"
                              ? "linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 28%, #FFFFFF 60%)"
                              : "linear-gradient(180deg, #FFF1F2 0%, #FFE4E6 24%, #FFFFFF 52%)",
                          }
                        : (currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare")
                        ? {
                            background: activeCompareTab === 1
                              ? "linear-gradient(180deg, #1C0F38 0%, #29154E 20%, #150C28 60%, #0C0616 100%)"
                              : "linear-gradient(180deg, #FBF6EE 0%, #FFFDF9 28%, #FFFFFF 65%)",
                            color: activeCompareTab === 1 ? "#FFFFFF" : "#111827",
                            padding: "6px 12px 16px",
                          }
                        : {}
                    }
                  >
                    {currentEffectiveNodes
                      .filter((node) => node.enabled !== false)
                      .map((node) => (
                        <PreviewElement
                          key={node.id}
                          node={node}
                          active={node.id === activeNode}
                          onSelect={(id) => {
                            setActiveNode(id);
                            setBuilderTab("tree");
                          }}
                          updateNode={updateEffectiveNode}
                          themeConfig={hasSubTemplates ? effectiveTheme : null}
                          currentTemplate={currentTemplate}
                          onTriggerRetainModal={() => setShowRetainModal(true)}
                          selectedOnboardingTier={selectedOnboardingTier}
                          onSelectOnboardingTier={(t) => setSelectedOnboardingTier(t)}
                          isOnboardingPage={isOnboardingPage}
                          onboardingCarouselSlide={onboardingCarouselSlide}
                          setOnboardingCarouselSlide={setOnboardingCarouselSlide}
                          activeCompareTab={activeCompareTab}
                          setActiveCompareTab={setActiveCompareTab}
                          currentSimulatedUser={currentSimulatedUser}
                        />
                      ))}
                  </div>
                )}

                {/* HelloTalk 挽留弹窗交互浮层 (Exit Retain Modal) */}
                {showRetainModal && (
                  <div className="ht-retain-modal-overlay" onClick={() => setShowRetainModal(false)}>
                    <div className="ht-retain-modal-card" onClick={(e) => e.stopPropagation()}>
                      <div className="ht-retain-modal-badge">
                        <span>🎁 限时新客特权挽留</span>
                      </div>
                      <h3 className="ht-retain-modal-title">
                        {effectiveTheme?.retainModal?.title || "确定要放弃 3 天免费试用吗？"}
                      </h3>
                      <p className="ht-retain-modal-subtitle">
                        {effectiveTheme?.retainModal?.subtitle || "现在开通免费试用，首年可享限时折上折，随时可取消且不扣费！"}
                      </p>
                      <div className="ht-retain-modal-actions">
                        <button
                          type="button"
                          className="ht-retain-btn-primary"
                          onClick={() => {
                            setShowRetainModal(false);
                            notify("已取消放弃，继续体验 3 天 VIP 免费试用！");
                          }}
                        >
                          {effectiveTheme?.retainModal?.primaryBtn || "不，我不放弃"}
                        </button>
                        <button
                          type="button"
                          className="ht-retain-btn-cancel"
                          onClick={() => {
                            setShowRetainModal(false);
                            notify("已退出免费试用页面");
                          }}
                        >
                          {effectiveTheme?.retainModal?.cancelBtn || "是，暂时不用"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* iPhone Home Indicator */}
                <div className={`iphone-home-indicator ${isModalMode || isBottomSheetMode || ((currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare") && activeCompareTab === 1) ? "dark-theme" : ""}`}>
                  <span style={(currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare") && activeCompareTab === 1 ? { background: "#ffffff" } : {}} />
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Property Inspector */}
          <aside className="property-panel">
            {builderTab === "settings" ? (
              <LayoutSettings
                markUnknown={markUnknown}
                boundary={builderBoundary}
                setModal={setModal}
                appliedTemplate={appliedTemplate}
                isOnboardingPage={isOnboardingPage}
                activeSubTemplate={activeSubTemplate}
                updateSubTemplateTheme={updateSubTemplateTheme}
                onTriggerRetainModal={() => setShowRetainModal(true)}
                onSwitchSubTemplate={(id) => {
                  setActiveSubTemplateByPage((prev) => ({ ...prev, [currentTemplate.id]: id }));
                  setActiveNode(null);
                }}
                activeCompareTab={activeCompareTab}
                setActiveCompareTab={setActiveCompareTab}
              />
            ) : (
              <BuilderProperties
                active={active}
                setBuilderTab={setBuilderTab}
                markUnknown={markUnknown}
                boundary={builderBoundary}
                templateLinks={templateLinks}
                setTemplateLinks={setTemplateLinks}
                updateNode={updateEffectiveNode}
                removeNode={removeEffectiveNode}
                addNestedNode={addNestedElement}
                notify={notify}
                isOnboardingPage={isOnboardingPage}
                activeSubTemplate={activeSubTemplate}
                updateSubTemplateTheme={updateSubTemplateTheme}
                onTriggerRetainModal={() => setShowRetainModal(true)}
                onSwitchSubTemplate={(id) => {
                  setActiveSubTemplateByPage((prev) => ({ ...prev, [currentTemplate.id]: id }));
                  setActiveNode(null);
                }}
                activeCompareTab={activeCompareTab}
                setActiveCompareTab={setActiveCompareTab}
                onboardingCarouselSlide={onboardingCarouselSlide}
                setOnboardingCarouselSlide={setOnboardingCarouselSlide}
                simulatedUserId={simulatedUserId}
                setSimulatedUserId={setSimulatedUserId}
                currentSimulatedUser={currentSimulatedUser}
              />
            )}
          </aside>
        </div>

        {/* Builder Footer */}
        <div className="builder-footer">
          <button className="secondary" onClick={() => notify("已放弃未保存的本地修改。")}>放弃更改</button>
          <button className="primary" onClick={() => setModal({ kind: "builder-save" })}>保存配置</button>
        </div>
      </section>
    );
  }

  // General View
  return (
    <section>
      <WorkspaceHeader selected={selected} setView={setView} duplicate={duplicate} setModal={setModal} markUnknown={markUnknown} notify={notify} />
      <div className="detail-tabs">
        <button className="active">基础设置</button>
        <button onClick={() => setView("builder")}>构建器</button>
      </div>
      <div className="detail-layout">
        <div className="form-card detail-form">
          <h2>基础信息</h2>
          <Field label="付费墙名称"><input defaultValue={selected.name} /></Field>
          <Field label="触发业务场景"><input defaultValue={selected.scene || "常规商业化"} /></Field>
          <Field label="关联套餐产品">
            {observedProductRows.slice(0, selected.products).map((row, index) => (
              <ProductRow key={row.product} product={`${row.product} / ${row.period}`} offer={row.offer} index={index} markUnknown={markUnknown} readOnly />
            ))}
            <div className="product-add-wrap">
              <button className="secondary" onClick={() => setProductPickerOpen((open) => !open)}>
                <Plus size={16} /> 添加产品
              </button>
              {productPickerOpen && (
                <div className="product-add-menu">
                  <button onClick={() => { setTransientProducts((items) => [...items, { product: "HelloTalk VIP 季度卡", period: "3 months", offer: "限时特惠" }]); setProductPickerOpen(false); }}>
                    HelloTalk VIP 季度卡
                  </button>
                </div>
              )}
            </div>
          </Field>
          <Field label="付费墙截图">
            <button className="upload unknown-action" onClick={() => markUnknown({ id: "U-01", feature: "Screenshot upload", known: "PNG / JPG 10MB", unknown: "本地暂不模拟存储桶上传。" })}>
              <Upload size={18} /> 点击上传预览图 <small>PNG、JPG 最大 10 MB</small>
            </button>
          </Field>
        </div>
        <aside className="detail-aside">
          <div><span className="eyebrow">状态</span><StateBadge state={selected.state} /></div>
          <div><span className="eyebrow">产品套餐数</span><strong>{selected.products} 个</strong></div>
          <div><span className="eyebrow">创建时间</span><strong>{selected.startedAt}</strong></div>
          <button className="primary full" onClick={() => setView("builder")}><Blocks size={16} /> 打开无代码构建器</button>
        </aside>
      </div>
      <div className="builder-footer">
        <button className="secondary" onClick={() => setView("list")}>返回列表</button>
        <button className="primary" onClick={() => notify("基础信息已保存。")}>保存基础设置</button>
      </div>
    </section>
  );
}

function TimerPreview({ node, themeConfig, isDarkTheme = false }) {
  const hours = Number(themeConfig?.countdownHours || node.config?.hours || 24);
  const [secondsRemaining, setSecondsRemaining] = useState(() => Math.max(60, hours * 3600 - 35));

  useEffect(() => {
    setSecondsRemaining(Math.max(60, hours * 3600 - 35));
  }, [hours]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = String(Math.floor(secondsRemaining / 3600)).padStart(2, "0");
  const m = String(Math.floor((secondsRemaining % 3600) / 60)).padStart(2, "0");
  const s = String(secondsRemaining % 60).padStart(2, "0");

  const isDark = isDarkTheme || themeConfig?.isDark;
  const otherColor = themeConfig?.otherColor || (themeConfig?.subTemplate === "tpl-2" ? "#F59E0B" : (isDark ? "#F59E0B" : "#DE6876"));
  const btnTextColor = themeConfig?.btnTextColor || "#FFFFFF";
  const mainFontColor = isDark ? "#FFFFFF" : (themeConfig?.mainFontColor || "#2D1832");
  const isTpl2 = themeConfig?.subTemplate === "tpl-2";
  const rawLabel = node.config?.timerLabel || node.config?.label || node.content || (isTpl2 ? "礼包倒计时" : "优惠截止时间");
  const label = rawLabel.replace(/[：:]/g, "").trim();

  // 1. 极简纯文本 (原版) - clean-text
  if (node.config?.variant === "clean-text" || (!node.config?.variant && (themeConfig?.subTemplate === "tpl-1" || node.id === "t1-timer"))) {
    return (
      <div style={{ textAlign: "center", padding: "8px 0 6px" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: mainFontColor, letterSpacing: "0.02em" }}>
          {label} {h}:{m}:{s}
        </span>
      </div>
    );
  }

  // 2. 胶囊提示条 - badge-pill
  if (node.config?.variant === "badge-pill" || (themeConfig && node.config?.variant !== "card" && node.config?.variant !== "digit-cards")) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          background: isDark ? "rgba(255, 255, 255, 0.12)" : (isTpl2 ? "rgba(254, 243, 199, 0.9)" : "rgba(255, 241, 242, 0.9)"),
          border: `1px dashed ${otherColor}80`,
          borderRadius: 10,
          padding: "7px 12px",
          margin: "4px 0 10px",
        }}
      >
        <Clock size={13} color={otherColor} />
        <span style={{ fontSize: 11, fontWeight: 700, color: mainFontColor }}>{label}：</span>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <span style={{ background: otherColor, color: btnTextColor, fontSize: 11, fontWeight: 800, padding: "1px 5px", borderRadius: 4, fontFamily: "monospace" }}>{h}</span>
          <span style={{ color: otherColor, fontWeight: 800, fontSize: 11 }}>:</span>
          <span style={{ background: otherColor, color: btnTextColor, fontSize: 11, fontWeight: 800, padding: "1px 5px", borderRadius: 4, fontFamily: "monospace" }}>{m}</span>
          <span style={{ color: otherColor, fontWeight: 800, fontSize: 11 }}>:</span>
          <span style={{ background: otherColor, color: btnTextColor, fontSize: 11, fontWeight: 800, padding: "1px 5px", borderRadius: 4, fontFamily: "monospace" }}>{s}</span>
        </div>
      </div>
    );
  }

  // 3. 色块数字框 (黑五/活动版) - card / digit-cards
  return (
    <div className="preview-timer-container" style={{ margin: "4px 0 10px" }}>
      <div className="preview-timer-badge">
        ⚡ <span>{label}</span>
      </div>
      <div className="preview-timer-digits">
        <div className="digit-box"><span>{h}</span><small>时</small></div>
        <span className="colon">:</span>
        <div className="digit-box"><span>{m}</span><small>分</small></div>
        <span className="colon">:</span>
        <div className="digit-box"><span>{s}</span><small>秒</small></div>
      </div>
    </div>
  );
}

function HelloTalkStarMascot({ size = 68 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="htMascotBodyGrad" x1="25" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDE43" />
          <stop offset="0.6" stopColor="#FFB800" />
          <stop offset="1" stopColor="#FF9500" />
        </linearGradient>
      </defs>

      {/* Little Red-Orange Legs at bottom */}
      <path d="M42 74 Q39 84 36 86" stroke="#E64A19" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M56 74 Q58 84 62 86" stroke="#E64A19" strokeWidth="3.5" strokeLinecap="round" />

      {/* Main Yellow Mascot Body with Waving Left Hand */}
      <path
        d="M32 20 C36 12 46 16 46 25 C46 27 48 29 50 29 C53 29 55 24 58 18 C64 12 73 17 71 27 C70 30 72 33 76 34 C84 37 87 47 80 54 C77 56 77 60 79 63 C83 71 76 80 67 77 C64 76 60 78 58 81 C53 87 43 86 40 79 C38 76 35 75 32 76 C23 79 17 69 22 61 C24 58 23 54 20 52 C12 47 13 36 22 34 C26 33 28 29 28 26 C28 22 30 20 32 20 Z"
        fill="url(#htMascotBodyGrad)"
      />

      {/* Left Heart Eye (Pink #FF2D55) */}
      <path
        d="M37 43 C37 39.5 34 37 31 37 C27.5 37 25.5 40 25.5 43 C25.5 47.5 30.5 51 31 51.5 C31.5 51 36.5 47.5 36.5 43 Z"
        fill="#FF2D55"
      />
      <circle cx="29.5" cy="41" r="1.3" fill="#FFFFFF" />

      {/* Right Heart Eye (Pink #FF2D55) */}
      <path
        d="M57 43 C57 39.5 54 37 51 37 C47.5 37 45.5 40 45.5 43 C45.5 47.5 50.5 51 51 51.5 C51.5 51 56.5 47.5 56.5 43 Z"
        fill="#FF2D55"
      />
      <circle cx="49.5" cy="41" r="1.3" fill="#FFFFFF" />

      {/* Blushing Cheeks */}
      <ellipse cx="24" cy="49" rx="3.5" ry="2" fill="#FF5252" opacity="0.6" />
      <ellipse cx="60" cy="49" rx="3.5" ry="2" fill="#FF5252" opacity="0.6" />

      {/* Open Smiling Mouth with Tongue */}
      <path d="M37 53 Q42 60 46 53 Z" fill="#880E4F" />
      <path d="M39 55 Q42 59 44 55" fill="#FF4081" />

      {/* Yellow Sparkle 4-point Star at right */}
      <path
        d="M86 52 L88.5 46 L91 52 L97 54.5 L91 57 L88.5 63 L86 57 L80 54.5 Z"
        fill="#FFD54F"
      />
    </svg>
  );
}

function PreviewElement({
  node,
  active,
  onSelect,
  updateNode,
  themeConfig,
  onTriggerRetainModal,
  selectedOnboardingTier,
  onSelectOnboardingTier,
  isOnboardingPage,
  onboardingCarouselSlide,
  setOnboardingCarouselSlide,
  currentTemplate,
  activeCompareTab = 0,
  setActiveCompareTab,
  currentSimulatedUser,
}) {

  const [selectedTier, setSelectedTier] = useState(0);
  const [toggleOn, setToggleOn] = useState(node.config?.defaultState === "On" || true);
  const [activeTab, setActiveTab] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const select = () => onSelect(node.id);
  const wrap = (content, className = "") => (
    <div className={`preview-node ${active ? "selected" : ""} ${className}`} onClick={select}>
      {content}
    </div>
  );

  const renderInterpolated = (text) => {
    if (!text) return "";
    const u = currentSimulatedUser || SIMULATED_USERS[0];
    return text
      // Chinese real-time variable tags:
      .replace(/\{{1,2}\s*用户昵称\s*\}{1,2}/g, u.name)
      .replace(/\{{1,2}\s*学习语言\s*\}{1,2}/g, u.targetLang)
      .replace(/\{{1,2}\s*母语\s*\}{1,2}/g, u.nativeLang)
      .replace(/\{{1,2}\s*附近语伴数\s*\}{1,2}/g, `${u.nearbyCount}`)
      .replace(/\{{1,2}\s*谁看过我\s*\}{1,2}/g, `${u.visitorsCount}`)
      .replace(/\{{1,2}\s*访客人数\s*\}{1,2}/g, `${u.visitorsCount}`)
      .replace(/\{{1,2}\s*今日消耗翻译\s*\}{1,2}/g, `${u.todayTranslations}`)
      .replace(/\{{1,2}\s*今日已用翻译\s*\}{1,2}/g, `${u.todayTranslations}`)
      .replace(/\{{1,2}\s*消耗翻译\s*\}{1,2}/g, `${u.todayTranslations}`)
      .replace(/\{{1,2}\s*VIP到期天数\s*\}{1,2}/g, `${u.vipExpireDays}`)
      .replace(/\{{1,2}\s*到期天数\s*\}{1,2}/g, `${u.vipExpireDays}`)
      .replace(/\{{1,2}\s*VIP到期日期\s*\}{1,2}/g, u.vipExpireDate)
      .replace(/\{{1,2}\s*到期日期\s*\}{1,2}/g, u.vipExpireDate)
      .replace(/\{{1,2}\s*特权上限\s*\}{1,2}/g, u.vipMax)
      .replace(/\{{1,2}\s*实时折扣\s*\}{1,2}/g, u.discount)
      .replace(/\{{1,2}\s*实时立省金额\s*\}{1,2}/g, u.saveAmount)
      .replace(/\{{1,2}\s*实时立省\s*\}{1,2}/g, u.saveAmount)
      // English / Jinja tags compatibility:
      .replace(/\{\{\s*nick_name\s*\}\}/g, u.name)
      .replace(/\{\{\s*user_name\s*\}\}/g, u.name)
      .replace(/\{\{\s*target_lang\s*\}\}/g, u.targetLang)
      .replace(/\{\{\s*learn_lang\s*\}\}/g, u.targetLang)
      .replace(/\{\{\s*nearby_count\s*\}\}/g, `${u.nearbyCount}`)
      .replace(/\{\{\s*visitor_count\s*\}\}/g, `${u.visitorsCount}`)
      .replace(/\{\{\s*visitor_count_7d\s*\}\}/g, `${u.visitorsCount}`)
      .replace(/\{\{\s*vip_chat_translate_count\s*\}\}/g, `${u.todayTranslations}`)
      .replace(/\{\{\s*vip_expired_days\s*\}\}/g, `${u.vipExpireDays}`)
      .replace(/\{\{\s*vip_expire_time\s*\}\}/g, u.vipExpireDate)
      .replace(/\{\{\s*vip_privilege_model_v2_max\s*\}\}/g, u.vipMax)
      .replace(/\{\{\s*realtime_discount\s*\}\}/g, u.discount)
      .replace(/\{\{\s*save_amount\s*\}\}/g, u.saveAmount)
      .replace(/\{\{\s*user_stats\.matrix\s*\}\}/g, `${u.visitorsCount}`)
      .replace(/\{\{\s*study_days\s*\}\}/g, "48")
      .replace(/\{\{\s*expire_hours\s*\}\}/g, "20")
      .replace(/\{\{\s*discount_countdown\s*\}\}/g, "19:59:02");
  };

  if (node.type === "User Profile" || node.id?.includes("user")) {
    const parts = (node.content || "Yeah|🇩🇪").split("|");
    const name = node.config?.userName || parts[0] || "Yeah";
    const flag = node.config?.userFlag || parts[1] || "🇩🇪";
    return wrap(
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 12px", padding: "0 2px" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #60A5FA, #3B82F6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 16,
              border: "2px solid #FFFFFF",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            {name[0] || "Y"}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -2,
              right: -2,
              width: 15,
              height: 15,
              borderRadius: "50%",
              border: "1.5px solid #FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              background: "#000000",
              overflow: "hidden",
            }}
            title="User Country"
          >
            {flag}
          </div>
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
          {name}
        </span>
      </div>
    );
  }

  if (node.type === "Dynamic Metrics" || node.id?.includes("metrics")) {
    const styleType = node.config?.styleType || themeConfig?.styleType || "VIP失效样式";
    if (styleType === "非VIP样式" || node.config?.visitorCount || node.content?.includes("visitors")) {
      const count = node.config?.visitorCount || 21;
      return wrap(
        <div style={{ padding: "0 2px", margin: "4px 0 10px", textAlign: "left" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#111827", lineHeight: 1.25 }}>
            <span style={{ color: "#FF6A00", fontSize: 26, marginRight: 6 }}>{count}</span>
            new visitors in
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#111827" }}>
            the past 7 days 👀
          </div>
        </div>
      );
    }
    // Number matrix (for VIP失效样式 or 非订阅状态样式)
    const rawNumbers = node.content || "972、762、487、673、837、899、116、156、939、446、650、442";
    const numbers = rawNumbers.split(/[、,，\s]+/).filter(Boolean);
    const color = styleType === "非订阅状态样式" ? "#FF8A00" : "#6C3EDE";
    return wrap(
      <div style={{ padding: "0 2px", margin: "4px 0 10px", textAlign: "left" }}>
        <div
          style={{
            color,
            fontSize: 14.5,
            fontWeight: 800,
            lineHeight: 1.55,
            letterSpacing: "0.02em",
          }}
        >
          {numbers.length > 0 ? (
            <div>
              {numbers.map((num, idx) => (
                <span key={idx}>
                  {num}
                  {idx < numbers.length - 1 ? "、" : ""}
                  {(idx + 1) % 4 === 0 && <br />}
                </span>
              ))}
            </div>
          ) : (
            <div>{rawNumbers}</div>
          )}
        </div>
      </div>
    );
  }

  if (node.type === "Mascot Illustration" || node.id?.includes("mascot")) {
    const mascotType = node.config?.mascotType || node.content || "crown-gift";
    return wrap(
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0 6px" }}>
        {mascotType === "binoculars" ? (
          <ContentBinocularsMascot size={105} />
        ) : mascotType === "translate-coin" ? (
          <ContentTranslateCoinMascot size={105} />
        ) : (
          <ContentCrownMascot size={110} />
        )}
      </div>
    );
  }

  if (node.type === "Badge Tag") {
    const color = node.config?.color || "#1ECA92";
    return wrap(
      <div className="preview-badge-pill" style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}>
        <Sparkles size={11} />
        <span>{node.content}</span>
      </div>
    );
  }

  if (node.config?.variant === "onboarding-wave-hero" || node.id === "trial-t1-hero") {
    const title = renderInterpolated(node.content || themeConfig?.titleText || "3天会员免费试用");
    return wrap(
      <div className="ht-wave-hero-container">
        <div className="ht-hero-nav-bar">
          <button
            type="button"
            className="ht-hero-close-btn"
            title="关闭 (触发挽留弹窗)"
            onClick={(e) => {
              e.stopPropagation();
              onTriggerRetainModal?.();
            }}
          >
            <X size={18} strokeWidth={2.4} />
          </button>
          <div className="ht-mascot-star-wrap">
            <HelloTalkStarMascot size={72} />
          </div>
        </div>
        <div style={{ padding: "8px 0 10px" }}>
          <h2 className="ht-hero-title-text">
            {title}
          </h2>
        </div>
        <svg className="ht-scallop-wave" viewBox="0 0 375 24" preserveAspectRatio="none" fill="none">
          <path d="M0,24 C15,24 25,12 45,12 C65,12 75,22 95,22 C115,22 125,8 150,8 C175,8 185,20 210,20 C235,20 245,10 270,10 C295,10 305,22 330,22 C350,22 365,14 375,18 L375,24 L0,24 Z" fill="#FFFFFF"/>
        </svg>
      </div>
    );
  }

  if (node.config?.variant === "onboarding-carousel-hero" || node.id === "trial-t2-hero") {
    const raw = node.content || themeConfig?.titleText || "专享会员\n更好练习外语";
    const lines = raw.split("\n");
    return wrap(
      <div className="ht-wave-hero-container">
        <div className="ht-hero-nav-bar">
          <button
            type="button"
            className="ht-hero-close-btn"
            title="关闭 (触发挽留弹窗)"
            onClick={(e) => {
              e.stopPropagation();
              onTriggerRetainModal?.();
            }}
          >
            <X size={18} strokeWidth={2.4} />
          </button>
          <div className="ht-mascot-star-wrap">
            <HelloTalkStarMascot size={72} />
          </div>
        </div>
        <div style={{ padding: "4px 0 8px" }}>
          <h2 className="ht-hero-title-text" style={{ lineHeight: 1.25 }}>
            {lines.map((l, i) => <div key={i}>{l}</div>)}
          </h2>
        </div>
        <svg className="ht-scallop-wave" viewBox="0 0 375 24" preserveAspectRatio="none" fill="none">
          <path d="M0,24 C15,24 25,12 45,12 C65,12 75,22 95,22 C115,22 125,8 150,8 C175,8 185,20 210,20 C235,20 245,10 270,10 C295,10 305,22 330,22 C350,22 365,14 375,18 L375,24 L0,24 Z" fill="#FFFFFF"/>
        </svg>
      </div>
    );
  }

  if (node.type === "Header") {
    const isComparePage = currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare" || node.id === "headline";
    if (isComparePage && (currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare" || node.config?.variant === "brand-hero")) {
      const isPlus = activeCompareTab === 1;
      const defaultBullets = isPlus
        ? ["无限翻译", "查看谁喜欢了你", "结识全球母语者"]
        : ["无限翻译", "查看谁喜欢了你", "搜索全世界的语伴"];
      const bullets = (Array.isArray(node.config?.bullets) && node.config.bullets.length > 0)
        ? node.config.bullets
        : defaultBullets;

      if (!isPlus) {
        return wrap(
          <div className="ht-brand-hero-vip">
            <div className="ht-brand-hero-vip-left">
              <div className="ht-brand-vip-title">
                HelloTalk<span className="ht-brand-vip-gradient-text">VIP</span>
              </div>
              <div className="ht-brand-bullets-list">
                {bullets.map((b, i) => (
                  <div key={i} className="ht-brand-bullet-item">{b}</div>
                ))}
              </div>
            </div>
            <div className="ht-brand-hero-vip-right">
              <HelloTalkMascot size={94} />
            </div>
          </div>
        );
      } else {
        return wrap(
          <div className="ht-brand-hero-plus">
            <div className="ht-brand-plus-brand">HelloTalk</div>
            <div className="ht-brand-plus-huge-title">VIP PLUS +</div>
            <div className="ht-brand-bullets-list" style={{ marginTop: 6 }}>
              {bullets.map((b, i) => (
                <div key={i} className="ht-brand-bullet-item dark">{b}</div>
              ))}
            </div>
          </div>
        );
      }
    }

    if (node.config?.variant === "content-headline" || node.id?.includes("cp") || currentTemplate?.id === "ht-content-paywall") {
      const rawText = node.content || "VIP现已过期\n立即续订，别让沟通速度慢下来！";
      const lines = rawText.split("\n");
      const highlight = node.config?.highlightWord || (node.content?.includes("升级VIP") ? "升级VIP" : "立即续订");
      const highlightColor = node.config?.highlightColor || (node.content?.includes("升级VIP") ? "#FF8A00" : "#6C3EDE");
      return wrap(
        <div style={{ padding: "0 2px", margin: "6px 0 10px", textAlign: "left" }}>
          {lines.map((line, idx) => {
            if (line.includes(highlight)) {
              const parts = line.split(highlight);
              return (
                <div key={idx} style={{ fontSize: 18, fontWeight: 900, color: "#111827", lineHeight: 1.35 }}>
                  {parts[0]}
                  <span style={{ color: highlightColor }}>{highlight}</span>
                  {parts[1]}
                </div>
              );
            }
            if (node.config?.hook1 && idx === 0) {
              return (
                <div key={idx} style={{ fontSize: 15, fontWeight: 800, color: "#6C3EDE", lineHeight: 1.35 }}>
                  {line}
                </div>
              );
            }
            return (
              <div key={idx} style={{ fontSize: 18, fontWeight: 900, color: "#111827", lineHeight: 1.35 }}>
                {line}
              </div>
            );
          })}
        </div>
      );
    }

    if (node.config?.variant === "vip-banner") {
      return wrap(
        <div
          style={{
            background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E3A8A 100%)",
            borderRadius: 14,
            padding: "16px 14px",
            textAlign: "center",
            color: "#FFFFFF",
            margin: "4px 0 10px",
            boxShadow: "0 6px 18px rgba(30, 27, 75, 0.25)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(4px)",
              padding: "2px 8px",
              borderRadius: 12,
              fontSize: 9.5,
              fontWeight: 800,
              color: "#FDE047",
              marginBottom: 6,
            }}
          >
            <Crown size={12} />
            <span>{node.config?.badge || "VIP PRIVILEGE"}</span>
          </div>
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: "2px 0 4px", letterSpacing: "-0.02em", color: "#FFFFFF" }}>
            {renderInterpolated(node.content)}
          </h2>
          <p style={{ fontSize: 10.5, color: "#CBD5E1", margin: 0 }}>
            {node.config?.subtitle || "畅享 16 项高阶语言学习特权"}
          </p>
        </div>
      );
    }

    if (node.config?.variant === "vip-badge-header") {
      return wrap(
        <div
          style={{
            background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FDE68A 100%)",
            borderRadius: 14,
            padding: "12px 14px 10px",
            textAlign: "center",
            color: "#78350F",
            margin: "2px 0 8px",
            border: "1px solid #FCD34D",
            boxShadow: "0 4px 12px rgba(245, 158, 11, 0.12)",
          }}
        >
          {/* Mini Phone Illustration from HelloTalk Template 2 */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <div
              style={{
                width: 140,
                background: "#ffffff",
                borderRadius: 10,
                padding: "6px 8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "1px solid #fed7aa",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: 3 }}>
                <span style={{ fontSize: 8.5, fontWeight: 700, color: "#475569" }}>访客记录 (Visitor)</span>
                <span style={{ fontSize: 7.5, background: "#fef3c7", color: "#d97706", padding: "1px 4px", borderRadius: 4, fontWeight: 800 }}>VIP 独享</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f8fafc", padding: "2px 4px", borderRadius: 4 }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#60a5fa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff" }}>🇺🇸</div>
                <div style={{ flex: 1, height: 4, background: "#cbd5e1", borderRadius: 2 }} />
                <span style={{ fontSize: 7, color: "#94a3b8" }}>刚刚</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f8fafc", padding: "2px 4px", borderRadius: 4 }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#f472b6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff" }}>🇯🇵</div>
                <div style={{ flex: 1, height: 4, background: "#cbd5e1", borderRadius: 2 }} />
                <span style={{ fontSize: 7, color: "#94a3b8" }}>10m前</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "#F59E0B",
              color: "#FFFFFF",
              padding: "2px 8px",
              borderRadius: 12,
              fontSize: 9.5,
              fontWeight: 800,
              marginBottom: 4,
            }}
          >
            <Sparkles size={11} />
            <span>{node.config?.badge || "7 项特权已解锁"}</span>
          </div>
          <h2 style={{ fontSize: 15, fontWeight: 800, margin: "2px 0 2px", color: "#78350F" }}>
            {renderInterpolated(node.content)}
          </h2>
          <p style={{ fontSize: 10, color: "#92400E", margin: 0 }}>
            {node.config?.subtitle || "开启全球无障碍母语交流"}
          </p>
        </div>
      );
    }

    const mainFontColor = themeConfig?.mainFontColor || "#2D1832";
    // 模板 1 (全屏平铺版 / 真实 App 原版): 左对齐排版 + VIP 皇冠前缀
    if (themeConfig?.subTemplate === "tpl-1" || node.id === "t1-headline" || node.config?.kicker) {
      const kicker = node.config?.kicker || themeConfig?.titleKicker || "HelloTalk VIP 👑";
      return wrap(
        <div style={{ textAlign: "left", padding: "4px 0 2px" }}>
          {kicker && (
            <div style={{ fontSize: 26, fontWeight: 800, color: mainFontColor, display: "flex", alignItems: "center", gap: 6, letterSpacing: "-0.01em" }}>
              <span>{kicker.replace("👑", "").trim()}</span>
              <span style={{ fontSize: 23 }}>👑</span>
            </div>
          )}
          <h2
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: mainFontColor,
              margin: "6px 0 2px",
              lineHeight: 1.22,
              letterSpacing: "-0.02em",
            }}
          >
            {renderInterpolated(node.content)}
          </h2>
        </div>
      );
    }

    if (currentTemplate?.id === "ht-vip-pop" || node.config?.variant === "pop-headline" || node.config?.align === "left") {
      return wrap(
        <div style={{ textAlign: "left", padding: "2px 36px 2px 0" }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#0f172a",
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}
          >
            {renderInterpolated(node.content)}
          </h2>
        </div>
      );
    }

    return wrap(
      <h2
        className="preview-ht-headline"
        style={mainFontColor ? { color: mainFontColor, textAlign: "center", margin: "4px 0 2px" } : {}}
      >
        {renderInterpolated(node.content)}
      </h2>
    );
  }

  if (node.type === "Subhead") {
    if (node.id?.includes("cp") || currentTemplate?.id === "ht-content-paywall") {
      return wrap(
        <div style={{ textAlign: "left", margin: "2px 0 8px", padding: "0 2px" }}>
          <p style={{ fontSize: 13, color: node.config?.color || "#475569", fontWeight: 500, margin: 0 }}>
            {renderInterpolated(node.content)}
          </p>
        </div>
      );
    }

    // 模板 1 (全屏平铺版 / 真实 App 原版): "仅限今日" 醒目左对齐珊瑚红
    if (themeConfig?.subTemplate === "tpl-1" || node.id === "t1-subhead") {
      const subColor = node.config?.color || themeConfig?.otherColor || "#DE6876";
      return wrap(
        <div style={{ textAlign: "left", margin: "2px 0 14px" }}>
          <span style={{ fontSize: 21, fontWeight: 800, color: subColor, letterSpacing: "0.01em" }}>
            {renderInterpolated(node.content)}
          </span>
        </div>
      );
    }

    if (currentTemplate?.id === "ht-vip-pop" || node.config?.align === "left") {
      return wrap(
        <div style={{ textAlign: "left", margin: "3px 0 8px" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: node.config?.color || "#0f172a",
              margin: 0,
              lineHeight: 1.35,
            }}
          >
            {renderInterpolated(node.content)}
          </p>
        </div>
      );
    }

    return wrap(
      <p className="preview-ht-subhead" style={{ textAlign: "center", margin: "2px 0 8px", color: node.config?.color || "#64748b" }}>
        {renderInterpolated(node.content)}
      </p>
    );
  }

  if (node.type === "Switch Tabs") {
    const isComparePage = currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare" || node.id === "switch-tabs";
    if (isComparePage) {
      const isPlus = activeCompareTab === 1;
      return wrap(
        <div className="ht-compare-switch-container">
          <div className={`ht-compare-switch-pill ${isPlus ? "dark-theme" : "light-theme"}`}>
            <button
              type="button"
              className={`ht-switch-tab-item ${!isPlus ? "vip-active-light" : "vip-inactive-dark"}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCompareTab?.(0);
              }}
            >
              VIP
            </button>
            <button
              type="button"
              className={`ht-switch-tab-item ${isPlus ? "plus-active-dark" : "plus-inactive-light"}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCompareTab?.(1);
              }}
            >
              VIP+
            </button>
          </div>
        </div>
      );
    }
    const tabs = (node.content || "VIP 进阶版|VIP+ 旗舰版").split("|");
    return wrap(
      <div className="preview-switch-tabs">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            type="button"
            className={`switch-tab-btn ${activeTab === idx ? "active" : ""}`}
            onClick={(e) => { e.stopPropagation(); setActiveTab(idx); }}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }


  if (node.type === "Language Chips") {
    const chips = (node.content || "").split("|").filter(Boolean);
    return wrap(
      <div className="preview-lang-chips">
        {chips.map((chip, idx) => (
          <span key={idx} className="lang-chip">{chip}</span>
        ))}
      </div>
    );
  }

  if (node.type === "Carousel Cards") {
    if (node.config?.variant === "onboarding-3slides" || node.id === "trial-t2-carousel" || node.label === "多张轮播图" || node.label?.includes("多张轮播图")) {
      const curSlide = (onboardingCarouselSlide ?? carouselIndex) % 3;
      const setCurSlide = (idx) => {
        setOnboardingCarouselSlide?.(idx);
        setCarouselIndex(idx);
      };

      const s1Title = node.config?.slide1Title || "免费体验HelloTalk会员";
      const s1Items = node.config?.slide1Items || [
        { title: "翻译", desc: "随聊随翻，提高你的词汇量", icon: "文A" },
        { title: "多语言", desc: "150种语言随时添加和切换", icon: "globe" },
        { title: "更多曝光", desc: "专属身份特权，让更多人看到你", icon: "zap" },
        { title: "无广告", desc: "更沉浸专心的学语言！", icon: "ad" },
      ];

      const s2Title = node.config?.slide2Title || "到期前提醒";
      const s2Timeline = node.config?.slide2Timeline || [
        { day: "Day 1", desc: "成为HelloTalk会员，享受学习与交流的乐趣", icon: "crown" },
        { day: "Day 2", desc: "收到体验即将结束的通知", icon: "bell" },
        { day: "Day 3", desc: "24小时前取消则无需支付任何费用，否则当日扣款", icon: "clock" },
      ];

      const s3Title = node.config?.slide3Title || "选择试用结束后的套餐";
      const s3Yearly = node.config?.slide3Yearly || {
        name: "12 个月",
        monthly: "¥40.67/ 月",
        total: "¥488",
        discount: "48% OFF",
        badge: "免费试用",
      };
      const s3Monthly = node.config?.slide3Monthly || {
        name: "1 个月",
        monthly: "¥78/ 月",
      };
      const s3SafetyNote = node.config?.slide3SafetyNote || "可随时在 App Store 取消";

      return wrap(
        <div style={{ margin: "2px 0 6px" }}>
          <div className="ht-carousel-slide-card">
            {curSlide === 0 && (
              <>
                <h4 className="ht-carousel-title">
                  {s1Title}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "2px 2px 4px" }}>
                  {s1Items.map((it, i) => {
                    let iconElem = <span style={{ fontSize: 13, fontWeight: 800 }}>文A</span>;
                    if (it.icon === "globe" || (it.title && it.title.includes("多语言"))) {
                      iconElem = <Globe size={18} />;
                    } else if (it.icon === "zap" || (it.title && it.title.includes("曝光"))) {
                      iconElem = <Zap size={18} fill="#6144e8" />;
                    } else if (it.icon === "ad" || (it.title && it.title.includes("广告"))) {
                      iconElem = (
                        <div style={{ border: "1.5px solid #6144e8", borderRadius: 4, padding: "1px 2px", fontSize: 9.5, fontWeight: 900, lineHeight: 1 }}>
                          Ad
                        </div>
                      );
                    } else if (it.icon === "crown") {
                      iconElem = (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#6144E8">
                          <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V17H19V19Z" />
                        </svg>
                      );
                    } else if (it.icon && it.icon !== "文A") {
                      iconElem = <span style={{ fontSize: 16 }}>{it.icon}</span>;
                    }
                    return (
                      <div key={i} className="ht-privilege-item" style={{ padding: "6px 2px" }}>
                        <div className="ht-privilege-icon-box">
                          {iconElem}
                        </div>
                        <div className="ht-privilege-info">
                          <strong>{it.title}</strong>
                          <span>{it.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {curSlide === 1 && (
              <>
                <h4 className="ht-carousel-title">
                  {s2Title}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "8px 4px 6px" }}>
                  {s2Timeline.map((step, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div className="ht-privilege-icon-box">
                        {step.icon === "crown" ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#6144E8">
                            <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V17H19V19Z" />
                          </svg>
                        ) : step.icon === "bell" ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#6144E8">
                            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#6144E8">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" />
                          </svg>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14.5, fontWeight: 800, color: "#1f2937", lineHeight: 1.3 }}>
                          {step.day}
                        </div>
                        <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 2, lineHeight: 1.4 }}>
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {curSlide === 2 && (
              <>
                <h4 className="ht-carousel-title">
                  {s3Title}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "8px 2px 4px" }}>
                  {/* Option 1: 12 个月 */}
                  <div
                    className={`ht-tier-card ${selectedOnboardingTier === 0 ? "selected" : "unselected"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectOnboardingTier?.(0);
                    }}
                  >
                    {s3Yearly.badge && <div className="ht-tier-badge-pill">{s3Yearly.badge}</div>}
                    <div className="ht-tier-content-row">
                      <div className="ht-tier-col-left">
                        <span className="ht-tier-title-main">{s3Yearly.name || "12 个月"}</span>
                        {s3Yearly.total && <span className="ht-tier-price-sub">{s3Yearly.total}</span>}
                      </div>
                      <div className="ht-tier-col-right">
                        <span className="ht-tier-price-main">{s3Yearly.monthly || "¥40.67/ 月"}</span>
                        {s3Yearly.discount && <span className="ht-tier-discount-pill">{s3Yearly.discount}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Option 2: 1 个月 */}
                  <div
                    className={`ht-tier-card ${selectedOnboardingTier === 1 ? "selected" : "unselected-gray"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectOnboardingTier?.(1);
                    }}
                  >
                    <div className="ht-tier-content-row">
                      <div className="ht-tier-col-left">
                        <span className="ht-tier-title-main">{s3Monthly.name || "1 个月"}</span>
                      </div>
                      <div className="ht-tier-col-right">
                        <span className="ht-tier-price-main">{s3Monthly.monthly || "¥78/ 月"}</span>
                      </div>
                    </div>
                  </div>

                  {s3SafetyNote && (
                    <div style={{ textAlign: "center", fontSize: 11.5, color: "#9ca3af", marginTop: 2 }}>
                      {s3SafetyNote}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* 3 Dash Capsules Pagination */}
            <div className="ht-carousel-pagination">
              {[0, 1, 2].map((idx) => (
                <span
                  key={idx}
                  className={`ht-carousel-dash ${curSlide === idx ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurSlide(idx);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    const privilegeMode = node.config?.privilegeMode || "carousel";
    const activePrivileges = node.config?.privileges
      ? (privilegeMode === "list"
          ? node.config.privileges.filter((p) => p.show)
          : node.config.privileges.filter((p) => p.show && p.carousel))
      : [];
    const allItems = activePrivileges.length > 0
      ? activePrivileges.map((p) => ({ title: p.name, desc: p.desc, icon: p.icon }))
      : (node.content || "").split("\n").filter(Boolean).map((line) => {
          const [title, desc] = line.split("|");
          return { title, desc, icon: "✨" };
        });

    if (privilegeMode === "list") {
      return wrap(
        <div
          className="preview-privilege-list-wrap"
          style={{
            background: "#ffffff",
            borderRadius: 14,
            padding: "12px 14px",
            margin: "4px 0 12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {allItems.slice(0, 5).map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 16, lineHeight: 1.2, marginTop: 1 }}>{item.icon || "💎"}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b", lineHeight: 1.3 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 10.5, color: "#64748b", lineHeight: 1.4, marginTop: 2 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {allItems.length > 5 && (
            <div
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "#6366f1",
                fontWeight: 600,
                paddingTop: 8,
                marginTop: 6,
                borderTop: "1px solid #f1f5f9",
              }}
            >
              查看全部 {allItems.length} 项特权 &gt;
            </div>
          )}
        </div>
      );
    }

    const cards = allItems;
    const safeIndex = cards.length > 0 ? carouselIndex % cards.length : 0;
    const currentCard = cards[safeIndex] || { title: "暂无轮播特权", desc: "请在右侧属性面板勾选开启特权轮播", icon: "✨" };

    return wrap(
      <div className="preview-carousel-cards">
        <div className="carousel-card-slide">
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 16 }}>{currentCard?.icon}</span>
            <strong style={{ fontSize: 13, color: "#1e293b" }}>{currentCard?.title}</strong>
          </div>
          <p style={{ margin: 0, fontSize: 11, color: "#64748b", lineHeight: 1.4 }}>{currentCard?.desc}</p>
        </div>
        <div className="carousel-dots">
          {cards.map((_, idx) => (
            <span
              key={idx}
              className={`carousel-dot ${idx === safeIndex ? "active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setCarouselIndex(idx); }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (node.type === "Timer") {
    const isComparePage = currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare";
    const variant = node.config?.variant;
    const isPlus = activeCompareTab === 1;

    // 如果用户明确切换到 极简纯文本 (clean-text) 或 色块数字框 (card / digit-cards)，响应切换
    if (variant === "clean-text" || variant === "card" || variant === "digit-cards") {
      return wrap(<TimerPreview node={node} themeConfig={themeConfig} isDarkTheme={isPlus} />);
    }

    // 胶囊提示条 (badge-pill / pill-capsule) 或对比页面默认形态
    if (isComparePage || variant === "pill-capsule" || variant === "badge-pill") {
      const discountText = node.config?.discount || "20% OFF";
      const timeText = node.config?.time || "14:43:23";
      const labelText = node.config?.timerLabel || node.config?.label;
      return wrap(
        <div style={{ display: "flex", justifyContent: "center", margin: "2px 0 8px" }}>
          <div className={`ht-compare-timer-capsule ${isPlus ? "dark-theme" : "light-theme"}`}>
            {labelText ? <span style={{ fontWeight: 700, marginRight: 4 }}>{labelText}</span> : null}
            <span>{discountText}</span>
            <span style={{ margin: "0 6px" }}>{timeText}</span>
          </div>
        </div>
      );
    }
    return wrap(<TimerPreview node={node} themeConfig={themeConfig} isDarkTheme={isPlus} />);
  }


  if (node.type === "Benefit List") {
    // 优先从 node.config.items 获取结构化特权，否则从 content 解析
    let items = [];
    if (Array.isArray(node.config?.items) && node.config.items.length > 0) {
      items = node.config.items;
    } else {
      const lines = (node.content || "").split("\n").filter(Boolean);
      items = lines.map((l, i) => {
        const parts = l.split("|");
        const rawTitle = (parts[0] || ("特权 " + (i + 1))).trim();
        let desc = (parts[1] || "").trim();
        let tag = (parts[2] || "").trim();
        let icon = "💎";
        if (rawTitle.includes("翻译")) icon = "文A";
        else if (rawTitle.includes("多语言") || rawTitle.includes("语伴")) icon = "🌐";
        else if (rawTitle.includes("曝光")) icon = "⚡";
        else if (rawTitle.includes("访客") || rawTitle.includes("看")) icon = "👀";
        else if (rawTitle.includes("广告")) icon = "🚫";
        return {
          id: `item-${i}`,
          title: rawTitle,
          name: rawTitle,
          desc,
          tag,
          icon,
        };
      });
    }

    const styleVariant = node.config?.styleVariant || (
      node.config?.variant === "carousel" || node.config?.privilegeMode === "carousel"
        ? "carousel"
        : node.config?.variant === "onboarding-privilege-card" || node.id === "trial-t1-privileges"
        ? "cards"
        : node.config?.variant === "grid-matrix"
        ? "grid"
        : "checklist"
    );

    // 0. 卡片轮播形态
    if (styleVariant === "carousel") {
      const cards = items;
      const safeIndex = cards.length > 0 ? carouselIndex % cards.length : 0;
      const currentCard = cards[safeIndex] || { title: "暂无轮播特权", desc: "请在右侧属性面板配置特权", icon: "✨" };
      return wrap(
        <div className="preview-carousel-cards" style={{ margin: "4px 0 12px" }}>
          <div className="carousel-card-slide" style={{ background: "#ffffff", borderRadius: 14, padding: "16px 14px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>{currentCard.icon || "💎"}</span>
              <strong style={{ fontSize: 14, color: "#1e293b" }}>{currentCard.title || currentCard.name}</strong>
            </div>
            <p style={{ fontSize: 11.5, color: "#64748b", margin: 0, lineHeight: 1.4 }}>{currentCard.desc || "HelloTalk VIP 核心专享特权"}</p>
          </div>
          {cards.length > 1 && (
            <div className="carousel-dots" style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
              {cards.slice(0, 8).map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === safeIndex ? "active" : ""}`}
                  style={{
                    width: i === safeIndex ? 14 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === safeIndex ? "#6366f1" : "#cbd5e1",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselIndex(i);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    // 1. 圆角权益大卡流 (注册引导与试用页规范)
    if (styleVariant === "cards") {
      return wrap(
        <div className="ht-privilege-card">
          {items.map((item, idx) => (
            <div key={item.id || idx} className="ht-privilege-item">
              <div className="ht-privilege-icon-box">
                {item.icon === "文A" || (item.title && item.title.includes("翻译")) ? (
                  <span style={{ fontSize: 13, fontWeight: 800 }}>文A</span>
                ) : item.icon === "🌐" || (item.title && (item.title.includes("多语言") || item.title.includes("语言"))) ? (
                  <Globe size={18} />
                ) : item.icon === "⚡" || (item.title && item.title.includes("曝光")) ? (
                  <Zap size={18} fill="#6144e8" />
                ) : (
                  <span style={{ fontSize: 15 }}>{item.icon || "✨"}</span>
                )}
              </div>
              <div className="ht-privilege-info">
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <strong>{item.title || item.name}</strong>
                  {item.tag && <span className="ht-privilege-tag">{item.tag}</span>}
                </div>
                {node.config?.showSubtitle !== false && (
                  <span>{item.desc || "HelloTalk VIP 核心专享特权"}</span>
                )}
              </div>
            </div>
          ))}
          {node.config?.showMoreLink !== false && (
            <div className="ht-privilege-more">
              {node.config?.moreLinkText || "更多权益等待开启 >"}
            </div>
          )}
        </div>
      );
    }

    // 2. 双列网格矩阵 (蓝色特权主页规范)
    if (styleVariant === "grid") {
      return wrap(
        <div style={{ margin: "6px 0 14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                style={{
                  background: "rgba(255,255,255,0.92)",
                  borderRadius: 10,
                  padding: "9px 10px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#EEF2FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {item.icon || "💎"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </div>
                  {item.tag ? (
                    <span style={{ fontSize: 9, background: "#fee2e2", color: "#b91c1c", padding: "0 3px", borderRadius: 3, fontWeight: 700 }}>
                      {item.tag}
                    </span>
                  ) : item.desc ? (
                    <div style={{ fontSize: 9.5, color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.desc}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          {node.config?.showMoreLink !== false && (
            <div style={{ textAlign: "center", fontSize: 12, color: "#6366f1", fontWeight: 600, padding: "8px 0 2px", cursor: "pointer" }}>
              {node.config?.moreLinkText || "查看全部 16 项特权 >"}
            </div>
          )}
        </div>
      );
    }

    // 3. 单列打勾列表 (入门价格页等规范，如 图一/图三)
    const checkColor = node.config?.checkColor || themeConfig?.otherColor || (themeConfig?.subTemplate === "tpl-2" ? "#F59E0B" : "#DE6876");
    const privilegeColor = themeConfig?.privilegeColor || "#2D1832";
    const showSubtitle = node.config?.showSubtitle === true;

    return wrap(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          margin: "8px 0 20px",
          textAlign: "left",
        }}
      >
        {items.map((item, idx) => (
          <div key={item.id || idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                color: checkColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Check size={19} strokeWidth={3.2} />
            </div>
            <div>
              <div style={{ fontSize: 16.5, fontWeight: 700, color: privilegeColor, lineHeight: 1.3 }}>
                {item.title}
              </div>
              {showSubtitle && item.desc && (
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                  {item.desc}
                </div>
              )}
            </div>
          </div>
        ))}
        {node.config?.showMoreLink && (
          <div style={{ textAlign: "left", fontSize: 12, color: checkColor, fontWeight: 600, padding: "2px 0", cursor: "pointer" }}>
            {node.config?.moreLinkText || "更多权益等待开启 >"}
          </div>
        )}
      </div>
    );
  }

  if (node.type === "Comparison Table") {
    const isComparePage = currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare" || node.id === "compare-table";
    const isPlus = node.config?.compareMode === "vip-vs-plus" || (isComparePage && activeCompareTab === 1);
    const items = Array.isArray(node.config?.items) && node.config.items.length > 0
      ? node.config.items
      : (isPlus ? DEFAULT_VIP_VS_PLUS_ITEMS : DEFAULT_FREE_VS_VIP_ITEMS);
    const featureColTitle = (node.config?.featureColTitle && node.config.featureColTitle !== "Features")
      ? node.config.featureColTitle
      : "特权功能";
    const col1Title = (node.config?.col1Title && node.config.col1Title !== "Free" && node.config.col1Title !== "VIP")
      ? node.config.col1Title
      : (isPlus ? "VIP会员" : "普通会员");
    const col2Title = (node.config?.col2Title && node.config.col2Title !== "VIP" && node.config.col2Title !== "VIP+")
      ? node.config.col2Title
      : (isPlus ? "VIP+会员" : "VIP会员");
    const showExpandCaret = node.config?.showExpandCaret !== false;

    return wrap(
      <div className="ht-compare-table-wrapper">
        {/* Column 3 Continuous Rounded Vertical Highlight Pill */}
        <div className={`ht-col-highlight-backdrop ${isPlus ? "dark-purple" : "light-gold"}`} />

        <div className="ht-compare-table-grid">
          {/* Header Row */}
          <div className="ht-table-header-row">
            <div className={`ht-th-feature ${isPlus ? "dark" : "light"}`}>
              {featureColTitle}
            </div>
            <div className={`ht-th-col1 ${isPlus ? "dark" : "light"}`}>
              {col1Title}
            </div>
            <div className={`ht-th-col2 ${isPlus ? "plus-text" : "gold-text"}`}>
              {col2Title}
            </div>
          </div>

          {/* Data Rows */}
          <div className="ht-table-body">
            {items.map((item, idx) => (
              <div key={item.id || idx} className="ht-table-row">
                {/* Feature Name Col */}
                <div className={`ht-td-feature ${isPlus ? "dark" : "light"}`}>
                  <span>{item.name}</span>
                  {showExpandCaret && <ChevronDown size={11} style={{ opacity: 0.6, flexShrink: 0 }} />}
                </div>

                {/* Col 1 */}
                <div className={`ht-td-col1 ${isPlus ? "dark" : "light"}`}>
                  {item.col1Type === "lock" || item.col1Val === "🔒" ? (
                    <Lock size={12} color="#94A3B8" />
                  ) : (
                    <span>{item.col1Val}</span>
                  )}
                </div>

                {/* Col 2 (Highlighted Pill) */}
                <div className={`ht-td-col2 ${isPlus ? "dark" : "light"}`}>
                  {item.col2Type === "check" || item.col2Val === "✓" ? (
                    <div className={isPlus ? "ht-check-badge-purple" : "ht-check-badge-orange"}>
                      <Check size={11} strokeWidth={3.5} />
                    </div>
                  ) : (
                    <span>{item.col2Val}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }


  if (node.type === "Products") {
    const isComparePage = currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare" || node.id === "products";
    if (isComparePage && (currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare")) {
      const isPlus = activeCompareTab === 1;
      const defaultTiers = [
        { name: "1个月", price: "¥78", sub: "¥78/月", isRecommended: false },
        { name: "12个月", price: "¥488", sub: "¥40.6/月", badge: "最受欢迎", isRecommended: true },
        { name: "终身", price: "¥998", sub: "原价 ¥1698", isRecommended: false },
      ];
      const tiers = Array.isArray(node.config?.tiers) && node.config.tiers.length > 0
        ? node.config.tiers.map((t) => ({
            name: t.name || "",
            price: t.monthly || t.price || "",
            sub: (t.total || t.sub || "").replace("$", "¥"),
            badge: t.badge || "",
          }))
        : defaultTiers;
      const curSelected = selectedTier !== undefined ? selectedTier : 1;

      return wrap(
        <div className="ht-compare-products-row">
          {tiers.map((t, idx) => {
            const isSel = idx === curSelected;
            return (
              <div
                key={idx}
                className={`ht-product-card-col ${
                  isSel
                    ? (isPlus ? "dark-selected" : "light-selected")
                    : (isPlus ? "dark-unselected" : "light-unselected")
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTier(idx);
                }}
              >
                {isSel && (
                  <div className={`ht-card-attached-badge ${isPlus ? "dark-neon" : "light-orange"}`}>
                    {t.badge || "最受欢迎"}
                  </div>
                )}
                <div className="ht-card-duration-title">{t.name}</div>
                <div className="ht-card-main-price">{t.price}</div>
                <div className="ht-card-sub-price">{t.sub}</div>
              </div>
            );
          })}
        </div>
      );
    }
    const effectiveVariant =
      node.config?.variant ||
      (node.config?.listTiers || node.label === "纵向套餐列表"
        ? "vertical-list-tiers"
        : node.id === "trial-t1-products" || node.label === "产品双套餐"
        ? "onboarding-dual-tiers"
        : (node.label === "特惠价格" || node.id === "t1-products" || node.id === "t2-products")
        ? "entry-price-tier"
        : "3-column-tiers");

    if (effectiveVariant === "onboarding-dual-tiers") {
      const curSelected = selectedOnboardingTier ?? 0;
      return wrap(
        <div className="ht-dual-tiers-container">
          {/* Tier 0: 12个月 */}
          <div
            className={`ht-tier-card ${curSelected === 0 ? "selected" : "unselected"}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectOnboardingTier?.(0);
            }}
          >
            <div className="ht-tier-badge-pill">免费试用</div>
            <div className="ht-tier-content-row">
              <div className="ht-tier-col-left">
                <span className="ht-tier-title-main">12个月</span>
                <span className="ht-tier-price-sub">¥488</span>
              </div>
              <div className="ht-tier-col-right">
                <span className="ht-tier-price-main">¥40.67/月</span>
                <span className="ht-tier-discount-pill">48%OFF</span>
              </div>
            </div>
          </div>

          {/* Tier 1: 月费会员 */}
          <div
            className={`ht-tier-card ${curSelected === 1 ? "selected" : "unselected-gray"}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectOnboardingTier?.(1);
            }}
          >
            {curSelected === 1 && <div className="ht-tier-badge-pill">直接购买</div>}
            <div className="ht-tier-content-row">
              <div className="ht-tier-col-left">
                <span className="ht-tier-title-main">月费会员</span>
              </div>
              <div className="ht-tier-col-right">
                <span className="ht-tier-price-main">¥78.00月</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (effectiveVariant === "3-column-tiers") {
      const tiers = node.config?.tiers || [
        { name: "1 个月", monthly: "¥78", total: "¥78/ 月", badge: "", save: "", isRecommended: false },
        { name: "12 个月", monthly: "¥388", originalPrice: "¥488", total: "¥388", badge: "🔥 8折", save: "节省 59%", isRecommended: true },
        { name: "终身", monthly: "¥798", originalPrice: "¥1698", total: "¥798", badge: "🔥 4.8折", save: "永久会员权益", isRecommended: false },
      ];
      const curSelected = selectedTier < tiers.length ? selectedTier : (tiers.findIndex(t => t.isRecommended) >= 0 ? tiers.findIndex(t => t.isRecommended) : 1);
      const isPurpleTheme = currentTemplate?.id === "ht-vip-pop" || node.config?.themeColor === "purple" || (!themeConfig?.primaryColor && !themeConfig?.subTemplate);
      const themePrimary = isPurpleTheme ? "#7C5CFC" : (themeConfig?.primaryColor || (themeConfig?.subTemplate === "pkg-tpl-2" ? "#F59E0B" : "#0284C7"));
      const isWarm = !isPurpleTheme && (themeConfig?.subTemplate === "pkg-tpl-2" || themePrimary === "#F59E0B");

      return wrap(
        <div className="preview-products-3col">
          {tiers.map((t, idx) => {
            const isSel = idx === curSelected;
            return (
              <div
                key={idx}
                className={`tier-col-card ${isSel ? (isPurpleTheme ? "purple-selected" : isWarm ? "warm-selected" : "selected") : ""}`}
                style={isPurpleTheme && isSel ? { borderColor: "#7C5CFC", background: "#F5F3FF" } : {}}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTier(idx);
                }}
              >
                {t.badge && (
                  <div
                    className={`tier-col-badge ${isPurpleTheme ? "purple" : isWarm ? "warm" : ""}`}
                    style={isPurpleTheme ? { background: isSel ? "#7C5CFC" : "rgba(124, 92, 252, 0.12)", color: isSel ? "#fff" : "#7C5CFC" } : {}}
                  >
                    {t.badge}
                  </div>
                )}
                <div className="tier-col-name">{t.name}</div>
                {t.originalPrice && (
                  <div className="tier-col-orig">{t.originalPrice}</div>
                )}
                {t.save && (
                  <div className="tier-col-save">{t.save}</div>
                )}
                <div className="tier-col-price">
                  <strong>{t.monthly}</strong>
                </div>
                {t.total && !t.originalPrice && (
                  <div className="tier-col-total">{t.total}</div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    if (effectiveVariant === "entry-price-tier") {
      const otherColor = themeConfig?.otherColor || (themeConfig?.subTemplate === "tpl-2" ? "#F59E0B" : "#DE6876");
      const mainFontColor = themeConfig?.mainFontColor || "#2D1832";
      const priceNow = node.config?.priceNow || themeConfig?.priceNow || "折扣价 ¥388/年";
      const priceOriginal = node.config?.priceOriginal || themeConfig?.priceOriginal || "原价 ¥488/年";

      const isCardMode = node.config?.displayMode === "card";
      // 模板 1 (全屏平铺版 / 极简纯文本): 极简纯文本，左对齐，无外框卡片
      if (!isCardMode && (node.config?.displayMode === "clean-text" || themeConfig?.subTemplate === "tpl-1" || node.id === "t1-products")) {
        return wrap(
          <div style={{ textAlign: "left", margin: "6px 0 16px" }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#3D2E3F", marginBottom: 3, letterSpacing: "-0.01em" }}>
              {priceOriginal}
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: otherColor, letterSpacing: "-0.02em" }}>
              {priceNow}
            </div>
          </div>
        );
      }

      const promoBadge = themeConfig?.promoText || node.config?.promoBadge || "限时特惠";
      const priceSub = themeConfig?.priceSub || node.config?.priceSub || "仅 ¥0.35/天 · 新客立省 20% · 随时取消";
      const discountTag = node.config?.discountTag || "-20% 折扣";

      return wrap(
        <div
          style={{
            position: "relative",
            background: "#FFFFFF",
            borderRadius: 14,
            padding: "16px 14px 14px",
            border: `2px solid ${otherColor}50`,
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            margin: "4px 0 10px",
          }}
        >
          {promoBadge && (
            <div
              style={{
                position: "absolute",
                top: -11,
                right: 14,
                background: otherColor,
                color: "#FFFFFF",
                fontSize: 10,
                fontWeight: 800,
                padding: "2px 10px",
                borderRadius: 12,
                boxShadow: `0 2px 8px ${otherColor}50`,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Flame size={11} />
              <span>{promoBadge}</span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#64748b", letterSpacing: "0.02em", marginBottom: 2 }}>
                限时专属特惠
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: otherColor, letterSpacing: "-0.03em" }}>
                  {priceNow}
                </span>
                <span style={{ fontSize: 13, textDecoration: "line-through", color: mainFontColor, opacity: 0.45 }}>
                  {priceOriginal}
                </span>
              </div>
            </div>
            <div
              style={{
                background: `${otherColor}15`,
                color: otherColor,
                padding: "4px 8px",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              {discountTag}
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, fontWeight: 500 }}>
            {priceSub}
          </div>
        </div>
      );
    }

    const tiers = getVerticalListTiers(node);
    return wrap(
      <div className="preview-products-tiered">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`tier-card ${idx === selectedTier ? "selected" : ""}`}
            onClick={(e) => { e.stopPropagation(); setSelectedTier(idx); }}
          >
            <div className="tier-radio">
              <div className={`radio-circle ${idx === selectedTier ? "checked" : ""}`} />
            </div>
            <div className="tier-info">
              <div className="tier-name-row">
                <strong className="tier-title">{tier.name}</strong>
                {tier.tag && <span className="tier-pill">{tier.tag}</span>}
              </div>
              {tier.daily && <span className="tier-daily">{tier.daily}</span>}
            </div>
            <div className="tier-price-box">
              <span className="tier-price">{tier.price}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (node.type === "Toggle") {
    if (node.config?.variant === "trial-timeline" || node.id === "trial-t1-timeline" || node.label === "3天试用时间轴" || node.label?.includes("试用时间轴")) {
      let steps = [
        { day: "今天", title: "开始试用", icon: "crown" },
        { day: "第2天", title: "即将结束通知", icon: "bell" },
        { day: "第3天", title: "试用结束", icon: "clock" },
      ];
      if (Array.isArray(node.config?.steps) && node.config.steps.length > 0) {
        steps = node.config.steps;
      } else if (node.content) {
        const lines = node.content.split("\n").filter(Boolean);
        if (lines.length >= 3) {
          steps = lines.slice(0, 3).map((l, idx) => {
            const [day = `第${idx + 1}阶段`, title = `阶段${idx + 1}`] = l.split("|");
            return {
              day: day.trim(),
              title: title.trim(),
              icon: idx === 0 ? "crown" : idx === 1 ? "bell" : "clock",
            };
          });
        }
      }

      return wrap(
        <div className="ht-trial-timeline">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="ht-timeline-step">
                <div className="ht-timeline-step-icon">
                  {step.icon === "bell" ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#6144e8">
                      <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" />
                    </svg>
                  ) : step.icon === "clock" ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#6144e8">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" />
                    </svg>
                  ) : step.icon === "check" ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#6144e8">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#6144e8">
                      <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V17H19V19Z" />
                    </svg>
                  )}
                </div>
                <div className="ht-timeline-step-title">{step.title}</div>
                <div className="ht-timeline-step-day">{step.day}</div>
              </div>
              {idx < steps.length - 1 && <div className="ht-timeline-divider" />}
            </React.Fragment>
          ))}
        </div>
      );
    }

    const [title = "免费试用 7 天", sub = "到期前随时可取消"] = (node.content || "").split("|");
    return wrap(
      <div className="preview-trial-toggle" onClick={(e) => { e.stopPropagation(); setToggleOn(!toggleOn); }}>
        <div className="toggle-text">
          <strong>{title}</strong>
          <small>{sub}</small>
        </div>
        <div className={`toggle-track ${toggleOn ? "active" : ""}`}>
          <div className="toggle-thumb" />
        </div>
      </div>
    );
  }

  if (node.type === "Purchase Button") {
    const isComparePage = currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare" || node.id === "purchase";
    if (isComparePage && (currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare")) {
      const isPlus = activeCompareTab === 1;
      return wrap(
        <button
          type="button"
          className={`ht-compare-purchase-btn ${isPlus ? "dark-theme" : "light-theme"}`}
          onClick={(e) => {
            e.stopPropagation();
            notify?.(isPlus ? "已触发 VIP+ 旗舰会员订阅结账流程" : "已触发 VIP 会员订阅结账流程");
          }}
        >
          {node.content || "升级 VIP"}
        </button>
      );
    }
    if (node.id?.includes("cp") || currentTemplate?.id === "ht-content-paywall") {
      const color = node.config?.color || themeConfig?.btnColor || "#6C3EDE";
      const text = node.content || themeConfig?.btnText || "立即续订";
      return wrap(
        <div style={{ margin: "14px 0 4px", padding: "0 2px" }}>
          <button
            type="button"
            style={{
              width: "100%",
              padding: "11px 0",
              background: color,
              color: "#FFFFFF",
              border: "none",
              borderRadius: 24,
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: `0 4px 14px ${color}40`,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span>{text}</span>
              {node.config?.subtitle && (
                <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.9 }}>
                  {node.config.subtitle}
                </span>
              )}
            </div>
          </button>
        </div>
      );
    }
    if (isOnboardingPage) {
      const isTrialTier = selectedOnboardingTier === 0;
      const btnText = isTrialTier
        ? (node.content || themeConfig?.btnText || "开启3天 VIP免费试用")
        : (themeConfig?.btnTextAlt || "继续");
      const btnColor = node.config?.color || themeConfig?.btnColor || "#6144e8";
      const btnTextColor = themeConfig?.btnTextColor || "#FFFFFF";

      return wrap(
        <div className="preview-cta-wrap" style={{ margin: "10px 0 4px" }}>
          <button
            type="button"
            className="preview-cta-button"
            style={{
              width: "100%",
              minHeight: 50,
              padding: "10px 16px",
              background: btnColor,
              color: btnTextColor,
              border: "none",
              borderRadius: 26,
              fontSize: 16,
              fontWeight: 800,
              boxShadow: `0 6px 18px rgba(97, 68, 232, 0.32)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span>{btnText}</span>
          </button>
        </div>
      );
    }

    if (themeConfig) {
      const isTpl1 = themeConfig.subTemplate === "tpl-1" || node.id === "t1-purchase";
      const otherColor =
        node.config?.color ||
        themeConfig.btnColor ||
        (isTpl1 ? "#C85B6B" : themeConfig.otherColor) ||
        (themeConfig.subTemplate === "tpl-2" || themeConfig.subTemplate === "pkg-tpl-2"
          ? "#F59E0B"
          : themeConfig.subTemplate === "pkg-tpl-1"
          ? "#0284C7"
          : "#DE6876");
      const btnTextColor = themeConfig.btnTextColor || "#FFFFFF";
      const btnText = node.content || themeConfig.btnText || "继续";
      const showArrow = node.config?.showArrow === true && !isTpl1;

      return wrap(
        <div className="preview-cta-wrap" style={{ margin: "6px 0 10px" }}>
          <button
            className="preview-cta-button"
            style={{
              width: "100%",
              minHeight: 48,
              padding: "8px 16px",
              background: otherColor,
              color: btnTextColor,
              border: "none",
              borderRadius: 24,
              fontSize: 17,
              fontWeight: 800,
              boxShadow: `0 4px 14px ${otherColor}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span>{btnText}</span>
                {showArrow && <ArrowRight size={16} strokeWidth={2.5} />}
              </span>
              {node.config?.subtitle && (
                <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.9 }}>
                  {node.config.subtitle}
                </span>
              )}
            </div>
          </button>
        </div>
      );
    }

    const customBtnColor = node.config?.color || (currentTemplate?.id === "ht-vip-pop" ? "#7C5CFC" : null);
    if (customBtnColor) {
      return wrap(
        <div className="preview-cta-wrap" style={{ margin: "10px 0 6px" }}>
          <button
            type="button"
            className="preview-cta-button"
            style={{
              width: "100%",
              minHeight: 48,
              padding: "10px 16px",
              background: customBtnColor,
              color: "#FFFFFF",
              border: "none",
              borderRadius: 24,
              fontSize: 16.5,
              fontWeight: 800,
              boxShadow: `0 6px 18px ${customBtnColor}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span className="cta-main-title">{node.content || "领取 8折优惠"}</span>
              {node.config?.subtitle && <span className="cta-sub-title" style={{ fontSize: 10, opacity: 0.9 }}>{node.config.subtitle}</span>}
            </div>
          </button>
        </div>
      );
    }

    return wrap(
      <div className="preview-cta-wrap">
        <button className="preview-cta-button">
          <span className="cta-main-title">{node.content || "立即开启试用"}</span>
          {node.config?.subtitle && <span className="cta-sub-title">{node.config.subtitle}</span>}
        </button>
      </div>
    );
  }

  if (node.type === "Dismiss Button") {
    if (currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare") {
      return null;
    }
    if (isOnboardingPage && themeConfig?.showDismissBtn === false) {
      return null;
    }

    const variant = node.config?.variant || (node.content === "✕" ? "close-icon" : "text-link");
    const pos = node.config?.position || (variant === "circle-close" ? "top-right" : (variant === "text-link" ? "center" : "top-left"));
    const justify = pos === "top-right" ? "flex-end" : pos === "center" ? "center" : "flex-start";

    // 1. ✕ 圆形 (半窗)
    if (variant === "circle-close") {
      return wrap(
        <div style={{ display: "flex", justifyContent: justify, margin: "0 0 6px", padding: "0 2px" }}>
          <button
            type="button"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#F1F5F9",
              color: "#64748B",
              border: "1px solid rgba(0,0,0,0.06)",
              padding: 0,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
            title="关闭"
          >
            <X size={15} strokeWidth={2.4} />
          </button>
        </div>
      );
    }

    // 2. ✕ 图标 (全屏)
    if (variant === "close-icon" || node.content === "✕") {
      return wrap(
        <div style={{ display: "flex", justifyContent: justify, margin: "0 0 6px", padding: "0 2px" }}>
          <button
            type="button"
            style={{
              background: "transparent",
              border: "none",
              padding: 4,
              cursor: "pointer",
              color: node.config?.color || themeConfig?.mainFontColor || "#1E293B",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="关闭"
          >
            <X size={20} strokeWidth={2.4} />
          </button>
        </div>
      );
    }

    // 3. 纯文本链接
    return wrap(
      <div style={{ display: "flex", justifyContent: justify, padding: "4px 2px 8px" }}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isOnboardingPage) {
              onTriggerRetainModal?.();
            }
          }}
          style={{
            background: "transparent",
            border: "none",
            color: node.config?.color || "#94a3b8",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 500,
            textDecoration: isOnboardingPage ? "none" : "underline",
            textUnderlineOffset: "3px",
            textDecorationColor: "#cbd5e1",
          }}
        >
          {node.content || themeConfig?.dismissBtnText || "不，谢谢"}
        </button>
      </div>
    );
  }

  if (node.type === "Legal Footer" || node.type === "Links") {
    const isComparePage = currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare" || node.id === "links";
    if (isComparePage && (currentTemplate?.id === "ht-switch-compare" || currentTemplate?.id === "ht-tier-compare")) {
      const isPlus = activeCompareTab === 1;
      return wrap(
        <div className={`ht-compare-legal-footer ${isPlus ? "dark-theme" : "light-theme"}`}>
          如果当前缴费期限24小时没有取消续订，系统会自动续订，费用将从你的iTunes账户收取，你可随时前往iTunes商店的设置界面管理自己的订阅设定。有关详细信息，请访问我们的<strong>服务条款</strong>及<strong>隐私政策</strong>
        </div>
      );
    }
    if (isOnboardingPage) {
      const legalText = node.content || "免费3天试用后,系统会以¥488自动续订,可随时取消。费用将从你的iTunes账户收取,你可随时前往iTunes商店的设置界面管理自己的订阅设定。有关详细信息,请访问我们的[服务条款]及[隐私政策]";
      return wrap(
        <div className="preview-legal-footer" style={{ textAlign: "center", padding: "4px 10px 16px" }}>
          <p className="legal-disclaimer" style={{ color: "#9ca3af", fontSize: 9.5, lineHeight: 1.45, margin: 0 }}>
            {legalText}
          </p>
        </div>
      );
    }

    // 模板 1 (全屏平铺版 / 真实 App 原版图三): "可随时取消" + 完整 iTunes 扣费协议
    if (themeConfig?.subTemplate === "tpl-1" || node.id === "t1-links" || node.config?.variant === "entry-legal") {
      const parts = (node.content || "").split("\n");
      const title = parts[0] || "可随时取消";
      const desc = parts.slice(1).join("\n") || "如果当前缴费期前24小时没有取消续订，系统会自动续订，费用将从你的 iTunes 账户收取，你可随时前往 iTunes 商店的设置界面管理自己的订阅设定。有关详细信息，请访问我们的 [服务条款] 及 [隐私政策]";
      return wrap(
        <div className="preview-legal-footer" style={{ textAlign: "center", padding: "8px 4px 18px" }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "#9E8E96", marginBottom: 5 }}>
            {title}
          </div>
          <p style={{ color: "#B5A8AF", fontSize: 9.5, lineHeight: 1.45, margin: 0 }}>
            {desc}
          </p>
        </div>
      );
    }

    if (themeConfig) {
      const disclaimerColor = themeConfig.disclaimerColor || "#94a3b8";
      return wrap(
        <div className="preview-legal-footer" style={{ textAlign: "center", padding: "4px 8px 12px" }}>
          <p className="legal-disclaimer" style={{ color: disclaimerColor, fontSize: 10, lineHeight: 1.4, margin: "0 0 4px" }}>
            {node.content || "确认购买即表示同意服务协议。订阅将自动续订，可随时在 iTunes 设置中取消。"}
          </p>
          <div className="legal-links" style={{ color: disclaimerColor, fontSize: 10, display: "flex", justifyContent: "center", gap: 6 }}>
            <span>服务条款</span>
            <span>·</span>
            <span>隐私政策</span>
            <span>·</span>
            <span>恢复购买</span>
          </div>
        </div>
      );
    }

    return wrap(
      <div className="preview-legal-footer" style={{ textAlign: "center", padding: "4px 8px 12px" }}>
        <p className="legal-disclaimer" style={{ color: "#94a3b8", fontSize: 9.5, lineHeight: 1.45, margin: "0 0 4px" }}>
          {node.content || "试用期结束前可随时在 App Store 取消，不收取任何费用"}
        </p>
        {node.config?.showLinks !== false && !node.content?.includes("服务条款") && (
          <div className="legal-links" style={{ color: "#94a3b8", fontSize: 10, display: "flex", justifyContent: "center", gap: 6 }}>
            <span>服务条款</span>
            <span>·</span>
            <span>隐私政策</span>
            <span>·</span>
            <span>恢复购买</span>
          </div>
        )}
      </div>
    );
  }

  if (node.type === "Hero Image") {
    const bgMode = node.config?.bgMode;

    if (bgMode === "image" || node.config?.customBgImage || node.config?.variant === "media-placeholder" || node.id === "pop-hero") {
      const customImg = node.config?.customBgImage || node.config?.imageUrl;
      return wrap(
        <div
          style={{
            width: "100%",
            height: 145,
            borderRadius: 12,
            background: customImg ? `url("${customImg}") center/cover no-repeat` : "#E2E8F0",
            margin: "4px 0 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#94A3B8",
            fontSize: 12,
            fontWeight: 600,
            border: customImg ? "none" : "1px solid #CBD5E1",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {!customImg && <span>媒体 / 背景图展示区</span>}
        </div>
      );
    }

    if (bgMode === "gradient" || node.config?.gradientBg) {
      const grad = node.config?.gradientBg || "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)";
      return wrap(
        <div
          style={{
            width: "100%",
            height: 110,
            borderRadius: 12,
            background: grad,
            margin: "4px 0 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 13,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Sparkles size={16} style={{ marginRight: 6 }} />
          <span>{node.config?.sloganText || node.content || "HelloTalk VIP 特权俱乐部"}</span>
        </div>
      );
    }

    if (bgMode === "illustration" || node.config?.sloganText || node.config?.themeColor || node.config?.bubbleBg) {
      const slogan = node.config?.sloganText || "寻找身边母语者";
      const bubbleBg = node.config?.bubbleBg || "#2563eb";
      const themeKey = node.config?.themeColor || "orange";
      const themeGradientMap = {
        orange: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
        gold: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
        blue: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
        purple: "linear-gradient(135deg, #831843 0%, #ec4899 100%)",
      };
      const cardBg = themeGradientMap[themeKey] || themeGradientMap.orange;

      return wrap(
        <div
          style={{
            width: "100%",
            padding: "16px 14px",
            borderRadius: 12,
            background: cardBg,
            margin: "4px 0 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: bubbleBg,
              borderRadius: 20,
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 700,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <span style={{ fontSize: 14 }}>🌍</span>
            <span>{slogan}</span>
          </div>
        </div>
      );
    }

    if (themeConfig) {
      const isTpl2 = themeConfig.subTemplate === "tpl-2";
      const otherColor = themeConfig.otherColor || (isTpl2 ? "#F59E0B" : "#FF4D6D");
      return wrap(
        <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
          {isTpl2 ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "8px 14px",
                background: "rgba(255,255,255,0.92)",
                borderRadius: 20,
                boxShadow: "0 4px 12px rgba(245,158,11,0.18)",
              }}
            >
              <div style={{ display: "flex", marginRight: 4 }}>
                <span style={{ fontSize: 18, marginLeft: -4 }}>🇺🇸</span>
                <span style={{ fontSize: 18, marginLeft: -4 }}>🇯🇵</span>
                <span style={{ fontSize: 18, marginLeft: -4 }}>🇪🇸</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: otherColor }}>
                寻找身边母语者
              </span>
            </div>
          ) : (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 14px",
                borderRadius: 20,
                background: `${otherColor}18`,
                color: otherColor,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.02em",
              }}
            >
              <Sparkles size={13} />
              <span>HelloTalk VIP 特权俱乐部</span>
            </div>
          )}
        </div>
      );
    }

    return wrap(
      <div className="preview-hero-container">
        <div className="hero-glow-badge">
          <Sparkles size={14} /> HelloTalk VIP Club
        </div>
      </div>
    );
  }

  if (node.type === "Text") {
    if (node.config?.variant === "safety-pill") {
      const pillText = (onboardingCarouselSlide % 3 === 2)
        ? "ⓘ 可随时在 App Store 取消"
        : (node.content || "ⓘ 订阅可随时取消，无需支付任何费用");
      return wrap(
        <div className="ht-safety-pill">
          <span>{pillText}</span>
        </div>
      );
    }
    if (node.config?.variant === "safety-note") {
      return wrap(
        <div className="ht-safety-note">
          {node.content || "订阅可随时取消，无需支付任何费用"}
        </div>
      );
    }
    return wrap(
      <div style={{ textAlign: "center", fontSize: 11, color: "#64748b", margin: "4px 0" }}>
        {renderInterpolated(node.content)}
      </div>
    );
  }

  return wrap(<div style={{ padding: "6px 0", fontSize: 11 }}>{node.content || node.type}</div>);
}

function BuilderProperties({
  active,
  setBuilderTab,
  markUnknown,
  boundary,
  templateLinks,
  setTemplateLinks,
  updateNode,
  removeNode,
  addNestedNode,
  notify,
  isOnboardingPage,
  activeSubTemplate,
  updateSubTemplateTheme,
  onTriggerRetainModal,
  onSwitchSubTemplate,
  activeCompareTab = 0,
  setActiveCompareTab,
  onboardingCarouselSlide = 0,
  setOnboardingCarouselSlide,
  simulatedUserId,
  setSimulatedUserId,
  currentSimulatedUser,
}) {

  const [tab, setTab] = useState("content");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    setIsEditingName(false);
    setTempName("");
  }, [active?.id]);

  if (!active) {
    return (
      <div className="property-scroll" style={{ padding: "40px 20px", textAlign: "center", color: "#94a3b8" }}>
        <Sliders size={36} style={{ marginBottom: 12, opacity: 0.4, color: "#6366f1" }} />
        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#475569", margin: "0 0 6px" }}>未选中组件</h4>
        <p style={{ fontSize: 11, lineHeight: 1.6, margin: 0, color: "#94a3b8" }}>
          请在左侧「组件树与图层」或中间「iPhone 画布」点击任意组件，即可在此直接配置其文案、样式与业务参数。
        </p>
      </div>
    );
  }
  const type = active.type;
  const category = getNodeCategory(active);
  const subRole = getNodeSubRole(active);

  const currentTextRole = (() => {
    if (active.type === "Subhead" || subRole === "副标题") return "Subhead";
    if (active.type === "Header" || subRole === "主标题") return "Header";
    if (active.type === "Badge Tag" || subRole === "徽标标签") return "Badge Tag";
    if (active.type === "User Profile" || subRole === "用户画像") return "User Profile";
    if (active.type === "Language Chips" || subRole === "语言标签") return "Language Chips";
    if (active.type === "Legal Footer" || active.type === "Links" || subRole === "免责声明") return "Legal Footer";
    if (active.type === "Text" || subRole === "正文段落") return "Text";
    return active.type || "Text";
  })();

  const currentTextRoleLabel = {
    Header: "主标题",
    Subhead: "副标题",
    Text: "正文段落",
    "Badge Tag": "徽标标签",
    "User Profile": "用户画像",
    "Language Chips": "语言标签",
    "Legal Footer": "免责声明",
  }[currentTextRole] || subRole;

  // 2. 对比与时间轴 (Comparison, Timeline & Metrics)
  const currentCompareRole = (() => {
    if (active.type === "Dynamic Metrics" || active.id?.includes("metrics") || subRole === "动态指标") return "Dynamic Metrics";
    if (active.config?.variant === "trial-timeline" || active.id?.includes("timeline") || subRole === "3天试用时间轴") return "Trial Timeline";
    if (active.type === "Comparison Table" || subRole === "对比表格") return "Comparison Table";
    return "Dynamic Metrics";
  })();

  const currentCompareRoleLabel = {
    "Comparison Table": "对比表格",
    "Trial Timeline": "3天试用时间轴",
    "Dynamic Metrics": "动态指标",
  }[currentCompareRole] || "动态指标";

  // 3. 操作按钮 (Action Buttons)
  const currentActionRole = (() => {
    if (active.type === "Dismiss Button" || subRole === "关闭按钮") return "Dismiss Button";
    if (active.type === "Purchase Button" || subRole === "购买按钮") return "Purchase Button";
    if (active.type === "Switch Tabs" || subRole === "切换标签") return "Switch Tabs";
    if (active.type === "Toggle" || subRole === "开关选项") return "Toggle";
    return active.type || "Purchase Button";
  })();

  const currentActionRoleLabel = {
    "Purchase Button": "购买按钮",
    "Dismiss Button": "关闭按钮",
    "Switch Tabs": "切换标签",
    "Toggle": "开关选项",
  }[currentActionRole] || subRole;

  // 4. 核心特权 (Benefit List)
  const currentBenefitRole = (() => {
    if (active.config?.variant === "onboarding-3slides" || active.id === "trial-t2-carousel" || subRole === "3页引导轮播") return "onboarding-3slides";
    if (active.type === "Carousel Cards" || active.config?.variant === "carousel" || subRole === "卡片轮播") return "carousel";
    if (active.config?.variant === "grid-matrix" || active.config?.styleVariant === "grid" || subRole === "双列网格") return "grid-matrix";
    if (active.config?.variant === "onboarding-privilege-card" || active.config?.styleVariant === "cards" || subRole === "圆角大卡") return "onboarding-privilege-card";
    return "entry-checks";
  })();

  const currentBenefitRoleLabel = {
    "carousel": "卡片轮播",
    "onboarding-3slides": "3页引导轮播",
    "entry-checks": "打勾清单",
    "grid-matrix": "双列网格",
    "onboarding-privilege-card": "圆角大卡",
  }[currentBenefitRole] || "打勾清单";

  // 5. 背景图 (Hero Image & Mascot)
  const currentBgRole = (() => {
    if (active.type === "Mascot Illustration" || active.config?.bgMode === "mascot" || subRole === "吉祥物插画") return "mascot";
    if (active.config?.bgMode === "image" || subRole === "自定义图片") return "image";
    if (active.config?.bgMode === "gradient" || subRole === "渐变底色") return "gradient";
    return "illustration";
  })();

  const currentBgRoleLabel = {
    illustration: "原生插画",
    mascot: "吉祥物插画",
    image: "自定义图片",
    gradient: "渐变底色",
  }[currentBgRole] || "原生插画";

  // 6. 倒计时 (Timer)
  const currentTimerRole = active.config?.variant || (subRole === "极简纯文本" ? "clean-text" : subRole === "胶囊提示条" ? "badge-pill" : "card");
  const currentTimerRoleLabel = {
    "clean-text": "极简纯文本",
    "card": "色块数字框",
    "badge-pill": "胶囊提示条",
  }[currentTimerRole] || "色块数字框";

  const effectiveProductsVariant =
    active.config?.variant ||
    (active.config?.listTiers || active.label === "纵向套餐列表"
      ? "vertical-list-tiers"
      : active.id === "trial-t1-products" || active.label === "产品双套餐"
      ? "onboarding-dual-tiers"
      : (active.label === "特惠价格" || active.id === "t1-products" || active.id === "t2-products")
      ? "entry-price-tier"
      : "3-column-tiers");

  const currentProductsRoleLabel = {
    "3-column-tiers": "横向三列",
    "onboarding-dual-tiers": "双套餐",
    "vertical-list-tiers": "纵向列表",
    "entry-price-tier": "特惠价格",
  }[effectiveProductsVariant] || "横向三列";

  const handleProductVariantSwitch = (targetVariant) => {
    const nextConfig = {
      ...(active.config || {}),
      variant: targetVariant,
    };
    if (targetVariant === "3-column-tiers" && !nextConfig.tiers) {
      nextConfig.tiers = [
        { name: "3个月", monthly: "¥37.33/月", total: "总价 ¥112", period: "3个月", badge: "", save: "" },
        { name: "12个月", monthly: "¥24.99/月", total: "总价 ¥298", period: "12个月", badge: "推荐", save: "省54%", isRecommended: true },
        { name: "终身", monthly: "¥798", total: "一次性购买", period: "终身", badge: "", save: "永久有效" },
      ];
    } else if (targetVariant === "onboarding-dual-tiers" && !nextConfig.tiers) {
      nextConfig.tiers = [
        { name: "12个月", monthly: "¥40.67/月", total: "总价 ¥488", discount: "48%OFF", badge: "免费试用", hasTrial: true },
        { name: "月费会员", monthly: "¥78.00/月", total: "按月扣费", discount: "", badge: "直接购买", hasTrial: false },
      ];
    } else if (targetVariant === "entry-price-tier") {
      if (!nextConfig.priceNow) nextConfig.priceNow = "折扣价 ¥388/年";
      if (!nextConfig.priceOriginal) nextConfig.priceOriginal = "原价 ¥488/年";
    } else if (targetVariant === "vertical-list-tiers" && !nextConfig.listTiers) {
      nextConfig.listTiers = [
        { name: "连续包年 VIP", price: "¥198/年", daily: "¥0.54/天", tag: "推荐", isDefault: true },
        { name: "连续包月 VIP", price: "¥28/月", daily: "¥0.93/天", tag: "月付", isDefault: false },
      ];
    }
    updateNode(active.id, {
      config: nextConfig,
      label: `产品套餐 (${targetVariant === "3-column-tiers" ? "横向三列" : targetVariant === "onboarding-dual-tiers" ? "双套餐" : targetVariant === "vertical-list-tiers" ? "纵向列表" : "特惠价格"})`,
    });
    notify?.(`已切换产品套餐形态为：${targetVariant === "3-column-tiers" ? "横向三列" : targetVariant === "onboarding-dual-tiers" ? "双套餐" : targetVariant === "vertical-list-tiers" ? "纵向列表" : "特惠价格"}`);
  };

  const insertVariable = (variable) => {
    updateNode(active.id, { content: (active.content ?? "") + `${variable}` });
  };
  const insertJinja = insertVariable;

  return (
    <div className="property-scroll">
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4f46e5",
              flexShrink: 0
            }}>
              {category === "核心特权" ? <Sparkles size={15} /> :
               category === "产品套餐" ? <CreditCard size={15} /> :
               category === "文本与排版" ? <Type size={15} /> :
               category === "背景图" ? <ImageIcon size={15} /> :
               category === "操作按钮" ? <MousePointer size={15} /> :
               category === "倒计时" ? <Clock size={15} /> : <BarChart3 size={15} />}
            </div>
            <div>
              {isEditingName ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    value={tempName}
                    autoFocus
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={() => {
                      if (tempName.trim()) {
                        updateNode(active.id, { customName: tempName.trim(), label: tempName.trim() });
                        notify?.(`已重命名为: ${tempName.trim()}`);
                      }
                      setIsEditingName(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (tempName.trim()) {
                          updateNode(active.id, { customName: tempName.trim(), label: tempName.trim() });
                          notify?.(`已重命名为: ${tempName.trim()}`);
                        }
                        setIsEditingName(false);
                      } else if (e.key === "Escape") {
                        setIsEditingName(false);
                      }
                    }}
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      padding: "3px 7px",
                      borderRadius: 4,
                      border: "1px solid #6366f1",
                      outline: "none",
                      width: 140
                    }}
                  />
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
                    {active.customName || category}
                  </h3>
                  <button
                    type="button"
                    title="编辑组件名称"
                    onClick={() => {
                      setTempName(active.customName || category);
                      setIsEditingName(true);
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "3px 5px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: 4,
                      color: "#64748b",
                      cursor: "pointer"
                    }}
                  >
                    <Pencil size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            title={`删除 ${active.customName || category} 组件`}
            onClick={() => {
              removeNode(active.id);
              notify?.(`已删除组件: ${active.customName || category}`);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
              color: "#ef4444",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 6,
              padding: "4px 8px",
              cursor: "pointer",
              flexShrink: 0
            }}
          >
            <Trash2 size={12} /> 删除组件
          </button>
        </div>
      </div>

      <div className="property-tabs">
        <button className={tab === "content" ? "active" : ""} onClick={() => setTab("content")}>内容</button>
        <button className={tab === "style" || tab === "layout" ? "active" : ""} onClick={() => setTab("style")}>样式</button>
      </div>

      {tab === "content" && (
        <>
          {/* ============================================================ */}
          {/* 1. 文本与排版 (Typography & Text)                             */}
          {/* ============================================================ */}
          {category === "文本与排版" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "6px 0 14px", background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>文本与排版角色预设切换</span>
                <span style={{ fontSize: 9.5, color: "#6366f1", background: "#eef2ff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>当前：{currentTextRoleLabel}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
                {[
                  { id: "Header", label: "主标题" },
                  { id: "Subhead", label: "副标题" },
                  { id: "Text", label: "正文段落" },
                  { id: "Badge Tag", label: "徽标标签" },
                  { id: "User Profile", label: "用户画像" },
                  { id: "Language Chips", label: "语言标签" },
                  { id: "Legal Footer", label: "免责声明" },
                ].map((r) => {
                  const isActiveRole = currentTextRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        let newContent = active.content;
                        let newConfig = { ...(active.config || {}) };
                        if (r.id === "Header") {
                          if (!newContent || newContent.length > 60 || newContent.includes("|")) newContent = "HelloTalk VIP 核心专享特权";
                        } else if (r.id === "Subhead") {
                          if (!newContent || newContent.length > 60 || newContent.includes("|")) newContent = "畅享 16 项高阶语言学习特权与专属服务";
                        } else if (r.id === "Text") {
                          if (!newContent || newContent.includes("|")) newContent = "升级 VIP，立享全球母语者无限制畅聊与母语级纠错。";
                        } else if (r.id === "Badge Tag") {
                          newContent = "VIP 特权中心";
                          newConfig.color = newConfig.color || "#6366F1";
                        } else if (r.id === "User Profile") {
                          newContent = "Yeah|DE";
                          newConfig.userName = "Yeah";
                          newConfig.userFlag = "DE";
                        } else if (r.id === "Language Chips") {
                          newContent = "英语|日语|韩语|西语";
                        } else if (r.id === "Legal Footer") {
                          newContent = "服务条款 · 隐私政策 · 恢复购买";
                        }
                        updateNode(active.id, {
                          type: r.id,
                          label: `文本与排版 (${r.label})`,
                          content: newContent,
                          config: newConfig,
                        });
                        notify?.(`已切换文本角色为：${r.label}`);
                      }}
                      style={{
                        padding: "7px 4px",
                        background: isActiveRole ? "#eff6ff" : "#fff",
                        border: isActiveRole ? "2px solid #3b82f6" : "1px solid #cbd5e1",
                        borderRadius: 6,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: isActiveRole ? 700 : 500, color: isActiveRole ? "#1d4ed8" : "#334155" }}>
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 用户实时动态变量 (根据当前访问用户实时匹配) */}
              <div style={{ marginTop: 4, padding: "8px 10px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#166534" }}>
                    ⚡ 用户实时动态变量 (根据当前访问用户实时匹配)
                  </span>
                  <span style={{ fontSize: 9.5, background: "#dcfce7", color: "#15803d", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>
                    实时千人千面
                  </span>
                </div>

                {/* 模拟访客画像切换 */}
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, color: "#15803d", fontWeight: 700, flexShrink: 0 }}>模拟访客:</span>
                  <div style={{ display: "flex", gap: 4, flex: 1 }}>
                    {SIMULATED_USERS.map((u) => {
                      const isSelected = (currentSimulatedUser?.id || "user-linfan") === u.id;
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => {
                            setSimulatedUserId?.(u.id);
                            notify?.(`已切换模拟访客画像为：${u.name}（${u.targetLang}）`);
                          }}
                          style={{
                            flex: 1,
                            padding: "3px 4px",
                            fontSize: 9.5,
                            borderRadius: 4,
                            cursor: "pointer",
                            fontWeight: isSelected ? 700 : 500,
                            background: isSelected ? "#15803d" : "#ffffff",
                            color: isSelected ? "#ffffff" : "#166534",
                            border: isSelected ? "1px solid #15803d" : "1px solid #86efac",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 3,
                          }}
                        >
                          <span>{u.avatar}</span>
                          <span>{u.name} · {u.targetLang}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 实时变量注入按钮 */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {[
                    { label: "用户昵称", token: "{用户昵称}", preview: (currentSimulatedUser || SIMULATED_USERS[0]).name },
                    { label: "学习语言", token: "{学习语言}", preview: (currentSimulatedUser || SIMULATED_USERS[0]).targetLang },
                    { label: "附近语伴数", token: "{附近语伴数}", preview: `${(currentSimulatedUser || SIMULATED_USERS[0]).nearbyCount}位` },
                    { label: "谁看过我", token: "{谁看过我}", preview: `${(currentSimulatedUser || SIMULATED_USERS[0]).visitorsCount}人` },
                    { label: "今日消耗翻译", token: "{今日消耗翻译}", preview: `${(currentSimulatedUser || SIMULATED_USERS[0]).todayTranslations}次` },
                    { label: "VIP到期天数", token: "{VIP到期天数}", preview: `${(currentSimulatedUser || SIMULATED_USERS[0]).vipExpireDays}天` },
                    { label: "实时折扣", token: "{实时折扣}", preview: (currentSimulatedUser || SIMULATED_USERS[0]).discount },
                    { label: "实时立省金额", token: "{实时立省金额}", preview: (currentSimulatedUser || SIMULATED_USERS[0]).saveAmount },
                  ].map((v) => (
                    <button
                      key={v.token}
                      type="button"
                      onClick={() => insertVariable(v.token)}
                      title={`点击插入 ${v.token}，当前访客解析为：${v.preview}`}
                      style={{
                        fontSize: 10,
                        padding: "3px 6px",
                        borderRadius: 4,
                        cursor: "pointer",
                        background: "#ffffff",
                        border: "1px solid #86efac",
                        color: "#166534",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <span>+ {v.label}</span>
                      <span style={{ fontSize: 9, color: "#15803d", opacity: 0.85, background: "#dcfce7", padding: "0 3px", borderRadius: 3 }}>
                        {v.preview}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-role specific forms */}
              {currentTextRole === "Header" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="顶部前缀 / VIP 标识">
                    <input
                      value={active.config?.kicker ?? ""}
                      placeholder="例如：HelloTalk VIP 核心专享"
                      onChange={(e) => updateNode(active.id, { config: { ...active.config, kicker: e.target.value } })}
                    />
                  </Field>
                  <Field label="主标题文案">
                    <input
                      value={active.content ?? ""}
                      placeholder="例如：首年额外 20% 优惠！"
                      onChange={(e) => updateNode(active.id, { content: e.target.value })}
                    />
                  </Field>
                  {active.config?.subtitle !== undefined && (
                    <Field label="副标题说明">
                      <input
                        value={active.config?.subtitle ?? "畅享 16 项高阶语言学习特权"}
                        onChange={(e) => updateNode(active.id, { config: { ...active.config, subtitle: e.target.value } })}
                      />
                    </Field>
                  )}
                  {active.config?.highlightWord !== undefined && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      <Field label="高亮强调词">
                        <input
                          value={active.config?.highlightWord || ""}
                          placeholder="例如：立即续订"
                          onChange={(e) => updateNode(active.id, { config: { ...active.config, highlightWord: e.target.value } })}
                        />
                      </Field>
                      <Field label="高亮颜色">
                        <input
                          value={active.config?.highlightColor || "#6C3EDE"}
                          onChange={(e) => updateNode(active.id, { config: { ...active.config, highlightColor: e.target.value } })}
                        />
                      </Field>
                    </div>
                  )}
                  {active.config?.variant === "brand-hero" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>3 大核心特权标语 (纯中文展示)</label>
                      {(active.config?.bullets || ["无限翻译", "查看谁喜欢了你", "搜索全世界的语伴"]).map((b, bIdx) => (
                        <input
                          key={bIdx}
                          value={b}
                          placeholder={`特权标语 ${bIdx + 1}`}
                          onChange={(e) => {
                            const nextBullets = [...(active.config?.bullets || ["无限翻译", "查看谁喜欢了你", "搜索全世界的语伴"])];
                            nextBullets[bIdx] = e.target.value;
                            updateNode(active.id, { config: { ...active.config, bullets: nextBullets } });
                          }}
                          style={{ fontSize: 11, padding: "4px 8px", borderRadius: 4, border: "1px solid #cbd5e1", background: "#ffffff" }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentTextRole === "Subhead" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="副标题文案">
                    <input
                      value={active.content ?? ""}
                      placeholder="例如：仅限今日"
                      onChange={(e) => updateNode(active.id, { content: e.target.value })}
                    />
                  </Field>
                  <Field label="副标题文本颜色">
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      {["#DE6876", "#FF4D6D", "#F59E0B", "#64748b", "#0284C7", "#2D1832"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: c,
                            border: (active.config?.color || "#DE6876") === c ? "2px solid #000" : "1px solid rgba(0,0,0,0.15)",
                            cursor: "pointer",
                          }}
                          onClick={() => updateNode(active.id, { config: { ...active.config, color: c } })}
                        />
                      ))}
                    </div>
                  </Field>
                </div>
              )}

              {currentTextRole === "Text" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="正文段落内容">
                    <textarea
                      rows={3}
                      value={active.content ?? ""}
                      placeholder="输入正文说明文本..."
                      onChange={(e) => updateNode(active.id, { content: e.target.value })}
                    />
                  </Field>
                </div>
              )}

              {currentTextRole === "Badge Tag" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="徽标文本文案">
                    <input
                      value={active.content ?? "VIP 特权中心"}
                      placeholder="例如：VIP 特权中心 / 7天免费体验"
                      onChange={(e) => updateNode(active.id, { content: e.target.value })}
                    />
                  </Field>
                  <Field label="徽标强调色">
                    <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                      {["#1ECA92", "#FAAD14", "#FF4D4F", "#722ED1", "#13C2C2", "#6366F1"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: c,
                            border: (active.config?.color || "#6366F1") === c ? "2px solid #000" : "1px solid rgba(0,0,0,0.15)",
                            cursor: "pointer",
                          }}
                          onClick={() => updateNode(active.id, { config: { ...active.config, color: c } })}
                        />
                      ))}
                    </div>
                  </Field>
                </div>
              )}

              {currentTextRole === "User Profile" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>用户画像配置 (Avatar & Badge)</span>
                  <Field label="用户昵称 (nick_name)">
                    <input
                      type="text"
                      value={active.config?.userName || active.content?.split("|")[0] || "Yeah"}
                      onChange={(e) => {
                        const newName = e.target.value;
                        const flag = active.config?.userFlag || active.content?.split("|")[1] || "DE";
                        updateNode(active.id, {
                          content: `${newName}|${flag}`,
                          config: { ...active.config, userName: newName, userFlag: flag },
                        });
                      }}
                    />
                  </Field>
                  <Field label="国籍标识 (区域或国旗代码)">
                    <input
                      type="text"
                      value={active.config?.userFlag || active.content?.split("|")[1] || "DE"}
                      onChange={(e) => {
                        const newFlag = e.target.value;
                        const name = active.config?.userName || active.content?.split("|")[0] || "Yeah";
                        updateNode(active.id, {
                          content: `${name}|${newFlag}`,
                          config: { ...active.config, userName: name, userFlag: newFlag },
                        });
                      }}
                    />
                  </Field>
                </div>
              )}

              {currentTextRole === "Language Chips" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="语言标签列表 (竖线 | 分隔)">
                    <input
                      value={active.content || ""}
                      placeholder="英语|日语|韩语|西语"
                      onChange={(e) => updateNode(active.id, { content: e.target.value })}
                    />
                  </Field>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[
                      { label: "常见 4 语", val: "英语|日语|韩语|西语" },
                      { label: "欧洲语系", val: "法语|德语|意语|俄语" },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer" }}
                        onClick={() => updateNode(active.id, { content: p.val })}
                      >
                        + 填入 {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentTextRole === "Legal Footer" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="免责声明 / 条款文案">
                    <textarea
                      rows={3}
                      value={active.content ?? ""}
                      placeholder="例如：服务条款 · 隐私政策 · 恢复购买"
                      onChange={(e) => updateNode(active.id, { content: e.target.value })}
                    />
                  </Field>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {[
                      "服务条款 · 隐私政策 · 恢复购买",
                      "订阅可随时取消，无需支付任何费用",
                      "按年自动扣费，可在 App Store 账户设置中管理",
                    ].map((snippet) => (
                      <button
                        key={snippet}
                        type="button"
                        onClick={() => updateNode(active.id, { content: snippet })}
                        style={{
                          fontSize: 10,
                          padding: "2px 6px",
                          borderRadius: 4,
                          border: "1px solid #cbd5e1",
                          background: "#fff",
                          color: "#475569",
                          cursor: "pointer",
                        }}
                      >
                        + 插入: {snippet.slice(0, 10)}...
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* 2. 背景图 (Background & Illustrations)                       */}
          {/* ============================================================ */}
          {category === "背景图" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "6px 0 14px", background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>背景图形态与插画风格</span>
                <span style={{ fontSize: 9.5, color: "#6366f1", background: "#eef2ff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>当前：{currentBgRoleLabel}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                {[
                  { key: "illustration", label: "原生插画", type: "Hero Image" },
                  { key: "mascot", label: "吉祥物插画", type: "Mascot Illustration" },
                  { key: "image", label: "自定义图片", type: "Hero Image" },
                  { key: "gradient", label: "渐变底色", type: "Hero Image" },
                ].map((m) => {
                  const isSelected = currentBgRole === m.key;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      style={{
                        fontSize: 10.5,
                        padding: "7px 4px",
                        borderRadius: 6,
                        border: isSelected ? "2px solid #2563eb" : "1px solid #cbd5e1",
                        background: isSelected ? "#eff6ff" : "#fff",
                        color: isSelected ? "#1d4ed8" : "#475569",
                        fontWeight: isSelected ? 700 : 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        if (m.key === "mascot") {
                          updateNode(active.id, {
                            type: "Mascot Illustration",
                            label: "背景图 (吉祥物插画)",
                            content: active.config?.mascotType || "crown-gift",
                            config: { ...(active.config || {}), mascotType: active.config?.mascotType || "crown-gift", bgMode: "mascot" },
                          });
                        } else {
                          updateNode(active.id, {
                            type: "Hero Image",
                            label: `背景图 (${m.label})`,
                            config: { ...(active.config || {}), bgMode: m.key },
                          });
                        }
                        notify?.(`已切换背景图形态为：${m.label}`);
                      }}
                    >
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sub-role controls for 背景图 */}
              {currentBgRole === "mascot" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="官方吉祥物形态">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                      <button
                        type="button"
                        style={{
                          fontSize: 10.5,
                          padding: "8px 4px",
                          borderRadius: 6,
                          border: (active.config?.mascotType === "crown-gift" || !active.config?.mascotType) ? "2px solid #6C3EDE" : "1px solid #CBD5E1",
                          background: (active.config?.mascotType === "crown-gift" || !active.config?.mascotType) ? "#F5F0FF" : "#FFF",
                          color: (active.config?.mascotType === "crown-gift" || !active.config?.mascotType) ? "#6C3EDE" : "#475569",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        onClick={() => updateNode(active.id, { config: { ...active.config, mascotType: "crown-gift" }, content: "crown-gift" })}
                      >
                        皇冠之星<br /><span style={{ fontSize: 9.5, opacity: 0.8 }}>(失效样式)</span>
                      </button>
                      <button
                        type="button"
                        style={{
                          fontSize: 10.5,
                          padding: "8px 4px",
                          borderRadius: 6,
                          border: active.config?.mascotType === "binoculars" ? "2px solid #FF6A00" : "1px solid #CBD5E1",
                          background: active.config?.mascotType === "binoculars" ? "#FFF7ED" : "#FFF",
                          color: active.config?.mascotType === "binoculars" ? "#FF6A00" : "#475569",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        onClick={() => updateNode(active.id, { config: { ...active.config, mascotType: "binoculars" }, content: "binoculars" })}
                      >
                        望远镜星<br /><span style={{ fontSize: 9.5, opacity: 0.8 }}>(访客样式)</span>
                      </button>
                      <button
                        type="button"
                        style={{
                          fontSize: 10.5,
                          padding: "8px 4px",
                          borderRadius: 6,
                          border: active.config?.mascotType === "translate-coin" ? "2px solid #FF8A00" : "1px solid #CBD5E1",
                          background: active.config?.mascotType === "translate-coin" ? "#FEF7E5" : "#FFF",
                          color: active.config?.mascotType === "translate-coin" ? "#FF8A00" : "#475569",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        onClick={() => updateNode(active.id, { config: { ...active.config, mascotType: "translate-coin" }, content: "translate-coin" })}
                      >
                        翻译金币<br /><span style={{ fontSize: 9.5, opacity: 0.8 }}>(非订阅样式)</span>
                      </button>
                    </div>
                  </Field>
                </div>
              ) : currentBgRole === "image" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="自定义背景图片 URL">
                    <input
                      value={active.config?.customBgImage || ""}
                      placeholder="https://... 或点击预设挑选"
                      onChange={(e) => updateNode(active.id, { config: { ...active.config, customBgImage: e.target.value } })}
                    />
                  </Field>
                  <Field label="预设高质量插画壁纸挑选">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {[
                        { name: "环球母语连结", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" },
                        { name: "晨曦极简学习", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80" },
                        { name: "全球城市漫游", url: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&q=80" },
                        { name: "专业导师答疑", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80" },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          style={{
                            padding: "6px 8px",
                            borderRadius: 6,
                            border: active.config?.customBgImage === item.url ? "2px solid #2563eb" : "1px solid #cbd5e1",
                            background: active.config?.customBgImage === item.url ? "#eff6ff" : "#fff",
                            fontSize: 10.5,
                            cursor: "pointer",
                            textAlign: "left",
                            fontWeight: active.config?.customBgImage === item.url ? 700 : 500,
                          }}
                          onClick={() => updateNode(active.id, { config: { ...active.config, customBgImage: item.url } })}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              ) : currentBgRole === "gradient" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="预设渐变底色">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {[
                        { name: "黑金极夜", grad: "linear-gradient(135deg, #18181b 0%, #27272a 100%)", color: "#fafafa" },
                        { name: "深海湛蓝", grad: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", color: "#f0f9ff" },
                        { name: "落日余晖", grad: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)", color: "#fff7ed" },
                        { name: "静谧紫夜", grad: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)", color: "#f5f3ff" },
                      ].map((g) => (
                        <button
                          key={g.name}
                          type="button"
                          style={{
                            background: g.grad,
                            color: g.color,
                            padding: "8px 6px",
                            borderRadius: 6,
                            border: active.config?.gradientBg === g.grad ? "2px solid #2563eb" : "1px solid rgba(0,0,0,0.1)",
                            fontSize: 11,
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                          onClick={() => updateNode(active.id, { config: { ...active.config, gradientBg: g.grad } })}
                        >
                          {g.name}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="插画主题底色">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {[
                        { key: "orange", label: "暖橙经典", bg: "linear-gradient(135deg, #ea580c, #f97316)" },
                        { key: "gold", label: "尊享黑金", bg: "linear-gradient(135deg, #1e1b4b, #312e81)" },
                        { key: "blue", label: "极光深蓝", bg: "linear-gradient(135deg, #1e3a8a, #3b82f6)" },
                        { key: "purple", label: "优雅粉紫", bg: "linear-gradient(135deg, #831843, #ec4899)" },
                      ].map((theme) => {
                        const isSelected = (active.config?.themeColor || "orange") === theme.key;
                        return (
                          <button
                            key={theme.key}
                            type="button"
                            style={{
                              fontSize: 10.5,
                              padding: "6px 8px",
                              borderRadius: 6,
                              border: isSelected ? "2px solid #2563eb" : "1px solid #cbd5e1",
                              background: theme.bg,
                              color: "#fff",
                              fontWeight: 700,
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                            onClick={() => updateNode(active.id, { config: { ...active.config, themeColor: theme.key } })}
                          >
                            {theme.label}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* 3. 操作按钮 (Action Buttons & Switches)                       */}
          {/* ============================================================ */}
          {category === "操作按钮" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "6px 0 14px", background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>操作按钮角色切换</span>
                <span style={{ fontSize: 9.5, color: "#6366f1", background: "#eef2ff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>当前：{currentActionRoleLabel}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                {[
                  { id: "Purchase Button", label: "购买按钮" },
                  { id: "Dismiss Button", label: "关闭按钮" },
                  { id: "Switch Tabs", label: "切换标签" },
                  { id: "Toggle", label: "开关选项" },
                ].map((btnRole) => {
                  const isBtnActive = currentActionRole === btnRole.id;
                  return (
                    <button
                      key={btnRole.id}
                      type="button"
                      onClick={() => {
                        let newContent = active.content;
                        let newConfig = { ...(active.config || {}) };
                        if (btnRole.id === "Purchase Button") {
                          newContent = newContent === "✕" ? "立即升级 VIP" : (newContent || "立即升级 VIP");
                          newConfig.color = newConfig.color || "#6144e8";
                        } else if (btnRole.id === "Dismiss Button") {
                          newContent = "✕";
                          newConfig.variant = "close-icon";
                        } else if (btnRole.id === "Switch Tabs") {
                          newContent = "VIP|VIP+";
                        } else if (btnRole.id === "Toggle") {
                          newContent = "开启 7 天免费试用|到期前随时取消";
                        }
                        updateNode(active.id, {
                          type: btnRole.id,
                          label: `操作按钮 (${btnRole.label})`,
                          content: newContent,
                          config: newConfig,
                        });
                        notify?.(`已切换按钮角色为：${btnRole.label}`);
                      }}
                      style={{
                        padding: "7px 4px",
                        background: isBtnActive ? "#eff6ff" : "#ffffff",
                        border: isBtnActive ? "2px solid #3b82f6" : "1px solid #cbd5e1",
                        borderRadius: 6,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: 10.5, fontWeight: isBtnActive ? 700 : 500, color: isBtnActive ? "#1d4ed8" : "#334155" }}>{btnRole.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Purchase Button Controls */}
              {currentActionRole === "Purchase Button" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="按钮主文案">
                    <input
                      value={active.content ?? ""}
                      placeholder="例如：继续"
                      onChange={(e) => updateNode(active.id, { content: e.target.value })}
                    />
                  </Field>
                  <Field label="按钮副标题文案">
                    <input
                      value={active.config?.subtitle ?? ""}
                      placeholder="例如：到期后 ¥198/年，可随时取消"
                      onChange={(e) => updateNode(active.id, { config: { ...active.config, subtitle: e.target.value } })}
                    />
                  </Field>
                  <Field label="按钮强调色">
                    <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}>
                      {["#6C3EDE", "#C85B6B", "#DE6876", "#FF4D6D", "#0284C7", "#F59E0B", "#10B981"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: c,
                            border: (active.config?.color || "#6C3EDE") === c ? "2px solid #000" : "1px solid rgba(0,0,0,0.15)",
                            cursor: "pointer",
                          }}
                          onClick={() => updateNode(active.id, { config: { ...active.config, color: c } })}
                        />
                      ))}
                      <input
                        type="color"
                        value={active.config?.color || "#6C3EDE"}
                        onChange={(e) => updateNode(active.id, { config: { ...active.config, color: e.target.value } })}
                        style={{ width: 28, height: 28, padding: 0, border: "none", background: "none", cursor: "pointer" }}
                      />
                    </div>
                  </Field>
                </div>
              )}

              {/* Dismiss Button Controls */}
              {currentActionRole === "Dismiss Button" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="按钮形态">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                      {[
                        { id: "circle-close", label: "✕ 圆形半窗" },
                        { id: "close-icon", label: "✕ 图标全屏" },
                        { id: "text-link", label: "纯文本链接" },
                      ].map((fm) => (
                        <button
                          key={fm.id}
                          type="button"
                          style={{
                            fontSize: 10.5,
                            padding: "6px 2px",
                            borderRadius: 4,
                            border: (active.config?.variant === fm.id || (!active.config?.variant && fm.id === "close-icon")) ? "2px solid #0284c7" : "1px solid #cbd5e1",
                            background: (active.config?.variant === fm.id || (!active.config?.variant && fm.id === "close-icon")) ? "#F0F9FF" : "#fff",
                            color: (active.config?.variant === fm.id || (!active.config?.variant && fm.id === "close-icon")) ? "#0284c7" : "#334155",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                          onClick={() => updateNode(active.id, { config: { ...active.config, variant: fm.id } })}
                        >
                          {fm.label}
                        </button>
                      ))}
                    </div>
                  </Field>
                  {active.config?.variant === "text-link" ? (
                    <Field label="关闭链接文案">
                      <input
                        value={active.content ?? ""}
                        placeholder="例如：暂时不用，谢谢"
                        onChange={(e) => updateNode(active.id, { content: e.target.value })}
                      />
                    </Field>
                  ) : (
                    <Field label="显示位置">
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        {["top-left", "top-right"].map((pos) => (
                          <button
                            key={pos}
                            type="button"
                            style={{
                              fontSize: 10.5,
                              padding: "5px 6px",
                              borderRadius: 4,
                              border: (active.config?.position || "top-left") === pos ? "2px solid #0284c7" : "1px solid #cbd5e1",
                              background: (active.config?.position || "top-left") === pos ? "#F0F9FF" : "#fff",
                              color: (active.config?.position || "top-left") === pos ? "#0284c7" : "#334155",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                            onClick={() => updateNode(active.id, { config: { ...active.config, position: pos } })}
                          >
                            {pos === "top-left" ? "左上角" : "右上角"}
                          </button>
                        ))}
                      </div>
                    </Field>
                  )}
                </div>
              )}

              {/* Switch Tabs Controls */}
              {currentActionRole === "Switch Tabs" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>VIP / VIP+ 标签联动</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    <button
                      type="button"
                      style={{
                        fontSize: 11,
                        padding: "8px",
                        borderRadius: 6,
                        fontWeight: 700,
                        border: activeCompareTab === 0 ? "2px solid #F59E0B" : "1px solid #CBD5E1",
                        background: activeCompareTab === 0 ? "#FFFBEB" : "#FFF",
                        color: activeCompareTab === 0 ? "#B45309" : "#475569",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setActiveCompareTab?.(0);
                        notify?.("已切换预览: VIP 进阶版");
                      }}
                    >
                      VIP 进阶版
                    </button>
                    <button
                      type="button"
                      style={{
                        fontSize: 11,
                        padding: "8px",
                        borderRadius: 6,
                        fontWeight: 700,
                        border: activeCompareTab === 1 ? "2px solid #8B5CF6" : "1px solid #CBD5E1",
                        background: activeCompareTab === 1 ? "#F5F3FF" : "#FFF",
                        color: activeCompareTab === 1 ? "#6D28D9" : "#475569",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setActiveCompareTab?.(1);
                        notify?.("已切换预览: VIP+ 旗舰版");
                      }}
                    >
                      VIP+ 旗舰版
                    </button>
                  </div>
                </div>
              )}

              {/* Toggle Controls */}
              {currentActionRole === "Toggle" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <Field label="开关主标题文案">
                    <input
                      value={active.content?.split("|")[0] || "开启 7 天免费试用"}
                      onChange={(e) => {
                        const sub = active.content?.split("|")[1] || "到期前随时取消";
                        updateNode(active.id, { content: `${e.target.value}|${sub}` });
                      }}
                    />
                  </Field>
                  <Field label="开关副文案 / 提示">
                    <input
                      value={active.content?.split("|")[1] || "到期前随时取消"}
                      onChange={(e) => {
                        const title = active.content?.split("|")[0] || "开启 7 天免费试用";
                        updateNode(active.id, { content: `${title}|${e.target.value}` });
                      }}
                    />
                  </Field>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* 4. 核心特权 (Core Benefits & Carousels)                       */}
          {/* ============================================================ */}
          {category === "核心特权" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "6px 0 14px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>核心特权表现形态</span>
                  <span style={{ fontSize: 9.5, color: "#6366f1", background: "#eef2ff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>当前：{currentBenefitRoleLabel}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
                  {[
                    { id: "Carousel Cards", label: "卡片轮播", variant: "carousel", styleVariant: "carousel" },
                    { id: "Carousel Cards", label: "3页引导轮播", variant: "onboarding-3slides", styleVariant: "onboarding" },
                    { id: "Benefit List", label: "打勾清单", variant: "entry-checks", styleVariant: "checklist" },
                    { id: "Benefit List", label: "双列网格", variant: "grid-matrix", styleVariant: "grid" },
                    { id: "Benefit List", label: "圆角大卡", variant: "onboarding-privilege-card", styleVariant: "cards" },
                  ].map((role) => {
                    const isSelected = currentBenefitRole === role.variant;
                    return (
                      <button
                        key={role.label}
                        type="button"
                        onClick={() => {
                          if (role.variant === "onboarding-3slides") {
                            updateNode(active.id, {
                              type: "Carousel Cards",
                              label: "核心特权 (3页引导轮播)",
                              config: {
                                ...(active.config || {}),
                                variant: "onboarding-3slides",
                                slides: active.config?.slides || [
                                  { tag: "核心权益 1", title: "与母语者自由畅聊", desc: "突破语言障碍，随时与全球真人语伴沟通", icon: "globe" },
                                  { tag: "核心权益 2", title: "AI 实时智能纠错", desc: "母语级润色表达，告别中式英语尴尬", icon: "sparkles" },
                                  { tag: "核心权益 3", title: "无限即时翻译", desc: "每日超 100 次长句翻译与实时语音转译", icon: "languages" },
                                ],
                              },
                            });
                          } else if (role.variant === "carousel") {
                            updateNode(active.id, {
                              type: "Carousel Cards",
                              label: "核心特权 (卡片轮播)",
                              config: {
                                ...(active.config || {}),
                                variant: "carousel",
                                styleVariant: "carousel",
                                privileges: active.config?.privileges || ALL_HELLOTALK_PRIVILEGES,
                              },
                            });
                          } else {
                            updateNode(active.id, {
                              type: "Benefit List",
                              label: `核心特权 (${role.label})`,
                              config: {
                                ...(active.config || {}),
                                variant: role.variant,
                                styleVariant: role.styleVariant,
                              },
                            });
                          }
                          notify?.(`已切换特权角色为：${role.label}`);
                        }}
                        style={{
                          fontSize: 10,
                          padding: "7px 2px",
                          borderRadius: 6,
                          border: isSelected ? "2px solid #3b82f6" : "1px solid #cbd5e1",
                          background: isSelected ? "#eff6ff" : "#fff",
                          color: isSelected ? "#1d4ed8" : "#475569",
                          fontWeight: isSelected ? 700 : 500,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ whiteSpace: "nowrap" }}>{role.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {currentBenefitRole === "onboarding-3slides" ? (
                <OnboardingMultiSlidesManager
                  node={active}
                  updateNode={updateNode}
                  notify={notify}
                  activeSlide={onboardingCarouselSlide}
                  onSlideChange={(idx) => {
                    setOnboardingCarouselSlide?.(idx);
                    setCarouselIndex?.(idx);
                  }}
                />
              ) : (
                <CoreBenefitsManager
                  node={active}
                  updateNode={updateNode}
                  notify={notify}
                  themeConfig={activeSubTemplate?.theme || null}
                />
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* 5. 对比与时间轴 (Comparison, Timeline & Metrics)              */}
          {/* ============================================================ */}
          {category === "对比与时间轴" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "6px 0 14px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>对比与时间轴角色切换</span>
                  <span style={{ fontSize: 9.5, color: "#6366f1", background: "#eef2ff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>当前：{currentCompareRoleLabel}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                  {[
                    { id: "Comparison Table", label: "对比表格" },
                    { id: "Trial Timeline", label: "3天试用时间轴" },
                    { id: "Dynamic Metrics", label: "动态指标" },
                  ].map((role) => {
                    const isSelected = currentCompareRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => {
                          if (role.id === "Comparison Table") {
                            const nextConfig = { ...(active.config || {}) };
                            delete nextConfig.steps;
                            delete nextConfig.metricValues;
                            delete nextConfig.visitorCount;
                            delete nextConfig.styleType;
                            updateNode(active.id, {
                              type: "Comparison Table",
                              label: "对比与时间轴 (对比表格)",
                              config: {
                                ...nextConfig,
                                variant: "comparison-table",
                                compareMode: "free-vs-vip",
                                featureColTitle: "特权功能",
                                col1Title: "普通会员",
                                col2Title: "VIP会员",
                              },
                              content: active.type === "Comparison Table" ? active.content : "特权对比|普通VIP|VIP+旗舰\n每日翻译|50次/天|无限制\n全球漫游|2个城市|无限制",
                            });
                          } else if (role.id === "Trial Timeline") {
                            const nextConfig = { ...(active.config || {}) };
                            delete nextConfig.featureColTitle;
                            delete nextConfig.col1Title;
                            delete nextConfig.col2Title;
                            delete nextConfig.metricValues;
                            delete nextConfig.visitorCount;
                            delete nextConfig.styleType;
                            updateNode(active.id, {
                              type: "Toggle",
                              label: "对比与时间轴 (3天试用时间轴)",
                              config: {
                                ...nextConfig,
                                variant: "trial-timeline",
                                steps: [
                                  { day: "今天", title: "开始试用", icon: "crown" },
                                  { day: "第2天", title: "即将结束通知", icon: "bell" },
                                  { day: "第3天", title: "试用结束", icon: "clock" },
                                ],
                              },
                              content: "今天|开始试用\n第2天|即将结束通知\n第3天|试用结束",
                            });
                          } else if (role.id === "Dynamic Metrics") {
                            const nextConfig = { ...(active.config || {}) };
                            delete nextConfig.variant;
                            delete nextConfig.steps;
                            delete nextConfig.featureColTitle;
                            delete nextConfig.col1Title;
                            delete nextConfig.col2Title;
                            delete nextConfig.compareMode;
                            updateNode(active.id, {
                              type: "Dynamic Metrics",
                              label: "对比与时间轴 (动态指标)",
                              config: {
                                ...nextConfig,
                                styleType: "VIP失效样式",
                                metricValues: [972, 762, 487, 673, 837, 899, 116, 156, 939, 446, 650, 442],
                                visitorCount: 21,
                              },
                              content: "972、762、487、673、837、899、116、156、939、446、650、442",
                            });
                          }
                          notify?.(`已切换对比与时间轴为：${role.label}`);
                        }}
                        style={{
                          fontSize: 10.5,
                          padding: "7px 4px",
                          borderRadius: 6,
                          border: isSelected ? "2px solid #3b82f6" : "1px solid #cbd5e1",
                          background: isSelected ? "#eff6ff" : "#fff",
                          color: isSelected ? "#1d4ed8" : "#475569",
                          fontWeight: isSelected ? 700 : 500,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>{role.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {currentCompareRole === "Comparison Table" && (
                <ComparisonTableManager
                  node={active}
                  updateNode={updateNode}
                  notify={notify}
                  onSwitchCompareTab={setActiveCompareTab}
                />
              )}

              {currentCompareRole === "Trial Timeline" && (
                <TrialTimelineManager
                  node={active}
                  updateNode={updateNode}
                  notify={notify}
                />
              )}

              {currentCompareRole === "Dynamic Metrics" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "#f8fafc", padding: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>动态指标数据源配置</span>
                  <Field label="展示版式形态">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      <button
                        type="button"
                        style={{
                          fontSize: 11,
                          padding: "7px 6px",
                          borderRadius: 6,
                          border: (!active.config?.visitorCount && active.config?.styleType !== "非VIP样式") ? "2px solid #6C3EDE" : "1px solid #CBD5E1",
                          background: (!active.config?.visitorCount && active.config?.styleType !== "非VIP样式") ? "#F5F0FF" : "#FFF",
                          color: (!active.config?.visitorCount && active.config?.styleType !== "非VIP样式") ? "#6C3EDE" : "#475569",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        onClick={() => updateNode(active.id, { config: { ...active.config, styleType: "VIP失效样式", visitorCount: undefined }, content: "972、762、487、673、837、899、116、156、939、446、650、442" })}
                      >
                        12组数据矩阵 (失效/非订阅)
                      </button>
                      <button
                        type="button"
                        style={{
                          fontSize: 11,
                          padding: "7px 6px",
                          borderRadius: 6,
                          border: (active.config?.visitorCount || active.config?.styleType === "非VIP样式") ? "2px solid #FF6A00" : "1px solid #CBD5E1",
                          background: (active.config?.visitorCount || active.config?.styleType === "非VIP样式") ? "#FFF7ED" : "#FFF",
                          color: (active.config?.visitorCount || active.config?.styleType === "非VIP样式") ? "#FF6A00" : "#475569",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        onClick={() => updateNode(active.id, { config: { ...active.config, styleType: "非VIP样式", visitorCount: 21 }, content: "21 new visitors in the past 7 days" })}
                      >
                        访客统计大数字 (非VIP访客)
                      </button>
                    </div>
                  </Field>
                  {active.config?.visitorCount ? (
                    <Field label="7天内访客人数 (visitor_count_7d)">
                      <input
                        type="number"
                        value={active.config?.visitorCount || 21}
                        onChange={(e) => {
                          const num = parseInt(e.target.value, 10) || 0;
                          updateNode(active.id, {
                            config: { ...active.config, visitorCount: num },
                            content: `${num} new visitors in the past 7 days`,
                          });
                        }}
                      />
                    </Field>
                  ) : (
                    <>
                      <Field label="指标变量数值 (顿号或空格分隔)">
                        <textarea
                          rows={3}
                          value={active.content || ""}
                          onChange={(e) => updateNode(active.id, { content: e.target.value })}
                        />
                      </Field>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 2 }}>
                        <span style={{ fontSize: 10, color: "#166534", width: "100%", fontWeight: 700 }}>快捷插入用户实时变量：</span>
                        {[
                          { label: "谁看过我", val: "{谁看过我}" },
                          { label: "附近语伴数", val: "{附近语伴数}" },
                          { label: "今日消耗翻译", val: "{今日消耗翻译}" },
                        ].map((item) => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => insertVariable(item.val)}
                            style={{
                              fontSize: 10,
                              background: "#f0fdf4",
                              border: "1px solid #86efac",
                              borderRadius: 4,
                              padding: "2px 6px",
                              cursor: "pointer",
                              color: "#166534",
                              fontWeight: 600,
                            }}
                          >
                            + {item.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* 6. 产品套餐 (Products & Pricing Plans)                        */}
          {/* ============================================================ */}
          {category === "产品套餐" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "6px 0 14px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>产品套餐展现版式</span>
                  <span style={{ fontSize: 9.5, color: "#6366f1", background: "#eef2ff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>当前：{currentProductsRoleLabel}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                  {[
                    { id: "3-column-tiers", label: "横向三列", sub: "3档卡片" },
                    { id: "onboarding-dual-tiers", label: "双套餐", sub: "年卡+月卡" },
                    { id: "vertical-list-tiers", label: "纵向列表", sub: "多行列表" },
                    { id: "entry-price-tier", label: "特惠价格", sub: "单价格" },
                  ].map((tab) => {
                    const isActive = effectiveProductsVariant === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleProductVariantSwitch(tab.id)}
                        style={{
                          padding: "6px 4px",
                          background: isActive ? "#eff6ff" : "#ffffff",
                          border: isActive ? "2px solid #3b82f6" : "1px solid #cbd5e1",
                          borderRadius: 6,
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <span style={{ fontSize: 11, fontWeight: isActive ? 700 : 500, color: isActive ? "#1d4ed8" : "#334155" }}>{tab.label}</span>
                        <span style={{ fontSize: 9, color: isActive ? "#3b82f6" : "#94a3b8" }}>{tab.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {effectiveProductsVariant === "entry-price-tier" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>特惠价格配置</span>
                  <Field label="展示排版">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      <button
                        type="button"
                        style={{
                          fontSize: 11,
                          padding: "5px 8px",
                          borderRadius: 4,
                          border: active.config?.displayMode === "clean-text" || !active.config?.displayMode ? "2px solid #0284c7" : "1px solid #cbd5e1",
                          background: active.config?.displayMode === "clean-text" || !active.config?.displayMode ? "#F0F9FF" : "#fff",
                          color: active.config?.displayMode === "clean-text" || !active.config?.displayMode ? "#0284c7" : "#334155",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        onClick={() => updateNode(active.id, { config: { ...active.config, displayMode: "clean-text" } })}
                      >
                        极简排版 (原版推荐)
                      </button>
                      <button
                        type="button"
                        style={{
                          fontSize: 11,
                          padding: "5px 8px",
                          borderRadius: 4,
                          border: active.config?.displayMode === "card" ? "2px solid #0284c7" : "1px solid #cbd5e1",
                          background: active.config?.displayMode === "card" ? "#F0F9FF" : "#fff",
                          color: active.config?.displayMode === "card" ? "#0284c7" : "#334155",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        onClick={() => updateNode(active.id, { config: { ...active.config, displayMode: "card" } })}
                      >
                        卡片边框
                      </button>
                    </div>
                  </Field>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <Field label="原价文案">
                      <input
                        value={active.config?.priceOriginal ?? "原价 ¥488/年"}
                        placeholder="原价 ¥488/年"
                        onChange={(e) => updateNode(active.id, { config: { ...active.config, priceOriginal: e.target.value } })}
                      />
                    </Field>
                    <Field label="折扣特惠价">
                      <input
                        value={active.config?.priceNow ?? "折扣价 ¥388/年"}
                        placeholder="折扣价 ¥388/年"
                        onChange={(e) => updateNode(active.id, { config: { ...active.config, priceNow: e.target.value } })}
                      />
                    </Field>
                  </div>
                  {active.config?.displayMode === "card" && (
                    <>
                      <Field label="角标文案">
                        <input
                          value={active.config?.promoBadge ?? "限时特惠"}
                          onChange={(e) => updateNode(active.id, { config: { ...active.config, promoBadge: e.target.value } })}
                        />
                      </Field>
                      <Field label="折扣标签">
                        <input
                          value={active.config?.discountTag ?? "-20% 折扣"}
                          onChange={(e) => updateNode(active.id, { config: { ...active.config, discountTag: e.target.value } })}
                        />
                      </Field>
                      <Field label="底部计费说明">
                        <input
                          value={active.config?.priceSub ?? "仅 ¥0.35/天 · 新客立省 20% · 随时取消"}
                          onChange={(e) => updateNode(active.id, { config: { ...active.config, priceSub: e.target.value } })}
                        />
                      </Field>
                    </>
                  )}
                </div>
              )}

              {effectiveProductsVariant === "onboarding-dual-tiers" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>产品双套餐配置 (试用年卡 + 基础月卡)</span>
                  {(active.config?.tiers || [
                    { name: "12个月", monthly: "¥40.67/月", total: "总价 ¥488", discount: "48%OFF", badge: "免费试用", hasTrial: true },
                    { name: "月费会员", monthly: "¥78.00/月", total: "按月扣费", discount: "", badge: "直接购买", hasTrial: false },
                  ]).map((tier, tIdx) => (
                    <div key={tIdx} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <strong style={{ fontSize: 11, color: "#334155" }}>
                          套餐 {tIdx + 1}：{tier.name}
                        </strong>
                        <span style={{ fontSize: 9.5, background: tier.hasTrial ? "#fef3c7" : "#e0e7ff", color: tier.hasTrial ? "#92400e" : "#3730a3", padding: "1px 5px", borderRadius: 4, fontWeight: 700 }}>
                          {tier.badge || (tier.hasTrial ? "免费试用" : "直接购买")}
                        </span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
                        <Field label="套餐名称">
                          <input
                            value={tier.name}
                            onChange={(e) => {
                              const currentTiers = active.config?.tiers || [
                                { name: "12个月", monthly: "¥40.67/月", total: "总价 ¥488", discount: "48%OFF", badge: "免费试用", hasTrial: true },
                                { name: "月费会员", monthly: "¥78.00/月", total: "按月扣费", discount: "", badge: "直接购买", hasTrial: false },
                              ];
                              const newTiers = [...currentTiers];
                              newTiers[tIdx] = { ...newTiers[tIdx], name: e.target.value };
                              updateNode(active.id, { config: { ...active.config, tiers: newTiers } });
                            }}
                          />
                        </Field>
                        <Field label="月均价格">
                          <input
                            value={tier.monthly}
                            onChange={(e) => {
                              const currentTiers = active.config?.tiers || [
                                { name: "12个月", monthly: "¥40.67/月", total: "总价 ¥488", discount: "48%OFF", badge: "免费试用", hasTrial: true },
                                { name: "月费会员", monthly: "¥78.00/月", total: "按月扣费", discount: "", badge: "直接购买", hasTrial: false },
                              ];
                              const newTiers = [...currentTiers];
                              newTiers[tIdx] = { ...newTiers[tIdx], monthly: e.target.value };
                              updateNode(active.id, { config: { ...active.config, tiers: newTiers } });
                            }}
                          />
                        </Field>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        <Field label="总价 / 扣费说明">
                          <input
                            value={tier.total}
                            onChange={(e) => {
                              const currentTiers = active.config?.tiers || [
                                { name: "12个月", monthly: "¥40.67/月", total: "总价 ¥488", discount: "48%OFF", badge: "免费试用", hasTrial: true },
                                { name: "月费会员", monthly: "¥78.00/月", total: "按月扣费", discount: "", badge: "直接购买", hasTrial: false },
                              ];
                              const newTiers = [...currentTiers];
                              newTiers[tIdx] = { ...newTiers[tIdx], total: e.target.value };
                              updateNode(active.id, { config: { ...active.config, tiers: newTiers } });
                            }}
                          />
                        </Field>
                        <Field label="角标 / 折扣标签">
                          <input
                            value={tier.discount || tier.badge || ""}
                            placeholder="例如：48%OFF / 免费试用"
                            onChange={(e) => {
                              const currentTiers = active.config?.tiers || [
                                { name: "12个月", monthly: "¥40.67/月", total: "总价 ¥488", discount: "48%OFF", badge: "免费试用", hasTrial: true },
                                { name: "月费会员", monthly: "¥78.00/月", total: "按月扣费", discount: "", badge: "直接购买", hasTrial: false },
                              ];
                              const newTiers = [...currentTiers];
                              newTiers[tIdx] = { ...newTiers[tIdx], discount: e.target.value, badge: e.target.value };
                              updateNode(active.id, { config: { ...active.config, tiers: newTiers } });
                            }}
                          />
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {effectiveProductsVariant === "3-column-tiers" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>横向套餐卡片配置</span>
                  {(active.config?.tiers || [
                    { name: "3个月", monthly: "¥37.33/月", total: "总价 ¥112", period: "3个月", badge: "", save: "" },
                    { name: "12个月", monthly: "¥24.99/月", total: "总价 ¥298", period: "12个月", badge: "推荐", save: "省54%", isRecommended: true },
                    { name: "终身", monthly: "¥798", total: "一次性购买", period: "终身", badge: "", save: "永久有效" },
                  ]).map((tier, tIdx) => (
                    <div key={tIdx} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <strong style={{ fontSize: 11, color: "#334155" }}>档位 {tIdx + 1}：{tier.name}</strong>
                        {tier.isRecommended && <span style={{ fontSize: 9.5, background: "#dbeafe", color: "#1d4ed8", padding: "1px 5px", borderRadius: 4, fontWeight: 700 }}>默认推荐档</span>}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
                        <Field label="套餐名称">
                          <input
                            value={tier.name}
                            onChange={(e) => {
                              const currentTiers = active.config?.tiers || [
                                { name: "3个月", monthly: "¥37.33/月", total: "总价 ¥112", period: "3个月", badge: "", save: "" },
                                { name: "12个月", monthly: "¥24.99/月", total: "总价 ¥298", period: "12个月", badge: "推荐", save: "省54%", isRecommended: true },
                                { name: "终身", monthly: "¥798", total: "一次性购买", period: "终身", badge: "", save: "永久有效" },
                              ];
                              const newTiers = [...currentTiers];
                              newTiers[tIdx] = { ...newTiers[tIdx], name: e.target.value };
                              updateNode(active.id, { config: { ...active.config, tiers: newTiers } });
                            }}
                          />
                        </Field>
                        <Field label="月均单价">
                          <input
                            value={tier.monthly}
                            onChange={(e) => {
                              const currentTiers = active.config?.tiers || [
                                { name: "3个月", monthly: "¥37.33/月", total: "总价 ¥112", period: "3个月", badge: "", save: "" },
                                { name: "12个月", monthly: "¥24.99/月", total: "总价 ¥298", period: "12个月", badge: "推荐", save: "省54%", isRecommended: true },
                                { name: "终身", monthly: "¥798", total: "一次性购买", period: "终身", badge: "", save: "永久有效" },
                              ];
                              const newTiers = [...currentTiers];
                              newTiers[tIdx] = { ...newTiers[tIdx], monthly: e.target.value };
                              updateNode(active.id, { config: { ...active.config, tiers: newTiers } });
                            }}
                          />
                        </Field>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        <Field label="总价文案">
                          <input
                            value={tier.total}
                            onChange={(e) => {
                              const currentTiers = active.config?.tiers || [
                                { name: "3个月", monthly: "¥37.33/月", total: "总价 ¥112", period: "3个月", badge: "", save: "" },
                                { name: "12个月", monthly: "¥24.99/月", total: "总价 ¥298", period: "12个月", badge: "推荐", save: "省54%", isRecommended: true },
                                { name: "终身", monthly: "¥798", total: "一次性购买", period: "终身", badge: "", save: "永久有效" },
                              ];
                              const newTiers = [...currentTiers];
                              newTiers[tIdx] = { ...newTiers[tIdx], total: e.target.value };
                              updateNode(active.id, { config: { ...active.config, tiers: newTiers } });
                            }}
                          />
                        </Field>
                        <Field label="角标/节省文案">
                          <input
                            value={tier.badge || tier.save || ""}
                            placeholder="例如：推荐 / 省54%"
                            onChange={(e) => {
                              const currentTiers = active.config?.tiers || [
                                { name: "3个月", monthly: "¥37.33/月", total: "总价 ¥112", period: "3个月", badge: "", save: "" },
                                { name: "12个月", monthly: "¥24.99/月", total: "总价 ¥298", period: "12个月", badge: "推荐", save: "省54%", isRecommended: true },
                                { name: "终身", monthly: "¥798", total: "一次性购买", period: "终身", badge: "", save: "永久有效" },
                              ];
                              const newTiers = [...currentTiers];
                              newTiers[tIdx] = { ...newTiers[tIdx], badge: e.target.value, save: e.target.value };
                              updateNode(active.id, { config: { ...active.config, tiers: newTiers } });
                            }}
                          />
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {effectiveProductsVariant === "vertical-list-tiers" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>纵向套餐列表配置</span>
                    <button
                      type="button"
                      onClick={() => {
                        const cur = getVerticalListTiers(active);
                        const newTiers = [...cur, { name: `连续套餐 ${cur.length + 1}`, price: "¥68/季", daily: "¥0.75/天", tag: "特惠", isDefault: false }];
                        saveVerticalListTiers(active, newTiers, updateNode);
                      }}
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        padding: "3px 8px",
                        background: "#fff",
                        border: "1px solid #cbd5e1",
                        borderRadius: 4,
                        cursor: "pointer",
                        color: "#475569",
                      }}
                    >
                      + 添加档位
                    </button>
                  </div>

                  {getVerticalListTiers(active).map((tier, tIdx, arr) => (
                    <div key={tIdx} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <strong style={{ fontSize: 11, color: "#334155" }}>档位 {tIdx + 1}：{tier.name}</strong>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {tier.isDefault ? (
                            <span style={{ fontSize: 9.5, background: "#dbeafe", color: "#1d4ed8", padding: "1px 5px", borderRadius: 4, fontWeight: 700 }}>
                              默认选中
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                const newTiers = arr.map((t, i) => ({ ...t, isDefault: i === tIdx }));
                                saveVerticalListTiers(active, newTiers, updateNode);
                              }}
                              style={{ fontSize: 9.5, color: "#64748b", background: "none", border: "1px solid #e2e8f0", borderRadius: 3, padding: "1px 4px", cursor: "pointer" }}
                            >
                              设为默认
                            </button>
                          )}
                          {arr.length > 1 && (
                            <button
                              type="button"
                              title="删除档位"
                              onClick={() => {
                                const newTiers = arr.filter((_, i) => i !== tIdx);
                                saveVerticalListTiers(active, newTiers, updateNode);
                              }}
                              style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "1px 2px", display: "flex", alignItems: "center" }}
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
                        <Field label="套餐名称">
                          <input
                            value={tier.name}
                            onChange={(e) => {
                              const newTiers = [...arr];
                              newTiers[tIdx] = { ...newTiers[tIdx], name: e.target.value };
                              saveVerticalListTiers(active, newTiers, updateNode);
                            }}
                          />
                        </Field>
                        <Field label="套餐价格">
                          <input
                            value={tier.price}
                            placeholder="例如：¥198/年"
                            onChange={(e) => {
                              const newTiers = [...arr];
                              newTiers[tIdx] = { ...newTiers[tIdx], price: e.target.value };
                              saveVerticalListTiers(active, newTiers, updateNode);
                            }}
                          />
                        </Field>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        <Field label="日均/副文案">
                          <input
                            value={tier.daily || ""}
                            placeholder="例如：¥0.54/天"
                            onChange={(e) => {
                              const newTiers = [...arr];
                              newTiers[tIdx] = { ...newTiers[tIdx], daily: e.target.value };
                              saveVerticalListTiers(active, newTiers, updateNode);
                            }}
                          />
                        </Field>
                        <Field label="角标/促销标签">
                          <input
                            value={tier.tag || ""}
                            placeholder="例如：推荐 / 月付"
                            onChange={(e) => {
                              const newTiers = [...arr];
                              newTiers[tIdx] = { ...newTiers[tIdx], tag: e.target.value };
                              saveVerticalListTiers(active, newTiers, updateNode);
                            }}
                          />
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* 7. 倒计时 (Timer & Countdown)                                */}
          {/* ============================================================ */}
          {category === "倒计时" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "6px 0 14px", background: "#f8fafc", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>倒计时形态切换</span>
                <span style={{ fontSize: 9.5, color: "#6366f1", background: "#eef2ff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>当前：{currentTimerRoleLabel}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                {[
                  { id: "clean-text", label: "极简纯文本" },
                  { id: "card", label: "色块数字框" },
                  { id: "badge-pill", label: "胶囊提示条" },
                ].map((item) => {
                  const isCur = currentTimerRole === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      style={{
                        fontSize: 10.5,
                        padding: "7px 4px",
                        borderRadius: 6,
                        border: isCur ? "2px solid #0284c7" : "1px solid #cbd5e1",
                        background: isCur ? "#F0F9FF" : "#fff",
                        color: isCur ? "#0284c7" : "#334155",
                        fontWeight: isCur ? 700 : 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        updateNode(active.id, {
                          config: { ...active.config, variant: item.id },
                          label: `倒计时 (${item.label})`,
                        });
                        notify?.(`已切换倒计时形态为：${item.label}`);
                      }}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <Field label="倒计时提示标签">
                <input
                  value={active.config?.timerLabel ?? active.config?.label ?? active.content ?? "优惠截止时间"}
                  placeholder="例如：优惠截止时间 或 黑五限时活动倒计时"
                  onChange={(e) => updateNode(active.id, { content: e.target.value, config: { ...active.config, timerLabel: e.target.value, label: "倒计时" } })}
                />
              </Field>
              <Field label="倒计时期限（小时）">
                <input
                  type="number"
                  min="1"
                  max="168"
                  value={active.config?.hours ?? 20}
                  onChange={(e) => updateNode(active.id, { config: { ...active.config, hours: Number(e.target.value) } })}
                />
              </Field>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 2 }}>
                <span style={{ fontSize: 10, color: "#64748b", width: "100%", fontWeight: 600 }}>快捷插入倒计时变量：</span>
                {["{{ expire_hours }}", "{{ discount_countdown }}"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => insertJinja(v)}
                    style={{
                      fontSize: 10,
                      background: "#f1f5f9",
                      border: "1px solid #cbd5e1",
                      borderRadius: 4,
                      padding: "2px 6px",
                      cursor: "pointer",
                      color: "#334155",
                      fontFamily: "monospace",
                    }}
                  >
                    + {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 通用备选文本输入（兜底）                                      */}
          {/* ============================================================ */}
          {!["文本与排版", "背景图", "操作按钮", "核心特权", "对比与时间轴", "产品套餐", "倒计时"].includes(category) && (
            <Field label="文本内容">
              <textarea
                rows={4}
                value={active.content ?? ""}
                onChange={(e) => updateNode(active.id, { content: e.target.value })}
              />
            </Field>
          )}
        </>
      )}

      {(tab === "style" || tab === "layout") && (
        <div>
          <Field label="字体大小"><input defaultValue="16px" /></Field>
          <Field label="文本对齐"><div className="select-like">居中对齐 <ChevronDown size={14} /></div></Field>
          <Field label="内边距"><input defaultValue="12px" /></Field>
          <Field label="外边距"><input defaultValue="8px" /></Field>
          <Field label="最大宽度"><input defaultValue="100%" /></Field>
        </div>
      )}
    </div>
  );
}

function WorkspaceHeader({ selected, setView, duplicate, setModal, markUnknown, notify }) {
  const cleanTitle = selected.name ? selected.name.replace(/\s*\([^)]*\)/g, "").trim() : "";
  return (
    <>
      <button className="back" onClick={() => setView("list")}><ArrowLeft size={16} /> 返回列表</button>
      <div className="workspace-heading">
        <div className="workspace-title-wrap">
          <h1 className="compact-workspace-title">{cleanTitle}</h1>
        </div>
        <div className="workspace-actions">
          <button className="secondary compact-action-btn" onClick={duplicate}><Copy size={14} /> 复制</button>
          <button className="primary compact-action-btn" onClick={() => notify?.("配置保存成功")}>保存配置</button>
        </div>
      </div>
    </>
  );
}

function TemplatesModal({ selected, setSelected, onClose, onOpenAi, onOpenBuilder }) {
  const [pendingSelected, setPendingSelected] = useState(selected);
  const [categoryFilter, setCategoryFilter] = useState("HelloTalk 官方");

  const filteredTemplates = templates.filter((t) => categoryFilter === "All" || t.category === categoryFilter);
  const pendingTemplate = pendingSelected !== null ? templates[pendingSelected] : null;

  return (
    <Modal title="选择付费墙模版 (Choose a template)" onClose={onClose} wide>
      <div className="template-modal">
        <aside>
          <div className="filter-heading"><strong>模版分类</strong><span className="filter-count">{filteredTemplates.length}</span></div>
          <p>业务类别</p>
          <label className="filter-option">
            <input type="radio" checked={categoryFilter === "HelloTalk 官方"} onChange={() => setCategoryFilter("HelloTalk 官方")} /> HelloTalk 官方 (12)
          </label>
          <label className="filter-option">
            <input type="radio" checked={categoryFilter === "Popular"} onChange={() => setCategoryFilter("Popular")} /> 国际流行 (Popular)
          </label>
          <label className="filter-option">
            <input type="radio" checked={categoryFilter === "All"} onChange={() => setCategoryFilter("All")} /> 全部模版 (All)
          </label>
        </aside>

        <div className="template-content">
          <div className="template-selection-summary">
            {pendingTemplate ? (
              <>
                <span>已选模版</span>
                <strong>{pendingTemplate.title}</strong>
                <small>{pendingTemplate.subtitle}</small>
              </>
            ) : <span>尚未选择模版</span>}
          </div>

          <div className="template-grid rich-template-grid">
            {filteredTemplates.map((template) => {
              const index = templates.indexOf(template);
              return (
                <button
                  key={template.id}
                  className={`template ${pendingSelected === index ? "selected" : ""}`}
                  onClick={() => setPendingSelected(index)}
                  style={{ minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                >
                  <div>
                    <div style={{ height: 90, borderRadius: 6, background: template.theme === "sale" ? "#fee2e2" : template.theme === "night" ? "#1e293b" : template.theme === "ocean" ? "#e0f2fe" : template.theme === "lime" ? "#ecfdf5" : "#e0e7ff", display: "grid", placeItems: "center", color: template.theme === "night" ? "#fff" : "#4338ca", fontWeight: 800, fontSize: 13, padding: 8, textAlign: "center" }}>
                      {template.title}
                    </div>
                    <strong style={{ fontSize: 12, marginTop: 8, display: "block" }}>{template.title}</strong>
                    <small style={{ color: "#64748b", fontSize: 10 }}>{template.subtitle}</small>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <span style={{ fontSize: 9, padding: "2px 6px", background: "#f1f5f9", borderRadius: 4, color: "#475569" }}>
                      {template.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="modal-actions">
            <button className="secondary" onClick={onClose}>取消</button>
            <button className="primary" disabled={pendingSelected === null} onClick={() => onOpenBuilder(pendingSelected)}>
              在构建器中打开 (Open in Builder)
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function LayoutSettings({
  markUnknown,
  boundary,
  setModal,
  appliedTemplate,
  isOnboardingPage,
  activeSubTemplate,
  updateSubTemplateTheme,
  onTriggerRetainModal,
  onSwitchSubTemplate,
}) {
  const [langModalField, setLangModalField] = useState(null);

  if (isOnboardingPage) {
    const theme = activeSubTemplate?.theme || {};
    const curSubId = activeSubTemplate?.id || "trial-tpl-1";
    const retain = theme.retainModal || {
      title: "提示",
      prompt: "你确定要放弃免费试用 VIP 的机会吗？关闭后无法再打开此页面。",
      primaryBtn: "不，我不放弃",
      cancelBtn: "是，暂时不用",
    };
    const showDismiss = theme.showDismissBtn !== false;

    return (
      <div className="property-scroll layout-settings">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #f1f5f9" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0f172a" }}>注册引导与免费试用页 设置</h3>
            <span style={{ fontSize: 10, color: "#64748b" }}>HelloTalk 官方后台 CMS 1:1 对标配置</span>
          </div>
          <button className="secondary" style={{ fontSize: 10.5, padding: "3px 8px" }} onClick={() => setModal({ kind: "templates" })}>
            切换页面
          </button>
        </div>

        {/* 1. 样式模版单选 */}
        <div style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#334155", display: "block", marginBottom: 6 }}>
            样式模版 <span style={{ color: "#ef4444" }}>*</span>
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { id: "trial-tpl-1", name: "模版四-单张样式新版", desc: "单图吉祥物 · 3阶段时间轴 · 双套餐切换" },
              { id: "trial-tpl-2", name: "模版五-多张轮播图新版", desc: "3张轮播卡片 · 垂直提醒 · 试用后套餐" },
            ].map((t) => {
              const checked = curSubId === t.id;
              return (
                <label
                  key={t.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: checked ? "1.5px solid #6366f1" : "1px solid #e2e8f0",
                    background: checked ? "#f5f3ff" : "#ffffff",
                    cursor: "pointer",
                  }}
                  onClick={() => onSwitchSubTemplate?.(t.id)}
                >
                  <input
                    type="radio"
                    name="onboarding-sub-template"
                    checked={checked}
                    onChange={() => onSwitchSubTemplate?.(t.id)}
                    style={{ marginTop: 2 }}
                  />
                  <div>
                    <strong style={{ fontSize: 12, color: "#0f172a", display: "block" }}>{t.name}</strong>
                    <span style={{ fontSize: 10, color: "#64748b" }}>{t.desc}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* 2. 顶部标题 */}
        <Field label="顶部标题">
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              value={theme.titleText ?? (curSubId === "trial-tpl-1" ? "3天会员免费试用" : "专享会员\n更好练习外语")}
              onChange={(e) => updateSubTemplateTheme?.({ titleText: e.target.value })}
              placeholder="请输入顶部主标题"
            />
            <button
              type="button"
              className="secondary"
              style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "6px 8px", fontSize: 11, whiteSpace: "nowrap" }}
              onClick={() => setLangModalField({ name: "titleText", label: "顶部标题", current: theme.titleText || "3天会员免费试用" })}
            >
              <Globe size={13} />
              <span>多语言</span>
            </button>
          </div>
        </Field>

        {/* 3. 按钮文案 */}
        <Field label="按钮文案">
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              value={theme.btnText ?? "开启3天 VIP免费试用"}
              onChange={(e) => updateSubTemplateTheme?.({ btnText: e.target.value })}
              placeholder="请输入主行动按钮文案"
            />
            <button
              type="button"
              className="secondary"
              style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "6px 8px", fontSize: 11, whiteSpace: "nowrap" }}
              onClick={() => setLangModalField({ name: "btnText", label: "按钮文案", current: theme.btnText || "开启3天 VIP免费试用" })}
            >
              <Globe size={13} />
              <span>多语言</span>
            </button>
          </div>
        </Field>

        {/* 4. 是否展示底部关闭按钮 */}
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#334155", display: "block", marginBottom: 6 }}>
            是否展示底部关闭按钮
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, cursor: "pointer" }}>
              <input
                type="radio"
                name="showDismissBtn"
                checked={showDismiss}
                onChange={() => updateSubTemplateTheme?.({ showDismissBtn: true })}
              />
              <span>是</span>
            </label>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, cursor: "pointer" }}>
              <input
                type="radio"
                name="showDismissBtn"
                checked={!showDismiss}
                onChange={() => updateSubTemplateTheme?.({ showDismissBtn: false })}
              />
              <span>否</span>
            </label>
          </div>
        </div>

        {/* 5. 关闭按钮文案 */}
        {showDismiss && (
          <Field label="关闭按钮文案">
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input
                value={theme.dismissBtnText ?? "不，谢谢"}
                onChange={(e) => updateSubTemplateTheme?.({ dismissBtnText: e.target.value })}
                placeholder="例如：不，谢谢"
              />
              <button
                type="button"
                className="secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "6px 8px", fontSize: 11, whiteSpace: "nowrap" }}
                onClick={() => setLangModalField({ name: "dismissBtnText", label: "关闭按钮文案", current: theme.dismissBtnText || "不，谢谢" })}
              >
                <Globe size={13} />
                <span>多语言</span>
              </button>
            </div>
          </Field>
        )}

        {/* 6. 挽留弹窗配置 */}
        <div
          style={{
            marginTop: 14,
            padding: 12,
            background: "#f8fafc",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <strong style={{ fontSize: 12, color: "#0f172a", display: "block" }}>挽留弹窗配置</strong>
              <span style={{ fontSize: 9.5, color: "#64748b" }}>点击关闭或跳过时触发弹窗</span>
            </div>
            <button
              type="button"
              className="primary"
              style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, padding: "4px 8px", borderRadius: 6 }}
              onClick={onTriggerRetainModal}
              title="在画布上直接弹出挽留弹窗预览"
            >
              <Eye size={12} />
              <span>画布预览挽留弹窗</span>
            </button>
          </div>

          <Field label="弹窗标题">
            <input
              value={retain.title ?? "提示"}
              onChange={(e) =>
                updateSubTemplateTheme?.({
                  retainModal: { ...retain, title: e.target.value },
                })
              }
            />
          </Field>

          <Field label="提示文案">
            <textarea
              rows={2}
              style={{ resize: "vertical", fontSize: 11.5 }}
              value={retain.prompt ?? "你确定要放弃免费试用 VIP 的机会吗？关闭后无法再打开此页面。"}
              onChange={(e) =>
                updateSubTemplateTheme?.({
                  retainModal: { ...retain, prompt: e.target.value },
                })
              }
            />
          </Field>

          <Field label="主按钮文案 (挽留)">
            <input
              value={retain.primaryBtn ?? "不，我不放弃"}
              onChange={(e) =>
                updateSubTemplateTheme?.({
                  retainModal: { ...retain, primaryBtn: e.target.value },
                })
              }
            />
          </Field>

          <Field label="关闭按钮文案 (确认放弃)">
            <input
              value={retain.cancelBtn ?? "是，暂时不用"}
              onChange={(e) =>
                updateSubTemplateTheme?.({
                  retainModal: { ...retain, cancelBtn: e.target.value },
                })
              }
            />
          </Field>
        </div>

        {/* 多语言弹窗 */}
        {langModalField && (
          <Modal title={`多语言翻译配置: ${langModalField.label}`} onClose={() => setLangModalField(null)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "8px 0" }}>
              <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>
                配置 <strong>{langModalField.label}</strong> 在不同客户端语言环境下的文案：
              </p>
              <Field label="简体中文 (zh-CN) [当前默认]">
                <input value={langModalField.current} readOnly style={{ background: "#f8fafc" }} />
              </Field>
              <Field label="English (en-US)">
                <input
                  defaultValue={
                    langModalField.name === "titleText"
                      ? "3-Day VIP Free Trial"
                      : langModalField.name === "btnText"
                      ? "Start 3-Day VIP Free Trial"
                      : "No, Thanks"
                  }
                />
              </Field>
              <Field label="繁体中文 (zh-Hant)">
                <input
                  defaultValue={
                    langModalField.name === "titleText"
                      ? "3天會員免費試用"
                      : langModalField.name === "btnText"
                      ? "開啟3天 VIP免費試用"
                      : "不，謝謝"
                  }
                />
              </Field>
              <Field label="日本語 (ja-JP)">
                <input
                  defaultValue={
                    langModalField.name === "titleText"
                      ? "3日間VIP無料体験"
                      : langModalField.name === "btnText"
                      ? "3日間VIP無料体験を開始"
                      : "結構です"
                  }
                />
              </Field>
              <Field label="한국어 (ko-KR)">
                <input
                  defaultValue={
                    langModalField.name === "titleText"
                      ? "3일 VIP 무료 체험"
                      : langModalField.name === "btnText"
                      ? "3일 VIP 무료 체험 시작"
                      : "괜찮습니다"
                  }
                />
              </Field>
              <div className="modal-actions" style={{ marginTop: 12 }}>
                <button className="secondary" onClick={() => setLangModalField(null)}>取消</button>
                <button className="primary" onClick={() => setLangModalField(null)}>保存多语言</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div className="property-scroll layout-settings">
      <h3>全局布局设置</h3>
      <Field label="当前模版">
        <div className="inline-select">
          <span>{appliedTemplate !== null ? templates[appliedTemplate].title : "HelloTalk Onboarding"}</span>
          <button className="secondary" onClick={() => setModal({ kind: "templates" })}>更换模版</button>
        </div>
      </Field>
      <Field label="设备容器"><div className="select-like">iPhone 15 Pro (393 × 852) <ChevronDown size={14} /></div></Field>
      <Field label="默认字体"><div className="select-like">PingFang SC / SF Pro Display <ChevronDown size={14} /></div></Field>
      <label className="switch-row"><input type="checkbox" defaultChecked /><span>开启</span><strong>沉浸式顶部渐变遮罩</strong></label>
      <label className="switch-row"><input type="checkbox" defaultChecked /><span>开启</span><strong>显示底部服务条款与恢复购买</strong></label>
    </div>
  );
}

function ProductRow({ product, offer, onProductChange, onRemove, markUnknown, readOnly = false }) {
  return (
    <div className="product-row">
      <select value={product} disabled={readOnly} onChange={(event) => onProductChange?.(event.target.value)}>
        {readOnly ? <option>{product}</option> : productOptions.map((option) => <option key={option}>{option}</option>)}
      </select>
      <select defaultValue={offer ?? "常规定价"} disabled={readOnly}>
        <option>{offer ?? "常规定价"}</option>
        <option>限时 5 折</option>
        <option>赠送 7 天试用</option>
      </select>
      <button className={`icon ${readOnly ? "unknown-action" : ""}`} onClick={() => !readOnly && onRemove?.()}><X size={17} /></button>
    </div>
  );
}

function Metrics({ setView, markUnknown }) {
  const metrics = ["曝光人数 (Views)", "转化购买 (Purchases)", "试用开启 (Trials)", "ARPAS (订阅客单价)", "总营收 (Revenue)"];
  return (
    <section className="metrics-page">
      <button className="back" onClick={() => setView("builder")}><ArrowLeft size={18} /> 返回构建器</button>
      <div className="workspace-heading">
        <div><span className="eyebrow">数据分析</span><h1>付费墙转化指标看板</h1></div>
      </div>
      <div className="metric-grid" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {metrics.map((m, idx) => (
          <div className="metric-card" key={m}>
            <span>{m}</span>
            <strong style={{ marginTop: 12 }}>{idx === 0 ? "48,290" : idx === 1 ? "3,892" : idx === 2 ? "12,408" : idx === 3 ? "¥188.5" : "¥732,840"}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComplianceModal({ compliance, setCompliance, rememberCompliance, setRememberCompliance, onClose, onAccept, context = "draft" }) {
  const policies = [
    "明确披露免费试用期天数与后续扣款金额。",
    "自动续期订阅须提供清晰的一键取消指引。",
    "包含完整的服务条款（Terms）与隐私政策（Privacy）链接。",
    "不可向用户隐瞒或误导连续包月/包年的扣费周期。"
  ];
  return (
    <Modal title="付费墙发布合规确认" onClose={onClose}>
      <p className="modal-copy">确保付费墙严格遵守 Apple App Store 审核准则与 Google Play 政策。</p>
      <ul className="policy-list">
        {policies.map((p) => <li key={p}><Check size={16} /> {p}</li>)}
      </ul>
      <label className="check-row">
        <input type="checkbox" checked={compliance} onChange={(e) => setCompliance(e.target.checked)} />
        <span>我确认此付费墙符合应用商店合规审查要求。</span>
      </label>
      <div className="modal-actions">
        <button className="secondary" onClick={onClose}>取消</button>
        <button className="primary" disabled={!compliance} onClick={onAccept}>确认保存</button>
      </div>
    </Modal>
  );
}

function TemplateRequirementsModal({ onClose, onContinue }) {
  const [termsUrl, setTermsUrl] = useState("https://hellotalk.com/terms");
  const [privacyUrl, setPrivacyUrl] = useState("https://hellotalk.com/privacy");
  return (
    <Modal title="模版必备链接验证" onClose={onClose}>
      <p className="modal-copy">首次保存模版需要核验服务条款与隐私政策。</p>
      <Field label="服务条款 URL"><input value={termsUrl} onChange={(e) => setTermsUrl(e.target.value)} /></Field>
      <Field label="隐私政策 URL"><input value={privacyUrl} onChange={(e) => setPrivacyUrl(e.target.value)} /></Field>
      <div className="modal-actions">
        <button className="secondary" onClick={onClose}>取消</button>
        <button className="primary" onClick={() => onContinue({ terms: termsUrl, privacy: privacyUrl })}>继续保存</button>
      </div>
    </Modal>
  );
}

function ArchiveModal({ name, onClose, onArchive }) {
  const [value, setValue] = useState("");
  return (
    <Modal title="归档付费墙" onClose={onClose}>
      <p className="modal-copy">此操作不可撤销。请输入完整的付费墙名称以确认：</p>
      <Field label={`输入 "${name}"`}><input value={value} onChange={(e) => setValue(e.target.value)} /></Field>
      <div className="modal-actions">
        <button className="secondary" onClick={onClose}>取消</button>
        <button className="danger-button" disabled={value !== name} onClick={onArchive}>确认归档</button>
      </div>
    </Modal>
  );
}

function DeviceTestModal({ onClose }) {
  return (
    <Modal title="真机扫码体验 (Test on Device)" onClose={onClose}>
      <div className="device-test" style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ width: 140, height: 140, margin: "0 auto 16px", border: "2px solid #e2e8f0", borderRadius: 12, display: "grid", placeItems: "center", background: "#f8fafc" }}>
          <Smartphone size={48} color="#64748b" />
        </div>
        <p className="modal-copy">使用手机相机扫描二维码，或通过 HelloTalk App 内部预览链接打开体验。</p>
        <div className="test-link" style={{ display: "flex", gap: 6, maxWidth: 360, margin: "0 auto" }}>
          <input defaultValue="https://hellotalk.com/paywall/preview?id=ht-onboarding" readOnly />
          <button className="icon" title="复制链接"><Copy size={16} /></button>
        </div>
        <div className="modal-actions" style={{ justifyContent: "center", marginTop: 24 }}>
          <button className="primary" onClick={onClose}>完成</button>
        </div>
      </div>
    </Modal>
  );
}

function AiModal({ onClose }) {
  return (
    <Modal title="AI 智能生成付费墙 (AI Generator)" onClose={onClose}>
      <div className="ai-empty">
        <Sparkles size={32} color="#6366F1" />
        <h3>描述你需要的付费墙</h3>
        <p>输入你的业务场景与偏好（如：“黑五双套餐限时5折”、“访客拦截突出头像模糊”），AI 将自动生成完整的图层节点树。</p>
      </div>
      <textarea className="prompt" placeholder="例如：设计一张针对英语学习者的 7 天免费试用付费墙，突出无限制翻译和 AI 语法纠错..." />
      <div className="modal-actions">
        <button className="secondary" onClick={onClose}>取消</button>
        <button className="primary" onClick={() => { window.alert("AI 模版结构已生成并可载入构建器！"); onClose(); }}>立即生成</button>
      </div>
    </Modal>
  );
}

function MigrationModal({ onClose }) {
  return (
    <Modal title="从已有设计复制" onClose={onClose}>
      <p className="modal-copy">选择源业务线，直接克隆其元素树与样式配置。</p>
      <Field label="选择来源"><input defaultValue="HelloTalk iOS - Onboarding Trial" readOnly /></Field>
      <div className="modal-actions">
        <button className="secondary" onClick={onClose}>取消</button>
        <button className="primary" onClick={onClose}>开始复制</button>
      </div>
    </Modal>
  );
}

function AddAppModal({ onClose }) {
  return (
    <Modal title="新建业务线" onClose={onClose}>
      <Field label="业务线名称"><input placeholder="例如：HelloTalk 英语外教专区" /></Field>
      <div className="modal-actions">
        <button className="secondary" onClick={onClose}>取消</button>
        <button className="primary" onClick={onClose}>确认创建</button>
      </div>
    </Modal>
  );
}

function UnknownModal({ item, onClose }) {
  return (
    <Modal title={`${item.id} · 实测边界说明`} onClose={onClose}>
      <div className="unknown">
        <span className="eyebrow">已实测特征</span>
        <p>{item.known}</p>
        <span className="eyebrow">未复现缺口</span>
        <p>{item.unknown}</p>
      </div>
      <div className="modal-actions"><button className="primary" onClick={onClose}>关闭</button></div>
    </Modal>
  );
}

function Modal({ title, onClose, children, wide = false }) {
  return (
    <div className="modal-backdrop">
      <section className={`modal ${wide ? "wide" : ""}`}>
        <header><h2>{title}</h2><button className="icon" onClick={onClose}><X size={19} /></button></header>
        {children}
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return <label className="form-field"><span>{label}</span>{children}</label>;
}

function StateBadge({ state }) {
  return <span className={`state ${state.toLowerCase()}`}><i /> {state}</span>;
}

function Sort() {
  return <span className="sort">↕</span>;
}

function Help() {
  return <CircleHelp size={15} className="help" />;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: "sans-serif", background: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ maxWidth: 600, background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #fee2e2" }}>
            <h2 style={{ color: "#ef4444", fontSize: 18, marginTop: 0 }}>页面渲染遇到异常</h2>
            <p style={{ fontSize: 13, color: "#64748b" }}>{this.state.error?.message || "未知错误"}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: 13 }}
              >
                重置缓存并刷新页面
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}
              >
                直接刷新
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
