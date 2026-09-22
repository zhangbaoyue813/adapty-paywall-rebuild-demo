import React from "react";

export default function HeroMedia({
  mediaUrl,
  mediaType = "image",
  height = 180,
  overlay = true,
  overlayOpacity = 0.25,
  cornerRadius = 0,
  className = "",
}) {
  return (
    <div
      className={`paywall-hero-media ${className}`}
      style={{
        height: `${height}px`,
        borderRadius: `${cornerRadius}px`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {mediaType === "video" ? (
        <video
          src={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${mediaUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      {overlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,${overlayOpacity}) 100%)`,
          }}
        />
      )}
    </div>
  );
}
