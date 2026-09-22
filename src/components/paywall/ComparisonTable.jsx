import React from "react";
import { Check, X } from "lucide-react";

function resolve(text, locale) {
  if (!text) return "";
  if (typeof text === "object") return text[locale] || text["zh-CN"] || text["en"] || "";
  return String(text);
}

export default function ComparisonTable({
  tiers = ["Free", "VIP", "VIP+"],
  features = [],
  locale = "zh-CN",
  className = "",
}) {
  if (!features || !features.length) return null;

  return (
    <div className={`paywall-comparison-table-wrap ${className}`}>
      <table className="paywall-comparison-table">
        <thead>
          <tr>
            <th className="feature-col">特权项目</th>
            {tiers.map((t, idx) => (
              <th key={idx} className={`tier-col ${idx === tiers.length - 1 ? "tier-highlight" : ""}`}>
                {resolve(t, locale)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feat, idx) => {
            const name = resolve(feat.name, locale);
            return (
              <tr key={idx}>
                <td className="feature-name">{name}</td>
                {tiers.map((t, tIdx) => {
                  const val = feat.values ? feat.values[tIdx] : feat[t.toLowerCase()];
                  return (
                    <td key={tIdx} className={`tier-val ${tIdx === tiers.length - 1 ? "tier-highlight" : ""}`}>
                      {val === true ? (
                        <Check size={16} className="text-success inline-block" />
                      ) : val === false ? (
                        <X size={16} className="text-muted inline-block" />
                      ) : (
                        <span>{resolve(val, locale)}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
