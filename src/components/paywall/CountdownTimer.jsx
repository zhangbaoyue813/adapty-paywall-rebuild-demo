import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

function formatTime(seconds) {
  if (seconds <= 0) return "00:00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export default function CountdownTimer({
  initialSeconds = 17999, // ~5 hours default
  label = "优惠截止倒计时",
  bgColor = "#FFF7E8",
  textColor = "#FA8C16",
  onExpire,
  className = "",
}) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  return (
    <div
      className={`paywall-countdown-bar ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <Clock size={15} className="inline-block mr-1.5" />
      <span className="countdown-label">{label}:</span>
      <strong className="countdown-digits">{formatTime(timeLeft)}</strong>
    </div>
  );
}
