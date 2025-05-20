"use client";

const pricingPlans = [
  {
    name: 'Gói Cơ Bản',
    price: '299.000đ / phiên',
    description: 'Gặp gỡ 1:1 với chuyên gia trong 30 phút.',
    features: [
      'Lịch hẹn linh hoạt',
      'Hỗ trợ qua video call',
      'Tư vấn cá nhân hóa',
    ],
    cta: 'Đăng ký',
  },
  {
    name: 'Gói Chuyên Gia',
    price: '499.000đ / phiên',
    description: 'Gặp gỡ 1:1 với chuyên gia trong 60 phút.',
    features: [
      'Ưu tiên đặt lịch',
      'Hỗ trợ tài liệu sau buổi gặp',
      'Tư vấn chuyên sâu',
    ],
    cta: 'Đăng ký',
  },
  {
    name: 'Gói Doanh Nghiệp',
    price: 'Liên hệ',
    description: 'Gói dành cho doanh nghiệp, nhiều phiên, tùy chỉnh theo nhu cầu.',
    features: [
      'Quản lý tài khoản doanh nghiệp',
      'Báo cáo chi tiết',
      'Hỗ trợ riêng',
    ],
    cta: 'Liên hệ',
  },
];

const PricingPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Gặp gỡ chuyên gia 1:1</h1>
        <p className="text-lg text-gray-600">Chọn gói phù hợp để kết nối trực tiếp với chuyên gia hàng đầu, nhận tư vấn cá nhân hóa và giải đáp mọi thắc mắc của bạn.</p>
      </section>
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, idx) => (
          <div
            key={plan.name}
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center border border-gray-200 hover:shadow-lg transition-shadow"
            tabIndex={0}
            aria-label={`Gói ${plan.name}`}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{plan.name}</h2>
            <div className="text-3xl font-bold text-blue-600 mb-2">{plan.price}</div>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <ul className="text-left mb-6 w-full">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center mb-2">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2" aria-hidden="true"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
              tabIndex={0}
              aria-label={plan.cta + ' ' + plan.name}
              onClick={() => {}}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); } }}
              type="button"
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default PricingPage;
