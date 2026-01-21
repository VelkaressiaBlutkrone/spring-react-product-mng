# 프로젝트 개발 규칙 (Development Rules)

본 문서는 제품 관리 시스템 개발 시 준수해야 할 코딩 규칙과 가이드라인을 정의합니다.

## 1. 서버 (Backend) 규칙

### 1-1) 의존성 관리

#### Spring Boot 버전 및 호환성
- **Spring Boot 4.0.1 기준으로 호환성이 인정된 의존성만 사용**
- 새로운 라이브러리 추가 전 반드시 Spring Boot 4.0.1과의 호환성 확인
- Jakarta EE 기반으로 작성 (javax 대신 jakarta 사용)
- Java 21 사용

#### 의존성 추가 시 고려사항
- 기존 build.gradle의 의존성 버전과 충돌 여부 확인
- QueryDSL은 5.0.0:jakarta 버전 사용
- Lombok 사용 필수 (코드 간소화)
- JPA/Hibernate는 Spring Boot starter를 통해 관리

### 1-2) 코드 주석 규칙

#### 주석 작성 원칙
- **코드에 대한 주석은 필수이나 핵심만 간결히 작성**
- 클래스 레벨: 클래스의 목적과 주요 기능 1-2줄로 설명
- 메서드 레벨: 메서드의 역할과 주요 파라미터/반환값 간략 설명
- 복잡한 로직: 비즈니스 로직의 핵심 판단 기준만 주석으로 명시
- 자명한 코드는 주석 생략 (코드 자체로 의미가 명확한 경우)

#### 주석 예시
```java
/**
 * 상품 조회 서비스 - 검색, 페이징, 정렬 기능 제공
 */
@Service
public class ProdService {
    
    /**
     * 상품 목록 조회 - 검색 조건 및 페이징 처리
     * @param searchCondition 검색 조건 (상품명, 상품코드, 가격범위)
     * @param pageable 페이징 정보
     * @return 페이징된 상품 목록
     */
    public Page<ProductResponse> getProducts(SearchCondition searchCondition, Pageable pageable) {
        // 가격 범위 검색 시 유효한 가격만 조회 (endDate가 null이거나 미래인 경우)
        // ...
    }
}
```

### 1-3) 코드 수정 규칙

#### 기존 코드 수정 시
- **이미 생성된 코드를 다시 수정할 시 수정한 이유를 간략히 작성**
- Git commit 메시지에 수정 이유 포함
- 주요 변경사항은 클래스 상단 또는 변경된 메서드 주석으로 명시
- 리팩토링, 버그 수정, 기능 개선 등의 사유 구분

#### 수정 이유 명시 예시
```java
/**
 * 상품 삭제 메서드
 * 
 * [수정 이력]
 * - 2024-01-XX: Soft Delete 방식으로 변경 (영향: 연관 데이터 보존을 위해 삭제 플래그 방식 적용)
 * - 2024-01-XX: Cascade 처리 추가 (영향: 재고, 옵션 데이터 함께 삭제하도록 변경)
 */
public void deleteProduct(Long productId) {
    // ...
}
```

### 1-4) CORS 설정

