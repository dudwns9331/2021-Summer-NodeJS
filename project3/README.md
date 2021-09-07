# 프로젝트 : 웹소켓을 통한 실시간 인터랙션 구현

## 요구사항 설정과 프로젝트 설계

### 요구사항

- 간단한 실시간 채팅 서비스를 만든다.
- 인증 처리는 하지 않는다.
- 데이터베이스에 채팅 내역을 저장해 활용한다.

<br/>

- 해당 페이지에 접속하면 채팅을 보여주는 UI 를 갖는다.
- 메세지를 입력하는 창이 있고 챝이을 보내는 버튼이 있다.

<br/>

- 닉네임은 자동 지정되도록 한다.
- 웹소켓을 통해서 서버와 클라이언트가 통신하도록 한다.
- 웹 프레임워크는 Koa 를 사용한다. [https://koajs.com/]

<br/>

### 프로젝트 설계

**Frontend**

- Template engine : Pug
- CSS Framework : TailwindCSS

<br/>

**Backend**

- Web framework : Koa
- Live networking : koa-websocket
- Database : MongoDB
