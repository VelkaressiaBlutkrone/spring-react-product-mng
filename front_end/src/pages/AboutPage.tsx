/**
 * About 페이지
 */
export const AboutPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">시스템 정보</h2>
        <div className="space-y-2 text-gray-600">
          <p>버전: 0.0.0</p>
          <p>기술 스택: Spring Boot 4.0.1, React 19, TypeScript</p>
        </div>
      </div>
    </div>
  );
};
