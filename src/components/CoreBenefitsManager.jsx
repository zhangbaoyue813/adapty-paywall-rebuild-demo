import React, { useState } from "react";
import {
  Check,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Layers,
  LayoutList,
  LayoutGrid,
  CreditCard,
  Edit3,
  Crown,
  Globe,
  Zap,
  Settings,
  Sliders,
} from "lucide-react";

// 优雅的 iOS / Ant Design 风格极简 Switch 组件，彻底杜绝全局 input 样式导致的形变与大黑框
function Switch({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onChange?.(!checked);
      }}
      style={{
        position: "relative",
        width: 38,
        minWidth: 38,
        height: 22,
        minHeight: 22,
        padding: 0,
        borderRadius: 11,
        border: "none",
        background: checked ? "#6366f1" : "#cbd5e1",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        outline: "none",
        flexShrink: 0,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 18 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          transition: "left 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </button>
  );
}

// HelloTalk 官方 16 项标准 VIP 特权库，规范化 shortName 与图标映射
export const HELLOTALK_OFFICIAL_PRIVILEGES = [
  {
    id: "ht-p-translate",
    icon: "文A",
    name: "无限翻译&字幕",
    shortName: "翻译",
    desc: "随聊随翻，提高你的词汇量，实时母语级纠错",
    tag: "刚需",
    defaultSelected: true,
  },
  {
    id: "ht-p-world",
    icon: "🌐",
    name: "更多语伴沟通与多语言",
    shortName: "多语言",
    desc: "150种语言随时添加和切换，多语言独立词库与进度同步",
    tag: "热门",
    defaultSelected: true,
  },
  {
    id: "ht-p-boost",
    icon: "⚡",
    name: "动态曝光加速",
    shortName: "更多曝光",
    desc: "专属身份特权，让更多人看到你，曝光提升 5 倍",
    tag: "推荐",
    defaultSelected: true,
  },
  {
    id: "ht-p-visitors",
    icon: "👀",
    name: "解锁谁看了我",
    shortName: "谁看了我",
    desc: "查看完整访客记录，开启无痕访问与已读状态",
    tag: "高转化",
    defaultSelected: false,
  },
  {
    id: "ht-p-nearby",
    icon: "📍",
    name: "搜索附近的人",
    shortName: "附近的人",
    desc: "与附近的人畅聊更多语言，精准定位同城语伴",
    tag: "核心",
    defaultSelected: false,
  },
  {
    id: "ht-p-ai-coach",
    icon: "🤖",
    name: "AI 语法即时纠错",
    shortName: "AI纠错",
    desc: "逐句深度语法解析与地道母语润色，24小时随身陪练",
    tag: "强力",
    defaultSelected: false,
  },
  {
    id: "ht-p-noads",
    icon: "🚫",
    name: "无广告",
    shortName: "无广告",
    desc: "更沉浸专心的学语言！移除全站商业化弹窗与信息流广告",
    tag: "纯净",
    defaultSelected: false,
  },
  {
    id: "ht-p-audio",
    icon: "🎧",
    name: "无损原声发音下载",
    shortName: "原声下载",
    desc: "离线随时随地跟读练习，纯正原汁原味发音纠偏",
    tag: "",
    defaultSelected: false,
  },
  {
    id: "ht-p-ghost",
    icon: "🕶️",
    name: "隐身访问",
    shortName: "隐身访问",
    desc: "浏览他人动态与主页不留痕迹，保护个人社交隐私",
    tag: "",
    defaultSelected: false,
  },
  {
    id: "ht-p-gender",
    icon: "⚧️",
    name: "性别搜索",
    shortName: "性别搜索",
    desc: "按性别精准筛选交流语伴，打造舒适语言学习圈",
    tag: "",
    defaultSelected: false,
  },
  {
    id: "ht-p-crown",
    icon: "👑",
    name: "专属身份徽章",
    shortName: "身份徽章",
    desc: "尊贵 VIP 金色/蓝金色皇冠标识，彰显专属母语身份",
    tag: "身份",
    defaultSelected: false,
  },
  {
    id: "ht-p-pin",
    icon: "📌",
    name: "语伴置顶与特别关心",
    shortName: "语伴置顶",
    desc: "最多置顶 10 位关键语言伙伴，重要消息优先提醒",
    tag: "",
    defaultSelected: false,
  },
  {
    id: "ht-p-live-class",
    icon: "🎓",
    name: "每周外教直播微课",
    shortName: "直播微课",
    desc: "精选地道口语直播大课，每周名师答疑，专属学习指导",
    tag: "精品",
    defaultSelected: false,
  },
  {
    id: "ht-p-cloud",
    icon: "☁️",
    name: "离线词库与云备份",
    shortName: "云备份",
    desc: "生词本与聊天高频笔记全设备同步，永久保存不丢失",
    tag: "",
    defaultSelected: false,
  },
  {
    id: "ht-p-match",
    icon: "🤝",
    name: "匹配不同母语语伴",
    shortName: "母语匹配",
    desc: "优先匹配目标语种正统母语者，提升 300% 沟通回复",
    tag: "优选",
    defaultSelected: false,
  },
  {
    id: "ht-p-search-world",
    icon: "🌍",
    name: "搜索全世界的语伴",
    shortName: "全球语伴",
    desc: "一键瞬移至全球 150+ 城市母语圈，海量母语者在线",
    tag: "全球",
    defaultSelected: false,
  },
];

