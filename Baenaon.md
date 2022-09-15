## Django-react 배달비 공유 웹 서비스 플랫폼 🔥
![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/67817682/190423845-b91b8fb0-585a-4ad1-bdc0-946c6a41e465.gif)
<br>

## ***Introduction*** ✔

<hr>

### ***Summary*** 🔽
> - Project 소개
>   - 배나온 (배달비 나눔 온라인 커뮤니티)
>   - JWT 기반 회원가입, 로그인 기능 구현
>   - 지역 커뮤니티 활성화를 위한 지역 게시판 구현
>   - 카카오 Map API를 이용하여 지역 게시판과 연동
>  
> - BACKEND(Djagno Authentication Server)
>   - Django를 이용하여 회원, 게시판 정보 저장용 REST API 서버 구현
>   - JWT를 이용하여 OAuth 2.0 Auth 프로토콜 기반으로 Authentication 및 Authorization 구현
> 
> - FRONTEND(React Webapp Client)
>   - React를 이용하여 로그인 및 회원가입, 게시판 CRUD 서비스용 Web App구현

### ***Requirments*** 🤔
> - BACKEND(Djagno Authentication Server)
>   - Python 3.7
>   - Django 3.2.15
>   - Django REST Famework 3.13.1
>   - Django REST Framework JWT 1.11.0
> 
> - FRONTEND(React Webapp Client)
>   - axios 0.27
>   - immer 9.0.15
>   - next 12.3.0
>   - next-redux-wrapper 7.0.5
>   - prettier 2.7.1
>   - react 18.2.0
>   - react-daum-postcode 3.1.1
>   - react-dom 18.2.0
>   - react-kakao-maps-sdk 1.1.3
>   - react-lottie-player ".4.3
>   - react-redux 8.0.2
>   - react-router-do 6.4.0
>   - react-sdk 0.0.0
>   - redux 4.2.0
>   - redux-devtools-extension 2.13.9
>   - redux-sag 1.2.1
>   - tailwindcss 3.1

> - DataBase
>   - Mysql 

<br>

### ***IDE*** 🥢
> - BACKEND
>   - Pycharm Professional
>   - VScode
>   
> - FRONTEND
>   - Intellij
>   - VScode

<br>

### ***Frontend Components***

> 1️⃣  레이아읏 관련 Components
>
>   | File Name | Directory              | 목적            |
>   | --------- | ---------------------- | --------------- |
>   | footer.js | /pages/ comonents/home | footer 레이아웃 |
>   | header.js | /pages/ comonents/home | header 레이아웃 |
>
> 2️⃣  로그인/회원가입 관련 Components
>
>    | File Name    | Directory | 목적                   |
>    | ------------ | --------- | ---------------------- |
>    | loginform.js | /pages/   | 사용자 로그인 페이지   |
>    | signup.js    | /pages/   | 사용자 회원가입 페이지 |
>    | logout.js    | /pages/   | 사용자 로그아웃 페이지 |
> 
> 3️⃣  게시판 관련 Components
>
>   | File Name      | Directory          | 목적                 |
>   | -------------- | ------------------ | -------------------- |
>   | [id].js        | /pages/ content/   | 게시글 페이지        |
>   | [id].js        | /pages/ postcards/ | 게시글 목록 페이지   |
>   | comment.js     | /pages/            | 댓글 컴포넌트        |
>   | commentForm.js | /pages/            | 댓글 쓰기 컴포넌트   |
>   | postCard.js    | /pages/            | 게시글 카드 컴포넌트 |
>   | postForm       | /pages/            | 게시글 쓰기 컴포넌트 |
>   
> 4️⃣  마이페이지 관련 Components
>
>   | File Name        | Directory | 목적                  |
>   | ---------------- | --------- | --------------------- |
>   | userprofile.js   | /pages/   | 마이페이지            |
>   | mypagepost.js    | /pages/   | 내가 쓴 글 컴포넌트   |
>   | mypagecomment.js | /pages/   | 내가 쓴 댓글 컴포넌트 |
>
> 5️⃣   지도 관련 Components
>
>   | File Name | Directory | 목적                                       |
>   | --------- | --------- | ------------------------------------------ |
>   | map.js    | /pages/   | 카카오 지도 api 활용 위치 마커 생성 페이지 |
>   
> 6️⃣ 상태관리 Reducers 관련 Components
>
>   | File Name | Directory  | 목적           |
>   | --------- | ---------- | -------------- |
>   | index.js  | /reducers/ | reducer        |
>   | signup.js | /reducers/ | 사용자 reducer |
>   | post.js   | /reducers/ | 게시글 reducer |
>
> 7️⃣ 상태관리 Sagas 관련 Components
>
>   | File Name | Directory | 목적        |
>   | --------- | --------- | ----------- |
>   | index.js  | /sgas/    | saga        |
>   | signup.js | /sgas/    | 사용자 saga |
>   | post.js   | /sgas/    | 게시글 sgag |
>   
### ***Backend End-points*** 
> Resource modeling(수정 예정)
> 
> 1️⃣ 회원 관련 API
> 
>   |  HTTP |  Path |  Method |  Permission |  목적 |
>   | --- | --- | --- | --- | --- |
>   |**POST** |/api/user/signup|CREATE| AllowAny |사용자 회원가입|
>   |**POST** |/api/user/signin|NONE| AllowAny |사용자 로그인, access_token 생성 및 반환|
> 
> 
> 2️⃣ 게시판 리소스 관련 API
> 
>   |  HTTP |  Path |  Method |  Permission |  목적 |
>   | --- | --- | --- | --- | --- |
>   |**GET** |/api/posts/|LIST| AllowAny |모든 게시글 목록 확인|
>   |**GET**, **PUT**, **DELETE** |/api/posts/<int:pk>/|RETRIEVE, UPDATE, DESTORY| Access_token or ReadOnly OR IsOwner |게시글 하나 확인, 수정, 삭제|
>   |**POST** |/api/posts/create/|CREATE| Access_token |게시글 생성|
>   |**POST** |/api/posts/<int:pk>/comments/create|CREATE| Access_token | 해당 게시글에 댓글 생성|
>   |**GET**, **PUT**, **DELETE**|/api/posts/<int:pk>/comments/|RETRIEVE, UPDATE, DESTORY| Access_token |댓글 확인, 수정, 삭제|
>   |**GET**|/api/posts/search/category/|LIST|AllowAny|카테고리별 검색|
>   
> 3️⃣ 지도 API
> 
>   |  HTTP |  Path |  Method |  Permission |  목적 |
>   | --- | --- | --- | --- | --- |
>   | **GET**|/api/map/|LIST|Access_token or ReadOnly| 사용자와 가까운 default 배달 픽업 장소 확인 |
>   | **GET**|/api/map/<int:pk>/posts/|LIST|Access_token or ReadOnly| 해당 배달 픽업 장소에 적힌 글 확인 |
 
