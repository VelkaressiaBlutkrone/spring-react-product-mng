# Spring React Product Management

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [엔티티 모델](#엔티티-모델)
- [설치 및 실행](#설치-및-실행)
- [API 문서](#api-문서)
- [프로젝트 구조](#프로젝트-구조)

## 🎯 프로젝트 개요

Spring Boot와 React를 기반으로 한 제품 관리 애플리케이션입니다.
이 프로젝트는 제품 정보의 조회, 생성, 수정, 삭제(CRUD) 기능을 제공합니다.

**주요 기능:**

- 제품 관리 (생성, 조회, 수정, 삭제)
- 사용자 인증 및 권한 관리
- RESTful API 제공
- 반응형 UI

## 🛠 기술 스택

### Backend

- **Java** 11 이상
- **Spring Boot** 2.7.x
- **Spring Data JPA**
- **MySQL/PostgreSQL**
- **Gradle**

### Frontend

- **React** 18.x
- **TypeScript**
- **Axios** (HTTP Client)
- **CSS/SCSS**

### 기타

- **Docker** (선택사항)
- **Git**

## 📊 엔티티 모델

### Product (제품)

제품 관리의 핵심 엔티티입니다.

| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | Long | 제품 ID (Primary Key) |
| name | String | 제품명 |
| description | String | 제품 설명 |
| price | BigDecimal | 가격 |
| quantity | Integer | 재고 수량 |
| category | String | 카테고리 |
| createdAt | LocalDateTime | 생성일시 |
| updatedAt | LocalDateTime | 수정일시 |

### User (사용자)

사용자 정보 관리 엔티티입니다.

| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | Long | 사용자 ID (Primary Key) |
| username | String | 사용자명 |
| email | String | 이메일 |
| password | String | 비밀번호 (암호화됨) |
| role | String | 사용자 역할 (ADMIN, USER) |
| createdAt | LocalDateTime | 생성일시 |

### Category (카테고리)

제품 카테고리 엔티티입니다.

| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | Long | 카테고리 ID (Primary Key) |
| name | String | 카테고리명 |
| description | String | 카테고리 설명 |

## 🚀 설치 및 실행

### 1. 저장소 클론

\`\`\`bash
git clone <https://github.com/VelkaressiaBlutkrone/spring-react-product-mng>. git
cd spring-react-product-mng
\`\`\`

### 2. Backend 설정

#### 데이터베이스 설정

\`application.properties\` 또는 \`application.yml\`에서 데이터베이스 연결 정보를 설정합니다:

\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/product_mng
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
\`\`\`

#### Backend 실행

\`\`\`bash
./gradlew build
./gradlew bootRun
\`\`\`

Backend 서버는 \`<http://localhost:8080\`에서> 실행됩니다.

### 3. Frontend 설정

#### 의존성 설치

\`\`\`bash
cd frontend
npm install
\`\`\`

#### Frontend 실행

\`\`\`bash
npm start
\`\`\`

Frontend는 \`<http://localhost:3000\`에서> 실행됩니다.

## 📚 API 문서

### 제품 API

#### 1. 모든 제품 조회

\`\`\`
GET /api/products
\`\`\`

**응답 예시:**
\`\`\`json
[
  {
    "id":  1,
    "name":  "노트북",
    "description":  "고성능 노트북",
    "price": 1500000,
    "quantity": 10,
    "category": "전자기기",
    "createdAt": "2026-01-16T10:00:00",
    "updatedAt": "2026-01-16T10:00:00"
  }
]
\`\`\`

#### 2. 특정 제품 조회

\`\`\`
GET /api/products/{id}
\`\`\`

#### 3. 제품 생성

\`\`\`
POST /api/products
Content-Type: application/json

{
  "name": "마우스",
  "description": "무선 마우스",
  "price": 50000,
  "quantity": 100,
  "category": "악세서리"
}
\`\`\`

#### 4. 제품 수정

\`\`\`
PUT /api/products/{id}
Content-Type: application/json

{
  "name": "마우스",
  "description": "무선 마우스 (개선됨)",
  "price": 55000,
  "quantity": 95,
  "category": "악세서리"
}
\`\`\`

#### 5. 제품 삭제

\`\`\`
DELETE /api/products/{id}
\`\`\`

## 📁 프로젝트 구조

\`\`\`
spring-react-product-mng/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/productmng/
│   │   │       ├── controller/     # REST Controller
│   │   │       ├── service/        # Business Logic
│   │   │       ├── repository/     # Data Access Layer
│   │   │       ├── entity/         # JPA Entities
│   │   │       ├── dto/            # Data Transfer Objects
│   │   │       └── config/         # Configuration
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── frontend/
│   ├── src/
│   │   ├── components/   # React Components
│   │   ├── pages/        # Page Components
│   │   ├── services/     # API Services
│   │   └── App.tsx
│   └── package.json
├── build.gradle
├── settings.gradle
└── README.md
\`\`\`

## 🔐 보안

- 민감한 정보(데이터베이스 비밀번호 등)는 환경변수 또는 설정 파일로 관리하세요.
- Spring Security를 통한 인증/인가 구현
- JWT 토큰 기반 인증 권장

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👤 기여

버그 리포트, 기능 제안, PR은 언제든 환영합니다!

## 📞 연락처

질문이나 제안사항이 있으시면 이슈를 등록해주세요.