export default function CoreBenefitsManager({ node, updateNode, notify, themeConfig }) {
  // 解析当前选中的特权（严格杜绝截断中文导致“翻 译 文A”的问题）
  const parseCurrentBenefits = () => {
    if (Array.isArray(node.config?.items) && node.config.items.length > 0) {
      return node.config.items.map((item, idx) => ({
        id: item.id || `b-${idx}-${Date.now()}`,
        icon: item.icon || "💎",
        title: item.title || item.name || "",
        name: item.name || item.title || "",
        desc: item.desc || "",
        tag: item.tag || "",
      }));
    }
    const lines = (node.content || "").split("\n").filter(Boolean);
    if (lines.length > 0) {
      return lines.map((line, idx) => {
        const parts = line.split("|");
        const fullTitle = (parts[0] || ("特权 " + (idx + 1))).trim();
        let desc = (parts[1] || "").trim();
        let tag = (parts[2] || "").trim();
        let icon = "💎";

        const matched = HELLOTALK_OFFICIAL_PRIVILEGES.find(
          (p) => p.name === fullTitle || p.shortName === fullTitle || fullTitle.includes(p.shortName)
        );
        if (matched) {
          icon = matched.icon;
          if (!desc) desc = matched.desc;
          if (!tag) tag = matched.tag;
        } else {
          const emojiMatch = fullTitle.match(/^(\p{Extended_Pictographic}|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDFFF]|[\u2600-\u27BF])\s*(.*)$/u);
          if (emojiMatch) {
            icon = emojiMatch[1];
          }
        }
        return {
          id: "item-" + idx + "-" + Date.now(),
          icon,
          title: fullTitle,
          name: matched?.name || fullTitle,
          desc,
          tag,
        };
      });
    }
    return HELLOTALK_OFFICIAL_PRIVILEGES.filter((p) => p.defaultSelected).map((p) => ({
      id: p.id,
      icon: p.icon,
      title: p.shortName || p.name,
      name: p.name,
      desc: p.desc,
      tag: p.tag,
    }));
  };

  const [benefits, setBenefits] = useState(parseCurrentBenefits);
  const [filterTab, setFilterTab] = useState("all"); // "all" | "selected"
  const [editingId, setEditingId] = useState(null);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [customIcon, setCustomIcon] = useState("✨");
  const [customTag, setCustomTag] = useState("");

  const currentStyleVariant =
    node.config?.styleVariant ||
    (node.config?.variant === "onboarding-privilege-card" || node.id === "trial-t1-privileges"
      ? "cards"
      : node.config?.variant === "grid-matrix"
      ? "grid"
      : "checklist");

  const checkColor = node.config?.checkColor || themeConfig?.otherColor || "#DE6876";

  const saveBenefits = (nextBenefits, nextConfigPatch = {}) => {
    setBenefits(nextBenefits);
    const newContent = nextBenefits.map((b) => (b.title || b.name) + "|" + (b.desc || "") + "|" + (b.tag || "")).join("\n");
    const updatedConfig = {
      ...(node.config || {}),
      items: nextBenefits,
      styleVariant: nextConfigPatch.styleVariant || currentStyleVariant,
      ...nextConfigPatch,
    };
    updateNode(node.id, {
      content: newContent,
      config: updatedConfig,
    });
  };

  const handleStyleChange = (variant) => {
    saveBenefits(benefits, {
      styleVariant: variant,
      variant: variant === "cards" ? "onboarding-privilege-card" : variant === "grid" ? "grid-matrix" : "entry-checks",
    });
    notify?.("已切换展示形态为：" + (variant === "checklist" ? "单列打勾列表" : variant === "cards" ? "圆角权益大卡流" : "双列网格矩阵"));
  };

  const moveItem = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= benefits.length) return;
    const next = [...benefits];
    const [moved] = next.splice(idx, 1);
    next.splice(targetIdx, 0, moved);
    saveBenefits(next);
  };

  const removeItem = (idx) => {
    const next = benefits.filter((_, i) => i !== idx);
    saveBenefits(next);
    notify?.("已从页面展示中移除该特权");
  };

  const updateBenefitItem = (idx, field, value) => {
    const next = benefits.map((item, i) => {
      if (i === idx) {
        return { ...item, [field]: value };
      }
      return item;
    });
    saveBenefits(next);
  };

  const togglePrivilegeSelection = (item) => {
    const existsIdx = benefits.findIndex(
      (b) => b.title === item.name || b.title === item.shortName || b.name === item.name
    );
    if (existsIdx >= 0) {
      // 移除
      const next = benefits.filter((_, i) => i !== existsIdx);
      saveBenefits(next);
      notify?.("已移出：" + (item.shortName || item.name));
    } else {
      // 添加
      const newItem = {
        id: "official-" + item.id + "-" + Date.now(),
        icon: item.icon,
        title: item.shortName || item.name,
        name: item.name,
        desc: item.desc,
        tag: item.tag,
      };
      const next = [...benefits, newItem];
      saveBenefits(next);
      notify?.("已加入展示：" + (item.shortName || item.name));
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    const newItem = {
      id: "custom-" + Date.now(),
      icon: customIcon || "✨",
      title: customTitle.trim(),
      name: customTitle.trim(),
      desc: customDesc.trim(),
      tag: customTag.trim(),
    };
    const next = [...benefits, newItem];
    saveBenefits(next);
    setCustomTitle("");
    setCustomDesc("");
    setCustomTag("");
    setIsAddingCustom(false);
    notify?.("已添加自定义特权：" + newItem.title);
  };

  // 渲染图标徽章辅助
  const renderPrivilegeIcon = (iconStr, isSelected) => {
    return (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: isSelected ? "#ede9fe" : "#f1f5f9",
          color: isSelected ? "#6366f1" : "#64748b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: iconStr === "文A" ? 11.5 : 15,
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {iconStr === "文A" ? (
          <span style={{ fontWeight: 800, letterSpacing: -0.5 }}>文A</span>
        ) : iconStr === "🌐" ? (
          <Globe size={16} />
        ) : iconStr === "⚡" ? (
          <Zap size={16} fill="#6366f1" />
        ) : (
          <span>{iconStr || "💎"}</span>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "2px 0 16px" }}>
      {/* 1. 展现版式切换（打勾清单 / 大卡片流 / 双列网格） */}
      <div style={{ background: "#ffffff", padding: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <Layers size={13} color="#6366f1" />
          <span>特权展现版式（一键切换落地页形态）</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {[
            {
              id: "checklist",
              label: "打勾清单",
              sub: "入门特惠页",
              icon: <LayoutList size={13} />,
            },
            {
              id: "cards",
              label: "大卡片流",
              sub: "试用引导页",
              icon: <CreditCard size={13} />,
            },
            {
              id: "grid",
              label: "双列网格",
              sub: "蓝色特权页",
              icon: <LayoutGrid size={13} />,
            },
          ].map((item) => {
            const isActive = currentStyleVariant === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleStyleChange(item.id)}
                style={{
                  padding: "8px 4px",
                  borderRadius: 6,
                  border: isActive ? "1.5px solid #6366f1" : "1px solid #e2e8f0",
                  background: isActive ? "#f5f3ff" : "#f8fafc",
                  color: isActive ? "#4f46e5" : "#64748b",
                  boxShadow: isActive ? "0 1px 3px rgba(99,102,241,0.15)" : "none",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  transition: "all 0.15s",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: isActive ? 700 : 600 }}>
                  {item.icon} {item.label}
                </span>
                <span style={{ fontSize: 9.5, opacity: 0.8 }}>{item.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 核心特权与权益配置（图三需求：彻底合并原已选展示与官方特权库，做成单一统一面板，清晰直观易懂） */}
      <div style={{ background: "#ffffff", padding: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}>
        {/* 顶部标题栏与添加按钮 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Crown size={14} color="#f59e0b" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>特权权益管理</span>
            <span style={{ fontSize: 10.5, background: "#ede9fe", color: "#6366f1", padding: "1px 6px", borderRadius: 10, fontWeight: 700 }}>
              已选 {benefits.length} 项
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsAddingCustom(!isAddingCustom)}
            style={{
              padding: "3px 8px",
              background: isAddingCustom ? "#f1f5f9" : "#eff6ff",
              color: isAddingCustom ? "#64748b" : "#2563eb",
              border: "1px solid",
              borderColor: isAddingCustom ? "#cbd5e1" : "#bfdbfe",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Plus size={12} /> {isAddingCustom ? "收起" : "自定义特权"}
          </button>
        </div>

        {/* 视图过滤切换 Tab */}
        <div style={{ display: "flex", gap: 4, marginBottom: 10, background: "#f1f5f9", padding: 3, borderRadius: 6 }}>
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            style={{
              flex: 1,
              padding: "5px 0",
              border: "none",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: filterTab === "all" ? 700 : 500,
              background: filterTab === "all" ? "#ffffff" : "transparent",
              color: filterTab === "all" ? "#4338ca" : "#64748b",
              boxShadow: filterTab === "all" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              cursor: "pointer",
            }}
          >
            全部特权库 ({HELLOTALK_OFFICIAL_PRIVILEGES.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("selected")}
            style={{
              flex: 1,
              padding: "5px 0",
              border: "none",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: filterTab === "selected" ? 700 : 500,
              background: filterTab === "selected" ? "#ffffff" : "transparent",
              color: filterTab === "selected" ? "#4338ca" : "#64748b",
              boxShadow: filterTab === "selected" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              cursor: "pointer",
            }}
          >
            仅看已选展示 ({benefits.length})
          </button>
        </div>

        {/* 添加自定义特权内联表单 */}
        {isAddingCustom && (
          <form
            onSubmit={handleAddCustom}
            style={{
              padding: 10,
              marginBottom: 10,
              background: "#faf5ff",
              border: "1.5px dashed #c084fc",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b21a8" }}>✍️ 添加自定义特权</div>
            <div style={{ display: "flex", gap: 6 }}>
              <input
                type="text"
                value={customIcon}
                onChange={(e) => setCustomIcon(e.target.value)}
                placeholder="图标"
                title="特权图标（Emoji 或文案）"
                style={{ width: 44, textAlign: "center", padding: "4px 2px", fontSize: 13, border: "1px solid #cbd5e1", borderRadius: 4, background: "#fff" }}
              />
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="特权名称（必填，如：双语视频通话）"
                required
                style={{ flex: 1, padding: "5px 8px", fontSize: 11.5, border: "1px solid #cbd5e1", borderRadius: 4, background: "#fff" }}
              />
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="角标"
                style={{ width: 55, padding: "5px 6px", fontSize: 11, border: "1px solid #cbd5e1", borderRadius: 4, background: "#fff" }}
              />
            </div>
            <input
              type="text"
              value={customDesc}
              onChange={(e) => setCustomDesc(e.target.value)}
              placeholder="特权副标题说明（如：高清流畅音视频实时连麦）"
              style={{ padding: "5px 8px", fontSize: 11.5, border: "1px solid #cbd5e1", borderRadius: 4, background: "#fff" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                style={{ padding: "4px 8px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 4, fontSize: 11, cursor: "pointer" }}
              >
                取消
              </button>
              <button
                type="submit"
                style={{ padding: "4px 12px", background: "#6366f1", color: "#ffffff", border: "none", borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: "pointer" }}
              >
                确认加入
              </button>
            </div>
          </form>
        )}

        {/* 统一特权单列表 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 380, overflowY: "auto", paddingRight: 2 }}>
          {(() => {
            // 合并所有项目：如果是 selected 视图，只展示已选中的 benefits；如果是 all 视图，优先按 benefits 顺序展示已勾选项，接着展示未勾选项
            let displayList = [];
            if (filterTab === "selected") {
              displayList = benefits.map((b, idx) => ({
                id: b.id,
                icon: b.icon,
                title: b.title || b.name,
                name: b.name || b.title,
                desc: b.desc,
                tag: b.tag,
                isSelected: true,
                orderIndex: idx,
              }));
            } else {
              // all 视图：已勾选的排前面（带排序号），未勾选的跟在后面
              const selectedTitles = new Set(benefits.map((b) => b.title));
              const selectedItems = benefits.map((b, idx) => ({
                id: b.id,
                icon: b.icon,
                title: b.title || b.name,
                name: b.name || b.title,
                desc: b.desc,
                tag: b.tag,
                isSelected: true,
                orderIndex: idx,
              }));

              const unselectedItems = HELLOTALK_OFFICIAL_PRIVILEGES.filter(
                (p) => !selectedTitles.has(p.shortName) && !selectedTitles.has(p.name)
              ).map((p) => ({
                id: p.id,
                icon: p.icon,
                title: p.shortName || p.name,
                name: p.name,
                desc: p.desc,
                tag: p.tag,
                isSelected: false,
                orderIndex: -1,
              }));

              displayList = [...selectedItems, ...unselectedItems];
            }

            if (displayList.length === 0) {
              return (
                <div style={{ padding: "24px 8px", textAlign: "center", color: "#94a3b8", fontSize: 11.5 }}>
                  当前暂无已选特权，请切换至「全部特权库」勾选添加。
                </div>
              );
            }

            return displayList.map((item) => {
              const isSelected = item.isSelected;
              const activeIndex = item.orderIndex;
              const isEditing = editingId === item.id;

              return (
                <div
                  key={item.id}
                  style={{
                    background: isSelected ? "#fbfbfe" : "#ffffff",
                    borderRadius: 8,
                    border: isSelected ? "1.5px solid #c7d2fe" : "1px solid #f1f5f9",
                    padding: "8px 10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    {/* 勾选框 */}
                    <div
                      onClick={() => togglePrivilegeSelection(item)}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        border: isSelected ? "none" : "1.5px solid #cbd5e1",
                        background: isSelected ? "#6366f1" : "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        flexShrink: 0,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                      title={isSelected ? "点击取消勾选（移出展示）" : "点击勾选加入展示"}
                    >
                      {isSelected && <Check size={13} strokeWidth={3} />}
                    </div>

                    {/* 图标徽章 */}
                    {renderPrivilegeIcon(item.icon, isSelected)}

                    {/* 特权标题与说明 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: isSelected ? "#1e293b" : "#475569" }}>
                          {item.title}
                        </span>
                        {item.tag && (
                          <span style={{ fontSize: 9.5, background: isSelected ? "#fee2e2" : "#fef3c7", color: isSelected ? "#b91c1c" : "#92400e", padding: "1px 4px", borderRadius: 3, fontWeight: 700 }}>
                            {item.tag}
                          </span>
                        )}
                        {isSelected && (
                          <span style={{ fontSize: 9.5, background: "#ede9fe", color: "#6366f1", padding: "1px 5px", borderRadius: 4, fontWeight: 800 }}>
                            #{activeIndex + 1}
                          </span>
                        )}
                      </div>

                      {/* 说明副文案 */}
                      {isEditing ? (
                        <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 4 }}>
                          <input
                            type="text"
                            value={item.desc || ""}
                            onChange={(e) => updateBenefitItem(activeIndex, "desc", e.target.value)}
                            placeholder="自定义特权说明副标题"
                            style={{ width: "100%", height: 26, padding: "2px 6px", fontSize: 10.5, border: "1px solid #6366f1", borderRadius: 4 }}
                          />
                        </div>
                      ) : (
                        <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.desc || "HelloTalk VIP 核心专享特权"}
                        </div>
                      )}
                    </div>

                    {/* 右侧操作按钮区 */}
                    <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
                      {isSelected ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setEditingId(isEditing ? null : item.id)}
                            title="编辑副标题文案"
                            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px", color: isEditing ? "#6366f1" : "#94a3b8" }}
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            type="button"
                            disabled={activeIndex === 0}
                            onClick={() => moveItem(activeIndex, -1)}
                            title="上移顺位"
                            style={{ background: "transparent", border: "none", cursor: activeIndex === 0 ? "not-allowed" : "pointer", opacity: activeIndex === 0 ? 0.25 : 1, padding: "4px 2px", color: "#64748b" }}
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={activeIndex === benefits.length - 1}
                            onClick={() => moveItem(activeIndex, 1)}
                            title="下移顺位"
                            style={{ background: "transparent", border: "none", cursor: activeIndex === benefits.length - 1 ? "not-allowed" : "pointer", opacity: activeIndex === benefits.length - 1 ? 0.25 : 1, padding: "4px 2px", color: "#64748b" }}
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(activeIndex)}
                            title="移除"
                            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px", color: "#ef4444" }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => togglePrivilegeSelection(item)}
                          style={{
                            padding: "3px 8px",
                            background: "#f1f5f9",
                            border: "1px solid #e2e8f0",
                            borderRadius: 4,
                            color: "#475569",
                            fontSize: 10.5,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          + 勾选
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* 3. 细节与底部链接配置（图一画框优化：彻底杜绝大尺寸复选框变异，改为优雅 iOS/AntD 极简 Switch 开关） */}
      <div style={{ background: "#ffffff", padding: 12, borderRadius: 8, border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 6 }}>
          <Settings size={13} color="#6366f1" />
          <span>细节与底部链接设置</span>
        </div>

        {/* 打勾颜色选择 (仅单列打勾清单模式展示) */}
        {currentStyleVariant === "checklist" && (
          <div style={{ padding: "8px 10px", background: "#f8fafc", borderRadius: 6, border: "1px solid #f1f5f9" }}>
            <span style={{ fontSize: 11, color: "#475569", display: "block", marginBottom: 6, fontWeight: 600 }}>勾选图标强调色：</span>
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { name: "珊瑚红", color: "#DE6876" },
                { name: "极光紫", color: "#6366F1" },
                { name: "琥珀金", color: "#F59E0B" },
                { name: "翠绿色", color: "#10B981" },
                { name: "深色", color: "#1E293B" },
              ].map((c) => (
                <button
                  key={c.color}
                  type="button"
                  onClick={() => saveBenefits(benefits, { checkColor: c.color })}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 8px",
                    borderRadius: 4,
                    border: checkColor === c.color ? ("1.5px solid " + c.color) : "1px solid #cbd5e1",
                    background: checkColor === c.color ? (c.color + "15") : "#ffffff",
                    fontSize: 10.5,
                    cursor: "pointer",
                    fontWeight: checkColor === c.color ? 700 : 500,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 是否显示副标题说明 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: "#f8fafc", borderRadius: 6, border: "1px solid #f1f5f9" }}>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "#1e293b" }}>显示特权副标题说明</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>开启后在卡片中显示辅助说明文案</div>
          </div>
          <Switch
            checked={node.config?.showSubtitle !== false}
            onChange={(val) => saveBenefits(benefits, { showSubtitle: val })}
          />
        </div>

        {/* 底部跳转入口设置 */}
        <div style={{ padding: "8px 10px", background: "#f8fafc", borderRadius: 6, border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "#1e293b" }}>显示底部「更多权益等待开启」入口</div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>在特权列表底部提供查看全部特权的链接</div>
            </div>
            <Switch
              checked={node.config?.showMoreLink !== false}
              onChange={(val) => saveBenefits(benefits, { showMoreLink: val })}
            />
          </div>
          {node.config?.showMoreLink !== false && (
            <div style={{ marginTop: 2 }}>
              <input
                type="text"
                value={node.config?.moreLinkText || (currentStyleVariant === "grid" ? "查看全部 16 项特权 >" : "更多权益等待开启 >")}
                onChange={(e) => saveBenefits(benefits, { moreLinkText: e.target.value })}
                placeholder="底部跳转提示文案"
                style={{ width: "100%", height: 32, padding: "4px 8px", fontSize: 11, border: "1px solid #cbd5e1", borderRadius: 5, background: "#ffffff" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
