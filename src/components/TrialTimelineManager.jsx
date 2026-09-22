import React from "react";
import { Clock, Calendar, CheckCircle, Bell, Crown } from "lucide-react";

export const DEFAULT_TIMELINE_STEPS = [
  { day: "今天", title: "开始试用", desc: "立即解锁所有会员特权", icon: "crown" },
  { day: "第2天", title: "即将结束通知", desc: "推送通知提醒体验倒计时", icon: "bell" },
  { day: "第3天", title: "试用结束", desc: "如未取消自动开始正式订阅", icon: "clock" },
];

export default function TrialTimelineManager({ node, updateNode, notify }) {
  // Parse steps from config or content
  let steps = DEFAULT_TIMELINE_STEPS;
  if (Array.isArray(node.config?.steps) && node.config.steps.length === 3) {
    steps = node.config.steps;
  } else if (node.content) {
    const lines = node.content.split("\n").filter(Boolean);
    if (lines.length >= 3) {
      steps = lines.slice(0, 3).map((line, idx) => {
        const [day = `第${idx + 1}阶段`, title = `阶段${idx + 1}`] = line.split("|");
        return {
          day: day.trim(),
          title: title.trim(),
          desc: DEFAULT_TIMELINE_STEPS[idx]?.desc || "",
          icon: DEFAULT_TIMELINE_STEPS[idx]?.icon || "crown",
        };
      });
    }
  }

  const handleStepChange = (index, field, value) => {
    const nextSteps = steps.map((st, i) => (i === index ? { ...st, [field]: value } : st));
    const newContent = nextSteps.map((st) => `${st.day}|${st.title}`).join("\n");
    updateNode(node.id, {
      config: {
        ...(node.config || {}),
        variant: "trial-timeline",
        steps: nextSteps,
      },
      content: newContent,
    });
  };

  const setPreset = (presetType) => {
    let nextSteps = DEFAULT_TIMELINE_STEPS;
    if (presetType === "7day") {
      nextSteps = [
        { day: "今天", title: "开始试用", desc: "免费体验 7 天会员", icon: "crown" },
        { day: "第5天", title: "扣费前通知", desc: "发送提醒通知", icon: "bell" },
        { day: "第7天", title: "试用期结束", desc: "自动转换为年费会员", icon: "clock" },
      ];
    } else if (presetType === "standard") {
      nextSteps = DEFAULT_TIMELINE_STEPS;
    }
    const newContent = nextSteps.map((st) => `${st.day}|${st.title}`).join("\n");
    updateNode(node.id, {
      config: {
        ...(node.config || {}),
        variant: "trial-timeline",
        steps: nextSteps,
      },
      content: newContent,
    });
    notify?.("已切换试用时间轴预设");
  };

  const getStepIcon = (iconName) => {
    switch (iconName) {
      case "bell":
        return <Bell size={15} color="#6144e8" />;
      case "clock":
        return <Clock size={15} color="#6144e8" />;
      case "check":
        return <CheckCircle size={15} color="#6144e8" />;
      default:
        return <Crown size={15} color="#6144e8" />;
    }
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Calendar size={15} color="#6144e8" />
            <strong style={{ fontSize: 13, color: "#1e293b" }}>试用时间轴阶段配置</strong>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              type="button"
              onClick={() => setPreset("standard")}
              style={{
                fontSize: 10,
                padding: "2px 6px",
                borderRadius: 4,
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                cursor: "pointer",
                color: "#475569",
              }}
            >
              3天预设
            </button>
            <button
              type="button"
              onClick={() => setPreset("7day")}
              style={{
                fontSize: 10,
                padding: "2px 6px",
                borderRadius: 4,
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                cursor: "pointer",
                color: "#475569",
              }}
            >
              7天预设
            </button>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 11, color: "#64748b", lineHeight: 1.45 }}>
          配置展示在页面顶部的 3 阶段试用进度轴，文案修改将即时同步在中间手机画布中。
        </p>
      </div>

      {/* 3 Step Config Cards */}
      {steps.map((step, idx) => (
        <div
          key={idx}
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
              paddingBottom: 6,
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#ede9fe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {getStepIcon(step.icon)}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>
                阶段 {idx + 1}：{step.day || `第${idx + 1}阶段`}
              </span>
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {["crown", "bell", "clock"].map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => handleStepChange(idx, "icon", ic)}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 4,
                    border: step.icon === ic ? "1.5px solid #6144e8" : "1px solid #e2e8f0",
                    background: step.icon === ic ? "#ede9fe" : "#ffffff",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title={`切换图标为 ${ic}`}
                >
                  {ic === "crown" ? "👑" : ic === "bell" ? "🔔" : "🕒"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#475569", marginBottom: 4 }}>
                主标题文案
              </label>
              <input
                type="text"
                value={step.title}
                onChange={(e) => handleStepChange(idx, "title", e.target.value)}
                placeholder="如: 开始试用"
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #cbd5e1",
                  fontSize: 12,
                  color: "#1e293b",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#475569", marginBottom: 4 }}>
                时间 / 副标题
              </label>
              <input
                type="text"
                value={step.day}
                onChange={(e) => handleStepChange(idx, "day", e.target.value)}
                placeholder="如: 今天 / 第2天"
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #cbd5e1",
                  fontSize: 12,
                  color: "#1e293b",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
