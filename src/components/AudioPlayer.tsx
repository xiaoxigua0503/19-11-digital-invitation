"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function AudioPlayer({
  enabled,
  src,
}: {
  enabled: boolean;
  src: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(true);

  // A single audio element is created for the active stage and released when
  // the source changes, so intro and invitation music cannot overlap.
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setReady(false);
    setAvailable(true);
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.75;
    audioRef.current = audio;
    audio.addEventListener("error", () => {
      if (!cancelled) setAvailable(false);
    });
    audio.play().then(() => {
      if (!cancelled) {
        setPaused(false);
        setReady(true);
      }
    }).catch(() => {
      if (!cancelled) {
        setPaused(true);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.removeAttribute("src");
        audio.load();
      }
      audioRef.current = null;
    };
  }, [enabled, src]);

  // Play/pause control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    if (paused) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [paused, ready]);

  // Pause on tab/window blur, resume on focus
  useEffect(() => {
    if (!enabled) return;

    const handleBlur = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
        // Don't change `paused` state — we track this separately
        // so resuming on focus only auto-resumes if user hadn't manually paused
      }
    };

    const handleFocus = () => {
      // Only auto-resume if the user hadn't manually paused
      if (!paused) {
        audioRef.current?.play().catch(() => {});
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    const handleVisibilityChange = () => {
      if (document.hidden) handleBlur();
      else handleFocus();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, paused]);

  if (!enabled || !available) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {/* Scroll to top button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          "border border-white/45 bg-white/55 shadow-[0_8px_30px_rgba(58,31,27,0.12)] backdrop-blur-md",
          "text-ink-muted transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/70 hover:text-ink"
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>

      {/* Music player */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play music" : "Pause music"}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-wide",
          "border border-white/45 bg-white/55 shadow-[0_8px_30px_rgba(58,31,27,0.12)] backdrop-blur-md",
          "text-ink-muted transition-all duration-200 hover:bg-white/70 hover:text-ink",
          !ready && "opacity-50 pointer-events-none"
        )}
      >
        {/* Play/Pause icon */}
        {paused ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
          </svg>
        )}
        <span>{paused ? "Music: Off" : "Music: On"}</span>
      </button>
    </div>
  );
}
