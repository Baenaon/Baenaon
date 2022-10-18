import React, { useCallback, useEffect } from "react";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";

import { loginRequestAction } from "../reducers/user";
import Router from "next/router";

import { KAKAO_AUTH_URL } from "../pages/oauth";
import { frontUrl } from "../config/config";

function kakao(locations) {
  const params = new URLSearchParams(location.search);
  let code = params.get("code");
  console.log(code);
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError, logInDone } = useSelector(
    (state) => state.user
  );
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (logInDone) {
      Router.push("/");
    }
  }, [logInDone]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    console.log(KAKAO_AUTH_URL);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <main className="bg-[#F8F8F8] mx-auto flex min-h-screen  items-center justify-center ">
      <div className="drop-shadow-2xl justify-self-center flex justify-between">
        <div className="w-[28rem]">
          <img src="/login.png" />
        </div>
        <div className="bg-white rounded-r-lg w-[36rem] p-16">
          <section className="flex-col space-y-10">
            <div className="pt-10 text-3xl font-custom font-middle">Login</div>

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#42DDBB]">
              <label htmlFor="user-email"></label>

              <input
                name="user-email"
                value={email}
                onChange={onChangeEmail}
                required
                type="email"
                placeholder="이메일"
                className="w-full border-none bg-transparent outline-none focus:outline-none"
              />
            </div>

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#42DDBB]">
              <label htmlFor="user-password"></label>
              <input
                name="user-password"
                type="password"
                value={password}
                onChange={onChangePassword}
                placeholder="비밀번호"
                className="w-full border-none bg-transparent outline-none focus:outline-none"
                required
              />
            </div>

            <button
              type="primary"
              loading={logInLoading}
              onClick={onSubmitForm}
              className="w-full mt-3 transform outline outline-offset-0 text-white rounded-sm bg-[#42DDBB] py-2 font-bold hover:bg-white hover:text-[#42DDBB] "
            >
              로그인
            </button>
            <div class="w-full">
              <a href={KAKAO_AUTH_URL}>
                <img src="/kakao_logo.png" class="center" />
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a
                href="#"
                className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
              >
                비밀번호 찾기 &nbsp;
              </a>
              <span className="font-medium text-gray-500 underline-offset-4 hover:text-gray-300">
                {" "}
                |{" "}
              </span>

              <a
                href="/signup"
                className="font-medium text-gray-500 underline-offset-4 hover:text-gray-300"
              >
                &nbsp; 회원가입
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