#### CORS 주의사항
- **클라이언트가 React/Vite 환경이므로 CORS 문제 주의**
- 개발 환경: React 개발 서버 (일반적으로 http://localhost:5173) 허용
- 프로덕션 환경: 실제 프론트엔드 도메인만 허용

#### CORS 설정 규칙
- CorsConfig 클래스를 통해 전역 CORS 설정 관리
- SecurityConfig와 함께 설정하여 보안 고려
- 허용할 Origin, Method, Header 명시적 지정
- Credentials 허용 시 보안 검토 필수

```java
/**
 * CORS 설정 - React/Vite 클라이언트와의 통신을 위한 설정
 */
@Configuration
public class CorsConfig {
    // 개발 환경: localhost:5173 (Vite 기본 포트)
    // 프로덕션: 실제 프론트엔드 도메인
}
```

### 1-5) API 엔드포인트 규칙

#### RESTful API 설계
- 엔드포인트 경로: `/api/{resource}` 형식
- HTTP 메서드: GET(조회), POST(생성), PUT(수정), DELETE(삭제)
- 응답 형식: 일관된 JSON 구조 (성공/실패 응답)
- 에러 처리: GlobalExceptionHandler를 통한 통일된 에러 응답

#### API 문서화
- 주요 API는 주석으로 요청/응답 형식 명시
- 필수 파라미터와 선택 파라미터 구분

### 1-6) 로깅 규칙

#### 로깅 레벨
- **INFO**: 주요 비즈니스 로직 실행 (상품 추가/수정/삭제)
- **DEBUG**: 상세 실행 정보 (개발 환경에서만 활성화)
- **ERROR**: 예외 발생 시 (반드시 스택 트레이스 포함)
- **WARN**: 경고성 상황 (비즈니스 로직 위반 등)

#### 로깅 형식
- Logback 설정을 통한 구조화된 로그 형식
- JSON 형식으로 로그 수집 시스템 연동 고려
- AOP를 활용한 자동 로깅 (Controller, Service 레이어)

### 1-7) Entity 및 Repository 규칙

#### Entity 설계
- BaseTimeEntity 상속으로 생성일시/수정일시 자동 관리
- 연관관계는 LAZY 로딩 기본 사용
- 양방향 관계는 필요시에만 사용 (순환 참조 주의)

#### Repository
- JPA Repository 기본 기능 활용
- 복잡한 쿼리는 QueryDSL 사용 (ProductCustomRepository)
- 메서드명은 Spring Data JPA 네이밍 규칙 준수

## 2. 클라이언트 (Frontend) 규칙

### 2-1) 작업 디렉토리

#### 폴더 구조
- **`front_end` 폴더에서 작업**
- 모든 프론트엔드 코드는 `front_end` 폴더 내에서 작성
- 절대 경로 사용 시 `front_end` 기준으로 상대 경로 계산

### 2-2) 패키지 활용 규칙

#### 패키지 확인 및 활용
- **패키지를 확인하고 각 기능에 맞는 패키지를 누락없이 활용**
- 새로운 기능 구현 시 기존 설치된 패키지로 먼저 구현 가능한지 확인
- 추가 패키지 설치 시 반드시 설치 이유 명시 (PRD.md 참고)

#### 주요 패키지 활용 가이드
- **react-router-dom**: 페이지 라우팅 (메인/목록/통계/About)
- **@tanstack/react-query**: 서버 상태 관리, API 호출, 캐싱
- **axios**: HTTP 클라이언트 (API 통신)
- **react-hook-form + zod**: 폼 관리 및 검증 (상품 추가/수정)
- **zustand**: 클라이언트 전역 상태 관리 (UI 상태 등)
- **tailwindcss**: 모든 스타일링 (유틸리티 클래스 활용)
- **clsx, tailwind-merge**: 조건부 클래스명 동적 관리

#### 추가 패키지 설치 시 (필요 시)
- **recharts/@nivo**: 통계 화면의 그래프 (PRD.md 참고)
- **date-fns**: 날짜 포맷팅 및 조작
- **react-icons**: 아이콘 사용
- 추가 설치 시 `package.json`에 의존성 추가 후 설치 이유 주석으로 명시

### 2-3) 코드 주석 규칙

#### 주석 작성 원칙
- **코드에 대한 주석은 필수이나 간략하게 핵심 위주로 주석을 작성**
- 컴포넌트 상단: 컴포넌트의 목적과 주요 props 설명
- 복잡한 로직: 비즈니스 로직의 핵심 판단만 주석
- Hook 사용: 커스텀 Hook의 목적과 반환값 간략 설명
- API 호출: API 엔드포인트와 주요 파라미터 설명

#### 주석 예시
```typescript
/**
 * 상품 목록 컴포넌트 - 페이징 및 검색 기능 포함
 */
export const ProductList: React.FC = () => {
    // React Query를 통한 상품 목록 조회 (페이징, 검색 조건 포함)
    const { data, isLoading } = useQuery({
        queryKey: ['products', page, searchParams],
        queryFn: () => fetchProducts(page, searchParams)
    });
    
    // ...
};
```

### 2-4) 파일 및 폴더 구조 규칙

#### 파일/폴더 구분 명확화
- **코드의 기능에 대한 파일 및 폴더 구분을 명확히 할 것**

#### 권장 폴더 구조
```
front_end/
├── src/
│   ├── components/          # 공통 컴포넌트
│   │   ├── common/          # 일반 공통 컴포넌트 (Button, Input, Modal 등)
│   │   ├── layout/          # 레이아웃 컴포넌트 (Header, Sidebar, Footer)
│   │   └── product/         # 상품 관련 컴포넌트 (ProductCard, ProductForm 등)
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── HomePage.tsx     # 메인 화면
│   │   ├── ProductListPage.tsx  # 목록 화면
│   │   ├── StatisticsPage.tsx   # 통계 화면
│   │   └── AboutPage.tsx    # About 화면
│   ├── hooks/               # 커스텀 Hook
│   │   ├── useProducts.ts   # 상품 관련 Hook
│   │   └── usePagination.ts # 페이징 관련 Hook
│   ├── services/            # API 서비스
│   │   └── api/
│   │       ├── productApi.ts    # 상품 API
│   │       └── statisticsApi.ts # 통계 API
│   ├── stores/              # Zustand 상태 관리
│   │   └── productStore.ts
│   ├── types/               # TypeScript 타입 정의
│   │   └── product.types.ts
│   ├── utils/               # 유틸리티 함수
│   │   └── dateUtils.ts     # 날짜 포맷팅 등
│   ├── App.tsx              # 라우팅 설정
│   └── main.tsx             # 진입점
```

#### 파일 네이밍 규칙
- **컴포넌트**: PascalCase (예: `ProductList.tsx`, `ProductCard.tsx`)
- **Hook**: camelCase with 'use' prefix (예: `useProducts.ts`, `usePagination.ts`)
- **Service/API**: camelCase (예: `productApi.ts`, `statisticsApi.ts`)
- **Types**: camelCase with '.types.ts' suffix (예: `product.types.ts`)
- **Utils**: camelCase (예: `dateUtils.ts`, `formatters.ts`)

### 2-5) 컴포넌트 작성 규칙

#### 컴포넌트 구조
- 함수형 컴포넌트 사용 (React Hooks 활용)
- TypeScript로 타입 안정성 보장
- Props는 interface 또는 type으로 정의

#### 컴포넌트 예시
```typescript
// ProductCard.tsx
interface ProductCardProps {
    product: Product;
    onSelect: (productId: number) => void;
}

/**
 * 상품 카드 컴포넌트 - 상품 목록 표시용
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
    // ...
};
```

### 2-6) 스타일링 규칙

#### Tailwind CSS 활용
- 모든 스타일은 Tailwind CSS 유틸리티 클래스로 작성
- 커스텀 스타일은 최소화 (tailwind.config.js에서 확장)
- 반응형: 모바일 퍼스트 접근 (sm, md, lg, xl breakpoint)

#### 디자인 원칙 (PRD.md 참고)
- 심플한 디자인, UX 우선
- 모바일 대응 필수
- 일관된 spacing, color 시스템 유지

### 2-7) 상태 관리 규칙

#### 상태 관리 선택 가이드
- **서버 상태**: React Query (@tanstack/react-query) 사용
  - API 데이터, 캐싱, 동기화
- **클라이언트 상태**: Zustand 사용
  - UI 상태 (모달 열림/닫힘, 테마 등)
  - 로컬 폼 상태는 react-hook-form 사용

#### React Query 사용 예시
```typescript
// 상품 목록 조회
const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, filters],
    queryFn: () => productApi.getProducts(page, filters)
});

// 상품 추가
const mutation = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
    }
});
```

### 2-8) 폼 처리 규칙

#### React Hook Form + Zod 활용
- 모든 폼은 react-hook-form으로 관리
- 검증은 Zod 스키마로 정의
- 에러 메시지는 사용자 친화적으로 표시

```typescript
// 상품 추가 폼 스키마
const productSchema = z.object({
    productCode: z.string().min(1, '상품코드는 필수입니다'),
    productName: z.string().min(1, '상품명은 필수입니다'),
    // ...
});

type ProductFormData = z.infer<typeof productSchema>;
```

## 3. 공통 규칙

### 3-1) 코드 품질

#### 일관성 유지
- 프로젝트 전반에 걸쳐 코딩 스타일 일관성 유지
- 기존 코드 스타일을 따를 것
- 새로운 패턴 도입 시 팀과 논의

### 3-2) 에러 처리

#### 에러 처리 원칙
- 사용자에게 명확한 에러 메시지 제공
- 개발자를 위한 상세 로그 남기기
- 예상치 못한 에러는 기본 에러 메시지로 처리

### 3-3) 성능 고려

#### 성능 최적화
- 불필요한 리렌더링 방지 (React.memo, useMemo, useCallback 활용)
- 이미지 최적화 (필요 시)
- 코드 스플리팅 (React.lazy) 고려
- API 호출 최소화 (React Query 캐싱 활용)

### 3-4) 보안 고려

#### 보안 규칙
- 클라이언트에서 민감한 정보 노출 금지
- 입력값 검증 (서버/클라이언트 모두)
- SQL Injection 방지 (JPA 사용으로 기본 방지)
- XSS 방지 (React의 기본 이스케이프 활용)

## 4. 참고 문서

- **PRD.md**: 프로젝트 요구사항 및 기능 명세
- **TASK.md**: 작업 목록 및 진행 상황
- **README.md**: 프로젝트 개요 및 설치 방법
