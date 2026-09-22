import React, { useState } from "react";
import { PAYWALL_TEMPLATES } from "../templates/paywallTemplates";
import PaywallRenderer from "../renderers/PaywallRenderer";
import { Smartphone, Globe, Code2, Sparkles, Layers, Sliders } from "lucide-react";

export default function PaywallPlayground({ locale, setLocale }) {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("preview"); // 'preview' | 'schema'
  const [jinjaVars, setJinjaVars] = useState({
    nick_name: "张宝月",
    vip_expired_days: 14,
    visitor_count: 28,
  });

  const currentTemplate = PAYWALL_TEMPLATES[selectedTemplateIndex];

  return (
    <div className="playground-container">
      {/* Top Banner / Breadcrumb */}
      <div className="playground-header">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles size={20} className="text-emerald-500" />
            HelloTalk 付费墙模版与组件化工作台
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            基于 HelloTalk 真实 CMS 商业化模型构建 · 12 大通用积木自由拼装 · 实时动态渲染
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Locale Switch */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1 text-xs">
            <button
              type="button"
              className={`px-3 py-1 rounded-md font-medium transition ${locale === "zh-CN" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600"}`}
              onClick={() => setLocale("zh-CN")}
            >
              中文
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-md font-medium transition ${locale === "en" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600"}`}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      <div className="playground-body">
        {/* Left Side: Template Selector & Jinja Variables */}
        <div className="playground-left-panel">
          <div className="panel-section">
            <h3 className="section-title flex items-center gap-2">
              <Layers size={16} /> 选择 Paywall 模版
            </h3>
            <div className="template-cards-list">
              {PAYWALL_TEMPLATES.map((tmpl, idx) => (
                <div
                  key={tmpl.id}
                  className={`template-selector-card ${selectedTemplateIndex === idx ? "active" : ""}`}
                  onClick={() => setSelectedTemplateIndex(idx)}
                >
                  <div className="flex justify-between items-start">
                    <strong className="text-sm font-semibold">{tmpl.name}</strong>
                    <span className="template-badge">{tmpl.category}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">场景: {tmpl.scene}</p>
                  <div className="template-chips">
                    <span>{tmpl.components.length} 个积木组件</span>
                    <span>{tmpl.theme === "dark" ? "深色主题" : "浅色主题"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jinja Variables Simulator */}
          <div className="panel-section mt-4">
            <h3 className="section-title flex items-center gap-2">
              <Sliders size={16} /> Jinja 动态变量实时模拟
            </h3>
            <div className="jinja-inputs">
              <label>
                <span>用户昵称 (nick_name)</span>
                <input
                  type="text"
                  value={jinjaVars.nick_name}
                  onChange={(e) => setJinjaVars({ ...jinjaVars, nick_name: e.target.value })}
                />
              </label>
              <label>
                <span>已过期天数 (vip_expired_days)</span>
                <input
                  type="number"
                  value={jinjaVars.vip_expired_days}
                  onChange={(e) => setJinjaVars({ ...jinjaVars, vip_expired_days: Number(e.target.value) })}
                />
              </label>
              <label>
                <span>访客数量 (visitor_count)</span>
                <input
                  type="number"
                  value={jinjaVars.visitor_count}
                  onChange={(e) => setJinjaVars({ ...jinjaVars, visitor_count: Number(e.target.value) })}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Center: Mobile Device Frame */}
        <div className="playground-center-panel">
          <div className="device-toolbar">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Smartphone size={15} /> iPhone 15 Pro (375 × 812)
            </span>
            <div className="view-mode-tabs">
              <button
                type="button"
                className={activeTab === "preview" ? "active" : ""}
                onClick={() => setActiveTab("preview")}
              >
                真实预览
              </button>
              <button
                type="button"
                className={activeTab === "schema" ? "active" : ""}
                onClick={() => setActiveTab("schema")}
              >
                <Code2 size={13} className="inline mr-1" /> 模版 JSON Schema
              </button>
            </div>
          </div>

          {activeTab === "preview" ? (
            <div className="phone-mockup-wrap">
              <div className="phone-screen-container">
                <PaywallRenderer
                  template={currentTemplate}
                  locale={locale}
                  jinjaVars={jinjaVars}
                />
              </div>
            </div>
          ) : (
            <div className="schema-view-wrap">
              <pre className="schema-json-code">
                {JSON.stringify(currentTemplate, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Right Side: Component Stack Inspector */}
        <div className="playground-right-panel">
          <h3 className="section-title flex items-center gap-2">
            <Layers size={16} /> 当前模版组件堆栈 (Component Stack)
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            以下是本模版引用的独立通用积木及其配置参数：
          </p>

          <div className="stack-elements-list">
            {currentTemplate.components.map((item, idx) => (
              <div key={idx} className="stack-element-card">
                <div className="stack-card-header">
                  <span className="stack-idx">#{idx + 1}</span>
                  <strong>{item.type}</strong>
                </div>
                <div className="stack-card-props">
                  {Object.entries(item.props || {}).map(([k, v]) => (
                    <div key={k} className="prop-row">
                      <span className="prop-key">{k}:</span>
                      <span className="prop-val">
                        {typeof v === "object" ? JSON.stringify(v) : String(v)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
