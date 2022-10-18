import React, { useCallback, useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import Postcode from "./postcode";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Router from "next/router";
import { frontUrl } from "../config/config";

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (signUpDone) {
      Router.push("/loginform");
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
  console.log(popup);

  return (
    <main className="bg-[#F8F8F8] mx-auto flex min-h-screen  items-center justify-center ">
      <section className="drop-shadow-2xl mt-50 bg-white rounded-lg w-[45rem] h-[50rem] p-16">
        <div className=" text-4xl font-medium font-custom">Join</div>
        <div className="">
          <div className="w-full mt-10 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#42DDBB]">
            <label htmlFor={"user-email"}></label>
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

          <div className="w-full mt-6 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#42DDBB]">
            <label htmlFor={"user-username"}></label>

            <input
              name="user-username"
              value={nickname}
              required
              onChange={onChangeUsername}
              placeholder="닉네임"
              className="w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>

          <div className="w-full mt-6 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#42DDBB]">
            <label htmlFor={"user-address"}></label>

            <input
              name="user-address"
              value={address_static}
              required
              onChange={onChangeAddress}
              placeholder="주소"
              className="w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="w-full mt-3 transform outline outline-offset-0 text-white rounded-sm bg-[#42DDBB] py-2 font-bold hover:bg-white hover:text-[#42DDBB] "
            onClick={handleComplete}
            onChange={onChangeAddress}
          >
            주소찾기
          </button>

          {popup && (
            <div>
              <Postcode get_data={get_data} address={address_static}></Postcode>
            </div>
          )}

          <div className="w-full mt-7 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#42DDBB]">
            <label htmlFor={"user-password"}></label>
            <input
              name="user-password"
              value={password}
              required
              onChange={onChangePassword}
              placeholder="비밀번호"
              className="w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>

          <div className="w-full mt-6 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#42DDBB]">
            <label htmlFor={"user-password-check"}></label>
            <input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
              placeholder="비밀번호 확인"
              className="w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>

          <div>
            {passwordError && (
              <p className="mt-2 items-center text-sm text-red-600 dark:text-red-500">
                <span className="font-medium "></span> 비밀번호가 일치하지
                않습니다.
              </p>
            )}
          </div>

          <div className="flex mt-10 justify-center items-center">
            <input
              name="user-term"
              checked={term}
              onChange={onChangeTerm}
              onClick={onSubmit}
              type="checkbox"
              className=" border-none bg-[#42DDBB] outline-none placeholder:italic focus:outline-none"
            ></input>

            <div className="text-sm  ">
              <label htmlFor="remember" className="font-medium text-[#979797]">
                &nbsp;&nbsp;회원가입시 배나온 서비스 이용 약관 및 개인정보정책에
                동의하게 됩니다.
              </label>
            </div>
          </div>

          <div className=" justify-center">
            <div>
              {termError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium"></span> 약관에 동의하셔야
                  합니다.
                </p>
              )}
            </div>

            <div className="w-full text-center mt-4">
              <button
                type="primary"
                htmlType="submit"
                onClick={onSubmitForm}
                loading={signUpLoading}
                className="w-full transform outline outline-offset-0 text-white rounded-sm bg-[#42DDBB] py-2 font-bold hover:bg-white hover:text-[#42DDBB] "
              >
                가입하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
