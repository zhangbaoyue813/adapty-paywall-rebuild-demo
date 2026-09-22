import React from "react";
import { Check } from "lucide-react";

function resolve(text, locale) {
  if (!text) return "";
  if (typeof text === "object") return text[locale] || text["zh-CN"] || text["en"] || "";
  return String(text);
}

export default function ProductTiers({
  products = [],
  selectedId,
  onSelect,
  layout = "stack", // 'stack' (vertical) | 'cards' (horizontal 2-3)
  locale = "zh-CN",
  className = "",
}) {
  if (!products || !products.length) return null;

  return (
    <div className={`paywall-product-tiers tiers-${layout} ${className}`}>
      {products.map((prod) => {
        const isSelected = selectedId ? prod.id === selectedId : prod.isRecommended;
        const name = resolve(prod.name, locale);
        const subname = resolve(prod.subname, locale);
        const tag = resolve(prod.tag, locale);
        const dailyPrice = resolve(prod.dailyPrice, locale);

        return (
          <div
            key={prod.id}
            className={`paywall-tier-card ${isSelected ? "selected" : ""} ${prod.isRecommended ? "recommended" : ""}`}
            onClick={() => onSelect && onSelect(prod.id)}
          >
            {tag && <span className="tier-tag-badge">{tag}</span>}

            <div className="tier-left">
              <div className="tier-radio">
                <span className={`radio-circle ${isSelected ? "checked" : ""}`}>
                  {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                </span>
              </div>
              <div className="tier-info">
                <strong className="tier-name">{name}</strong>
                {subname && <small className="tier-subname">{subname}</small>}
                {dailyPrice && <span className="tier-daily-price">{dailyPrice}</span>}
              </div>
            </div>

            <div className="tier-right">
              <span className="tier-price">{prod.price}</span>
              {prod.originalPrice && (
                <del className="tier-original-price">{prod.originalPrice}</del>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
