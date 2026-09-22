import React, { useState } from "react";
import {
  Layers,
  Sparkles,
  Eye,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Copy,
  Edit3,
  Trash2,
  Plus,
  Search,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Code,
  Smartphone,
  Flame,
  Zap,
  Tag,
  Gift,
} from "lucide-react";
import {
  ContentCrownMascot,
  ContentBinocularsMascot,
  ContentTranslateCoinMascot,
} from "./ContentPaywallMascots";

// 3 Default Styles from HelloTalk backend screenshots
export const OFFICIAL_CONTENT_PAYWALL_STYLES = [
  {
    id: "style-vip-expired",
    styleIdNum: "101",
    name: "VIP失效样式测试 (所有变量)",
    styleType: "VIP失效样式",
    status: true,
    updatedAt: "2026-09-18 16:42:10",
    themeColor: "#6c3ede",
    bgGradient: "linear-gradient(180deg, #EBE4FA 0%, #F5F0FF 25%, #FFFFFF 65%)",
    userName: "Yeah",
    userFlag: "🇩🇪",
    metricValues: [972, 762, 487, 673, 837, 899, 116, 156, 939, 446, 650, 442],
    subtitle: "你的进步有目共睹！",
    headlineBold: "VIP现已过期",
    headlineSub: "立即续订，别让沟通速度慢下来！",
    highlightWord: "立即续订",
    mascotType: "crown-gift",
    ctaText: "立即续订",
    ctaColor: "#6c3ede",
    boundRuleCount: 2,
    targetAudience: "历史曾付费 VIP · 会员已失效过期 1~30 天",
  },
  {
    id: "style-non-vip-visitor",
    styleIdNum: "102",
    name: "【历史未付费】访客",
    styleType: "非VIP样式",
    status: true,
    updatedAt: "2026-09-19 11:20:05",
    themeColor: "#ff6a00",
    bgGradient: "linear-gradient(180deg, #FFF5EB 0%, #FEF3E2 25%, #FFFFFF 65%)",
    userName: "Yeah",
    userFlag: "🇩🇪",
    visitorCount: 21,
    visitorTitle: "21 new visitors in the past 7 days 👀",
    subtitle: "Your profile is getting noticed",
    hook1: "Let more people know you",
    hook2: "Reach more people",
    mascotType: "binoculars",
    disclaimer: "Upgrade to VIP to see who viewed your profile",
    ctaText: "Upgrade Now",
    ctaColor: "#ff6a00",
    boundRuleCount: 3,
    targetAudience: "历史从未付费注册用户 · 7 天内访客记录 > 0",
  },
  {
    id: "style-unsubscribed",
    styleIdNum: "103",
    name: "非订阅状态测试 (所有变量)",
    styleType: "非订阅状态样式",
    status: true,
    updatedAt: "2026-09-19 15:05:44",
    themeColor: "#ff8a00",
    bgGradient: "linear-gradient(180deg, #FFF9EB 0%, #FEF7E5 25%, #FFFFFF 65%)",
    userName: "Yeah",
    userFlag: "🇩🇪",
    metricValues: [899, 164, 681, 640, 367, 223, 292, 164, 670, 150, 169, 267],
    subtitle: "你已经在为交朋友认真努力了",
    headlineBold: "升级VIP",
    headlineSub: "让关系继续发生。",
    mascotType: "translate-coin",
    ctaText: "升级 VIP",
    ctaColor: "#ff8a00",
    boundRuleCount: 2,
    targetAudience: "普通免费活跃用户 · 翻译/聊天达到日常触发阈值",
  },
];

