import React, { useState } from "react";
import {
  SlidersHorizontal,
  Plus,
  X,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Trash2,
  Check,
  RotateCcw,
  Layers,
  Settings2,
  CheckCircle2,
  Eye,
  Sliders,
  Maximize2,
  List,
} from "lucide-react";

export const ALL_HELLOTALK_PRIVILEGES = [
  { id: "p-nearby-search", name: "搜索附近的人", desc: "与附近的人畅聊更多语言", icon: "📍", show: true, carousel: true },
  { id: "p-global-search", name: "搜索全世界的语伴", desc: "一键瞬移至全球 150+ 城市母语圈", icon: "🌐", show: true, carousel: true },
  { id: "p-visitors", name: "解锁谁看了我", desc: "查看完整访客记录，开启无痕访问", icon: "👀", show: true, carousel: true },
  { id: "p-unlimited-trans", name: "无限翻译&字幕", desc: "实时母语级纠错，告别中式表达", icon: "🤖", show: true, carousel: true },
  { id: "p-native-match", name: "匹配不同母语语伴", desc: "优先匹配目标语种正统母语者", icon: "⚡", show: true, carousel: true },
  { id: "p-audio-download", name: "无损原声发音下载", desc: "离线随时随地跟读练习，纯正发音纠偏", icon: "🎧", show: true, carousel: true },
  { id: "p-incognito", name: "隐身访问", desc: "浏览他人动态与主页不留痕迹", icon: "🕶️", show: true, carousel: false },
  { id: "p-no-ads", name: "无广告", desc: "纯净学习体验，移除全站商业广告", icon: "🚫", show: true, carousel: false },
  { id: "p-gender-filter", name: "性别搜索", desc: "按性别精准筛选交流语伴", icon: "🚻", show: true, carousel: false },
  { id: "p-more-chats", name: "更多语伴沟通", desc: "无限制发起新对话与打招呼", icon: "💬", show: true, carousel: false },
  { id: "p-exposure-boost", name: "增加曝光机会", desc: "个人主页曝光提升 10 倍，优先推荐", icon: "📈", show: true, carousel: false },
  { id: "p-live-unlimited", name: "直播语聊无限时长", desc: "语音直播房连麦无时长限制", icon: "🎙️", show: true, carousel: false },
  { id: "p-vip-stickers", name: "发送VIP表情包", desc: "海量专属高清动态聊天表情包", icon: "✨", show: true, carousel: false },
  { id: "p-live-languages", name: "直播语聊房更多语言", desc: "房主可开启支持多语言交流特权", icon: "🗣️", show: true, carousel: false },
  { id: "p-nearby-moments", name: "附近帖文", desc: "优先浏览同城或附近语伴的动态", icon: "📝", show: true, carousel: false },
  { id: "p-more-perks", name: "更多特权", desc: "专属会员标识与后续更新优先体验", icon: "👑", show: true, carousel: false },
];

const AVAILABLE_ICONS = ["📍", "🌐", "👀", "🤖", "⚡", "🕶️", "🚫", "🚻", "💬", "📈", "🎙️", "✨", "🗣️", "📝", "👑", "🎧", "💎", "🚀", "🌟", "💡"];

function getInitialPrivileges(node) {
  if (Array.isArray(node.config?.privileges) && node.config.privileges.length > 0) {
    return node.config.privileges;
  }
  if (node.type === "Benefit List") {
    let selectedNames = [];
    if (Array.isArray(node.config?.selectedBenefits) && node.config.selectedBenefits.length > 0) {
      selectedNames = node.config.selectedBenefits;
    } else if (node.content) {
      selectedNames = node.content
        .split("\n")
        .map((l) => l.split("|")[0].trim())
        .filter(Boolean);
    }
    if (selectedNames.length > 0) {
      return ALL_HELLOTALK_PRIVILEGES.map((item) => ({
        ...item,
        show: selectedNames.some((n) => item.name.includes(n) || n.includes(item.name)),
        carousel: false,
      }));
    }
    return ALL_HELLOTALK_PRIVILEGES.map((item, idx) => ({
      ...item,
      show: idx < 3,
      carousel: false,
    }));
  }
  return ALL_HELLOTALK_PRIVILEGES;
}

