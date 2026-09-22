import React from "react";

function resolve(text, locale) {
  if (!text) return "";
  if (typeof text === "object") return text[locale] || text["zh-CN"] || text["en"] || "";
  return String(text);
}

export default function TrialToggle({
  enabled = true,
  onToggle,
  title = "开启 7 天免费试用",
  subtitle = "试用期结束前可随时在 App Store 取消，不扣款",
  locale = "zh-CN",
  className = "",
}) {
  const resolvedTitle = resolve(title, locale);
  const resolvedSub = resolve(subtitle, locale);

  return (
    <div
      className={`paywall-trial-toggle ${className}`}
      onClick={() => onToggle && onToggle(!enabled)}
    >
      <div className="toggle-info">
        <strong className="toggle-title">{resolvedTitle}</strong>
        {resolvedSub && <small className="toggle-sub">{resolvedSub}</small>}
      </div>
      <div className={`ios-switch-knob ${enabled ? "active" : ""}`}>
        <span className="knob-circle" />
      </div>
    </div>
  );
}
