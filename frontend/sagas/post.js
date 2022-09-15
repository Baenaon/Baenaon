import axios from "axios";
import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";

import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_ALLPOST_FAILURE,
  LOAD_ALLPOST_REQUEST,
  LOAD_ALLPOST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  LOAD_POSTCARDS_FAILURE,
  LOAD_POSTCARDS_REQUEST,
  LOAD_POSTCARDS_SUCCESS,
} from "../reducers/post";

//게시글 올리기
function addPostAPI(data) {

  const access = window.localStorage.getItem("access_token");
  
  return axios.post("http://127.0.0.1:8000/api/posts/create/", data.send, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}

function refreshToken(){
  const refresh = window.localStorage.getItem("refresh_token");
  return axios.post("http://127.0.0.1:8000/api/user/refresh/", {
    refresh : refresh
  });
}


function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    window.localStorage.setItem('post_success', "true");
  } catch (err) {
    console.error(err);
    if(err.response.status == 403){
      try{
        const result1 = yield call(refreshToken);
        
        window.localStorage.setItem('access_token', result1.data.access);
   
        yield call(addPostAPI, action.data);
        action.data.access_token = result1.data.access;
        window.localStorage.setItem('post_success', "true");
      } catch (err){
        console.log("로그인 페이지로 돌아가!")
        window.localStorage.clear();
        yield put({
          type: ADD_POST_FAILURE,
          error: err.response.data,
        });
      }
    }
  
  }
}

// 게시글들 불러오기

function loadPostsAPI(data) {
  return axios.get(`http://127.0.0.1:8000/api/map/${data}/posts`);
}

function* loadPosts(action) {
  try {
    console.log();
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`http://127.0.0.1:8000/api/posts/${data.id}`, {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

//댓글 추가
function addCommentAPI(data) {
  const access = window.localStorage.getItem("access_token");
  return axios.post(
    `http://127.0.0.1:8000/api/posts/${data.id}/comments/create/`,
    data.send,
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  ); // POST /post/1/comment
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
    window.localStorage.setItem("comment_success", "true");
  } catch (err) {
    if(err.response.status == 403){
      try{
        const result1 = yield call(refreshToken);
        yield put({
          type: ADD_COMMENT_FAILURE,
          error: err.response.data,
        });
        console.log("갱신된 엑세스", result1.data.access);
        console.log("엑세스 토큰 갱신 하기");
        window.localStorage.setItem('access_token', result1.data.access);
        console.log("갱신한 엑세스 토큰으로 다시 페이지 접근");
        yield call(addPostAPI, action.data);
        action.data.access_token = result1.data.access;
        window.localStorage.setItem("comment_success", "true");
      } catch (err){
        console.log("로그인 페이지로 돌아가!")
        window.localStorage.clear();
        yield put({
          type: ADD_COMMENT_FAILURE,
          error: err.response.data,
        });
      }
    }
  }
}

// //게시글 하나 불러오기

function loadPostAPI(data) {
  return axios.get(`http://127.0.0.1:8000/api/posts/${data}/`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);

    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostCardsAPI(data) {
  return axios.get(`http://127.0.0.1:8000/api/postcards/${data}/`);
}

function* loadPostCards(action) {
  try {
    const result = yield call(loadPostCardsAPI, action.data);

    yield put({
      type: LOAD_POSTCARDS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTCARDS_FAILURE,
      error: err.response.data,
    });
  }
}

function* loadAllPost(action) {
  try {
    yield put({
      type: LOAD_ALLPOST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_ALLPOST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield throttle(5000, LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAllPost() {
  yield throttle(5000, LOAD_ALLPOST_REQUEST, loadAllPost);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadPostCards() {
  yield throttle(5000, LOAD_POSTCARDS_REQUEST, loadPostCards);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* wathchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
// export default function* postSaga() {
//   yield all([fork(watchAddPost), fork(watchLoadPosts), fork(watchLoadPost)]);
// }

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchAddComment),
    fork(watchLoadPosts),
    fork(watchAllPost),
    fork(wathchRemovePost),
  ]);
}
