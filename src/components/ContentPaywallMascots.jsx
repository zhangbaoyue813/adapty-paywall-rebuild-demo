import React from "react";

// 1. Crown Mascot for VIP Expired Style (media_1789876454480.png)
export function ContentCrownMascot({ size = 120, className = "" }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size * 0.65,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: "drop-shadow(0 6px 14px rgba(108, 62, 222, 0.2))",
      }}
    >
      <svg width={size} height={size * 0.65} viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="crownGoldGrad" x1="40" y1="10" x2="120" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="45%" stopColor="#FFC53D" />
            <stop offset="85%" stopColor="#FA8C16" />
            <stop offset="100%" stopColor="#D46B08" />
          </linearGradient>
          <linearGradient id="wingPinkGrad" x1="10" y1="30" x2="60" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF85C0" />
            <stop offset="100%" stopColor="#EB2F96" />
          </linearGradient>
          <linearGradient id="gemCyanGrad" x1="70" y1="40" x2="90" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5CDBD3" />
            <stop offset="100%" stopColor="#13C2C2" />
          </linearGradient>
          <linearGradient id="cloudPurpleGrad" x1="20" y1="60" x2="140" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D3ADF7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#722ED1" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Soft Purple Cushion / Cloud base */}
        <path
          d="M30 75 C30 65, 45 60, 60 62 C70 58, 90 58, 100 62 C115 60, 130 65, 130 75 C130 85, 115 90, 80 90 C45 90, 30 85, 30 75 Z"
          fill="url(#cloudPurpleGrad)"
        />

        {/* Left Wing / Aura */}
        <path
          d="M48 62 C32 50, 24 38, 20 28 C26 34, 34 38, 42 42 C30 32, 26 22, 28 14 C36 22, 46 32, 52 48 Z"
          fill="url(#wingPinkGrad)"
        />

        {/* Right Wing / Aura */}
        <path
          d="M112 62 C128 50, 136 38, 140 28 C134 34, 126 38, 118 42 C130 32, 134 22, 132 14 C124 22, 114 32, 108 48 Z"
          fill="url(#wingPinkGrad)"
        />

        {/* Central Golden Crown */}
        <path
          d="M48 66 L54 36 L68 50 L80 24 L92 50 L106 36 L112 66 Z"
          fill="url(#crownGoldGrad)"
        />
        <path
          d="M45 66 C45 64, 115 64, 115 66 L113 72 C113 74, 47 74, 47 72 Z"
          fill="#D46B08"
        />

        {/* Crown Spheres & Jewels */}
        <circle cx="54" cy="34" r="4.5" fill="#FFE58F" stroke="#FA8C16" strokeWidth="1.5" />
        <circle cx="80" cy="22" r="6" fill="#FFF1B8" stroke="#FA8C16" strokeWidth="1.5" />
        <circle cx="106" cy="34" r="4.5" fill="#FFE58F" stroke="#FA8C16" strokeWidth="1.5" />

        {/* Center Big Diamond Gem */}
        <path
          d="M80 44 L89 54 L80 64 L71 54 Z"
          fill="url(#gemCyanGrad)"
        />
        {/* Diamond facets */}
        <path d="M80 44 L80 64 M71 54 L89 54" stroke="#E6FFFB" strokeWidth="1.2" opacity="0.85" />

        {/* Sparkling Stars */}
        <path d="M125 18 L127 23 L132 25 L127 27 L125 32 L123 27 L118 25 L123 23 Z" fill="#FFD666" />
        <path d="M35 20 L36.5 24 L40 25 L36.5 26 L35 30 L33.5 26 L30 25 L33.5 24 Z" fill="#ADC6FF" />
      </svg>
    </div>
  );
}

