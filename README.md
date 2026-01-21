# 제품 관리 시스템 (Product Management System)

상품의 CRUD 기능과 변경 이력을 관리하는 풀스택 웹 애플리케이션입니다.

## 📋 프로젝트 설명

이 프로젝트는 Spring Boot 기반의 RESTful API 서버와 React 기반의 SPA 클라이언트로 구성된 제품 관리 시스템입니다. 상품 정보의 추가, 수정, 삭제 및 조회 기능을 제공하며, 모든 변경 사항을 이력으로 추적하고 통계 데이터를 제공합니다.

### 주요 기능

- **상품 관리**: 상품 추가, 수정, 삭제, 조회 (검색, 페이징, 정렬)
- **변경 이력 추적**: 상품의 모든 변경 사항을 자동으로 기록
- **통계 기능**: 기간별 변경 이력 조회 및 통계 분석
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **에러 처리**: 사용자 친화적인 에러 메시지 및 토스트 알림

## 🏗️ 프로젝트 아키텍처

```
spring-react-product-mng/
├── src/                          # 백엔드 소스 코드
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/spm/
│   │   │       ├── domain/       # 도메인 레이어
│   │   │       │   ├── entity/   # JPA 엔티티
│   │   │       │   ├── enums/    # 열거형 타입
│   │   │       │   ├── dto/      # 데이터 전송 객체
│   │   │       │   ├── repository/ # 리포지토리 인터페이스 및 구현
│   │   │       │   ├── service/  # 비즈니스 로직
│   │   │       │   └── controller/ # REST API 컨트롤러
│   │   │       ├── global/       # 전역 설정
│   │   │       │   ├── config/   # 설정 클래스 (CORS, Security 등)
│   │   │       │   ├── aspect/   # AOP (로깅)
│   │   │       │   └── annotation/ # 커스텀 어노테이션
│   │   │       ├── exception/    # 예외 처리
│   │   │       └── SpringReactProductMngApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── logback-spring.xml
│   └── test/                     # 테스트 코드
│       └── java/
│           └── com/example/spm/
├── front_end/                    # 프론트엔드 소스 코드
│   ├── src/
│   │   ├── components/           # React 컴포넌트
│   │   │   ├── common/           # 공통 컴포넌트
│   │   │   ├── layout/           # 레이아웃 컴포넌트
│   │   │   └── product/          # 상품 관련 컴포넌트
│   │   ├── pages/                # 페이지 컴포넌트
│   │   ├── services/             # API 서비스
│   │   │   └── api/
│   │   ├── types/                # TypeScript 타입 정의
│   │   ├── utils/                # 유틸리티 함수
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.app.json
├── docs/                         # 프로젝트 문서
│   ├── PRD.md                    # 제품 요구사항 문서
│   ├── RULE.md                   # 개발 규칙 및 가이드라인
│   ├── TASK.md                   # 작업 목록 및 진행 상황
│   └── TROUBLESHOOTING.md        # 문제 해결 가이드
├── build.gradle                  # Gradle 빌드 설정
├── settings.gradle               # Gradle 프로젝트 설정
└── README.md                     # 프로젝트 소개 문서

```

### 아키텍처 패턴

- **백엔드**: Layered Architecture (Controller → Service → Repository → Entity)
- **프론트엔드**: Component-Based Architecture (Pages → Components → Services)
- **API 통신**: RESTful API, Axios
- **상태 관리**: React Query (서버 상태), Zustand (클라이언트 상태)

## 🔧 주요 설정 파일

### 백엔드

- `build.gradle`: Gradle 빌드 설정 및 의존성 관리
- `src/main/resources/application.properties`: 애플리케이션 설정
- `src/main/resources/logback-spring.xml`: 로깅 설정
- `src/test/resources/application.properties`: 테스트 환경 설정

### 프론트엔드

- `front_end/package.json`: npm 패키지 및 스크립트
- `front_end/vite.config.ts`: Vite 빌드 설정
- `front_end/tsconfig.app.json`: TypeScript 컴파일러 설정
- `front_end/src/index.css`: 전역 스타일 및 Tailwind 설정

### API 엔드포인트

#### 상품 API

- `GET /api/products` - 상품 목록 조회 (검색, 페이징, 정렬)
- `GET /api/products/{id}` - 상품 상세 조회
- `POST /api/products` - 상품 추가
- `PUT /api/products/{id}` - 상품 수정
- `DELETE /api/products/{id}` - 상품 삭제

#### 변경 이력 API

- `GET /api/change-logs` - 변경 이력 목록 조회 (필터링 지원)
- `GET /api/change-logs/recent` - 최근 변경 이력 조회

### 주요 Entity

- **Product**: 상품 정보
- **Category**: 상품 카테고리
- **ProductChangeLog**: 상품 변경 이력
- **Inventory**: 재고 정보 (향후 확장)
- **ProductOption**: 상품 옵션 (향후 확장)
- **PriceHistory**: 가격 이력 (향후 확장)

### 주요 기능

- ✅ 상품 CRUD 기능
- ✅ 상품 검색 및 페이징
- ✅ 변경 이력 추적
- ✅ 통계 화면 (기간별 변경 이력)
- ✅ 반응형 디자인
- ✅ 에러 처리 및 사용자 피드백
- ✅ 로깅 기능 (AOP 기반)

## 🛠️ 프로젝트 기술 구조

### 백엔드 (Backend)

#### 프레임워크 & 언어

- **Spring Boot**: 4.0.1
- **Java**: 21
- **Gradle**: 빌드 도구

#### 주요 라이브러리

