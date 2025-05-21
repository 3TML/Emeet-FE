"use client";
import UserHeader from "@/components/UserHeader";
const steps = [
  {
    title: "Tìm kiếm chuyên gia",
    description:
      "Khám phá và lựa chọn chuyên gia phù hợp với nhu cầu của bạn trong nhiều lĩnh vực khác nhau.",
    icon: (
      <svg
        className="w-10 h-10 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
    ),
  },
  {
    title: "Đặt lịch meeting",
    description:
      "Chọn thời gian, hình thức (online/offline) và gửi yêu cầu đặt lịch với chuyên gia.",
    icon: (
      <svg
        className="w-10 h-10 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Thanh toán & xác nhận",
    description:
      "Hoàn tất thanh toán an toàn, nhận xác nhận lịch hẹn qua email hoặc thông báo.",
    icon: (
      <svg
        className="w-10 h-10 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z"
        />
      </svg>
    ),
  },
  {
    title: "Tham gia meeting 1:1",
    description:
      "Tham gia buổi gặp gỡ trực tuyến với chuyên gia, trao đổi và nhận tư vấn cá nhân hóa.",
    icon: (
      <svg
        className="w-10 h-10 text-purple-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
        />
      </svg>
    ),
  },
  {
    title: "Đánh giá & nhận tài liệu",
    description:
      "Đánh giá chất lượng buổi meeting và nhận tài liệu, ghi chú từ chuyên gia (nếu có).",
    icon: (
      <svg
        className="w-10 h-10 text-pink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

const WorkPage = () => {
  return (
    <>
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Cách hoạt động
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Quy trình kết nối và gặp gỡ chuyên gia 1:1 của chúng tôi đơn giản,
            nhanh chóng và bảo mật tuyệt đối. Chỉ với vài bước, bạn đã có thể
            nhận tư vấn cá nhân hóa từ chuyên gia hàng đầu.
          </p>
        </section>
        <section className="max-w-5xl mx-auto flex flex-col gap-8">
          <ol className="relative border-l-4 border-blue-100 ml-4">
            {steps.map((step, idx) => (
              <li
                key={step.title}
                className="mb-12 ml-6 flex flex-col md:flex-row items-start md:items-center group outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-shadow"
                tabIndex={0}
                aria-label={step.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    const focusableElement = e.currentTarget.querySelector(
                      "a,button,input,select,textarea"
                    ) as HTMLElement;
                    focusableElement?.focus();
                  }
                }}
              >
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 shadow-md group-hover:scale-105 group-focus:scale-105 transition-transform border-2 border-blue-200 mb-4 md:mb-0 md:mr-8 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  {step.icon}
                </span>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{`Bước ${
                    idx + 1
                  }: ${step.title}`}</h2>
                  <p className="text-gray-600 text-base">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="max-w-2xl mx-auto text-center mt-16">
          <a
            href="/experts"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
            tabIndex={0}
            aria-label="Tìm chuyên gia ngay"
          >
            Tìm chuyên gia ngay
          </a>
        </section>
      </main>
    </>
  );
};

export default WorkPage;
