import React from "react";

function resolveText(content, locale, jinjaVars = {}) {
  if (!content) return "";
  let text = typeof content === "object" ? content[locale] || content["zh-CN"] || content["en"] || "" : String(content);
  return text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
    return jinjaVars[key] !== undefined ? String(jinjaVars[key]) : `{{${key}}}`;
  });
}

export default function HeaderTitle({
  kicker,
  title,
  subtitle,
  align = "center",
  color = "#1F2329",
  kickerColor = "#E6A23C",
  locale = "zh-CN",
  jinjaVars = {},
  className = "",
}) {
  const resolvedKicker = resolveText(kicker, locale, jinjaVars);
  const resolvedTitle = resolveText(title, locale, jinjaVars);
  const resolvedSubtitle = resolveText(subtitle, locale, jinjaVars);

  return (
    <div
      className={`paywall-header-title ${align === "left" ? "text-left" : "text-center"} ${className}`}
      style={{ color }}
    >
      {resolvedKicker && (
        <span className="paywall-kicker" style={{ color: kickerColor }}>
          {resolvedKicker}
        </span>
      )}
      {resolvedTitle && (
        <h1 className="paywall-main-title">
          {resolvedTitle}
        </h1>
      )}
      {resolvedSubtitle && (
        <p className="paywall-subtitle">
          {resolvedSubtitle}
        </p>
      )}
    </div>
  );
}
