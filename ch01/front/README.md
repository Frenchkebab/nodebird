### pages 폴더는 무조건 이름이 pages

`Next`가 pages 폴더를 인식해서 안에 있는 파일들을 codesplitting이 된 개별적인 파일로 만들어줌

### proptyes

`npm i prop-types` 로 설치해 주어야 함!

### 처음 누를때는 느리다

처음 빌드를 하고 나서 `Link` 태그를 누르면 살짝 느리게 느껴지는데
개발모드라서 그럼.

배포 전 Production 모드로 가면 그런 증상이 사라진다!

### ESlint

`npm i -D eslint`

`npm i -D eslint-plugin-import`

`npm i -D eslint-plugin-react-hooks`

### AppLayout과 \_app.js

`Layout`의 경우 일부 공통 (컴포넌트로 감싸주는 경우),
`_app`의 경우 pages의 모든 페이지 컴포넌트에 공통적으로 들어감

### Head 수정하기

`_app.js`

```javascript
import Head from 'next/head';

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};
```

이렇게 `head` 태그의 내용을 수정할 수 있다.

개별 수정을 원할 경우 `pages/` 안의 개별 컴포넌트에 설정을 해주면 됨

### 프론트 레이아웃 원칙

1. Row를 먼저 나누고 그 안에서 Col을 나눌 것
2. Mobile 먼저 구현하고 Desktop으로 순차적으로 커지게끔 할 것

`xs`: mobile
`sm`: tablet
`md`: small desktop

```javascript
<Col xs={24} md={6} />
```

: 모바일일 경우 24칸 다 차지, 데스크탑일 경우 6/24 (1/4) 만 차지

```javascript
  <Col xs={24} md={6} />
  <Col xs={24} md={12} />
  <Col xs={24} md={6} />
```

: 모바일일 경우 3줄 -> 데스크탑일 경우 한 줄에 1 : 2 : 1 로 한줄에 들어감

### gutter

: column들이 너무 따닥따닥 붙어있지 않도록 간격을 주는 것

```javascript
<Row gutter={8}></Row>
```

### 새 창에서 띄우기

```javascript
<a href="https://github.com/frenchkebab" target="_blank" rel="_noreferrer noopener">
  Made by frenchkebab
</a>
```

보안을 위해 `rel="_noreferrer noopener"`을 추가해줌!
