// dummy data를 먼저 구성한 후에 action을 작성해나갈 것!
export const initialState = {
  // 다른 정보들과 합쳐지는 정보의 경우 대문자로 써줌
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'frenchkebab',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Commetns: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요~',
        },
        {
          User: {
            nickname: 'hero',
          },
          content: '얼른 사고 싶어요~',
        },
      ],
    },
  ],
  // mainpost 외
  imagePaths: [],
  // 게시글 추가가 완료되었을 때
  postAdded: false,
};

const ADD_POST = 'ADD_POST';

// action은 원래 객체다!
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: 'dummy',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    }

    default:
      return state;
  }
};

export default reducer;
