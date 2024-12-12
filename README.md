# 온라인 서점 웹 애플리케이션

이 프로젝트는 **React**를 사용해 개발된 온라인 서점 웹 애플리케이션입니다. 사용자는 책을 검색하고, 책 정보를 편집하고, 판매 수량을 확인할 수 있습니다. 또한, 책 추가/삭제 및 수량 조절 기능을 지원합니다. 백엔드는 **JSON Server**를 이용해 구현되었습니다.

---


## 설치 및 실행 방법


### 사전 준비

다음 소프트웨어가 설치되어 있어야 합니다.
- **Node.js** (v16 이상)

### 프로젝트 클론

```bash
git clone <repository-url>
cd <project-directory>
```


### 의존성 설치

다음 명령어로 필요한 패키지를 설치하세요.

```bash
npm install
```

### JSON Server 설정

1.	프로젝트 루트에 db.json 파일이 없으면 생성합니다.
2. db.json 파일에 초기 데이터를 추가합니다.
```bash
{
  "books": [
    {
      "id": 1,
      "title": "소년이 온다",
      "author": "한강",
      "quantity": 9,
      "image": "image-url"
    }
  ]
}
```
3. JSON Server를 실행합니다.


```bash
npx json-server --watch db.json --port 3001
```


### 애플리케이션 실행

React 개발 서버를 실행합니다

```bash
npm run dev
```