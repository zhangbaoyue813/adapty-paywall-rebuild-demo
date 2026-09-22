import React, { useState } from "react";
import { Layers, Sparkles, Bell, CreditCard, ChevronRight } from "lucide-react";

export const DEFAULT_SLIDES_CONFIG = {
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
  slide3Yearly: {
    name: "12 个月",
    monthly: "¥40.67/ 月",
    total: "¥488",
    discount: "48% OFF",
    badge: "免费试用",
  },
  slide3Monthly: {
    name: "1 个月",
    monthly: "¥78/ 月",
  },
  slide3SafetyNote: "可随时在 App Store 取消",
};

export default function OnboardingMultiSlidesManager({
  node,
  updateNode,
  notify,
  activeSlide = 0,
  onSlideChange,
}) {
  const [selectedSlideTab, setSelectedSlideTab] = useState(activeSlide ?? 0);

  // Read config with fallback
  const cfg = {
    ...DEFAULT_SLIDES_CONFIG,
    ...(node.config || {}),
  };

  const handleTabClick = (idx) => {
    setSelectedSlideTab(idx);
    onSlideChange?.(idx);
  };

  const updateConfigField = (field, value) => {
    const nextConfig = {
      ...(node.config || {}),
      variant: "onboarding-3slides",
      [field]: value,
    };
    updateNode(node.id, {
      config: nextConfig,
    });
  };

  const handleSlide1ItemChange = (idx, field, value) => {
    const nextItems = [...(cfg.slide1Items || DEFAULT_SLIDES_CONFIG.slide1Items)];
    nextItems[idx] = { ...nextItems[idx], [field]: value };
    updateConfigField("slide1Items", nextItems);
  };

  const handleSlide2TimelineChange = (idx, field, value) => {
    const nextTimeline = [...(cfg.slide2Timeline || DEFAULT_SLIDES_CONFIG.slide2Timeline)];
    nextTimeline[idx] = { ...nextTimeline[idx], [field]: value };
    updateConfigField("slide2Timeline", nextTimeline);
  };

  const handleYearlyChange = (field, value) => {
    const nextYearly = {
      ...(cfg.slide3Yearly || DEFAULT_SLIDES_CONFIG.slide3Yearly),
      [field]: value,
    };
    updateConfigField("slide3Yearly", nextYearly);
  };

  const handleMonthlyChange = (field, value) => {
    const nextMonthly = {
      ...(cfg.slide3Monthly || DEFAULT_SLIDES_CONFIG.slide3Monthly),
      [field]: value,
    };
    updateConfigField("slide3Monthly", nextMonthly);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Header Info */}
      <div
        style={{
          background: "#f8fafc",
          borderRadius: 8,
          padding: "12px 14px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <Layers size={16} color="#6144e8" />
          <strong style={{ fontSize: 13, color: "#1e293b" }}>多张轮播图配置</strong>
          <span style={{ fontSize: 10, background: "#ede9fe", color: "#6144e8", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>
            共 3 张卡片
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 11, color: "#64748b", lineHeight: 1.45 }}>
          针对模版五专属的 3 阶段轮播卡片。点击下方选项卡可直接同步手机画布切换预览与编辑对应卡片文案。
        </p>
      </div>

      {/* Slide Navigation Tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 6,
          background: "#f1f5f9",
          padding: 3,
          borderRadius: 8,
        }}
      >
        {[
          { idx: 0, label: "卡片 1·权益", icon: <Sparkles size={12} /> },
          { idx: 1, label: "卡片 2·提醒", icon: <Bell size={12} /> },
          { idx: 2, label: "卡片 3·套餐", icon: <CreditCard size={12} /> },
        ].map((tab) => {
          const isActive = selectedSlideTab === tab.idx;
          return (
            <button
              key={tab.idx}
              type="button"
              onClick={() => handleTabClick(tab.idx)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: "7px 4px",
                borderRadius: 6,
                border: "none",
                background: isActive ? "#ffffff" : "transparent",
                color: isActive ? "#6144e8" : "#64748b",
                fontWeight: isActive ? 700 : 500,
                fontSize: 11.5,
                cursor: "pointer",
                boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Slide 1 Content Editor */}
      {selectedSlideTab === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
              卡片 1 大标题
            </label>
            <input
              type="text"
              value={cfg.slide1Title}
              onChange={(e) => updateConfigField("slide1Title", e.target.value)}
              placeholder="如: 免费体验HelloTalk会员"
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: 6,
                border: "1px solid #cbd5e1",
                fontSize: 13,
                color: "#1e293b",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", marginBottom: 10 }}>
              4 项展示特权详情配置
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(cfg.slide1Items || DEFAULT_SLIDES_CONFIG.slide1Items).map((it, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #f1f5f9",
                    borderRadius: 6,
                    padding: "8px 10px",
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6144e8", marginBottom: 6 }}>
                    特权项 {idx + 1}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 8 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                        特权名称
                      </label>
                      <input
                        type="text"
                        value={it.title}
                        onChange={(e) => handleSlide1ItemChange(idx, "title", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "5px 7px",
                          borderRadius: 4,
                          border: "1px solid #cbd5e1",
                          fontSize: 12,
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                        说明副标题
                      </label>
                      <input
                        type="text"
                        value={it.desc}
                        onChange={(e) => handleSlide1ItemChange(idx, "desc", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "5px 7px",
                          borderRadius: 4,
                          border: "1px solid #cbd5e1",
                          fontSize: 12,
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Slide 2 Content Editor */}
      {selectedSlideTab === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
              卡片 2 大标题
            </label>
            <input
              type="text"
              value={cfg.slide2Title}
              onChange={(e) => updateConfigField("slide2Title", e.target.value)}
              placeholder="如: 到期前提醒"
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: 6,
                border: "1px solid #cbd5e1",
                fontSize: 13,
                color: "#1e293b",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", marginBottom: 10 }}>
              3 阶段到期前通知配置
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(cfg.slide2Timeline || DEFAULT_SLIDES_CONFIG.slide2Timeline).map((st, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #f1f5f9",
                    borderRadius: 6,
                    padding: "8px 10px",
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6144e8", marginBottom: 6 }}>
                    阶段 {idx + 1}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                        天数/阶段
                      </label>
                      <input
                        type="text"
                        value={st.day}
                        onChange={(e) => handleSlide2TimelineChange(idx, "day", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "5px 7px",
                          borderRadius: 4,
                          border: "1px solid #cbd5e1",
                          fontSize: 12,
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                        说明副标题
                      </label>
                      <input
                        type="text"
                        value={st.desc}
                        onChange={(e) => handleSlide2TimelineChange(idx, "desc", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "5px 7px",
                          borderRadius: 4,
                          border: "1px solid #cbd5e1",
                          fontSize: 12,
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Slide 3 Content Editor */}
      {selectedSlideTab === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
              卡片 3 大标题
            </label>
            <input
              type="text"
              value={cfg.slide3Title}
              onChange={(e) => updateConfigField("slide3Title", e.target.value)}
              placeholder="如: 选择试用结束后的套餐"
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: 6,
                border: "1px solid #cbd5e1",
                fontSize: 13,
                color: "#1e293b",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Yearly Tier */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
              <span>主套餐（12个月/年费）</span>
              <span style={{ fontSize: 10.5, color: "#6144e8" }}>推荐项</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
              <div>
                <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                  套餐名称
                </label>
                <input
                  type="text"
                  value={cfg.slide3Yearly?.name}
                  onChange={(e) => handleYearlyChange("name", e.target.value)}
                  style={{ width: "100%", padding: "5px 7px", borderRadius: 4, border: "1px solid #cbd5e1", fontSize: 12, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                  折合月费
                </label>
                <input
                  type="text"
                  value={cfg.slide3Yearly?.monthly}
                  onChange={(e) => handleYearlyChange("monthly", e.target.value)}
                  style={{ width: "100%", padding: "5px 7px", borderRadius: 4, border: "1px solid #cbd5e1", fontSize: 12, boxSizing: "border-box" }}
                />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              <div>
                <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                  总价
                </label>
                <input
                  type="text"
                  value={cfg.slide3Yearly?.total}
                  onChange={(e) => handleYearlyChange("total", e.target.value)}
                  style={{ width: "100%", padding: "5px 7px", borderRadius: 4, border: "1px solid #cbd5e1", fontSize: 12, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                  折扣标
                </label>
                <input
                  type="text"
                  value={cfg.slide3Yearly?.discount}
                  onChange={(e) => handleYearlyChange("discount", e.target.value)}
                  style={{ width: "100%", padding: "5px 7px", borderRadius: 4, border: "1px solid #cbd5e1", fontSize: 12, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                  角标
                </label>
                <input
                  type="text"
                  value={cfg.slide3Yearly?.badge}
                  onChange={(e) => handleYearlyChange("badge", e.target.value)}
                  style={{ width: "100%", padding: "5px 7px", borderRadius: 4, border: "1px solid #cbd5e1", fontSize: 12, boxSizing: "border-box" }}
                />
              </div>
            </div>
          </div>

          {/* Monthly Tier */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>
              副套餐（月费会员）
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                  套餐名称
                </label>
                <input
                  type="text"
                  value={cfg.slide3Monthly?.name}
                  onChange={(e) => handleMonthlyChange("name", e.target.value)}
                  style={{ width: "100%", padding: "5px 7px", borderRadius: 4, border: "1px solid #cbd5e1", fontSize: 12, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10.5, color: "#64748b", marginBottom: 3 }}>
                  月费价格
                </label>
                <input
                  type="text"
                  value={cfg.slide3Monthly?.monthly}
                  onChange={(e) => handleMonthlyChange("monthly", e.target.value)}
                  style={{ width: "100%", padding: "5px 7px", borderRadius: 4, border: "1px solid #cbd5e1", fontSize: 12, boxSizing: "border-box" }}
                />
              </div>
            </div>
          </div>

          {/* Safety note */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#475569", marginBottom: 4 }}>
              底部取消安全提示文案
            </label>
            <input
              type="text"
              value={cfg.slide3SafetyNote}
              onChange={(e) => updateConfigField("slide3SafetyNote", e.target.value)}
              placeholder="如: 可随时在 App Store 取消"
              style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 12, boxSizing: "border-box" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
