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

## 2. Redux 원리와 불변성

```javascript
// 중앙 저장소
{
  name: 'frenchkebab',
  age: 27,
  password: 'babo'
}

// data를 조회뿐 아니라 추가/수정 등을 하기 위해서는 action을 만들어 주어야 함

// action
{
  type: 'CHANGE_NICKNAME',
  data: 'germankebab'
}

// dispatch
// action을 dispatch하면 중앙저장소의 데이터가 바뀜
// (해당 데이터를 가져다쓰는 모든 컴포넌트들에서 name이 germankebab으로 바뀜)

// reducer -> action을 dispatch했을 때 어떻게 바꿀 것인지 동작 원리를 작성해놓음
switch(action.type) {
  case 'CHANGE_NICKNAME':
    return {
      ...state,
      name: action.data
    }

  case 'CHANGE_AGE':
    return {
      ...state,
      age: action.data
    }
}
```

### Redux가 귀찮은 이유

`action` 하나하나를 다 만들고, `reducer`도 하나하나 만들어주어야 하는 점이 코드가 굉장히 길어짐.
하지만 `action`들이 정렬되어 출력이 되기 때문에, 어느 부분에서 데이터가 잘못 변했는지 history를 통해서 확인할 수 있다.

`Switch`문이 줄줄줄 많은 단점이 있음. 하지만 `action`이 히스토리로 남음

### return문이 왜 저따구인지 - 불변성(immutability)

```javascript
// 객체를 새로 만들 경우 무조건 다른 객체
{} === {}; // false

// 객체를 '참조'할 경우 같은 객체
const a = [];
const b = a;
a === b; // true
```

```javascript
return {
  ...state,
  name: action.data,
};
```

의 경우 바꾸고 싶은 것만 바꾸고, 새로운 **object**를 만들어 준다.
(why? - 변경 내역을 추적하기 위해)

```javascript
const prev = { name: 'frenchkebab' };

const next = { name: 'junghyun' };
```

이렇게 새로 생성해 주어야 이전 기록들이 남는다.

하지만

```javascript
const next = prve;
next.name = 'junghyun';

prev.name; // 'junghyun'
```

이렇게 **참조**관계를 써 버리면 이전 상태의 히스토리를 추적할 수가 없다.

### 그럴거면 아예 ... 안썼으면 되는것 아님?

이렇게

```javascript
{
  name: action.data,
  age: 27,
  password: 'babo'
}
```

-> 이렇게 전체 다 쓰지 않고 ... 연산자를 쓰는 이유는 메모리를 아끼기 위해임!

```javascript
원본의 데이터가
{
  name: 'frenchkebab',
  age: 27,
  password: 'babo',
  posts: [{}, {}, {}]
}
```

이렇게 되는 경우 ... 을 쓰지 않는 경우 `posts` 내의 모든 객체를 새로 생성해버린다.

따라서 ... 연산자를 통해 바뀌는 부분만 바꾸어주고, 바뀌지 않는 부분은 그냥 참조관계를 유지하게끔 한다.

개발 모드일 경우에는 객체를 계속 새로 만들더라도 모든 action에 대한 히스토리를 갖고 있지만,
배포모드의 경우에는 히스토리를 중간중간 조금씩 버린다.
(히스토리를 유지한다는 것은 참조 관계를 계속 갖고 있다는 것)

따라서 배포 모드일 경우에는 메모리 문제가 생기지는 않는다.

... 연산자를 통해서 객체를 배열을 얕은 복사를 가져와도 redux는 새로운 객체로 인식하게 된다.

## 3. 리덕스 실제로 구현하기

`store/configureStore.js`

```javascript
import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';

import reducer from '../reducers/index';

const configureStore = () => {
  const store = createStore(reducer);
  store.dispatch({
    type: 'CHANGE_NICKNAME',
    data: '',
  });
  return store;
};

// debug 모드
const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
```

`reducers/index.js`

```javascript
const initialState = {
  name: 'frenchkebab',
  age: 27,
  password: 'babo',
};

const changeNickname = {
  type: 'CHANGE_NICKNAME',
  data: 'junghyun',
};

const changeNickname = {
  type: 'CHANGE_NICKNAME',
  data: '킴카누',
};

// (이전상태, 액션) => 다음상태를 return
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NICKNAME':
      return {
        ...state,
        name: action.data,
      };
  }
};

export default rootReducer;
```

```javascript
const changeNickname = (data) => {
  return {
    type: 'CHANGE_NICKNAME',
    data,
  };
};
```

이렇게 **action**을 하나하나 정의해 주기 번거로우므로 동적으로 data를 받아서 action을 생성해주는
`actionCreater`를 만든다.

이렇게 **actionCreator** 하나만 만들면 사용자가 원하는 대로 만들 수 있다

```javascript
store.dispatch(changeNickname('frenchkebab'));
```

### action을 만들어 dispatch 하면

**reducer**에 따라서 다음 상태가 나오고, 이전 상태와 다음 상태가 바뀌었다는 것이 확인되면,
알아서 해당 데이터를 사용하는 컴포넌트들에게 쫙 뿌려짐.

```javascript
const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpdata: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

const login = (data) => {
  return {
    type: 'LOG_IN',
    data,
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      // 불변성 때문에 코드가 좀 지저분해짐
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
  }
};
```

```javascript
const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsloggedIn] = useState(false);
```

이제 여기의 `isLoggedIn` state는 필요가 없어졌다!

### 이제 사용해보자

components/AppLayout.js

```javascript
import { useSelector } from 'react-redux'; // redux와 react를 연결해줌

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // state가 바뀌면 자동으로 컴포넌트 리렌더링

  ...

}
```

이제 `setIsLoggedIn` 이런 함수들 props로 더이상 넘겨줄 필요가 없어졌다.
