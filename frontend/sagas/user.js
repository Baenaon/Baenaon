import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import swal from "sweetalert";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  POST_CHECK_REQUEST,
  POST_CHECK_SUCCESS,
  POST_CHECK_FAILURE,
} from "../reducers/user";
import { backUrl } from "../config/config";

function logInAPI(data) {
  return axios.post(backUrl + "/api/user/signin/", data);
}

//login : 실질적으로 동기작업을 하는 generator함수로 api를 호출한 후 분기점을 나눠서 다음으로 실행할 action을 put함(put = dispatch)
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    if (result.data.message === "fail") {
      return swal(
        "로그인 실패",
        "아이디와 비밀번호를 확인해 주세요.",
        "warning"
      );
    }

    localStorage.setItem("access_token", result.data.access_token);
    localStorage.setItem("refresh_token", result.data.refresh_token);
    localStorage.setItem("address", result.data.address);

    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: err.response.data,
    });
  }
}

function signUpAPI(data) {
  console.log(data);
  return axios.post(backUrl + "/api/user/signup/", data);
}

function* Signup(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    

    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    if (err.response.status === 400) {
      return swal(
        "회원가입 실패",
        "이미 같은 이메일/닉네임으로 가입한 사용자가 있습니다.",
        "warning"
      );
    }
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function PostCardAPI(data) {
  return axios.get(backUrl + "/api/posts/user/", data);
}

function* PostCard(action) {
  try {
    const result = yield call(PostCardAPI(), action.data);
    console.log("access", result.data);
    localStorage.setItem("Beareraccess_token", result.data.Beareraccess_token);
    yield put({
      type: POST_CHECK_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: POST_CHECK_FAILURE,
      error: err.response.data,
    });
  }
}

//action이 dispatch 되기 전에 처리해야 할 generator 함수 호출, LOG_IN_REQUEST를 dispatch하면 login 함수도 같이 호출
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, Signup);
}

function* watchPostCard() {
  yield takeLatest(POST_CHECK_REQUEST, PostCard);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchPostCard),
  ]);
}
