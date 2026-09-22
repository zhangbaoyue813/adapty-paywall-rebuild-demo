import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

function resolve(text, locale) {
  if (!text) return "";
  if (typeof text === "object") return text[locale] || text["zh-CN"] || text["en"] || "";
  return String(text);
}

export default function SocialProof({
  type = "carousel", // 'carousel' | 'stars-badge'
  rating = 4.9,
  ratingCount = "120,000+",
  reviews = [],
  locale = "zh-CN",
  autoPlay = true,
  className = "",
}) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!autoPlay || !reviews.length || reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay, reviews.length]);

  if (type === "stars-badge") {
    return (
      <div className={`paywall-social-stars-badge ${className}`}>
        <div className="stars-row">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#FFC000" color="#FFC000" />
          ))}
        </div>
        <span className="rating-text">
          {rating} 分 · 超 {ratingCount} 真实好评
        </span>
      </div>
    );
  }

  if (!reviews || !reviews.length) return null;

  const currentReview = reviews[currentIdx] || reviews[0];
  const content = resolve(currentReview.content, locale);
  const author = resolve(currentReview.author, locale);
  const tag = resolve(currentReview.tag, locale);

  return (
    <div className={`paywall-review-carousel ${className}`}>
      <div className="review-card">
        <div className="review-header">
          <div className="stars-row">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#FFC000" color="#FFC000" />
            ))}
          </div>
          {tag && <span className="review-tag">{tag}</span>}
        </div>
        <p className="review-content">“{content}”</p>
        <div className="review-footer">
          <span className="review-author">— {author}</span>
          <div className="review-dots">
            {reviews.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === currentIdx ? "active" : ""}`}
                onClick={() => setCurrentIdx(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
