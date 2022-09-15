import React, { useCallback, useEffect } from "react";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";

import { loginRequestAction } from "../reducers/user";
import Router from "next/router";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError, logInDone } = useSelector(
    (state) => state.user
  );
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (logInDone) {
      Router.push("http://localhost:3000");
    }
  }, [logInDone]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center  text-black">
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">로그인</div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <label htmlFor="user-email"></label>

          <input
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
            type="email"
            placeholder="이메일"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <label htmlFor="user-password"></label>
          <input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            required
          />
        </div>

        <button
          type="primary"
          loading={logInLoading}
          onClick={onSubmitForm}
          className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
        >
          로그인
        </button>

        <a
          href="#"
          className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
        >
          비밀번호 찾기
        </a>

        <p className="text-center text-lg">
          계정이 없으신가요? &nbsp;
          <a
            href="/signup"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            회원가입
          </a>
        </p>
      </section>
    </main>
  );
};

export default LoginForm;
