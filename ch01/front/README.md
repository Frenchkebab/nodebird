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

## antd 커스텀하기

### `style={{ marginTop: 10 }}` 이렇게 객체로 넣지 말 것

```javascript
{} === {}; // false
```

객체끼리는 생긴 것만 같게 나오고, 모든 객체는 서로 다름
-> 객체때문에 컴포넌트가 리렌더링되는 일이 생김

따라서 그냥 style을 위한 컴포넌트를 새로 하나 만드는 것이 낫다!

```javascript
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`; // 해당 스타일이 적용된 div 컴포넌트가 생김
```

하지만 성능에 크게 영향이 없다면 그냥 인라인 스타일 써도 된다.
너무 집착할 필요는 없음!

### antd의 컴포넌트 커스텀하기

```javascript
<Input.Search enterButton style={{ verticalAlign: 'middle' }} />
```

얘도 이렇게 style을 덮어 씌울 수 있음

```javascript
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
```

### styled component를 사용하고 싶지 않을 경우 -> useMemo 사용

```javascript
const style = useMemo(() => ({ marginTop: 10 }), []);
```

이런 식으로 하면 리렌더링이 되더라도 같은 객체가 유지됨!

### 함수형 컴포넌트의 리렌더링

함수형 컴포넌트에서는 컴포넌트 함수의 안의 부분이 다시 실행된다.

`useCallback`, `useMemo` 등은 이전과 동일하므로 바뀐게 없다고 인식함.

근데 `return`되는 부분에 이전 상태에서 **바뀌는 부분**이 있다면 그 부분만 다시 그려준다.

여기서 `style={{}}`을 쓴다면, `{}` 부분이 이전과 다른 객체로 인식하여 다시 그리게 된다.

하지만 스타일은 바뀔 필요가 없으므로 `styled-component` 혹은 `useMemo`를 사용하여 다시 렌더링이 되지 않도록 한다.

(여기서 return 부분을 **Virtual Dom**이라고 생각하면 됨. 이전 compomnent의 **Virtual Dom**과 이후의 **Virtual Dom**을 비교함)

따라서 리렌더링 자체를 신경쓸 필요는 없고 실제적으로 달라진 부분이 무엇인지를 생각하면 된다.

## 더미데이터로 로그인하기

```javascript
<Form onFinish={onSubmitForm}>...</Form>
```

`Form`은 **submit**이 되면 `onFinish`함수가 호출됨
