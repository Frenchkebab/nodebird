import { createWrapper } from 'next-redux-wrapper';
import { compose, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers/index';

const configureStore = () => {
  const middlewares = [];
  // 배포용일 경우 devtool 연결을 하지 않고, 개발용일 경우 devtools를 연결함 (history가 배포용일 경우 메모리가 조금씩 비워짐)
  const enhancer =
    process.env.NODE_ENV === 'productin'
      ? compose(applyMiddleware(...middlewares))
      : compose(composeWithDevTools(...middlewares));
  const store = createStore(reducer, enhancer);
  store.dispatch({
    type: 'CHANGE_NICKNAME',
    data: '',
  });
  return store;
};

// debug 모드
const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
