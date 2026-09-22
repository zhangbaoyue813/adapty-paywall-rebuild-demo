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

export default function PrivilegeSwitchManager({ node, updateNode }) {
  const privileges = node.config?.privileges || ALL_HELLOTALK_PRIVILEGES;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newIcon, setNewIcon] = useState("💎");
  const [draggingIdx, setDraggingIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [dragOverPos, setDragOverPos] = useState("above");

  const savePrivileges = (nextPrivileges) => {
    const activeCarouselLines = nextPrivileges
      .filter((p) => p.show && p.carousel)
      .map((p) => `${p.icon} ${p.name}|${p.desc}`)
      .join("\n");

    updateNode(node.id, {
      config: {
        ...(node.config || {}),
        privileges: nextPrivileges,
      },
      content: activeCarouselLines || `${nextPrivileges[0].icon} ${nextPrivileges[0].name}|${nextPrivileges[0].desc}`,
    });
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

  const handleAddNewPrivilege = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newPriv = {
      id: `p-custom-${Date.now()}`,
      name: newName.trim(),
      desc: newDesc.trim() || "VIP 专享高级功能与特权",
      icon: newIcon,
      show: true,
      carousel: true,
      isCustom: true,
    };
    const next = [newPriv, ...privileges];
    savePrivileges(next);
    setNewName("");
    setNewDesc("");
    setIsAddingNew(false);
  };

  const handleDeletePrivilege = (id) => {
    const next = privileges.filter((item) => item.id !== id);
    savePrivileges(next);
  };

  const enableAllCarousel = () => {
    const next = privileges.map((p) => ({ ...p, show: true, carousel: true }));
    savePrivileges(next);
  };

  const resetToDefault = () => {
    savePrivileges(ALL_HELLOTALK_PRIVILEGES);
  };

  const activeCarouselPrivileges = privileges.filter((p) => p.show && p.carousel);
  const showCount = privileges.filter((p) => p.show).length;
  const carouselCount = activeCarouselPrivileges.length;

  return (
    <div style={{ marginTop: 6, marginBottom: 16 }}>
      {/* 1. Right Inspector Compact Summary (Plan A) */}
      <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 5 }}>
            <SlidersHorizontal size={14} color="#6366f1" /> 轮播特权管理
          </span>
          <span style={{ fontSize: 11, padding: "2px 8px", background: "#f0fdf4", color: "#15803d", borderRadius: 12, fontWeight: 600 }}>
            {carouselCount} 张轮播中
          </span>
        </div>

        <p style={{ fontSize: 11, color: "#64748b", margin: "0 0 10px", lineHeight: 1.45 }}>
          当前手机屏幕顶部轮播的特权卡片（共 {carouselCount} 张）：
        </p>

        {/* Active Privilege Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {activeCarouselPrivileges.slice(0, 6).map((p) => (
            <span
              key={p.id}
              style={{
                fontSize: 11,
                padding: "3px 8px",
                background: "#f5f3ff",
                border: "1px solid #ddd6fe",
                color: "#6d28d9",
                borderRadius: 6,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span>{p.icon}</span> {p.name}
            </span>
          ))}
          {carouselCount > 6 && (
            <span style={{ fontSize: 10, padding: "3px 6px", background: "#f1f5f9", color: "#64748b", borderRadius: 6 }}>
              +{carouselCount - 6} 项
            </span>
          )}
          {carouselCount === 0 && (
            <span style={{ fontSize: 11, color: "#ef4444", fontStyle: "italic" }}>
              ⚠️ 当前未勾选任何轮播卡片
            </span>
          )}
        </div>

        {/* Action Button: Configure Modal (Yellow box button removed per Image 1) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            type="button"
            onClick={() => { setIsModalOpen(true); setIsAddingNew(false); }}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(79,70,229,0.25)",
            }}
          >
            <Settings2 size={15} /> 管理全部特权与双开关 ({privileges.length}项)
          </button>
        </div>
      </div>

      {/* 2. Full-Screen Modal Dialog */}
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
              maxWidth: 720,
              maxHeight: "88vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header (Yellow box elements removed per Image 2) */}
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

            {/* Modal Toolbar (Single plus button per Image 2 red box) */}
            <div style={{ padding: "10px 20px", background: "#ffffff", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 12, fontSize: 12, fontWeight: 600 }}>
                <span style={{ color: "#059669" }}>✓ 已展示：{showCount} / {privileges.length} 项</span>
                <span style={{ color: "#6366f1" }}>★ 轮播大卡：{carouselCount} 张</span>
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
                <button
                  type="button"
                  onClick={enableAllCarousel}
                  style={{ padding: "5px 10px", background: "#ede9fe", color: "#6d28d9", border: "1px solid #ddd6fe", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                >
                  全开轮播
                </button>
                <button
                  type="button"
                  onClick={resetToDefault}
                  style={{ padding: "5px 10px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 12, cursor: "pointer" }}
                >
                  恢复默认
                </button>
              </div>
            </div>

            {/* Inline Add Privilege Form */}
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
              <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
                {/* Table Header: 操作 column removed per Image 2 */}
                <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", padding: "10px 14px", fontSize: 12, fontWeight: 700, color: "#475569", borderBottom: "1px solid #e2e8f0" }}>
                  <span style={{ width: 44, textAlign: "center" }}></span>
                  <span style={{ flex: 1, paddingLeft: 8 }}>特权模块名称与权益说明 (共 {privileges.length} 项)</span>
                  <span style={{ width: 120, textAlign: "center" }}>是否展示在特权页</span>
                  <span style={{ width: 120, textAlign: "center" }}>是否轮播 (大卡)</span>
                </div>

                {/* Rows: + icon drag handles matching Image 3 */}
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
                        padding: "9px 14px",
                        borderTop: borderTopStyle,
                        borderBottom: borderBottomStyle,
                        background: isCarouselActive ? "#fbfbfe" : item.show ? "#ffffff" : "#f8fafc",
                        opacity: isDragging ? 0.35 : item.show ? 1 : 0.6,
                        transition: "background 0.15s ease",
                      }}
                    >
                      {/* Image 3 Style + Drag Handle */}
                      <div style={{ width: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div
                          title="按住 + 拖动调整显示顺序"
                          style={{
                            width: 28,
                            height: 28,
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
                          <Plus size={16} strokeWidth={2.2} />
                        </div>
                      </div>

                      {/* Icon + Title + Description */}
                      <div style={{ flex: 1, paddingLeft: 8, minWidth: 0, display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>{item.icon}</span>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", display: "flex", alignItems: "center", gap: 6 }}>
                            {item.name}
                            {item.isCustom && (
                              <span style={{ fontSize: 10, padding: "1px 5px", background: "#fef3c7", color: "#92400e", borderRadius: 4, fontWeight: 700 }}>自定义</span>
                            )}
                            {item.isCustom && (
                              <button
                                type="button"
                                onClick={() => handleDeletePrivilege(item.id)}
                                style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", padding: 2 }}
                                title="删除该自定义特权"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                          <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{item.desc}</div>
                        </div>
                      </div>

                      {/* Switch 1: 是否展示在特权页 */}
                      <div style={{ width: 120, display: "flex", justifyContent: "center" }}>
                        <button
                          type="button"
                          onClick={() => toggleField(item.id, "show")}
                          style={{
                            width: 40,
                            height: 22,
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
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              background: "#ffffff",
                              transform: item.show ? "translateX(18px)" : "translateX(0)",
                              transition: "transform 0.2s ease",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                            }}
                          />
                        </button>
                      </div>

                      {/* Switch 2: 是否轮播 (大卡) */}
                      <div style={{ width: 120, display: "flex", justifyContent: "center" }}>
                        <button
                          type="button"
                          onClick={() => toggleField(item.id, "carousel")}
                          style={{
                            width: 40,
                            height: 22,
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
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              background: "#ffffff",
                              transform: isCarouselActive ? "translateX(18px)" : "translateX(0)",
                              transition: "transform 0.2s ease",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                提示：修改开关后真机预览画布即时生效
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "7px 20px",
                  background: "#1e293b",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                完成配置并返回
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
