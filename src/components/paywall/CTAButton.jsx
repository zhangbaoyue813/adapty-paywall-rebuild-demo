import React from "react";
import { Loader2 } from "lucide-react";

function resolve(text, locale) {
  if (!text) return "";
  if (typeof text === "object") return text[locale] || text["zh-CN"] || text["en"] || "";
  return String(text);
}

export default function CTAButton({
  title,
  subTitle,
  variant = "primary", // 'primary' | 'secondary'
  gradient = ["#1ECA92", "#13B07E"],
  loading = false,
  disabled = false,
  locale = "zh-CN",
  onClick,
  className = "",
}) {
  const resolvedTitle = resolve(title, locale);
  const resolvedSubTitle = resolve(subTitle, locale);

  const background =
    variant === "primary"
      ? `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`
      : "#F2F3F5";
  const textColor = variant === "primary" ? "#FFFFFF" : "#4E5969";

  return (
    <button
      type="button"
      className={`paywall-cta-button cta-${variant} ${className}`}
      style={{ background, color: textColor }}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <Loader2 className="animate-spin inline-block mx-auto" size={20} />
      ) : (
        <>
          <span className="cta-primary-title">{resolvedTitle}</span>
          {resolvedSubTitle && (
            <span className="cta-secondary-title">{resolvedSubTitle}</span>
          )}
        </>
      )}
    </button>
  );
}
