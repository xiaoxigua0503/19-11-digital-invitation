"use client";

import { useEffect, useRef, useState } from "react";
import { AnimeCharacter } from "@/components/AnimeCharacter";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { event } from "@/lib/wedding";

type Phase = "meet" | "shy" | "approach" | "offer" | "seal" | "open" | "lift" | "reveal" | "complete";

const paperTexture = {
  backgroundImage:
    "radial-gradient(circle at 18% 12%, rgba(255,255,255,.9), transparent 30%), linear-gradient(135deg,#fffdf7,#f2e9fa)",
};

export function IntroEnvelope({
  onComplete,
  onUserGesture,
}: {
  onComplete: () => void;
  onUserGesture: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("meet");
  const phaseRef = useRef<Phase>("meet");
  const timers = useRef<number[]>([]);

  function changePhase(next: Phase) {
    phaseRef.current = next;
    setPhase(next);
  }

  useEffect(
    () => () => timers.current.forEach((timer) => window.clearTimeout(timer)),
    []
  );

  function clearTimers() {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }

  function schedule(delay: number, callback: () => void) {
    timers.current.push(window.setTimeout(callback, delay));
  }

  function deliverLetter() {
    if (phaseRef.current !== "meet") return;
    onUserGesture();
    if (reduced) {
      changePhase("offer");
      return;
    }
    changePhase("shy");
    schedule(650, () => changePhase("approach"));
    schedule(1600, () => changePhase("offer"));
  }

  function openLetter() {
    if (phaseRef.current !== "offer") return;
    if (reduced) {
      changePhase("complete");
      onComplete();
      return;
    }
    changePhase("seal");
    schedule(320, () => changePhase("open"));
    schedule(1180, () => changePhase("lift"));
    schedule(2260, () => changePhase("reveal"));
    schedule(3150, () => {
      changePhase("complete");
      onComplete();
    });
  }

  function skipOpening() {
    if (!["seal", "open", "lift", "reveal"].includes(phaseRef.current)) return;
    clearTimers();
    changePhase("complete");
    onComplete();
  }

  const hasDelivered = ["offer", "seal", "open", "lift", "reveal", "complete"].includes(phase);
  const showEnvelope = ["seal", "open", "lift", "reveal", "complete"].includes(phase);
  // Kurumi shifts to the side only when the big envelope appears
  const hasShiftedForEnvelope = showEnvelope;
  const envelopeOpen = phase === "open" || phase === "lift" || phase === "reveal";
  const isLifted = phase === "lift" || phase === "reveal";
  const isRevealing = phase === "reveal";
  const canSkipOpening = ["seal", "open", "lift", "reveal"].includes(phase);
  const pose = phase === "shy" ? "shy" : phase === "approach" ? "approach" : hasDelivered ? "offer" : "idle";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[radial-gradient(ellipse_at_15%_15%,rgba(202,220,244,.82),transparent_48%),radial-gradient(ellipse_at_88%_85%,rgba(231,213,244,.7),transparent_45%),linear-gradient(145deg,#f9f7ed,#edf4fb)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_50%_8%,rgba(255,255,255,.9),transparent_38%),radial-gradient(circle_at_8%_85%,rgba(253,224,231,.48),transparent_26%)]" />
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-4 py-5 sm:px-8">
        <header className={cn("z-10 text-center transition-all duration-700", hasShiftedForEnvelope ? "mb-0 scale-90 opacity-75 sm:mb-1" : "pointer-events-none absolute top-4 opacity-0")}>
          <p className="font-serif text-2xl text-[#243c60] sm:text-4xl">
            {hasShiftedForEnvelope ? event.eventName : "Someone has a letter for you"}
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.3em] text-[#7184a1] sm:mt-2 sm:text-xs">
            {hasShiftedForEnvelope ? `${event.date.display} · Chongqing University` : "Chongqing University"}
          </p>
        </header>

        <div className="relative h-[min(78svh,700px)] min-h-[410px] w-full">
          <div
            className={cn(
              "absolute z-30 transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
              hasShiftedForEnvelope
                ? "bottom-[2%] left-[-7%] h-[75%] aspect-[46/73] sm:left-[4%] sm:h-[92%]"
                : phase === "approach" || phase === "offer"
                ? "left-1/2 top-1/2 h-[96%] aspect-[46/73] -translate-x-1/2 -translate-y-1/2 scale-[1.04] sm:scale-[1.08]"
                : "left-1/2 top-1/2 h-[92%] aspect-[46/73] -translate-x-1/2 -translate-y-1/2"
            )}
          >
            <button
              type="button"
              onClick={deliverLetter}
              disabled={hasDelivered}
              aria-label={hasDelivered ? "Kurumi has presented your invitation" : "Tap Kurumi to receive your invitation"}
              className="group flex h-full w-full cursor-pointer items-center justify-center rounded-[2rem] outline-none focus-visible:ring-4 focus-visible:ring-[#9eadd1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f5f3] disabled:cursor-default disabled:focus-visible:ring-0"
            >
              <span className="pointer-events-none absolute inset-x-[18%] bottom-[6%] h-8 rounded-full bg-[#61769c]/15 blur-2xl" />
              <AnimeCharacter
                pose={pose}
                className={cn(
                  "h-full w-full transition-transform duration-700 group-hover:scale-[1.03] group-active:scale-[.99]",
                  hasDelivered ? "" : "animate-[characterFloat_4.8s_ease-in-out_infinite]"
                )}
              />
            </button>

            {/* In offer phase, clickable letter button directly over the envelope held in both hands */}
            {phase === "offer" && (
              <button
                type="button"
                onClick={openLetter}
                aria-label="Open the letter Kurumi is offering with both hands"
                aria-describedby="open-letter-hint"
                className="group/letter absolute left-[26%] top-[50%] z-40 h-[22%] w-[44%] cursor-pointer rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-[#9eadd1] focus-visible:ring-offset-2"
              >
                <span className="sr-only">Open invitation letter</span>
                <span className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-dashed border-[#e6264c]/40 opacity-0 transition-opacity group-hover/letter:opacity-100 group-focus-visible/letter:opacity-100" />
                <span className="pointer-events-none absolute -bottom-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/90 bg-white/90 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-[#30486e] shadow-[0_8px_20px_rgba(59,76,112,0.18)] backdrop-blur-md transition-transform group-hover/letter:scale-105 sm:text-xs">
                  あらあら、士道さん。そんなに慌てて、どうなさったのですか？  <span aria-hidden="true" className="ml-1 inline-block text-[#e6264c] animate-[heartbeat_1s_ease-in-out_infinite]">♥</span>
                </span>
              </button>
            )}

            {phase === "meet" && (
              <span className="pointer-events-none absolute bottom-[-1%] left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/80 bg-white/75 px-5 py-3 text-center text-xs font-semibold tracking-wide text-[#30486e] shadow-[0_10px_35px_rgba(59,76,112,.12)] backdrop-blur-md sm:px-7 sm:text-sm">
                Tap Kurumi to receive your letter <span aria-hidden="true">✦</span>
              </span>
            )}
          </div>

          {showEnvelope && (
            <div className={cn("absolute inset-0 animate-[envelopeArrive_.7s_cubic-bezier(.2,.8,.2,1)_both] transition-all duration-700", isRevealing ? "scale-[1.06] opacity-0 blur-sm" : "scale-100 opacity-100 blur-0")}>
              <div
                aria-hidden="true"
                className={cn(
                  "group absolute right-0 top-1/2 z-20 w-[67%] -translate-y-1/2 rounded-[1.8rem] transition-transform duration-500 sm:right-[2%] sm:w-[59%]",
                  envelopeOpen ? "pointer-events-none" : ""
                )}
              >
                <div className="relative aspect-[1.42] overflow-visible rounded-[1.8rem]">
                  <div className="absolute inset-x-[8%] bottom-[-6%] h-5 rounded-full bg-[#283b5e]/20 blur-xl" />
                  <div className="absolute inset-0 rounded-[1.8rem] border border-white/90 bg-[#c9daeb] shadow-[0_24px_60px_rgba(47,63,97,.2)]" />

                  <div
                    className={cn(
                      "absolute left-1/2 top-[5%] z-10 flex h-[72%] w-[72%] -translate-x-1/2 flex-col items-center justify-center rounded-xl border border-[#e5d9ed] px-3 text-center shadow-[0_12px_28px_rgba(50,47,78,.12)] transition-[transform,top] duration-[1000ms] ease-[cubic-bezier(.2,.85,.2,1)] sm:rounded-2xl sm:px-6",
                      isLifted ? "top-[-17%] -translate-x-1/2 -translate-y-[35%] rotate-[-2deg]" : "translate-y-[10%]"
                    )}
                    style={paperTexture}
                    aria-hidden="true"
                  >
                    <p className="text-[8px] font-semibold uppercase tracking-[.24em] text-[#7787a5] sm:text-[10px]">A note for you</p>
                    <p className="mt-2 font-serif text-[clamp(15px,3vw,26px)] leading-tight text-[#263c61]">{event.eventName}</p>
                    <span className="my-2 text-[#d34b60] sm:my-3">✦</span>
                    <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-[#7787a5] sm:text-[10px]">{event.date.display}</p>
                  </div>

                  <div className="absolute inset-0 z-20 overflow-hidden rounded-[1.8rem]">
                    <div className="absolute inset-x-0 bottom-0 h-[76%] bg-[#a9c4df] [clip-path:polygon(0_100%,50%_9%,100%_100%)]" />
                    <div className="absolute inset-y-0 left-0 w-[57%] bg-[linear-gradient(140deg,#dbe8f4,#b7cee6)] [clip-path:polygon(0_0,100%_52%,0_100%)]" />
                    <div className="absolute inset-y-0 right-0 w-[57%] bg-[linear-gradient(220deg,#d2e1f0,#b3c9e2)] [clip-path:polygon(100%_0,0_52%,100%_100%)]" />
                    <div
                      className="absolute inset-x-0 top-0 h-[64%] origin-top bg-[linear-gradient(160deg,#e3edf7,#bed3e8)] [clip-path:polygon(0_0,100%_0,50%_100%)] transition-transform duration-[850ms] ease-[cubic-bezier(.25,.9,.18,1)]"
                      style={{ transformStyle: "preserve-3d", transform: envelopeOpen ? "rotateX(180deg)" : "rotateX(0deg)" }}
                    />
                    <div className={cn("absolute left-1/2 top-[48%] z-30 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-[#d24a5c] text-lg text-white shadow-[0_8px_18px_rgba(91,44,67,.22)] transition-all sm:h-16 sm:w-16 sm:text-2xl", envelopeOpen ? "scale-75 opacity-0" : "group-hover:rotate-6 group-hover:scale-105")}>
                      ♥
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 z-40 rounded-[1.8rem] ring-1 ring-inset ring-white/30" />
                  <div className={cn("pointer-events-none absolute inset-0 z-50 grid place-items-center transition-all duration-500", envelopeOpen ? "opacity-0" : "opacity-100")}>
                    <span className="absolute bottom-[-3.2rem] whitespace-nowrap rounded-full border border-white/80 bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.18em] text-[#435a7e] shadow-sm sm:bottom-[-3.5rem] sm:px-5 sm:text-xs">
                      {phase === "offer" ? "Tap to open your invitation" : phase === "seal" ? "A little surprise…" : phase === "open" || phase === "lift" ? "Opening your letter…" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <p id="open-letter-hint" aria-live="polite" className="sr-only">
          {phase === "meet" ? "Activate Kurumi to receive your invitation." : phase === "offer" ? "Kurumi has presented your letter. Activate the letter to open the invitation." : "The invitation is opening."}
        </p>
        {canSkipOpening && (
          <button
            type="button"
            onClick={skipOpening}
            className="absolute bottom-3 z-50 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.18em] text-[#657b96] backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#657b96] sm:bottom-6 sm:text-xs"
          >
            Skip opening animation
          </button>
        )}
      </div>
      <style jsx global>{`
        @keyframes characterFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        @keyframes envelopeArrive { from { opacity: 0; transform: translateX(4%) scale(.96) } to { opacity: 1; transform: translateX(0) scale(1) } }
        @media (prefers-reduced-motion: reduce) { .anime-character { animation: none !important; } }
      `}</style>
    </div>
  );
}
