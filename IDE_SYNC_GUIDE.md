# IDE 동기화 가이드 - Spring Security 의존성 오류 해결

## VS Code (현재 사용 중인 IDE)

### 방법 1: Java Language Server 재시작
1. **명령 팔레트 열기**: `Ctrl + Shift + P` (또는 `Cmd + Shift + P` on Mac)
2. **명령 실행**: `Java: Clean Java Language Server Workspace`
3. **확인**: "Clean workspace and reload?" → `Restart and delete`

### 방법 2: Gradle 프로젝트 새로고침
1. **명령 팔레트 열기**: `Ctrl + Shift + P`
2. **명령 실행**: `Java: Reload Projects`
3. 또는 `Java: Build Workspace` 실행

### 방법 3: VS Code 재시작
1. VS Code 완전 종료
2. 프로젝트 폴더 다시 열기
3. 자동으로 Gradle 동기화 진행됨

### 방법 4: 수동 Gradle 동기화 (터미널)
```bash
# 프로젝트 루트에서 실행
./gradlew clean build --refresh-dependencies
```

## IntelliJ IDEA

### 방법 1: Gradle 프로젝트 새로고침
1. **Gradle 도구 창 열기**: `View` → `Tool Windows` → `Gradle`
2. **새로고침 버튼 클릭**: Gradle 도구 창 상단의 새로고침 아이콘 클릭
3. 또는 프로젝트 루트 우클릭 → `Gradle` → `Refresh Gradle Project`

### 방법 2: 프로젝트 동기화
1. **File** → **Sync Project with Gradle Files**
2. 또는 단축키: `Ctrl + Shift + O` (Windows/Linux) 또는 `Cmd + Shift + I` (Mac)

### 방법 3: Invalidate Caches
1. **File** → **Invalidate Caches...**
2. **Invalidate and Restart** 선택

## Eclipse

### 방법 1: Gradle 프로젝트 새로고침
1. 프로젝트 우클릭
2. **Gradle** → **Refresh Gradle Project**

### 방법 2: 프로젝트 클린
1. **Project** → **Clean...**
2. 프로젝트 선택 후 **Clean** 클릭

## 공통 해결 방법

### 1. Gradle 의존성 강제 새로고침
```bash
# Windows PowerShell
cd d:\workspace\spring-react-product-mng
./gradlew clean build --refresh-dependencies

# 또는
./gradlew --refresh-dependencies
```

### 2. .gradle 캐시 삭제 (필요시)
```bash
# 프로젝트 루트의 .gradle 폴더 삭제
Remove-Item -Recurse -Force .gradle

# 다시 빌드
./gradlew clean build
```

### 3. Java Extension Pack 확인 (VS Code)
VS Code에서 다음 확장이 설치되어 있는지 확인:
- **Extension Pack for Java** (Microsoft)
- **Gradle for Java** (Microsoft)

## 확인 방법

동기화가 완료되었는지 확인:
1. **터미널에서 컴파일 확인**:
   ```bash
   ./gradlew compileJava
   ```
   `BUILD SUCCESSFUL`이 나오면 정상

2. **IDE에서 확인**:
   - SecurityConfig.java 파일에서 Spring Security import에 빨간 줄이 사라졌는지 확인
   - 자동 완성(Ctrl + Space)이 작동하는지 확인

## 문제가 지속되는 경우

1. **Java 버전 확인**:
   ```bash
   java -version
   ```
   Java 21이 필요합니다 (Spring Boot 4.0.1 요구사항)

2. **Gradle 버전 확인**:
   ```bash
   ./gradlew --version
   ```

3. **의존성 확인**:
   ```bash
   ./gradlew dependencies --configuration compileClasspath | findstr security
   ```
   `spring-security-config:7.0.2`가 보여야 합니다
