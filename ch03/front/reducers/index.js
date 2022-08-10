import { HYDRATE } from 'next-redux-wrapper';

// 다른 reducer들 import
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

// user와 post의 initialState는 compbineReducers가 알아서 합쳐서 넣어줌
const rootReducer = combineReducers({
  // HYDRATE 사용을 위해 index reducer를 추가해줌
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return {
          ...state,
          ...action.paylload,
        };

      // ★★ 얘를 빠뜨리면 reducer 초기화 시 실행이 되는 경우 return값이 undefined가 됨
      default:
        return state;
    }
  },
  user,
  post,
});

// 아래에서 index reducer 1개만 추가된 것!
/* 
  const rootReducer = combineReducer({
    user,
    post
  })
*/

export default rootReducer;
