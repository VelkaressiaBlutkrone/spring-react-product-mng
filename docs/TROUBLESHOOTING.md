# 문제 해결 가이드 (Troubleshooting Guide)

본 문서는 프로젝트 개발 중 발생하는 문제와 해결 방법을 정리한 문서입니다.

---

## TypeScript/React 관련 문제

### 문제: JSX 태그에 'react/jsx-runtime' 모듈 경로가 필요하지만 찾을 수 없음

**에러 메시지:**
```
This JSX tag requires the module path 'react/jsx-runtime' to exist, but none could be found. 
Make sure you have types for the appropriate package installed.
```

**원인:**
- TypeScript가 React의 JSX 런타임 타입을 찾지 못함
- `tsconfig.json`의 `types` 배열에 React 타입이 명시되지 않음
- `jsxImportSource` 설정이 누락됨

**해결 방법:**

#### 1. tsconfig.app.json 수정

`front_end/tsconfig.app.json` 파일의 `compilerOptions`에 다음을 추가/수정:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "skipLibCheck": true
  }
}
```

**중요**: `types` 배열에 "react", "react-dom"을 명시적으로 추가하지 않아도 됩니다. 
`skipLibCheck: true`가 설정되어 있으면 타입 체크를 건너뛰고, 
`jsxImportSource: "react"`가 설정되어 있으면 React의 JSX 런타임을 올바르게 사용합니다.

#### 2. node_modules 설치 확인 및 재설치

**먼저 node_modules가 설치되어 있는지 확인:**

```bash
cd front_end
ls node_modules  # Linux/Mac
dir node_modules  # Windows
```

**설치되어 있지 않거나 오류가 있는 경우 재설치:**

터미널에서 다음 명령어 실행:

```bash
cd front_end
rm -rf node_modules package-lock.json
npm install
```

또는 Windows PowerShell:

```powershell
cd front_end
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install
```

**중요**: `@types/react`와 `@types/react-dom`이 제대로 설치되었는지 확인:

```bash
npm list @types/react @types/react-dom
```

설치되어 있지 않으면:

```bash
npm install --save-dev @types/react @types/react-dom
```

#### 3. TypeScript 서버 재시작

VS Code나 IDE에서:
- `Ctrl + Shift + P` (또는 `Cmd + Shift + P` on Mac)
- "TypeScript: Restart TS Server" 실행

#### 4. 확인 사항

- `package.json`에 `@types/react`와 `@types/react-dom`이 `devDependencies`에 포함되어 있는지 확인
- React 버전과 `@types/react` 버전이 호환되는지 확인 (React 19는 `@types/react@^19.2.5` 필요)

**해결 완료 확인:**
- IDE에서 JSX 구문 오류가 사라짐
- `npm run build` 또는 `npm run dev` 실행 시 오류 없이 빌드됨
- 브라우저에서 React 앱이 정상적으로 렌더링됨

**참고**: 
- `vite/client` 타입 오류가 나타나더라도 `skipLibCheck: true` 설정으로 인해 실제 빌드에는 영향을 주지 않습니다.
- `node_modules`가 설치되어 있으면 이 오류는 발생하지 않습니다.

---

## CORS 관련 문제

### 문제: 프론트엔드에서 API 호출 시 CORS 오류 발생

**에러 메시지:**
```
Access to XMLHttpRequest at 'http://localhost:8080/api/products' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

**원인:**
- 백엔드 CORS 설정이 프론트엔드 도메인을 허용하지 않음
- Security 설정이 CORS를 차단함

**해결 방법:**

#### 1. CorsConfig 확인

`src/main/java/com/example/spm/global/config/CorsConfig.java` 파일 확인:

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // 개발 환경: 모든 origin 허용
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}
```

#### 2. SecurityConfig 확인

`SecurityConfig`에서 CORS 필터가 적용되는지 확인:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // ... 기타 설정
        return http.build();
    }
}
```

#### 3. 프론트엔드 API URL 확인

