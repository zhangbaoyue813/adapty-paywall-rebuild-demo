import React from "react";
import {
  Clock,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

export const DEFAULT_ENTRY_CONFIG = {
  subTemplate: "tpl-1", // "tpl-1" (模板1: 粉白高光折扣版) | "tpl-2" (模板2: 暖橙插画新客礼包版)
  bgImage: "",
  mainFontColor: "#2D1832", // 包含HelloTalk VIP色值,标题色,原价色值,倒计时色值
  titleLang: "Simplified Chinese",
  titleKicker: "HelloTalk VIP 👑",
  titleText: "首年额外 20% 优惠！",
  discountMode: "default", // "default" (默认文案: 带变量) | "flexible" (灵活文案: 纯文本)
  flexibleText: "新客专享限时破冰特惠",
  countdownHours: 20,
  privilegeColor: "#2D1832", // 用来配置paywall里显示的特权，最多配置3个
  privileges: [
    { id: "p1", lang: "Simplified Chinese", text: "搜索附近的人" },
    { id: "p2", lang: "Simplified Chinese", text: "解锁谁看了我" },
    { id: "p3", lang: "Simplified Chinese", text: "无限翻译&字幕" },
  ],
  otherColor: "#DE6876", // 包含促销价、特权对号色值
  btnColor: "#C85B6B", // 按钮主背景色
  promoLang: "Simplified Chinese",
  promoText: "仅限今日",
  btnTextColor: "#FFFFFF",
  btnLang: "Simplified Chinese",
  btnText: "继续",
  disclaimerColor: "#B5A8AF",
  priceNow: "折扣价 ¥388/年",
  priceOriginal: "原价 ¥488/年",
  priceSub: "",
};

export default function EntryPriceConfigManager({ node, updateNode, config: propConfig, onConfigChange, notify }) {
  const config = propConfig || { ...DEFAULT_ENTRY_CONFIG, ...(node?.config || {}) };

  const updateConfig = (patch) => {
    if (onConfigChange) {
      onConfigChange({ ...config, ...patch });
    } else if (node && updateNode) {
      updateNode(node.id, {
        config: {
          ...config,
          ...patch,
        },
      });
    }
  };

  const handleAddPrivilege = () => {
    if (config.privileges.length >= 3) {
      notify?.("⚠️ 业务规则限制：入门价格页最多只能配置 3 个特权！");
      return;
    }
    const nextId = `p${Date.now()}`;
    const newPrivilege = { id: nextId, lang: "English", text: "全新VIP核心学习特权" };
    updateConfig({ privileges: [...config.privileges, newPrivilege] });
    notify?.(`已追加特权 ${config.privileges.length + 1} (最多3项)`);
  };

  const handleRemovePrivilege = (index) => {
    if (config.privileges.length <= 1) {
      notify?.("至少需要保留 1 项核心特权展示");
      return;
    }
    const nextList = config.privileges.filter((_, idx) => idx !== index);
    updateConfig({ privileges: nextList });
    notify?.("已移除特权项");
  };

  const handlePrivilegeChange = (index, val) => {
    const nextList = [...config.privileges];
    nextList[index] = { ...nextList[index], text: val };
    updateConfig({ privileges: nextList });
  };

  return (
    <div className="entry-price-cms-inspector" style={{ fontSize: 12, color: "#334155" }}>
      {/* CMS Header Banner */}
      <div
        style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 8,
          padding: "10px 12px",
          marginBottom: 16,
          display: "flex",
          gap: 8,
          alignItems: "flex-start",
        }}
      >
        <span style={{ fontSize: 16, marginTop: 1 }}>ⓘ</span>
        <div style={{ fontSize: 11, color: "#166534", lineHeight: 1.5 }}>
          <strong>HelloTalk CMS 具体内容配置区：</strong>
          <br />
          下面不同区块配置的色值代表在该区块内配置的文案在客户端显示的颜色，根据配置月/年/终身的模板在价格文案选框内选择展示对应的价格文案。
        </div>
      </div>

      {/* 1. 模板选择 (Template 1 vs Template 2) */}
      <div style={{ marginBottom: 16, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <label style={{ fontWeight: 700, color: "#0f172a" }}>
            <span style={{ color: "#ef4444" }}>* </span>模板选择:
          </label>
          <span style={{ fontSize: 11, color: "#64748b" }}>点击直接切换画布视觉</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {/* Option 1: 模板1 */}
          <div
            onClick={() => {
              updateConfig({ subTemplate: "tpl-1", otherColor: "#FF4D6D" });
              notify?.("已切换至「模板 1」");
            }}
            style={{
              border: config.subTemplate === "tpl-1" ? "2px solid #6366f1" : "1px solid #cbd5e1",
              borderRadius: 8,
              padding: 8,
              cursor: "pointer",
              background: config.subTemplate === "tpl-1" ? "#f5f3ff" : "#fff",
              position: "relative",
              textAlign: "center",
              transition: "all 0.15s ease",
            }}
          >
            <div
              style={{
                height: 70,
                borderRadius: 6,
                background: "linear-gradient(180deg, #FFE4E6 0%, #FFFFFF 100%)",
                border: "1px solid #FECDD3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, color: "#E11D48" }}>HelloTalk VIP</span>
              <span style={{ fontSize: 8, background: "#FF4D6D", color: "#fff", padding: "1px 6px", borderRadius: 4 }}>
                额外 20% 优惠
              </span>
              <span style={{ fontSize: 8, color: "#64748b" }}>限时倒计时</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              <input
                type="radio"
                name="entry-tpl"
                checked={config.subTemplate === "tpl-1"}
                onChange={() => updateConfig({ subTemplate: "tpl-1", otherColor: "#FF4D6D" })}
              />
              <strong style={{ fontSize: 12 }}>模板 1</strong>
            </div>
          </div>

          {/* Option 2: 模板2 */}
          <div
            onClick={() => {
              updateConfig({ subTemplate: "tpl-2", otherColor: "#F59E0B" });
              notify?.("已切换至「模板 2」");
            }}
            style={{
              border: config.subTemplate === "tpl-2" ? "2px solid #6366f1" : "1px solid #cbd5e1",
              borderRadius: 8,
              padding: 8,
              cursor: "pointer",
              background: config.subTemplate === "tpl-2" ? "#f5f3ff" : "#fff",
              position: "relative",
              textAlign: "center",
              transition: "all 0.15s ease",
            }}
          >
            <div
              style={{
                height: 70,
                borderRadius: 6,
                background: "linear-gradient(180deg, #FF6B35 0%, #FFA07A 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                marginBottom: 6,
                color: "#fff",
              }}
            >
              <span style={{ fontSize: 14 }}>🌍 语伴交流</span>
              <span style={{ fontSize: 8, background: "rgba(0,0,0,0.25)", padding: "1px 5px", borderRadius: 4 }}>
                搜索附近的人
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              <input
                type="radio"
                name="entry-tpl"
                checked={config.subTemplate === "tpl-2"}
                onChange={() => updateConfig({ subTemplate: "tpl-2", otherColor: "#F59E0B" })}
              />
              <strong style={{ fontSize: 12 }}>模板 2</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 背景图配置 */}
      <div style={{ marginBottom: 16, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
        <label style={{ fontWeight: 700, color: "#0f172a", display: "block", marginBottom: 6 }}>背景图:</label>
        <div style={{ display: "flex", gap: 6 }}>
          <input
            type="text"
            placeholder="自定义背景图 URL (留空默认跟随模板底色)"
            value={config.bgImage}
            onChange={(e) => updateConfig({ bgImage: e.target.value })}
            style={{
              flex: 1,
              height: 32,
              padding: "0 8px",
              border: "1px solid #cbd5e1",
              borderRadius: 6,
              fontSize: 11,
            }}
          />
          <button
            type="button"
            onClick={() => notify?.("背景图上传：支持直接粘贴 CDN 链接或点击应用")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "0 10px",
              height: 32,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            <Upload size={13} /> 上传
          </button>
        </div>
        <span style={{ fontSize: 10, color: "#dc2626", display: "block", marginTop: 4 }}>
          *选填，不填写即是默认背景，上传其他元素一定要和设计师确定
        </span>
      </div>

      {/* 3. 绿色线框区块 1：主字体与倒计时配置 */}
      <div
        style={{
          border: "1.5px solid #10b981",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          background: "#fafdfc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <strong style={{ color: "#047857", fontSize: 12 }}>区块 1：主信息与倒计时配置</strong>
          <span style={{ fontSize: 10, background: "#ecfdf5", color: "#059669", padding: "1px 6px", borderRadius: 4 }}>
            核心文字 & 时长
          </span>
        </div>

        {/* 主字体色值 */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <label style={{ fontWeight: 600 }}>
              <span style={{ color: "#ef4444" }}>* </span>主字体色值：
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="color"
                value={config.mainFontColor}
                onChange={(e) => updateConfig({ mainFontColor: e.target.value })}
                style={{ width: 26, height: 26, padding: 0, border: "none", borderRadius: 4, cursor: "pointer" }}
              />
              <input
                type="text"
                value={config.mainFontColor}
                onChange={(e) => updateConfig({ mainFontColor: e.target.value })}
                style={{ width: 75, height: 26, border: "1px solid #cbd5e1", borderRadius: 4, padding: "0 6px", fontSize: 11 }}
              />
            </div>
          </div>
          <span style={{ fontSize: 10, color: "#dc2626", display: "block" }}>
            *包含 HelloTalk VIP 色值、标题色、原价色值、Offer ends 倒计时色值
          </span>
        </div>

        {/* 标题文案多语言 */}
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
            <span style={{ color: "#ef4444" }}>* </span>标题文案多语言：
          </label>
          <div style={{ display: "flex", gap: 6 }}>
            <select
              value={config.titleLang}
              onChange={(e) => updateConfig({ titleLang: e.target.value })}
              style={{ width: 85, height: 32, border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 11 }}
            >
              <option value="English">English</option>
              <option value="zh-CN">简体中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
            </select>
            <input
              type="text"
              value={config.titleText}
              onChange={(e) => updateConfig({ titleText: e.target.value })}
              style={{ flex: 1, height: 32, border: "1px solid #cbd5e1", borderRadius: 6, padding: "0 8px", fontSize: 11 }}
            />
          </div>
        </div>

        {/* 优惠文案单选 */}
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
            <span style={{ color: "#ef4444" }}>* </span>优惠文案模式：
          </label>
          <div style={{ display: "flex", gap: 16, marginBottom: 4 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
              <input
                type="radio"
                name="entry-discount-mode"
                checked={config.discountMode === "default"}
                onChange={() => updateConfig({ discountMode: "default" })}
              />
              <span>默认文案 (带倒计时变量)</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
              <input
                type="radio"
                name="entry-discount-mode"
                checked={config.discountMode === "flexible"}
                onChange={() => updateConfig({ discountMode: "flexible" })}
              />
              <span>灵活文案</span>
            </label>
          </div>
          {config.discountMode === "flexible" && (
            <input
              type="text"
              placeholder="输入自定义灵活文案 (不带变量)"
              value={config.flexibleText}
              onChange={(e) => updateConfig({ flexibleText: e.target.value })}
              style={{ width: "100%", height: 30, border: "1px solid #cbd5e1", borderRadius: 4, padding: "0 8px", fontSize: 11, marginBottom: 4 }}
            />
          )}
          <span style={{ fontSize: 10, color: "#dc2626", display: "block" }}>
            *选择默认文案：与示例图中显示文案一致固定文案，带变量；选择灵活文案：可以配置文字，不带变量
          </span>
        </div>

        {/* 倒计时时长 */}
        <div>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
            <span style={{ color: "#ef4444" }}>* </span>倒计时时长:
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="number"
              min={1}
              max={168}
              value={config.countdownHours}
              onChange={(e) => updateConfig({ countdownHours: Math.max(1, parseInt(e.target.value) || 24) })}
              style={{ width: 80, height: 32, border: "1px solid #cbd5e1", borderRadius: 6, padding: "0 8px", fontSize: 12, fontWeight: 700 }}
            />
            <span style={{ fontSize: 11, color: "#64748b" }}>小时（驱动客户端真实倒计时）</span>
          </div>
          <span style={{ fontSize: 10, color: "#dc2626", display: "block", marginTop: 2 }}>*单位：小时</span>
        </div>
      </div>

      {/* 4. 绿色线框区块 2：特权色值与特权列表 (严格最多3个) */}
      <div
        style={{
          border: "1.5px solid #10b981",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          background: "#fafdfc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <strong style={{ color: "#047857", fontSize: 12 }}>区块 2：特权文案配置 (最多 3 个)</strong>
          <span
            style={{
              fontSize: 10,
              background: config.privileges.length >= 3 ? "#fef2f2" : "#ecfdf5",
              color: config.privileges.length >= 3 ? "#b91c1c" : "#059669",
              padding: "1px 6px",
              borderRadius: 4,
              fontWeight: 700,
            }}
          >
            {config.privileges.length} / 3 项
          </span>
        </div>

        {/* 特权色值 */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <label style={{ fontWeight: 600 }}>
              <span style={{ color: "#ef4444" }}>* </span>特权色值：
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="color"
                value={config.privilegeColor}
                onChange={(e) => updateConfig({ privilegeColor: e.target.value })}
                style={{ width: 26, height: 26, padding: 0, border: "none", borderRadius: 4, cursor: "pointer" }}
              />
              <input
                type="text"
                value={config.privilegeColor}
                onChange={(e) => updateConfig({ privilegeColor: e.target.value })}
                style={{ width: 75, height: 26, border: "1px solid #cbd5e1", borderRadius: 4, padding: "0 6px", fontSize: 11 }}
              />
            </div>
          </div>
          <span style={{ fontSize: 10, color: "#dc2626", display: "block" }}>
            *用来配置 paywall 里显示的特权，最多配置 3 个
          </span>
        </div>

        {/* 特权行列表 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
          {config.privileges.map((priv, idx) => (
            <div key={priv.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", width: 50 }}>特权{idx + 1}：</span>
              <input
                type="text"
                value={priv.text}
                onChange={(e) => handlePrivilegeChange(idx, e.target.value)}
                style={{ flex: 1, height: 30, border: "1px solid #cbd5e1", borderRadius: 4, padding: "0 8px", fontSize: 11 }}
              />
              <button
                type="button"
                title="删除此特权"
                onClick={() => handleRemovePrivilege(idx)}
                style={{
                  width: 26,
                  height: 26,
                  border: "none",
                  borderRadius: 4,
                  background: "#fee2e2",
                  color: "#ef4444",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* 追加按钮 */}
        <button
          type="button"
          disabled={config.privileges.length >= 3}
          onClick={handleAddPrivilege}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "5px 12px",
            background: config.privileges.length >= 3 ? "#cbd5e1" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
            cursor: config.privileges.length >= 3 ? "not-allowed" : "pointer",
          }}
        >
          <Plus size={13} /> {config.privileges.length >= 3 ? "已达到 3 项上限" : "追加特权 (最多3个)"}
        </button>
      </div>

      {/* 5. 绿色线框区块 3：其他色值与促销文案 */}
      <div
        style={{
          border: "1.5px solid #10b981",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          background: "#fafdfc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <strong style={{ color: "#047857", fontSize: 12 }}>区块 3：促销标签与高亮色</strong>
          <span style={{ fontSize: 10, background: "#ecfdf5", color: "#059669", padding: "1px 6px", borderRadius: 4 }}>
            Today Only 标签
          </span>
        </div>

        {/* 其他色值 */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <label style={{ fontWeight: 600 }}>
              <span style={{ color: "#ef4444" }}>* </span>其他强调色值：
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="color"
                value={config.otherColor}
                onChange={(e) => updateConfig({ otherColor: e.target.value })}
                style={{ width: 26, height: 26, padding: 0, border: "none", borderRadius: 4, cursor: "pointer" }}
              />
              <input
                type="text"
                value={config.otherColor}
                onChange={(e) => updateConfig({ otherColor: e.target.value })}
                style={{ width: 75, height: 26, border: "1px solid #cbd5e1", borderRadius: 4, padding: "0 6px", fontSize: 11 }}
              />
            </div>
          </div>
          <span style={{ fontSize: 10, color: "#dc2626", display: "block" }}>
            *包含 VIP 皇冠、促销价、特权对号、按钮色值
          </span>
        </div>

        {/* 促销文案多语言 */}
        <div>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
            <span style={{ color: "#ef4444" }}>* </span>促销文案多语言：
          </label>
          <div style={{ display: "flex", gap: 6 }}>
            <select
              value={config.promoLang}
              onChange={(e) => updateConfig({ promoLang: e.target.value })}
              style={{ width: 85, height: 32, border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 11 }}
            >
              <option value="English">English</option>
              <option value="zh-CN">简体中文</option>
            </select>
            <input
              type="text"
              value={config.promoText}
              onChange={(e) => updateConfig({ promoText: e.target.value })}
              style={{ flex: 1, height: 32, border: "1px solid #cbd5e1", borderRadius: 6, padding: "0 8px", fontSize: 11 }}
            />
          </div>
        </div>
      </div>

      {/* 6. 绿色线框区块 4：按钮文字色值与文案 */}
      <div
        style={{
          border: "1.5px solid #10b981",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          background: "#fafdfc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <strong style={{ color: "#047857", fontSize: 12 }}>区块 4：购买按钮配置</strong>
          <span style={{ fontSize: 10, background: "#ecfdf5", color: "#059669", padding: "1px 6px", borderRadius: 4 }}>
            购买转化按钮
          </span>
        </div>

        {/* 按钮文字色值 */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <label style={{ fontWeight: 600 }}>
              <span style={{ color: "#ef4444" }}>* </span>按钮文字色值：
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="color"
                value={config.btnTextColor}
                onChange={(e) => updateConfig({ btnTextColor: e.target.value })}
                style={{ width: 26, height: 26, padding: 0, border: "none", borderRadius: 4, cursor: "pointer" }}
              />
              <input
                type="text"
                value={config.btnTextColor}
                onChange={(e) => updateConfig({ btnTextColor: e.target.value })}
                style={{ width: 75, height: 26, border: "1px solid #cbd5e1", borderRadius: 4, padding: "0 6px", fontSize: 11 }}
              />
            </div>
          </div>
        </div>

        {/* 按钮文案多语言 */}
        <div>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
            <span style={{ color: "#ef4444" }}>* </span>按钮文案多语言：
          </label>
          <div style={{ display: "flex", gap: 6 }}>
            <select
              value={config.btnLang}
              onChange={(e) => updateConfig({ btnLang: e.target.value })}
              style={{ width: 85, height: 32, border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 11 }}
            >
              <option value="English">English</option>
              <option value="zh-CN">简体中文</option>
            </select>
            <input
              type="text"
              value={config.btnText}
              onChange={(e) => updateConfig({ btnText: e.target.value })}
              style={{ flex: 1, height: 32, border: "1px solid #cbd5e1", borderRadius: 6, padding: "0 8px", fontSize: 11 }}
            />
          </div>
        </div>
      </div>

      {/* 7. 绿色线框区块 5：订阅说明色值 */}
      <div
        style={{
          border: "1.5px solid #10b981",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          background: "#fafdfc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <strong style={{ color: "#047857", fontSize: 12 }}>区块 5：订阅说明与条款色值</strong>
          <span style={{ fontSize: 10, background: "#ecfdf5", color: "#059669", padding: "1px 6px", borderRadius: 4 }}>
            合规小字
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ fontWeight: 600 }}>
            <span style={{ color: "#ef4444" }}>* </span>订阅说明色值：
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="color"
              value={config.disclaimerColor}
              onChange={(e) => updateConfig({ disclaimerColor: e.target.value })}
              style={{ width: 26, height: 26, padding: 0, border: "none", borderRadius: 4, cursor: "pointer" }}
            />
            <input
              type="text"
              value={config.disclaimerColor}
              onChange={(e) => updateConfig({ disclaimerColor: e.target.value })}
              style={{ width: 75, height: 26, border: "1px solid #cbd5e1", borderRadius: 4, padding: "0 6px", fontSize: 11 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
