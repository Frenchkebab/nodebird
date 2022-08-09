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