`front_end/src/services/api/productApi.ts`에서 API 베이스 URL 확인:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
```

환경 변수 설정 (`.env` 파일):
```
VITE_API_BASE_URL=http://localhost:8080
```

---

## 빌드 관련 문제

### 문제: Gradle 빌드 실패

**에러 메시지:**
```
Execution failed for task ':compileJava'
```

**해결 방법:**

#### 1. Gradle 캐시 정리

```bash
./gradlew clean
./gradlew build --refresh-dependencies
```

#### 2. QueryDSL 생성 확인

QueryDSL Q 클래스가 생성되지 않은 경우:

```bash
./gradlew clean
./gradlew compileJava
```

생성된 파일 확인: `build/generated/querydsl/`

#### 3. Java 버전 확인

`build.gradle`에서 Java 버전 확인:

```gradle
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}
```

시스템 Java 버전 확인:
```bash
java -version
```

---

## 프론트엔드 빌드 문제

### 문제: Vite 빌드 실패

**에러 메시지:**
```
Failed to resolve import
```

**해결 방법:**

#### 1. 의존성 재설치

```bash
cd front_end
rm -rf node_modules package-lock.json
npm install
```

#### 2. Vite 캐시 정리

```bash
cd front_end
rm -rf node_modules/.vite
npm run dev
```

#### 3. TypeScript 타입 확인

```bash
cd front_end
npm run build
```

타입 오류가 있으면 수정 후 재빌드

---

## 데이터베이스 연결 문제

### 문제: 데이터베이스 연결 실패

**에러 메시지:**
```
Communications link failure
```

**해결 방법:**

#### 1. application.properties 확인

`src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/product_mng
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

#### 2. 데이터베이스 서버 실행 확인

MySQL이 실행 중인지 확인:
```bash
# Windows
net start MySQL80

# Linux/Mac
sudo systemctl start mysql
```

#### 3. 데이터베이스 생성

```sql
CREATE DATABASE IF NOT EXISTS product_mng;
```

---

## 포트 충돌 문제

### 문제: 포트가 이미 사용 중

**에러 메시지:**
```
Port 8080 is already in use
```

**해결 방법:**

#### 1. 사용 중인 포트 확인

Windows:
```powershell
netstat -ano | findstr :8080
```

Linux/Mac:
```bash
lsof -i :8080
```

#### 2. 프로세스 종료

Windows:
```powershell
taskkill /PID <PID> /F
```

Linux/Mac:
```bash
kill -9 <PID>
```

#### 3. 포트 변경

`application.properties`:
```properties
server.port=8081
```

---

## 일반적인 문제 해결 절차

1. **에러 메시지 확인**: 정확한 에러 메시지와 스택 트레이스 확인
2. **로그 확인**: 
   - 백엔드: `logs/application.log`, `logs/error.log`
   - 프론트엔드: 브라우저 콘솔, 개발자 도구
3. **의존성 확인**: 
   - 백엔드: `build.gradle` 의존성 버전
   - 프론트엔드: `package.json` 패키지 버전
4. **캐시 정리**: 
   - Gradle: `./gradlew clean`
   - npm: `rm -rf node_modules && npm install`
5. **재시작**: IDE, 서버, 개발 서버 재시작

---

## 문제 해결 체크리스트

- [ ] 에러 메시지를 정확히 읽고 이해했는가?
- [ ] 관련 로그 파일을 확인했는가?
- [ ] 의존성 버전이 호환되는가?
- [ ] 캐시를 정리했는가?
- [ ] 서버/개발 서버를 재시작했는가?
- [ ] 환경 변수 설정이 올바른가?
- [ ] 포트가 충돌하지 않는가?
- [ ] 데이터베이스 연결이 정상인가?

---

## 추가 도움말

문제가 지속되면:
1. 이 문서의 관련 섹션을 다시 확인
2. 프로젝트의 `README.md` 확인
3. 관련 기술 문서 참조:
   - [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
   - [React 공식 문서](https://react.dev)
   - [TypeScript 공식 문서](https://www.typescriptlang.org)
   - [Vite 공식 문서](https://vitejs.dev)

---

## 문제 해결 이력

| 날짜 | 문제 | 해결 방법 | 작성자 |
|------|------|----------|--------|
| 2024-01-XX | JSX 태그에 'react/jsx-runtime' 모듈 경로 오류 | tsconfig.app.json에 types 및 jsxImportSource 추가 | - |
