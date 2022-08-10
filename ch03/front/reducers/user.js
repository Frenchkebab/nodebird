import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  isLoggedIn: false,
  user: null,
  signUpdata: {},
  loginData: {},
};

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  };
};

export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      // 불변성 때문에 코드가 좀 지저분해짐
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      };

    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
