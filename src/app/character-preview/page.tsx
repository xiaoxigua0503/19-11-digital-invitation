import { AnimeCharacter } from "@/components/AnimeCharacter";

export default function CharacterPreviewPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(145deg,#f9f7ed,#edf4fb)] p-6 text-[#203453]">
      <h1 className="mb-2 text-center font-serif text-3xl">Tokisaki Kurumi Character Review</h1>
      <p className="mb-8 text-center text-sm text-[#5d718e]">
        Date A Live · Astral Dress Elohim · 4-Pose Interactive Sequence
      </p>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <figure className="flex flex-col items-center rounded-3xl border border-white/80 bg-white/50 p-4 shadow-xl backdrop-blur-sm">
          <div className="h-[460px] w-full max-w-[280px]">
            <AnimeCharacter pose="idle" className="h-full w-full" />
          </div>
          <figcaption className="mt-3 text-center">
            <span className="block font-semibold text-sm">1. Idle</span>
            <span className="text-xs text-[#6e829e]">Hands behind back · breathing</span>
          </figcaption>
        </figure>

        <figure className="flex flex-col items-center rounded-3xl border border-white/80 bg-white/50 p-4 shadow-xl backdrop-blur-sm">
          <div className="h-[460px] w-full max-w-[280px]">
            <AnimeCharacter pose="shy" className="h-full w-full" />
          </div>
          <figcaption className="mt-3 text-center">
            <span className="block font-semibold text-sm">2. Shy</span>
            <span className="text-xs text-[#6e829e]">Blushing · tilted posture</span>
          </figcaption>
        </figure>

        <figure className="flex flex-col items-center rounded-3xl border border-white/80 bg-white/50 p-4 shadow-xl backdrop-blur-sm">
          <div className="h-[460px] w-full max-w-[280px]">
            <AnimeCharacter pose="approach" className="h-full w-full" />
          </div>
          <figcaption className="mt-3 text-center">
            <span className="block font-semibold text-sm">3. Approach</span>
            <span className="text-xs text-[#6e829e]">Closer framing · Zafkiel clock eye</span>
          </figcaption>
        </figure>

        <figure className="flex flex-col items-center rounded-3xl border border-white/80 bg-white/50 p-4 shadow-xl backdrop-blur-sm">
          <div className="h-[460px] w-full max-w-[280px]">
            <AnimeCharacter pose="offer" className="h-full w-full" />
          </div>
          <figcaption className="mt-3 text-center">
            <span className="block font-semibold text-sm">4. Offer Letter</span>
            <span className="text-xs text-[#6e829e]">Two hands · sealed letter</span>
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
