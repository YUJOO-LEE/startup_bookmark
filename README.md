# STARTUP BOOKMARK

<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typeScript&logoColor=white"/> <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/> <img src="https://img.shields.io/badge/Styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

## 정보
- 이유주
- lllllllllee@gmail.com
- gitHub: https://github.com/YUJOO-LEE/startup_bookmark
- 작업 기간 : 23/01/03 ~ 23/01/06

## 설치 및 실행

### 의존성 설치
```
yarn
```

### 실행
```
yarn start
```

## 특징

- index    
-- 로그인 상태에 따라 페이지를 이동하는 기능이 모든 페이지에서 필요하므로 `useMovePageWithLogin` 이라는 이름의 커스텀 Hook 을 만들고 전역에서 사용합니다.    
-- index 페이지 진입 시 로그인 상태에 따라 login 또는 startups 페이지로 이동합니다.

- 로그인    
-- 로그인 시 또는 App 재실행 시 쿠키에 값이 있다면, 로그인 된 상태이므로 전역으로 로그인 상태를 공유하고 `axios` 요청 시 `defaults.headers` 를 전송하도록 처리했습니다.    
-- api 에 `userinfo` 를 추가하여 로그인 상태일 경우 Header 에 유저 정보를 출력합니다.

- 회원가입    
-- input 입력값 및 항목별 error 값을 객체 상태로 관리해서 input 입력 시 또는 에러 처리 시 각각 공통된 하나의 함수를 실행합니다.    
-- 비밀번호 재입력 input 입력 시에만 확인 할 경우 원본 비밀번호가 변경되면 확인이 되지 않아, 원본 비밀번호가 변경될 경우 실시간으로 동일 여부를 확인합니다.    
-- 가독성을 위해 약관 동의 컴포넌트를 분리하였습니다.    
-- 단순히 컴포넌트를 출력하는 것이 아닌, 에러 상태를 공유해 컴포넌트 출력된 상태에서도 에러값이 있다면 회원가입이 되지 않도록 처리했습니다.

- 스타트업 리스트    
-- `IntersectionObserver` 와 react-query 의 `useInfiniteQuery` 를 활용해서 무한 스크롤을 구혔했습니다.    
-- `Intersection` 상태 값을 다른 컴포넌트에서도 재사용할 수 있도록 `useIntersecting` 이라는 이름의 커스텀 Hook 으로 분리했습니다.    
-- `fetchNextPage` 이 불필요하게 중복호출 되지 않도록 `(!isSuccess || isLoading)` 등의 조건을 추가하였습니다.    
-- 스타트업 리스트 아이템은 반복되는 컴포넌트이므로 별도 분리 하였습니다.    
-- 북마크 아이콘은 저장 여부에 따라 class를 지정했고, 클릭 시 저장이 성공하면 toggle 되도록 처리하였습니다.

- 북마크 리스트    
-- 북마크된 리스트를 출력하며 스타트업 리스트와 구조/기능적으로 유사합니다.

- 반응형    
-- default : 스타트업 리스트 한줄에 4개 출력합니다.    
-- 640px미만 : 스타트업 리스트 한줄에 2개 출력하며, 모바일 디자인으로 변경합니다.    
-- 360px미만 : 스타트업 리스트 한줄에 1개 출력합니다.    

## Dependencies

- @tanstack/react-query : 서버 값 캐싱, 업데이트를 편리하게 하고, Infinite Queries 기능으로 무한스크롤을 구현했습니다.
- axios : defaults headers 설정을 사용했습니다.
- recoil : 로그인 상태를 전역으로 관리했습니다.
- react-router-dom : 필요한 기능에 따라 페이지를 분리했습니다.
- vite-plugin-next-react-router : router 를 next 스타일로 편리하게 관리했습니다.

## 폴더 구조

```
src
├── asset
│   ├── bookmark.tsx : 북마크 svg 컴포넌트 (startups/bookmark 에서 사용)
│   ├── globalStyles.ts : 전역 style
│   ├── onKeyEnter.ts : input 에서 enter 입력 시 선택한 요소 focus (login/signup 에서 사용)
│   ├── types.ts : 회원가입 내 input 입력값 및 error 출력값 저장 객체 타입
│   └── validation.tsx : 입력 형식 검증 (login/signup 에서 사용)
├── components
│   ├── Terms.tsx : 약관 동의 및 회원가입 처리
│   ├── CloseBtn.tsx : 닫기 버튼 (Header/Terms 에서 사용)
│   ├── HamburgerBtn.tsx : 햄버거 버튼
│   ├── MobileNav.tsx : 햄버거 버튼 클릭 시 출력되는 모바일 메뉴
│   ├── SelectBox.tsx : 회원가입 내 스타트업 선택 부분
│   ├── StartupList.tsx : 스타트업 리스트 배열 데이터 출력
│   ├── BookmarkList.tsx : 북마크한 스타트업 리스트 배열 데이터 출력
│   └── StartupItem.tsx : 개별 스타트업 아이템 요소
├── hooks
│   ├── useIntersecting.ts : 원하는 요소 isIntersecting 상태 반환 커스텀 Hook
│   └── useMovePageWithLogin : 로그인 상태에 따라 원하는 페이지로 이동 (전역 사용)
├── pages
│   ├── _layout.tsx : 전역 레이아웃
│   ├── index.tsx : 인덱스 (로그인 상태에 따라 login/startups 페이지로 이동)
│   ├── signup.tsx : 회원가입
│   ├── login.tsx : 로그인
│   ├── startups.tsx : 스타트업 리스트
│   └── bookmark.tsx : 북마크 리스트
├── recoil
│   └── userState.ts : 로그인 정보 상태 관리 atom
├── App.tsx : Route element 출력
├── main.tsx : React Dom 요소 render
└── routes.tsx : routes 반환 (vite-plugin-next-react-router 플러그인 자동 생성파일)
```

<hr/>
<br />
