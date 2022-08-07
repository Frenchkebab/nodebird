# Section3. Reudx 연동하기

## 1. Redux 설치와 소개

### 설치

`npm i next-redux-wrapper`
`npm i redux`

### configure 파일

`store/configureStore.js`

```javascript
import { createWrapper } from 'next-redux-wrapper';

const configureStore = () => {};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
```

`debug` 부분이 `true`이면 좀 더 **redux**에 관해서 자세한 설명이 나오므로, 개발 시에는 `debug`를 `true`로 드는 것이 편함!

### next에서는

이전에는

```javascript
<Provider store={store}>
  <Head>
    <meta charSet="utf-8" />
    <title>NodeBird</title>
  </Head>
  <Component />
</Provider>
```

이렇게 `Provider`로 감싸주었지만, **Next**에서는 이렇게 감싸주지 않음!
(Provider는 `react-redux`에 있음)

### Redux/Mobx 등을 왜 써야하는가, ContextAPI로 둘이 대체되지 않는가?

`LoginForm`이나, `Signup`, `Profile` 페이지 등에서 공통적으로 **로그인 계정 정보**가 들어가게 된다.
(로그인한 사람 닉네임, 계정정보 등)

여러 컴포넌트에서 데이터를 사용하고 싶은데 컴포넌트가 분리되어 있으면 데이터가 흩어져야 하고,
데이터를 흩어지지 않게 하고싶으면 부모 컴포넌트에게 받아서 각각의 자식에게 보내주어야 하므로 매번 이렇게 하기에는 굉장히 귀찮다.

이런 것들을 **중앙**에서 하나로 관리해서 컴포넌트에게 뿌려주는 **중앙 데이터 저장소** 역할을 하는 것이 `Redux`이다.

**ContextAPI**, **Redux**, **Mobx**, **Apollo** 등을 사용한다.

이런 중앙 데이터 저장소를 갖고있지 않으면 굉장히 프로젝트가 복잡해진다.

가장 많이 사용하는 것이 `Redux`, 그 다음 익숙해지면 `Mobx`를 보통 가장 많이 쓴다.
(프로젝트가 간단하면 그냥 `ContextAPI`를 사용)

### Redux

에러가 발생했을 떄 해결하기가 쉬움 (추적이 잘됨).

대신에 `Redux`를 쓰면 코드량이 많아진다.

### Mobx

코드양이 적고, 작성하기가 쉬움.
하지만 에러를 추적하기가 어려움.

### ContextAPI와의 차이

`Redux`, `Mobx`와 `ContextAPI`의 차이는 **비동기 처리**가 쉬운지의 여부이다.
비동기로 서버에서 데이터를 주고받을 때에는 항상 **실패**에 대비해야 한다.

비동기를 다룰 때에는 항상 3단계로 나뉜다.

1. 데이터 요청
2. 데이터 받기
3. 데이터 전송 실패

위의 3단계를 모두 구현을 해주어야 하는데, 보통 `ContextAPI`의 경우 `useEffect`를 사용하여 다음과 같이 많이 사용한다.

```javascript
useEffect(() => {
  axios.get('/data').
  then(()=> {
    setState(data)
  }).catch(()=>{
    setError(errorL;)
  })
})
```

이렇게 컴포넌트에 들어가게 된다.

개인적으로는 컴포넌트는 화면을 그려주는 것만 집중하는 것이 맞음.

이렇게 **데이터**까지 다루는 것은 컴포넌트의 역할이라 하기에는 좀...

그리고 만약 여기서도 데이터를 가져오고, 로그인폼 등에서도 데이터를 가져오고 하면 중복이 발생한다.

`Redux`, `Mobx` 등을 두고 거기서 데이터를 주고받는 것이 좋다.

따라서 화면을 그리는 것을 비즈니스 로직과 분리하여 데이터를 중앙 저장소에서 관리한다.
(프로젝트가 커지면 중앙 데이터 저장소가 너무 커지므로 적절히 중앙 데이터 저장소롤 쪼개주는 것도 중요한데
`Redux`는 Reducer를 통해서 쪼개줄 수 있음!)
