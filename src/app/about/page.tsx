const teamMembers = [
  {
    name: 'Nguyễn Văn A',
    role: 'Founder & CEO',
    description: 'Định hướng phát triển nền tảng, kết nối chuyên gia với khách hàng.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Trần Thị B',
    role: 'Chuyên gia UX/UI',
    description: 'Thiết kế trải nghiệm người dùng hiện đại, tối ưu hóa giao diện.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Lê Văn C',
    role: 'Lead Developer',
    description: 'Phát triển hệ thống bảo mật, đảm bảo hiệu năng và ổn định.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

const coreValues = [
  {
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-3.866-3.134-7-7-7m14 0c-3.866 0-7 3.134-7 7m0 0c0 3.866 3.134 7 7 7m-14 0c3.866 0 7-3.134 7-7" /></svg>
    ),
    title: 'Kết nối chuyên gia',
    desc: 'Dễ dàng gặp gỡ và trao đổi với chuyên gia hàng đầu trong lĩnh vực.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
    ),
    title: 'Cá nhân hóa',
    desc: 'Tư vấn phù hợp với từng nhu cầu, bảo mật thông tin tuyệt đối.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" /></svg>
    ),
    title: 'Hỗ trợ tận tâm',
    desc: 'Đội ngũ luôn sẵn sàng hỗ trợ, đồng hành cùng khách hàng.'
  },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Về Chúng Tôi</h1>
        <p className="text-lg text-gray-600 mb-6">Nền tảng kết nối chuyên gia 1:1, giúp bạn giải quyết vấn đề nhanh chóng, bảo mật và cá nhân hóa. Chúng tôi tin rằng mỗi người đều xứng đáng nhận được sự tư vấn tốt nhất từ chuyên gia thực thụ.</p>
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=600&q=80" alt="Teamwork" className="mx-auto rounded-2xl shadow-lg w-full max-w-md object-cover mb-6" />
      </section>
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {coreValues.map((value, idx) => (
          <div key={value.title} className="bg-gray-50 rounded-xl p-8 flex flex-col items-center shadow hover:shadow-lg transition-shadow" tabIndex={0} aria-label={value.title}>
            {value.icon}
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{value.title}</h3>
            <p className="mt-2 text-gray-600 text-center">{value.desc}</p>
          </div>
        ))}
      </section>
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Đội Ngũ Sáng Lập</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-xl transition-shadow" tabIndex={0} aria-label={member.name}>
              <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-100" />
              <h3 className="text-lg font-semibold text-blue-700">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-600 text-center text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bạn muốn hợp tác hoặc cần tư vấn?</h2>
        <p className="text-gray-600 mb-6">Liên hệ với chúng tôi để được hỗ trợ nhanh chóng và tận tâm nhất.</p>
        <a
          href="mailto:contact@emeet.vn"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
          tabIndex={0}
          aria-label="Liên hệ với chúng tôi qua email"
        >
          Liên hệ với chúng tôi
        </a>
      </section>
    </main>
  );
};

export default AboutPage;
