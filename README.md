# 프로젝트 미리보기

<img src="https://user-images.githubusercontent.com/68889162/103621333-6428d700-4f78-11eb-9d53-a2524cf8e843.png" title="로그인 회원가입 사진" alt="로그인 회원가입 사진"></img>

<img src="https://user-images.githubusercontent.com/68889162/103621613-d00b3f80-4f78-11eb-86f0-5986af745445.png" ></img>

<img src="https://user-images.githubusercontent.com/68889162/103621714-f630df80-4f78-11eb-80d9-ba9c9bc7d522.png"></img>

<img src="https://user-images.githubusercontent.com/68889162/103621778-0fd22700-4f79-11eb-9318-4034bf6a7551.png"></img>

<img src="https://user-images.githubusercontent.com/68889162/103621837-27111480-4f79-11eb-86ca-2d89c2e459b0.png"></img>

<img src="https://user-images.githubusercontent.com/68889162/103621909-4ad45a80-4f79-11eb-8b63-1ea0ad6d79d5.png"></img>

<img src="https://user-images.githubusercontent.com/68889162/103621928-4f990e80-4f79-11eb-8182-3ee543f39eee.png"></img>

<img src="https://user-images.githubusercontent.com/68889162/103621934-51fb6880-4f79-11eb-8cf6-66aa675f60ae.png"></img>

# 프로젝트 기획 배경

GelPOS라는 이름은 위장약인 겔포스와 판매관리시스템인 POS의 합성어로 여러기능들을 복잡하게 표현되어있는 기존
포스기 때문에 힘들었을 이용자들에게 기능들을 편리하게 구현해줌으로써 약 겔포스처럼 편안을 주자는 의미에서 사이트명을
"GelPOS"로 선정하게 되었다.

# GelPOS 장점

## 1. 접근성

```
 기존 포스기는 별도로 기계를 구매해야 하는 다소 불편안 접근성을 가지고 있다.
 하지만, GelPOS는 웹사이트에서 로그인을 통해 기능들을 쉽게 사용할 수 있다는 쉬운 접근성을 가지고 있다.
```

## 2. 편리한 UI

```
 포스기를 주로 터치스크린에서 사용하고 가게특성상 바쁜 시간때가 많기 때문에
 보기 편하고 사용하기 쉽게 UI를 구성 하였다.
```

# GelPOS 실행

- 백엔드 실행

  ```
   폴더명 : blog-backend

   $ npm start:dev
   or
   $ yarn start:dev
  ```

- 프론트엔드 실행

  ```
  폴더명 : front-react

   $ npm start
   or
   $ yarn start
  ```

# GelPOS 간단 설명

#### Front-end

- ReactJS(함수형컴포넌트)
- redux
- react bootstrap
- styled-components
- redux-saga

#### Back-end

- API server API 명세서
- Node.js
- Koa
- JWT
- socket.id
- MongoDB

# GelPOS 기능 설명

### - 회원

- 회원가입
  - nodemailer를 통해 인증번호를 이메일로 전송하여 인증
  - 정규표현식에 맞춰 각각 input을 올바르게 작성해야 회원가입 가능
  - 아이디, 이메일은 데이터베이스에 존재하는지 검색 후 중복검사
- 로그인
  - 아이디와 비밀번호가 존재하고 일치하는지 검사
- 아이디 찾기
  - 이메일 코드인증을 통해 아이디 찾기
- 비밀번호 변경
  - 이메일 코드인증 후 정규표현식에 맞춰 비밀번호 변경

### - 가게 리스트

- 가게추가
  - 중복상관없이 가게이름, 사업자등록번호, 가게주소 입력을 통해 가게추가
- 가게 리스트
  - 지금까지 생성된 가게를 보여주고 가게버튼을 클릭시 가게포스트로 입장

### - 테이블

- 테이블
  - 테이블 설명

### - 스케줄

- ToastCalender API 사용

- Create

  - 일정, 예약 두 가지 종류로 시간,기간을 정해 추가

- Read

  - Allday, time을 구분해서 표현해주는게 다름
  - 추가한 스케줄을 클릭시 일정, 예약 제목,내용, 시간,기간 확인

- Update

  - Allday, time을 수정
  - 추가한 스케줄을 클릭시 일정, 예약 제목,내용, 시간,기간을 수정 가능

- Delete
  - 추가한 스케줄 삭제

### - 거래내역

- 거래내역
  - 거래내역 설명

### - 가게정보

- 가게정보
  - 가게이름, 가게 주소, 사업자등록번호, 가입 날짜 표현
  - 카테고리, 테이블 수정 버튼을 누르면 자연스럽게 오른쪽으로 넘어간다.

### - 카테고리, 메뉴

- Create

  - 추가 버튼을 눌러 카테고리 이름 추가 (model)
  - 메뉴를 만들 카테고리를 눌러 메뉴버튼을 누른 후 메뉴 이름, 가격 입력 후 추가 (model)

- Read

  - 추가한 카테고리 보여줌
  - 카테고리를 클릭해 클릭한 카테고리에 속한 메뉴 이름을 보여줌
  - 추가한 메뉴를 누르면 수정 model 에서 이름, 가격을 보여줌 (model)

- Update

  - 수정 버튼을 통해 카테고리 이름 변경 가능 (model)
  - 메뉴의 이름 가격 수정 가능 (model)

- Delete
  - 추가한 카테고리 삭제 안에 속한 메뉴도 다 같이 삭제 (model을 통해 삭제여부 재차확인)
  - 추가한 메뉴 삭제 (model을 통해 삭제여부 재차확인)
