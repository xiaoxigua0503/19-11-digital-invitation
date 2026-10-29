"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IntroEnvelope } from "@/components/IntroEnvelope";
import { AudioPlayer } from "@/components/AudioPlayer";
import { StickyNav } from "@/components/StickyNav";
import { cn } from "@/lib/utils";
import { HeroSection } from "@/sections/HeroSection";
import { CountdownSection } from "@/sections/CountdownSection";
import { StorySection } from "@/sections/StorySection";
import { TimelineSection } from "@/sections/TimelineSection";
import { VenueSection } from "@/sections/VenueSection";
import { FaqSection } from "@/sections/FaqSection";
import { RsvpSection } from "@/sections/RsvpSection";
import { FooterSection } from "@/sections/FooterSection";

export function ClientApp() {
  const [entered, setEntered] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const invitationRef = useRef<HTMLDivElement>(null);

  const nav = useMemo(
    () => [
      { id: "countdown", label: "Countdown" },
      { id: "story", label: "Our Story" },
      { id: "timeline", label: "Agenda" },
      { id: "venues", label: "Venues" },
      { id: "faq", label: "F&Q" },
      { id: "rsvp", label: "Register" },
    ],
    []
  );

  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.overflow;
    if (!entered) el.style.overflow = "hidden";
    invitationRef.current?.toggleAttribute("inert", !entered);
    return () => {
      el.style.overflow = prev;
    };
  }, [entered]);

  return (
    <>
      <StickyNav visible={entered} items={nav} />
      <AudioPlayer enabled={musicEnabled || entered} src={entered ? "/audio/main-background-music.mp3" : "/audio/kurumi.mp3"} />

      {!entered ? (
        <IntroEnvelope
          onUserGesture={() => setMusicEnabled(true)}
          onComplete={() => setEntered(true)}
        />
      ) : null}

      <div
        ref={invitationRef}
        aria-hidden={!entered}
        className={cn(
          "transition-[opacity,transform,filter] duration-[1100ms] ease-[cubic-bezier(.18,.9,.18,1)]",
          entered ? "opacity-100 scale-100 blur-0" : "pointer-events-none opacity-0 scale-[1.02] blur-sm"
        )}
      >
        <main className="flex-1">
          <HeroSection
            onRsvp={() =>
              document.getElementById("rsvp")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          />
          <CountdownSection />
          <StorySection />
          <TimelineSection />
          <VenueSection />
          <FaqSection />
          <RsvpSection />
          <FooterSection />
        </main>
      </div>
    </>
  );
}
