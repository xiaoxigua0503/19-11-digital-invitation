"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type AnimePose = "idle" | "shy" | "approach" | "offer";

export function AnimeCharacter({
  pose = "idle",
  className,
}: {
  pose?: AnimePose;
  className?: string;
}) {
  const compId = useId().replace(/:/g, "");

  return (
    <div
      role="img"
      aria-label="Tokisaki Kurumi in gothic lolita dress ready to present an invitation letter"
      className={cn("kurumi-wrapper relative select-none", className)}
      data-pose={pose}
    >
      <svg
        viewBox="0 0 460 730"
        className="h-full w-full overflow-visible pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Tokisaki Kurumi</title>
        <desc>
          Tokisaki Kurumi in Astral Dress Elohim with twin tails, heterochromatic crimson and golden clock eyes, red gothic ribbons, and a sealed letter.
        </desc>
        <defs>
          {/* Shadow beneath Kurumi's boots */}
          <radialGradient id={`k-shadow-${compId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1528" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#251a30" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#251a30" stopOpacity="0" />
          </radialGradient>

          {/* Golden Clock Eye (Zafkiel) glow */}
          <radialGradient id={`k-gold-glow-${compId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8be" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ffd24d" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#e5941a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e5941a" stopOpacity="0" />
          </radialGradient>

          {/* Crimson Eye glow */}
          <radialGradient id={`k-crimson-glow-${compId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb3be" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#e62045" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8a0c24" stopOpacity="0" />
          </radialGradient>

          {/* Wax seal glow */}
          <radialGradient id={`k-seal-glow-${compId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff7b8c" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#d82244" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d82244" stopOpacity="0" />
          </radialGradient>

          {/* Blush gradient */}
          <radialGradient id={`k-blush-${compId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6b85" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#ff859b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ff859b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow beneath Kurumi's boots (full-body poses only) */}
        <ellipse
          cx="230"
          cy="712"
          rx="125"
          ry="15"
          fill={`url(#k-shadow-${compId})`}
          className={cn(
            "kurumi-ground-shadow transition-opacity duration-700",
            pose === "idle" || pose === "shy" ? "opacity-100" : "opacity-0"
          )}
        />
      </svg>

      {/* Layer 1: Pose 1 — Idle (Full body, arms tucked behind back, gentle smile) */}
      <div className="kurumi-layer kurumi-pose-idle absolute inset-0">
        <picture>
          <source srcSet="/character/kurumi_1_idle.webp" type="image/webp" />
          <img
            src="/character/kurumi_1_idle.png"
            alt="Tokisaki Kurumi standing poised with hands behind her back"
            className="kurumi-figure h-full w-full object-contain drop-shadow-[0_12px_24px_rgba(28,20,44,0.18)]"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* Layer 2: Pose 2 — Shy (Full body, head tilted, blushing smile) */}
      <div className="kurumi-layer kurumi-pose-shy absolute inset-0">
        <picture>
          <source srcSet="/character/kurumi_2_shy.webp" type="image/webp" />
          <img
            src="/character/kurumi_2_shy.png"
            alt="Tokisaki Kurumi blushing shyly"
            className="kurumi-figure h-full w-full object-contain drop-shadow-[0_14px_28px_rgba(28,20,44,0.2)]"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* Layer 3: Pose 3 — Approach (Closer view, camera dolly-in, leaning toward viewer) */}
      <div className="kurumi-layer kurumi-pose-approach absolute inset-0">
        <picture>
          <source srcSet="/character/kurumi_3_approach.webp" type="image/webp" />
          <img
            src="/character/kurumi_3_approach.png"
            alt="Tokisaki Kurumi approaching with a gentle smile"
            className="kurumi-figure h-full w-full object-contain drop-shadow-[0_16px_32px_rgba(28,20,44,0.22)]"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* Layer 4: Pose 4 — Offer (Closer view, presenting the sealed envelope with both hands) */}
      <div className="kurumi-layer kurumi-pose-offer absolute inset-0">
        <picture>
          <source srcSet="/character/kurumi_4_offer.webp" type="image/webp" />
          <img
            src="/character/kurumi_4_offer.png"
            alt="Tokisaki Kurumi offering the invitation letter with both hands"
            className="kurumi-figure h-full w-full object-contain drop-shadow-[0_18px_36px_rgba(28,20,44,0.25)]"
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* Ethereal magical sheen on the red wax stamp seal in offer pose */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[43.5%] top-[57.8%] -translate-x-1/2 -translate-y-1/2"
        >
          <span className="absolute -inset-4 rounded-full bg-[#e6264c]/28 blur-sm animate-[sealPulse_2.6s_ease-in-out_infinite]" />
          <span className="absolute inset-0 grid place-items-center text-white/95 text-[11px] font-bold animate-[sealSparkle_3.2s_ease-in-out_infinite]">
            ✦
          </span>
        </div>
      </div>

      {/* SVG Accents Overlay: Zafkiel clock eye glimmer and blush warmth */}
      <svg
        viewBox="0 0 460 730"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        {/* Animated Left Eye: Zafkiel Golden Clock Eye Accent */}
        <g
          className={cn(
            "kurumi-clock-eye transition-all duration-700 ease-out",
            pose === "approach" || pose === "offer" ? "opacity-90" : "opacity-0"
          )}
          transform={pose === "offer" ? "translate(263, 198)" : "translate(266, 192)"}
        >
          <circle r="12" fill={`url(#k-gold-glow-${compId})`} opacity="0.65" />
          <circle
            r="8.5"
            fill="none"
            stroke="#ffdf6d"
            strokeWidth="0.9"
            strokeDasharray="1.2 1.8"
            className="animate-[clockTick_16s_linear_infinite]"
          />
          <path
            d="M0 -7.5v1.2M0 7.5v-1.2M-7.5 0h1.2M7.5 0h-1.2"
            stroke="#ffec99"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M0 0l-2.8 -4.2"
            stroke="#fff2b3"
            strokeWidth="0.9"
            strokeLinecap="round"
            className="origin-center animate-[clockTick_6s_linear_infinite]"
          />
          <path
            d="M0 0l3.8 -1.2"
            stroke="#ffdf6d"
            strokeWidth="0.75"
            strokeLinecap="round"
            className="origin-center animate-[clockTick_18s_linear_infinite]"
          />
          <circle r="1" fill="#fffbe0" />
        </g>

        {/* Animated Right Eye: Crimson Glimmer Accent */}
        <g
          className={cn(
            "kurumi-crimson-eye transition-all duration-700 ease-out",
            pose === "approach" || pose === "offer" ? "opacity-85" : "opacity-0"
          )}
          transform={pose === "offer" ? "translate(186, 195)" : "translate(188, 192)"}
        >
          <circle r="11" fill={`url(#k-crimson-glow-${compId})`} opacity="0.5" />
          <circle cx="-2.5" cy="-2.5" r="1.4" fill="#ffffff" opacity="0.9" />
          <circle cx="2" cy="2" r="0.9" fill="#ffd5dd" opacity="0.75" />
        </g>

        {/* Soft anime blush glow for shy and approach poses */}
        <g
          className={cn(
            "kurumi-blush-layer transition-opacity duration-600",
            pose === "shy" || pose === "approach" ? "opacity-90" : "opacity-0"
          )}
        >
          {pose === "shy" ? (
            <>
              <ellipse cx="202" cy="206" rx="14" ry="7" fill={`url(#k-blush-${compId})`} />
              <ellipse cx="258" cy="204" rx="14" ry="7" fill={`url(#k-blush-${compId})`} />
            </>
          ) : (
            <>
              <ellipse cx="196" cy="224" rx="18" ry="9" fill={`url(#k-blush-${compId})`} />
              <ellipse cx="264" cy="222" rx="18" ry="9" fill={`url(#k-blush-${compId})`} />
            </>
          )}
        </g>
      </svg>

      <style jsx>{`
        .kurumi-wrapper {
          aspect-ratio: 46 / 73;
        }

        /* Continuous Transitions between all 4 Poses */
        .kurumi-layer {
          opacity: 0;
          transition: transform 850ms cubic-bezier(0.2, 0.82, 0.2, 1),
            opacity 650ms cubic-bezier(0.2, 0.82, 0.2, 1);
        }

        /* 1. Idle Pose: Full body, subtle breathing & ambient float */
        .kurumi-pose-idle {
          transform-origin: 50% 85%;
        }
        .kurumi-wrapper[data-pose="idle"] .kurumi-pose-idle {
          opacity: 1;
          transform: translateY(0) scale(1);
          animation: kurumiBreathe 4.6s ease-in-out infinite;
        }
        .kurumi-wrapper:not([data-pose="idle"]) .kurumi-pose-idle {
          opacity: 0;
          transform: translateY(4px) scale(0.98);
          pointer-events: none;
        }

        /* 2. Shy Pose: Coordinated head tilt, cute blush, slight body shift */
        .kurumi-pose-shy {
          transform-origin: 50% 30%;
        }
        .kurumi-wrapper[data-pose="shy"] .kurumi-pose-shy {
          opacity: 1;
          transform: translateY(0) rotate(-1.2deg) scale(1.02);
          animation: kurumiShySway 4.2s ease-in-out infinite;
        }
        .kurumi-wrapper[data-pose="idle"] .kurumi-pose-shy {
          opacity: 0;
          transform: translateY(5px) rotate(0deg) scale(0.96);
          pointer-events: none;
        }
        /* As we transition into approach, shy zooms in toward the camera to seamlessly bridge into the closer view */
        .kurumi-wrapper[data-pose="approach"] .kurumi-pose-shy,
        .kurumi-wrapper[data-pose="offer"] .kurumi-pose-shy {
          opacity: 0;
          transform: translateY(2%) scale(1.5);
          pointer-events: none;
        }

        /* 3. Approach Pose: Camera dolly-in, upper body framing, leaning in */
        .kurumi-pose-approach {
          transform-origin: 50% 25%;
        }
        .kurumi-wrapper[data-pose="idle"] .kurumi-pose-approach,
        .kurumi-wrapper[data-pose="shy"] .kurumi-pose-approach {
          opacity: 0;
          transform: scale(0.85) translateY(6px);
          pointer-events: none;
        }
        .kurumi-wrapper[data-pose="approach"] .kurumi-pose-approach {
          opacity: 1;
          transform: scale(1) translateY(0);
          animation: kurumiApproachFloat 4.8s ease-in-out infinite;
        }
        .kurumi-wrapper[data-pose="offer"] .kurumi-pose-approach {
          opacity: 0;
          transform: scale(1.02) translateY(-2px);
          pointer-events: none;
        }

        /* 4. Offer Pose: Two hands extend forward presenting the sealed letter */
        .kurumi-pose-offer {
          transform-origin: 50% 30%;
        }
        .kurumi-wrapper[data-pose="idle"] .kurumi-pose-offer,
        .kurumi-wrapper[data-pose="shy"] .kurumi-pose-offer {
          opacity: 0;
          transform: scale(0.88) translateY(10px);
          pointer-events: none;
        }
        .kurumi-wrapper[data-pose="approach"] .kurumi-pose-offer {
          opacity: 0;
          transform: scale(0.97) translateY(6px);
          pointer-events: none;
        }
        .kurumi-wrapper[data-pose="offer"] .kurumi-pose-offer {
          opacity: 1;
          transform: scale(1) translateY(0);
          animation: kurumiOfferHover 4.4s ease-in-out infinite;
        }

        @keyframes kurumiBreathe {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.008);
          }
        }

        @keyframes kurumiShySway {
          0%, 100% {
            transform: translateY(0) rotate(-1.2deg) scale(1.02);
          }
          50% {
            transform: translateY(-4px) rotate(-1.8deg) scale(1.026);
          }
        }

        @keyframes kurumiApproachFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-4.5px) scale(1.01);
          }
        }

        @keyframes kurumiOfferHover {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.008);
          }
        }

        @keyframes clockTick {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sealPulse {
          0%, 100% {
            transform: scale(0.92);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.85;
          }
        }

        @keyframes sealSparkle {
          0%, 100% {
            opacity: 0.25;
            transform: rotate(0deg) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: rotate(90deg) scale(1.2);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .kurumi-wrapper *,
          .kurumi-pose-idle,
          .kurumi-pose-shy,
          .kurumi-pose-approach,
          .kurumi-pose-offer {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
