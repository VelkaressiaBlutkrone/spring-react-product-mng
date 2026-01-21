# 프로젝트 작업 목록 (Task List)

본 문서는 제품 관리 시스템 개발 작업을 단계별로 정리한 목록입니다.

## 진행 상황 표기
- ✅ **완료**: 해당 단계 완료
- ⏳ **진행중**: 현재 작업 중
- ❌ **미완료**: 아직 시작하지 않음
- 📝 **추가 요청**: 단계 사이에 추가된 요청사항

---

## 1단계: 프로젝트 초기 설정 및 구조 구성

**상태**: ✅ 완료

### 작업 내용
- 프로젝트 전체 구조 파악
- 백엔드 의존성 확인 및 추가 설치 (필요 시)
- 프론트엔드 패키지 확인 및 추가 설치 (필요 시)
- 폴더 및 파일 구조 구성
  - 백엔드: Entity, DTO, Repository, Service, Controller 구조 확인 및 보완
  - 프론트엔드: `front_end` 폴더 내 구조 생성 (components, pages, hooks, services, stores, types, utils)

### 세부 작업
- [x] 백엔드 build.gradle 의존성 확인 및 Spring Boot 4.0.1 호환성 검증
- [x] 프론트엔드 package.json 패키지 확인 및 추가 패키지 설치 (통계용 차트 라이브러리 등, 필요 시)
  - 현재 설치된 패키지로 기본 기능 구현 가능 확인
  - 통계 화면 구현 시 recharts 또는 date-fns 추가 설치 예정
- [x] 프론트엔드 폴더 구조 생성 (RULE.md 권장 구조 기준)
  - [x] `src/components/common/` 생성
  - [x] `src/components/layout/` 생성
  - [x] `src/components/product/` 생성
  - [x] `src/pages/` 생성
  - [x] `src/hooks/` 생성
  - [x] `src/services/api/` 생성
  - [x] `src/stores/` 생성
  - [x] `src/types/` 생성
  - [x] `src/utils/` 생성
- [x] 기본 TypeScript 타입 정의 파일 생성
  - `src/types/product.types.ts`: 상품 관련 타입 정의
  - `src/types/common.types.ts`: 공통 타입 정의
- [x] 기본 유틸리티 함수 파일 생성
  - `src/utils/dateUtils.ts`: 날짜/시간 관련 유틸리티
  - `src/utils/formatters.ts`: 데이터 포맷팅 유틸리티

---

## 2단계: 핵심 기능 구현 (Phase 1)

**상태**: ✅ 완료

### 작업 내용
PRD.md Phase 1에 해당하는 핵심 기능 구현

#### 2-1. 서버: 상품 CRUD API 구현
**상태**: ✅ 완료

- [x] ProductController 구현 (POST, PUT, DELETE 엔드포인트)
- [x] ProdService 구현 (상품 추가, 수정, 삭제 비즈니스 로직)
- [x] ProdDto.Request/Response 구현 및 Entity 변환 메서드 추가
- [x] 상품 유효성 검증 로직 구현 (@Valid, @NotBlank 활용)
- [x] 상품코드 유일성 검증 (existsByProductCode 메서드 활용)
- [x] 연관 데이터 처리 (카테고리 조회 및 검증)
- [x] CORS 설정 확인 (CorsConfig 확인 완료)

#### 2-2. 서버: 상품 조회 API 구현 (검색, 페이징, 정렬)
**상태**: ✅ 완료

- [x] 상품 조회 API 엔드포인트 구현 (GET /api/products)
- [x] 검색 조건 처리 (상품명, 상품코드, 가격 범위)
- [x] QueryDSL을 활용한 동적 쿼리 구현 (ProductRepositoryImpl)
- [x] 페이징 처리 (Spring Data JPA Pageable)
- [x] 정렬 처리 (등록 날짜 기준 내림차순)
- [x] 가격 범위 검색 시 PriceHistory와의 조인 처리 (유효한 가격만 조회)

#### 2-3. 클라이언트: 기본 레이아웃 및 라우팅
**상태**: ✅ 완료

- [x] React Router 설정 (App.tsx)
- [x] 기본 레이아웃 컴포넌트 구현 (Header, BottomNav, Layout)
- [x] 반응형 레이아웃 구현 (모바일: 하단 네비게이션, 데스크톱: 상단 네비게이션)
- [x] 라우트 설정 (메인, 목록, 통계, About)
- [x] 공통 스타일링 (Tailwind CSS)

#### 2-4. 클라이언트: 목록 화면 기본 구현
**상태**: ✅ 완료

- [x] ProductListPage 컴포넌트 구현
- [x] React Query를 활용한 상품 목록 조회 (useQuery)
- [x] 검색 UI 구현 (ProductSearch 컴포넌트: 상품명, 상품코드)
- [x] 가격 범위 필터 UI 구현 (최소/최대 가격)
- [x] 페이징 UI 구현 (Pagination 컴포넌트)
- [x] 상품 목록 표시 (ProductCard 컴포넌트 - 카드 형태)
- [x] 로딩 상태 및 에러 처리

---

## 3단계: 추가 기능 구현 (Phase 2)

**상태**: ✅ 완료

