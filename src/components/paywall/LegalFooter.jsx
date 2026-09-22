import React from "react";

function resolve(text, locale) {
  if (!text) return "";
  if (typeof text === "object") return text[locale] || text["zh-CN"] || text["en"] || "";
  return String(text);
}

export default function LegalFooter({
  showTerms = true,
  showPrivacy = true,
  showRestore = true,
  termsUrl = "#",
  privacyUrl = "#",
  disclaimer,
  onRestore,
  locale = "zh-CN",
  className = "",
}) {
  const resolvedDisclaimer = resolve(disclaimer, locale);

  return (
    <div className={`paywall-legal-footer ${className}`}>
      {resolvedDisclaimer && (
        <p className="legal-disclaimer">{resolvedDisclaimer}</p>
      )}
      <div className="legal-links-row">
        {showTerms && (
          <a href={termsUrl} target="_blank" rel="noreferrer">
            {locale === "zh-CN" ? "服务条款" : "Terms of Use"}
          </a>
        )}
        {showTerms && showPrivacy && <span className="divider">·</span>}
        {showPrivacy && (
          <a href={privacyUrl} target="_blank" rel="noreferrer">
            {locale === "zh-CN" ? "隐私政策" : "Privacy Policy"}
          </a>
        )}
        {showPrivacy && showRestore && <span className="divider">·</span>}
        {showRestore && (
          <button type="button" onClick={onRestore} className="restore-link-btn">
            {locale === "zh-CN" ? "恢复购买" : "Restore"}
          </button>
        )}
      </div>
    </div>
  );
}
