import React from "react";
import {
  Check,
  Plus,
} from "lucide-react";

// 规范的 iOS / Ant Design 极简 Switch 组件
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

export const DEFAULT_FREE_VS_VIP_ITEMS = [
  { id: "comp-1", name: "教/学更多语言数", col1Type: "text", col1Val: "各1门", col2Type: "text", col2Val: "各3门" },
  { id: "comp-2", name: "直播间字幕", col1Type: "lock", col1Val: "🔒", col2Type: "check", col2Val: "✓" },
  { id: "comp-3", name: "新语伴上限", col1Type: "text", col1Val: "10/天", col2Type: "text", col2Val: "25/天" },
  { id: "comp-4", name: "额外曝光", col1Type: "lock", col1Val: "🔒", col2Type: "text", col2Val: "x9" },
  { id: "comp-5", name: "隐身访问", col1Type: "lock", col1Val: "🔒", col2Type: "check", col2Val: "✓" },
  { id: "comp-6", name: "无广告", col1Type: "lock", col1Val: "🔒", col2Type: "check", col2Val: "✓" },
];

export const DEFAULT_VIP_VS_PLUS_ITEMS = [
  { id: "comp-1", name: "教/学更多语言数", col1Type: "text", col1Val: "各3门", col2Type: "text", col2Val: "各5门" },
  { id: "comp-2", name: "直播间字幕", col1Type: "check", col1Val: "✓", col2Type: "check", col2Val: "✓" },
  { id: "comp-3", name: "新语伴上限", col1Type: "text", col1Val: "25/天", col2Type: "text", col2Val: "无限制" },
  { id: "comp-4", name: "额外曝光", col1Type: "text", col1Val: "x9", col2Type: "text", col2Val: "x15" },
  { id: "comp-5", name: "隐身访问", col1Type: "check", col1Val: "✓", col2Type: "check", col2Val: "✓" },
  { id: "comp-6", name: "无广告", col1Type: "check", col1Val: "✓", col2Type: "check", col2Val: "✓" },
];

