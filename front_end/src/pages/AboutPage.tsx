/**
 * About 페이지 - 시스템 정보 및 연락처
 */
export const AboutPage = () => {
  const version = '0.0.0';
  const buildDate = new Date().toLocaleDateString('ko-KR');

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="section-title text-2xl sm:text-3xl">About</h1>
        <p className="text-gray-500 text-sm sm:text-base">시스템 정보 및 연락처</p>
      </div>

      {/* 시스템 정보 */}
      <div className="card-imweb p-5 sm:p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">시스템 정보</h2>
        <div className="space-y-3 text-gray-600">
          <div>
            <span className="font-medium">애플리케이션 이름:</span>{' '}
            <span>제품 관리 시스템</span>
          </div>
          <div>
            <span className="font-medium">버전:</span>{' '}
            <span>{version}</span>
          </div>
          <div>
            <span className="font-medium">빌드 날짜:</span>{' '}
            <span>{buildDate}</span>
          </div>
        </div>
      </div>

      {/* 기술 스택 */}
      <div className="card-imweb p-5 sm:p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">기술 스택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Backend</h3>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>• Spring Boot 4.0.1</li>
              <li>• Spring Data JPA</li>
              <li>• QueryDSL 5.0.0</li>
              <li>• MySQL</li>
              <li>• Java 21</li>
              <li>• Gradle</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Frontend</h3>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>• React 19</li>
              <li>• TypeScript</li>
              <li>• Vite</li>
              <li>• Tailwind CSS 4</li>
              <li>• React Query</li>
              <li>• React Router DOM</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 연락 정보 */}
      <div className="card-imweb p-5 sm:p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">연락 정보</h2>
        <div className="space-y-3 text-gray-600">
          <div>
            <span className="font-medium">개발팀:</span>{' '}
            <span>제품 관리 시스템 개발팀</span>
          </div>
          <div>
            <span className="font-medium">이메일:</span>{' '}
            <a
              href="mailto:contact@example.com"
              className="text-blue-600 hover:underline"
            >
              contact@example.com
            </a>
          </div>
          <div>
            <span className="font-medium">GitHub:</span>{' '}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>

      {/* 기타 정보 */}
      <div className="card-imweb p-5 sm:p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">기타 정보</h2>
        <div className="space-y-3 text-gray-600 text-sm">
          <div>
            <span className="font-medium">라이선스:</span>{' '}
            <span>MIT License</span>
          </div>
          <div>
            <span className="font-medium">기여:</span>{' '}
            <span>버그 리포트, 기능 제안, PR은 언제든 환영합니다!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