export default function PrivilegeSwitchManager({ node, updateNode, notify, defaultMode }) {
  const privileges = getInitialPrivileges(node);
  
  // mode: "list" (不开轮播) vs "carousel" (开轮播)
  const currentMode = node.config?.privilegeMode || defaultMode || (node.type === "Carousel Cards" ? "carousel" : "list");
  const isCarouselMode = currentMode === "carousel";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newIcon, setNewIcon] = useState("💎");
  const [draggingIdx, setDraggingIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [dragOverPos, setDragOverPos] = useState("above");

  const savePrivileges = (nextPrivileges, targetMode = currentMode) => {
    const isTargetCarousel = targetMode === "carousel";
    let newContent = "";
    
    if (isTargetCarousel) {
      const activeCarouselLines = nextPrivileges
        .filter((p) => p.show && p.carousel)
        .map((p) => `${p.icon} ${p.name}|${p.desc}`)
        .join("\n");
      newContent = activeCarouselLines || `${nextPrivileges[0].icon} ${nextPrivileges[0].name}|${nextPrivileges[0].desc}`;
    } else {
      const activeList = nextPrivileges.filter((p) => p.show);
      newContent = activeList.map((p) => `${p.name}|${p.desc}`).join("\n");
    }

    const activeSelectedNames = nextPrivileges.filter((p) => p.show).map((p) => p.name);

    updateNode(node.id, {
      config: {
        ...(node.config || {}),
        privileges: nextPrivileges,
        selectedBenefits: activeSelectedNames,
        privilegeMode: targetMode,
      },
      content: newContent,
    });
  };

  const handleModeSwitch = (newMode) => {
    savePrivileges(privileges, newMode);
    notify?.(`已切换特权展示模式为：${newMode === "carousel" ? "卡片轮播 (开轮播)" : "纯列表模式 (不开轮播)"}`);
  };

  const toggleField = (id, field) => {
    const next = privileges.map((item) => {
      if (item.id === id) {
        const nextVal = !item[field];
        const updated = { ...item, [field]: nextVal };
        if (field === "show" && !nextVal) {
          updated.carousel = false;
        }
        if (field === "carousel" && nextVal) {
          updated.show = true;
        }
        return updated;
      }
      return item;
    });
    savePrivileges(next);
  };

  const reorderPrivilege = (sourceIdx, targetIdx, position = "above") => {
    if (sourceIdx === null || targetIdx === null || sourceIdx === targetIdx) return;
    const next = [...privileges];
    const [moved] = next.splice(sourceIdx, 1);
    let destIdx = targetIdx;
    if (sourceIdx < targetIdx) {
      destIdx = position === "above" ? targetIdx - 1 : targetIdx;
    } else {
      destIdx = position === "above" ? targetIdx : targetIdx + 1;
    }
    next.splice(destIdx, 0, moved);
    savePrivileges(next);
  };

  const moveRow = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= privileges.length) return;
    const next = [...privileges];
    const temp = next[idx];
    next[idx] = next[targetIdx];
    next[targetIdx] = temp;
    savePrivileges(next);
  };

  const handleAddNewPrivilege = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newPriv = {
      id: `p-custom-${Date.now()}`,
      name: newName.trim(),
      desc: newDesc.trim() || "VIP 专享高级功能与特权",
      icon: newIcon,
      show: true,
      carousel: isCarouselMode,
      isCustom: true,
    };
    const next = [newPriv, ...privileges];
    savePrivileges(next);
    setNewName("");
    setNewDesc("");
    setIsAddingNew(false);
    notify?.(`已新增特权：${newPriv.name}`);
  };

  const handleDeletePrivilege = (id) => {
    const target = privileges.find((p) => p.id === id);
    const next = privileges.filter((item) => item.id !== id);
    savePrivileges(next);
    notify?.(`已删除特权：${target?.name || ""}`);
  };

  const enableAllCarousel = () => {
    const next = privileges.map((p) => ({ ...p, show: true, carousel: true }));
    savePrivileges(next);
    notify?.("已开启全部特权轮播");
  };

  const resetToDefault = () => {
    if (currentMode === "list") {
      const resetList = ALL_HELLOTALK_PRIVILEGES.map((item, idx) => ({
        ...item,
        show: idx < 3,
        carousel: false,
      }));
      savePrivileges(resetList);
      notify?.("已恢复官方默认推荐 3 项特权");
    } else {
      savePrivileges(ALL_HELLOTALK_PRIVILEGES);
      notify?.("已恢复全部默认轮播特权");
    }
  };

  const activeCarouselPrivileges = privileges.filter((p) => p.show && p.carousel);
  const showCount = privileges.filter((p) => p.show).length;
  const carouselCount = activeCarouselPrivileges.length;

  // Render Table Rows (Used in both inline inspector and modal)
  const renderTableRows = (isCompact = false) => {
    return (
      <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden", background: "#ffffff" }}>
        {/* Table Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f8fafc",
            padding: isCompact ? "7px 8px" : "10px 14px",
            fontSize: isCompact ? 11 : 12,
            fontWeight: 700,
            color: "#475569",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <span style={{ width: isCompact ? 36 : 44, textAlign: "center" }}></span>
          <span style={{ flex: 1, paddingLeft: 6 }}>
            特权模块名称与权益说明 (共 {privileges.length} 项)
          </span>
          <span style={{ width: isCompact ? 90 : 120, textAlign: "center" }}>
            是否展示在特权页
          </span>
          {isCarouselMode && (
            <span style={{ width: isCompact ? 90 : 120, textAlign: "center" }}>
              是否轮播 (大卡)
            </span>
          )}
        </div>

        {/* Rows */}
        <div style={{ maxHeight: isCompact ? 360 : 480, overflowY: "auto" }}>
          {privileges.map((item, idx) => {
            const isCarouselActive = item.show && item.carousel;
            const isDragging = draggingIdx === idx;
            const isOver = dragOverIdx === idx;
            const borderTopStyle = isOver && dragOverPos === "above" ? "2px solid #6366f1" : "transparent";
            const borderBottomStyle = isOver && dragOverPos === "below" ? "2px solid #6366f1" : "1px solid #f1f5f9";

            return (
              <div
                key={item.id}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", String(idx));
                  e.dataTransfer.effectAllowed = "move";
                  setDraggingIdx(idx);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  const rect = e.currentTarget.getBoundingClientRect();
                  const isTopHalf = e.clientY < rect.top + rect.height / 2;
                  const pos = isTopHalf ? "above" : "below";
                  if (dragOverIdx !== idx || dragOverPos !== pos) {
                    setDragOverIdx(idx);
                    setDragOverPos(pos);
                  }
                }}
                onDragLeave={(e) => {
                  if (dragOverIdx === idx && !e.currentTarget.contains(e.relatedTarget)) {
                    setDragOverIdx(null);
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggingIdx !== null && draggingIdx !== idx) {
                    reorderPrivilege(draggingIdx, idx, dragOverPos);
                  }
                  setDraggingIdx(null);
                  setDragOverIdx(null);
                }}
                onDragEnd={() => {
                  setDraggingIdx(null);
                  setDragOverIdx(null);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: isCompact ? "7px 8px" : "9px 14px",
                  borderTop: borderTopStyle,
                  borderBottom: borderBottomStyle,
                  background: isCarouselActive ? "#fbfbfe" : item.show ? "#ffffff" : "#f8fafc",
                  opacity: isDragging ? 0.35 : item.show ? 1 : 0.6,
                  transition: "background 0.15s ease",
                }}
              >
                {/* Drag Handle (+) */}
                <div style={{ width: isCompact ? 36 : 44, display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                  <div
                    title="按住 + 拖动调整顺序"
                    style={{
                      width: isCompact ? 24 : 28,
                      height: isCompact ? 24 : 28,
                      borderRadius: 6,
                      border: "1px solid #cbd5e1",
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "grab",
                      color: "#475569",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Plus size={isCompact ? 14 : 16} strokeWidth={2.2} />
                  </div>
                </div>

                {/* Icon + Title + Description */}
                <div style={{ flex: 1, paddingLeft: 6, minWidth: 0, display: "flex", alignItems: "center", gap: isCompact ? 6 : 10 }}>
                  <span style={{ fontSize: isCompact ? 16 : 18 }}>{item.icon}</span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: isCompact ? 12 : 13, fontWeight: 600, color: "#1e293b", display: "flex", alignItems: "center", gap: 6 }}>
                      <span>{item.name}</span>
                      {item.isCustom && (
                        <span style={{ fontSize: 9.5, padding: "1px 5px", background: "#fef3c7", color: "#92400e", borderRadius: 4, fontWeight: 700 }}>
                          自定义
                        </span>
                      )}
                      {item.isCustom && (
                        <button
                          type="button"
                          onClick={() => handleDeletePrivilege(item.id)}
                          style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", padding: 2 }}
                          title="删除该自定义特权"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                    <div style={{ fontSize: isCompact ? 10 : 11, color: "#64748b", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.desc}
                    </div>
                  </div>
                </div>

                {/* Switch 1: 是否展示在特权页 (Green Switch) */}
                <div style={{ width: isCompact ? 90 : 120, display: "flex", justifyContent: "center" }}>
                  <button
                    type="button"
                    onClick={() => toggleField(item.id, "show")}
                    style={{
                      width: isCompact ? 36 : 40,
                      height: isCompact ? 20 : 22,
                      borderRadius: 12,
                      background: item.show ? "#10b981" : "#cbd5e1",
                      border: "none",
                      padding: 2,
                      cursor: "pointer",
                      position: "relative",
                      transition: "background 0.2s ease",
                    }}
                    title={item.show ? "已展示，点击关闭" : "未展示，点击开启"}
                  >
                    <div
                      style={{
                        width: isCompact ? 16 : 18,
                        height: isCompact ? 16 : 18,
                        borderRadius: "50%",
                        background: "#ffffff",
                        transform: item.show ? (isCompact ? "translateX(16px)" : "translateX(18px)") : "translateX(0)",
                        transition: "transform 0.2s ease",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }}
                    />
                  </button>
                </div>

                {/* Switch 2: 是否轮播 (大卡) (Purple Switch, only in carousel mode) */}
                {isCarouselMode && (
                  <div style={{ width: isCompact ? 90 : 120, display: "flex", justifyContent: "center" }}>
                    <button
                      type="button"
                      onClick={() => toggleField(item.id, "carousel")}
                      style={{
                        width: isCompact ? 36 : 40,
                        height: isCompact ? 20 : 22,
                        borderRadius: 12,
                        background: isCarouselActive ? "#6366f1" : "#cbd5e1",
                        border: "none",
                        padding: 2,
                        cursor: "pointer",
                        position: "relative",
                        transition: "background 0.2s ease",
                      }}
                      title={isCarouselActive ? "已开启轮播卡片，点击关闭" : "未开启轮播，点击加入真机轮播"}
                    >
                      <div
                        style={{
                          width: isCompact ? 16 : 18,
                          height: isCompact ? 16 : 18,
                          borderRadius: "50%",
                          background: "#ffffff",
                          transform: isCarouselActive ? (isCompact ? "translateX(16px)" : "translateX(18px)") : "translateX(0)",
                          transition: "transform 0.2s ease",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }}
                      />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginTop: 6, marginBottom: 16 }}>
      {/* 1. Right Inspector Panel Container (Inline Management) */}
      <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
        {/* Header Title & Mode Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 5 }}>
              <SlidersHorizontal size={14} color="#6366f1" /> 特权与权益管理
            </span>
            <span
              style={{
                fontSize: 10,
                padding: "1px 6px",
                borderRadius: 4,
                fontWeight: 600,
                background: isCarouselMode ? "#ede9fe" : "#f1f5f9",
                color: isCarouselMode ? "#6d28d9" : "#475569",
              }}
            >
              {isCarouselMode ? "开轮播" : "不开轮播"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => { setIsModalOpen(true); setIsAddingNew(false); }}
            style={{
              padding: "4px 8px",
              background: "#f8fafc",
              border: "1px solid #cbd5e1",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 600,
              color: "#334155",
              display: "flex",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
            }}
            title="展开全屏弹窗详细配置"
          >
            <Maximize2 size={12} /> 全屏弹窗
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10, background: "#f1f5f9", padding: 3, borderRadius: 6 }}>
          <button
            type="button"
            onClick={() => handleModeSwitch("list")}
            style={{
              fontSize: 11,
              padding: "5px 6px",
              borderRadius: 4,
              border: "none",
              background: !isCarouselMode ? "#ffffff" : "transparent",
              color: !isCarouselMode ? "#1e293b" : "#64748b",
              fontWeight: !isCarouselMode ? 700 : 500,
              boxShadow: !isCarouselMode ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <List size={13} /> 纯列表 (不开轮播)
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch("carousel")}
            style={{
              fontSize: 11,
              padding: "5px 6px",
              borderRadius: 4,
              border: "none",
              background: isCarouselMode ? "#ffffff" : "transparent",
              color: isCarouselMode ? "#6d28d9" : "#64748b",
              fontWeight: isCarouselMode ? 700 : 500,
              boxShadow: isCarouselMode ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Sparkles size={13} /> 卡片轮播 (开轮播)
          </button>
        </div>

        {/* If Carousel Mode */}
        {isCarouselMode ? (
          <div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>当前轮播大卡展示清单 ({activeCarouselPrivileges.length} 张)：</span>
              <span style={{ fontSize: 10, color: "#6366f1", cursor: "pointer" }} onClick={() => setIsModalOpen(true)}>全屏管理 &gt;</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 380, overflowY: "auto" }}>
              {activeCarouselPrivileges.length === 0 ? (
                <div style={{ padding: "20px 8px", textAlign: "center", color: "#94a3b8", fontSize: 11.5, background: "#ffffff", borderRadius: 8, border: "1px dashed #cbd5e1" }}>
                  暂无启用的轮播大卡，请点击下方按钮打开弹窗勾选。
                </div>
              ) : (
                activeCarouselPrivileges.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "#ffffff",
                      borderRadius: 6,
                      border: "1px solid #e2e8f0",
                      padding: "8px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 10, color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.desc}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleField(item.id, "carousel")}
                      style={{
                        fontSize: 10,
                        padding: "3px 6px",
                        background: "#f1f5f9",
                        color: "#64748b",
                        border: "1px solid #cbd5e1",
                        borderRadius: 4,
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                      title="从轮播中移出"
                    >
                      移出
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Prominent Button at bottom */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: 8,
                fontSize: 12.5,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 12px rgba(99,102,241,0.25)",
                marginTop: 10,
              }}
            >
              <Maximize2 size={15} /> 打开特权与轮播管理
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>当前展示特权清单 ({privileges.filter((p) => p.show).length} 项)：</span>
              <span style={{ fontSize: 10, color: "#6366f1", cursor: "pointer" }} onClick={() => setIsModalOpen(true)}>全屏管理 &gt;</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 380, overflowY: "auto" }}>
              {privileges.filter((p) => p.show).length === 0 ? (
                <div style={{ padding: "20px 8px", textAlign: "center", color: "#94a3b8", fontSize: 11.5, background: "#ffffff", borderRadius: 8, border: "1px dashed #cbd5e1" }}>
                  暂无启用的特权，请点击下方按钮打开弹窗勾选。
                </div>
              ) : (
                privileges.filter((p) => p.show).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "#ffffff",
                      borderRadius: 6,
                      border: "1px solid #e2e8f0",
                      padding: "8px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 10, color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.desc}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleField(item.id, "show")}
                      style={{
                        fontSize: 10,
                        padding: "3px 6px",
                        background: "#f1f5f9",
                        color: "#64748b",
                        border: "1px solid #cbd5e1",
                        borderRadius: 4,
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                      title="从列表中移出"
                    >
                      移出
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Prominent Button at bottom */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: 8,
                fontSize: 12.5,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 12px rgba(99,102,241,0.25)",
                marginTop: 10,
              }}
            >
              <Maximize2 size={15} /> 打开特权与权益管理
            </button>
          </div>
        )}
      </div>

      {/* 2. Full-Screen Modal Dialog (Matching Figure 4 Pixel-for-Pixel) */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              width: "100%",
              maxWidth: 760,
              maxHeight: "88vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc" }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#1e293b", display: "flex", alignItems: "center", gap: 8 }}>
                  <SlidersHorizontal size={18} color="#6366f1" /> HelloTalk 特权与轮播管理
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", padding: 4, borderRadius: 6 }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Toolbar */}
            <div style={{ padding: "10px 20px", background: "#ffffff", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ display: "flex", gap: 12, fontSize: 12, fontWeight: 600 }}>
                  <span style={{ color: "#059669" }}>✓ 已展示：{showCount} / {privileges.length} 项</span>
                  {isCarouselMode && <span style={{ color: "#6366f1" }}>★ 轮播大卡：{carouselCount} 张</span>}
                </div>
                {/* Modal Mode Selector */}
                <div style={{ display: "inline-flex", background: "#f1f5f9", padding: 2, borderRadius: 6 }}>
                  <button
                    type="button"
                    onClick={() => handleModeSwitch("list")}
                    style={{
                      padding: "3px 8px",
                      fontSize: 11,
                      border: "none",
                      borderRadius: 4,
                      background: !isCarouselMode ? "#ffffff" : "transparent",
                      color: !isCarouselMode ? "#1e293b" : "#64748b",
                      fontWeight: !isCarouselMode ? 700 : 500,
                      cursor: "pointer",
                    }}
                  >
                    纯列表 (不开轮播)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeSwitch("carousel")}
                    style={{
                      padding: "3px 8px",
                      fontSize: 11,
                      border: "none",
                      borderRadius: 4,
                      background: isCarouselMode ? "#ffffff" : "transparent",
                      color: isCarouselMode ? "#6d28d9" : "#64748b",
                      fontWeight: isCarouselMode ? 700 : 500,
                      cursor: "pointer",
                    }}
                  >
                    卡片轮播 (开轮播)
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(!isAddingNew)}
                  style={{
                    padding: "5px 10px",
                    background: isAddingNew ? "#fee2e2" : "#f0fdf4",
                    color: isAddingNew ? "#991b1b" : "#166534",
                    border: "1px solid",
                    borderColor: isAddingNew ? "#fca5a5" : "#bbf7d0",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {isAddingNew ? <X size={14} /> : <Plus size={14} />} {isAddingNew ? "取消新增" : "新增特权"}
                </button>
                {isCarouselMode && (
                  <button
                    type="button"
                    onClick={enableAllCarousel}
                    style={{ padding: "5px 10px", background: "#ede9fe", color: "#6d28d9", border: "1px solid #ddd6fe", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    全开轮播
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetToDefault}
                  style={{ padding: "5px 10px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 12, cursor: "pointer" }}
                >
                  恢复默认
                </button>
              </div>
            </div>

            {/* Modal Add Privilege Form */}
            {isAddingNew && (
              <form
                onSubmit={handleAddNewPrivilege}
                style={{ padding: 16, margin: "12px 20px 0", background: "#f8fafc", border: "1.5px dashed #6366f1", borderRadius: 8 }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <Plus size={16} color="#6366f1" /> 新增自定义特权功能
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: "#475569", display: "block", marginBottom: 4 }}>特权名称 *</label>
                    <input
                      type="text"
                      placeholder="例如：AI 口语私教随身练"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      style={{ width: "100%", padding: "6px 10px", fontSize: 12, border: "1px solid #cbd5e1", borderRadius: 6 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: "#475569", display: "block", marginBottom: 4 }}>详细权益描述 *</label>
                    <input
                      type="text"
                      placeholder="例如：24小时专业母语微课与一对一精准纠错"
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      style={{ width: "100%", padding: "6px 10px", fontSize: 12, border: "1px solid #cbd5e1", borderRadius: 6 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: "#475569", display: "block", marginBottom: 4 }}>选择图标</label>
                    <div style={{ display: "flex", gap: 4 }}>
                      {AVAILABLE_ICONS.slice(0, 6).map((ic) => (
                        <button
                          key={ic}
                          type="button"
                          onClick={() => setNewIcon(ic)}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            border: newIcon === ic ? "2px solid #6366f1" : "1px solid #cbd5e1",
                            background: newIcon === ic ? "#ede9fe" : "#ffffff",
                            cursor: "pointer",
                            fontSize: 14,
                          }}
                        >
                          {ic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    style={{ padding: "5px 12px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 12, cursor: "pointer" }}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    style={{ padding: "5px 16px", background: "#6366f1", color: "#ffffff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    确认添加并启用
                  </button>
                </div>
              </form>
            )}

            {/* Modal Table Content */}
            <div style={{ padding: "12px 20px", flex: 1, overflowY: "auto" }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                <span>按住特权前面的 <strong>+</strong> 按钮并拖动可调整显示顺序</span>
              </div>
              {renderTableRows(false)}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 11, color: "#64748b" }}>
                <span>特权与轮播变更将实时同步至真机预览画布</span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ padding: "6px 18px", background: "#1e293b", color: "#ffffff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                完成并退出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