// Content Paywall Rules (Rules Engine)
export const OFFICIAL_CONTENT_PAYWALL_RULES = [
  {
    ruleId: "RULE_CP_2026_001",
    name: "【VIP到期】流失挽留与续订唤醒规则",
    triggerScene: "VIP到期启动弹窗 (vip_expired_dialog)",
    triggerCode: "SCENE_VIP_EXPIRED",
    audienceSegment: "历史付费但已失效 · 过期 1~14 天",
    boundStyleId: "style-vip-expired",
    boundStyleName: "VIP失效样式测试 (所有变量)",
    boundSku: "专属挽留年卡 ¥148/年 (原价¥298)",
    priority: 100,
    abRatio: "100%",
    status: true,
    injectedVars: ["study_metrics", "days_expired"],
  },
  {
    ruleId: "RULE_CP_2026_002",
    name: "【谁看过我】未付费访客好奇心转化规则",
    triggerScene: "点击谁看过我列表拦截 (visitor_unlock)",
    triggerCode: "SCENE_VISITOR_PROFILE",
    audienceSegment: "历史从未付费 · 7天内主页访客数 ≥ 1",
    boundStyleId: "style-non-vip-visitor",
    boundStyleName: "【历史未付费】访客",
    boundSku: "访客特惠包月 ¥18/月 (连续包月)",
    priority: 95,
    abRatio: "50% 实验组 A",
    status: true,
    injectedVars: ["visitor_count_7d", "recent_avatar_blurs"],
  },
  {
    ruleId: "RULE_CP_2026_003",
    name: "【日常翻译】免费活跃用户沟通关系推进规则",
    triggerScene: "单日翻译额度超限 (translate_limit_pop)",
    triggerCode: "SCENE_TRANSLATE_LIMIT",
    audienceSegment: "免费活跃用户 · 连续登录 ≥ 7天 · 无有效VIP",
    boundStyleId: "style-unsubscribed",
    boundStyleName: "非订阅状态测试 (所有变量)",
    boundSku: "经典连续包月 VIP ¥28/月",
    priority: 85,
    abRatio: "100%",
    status: true,
    injectedVars: ["chat_times_total", "friend_count"],
  },
];