- **Spring Data JPA**: 데이터베이스 접근
- **QueryDSL**: 5.0.0 (Jakarta) - 동적 쿼리 생성
- **MySQL Connector**: 데이터베이스 드라이버
- **Spring Security**: 보안 처리
- **Spring Actuator**: 애플리케이션 모니터링
- **AspectJ**: AOP (로깅 처리)
- **Lombok**: 보일러플레이트 코드 제거
- **Gson**: JSON 직렬화/역직렬화
- **Logback**: 로깅 프레임워크

#### 데이터베이스

- **운영 환경**: MySQL
- **테스트 환경**: H2 (인메모리)

### 프론트엔드 (Frontend)

#### 프레임워크 & 언어

- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Vite**: 7.2.4 (빌드 도구)

#### 주요 라이브러리

- **React Router DOM**: 7.12.0 - 라우팅
- **TanStack Query**: 5.90.19 - 서버 상태 관리
- **Zustand**: 5.0.10 - 클라이언트 상태 관리
- **React Hook Form**: 7.71.1 - 폼 관리
- **Zod**: 4.3.5 - 스키마 검증
- **Axios**: 1.13.2 - HTTP 클라이언트
- **Tailwind CSS**: 4.1.18 - 스타일링
- **clsx**: 2.1.1 - 조건부 클래스 이름

## ⚙️ 프로젝트 설정

### 사전 요구사항

- **Java**: 21 이상
- **Node.js**: 18 이상
- **npm**: 9 이상
- **MySQL**: 8.0 이상 (또는 H2 for 테스트)

### 백엔드 설정

#### 1. 데이터베이스 생성

```sql
CREATE DATABASE IF NOT EXISTS product_mng;
```

#### 2. 데이터베이스 접속 정보 설정

`application-secret.properties.example` 파일을 복사하여 `application-secret.properties` 파일을 생성하고 실제 데이터베이스 접속 정보를 입력하세요.

```bash
# 프로젝트 루트에서 실행
cp src/main/resources/application-secret.properties.example application-secret.properties
```

`application-secret.properties` 파일 편집:

```properties
DB_URL=jdbc:mysql://localhost:3306/product_mng
DB_USERNAME=root
DB_PASSWORD=your_password_here
SHOW_SQL=false
```

**주의**: `application-secret.properties` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.

#### 3. Gradle 빌드

```bash
# Windows
.\gradlew build

# Linux/Mac
./gradlew build
```

### 프론트엔드 설정

#### 1. 의존성 설치

```bash
cd front_end
npm install
```

#### 2. 환경 변수 설정 (선택사항)

프론트엔드 루트에 `.env` 파일을 생성하여 API 베이스 URL을 설정할 수 있습니다:

```env
VITE_API_BASE_URL=http://localhost:8080
```

기본값은 `http://localhost:8080`입니다.

## 🚀 프로젝트 실행 방법

### 백엔드 실행

#### 방법 1: Gradle을 통한 실행

```bash
# 프로젝트 루트에서 실행
.\gradlew bootRun
```

#### 방법 2: 빌드 후 JAR 실행

```bash
# 빌드
.\gradlew build

# JAR 실행
java -jar build/libs/spring-react-product-mng-0.0.1-SNAPSHOT.jar
```

백엔드 서버는 `http://localhost:8080`에서 실행됩니다.

### 프론트엔드 실행

```bash
cd front_end
npm run dev
```

프론트엔드 개발 서버는 `http://localhost:5173`에서 실행됩니다.

### 테스트 실행

#### 백엔드 테스트

```bash
# 프로젝트 루트에서 실행
.\gradlew test
```

#### 프론트엔드 빌드 (프로덕션)

```bash
cd front_end
npm run build
```

빌드 결과물은 `front_end/dist` 폴더에 생성됩니다.

## 📚 프로젝트 내 링크 문서

프로젝트의 상세한 문서는 `docs/` 폴더에 있습니다:

- **[PRD.md](docs/PRD.md)**: 제품 요구사항 문서 (Product Requirements Document)
  - 서버 및 클라이언트 기능 명세
  - API 엔드포인트 정의
  - UI/UX 요구사항

- **[RULE.md](docs/RULE.md)**: 개발 규칙 및 가이드라인
  - 코딩 표준 및 규칙
  - 파일 및 폴더 구조 가이드
  - 패키지 사용 가이드

- **[TASK.md](docs/TASK.md)**: 작업 목록 및 진행 상황
  - 단계별 작업 목록
  - 완료/진행중/미완료 상태 추적
  - 추가 요청 사항

- **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)**: 문제 해결 가이드
  - 빌드 오류 해결 방법
  - 런타임 오류 해결 방법
  - 설정 및 구성 가이드
  - 문제 해결 이력

## 📖 참고 문서

### 공식 문서

- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Spring Data JPA 공식 문서](https://spring.io/projects/spring-data-jpa)
- [React 공식 문서](https://react.dev)
- [TypeScript 공식 문서](https://www.typescriptlang.org)
- [Vite 공식 문서](https://vitejs.dev)
- [TanStack Query 공식 문서](https://tanstack.com/query)
- [Tailwind CSS 공식 문서](https://tailwindcss.com)

### 기술 스택 참고

- [QueryDSL 공식 문서](https://querydsl.com)
- [React Router 공식 문서](https://reactrouter.com)
- [React Hook Form 공식 문서](https://react-hook-form.com)
- [Zod 공식 문서](https://zod.dev)

---

## 📄 라이센스

MIT License

---

**버전**: 0.0.1-SNAPSHOT
**마지막 업데이트**: 2024년
