import React from "react";
import { X, ChevronLeft } from "lucide-react";

export default function CloseNavigation({
  position = "top-right",
  styleType = "close", // 'close' | 'back'
  theme = "dark", // 'dark' | 'light'
  showRestore = false,
  restoreText = "恢复购买",
  onClose,
  onRestore,
}) {
  const iconColor = theme === "light" ? "#FFFFFF" : "#4E5969";
  const btnBg = theme === "light" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.06)";

  return (
    <div className="paywall-navigation-bar">
      {styleType === "back" ? (
        <button
          type="button"
          className="paywall-nav-icon-btn"
          style={{ background: btnBg, color: iconColor }}
          onClick={onClose}
          aria-label="Back"
        >
          <ChevronLeft size={18} />
        </button>
      ) : (
        <div style={{ width: 32 }} />
      )}

      <div className="paywall-nav-right">
        {showRestore && (
          <button
            type="button"
            className="paywall-nav-restore-btn"
            style={{ color: iconColor }}
            onClick={onRestore}
          >
            {restoreText}
          </button>
        )}
        {styleType === "close" && (
          <button
            type="button"
            className="paywall-nav-icon-btn"
            style={{ background: btnBg, color: iconColor }}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