export default function ContentPaywallManager({ onOpenInBuilder, notify }) {
  const [activeTab, setActiveTab] = useState("styles"); // "styles" | "rules"
  const [stylesList, setStylesList] = useState(OFFICIAL_CONTENT_PAYWALL_STYLES);
  const [rulesList, setRulesList] = useState(OFFICIAL_CONTENT_PAYWALL_RULES);

  // Filter states for styles table
  const [searchStyleName, setSearchStyleName] = useState("");
  const [filterStyleType, setFilterStyleType] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  // Modal State matching user's screenshot
  const [editingModal, setEditingModal] = useState(null); // null or style object
  const [modalForm, setModalForm] = useState({
    name: "",
    styleType: "VIP失效样式",
    status: true,
  });

  const handleOpenEditModal = (styleItem) => {
    setEditingModal(styleItem);
    setModalForm({
      name: styleItem.name,
      styleType: styleItem.styleType,
      status: styleItem.status,
    });
  };

  const handleSaveModal = () => {
    if (!editingModal) return;
    setStylesList((prev) =>
      prev.map((s) =>
        s.id === editingModal.id
          ? {
              ...s,
              name: modalForm.name,
              styleType: modalForm.styleType,
              status: modalForm.status,
              updatedAt: "刚刚 (已更新)",
            }
          : s
      )
    );
    notify?.("样式保存成功！");
    setEditingModal(null);
  };

  const handleToggleStyleStatus = (id) => {
    setStylesList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: !s.status } : s))
    );
  };

  const handleToggleRuleStatus = (ruleId) => {
    setRulesList((prev) =>
      prev.map((r) => (r.ruleId === ruleId ? { ...r, status: !r.status } : r))
    );
  };

  const filteredStyles = stylesList.filter((s) => {
    if (searchStyleName && !s.name.includes(searchStyleName)) return false;
    if (filterStyleType !== "ALL" && s.styleType !== filterStyleType) return false;
    if (filterStatus !== "ALL") {
      const matchStatus = filterStatus === "OPEN" ? true : false;
      if (s.status !== matchStatus) return false;
    }
    return true;
  });

  return (
    <div style={{ padding: "0 4px 60px" }}>
      {/* Top Breadcrumbs matching HelloTalk CMS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          padding: "10px 16px",
          background: "#FFFFFF",
          borderRadius: 8,
          border: "1px solid #E2E8F0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748B" }}>
          <span>商品与支付管理</span>
          <ChevronRight size={14} />
          <span>VIP样式管理</span>
          <ChevronRight size={14} />
          <strong style={{ color: "#1E293B", fontWeight: 700 }}>
            {activeTab === "styles"
              ? "内容paywall样式"
              : activeTab === "rules"
              ? "内容paywall规则"
              : "架构关联全景"}
          </strong>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 12,
              padding: "4px 8px",
              background: "#F1F5F9",
              borderRadius: 4,
              color: "#475569",
              fontWeight: 600,
            }}
          >
            测试环境 · HelloTalk CMS v2.4
          </span>
        </div>
      </div>

      {/* Main Tab Nav Switcher */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 20,
          borderBottom: "2px solid #E2E8F0",
          paddingBottom: 2,
        }}
      >
        <button
          onClick={() => setActiveTab("styles")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 18px",
            fontSize: 14,
            fontWeight: 700,
            borderRadius: "6px 6px 0 0",
            border: "none",
            cursor: "pointer",
            background: activeTab === "styles" ? "#1890FF" : "transparent",
            color: activeTab === "styles" ? "#FFFFFF" : "#64748B",
            transition: "all 0.15s ease",
          }}
        >
          <Layers size={16} />
          <span>内容paywall样式 ({stylesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("rules")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 18px",
            fontSize: 14,
            fontWeight: 700,
            borderRadius: "6px 6px 0 0",
            border: "none",
            cursor: "pointer",
            background: activeTab === "rules" ? "#1890FF" : "transparent",
            color: activeTab === "rules" ? "#FFFFFF" : "#64748B",
            transition: "all 0.15s ease",
          }}
        >
          <Sliders size={16} />
          <span>内容paywall规则 ({rulesList.length})</span>
        </button>

      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 内容paywall样式 (1:1 對標用戶截圖) */}
      {/* ========================================================================= */}
      {activeTab === "styles" && (
        <div>
          {/* Query Filter Form */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 8,
              padding: "16px 20px",
              marginBottom: 16,
              border: "1px solid #E2E8F0",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "#475569", fontWeight: 600 }}>备注名称:</span>
              <input
                type="text"
                placeholder="请输入备注名称"
                value={searchStyleName}
                onChange={(e) => setSearchStyleName(e.target.value)}
                style={{
                  padding: "6px 12px",
                  fontSize: 13,
                  border: "1px solid #CBD5E1",
                  borderRadius: 6,
                  width: 180,
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "#475569", fontWeight: 600 }}>样式类型:</span>
              <select
                value={filterStyleType}
                onChange={(e) => setFilterStyleType(e.target.value)}
                style={{
                  padding: "6px 12px",
                  fontSize: 13,
                  border: "1px solid #CBD5E1",
                  borderRadius: 6,
                  background: "#FFFFFF",
                }}
              >
                <option value="ALL">全部样式类型</option>
                <option value="VIP失效样式">VIP失效样式</option>
                <option value="非VIP样式">非VIP样式</option>
                <option value="非订阅状态样式">非订阅状态样式</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "#475569", fontWeight: 600 }}>生效状态:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: "6px 12px",
                  fontSize: 13,
                  border: "1px solid #CBD5E1",
                  borderRadius: 6,
                  background: "#FFFFFF",
                }}
              >
                <option value="ALL">全部状态</option>
                <option value="OPEN">开 (生效中)</option>
                <option value="CLOSED">关 (未生效)</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
              <button
                onClick={() => {
                  setSearchStyleName("");
                  setFilterStyleType("ALL");
                  setFilterStatus("ALL");
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 14px",
                  background: "#F8FAFC",
                  border: "1px solid #CBD5E1",
                  borderRadius: 6,
                  fontSize: 13,
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                <RotateCcw size={14} /> 重置
              </button>
              <button
                onClick={() => notify?.("已执行筛选查询")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 16px",
                  background: "#1890FF",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 13,
                  cursor: "pointer",
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
              >
                <Search size={14} /> 查询
              </button>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div
            style={{
              padding: "12px 18px",
              background: "#F0F9FF",
              border: "1px solid #BAE6FD",
              borderRadius: 8,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#0369A1" }}>
              <CheckCircle2 size={18} color="#0284C7" />
              <span>
                <strong>已 1:1 对标真实后台 3 大内容样式</strong>：点击列表右侧{" "}
                <code style={{ background: "#E0F2FE", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>
                  [✎ 编辑]
                </code>{" "}
                即可呼出与您截图中一模一样的「左表单 + 右 iPhone 画布」编辑弹窗！
              </span>
            </div>
            <button
              onClick={() => onOpenInBuilder?.("ht-content-paywall")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                background: "#0284C7",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Smartphone size={14} /> 进视觉构建器 (Builder) 调试
            </button>
          </div>

          {/* Styles Table */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 8,
              border: "1px solid #E2E8F0",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 700, width: 80 }}>序号</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>备注名称</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>样式类型</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>生效状态</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>样式配置</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>关联规则数</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>更新时间</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700, textAlign: "right" }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredStyles.map((item, index) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: "1px solid #F1F5F9",
                      background: index % 2 === 0 ? "#FFFFFF" : "#FCFCFD",
                    }}
                  >
                    <td style={{ padding: "14px 16px", color: "#94A3B8", fontFamily: "monospace" }}>
                      #{item.styleIdNum}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: item.themeColor,
                          }}
                        />
                        <strong style={{ color: "#1E293B", fontSize: 14 }}>{item.name}</strong>
                      </div>
                      <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>
                        适用受众：{item.targetAudience}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 700,
                          background:
                            item.styleType === "VIP失效样式"
                              ? "#F3E8FF"
                              : item.styleType === "非VIP样式"
                              ? "#FFF7ED"
                              : "#FEF9C3",
                          color:
                            item.styleType === "VIP失效样式"
                              ? "#6B21A8"
                              : item.styleType === "非VIP样式"
                              ? "#C2410C"
                              : "#854D0E",
                        }}
                      >
                        {item.styleType}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <button
                        onClick={() => handleToggleStyleStatus(item.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 10px",
                          borderRadius: 20,
                          border: "none",
                          cursor: "pointer",
                          fontSize: 12,
                          fontWeight: 700,
                          background: item.status ? "#1890FF" : "#CBD5E1",
                          color: "#FFFFFF",
                          transition: "background 0.2s ease",
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#FFFFFF",
                          }}
                        />
                        {item.status ? "开" : "关"}
                      </button>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "5px 12px",
                          background: "#FFFFFF",
                          border: "1px solid #1890FF",
                          color: "#1890FF",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        <Edit3 size={13} />
                        <span>编辑样式</span>
                      </button>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <button
                        onClick={() => setActiveTab("rules")}
                        style={{
                          padding: "2px 8px",
                          borderRadius: 4,
                          background: "#EEF2FF",
                          color: "#4F46E5",
                          border: "none",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        title="点击跳转查看绑定的规则"
                      >
                        {item.boundRuleCount} 条规则生效中 &rarr;
                      </button>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#64748B", fontSize: 12 }}>
                      {item.updatedAt}
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "4px 8px",
                            background: "transparent",
                            border: "none",
                            color: "#1890FF",
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          <Edit3 size={14} /> 编辑
                        </button>
                        <button
                          onClick={() => notify?.(`已复制样式副本：${item.name}_Copy`)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "4px 8px",
                            background: "transparent",
                            border: "none",
                            color: "#1890FF",
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          <Copy size={14} /> 复制
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 内容paywall规则 (规则引擎 & 样式绑定) */}
      {/* ========================================================================= */}
      {activeTab === "rules" && (
        <div>
          {/* Rules Description Banner */}
          <div
            style={{
              padding: "16px 20px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <Sliders size={22} color="#1890FF" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#1E293B" }}>
                  什么是「内容Paywall规则」？与「内容Paywall样式」如何协同？
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
                  <strong>「样式」解决页面长相，而「规则」决定投放下发策略。</strong>{" "}
                  一条规则绑定：<strong>触发时机</strong> (Trigger) + <strong>受众客群</strong> (Audience) +{" "}
                  <strong>具体样式</strong> (Bound Style) + <strong>挂载商品SKU</strong> (Pricing)。
                  当用户满足条件时，规则引擎自动提取绑定的样式模版，并注入该用户的学情数据或访客变量，下发至手机端渲染！
                </p>
              </div>
            </div>
          </div>

          {/* Rules Table */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 8,
              border: "1px solid #E2E8F0",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569" }}>
                  <th style={{ padding: "12px 14px", fontWeight: 700 }}>规则ID / 名称</th>
                  <th style={{ padding: "12px 14px", fontWeight: 700 }}>触发场景 (Trigger)</th>
                  <th style={{ padding: "12px 14px", fontWeight: 700 }}>命中受众人群</th>
                  <th style={{ padding: "12px 14px", fontWeight: 700, color: "#1890FF" }}>
                    🎯 绑定的内容Paywall样式
                  </th>
                  <th style={{ padding: "12px 14px", fontWeight: 700 }}>挂载商品SKU</th>
                  <th style={{ padding: "12px 14px", fontWeight: 700 }}>优先级 / 分流</th>
                  <th style={{ padding: "12px 14px", fontWeight: 700 }}>规则状态</th>
                  <th style={{ padding: "12px 14px", fontWeight: 700, textAlign: "right" }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {rulesList.map((rule, idx) => {
                  const targetStyle = stylesList.find((s) => s.id === rule.boundStyleId);
                  return (
                    <tr
                      key={rule.ruleId}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        background: idx % 2 === 0 ? "#FFFFFF" : "#FCFCFD",
                      }}
                    >
                      <td style={{ padding: "14px 14px" }}>
                        <div style={{ fontFamily: "monospace", color: "#64748B", fontSize: 11 }}>
                          {rule.ruleId}
                        </div>
                        <strong style={{ color: "#1E293B", fontSize: 13 }}>{rule.name}</strong>
                      </td>
                      <td style={{ padding: "14px 14px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "3px 8px",
                            background: "#F1F5F9",
                            borderRadius: 4,
                            fontSize: 12,
                            color: "#334155",
                          }}
                        >
                          <Zap size={12} color="#EAB308" />
                          {rule.triggerScene}
                        </span>
                      </td>
                      <td style={{ padding: "14px 14px", color: "#475569", fontSize: 12 }}>
                        {rule.audienceSegment}
                      </td>
                      <td style={{ padding: "14px 14px" }}>
                        <button
                          onClick={() => {
                            if (targetStyle) handleOpenEditModal(targetStyle);
                          }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "6px 12px",
                            background: "#EFF6FF",
                            border: "1px solid #93C5FD",
                            borderRadius: 6,
                            color: "#1D4ED8",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          <Layers size={13} />
                          <span>{rule.boundStyleName}</span>
                          <ExternalLink size={12} />
                        </button>
                      </td>
                      <td style={{ padding: "14px 14px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 12,
                            color: "#047857",
                            fontWeight: 600,
                          }}
                        >
                          <Tag size={12} />
                          {rule.boundSku}
                        </span>
                      </td>
                      <td style={{ padding: "14px 14px", fontSize: 12 }}>
                        <div>优先级: <strong style={{ color: "#1E293B" }}>{rule.priority}</strong></div>
                        <div style={{ color: "#64748B" }}>分流: {rule.abRatio}</div>
                      </td>
                      <td style={{ padding: "14px 14px" }}>
                        <button
                          onClick={() => handleToggleRuleStatus(rule.ruleId)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "4px 10px",
                            borderRadius: 20,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 12,
                            fontWeight: 700,
                            background: rule.status ? "#10B981" : "#CBD5E1",
                            color: "#FFFFFF",
                          }}
                        >
                          {rule.status ? "运行中" : "已停用"}
                        </button>
                      </td>
                      <td style={{ padding: "14px 14px", textAlign: "right" }}>
                        <button
                          onClick={() => {
                            if (targetStyle) handleOpenEditModal(targetStyle);
                          }}
                          style={{
                            padding: "4px 8px",
                            background: "transparent",
                            border: "none",
                            color: "#1890FF",
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          预览联动
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EXACT 1:1 MODAL: "编辑" (From User's Real Screenshot) */}
      {/* ========================================================================= */}
      {editingModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setEditingModal(null)}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 12,
              width: "100%",
              maxWidth: 960,
              height: 640,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: "1px solid #E2E8F0",
                background: "#202634",
                color: "#FFFFFF",
              }}
            >
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
                编辑内容Paywall样式 - {editingModal.styleType}
              </h3>
              <button
                onClick={() => setEditingModal(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94A3B8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                  borderRadius: 4,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: Left Form (40%) + Right Phone Canvas (60%) */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
              {/* Left Column: Real HelloTalk Form */}
              <div
                style={{
                  width: "42%",
                  padding: "28px 24px",
                  borderRight: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                  overflowY: "auto",
                }}
              >
                {/* Field 1: 备注名称 */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1E293B",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: "#EF4444", marginRight: 4 }}>*</span>
                    备注名称:
                  </label>
                  <input
                    type="text"
                    value={modalForm.name}
                    onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      fontSize: 13,
                      border: "1px solid #CBD5E1",
                      borderRadius: 6,
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Field 2: 样式类型 */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1E293B",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: "#EF4444", marginRight: 4 }}>*</span>
                    样式类型:
                  </label>
                  <select
                    value={modalForm.styleType}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setModalForm({ ...modalForm, styleType: newType });
                      const matchingPreset = OFFICIAL_CONTENT_PAYWALL_STYLES.find(
                        (s) => s.styleType === newType
                      );
                      if (matchingPreset) {
                        setEditingModal(matchingPreset);
                      }
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      fontSize: 13,
                      border: "1px solid #CBD5E1",
                      borderRadius: 6,
                      background: "#FFFFFF",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="VIP失效样式">VIP失效样式</option>
                    <option value="非VIP样式">非VIP样式</option>
                    <option value="非订阅状态样式">非订阅状态样式</option>
                  </select>
                </div>

                {/* Field 3: 生效状态 */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1E293B",
                      marginBottom: 8,
                    }}
                  >
                    生效状态:
                  </label>
                  <button
                    type="button"
                    onClick={() => setModalForm({ ...modalForm, status: !modalForm.status })}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "5px 14px",
                      borderRadius: 20,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 700,
                      background: modalForm.status ? "#1890FF" : "#CBD5E1",
                      color: "#FFFFFF",
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#FFFFFF",
                      }}
                    />
                    {modalForm.status ? "开" : "关"}
                  </button>
                </div>

                {/* Field 4: 样式配置 [✎ 编辑样式] */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1E293B",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: "#EF4444", marginRight: 4 }}>*</span>
                    样式配置:
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingModal(null);
                      onOpenInBuilder?.("ht-content-paywall");
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 16px",
                      background: "#EFF6FF",
                      border: "1px solid #1890FF",
                      borderRadius: 6,
                      color: "#1890FF",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Edit3 size={14} />
                    <span>编辑样式</span>
                  </button>
                  <p style={{ margin: "6px 0 0", fontSize: 11, color: "#64748B" }}>
                    点击将进入全功能可视化构建器，可直接增删图层节点与动态插值变量。
                  </p>
                </div>

                {/* Footer Save Actions */}
                <div style={{ marginTop: "auto", display: "flex", gap: 10, paddingTop: 20 }}>
                  <button
                    onClick={() => setEditingModal(null)}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      background: "#F1F5F9",
                      border: "1px solid #CBD5E1",
                      borderRadius: 6,
                      fontSize: 13,
                      cursor: "pointer",
                      color: "#475569",
                    }}
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSaveModal}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      background: "#1890FF",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 13,
                      color: "#FFFFFF",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    确定保存
                  </button>
                </div>
              </div>

              {/* Right Column: Exact 1:1 Mobile Canvas from Screenshot */}
              <div
                style={{
                  width: "58%",
                  background: "#F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  overflowY: "auto",
                }}
              >
                {/* Simulated Phone Frame */}
                <div
                  style={{
                    width: 310,
                    height: 540,
                    background: "#FFFFFF",
                    borderRadius: 36,
                    border: "8px solid #1E293B",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Phone Speaker Notch */}
                  <div
                    style={{
                      position: "absolute",
                      top: 6,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 60,
                      height: 4,
                      background: "#334155",
                      borderRadius: 2,
                      zIndex: 30,
                    }}
                  />

                  {/* Canvas Inner Card Content */}
                  <div
                    style={{
                      flex: 1,
                      background: editingModal.bgGradient,
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px 18px 16px",
                      position: "relative",
                      overflowY: "auto",
                    }}
                  >
                    {/* Top Dismiss Button (✕) */}
                    <div style={{ marginBottom: 12 }}>
                      <button
                        type="button"
                        onClick={() => setEditingModal(null)}
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: 2,
                          cursor: "pointer",
                          color: "#1E293B",
                        }}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* User Profile Row: Avatar + German Flag Badge + Name */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 16,
                      }}
                    >
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
                            fontSize: 15,
                            border: "2px solid #FFFFFF",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          }}
                        >
                          {editingModal.userName?.[0] || "Y"}
                        </div>
                        {/* German Flag Badge */}
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
                          title="Germany"
                        >
                          🇩🇪
                        </div>
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
                        {editingModal.userName}
                      </span>
                    </div>

                    {/* VARIANT 1: VIP失效样式 (Numbers array + 你的进步有目共睹 + VIP现已过期立即续订) */}
                    {editingModal.styleType === "VIP失效样式" && (
                      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        {/* Purple Numbers Matrix */}
                        <div
                          style={{
                            color: "#6C3EDE",
                            fontSize: 15,
                            fontWeight: 800,
                            lineHeight: 1.55,
                            letterSpacing: "0.02em",
                            marginBottom: 14,
                          }}
                        >
                          <div>972、762、487、673、</div>
                          <div>837、899、116、156、</div>
                          <div>939、446、650、442</div>
                        </div>

                        {/* Subtitle */}
                        <div
                          style={{
                            fontSize: 13,
                            color: "#475569",
                            fontWeight: 500,
                            marginBottom: 14,
                          }}
                        >
                          你的进步有目共睹！
                        </div>

                        {/* Bold Headline */}
                        <div
                          style={{
                            fontSize: 19,
                            fontWeight: 900,
                            color: "#111827",
                            lineHeight: 1.35,
                            marginBottom: 16,
                          }}
                        >
                          <div>VIP现已过期</div>
                          <div>
                            <span style={{ color: "#6C3EDE" }}>立即续订</span>，别让沟通速度慢下来！
                          </div>
                        </div>

                        {/* Mascot at bottom */}
                        <div
                          style={{
                            marginTop: "auto",
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: 10,
                          }}
                        >
                          <ContentCrownMascot size={110} />
                        </div>
                      </div>
                    )}

                    {/* VARIANT 2: 非VIP样式 (21 new visitors + Your profile getting noticed + Mascot) */}
                    {editingModal.styleType === "非VIP样式" && (
                      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        {/* Orange Stat & Headline */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 20, fontWeight: 900, color: "#111827", lineHeight: 1.3 }}>
                            <span style={{ color: "#FF6A00", fontSize: 26, marginRight: 6 }}>21</span>
                            new visitors in
                          </div>
                          <div style={{ fontSize: 20, fontWeight: 900, color: "#111827" }}>
                            the past 7 days 👀
                          </div>
                        </div>

                        {/* Subtitle */}
                        <div
                          style={{
                            fontSize: 13,
                            color: "#64748B",
                            fontWeight: 500,
                            marginBottom: 16,
                          }}
                        >
                          Your profile is getting noticed
                        </div>

                        {/* Value Proposition */}
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ color: "#6C3EDE", fontWeight: 700, fontSize: 15 }}>
                            Let more people know you
                          </div>
                          <div style={{ color: "#111827", fontWeight: 800, fontSize: 15, marginTop: 2 }}>
                            Reach more people
                          </div>
                        </div>

                        {/* Mascot in Center/Bottom */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "auto 0 10px",
                          }}
                        >
                          <ContentBinocularsMascot size={105} />
                        </div>

                        {/* Disclaimer */}
                        <div
                          style={{
                            fontSize: 11,
                            color: "#94A3B8",
                            textAlign: "center",
                            marginBottom: 10,
                          }}
                        >
                          Upgrade to VIP to see who viewed your profile
                        </div>

                        {/* Pill Orange Button */}
                        <button
                          type="button"
                          style={{
                            width: "100%",
                            padding: "11px 0",
                            background: "#FF6A00",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: 22,
                            fontSize: 15,
                            fontWeight: 800,
                            cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(255, 106, 0, 0.3)",
                          }}
                        >
                          Upgrade Now
                        </button>
                      </div>
                    )}

                    {/* VARIANT 3: 非订阅状态样式 (Numbers array + 努力交朋友 + 升级VIP让关系继续发生) */}
                    {editingModal.styleType === "非订阅状态样式" && (
                      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        {/* Purple Numbers Matrix */}
                        <div
                          style={{
                            color: "#6C3EDE",
                            fontSize: 15,
                            fontWeight: 800,
                            lineHeight: 1.55,
                            letterSpacing: "0.02em",
                            marginBottom: 14,
                          }}
                        >
                          <div>899、164、681、640、</div>
                          <div>367、223、292、164、</div>
                          <div>670、150、169、267</div>
                        </div>

                        {/* Subtitle */}
                        <div
                          style={{
                            fontSize: 13,
                            color: "#475569",
                            fontWeight: 500,
                            marginBottom: 14,
                          }}
                        >
                          你已经在为交朋友认真努力了
                        </div>

                        {/* Bold Headline */}
                        <div
                          style={{
                            fontSize: 19,
                            fontWeight: 900,
                            lineHeight: 1.35,
                            marginBottom: 16,
                          }}
                        >
                          <div style={{ color: "#FF8A00", fontSize: 21 }}>升级VIP</div>
                          <div style={{ color: "#111827" }}>让关系继续发生。</div>
                        </div>

                        {/* Mascot at bottom */}
                        <div
                          style={{
                            marginTop: "auto",
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: 10,
                          }}
                        >
                          <ContentTranslateCoinMascot size={105} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