export default function ComparisonTableManager({ node, updateNode, notify, onSwitchCompareTab }) {
  const config = node.config || {};
  const currentMode = config.compareMode || (node.id?.includes("plus") || config.col2Title?.includes("+") ? "vip-vs-plus" : "free-vs-vip");
  const items = Array.isArray(config.items) && config.items.length > 0
    ? config.items
    : (currentMode === "vip-vs-plus" ? DEFAULT_VIP_VS_PLUS_ITEMS : DEFAULT_FREE_VS_VIP_ITEMS);

  // 纯中文默认列标题，彻底杜绝中英文混杂
  const featureColTitle = config.featureColTitle || "特权功能";
  const col1Title = config.col1Title || (currentMode === "vip-vs-plus" ? "VIP会员" : "普通会员");
  const col2Title = config.col2Title || (currentMode === "vip-vs-plus" ? "VIP+会员" : "VIP会员");
  const showExpandCaret = config.showExpandCaret !== false;

  const handleSwitchMode = (mode) => {
    const isPlus = mode === "vip-vs-plus";
    const nextCol1 = isPlus ? "VIP会员" : "普通会员";
    const nextCol2 = isPlus ? "VIP+会员" : "VIP会员";
    
    updateNode(node.id, {
      config: {
        ...config,
        compareMode: mode,
        featureColTitle: featureColTitle === "Features" ? "特权功能" : featureColTitle,
        col1Title: nextCol1,
        col2Title: nextCol2,
        items: items.length > 0 ? items : (isPlus ? DEFAULT_VIP_VS_PLUS_ITEMS : DEFAULT_FREE_VS_VIP_ITEMS),
      },
    });

    onSwitchCompareTab?.(isPlus ? 1 : 0);
    notify?.(`已切换对比模式为：${isPlus ? "VIP vs VIP+ (图四)" : "普通 vs VIP (图一)"}`);
  };

  const updateItem = (index, patch) => {
    const nextItems = [...items];
    nextItems[index] = { ...nextItems[index], ...patch };
    updateNode(node.id, {
      config: {
        ...config,
        items: nextItems,
      },
    });
  };

  const handleAddItem = () => {
    const newItem = {
      id: `comp-${Date.now()}`,
      name: "新增特权",
      col1Type: "lock",
      col1Val: "🔒",
      col2Type: "check",
      col2Val: "✓",
    };
    updateNode(node.id, {
      config: {
        ...config,
        items: [...items, newItem],
      },
    });
    notify?.("已添加新对比项");
  };

  const handleDeleteItem = (index) => {
    if (items.length <= 1) {
      notify?.("至少保留 1 项对比特权");
      return;
    }
    const nextItems = items.filter((_, idx) => idx !== index);
    updateNode(node.id, {
      config: {
        ...config,
        items: nextItems,
      },
    });
    notify?.("已删除该对比项");
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const nextItems = [...items];
    const temp = nextItems[index];
    nextItems[index] = nextItems[targetIndex];
    nextItems[targetIndex] = temp;
    updateNode(node.id, {
      config: {
        ...config,
        items: nextItems,
      },
    });
  };

  const handleResetDefault = () => {
    const defaultList = currentMode === "vip-vs-plus" ? DEFAULT_VIP_VS_PLUS_ITEMS : DEFAULT_FREE_VS_VIP_ITEMS;
    updateNode(node.id, {
      config: {
        ...config,
        items: defaultList,
        featureColTitle: "特权功能",
        col1Title: currentMode === "vip-vs-plus" ? "VIP会员" : "普通会员",
        col2Title: currentMode === "vip-vs-plus" ? "VIP+会员" : "VIP会员",
        showExpandCaret: true,
      },
    });
    notify?.("已恢复官方 6 项标准对比");
  };

  return (
    <div className="comparison-table-manager" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* 1. 对比模式选择卡片 */}
      <div>
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
          对比模式选择
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {/* 普通 vs VIP */}
          <button
            type="button"
            onClick={() => handleSwitchMode("free-vs-vip")}
            style={{
              border: currentMode === "free-vs-vip" ? "2px solid #F59E0B" : "1px solid #E2E8F0",
              background: currentMode === "free-vs-vip" ? "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)" : "#FFFFFF",
              borderRadius: 8,
              padding: "10px 8px",
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.15s ease",
              boxShadow: currentMode === "free-vs-vip" ? "0 2px 8px rgba(245, 158, 11, 0.18)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: currentMode === "free-vs-vip" ? "#B45309" : "#1F2937" }}>
                普通 vs VIP
              </span>
              {currentMode === "free-vs-vip" && <Check size={13} color="#B45309" strokeWidth={3} />}
            </div>
            <div style={{ fontSize: 9.5, color: "#6B7280", lineHeight: 1.35 }}>
              默认 VIP 页面 (普通 · VIP 暖金高亮)
            </div>
          </button>

          {/* VIP vs VIP+ */}
          <button
            type="button"
            onClick={() => handleSwitchMode("vip-vs-plus")}
            style={{
              border: currentMode === "vip-vs-plus" ? "2px solid #8B5CF6" : "1px solid #E2E8F0",
              background: currentMode === "vip-vs-plus" ? "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)" : "#FFFFFF",
              borderRadius: 8,
              padding: "10px 8px",
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.15s ease",
              boxShadow: currentMode === "vip-vs-plus" ? "0 2px 8px rgba(139, 92, 246, 0.18)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: currentMode === "vip-vs-plus" ? "#6D28D9" : "#1F2937" }}>
                VIP vs VIP+
              </span>
              {currentMode === "vip-vs-plus" && <Check size={13} color="#6D28D9" strokeWidth={3} />}
            </div>
            <div style={{ fontSize: 9.5, color: "#6B7280", lineHeight: 1.35 }}>
              默认 VIPPlus 页面 (VIP · VIP+ 霓虹高亮)
            </div>
          </button>
        </div>
      </div>

      {/* 2. 列头标题配置 */}
      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#334155", marginBottom: 8 }}>
          列头标题配置
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          <div>
            <label style={{ fontSize: 9.5, color: "#64748B", display: "block", marginBottom: 3 }}>特权列名</label>
            <input
              type="text"
              value={featureColTitle}
              onChange={(e) => updateNode(node.id, { config: { ...config, featureColTitle: e.target.value } })}
              style={{ width: "100%", height: 30, fontSize: 11, padding: "3px 6px", borderRadius: 4, border: "1px solid #CBD5E1", background: "#fff" }}
            />
          </div>
          <div>
            <label style={{ fontSize: 9.5, color: "#64748B", display: "block", marginBottom: 3 }}>对比列 1</label>
            <input
              type="text"
              value={col1Title}
              onChange={(e) => updateNode(node.id, { config: { ...config, col1Title: e.target.value } })}
              style={{ width: "100%", height: 30, fontSize: 11, padding: "3px 6px", borderRadius: 4, border: "1px solid #CBD5E1", background: "#fff" }}
            />
          </div>
          <div>
            <label style={{ fontSize: 9.5, color: "#64748B", display: "block", marginBottom: 3 }}>高亮列 2</label>
            <input
              type="text"
              value={col2Title}
              onChange={(e) => updateNode(node.id, { config: { ...config, col2Title: e.target.value } })}
              style={{
                width: "100%",
                height: 30,
                fontSize: 11,
                fontWeight: 700,
                color: currentMode === "vip-vs-plus" ? "#7C3AED" : "#D97706",
                padding: "3px 6px",
                borderRadius: 4,
                border: "1px solid #CBD5E1",
                background: "#fff",
              }}
            />
          </div>
        </div>

        {/* 优化绿色框：改用 iOS / AntD Switch 开关，视觉规整舒适 */}
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#334155" }}>显示展开箭头 ( ∨ )</div>
            <div style={{ fontSize: 9.5, color: "#94a3b8" }}>在特权名称右侧展示小箭头</div>
          </div>
          <Switch
            checked={showExpandCaret}
            onChange={(val) => updateNode(node.id, { config: { ...config, showExpandCaret: val } })}
          />
        </div>
      </div>

      {/* 3. 对比特权矩阵管理（彻底精简多余冗杂按钮，仅保留直接编辑文案，展示完整且无多余空白） */}
      <div style={{ background: "#ffffff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>
            对比表格
          </span>
        </div>

        {/* 表格标题行提示：特权名 | 列1文案 | 列2文案 */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", background: "#f1f5f9", borderRadius: 4, marginBottom: 6, fontSize: 10.5, fontWeight: 700, color: "#64748b" }}>
          <span style={{ width: 22, textAlign: "center" }}>#</span>
          <span style={{ flex: 1.6 }}>特权名称</span>
          <span style={{ flex: 1.0, textAlign: "center" }}>{col1Title} 文案</span>
          <span style={{ flex: 1.0, textAlign: "center", color: currentMode === "vip-vs-plus" ? "#7c3aed" : "#d97706" }}>{col2Title} 文案</span>
        </div>

        {/* 紧凑规整的行列表，彻底消除空白与挤压，完整展示所有特权 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, maxHeight: 360, overflowY: "auto", paddingRight: 2 }}>
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                padding: "6px 8px",
                transition: "all 0.15s",
              }}
            >
              {/* 序号 */}
              <span style={{ width: 22, textAlign: "center", fontSize: 10.5, fontWeight: 800, color: "#94a3b8", flexShrink: 0 }}>
                {idx + 1}
              </span>

              {/* 特权名称 */}
              <input
                type="text"
                value={item.name}
                placeholder="特权名称"
                onChange={(e) => updateItem(idx, { name: e.target.value })}
                style={{
                  flex: 1.6,
                  minWidth: 80,
                  height: 30,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: 4,
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                }}
              />

              {/* 列1文案 (例如: 各1门, 🔒, 10/天) */}
              <input
                type="text"
                value={item.col1Val}
                placeholder={col1Title}
                title={`${col1Title}（支持文字或 🔒 锁标）`}
                onChange={(e) => {
                  const val = e.target.value;
                  updateItem(idx, { col1Val: val, col1Type: val === "🔒" ? "lock" : "text" });
                }}
                style={{
                  flex: 1.0,
                  minWidth: 55,
                  height: 30,
                  fontSize: 11,
                  textAlign: "center",
                  padding: "3px 6px",
                  borderRadius: 4,
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: item.col1Val === "🔒" ? "#64748b" : "#1e293b",
                }}
              />

              {/* 列2文案 (例如: 各3门, ✓, 25/天, x9) */}
              <input
                type="text"
                value={item.col2Val}
                placeholder={col2Title}
                title={`${col2Title}（支持文字或 ✓ 对勾）`}
                onChange={(e) => {
                  const val = e.target.value;
                  updateItem(idx, { col2Val: val, col2Type: val === "✓" ? "check" : "text" });
                }}
                style={{
                  flex: 1.0,
                  minWidth: 55,
                  height: 30,
                  fontSize: 11,
                  fontWeight: 700,
                  textAlign: "center",
                  padding: "3px 6px",
                  borderRadius: 4,
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: item.col2Val === "✓" ? (currentMode === "vip-vs-plus" ? "#7c3aed" : "#d97706") : "#1e293b",
                }}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "6px 10px",
            background: "#f8fafc",
            border: "1px dashed #cbd5e1",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 700,
            color: "#475569",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Plus size={12} />
          <span>添加新特权对比项</span>
        </button>
      </div>
    </div>
  );
}
