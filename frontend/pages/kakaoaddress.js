import React, { useCallback, useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import Postcode from "./postcode";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Router from "next/router";
import { frontUrl, backUrl } from "../config/config";
import axios from "axios";

const KakaoAddress = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError } = useSelector(
    (state) => state.user
  );
  const [addressDetail, setAddressDetail] = useState("");
  const [isOpenPost, setIsOpenPost] = useState(false);
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };


  const [address_static, onChangeAddress] = useState("");
  const get_data = (address_static) => {
    onChangeAddress(address_static);
  };
  const onSubmitForm = useCallback(() => {
    const access = window.localStorage.getItem("access_token");
    axios.post(backUrl + "/api/user/kakao/address/create/", {
        address : address_static,
    },
    {
	    headers: {
	   	Authorization: `Bearer ${access}`,
	    },
    }
    );
    localStorage.setItem("address", address_static);
    Router.push('/');
  }, [address_static]);

  const [popup, setPopup] = useState(false);

  const handleComplete = (data) => {
    setPopup(!popup);
  };


  console.log(popup);

  return (
    <main className="bg-[#F8F8F8] mx-auto flex min-h-screen  items-center justify-center ">
      <section className="drop-shadow-2xl mt-50 bg-white rounded-lg w-[45rem] h-[50rem] p-16">
        <div className=" text-4xl font-medium font-custom">주소입력</div>
        <div className="">
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

          <div className=" justify-center">
            <div className="w-full text-center mt-4">
              <button
                type="primary"
                htmlType="submit"
                onClick={onSubmitForm}
                className="w-full transform outline outline-offset-0 text-white rounded-sm bg-[#42DDBB] py-2 font-bold hover:bg-white hover:text-[#42DDBB] "
              >
                주소등록
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KakaoAddress;