<br>

### ***ERD*** 🏳

> ![image](https://user-images.githubusercontent.com/87630540/189979975-9192d16e-c126-474f-b389-3e92b5a249d3.png)

<br>

### ***process*** 🚀
>
> - **사용자 회원가입**
> 
> ![image](https://user-images.githubusercontent.com/95459089/190398676-09967fdf-7c9c-42d2-8462-eb24469d7fb9.png)
> 
> - 사용자 로그인
>
> ![image](https://user-images.githubusercontent.com/95459089/190398915-fb3c0fd9-1866-4507-b8f6-cad0e7172902.png)
>
> - 사용자 주변 희망하는 배달 픽업 장소 선택
>
> ![image](https://user-images.githubusercontent.com/95459089/190399063-2d3f2c94-b6c1-4f59-8bdf-8fac5cb71483.png)
>
> ![image](https://user-images.githubusercontent.com/95459089/190399219-ee6ce604-6c89-40c8-88ec-5ba6fbaabde6.png)
>
> - 희망하는 배달 픽업 장소에 달린 게시글 보기
>
> ![image](https://user-images.githubusercontent.com/95459089/190399343-8daadcc3-6b64-49cd-9ebf-1d4149721f12.png)
>
> ![image](https://user-images.githubusercontent.com/95459089/190399433-a0daad9b-f5e2-4dc9-a48d-04038f1dc482.png)
>
> - 공동 배달을 희망하는 게시글에 댓글 달기
>
> ![image](https://user-images.githubusercontent.com/95459089/190403943-091981e4-f2a2-4812-bbf0-30b0f7fa2001.png)
> 
> ![image](https://user-images.githubusercontent.com/95459089/190404057-8986a642-67d5-408b-b146-072bebcda5fb.png)
>
> - 게시글 만들기
>
> ![image](https://user-images.githubusercontent.com/95459089/190404415-690fbeb2-ea1d-443a-b9c7-9a4d9f347c86.png)
> 
> ![image](https://user-images.githubusercontent.com/95459089/190404522-ce9171fb-98c8-4244-8fa3-61af663267a9.png)
>
> - 마이페이지 
>
> ![image](https://user-images.githubusercontent.com/95459089/190406145-10696eb5-d58f-4091-8ba2-bc9243397a51.png)
>
> - 내가 쓴 글/ 내가 쓴 댓글 확인
>
> ![image](https://user-images.githubusercontent.com/95459089/190406249-4ad4f7ed-eeba-46d2-a496-1a5e0cd455b3.png)
>
> ![image](https://user-images.githubusercontent.com/95459089/190406324-f31d4d9f-6aa5-44ae-9766-c6c57c8d6d5e.png)
>
>
> - 로그

### Installation

**Frontend**
> <br>
> - 새로운 쉘 생성하여 frontend 디렉터리 `/frontend`로 이동

> ```bash
> $ cd frontend
> ```
>
> ```bash
> $ npm i next
> $ npm i next-redux-wrapper
> $ npm i redux
> $ npm i react-redux
> $ npm i redux-saga
> $ npm i redux-devtools-extension
> $ npm i --save react-lottie-player
> $ npm i react-router-dom
> $ npm i redux-devtools-extension
> $ npm i axios
> $ npm i immer
> $ npm i react-kakao-maps-sdk
> $ npm i react-daum-postcode
> ```


**Backend**
>
> <br>
> 
> **1. Baenaon repository clone**
> 
> ```bash
> git clone https://github.com/Baenaon/Baenaon/
> ```
> **2. backend 환경 설정**
>
> ```bash
> cd backend
> ```
> **2-1 가상환경 생성 및 실행**
>
> ```bash
> python -m venv venv
> venv/Scripts/activate
> ```
>
> **2-2 requirements 라이브러리 설치**
> 
> ```bash
> pip install -r requirements.txt
> ```
>
> **3. my_settings.py파일 생성 후 자신의 시크릿 키(장고, 카카오 API), 데이터베이스 넣기**
> 
> ![image](https://user-images.githubusercontent.com/87630540/190362704-92f72db2-09aa-4552-b0f7-4ebf542a16f7.png)
> 
> **4. 데이터 베이스에 반영**
> ```bash
>  python manage.py makemigrations 
>  ```
>  ```bash
>  python manage.py migrate
> ```
> 
> **5. 서버 실행**
>
> ```bash
> python manage.py runserver
> ```

