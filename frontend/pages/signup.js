import React, { useCallback, useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import Postcode from "./postcode";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Router from "next/router";

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (signUpDone) {
      Router.push("http://localhost:3000");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [addressDetail, setAddressDetail] = useState("");
  const [isOpenPost, setIsOpenPost] = useState(false);
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [address_static, onChangeAddress] = useState("");
  const get_data = (address_static) => {
    onChangeAddress(address_static);
  };
  const onSubmitForm = useCallback(() => {
    const formData = {
      email: email,
      nickname: nickname,
      address: address_static,
      password: password,
    };
    dispatch({
      type: SIGN_UP_REQUEST,
      data: formData,
    });
  }, [email, password, nickname, address_static]);

  const [popup, setPopup] = useState(false);

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  const [passwordCheck, setPasswordCheck] = useState(""); //비밀번호체크는 중복이 안됨 다른부분이 있기때문에
  const [passwordError, setPasswordError] = useState(false); //커스텀 훅으로 합쳐주지 못해서 따로 빼주기, 비밀번호랑 비밀번호 확인이 일치하는지
  const onChangePasswordCheck = useCallback(
    (e) => {
      //중복체크를 해줘야대서
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true); //pw랑 pw확인 일치 안하면 에러고
    }
    if (!term) {
      return setTermError(true); //약관동의 안누르면 여기서 에러
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname, address_static },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center  text-black">
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">회원가입</div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <label htmlFor={"user-email"}>이메일</label>

          <input
            name="user-email"
            value={email}
            required
            onChange={onChangeEmail}
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <label htmlFor={"user-username"}>유저네임</label>

          <input
            name="user-username"
            value={nickname}
            required
            onChange={onChangeUsername}
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <label htmlFor={"user-address"}>주소</label>

          <input
            name="user-address"
            value={address_static}
            required
            onChange={onChangeAddress}
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />

          <div className=" flex justify-end ">
            <button
              type="button"
              className="justify-end border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              onClick={handleComplete}
              onChange={onChangeAddress}
            >
              주소찾기
            </button>
          </div>
          {popup && (
            <Postcode get_data={get_data} address={address_static}></Postcode>
          )}
        </div>

        <div className="flexbox w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <label htmlFor={"user-password"}>비밀번호</label>
          <input
            name="user-password"
            value={password}
            required
            onChange={onChangePassword}
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <label htmlFor={"user-password-check"}>비밀번호 확인</label>
          <input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          />
        </div>

        <div>
          {passwordError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium"></span> 비밀번호가 일치하지
              않습니다.
            </p>
          )}
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              name="user-term"
              checked={term}
              onChange={onChangeTerm}
              onClick={onSubmit}
              type="checkbox"
              className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
              required=""
            ></input>
          </div>
          <div className="text-sm ml-3">
            <label htmlFor="remember" className="font-medium text-gray-900">
              회원가입에 동의합니다.
            </label>
            <div>
              {termError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium"></span> 약관에 동의하셔야
                  합니다.
                </p>
              )}
            </div>
          </div>

          <div className="w-full text-center mx-auto">
            <button
              type="primary"
              htmlType="submit"
              onClick={onSubmitForm}
              loading={signUpLoading}
              className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
            >
              가입하기
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