// 2. Binoculars / Magnifier Mascot for Non-VIP Visitor Style (media_1789876467647.png)
export function ContentBinocularsMascot({ size = 110, className = "" }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size * 0.9,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: "drop-shadow(0 6px 16px rgba(245, 158, 11, 0.22))",
      }}
    >
      <svg width={size} height={size * 0.9} viewBox="0 0 140 125" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mascotYellowGrad" x1="30" y1="20" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="40%" stopColor="#FFCA28" />
            <stop offset="85%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#F57C00" />
          </linearGradient>
          <linearGradient id="lensGrad" x1="18" y1="20" x2="48" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFDE7" />
            <stop offset="50%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
        </defs>

        {/* Soft Warm Halo Behind */}
        <ellipse cx="78" cy="78" rx="46" ry="38" fill="#FFF8E1" />

        {/* Character Body - Curious looking upwards */}
        <path
          d="M52 65 C44 50, 48 38, 62 34 C72 31, 86 36, 94 48 C102 60, 108 78, 104 92 C100 104, 82 110, 68 108 C54 106, 44 95, 46 82 C48 76, 50 70, 52 65 Z"
          fill="url(#mascotYellowGrad)"
        />

        {/* Little Arm reaching out */}
        <path
          d="M50 72 C38 66, 32 60, 30 52 C35 50, 40 56, 48 64 Z"
          fill="#FF9800"
        />

        {/* Legs / Paws */}
        <ellipse cx="64" cy="108" rx="8" ry="5" fill="#E65100" />
        <ellipse cx="88" cy="106" rx="8" ry="5" fill="#E65100" />

        {/* Cute Face details on character */}
        {/* Eye */}
        <ellipse cx="76" cy="54" rx="5" ry="6.5" fill="#422006" />
        <circle cx="74.5" cy="52" r="2" fill="#FFFFFF" />
        {/* Blushing cheek */}
        <ellipse cx="86" cy="62" rx="5" ry="3" fill="#FF5252" opacity="0.6" />
        {/* Smile */}
        <path d="M72 65 Q78 70 82 66" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Floating Magnifying Glass / Eye Vision Bubble (👀) */}
        <g transform="translate(14, 18)">
          {/* Glass Outer Rim */}
          <circle cx="26" cy="26" r="22" fill="#FFF9C4" stroke="#FF9800" strokeWidth="3" />
          {/* Eye Icon inside lens */}
          <path
            d="M14 26 C14 26, 20 18, 26 18 C32 18, 38 26, 38 26 C38 26, 32 34, 26 34 C20 34, 14 26, 14 26 Z"
            fill="#FFA000"
          />
          <circle cx="26" cy="26" r="4.5" fill="#4E342E" />
          <circle cx="25" cy="24.5" r="1.5" fill="#FFFFFF" />
          {/* Shine reflection on lens */}
          <path
            d="M16 20 C18 16, 24 14, 28 14"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

// 3. Translation Bubble & Coins Mascot for Unsubscribed Style (media_1789876484893.png)
export function ContentTranslateCoinMascot({ size = 110, className = "" }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size * 0.85,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: "drop-shadow(0 6px 14px rgba(250, 173, 20, 0.25))",
      }}
    >
      <svg width={size} height={size * 0.85} viewBox="0 0 140 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bubbleGrad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="100%" stopColor="#FFE082" />
          </linearGradient>
          <linearGradient id="coinGrad" x1="75" y1="35" x2="125" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="40%" stopColor="#FFCA28" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>
        </defs>

        {/* Soft Warm Aura */}
        <circle cx="70" cy="60" r="45" fill="#FFFDE7" />

        {/* Back Gold Coin */}
        <circle cx="98" cy="62" r="22" fill="#FFA000" />
        <circle cx="98" cy="62" r="18" fill="url(#coinGrad)" stroke="#FFE082" strokeWidth="2" />
        <text x="98" y="67" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="16" fontFamily="sans-serif">¥</text>

        {/* Front Speech Bubble with "文 / A" translation */}
        <path
          d="M25 45 C25 30, 38 20, 58 20 C78 20, 92 30, 92 45 C92 56, 84 65, 72 68 L70 78 L58 69 C38 69, 25 58, 25 45 Z"
          fill="url(#bubbleGrad)"
          stroke="#FFB300"
          strokeWidth="2.5"
        />

        {/* Translation Glyph "文" in Orange/Red */}
        <text
          x="58"
          y="49"
          textAnchor="middle"
          fill="#E65100"
          fontWeight="900"
          fontSize="22"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          文
        </text>

        {/* Sparkling Stars */}
        <path d="M18 22 L20 27 L25 29 L20 31 L18 36 L16 31 L11 29 L16 27 Z" fill="#FFB300" />
        <path d="M118 28 L119.5 32 L123 33 L119.5 34 L118 38 L116.5 34 L113 33 L116.5 32 Z" fill="#FFA000" />
      </svg>
    </div>
  );
}

export default {
  ContentCrownMascot,
  ContentBinocularsMascot,
  ContentTranslateCoinMascot,
};
