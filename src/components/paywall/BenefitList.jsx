import React from "react";
import { Check, Sparkles, Globe, MessageSquare, Headphones, Zap } from "lucide-react";

const ICON_MAP = {
  check: Check,
  sparkles: Sparkles,
  globe: Globe,
  translate: MessageSquare,
  audio: Headphones,
  zap: Zap,
};

function resolve(text, locale) {
  if (!text) return "";
  if (typeof text === "object") return text[locale] || text["zh-CN"] || text["en"] || "";
  return String(text);
}

export default function BenefitList({
  items = [],
  layoutMode = "vertical", // 'vertical' | 'grid' | 'timeline'
  iconColor = "#1ECA92",
  locale = "zh-CN",
  className = "",
}) {
  if (!items || !items.length) return null;

  if (layoutMode === "grid") {
    return (
      <div className={`paywall-benefit-grid ${className}`}>
        {items.map((item, idx) => {
          const IconComp = ICON_MAP[item.icon] || Sparkles;
          const title = resolve(item.title, locale);
          const desc = resolve(item.desc, locale);
          return (
            <div key={idx} className="paywall-benefit-grid-item">
              <div className="benefit-grid-icon" style={{ color: iconColor }}>
                <IconComp size={20} />
              </div>
              <strong className="benefit-grid-title">{title}</strong>
              {desc && <span className="benefit-grid-desc">{desc}</span>}
            </div>
          );
        })}
      </div>
    );
  }

  if (layoutMode === "timeline") {
    return (
      <div className={`paywall-benefit-timeline ${className}`}>
        {items.map((item, idx) => {
          const title = resolve(item.title, locale);
          const desc = resolve(item.desc, locale);
          const step = item.step || `Day ${idx + 1}`;
          return (
            <div key={idx} className="paywall-timeline-item">
              <div className="timeline-node">
                <span className="timeline-dot" style={{ borderColor: iconColor }} />
                {idx < items.length - 1 && <span className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <span className="timeline-step" style={{ color: iconColor }}>{step}</span>
                <strong className="timeline-title">{title}</strong>
                {desc && <p className="timeline-desc">{desc}</p>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Default: vertical
  return (
    <ul className={`paywall-benefit-list ${className}`}>
      {items.map((item, idx) => {
        const IconComp = ICON_MAP[item.icon] || Check;
        const title = resolve(item.title, locale);
        const desc = resolve(item.desc, locale);
        return (
          <li key={idx} className="paywall-benefit-item">
            <span className="benefit-check-icon" style={{ color: iconColor, backgroundColor: `${iconColor}18` }}>
              <IconComp size={15} />
            </span>
            <div className="benefit-item-text">
              <strong className="benefit-item-title">{title}</strong>
              {desc && <small className="benefit-item-desc">{desc}</small>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
