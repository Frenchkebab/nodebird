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
