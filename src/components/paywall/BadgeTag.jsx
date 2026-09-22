import React from "react";

export default function BadgeTag({
  text,
  variant = "pill", // 'pill' | 'ribbon' | 'corner'
  bgColor = "#FF4D4F",
  textColor = "#FFFFFF",
  className = "",
}) {
  if (!text) return null;

  return (
    <span
      className={`paywall-badge-tag badge-${variant} ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {text}
    </span>
  );
}
