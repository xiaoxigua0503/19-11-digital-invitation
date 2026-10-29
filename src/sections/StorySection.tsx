import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { event } from "@/lib/wedding";

const points = [
  { title: "Một chút tự hào", text: "Vì mỗi chàng trai đều có câu chuyện riêng — những nỗ lực thầm lặng, những lần mạnh mẽ bước qua khó khăn và cả những điều chưa từng có dịp sẻ chia." },
  { title: "Một chút niềm tin", text: "Mong rằng trên mỗi hành trình phía trước, bạn luôn tin vào chính mình, đủ dũng khí theo đuổi những điều mình mong muốn và đủ kiên nhẫn để trở thành phiên bản tốt hơn của bản thân." },
  { title: "Một chút thương nhau", text: "Ở nơi đất khách, chúng ta tìm thấy nhau giữa những ngày xa nhà — cùng cười, cùng sẻ chia, cùng trở thành chỗ dựa cho nhau và lưu giữ những ký ức thật đẹp của tuổi trẻ." },
];

export function StorySection() {
  return <Section id="story" title="Có những ngày để nhớ, có những ngày để thương" eyebrow="Một ngày đáng yêu dành cho các chàng trai của chúng ta">
    <Reveal><div className="rounded-[34px] border border-white/60 bg-white/60 p-7 shadow-xl sm:p-10">
      <p className="text-base leading-8 text-ink-muted whitespace-pre-line">
        {event.description}
      </p>
      <p className="mt-4 text-sm text-ink-muted"></p>
    </div></Reveal>
    <div className="mt-6 grid gap-5 sm:grid-cols-3">{points.map((point, index) => <Reveal key={point.title} delayMs={index * 80}><article className="rounded-[32px] border border-white/60 bg-white/55 p-7 shadow-lg sm:p-9"><span className="font-serif text-3xl text-burgundy">0{index + 1}</span><h3 className="mt-4 font-serif text-2xl text-ink">{point.title}</h3><p className="mt-3 text-sm leading-7 text-ink-muted">{point.text}</p></article></Reveal>)}</div>
  </Section>;
}
