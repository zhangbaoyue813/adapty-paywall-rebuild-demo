import React from "react";

export default function HelloTalkMascot({ size = 96, className = "" }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size * 0.96,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        filter: "drop-shadow(0 4px 10px rgba(255, 120, 40, 0.25))",
      }}
    >
      <svg
        width={size}
        height={size * 0.96}
        viewBox="0 0 120 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="htMascotBodyGrad" x1="15" y1="10" x2="105" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE15D" />
            <stop offset="42%" stopColor="#FFAA1D" />
            <stop offset="78%" stopColor="#FF6A3D" />
            <stop offset="100%" stopColor="#FF3377" />
          </linearGradient>
          <linearGradient id="htEyeGradLeft" x1="38" y1="46" x2="48" y2="66" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8A1C9A" />
            <stop offset="50%" stopColor="#C2185B" />
            <stop offset="100%" stopColor="#FF4081" />
          </linearGradient>
          <linearGradient id="htEyeGradRight" x1="62" y1="48" x2="72" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8A1C9A" />
            <stop offset="50%" stopColor="#C2185B" />
            <stop offset="100%" stopColor="#FF4081" />
          </linearGradient>
        </defs>

        {/* Mascot Body - Waving 5-finger star/hand form */}
        <path
          d="M34 40 C21 28, 11 44, 21 56 C15 59, 11 67, 16 76 C20 83, 29 85, 37 83 C41 94, 51 103, 62 102 C72 101, 78 92, 80 85 C89 93, 99 91, 103 82 C108 73, 103 63, 95 59 C105 51, 104 36, 93 33 C83 31, 76 41, 73 47 C69 31, 59 18, 48 20 C39 22, 36 33, 34 40 Z"
          fill="url(#htMascotBodyGrad)"
        />

        {/* Smiling Feet / Arm Tips */}
        <ellipse cx="46" cy="99" rx="5" ry="3.2" fill="#D81B60" transform="rotate(-12 46 99)" />
        <ellipse cx="63" cy="101" rx="5" ry="3.2" fill="#D81B60" transform="rotate(8 63 101)" />
        <ellipse cx="79" cy="96" rx="5" ry="3.2" fill="#D81B60" transform="rotate(22 79 96)" />

        {/* Left Big Friendly Eye */}
        <ellipse cx="43.5" cy="56" rx="9" ry="11.5" fill="#FFFFFF" />
        <ellipse cx="45" cy="57" rx="6.5" ry="8.5" fill="url(#htEyeGradLeft)" />
        {/* Sparkles / Catchlights */}
        <circle cx="43" cy="52.5" r="3" fill="#FFFFFF" />
        <circle cx="47.5" cy="61" r="1.5" fill="#FFFFFF" />

        {/* Right Big Friendly Eye */}
        <ellipse cx="68" cy="58" rx="9.5" ry="12" fill="#FFFFFF" />
        <ellipse cx="67" cy="59" rx="7" ry="9" fill="url(#htEyeGradRight)" />
        {/* Sparkles / Catchlights */}
        <circle cx="65" cy="54" r="3.2" fill="#FFFFFF" />
        <circle cx="69.5" cy="63" r="1.6" fill="#FFFFFF" />

        {/* Cheerful Open Mouth */}
        <path
          d="M51 68 C51 68, 56 79, 63.5 77 C71 75, 68 67, 68 67 Z"
          fill="#880E4F"
        />
        <path
          d="M54 73 C56 77, 61.5 77, 63.5 74 C61.5 72, 57 71, 54 73 Z"
          fill="#FF4081"
        />

        {/* Blushing Cheeks */}
        <ellipse cx="32" cy="66" rx="4.5" ry="2.8" fill="#FF4081" opacity="0.65" />
        <ellipse cx="78" cy="69" rx="4.5" ry="2.8" fill="#FF4081" opacity="0.65" />
      </svg>
    </div>
  );
}
