/** Single source of truth for event details. Unknown logistics stay explicitly unset. */
export const event = {
  eventName: "International Men's Day",
  shortName: "Men's Day",
  date: {
    iso: "2026-11-19T00:00:00",
    display: "19 tháng 11, 2026",
    calendarDate: "20261119",
    time: "11:00 AM – 3:00 AM" as string | null,
  },
  venue: {
    name: "Chongqing University, Campus A (重庆大学 A 校区)",
    lines: ["Campus A"],
    mapQuery: "重庆大学 A 校区",
  },
  organizer: "Made with love by Vietnamese Student Association in Chongqing University",
  description:
    "Tháng Mười Một về, mang theo một ngày thật đặc biệt — ngày để những chàng trai được ghi nhận vì những nỗ lực không lời, được trân trọng vì sự kiên trì trên hành trình trưởng thành, và được nhắc rằng: phía sau vẻ ngoài mạnh mẽ, họ cũng xứng đáng được yêu thương, sẻ chia và thấu hiểu.\n\nGiữa một thành phố xa quê, chúng ta gặp nhau không chỉ để đón Ngày Quốc tế Nam giới 19/11, mà còn để cùng viết nên một khoảng trời nhỏ của người Việt — nơi có tình anh em, có những câu chuyện chưa từng kể, có tiếng cười của những ngày thanh xuân và có những ước mơ vẫn đang lớn lên từng ngày. Bởi hành trình trở thành phiên bản tốt hơn của chính mình sẽ ý nghĩa hơn khi ta biết rằng, trên con đường ấy, mình chưa bao giờ đơn độc.",
} as const;

export const eventTimeline: readonly { time: string; title: string; note: string }[] = [];

export const faq = [
  { q: "Mình nên đến trước bao lâu?", a: "Bạn hãy cố gắng đến đúng giờ để có thể ổn định chỗ ngồi và cùng chúng mình bắt đầu buổi gặp gỡ thật trọn vẹn nhé! 🌷" },
  { q: "Tôi có cần đăng kí trước không?", a: "Có. Vui lòng hoàn thành form đăng kí bên dưới để ban tổ chức có thể chuẩn bị chu đáo về chỗ ngồi và các hoạt động trong chương trình." },
  { q: "Tôi có thể tham gia cùng bạn bè không?", a: "Tất nhiên! Hãy rủ thêm những người bạn cùng tham gia để lưu giữ khoảnh khắc đáng nhớ này nhé~" },
  { q: "Tôi nên chuẩn bị gì cho sự kiện?", a: "Chỉ cần mang theo một tâm trạng thật vui và một chút háo hức. Đừng quên diện một bộ trang phục bạn cảm thấy tự tin và thoải mái nhất!" },
] as const;