### 작업 내용
PRD.md Phase 2에 해당하는 추가 기능 구현

#### 3-1. 서버: 로깅 기능 구현
**상태**: ✅ 완료

- [x] AOP를 활용한 로깅 어노테이션 생성 (@Logging 어노테이션)
- [x] Controller 레이어 요청/응답 로깅 구현 (ControllerLoggingAspect)
- [x] Service 레이어 메서드 실행 로깅 구현 (LoggingAspect, ProdService에 적용)
- [x] 데이터 변경 전/후 값 비교 로깅 (파라미터 및 결과 로깅)
- [x] 예외 발생 시 상세 로깅 (GlobalExceptionHandler 개선 - 스택 트레이스, 요청 정보 포함)
- [x] Logback 설정 최적화 (로그 파일 분리 완료 - application.log, error.log, sql.log)

#### 3-2. 클라이언트: 상품 추가/수정/삭제 UI
**상태**: ✅ 완료

- [x] 상품 추가 폼 컴포넌트 구현 (ProductForm)
- [x] React Hook Form + Zod를 활용한 폼 검증
- [x] 상품 수정 UI 구현 (Modal 활용)
- [x] 상품 삭제 확인 다이얼로그 구현 (ConfirmDialog)
- [x] React Query Mutation을 활용한 데이터 변경 처리 (createMutation, updateMutation, deleteMutation)
- [x] 성공/실패 피드백 UI (로딩 상태 표시)

#### 3-3. 클라이언트: 메인 화면 구현
**상태**: ✅ 완료

- [x] HomePage 컴포넌트 구현
- [x] 최근 추가된 항목 목록 표시 (최근 5개 상품)
- [x] 변경 이력 정보 표시 (4단계에서 구현 예정 안내)
- [x] 대시보드 위젯 구현 (전체 상품 수, 오늘/이번 주 통계 - 변경 이력 기능 필요)
- [x] 빠른 액션 버튼 구현 (상품 목록, 통계, About 링크)

#### 3-4. 클라이언트: About 페이지 구현
**상태**: ✅ 완료

- [x] AboutPage 컴포넌트 구현
- [x] 시스템 정보 표시 (버전, 기술 스택, 빌드 날짜)
- [x] 연락 정보 표시 (개발팀, 이메일, GitHub)
- [x] 반응형 레이아웃 (Tailwind CSS 그리드 활용)

---

## 4단계: 고급 기능 구현 (Phase 3)

**상태**: ❌ 미완료

### 작업 내용
PRD.md Phase 3에 해당하는 고급 기능 구현

#### 4-1. 서버: 변경 이력 Entity 및 API 구현
**상태**: ❌ 미완료

- [ ] ProductChangeLog Entity 생성
- [ ] 변경 이력 저장 로직 구현 (AOP 또는 이벤트 리스너 활용)
- [ ] 변경 이력 조회 API 구현
- [ ] 기간별 변경 이력 조회 기능

#### 4-2. 클라이언트: 통계 화면 구현
**상태**: ❌ 미완료

- [ ] StatisticsPage 컴포넌트 구현
- [ ] 기간 선택 UI 구현 (매주/매월/분기/년별, 커스텀 날짜 범위)
- [ ] 통계 목록 표시 (기간별 추가/수정/삭제 항목)
- [ ] 통계 그래프 구현
  - [ ] 추가/수정/삭제 트렌드 차트 (라인 차트)
  - [ ] 카테고리별 분포 차트 (파이/바 차트)
  - [ ] 가격 분포 차트 (히스토그램)
  - [ ] 월별 추가 추이 차트 (바 차트)
- [ ] 통계 요약 카드 구현
- [ ] date-fns를 활용한 날짜 포맷팅

#### 4-3. 클라이언트: 반응형 디자인 최적화
**상태**: ❌ 미완료

- [ ] 모든 페이지 반응형 검증 및 최적화
- [ ] 모바일 UX 개선
- [ ] 터치 인터랙션 최적화
- [ ] 성능 최적화 (React.memo, useMemo, useCallback 적용)

#### 4-4. 클라이언트: 에러 처리 및 사용자 피드백 강화
**상태**: ❌ 미완료

- [ ] 전역 에러 핸들러 구현
- [ ] 사용자 친화적인 에러 메시지 표시
- [ ] 네트워크 에러 처리
- [ ] 로딩 상태 표시 개선
- [ ] 성공/실패 토스트 메시지 구현

---

## 추가 요청 사항

단계 사이에 발생한 추가 요청사항을 아래에 정리합니다.

### 추가 요청 #1
**등록일**: (날짜)
**상태**: ❌ 미완료

**요청 내용**:
- 

**관련 단계**: 

---

## 참고 문서

- **PRD.md**: 프로젝트 요구사항 및 기능 명세
- **RULE.md**: 개발 규칙 및 코딩 가이드라인
- **README.md**: 프로젝트 개요 및 설치 방법

---

## 작업 진행 체크리스트 요약

- [x] 1단계: 프로젝트 초기 설정 및 구조 구성
- [x] 2단계: 핵심 기능 구현 (Phase 1)
- [x] 3단계: 추가 기능 구현 (Phase 2)
- [ ] 4단계: 고급 기능 구현 (Phase 3)
