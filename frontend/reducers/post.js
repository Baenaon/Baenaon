import produce from "../util/produce";

export const initialState = {
  mainPosts: [],
  allPost: [],
  singlePost: null,
  postCards: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  allPostLoading: false,
  allPostDone: false,
  allPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
};

// 액션 변수 설정
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "ADD_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "ADD_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "ADD_POST_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LOAD_POSTCARDS_FAILURE = "LOAD_POSTCARDS_FAILURE";
export const LOAD_POSTCARDS_REQUEST = "LOAD_POSTCARDS_REQUEST";
export const LOAD_POSTCARDS_SUCCESS = "LOAD_POSTCARDS_SUCCESS";

export const LOAD_ALLPOST_REQUEST = "LOAD_ALLPOST_REQUEST";
export const LOAD_ALLPOST_SUCCESS = "LOAD_ALLPOST_SUCCESS";
export const LOAD_ALLPOST_FAILURE = "LOAD_ALLPOST_FAILURE";

// 액션 정의 addPost를 실행하면 ADD_POST_REQUEST 액션이 실행된다.
// export const addPost = (data) => ({
//   type: ADD_POST_REQUEST,
//   data,
// });

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// 이전 상태를 액션을 통해 다음 상태로 만들어 내는 함수 (불변성을 지키면서)
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REMOVE_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);

        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case LOAD_POSTCARDS_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POSTCARDS_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.postCards = action.data;
        break;
      case LOAD_POSTCARDS_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);

        // if (draft.mainPosts.length < 1) {
        //   console.log("통신", action.data);
        //   console.log("통신2", action.data.posts);
        //   draft.mainPosts = draft.mainPosts.concat(action.data);
        // }
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      case LOAD_ALLPOST_REQUEST:
        draft.allPostLoading = true;
        draft.allPostDone = false;
        draft.allPostError = null;
        break;

      case LOAD_ALLPOST_SUCCESS:
        draft.allPostLoading = false;
        draft.allPostDone = true;
        draft.allPost = draft.allPost.concat(action.data);
        // if (draft.allPost.length < 1) {
        //   draft.allPost = draft.allPost.concat(action.data);
        // }
        break;
      case LOAD_ALLPOST_FAILURE:
        draft.allPostLoading = false;
        draft.allPostError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        // const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        // post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
