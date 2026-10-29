import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { event, eventTimeline } from "@/lib/wedding";

export function TimelineSection() {
  return (
    <Section id="timeline" title="Thời gian" eyebrow="Hẹn nhau rồi là phải đến đấy nha!" className="bg-[linear-gradient(rgba(250,246,241,.78),rgba(250,246,241,.84)),url('/background/9.jpg')] bg-cover bg-center bg-no-repeat">
      <Reveal>
        <div className="mb-5 rounded-3xl border border-white/60 bg-white/75 p-6 text-center shadow-sm backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.28em] text-burgundy/70">Thời gian sự kiện</p>
          <p className="mt-2 font-serif text-2xl text-ink">{event.date.time}</p>
        </div>
        {eventTimeline.length === 0 ? <div className="rounded-3xl border border-white/60 bg-white/75 p-8 text-center text-ink-muted backdrop-blur-md">The event schedule will be announced once details are confirmed.</div> : <div className="relative overflow-hidden rounded-[34px] border border-white/45 bg-white/55 p-5 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
          <div className="absolute inset-y-0 left-[25px] w-px bg-gradient-to-b from-burgundy/50 via-burgundy/25 to-transparent sm:left-[39px]" />
          <div className="space-y-5">
            {eventTimeline.map((item, idx) => (
              <div key={item.time} className="relative grid grid-cols-[36px_1fr] gap-5 sm:grid-cols-[54px_1fr]">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-cream text-[10px] font-semibold text-burgundy shadow-md sm:h-12 sm:w-12 sm:text-xs">
                  {item.time}
                </div>
                <div
                  className="rounded-[24px] border border-white/55 bg-cream/70 p-5 shadow-sm sm:p-6"
                  style={{ transform: `translateX(${idx % 2 === 0 ? "0px" : "0px"})` }}
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-burgundy/60">{item.time}</p>
                  <h3 className="mt-2 font-serif text-xl text-ink">{item.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-7 text-ink-muted">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>}
      </Reveal>
    </Section>
  );
}
