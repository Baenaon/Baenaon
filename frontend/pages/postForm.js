import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../pages/components/header";
import { ADD_POST_REQUEST, ADD_POST_SUCCESS } from "../reducers/post";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";
import Router from "next/router";
import { useHistory } from "react-router-dom";

const PostForm = () => {
  const { addPostDone, addPostLoading } = useSelector((state) => state.post);
  // const { addPostDone, addPostLoading } = useSelector((state) => state.user);
  const router = useRouter();
  const address1 = router.query.address;
  const [title, onChangeTitle, setTitle] = useInput("");
  const [content, onChangeContent, setContent] = useInput("");
  // const [category, onChangeCategory, setCategory] = useInput("");
  const dispatch = useDispatch();
  const address_id = router.query.id;

  const [address2, setaddress2] = useState({});
  const [address3, setaddress3] = useState({});
  const [access_token, set_access_token] = useState({});
  const [category, set_Menu] = useState("");
  const address = "상왕십리 무학로 33 텐즈힐아파트";

  useEffect(() => {
    set_access_token(window.localStorage.getItem("access_token"));
    setaddress3(window.localStorage.getItem("address"));
    if (address1 != null) {
      setaddress2(JSON.parse(address1));
    }
  }, [address1, access_token]);

  const setMenu = useCallback((e) => {
    set_Menu(e.target.value);
  });

  const onSubmit = useCallback(
    (e) => {
      const formData = {
        access_token: access_token,
        send: {
          title: title,
          content: content,
          category: category,
          address: address3,
        },
      };

      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
      e.preventDefault();
      setTimeout(() => {
        if (window.localStorage.getItem("post_success") === "true") {
          Router.push("/map");
        } else {
          Router.push("/loginform");
        }
      }, 1000);
    },
    [title, content]
  );
  console.log(category);
  return (
    <div>
      <Header />
      <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[900px]">
          <div className="mb-9">
            <label className="mb-3 font-custom text-2xl block text-base font-medium text-[#07074D]">
              내 위치
            </label>
            <label
              className="mb-3 block text-base font-light

             text-[#07074D]"
            >
              {`${address3}`}
              {/* {address2.locationname}&nbsp; /&nbsp; {address2.addressname} */}
            </label>
          </div>
          <form onSubmit={onSubmit}>
            <div class="mb-5">
              <div class="flex items-center">
                <label className="mb-3 mr-10 font-custom text-2xl block text-base font-medium text-[#07074D]">
                  음식 종류
                </label>
                <label class="mb-3 block text-base font-medium text-[#07074D]">
                  {`${category}`}
                </label>
              </div>
              <div class=" items-center  justify-center mb-3">
                <div class="flex justify-between focus:shadow-lg">
                  <button
                    onClick={setMenu}
                    type="button"
                    value="한식"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white "
                  >
                    한식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="중식"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white e "
                  >
                    중식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="일식"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white  "
                  >
                    일식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="치킨"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white  "
                  >
                    치킨
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="분식"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white "
                  >
                    분식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="카페/디저트"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white  "
                  >
                    카페/디저트
                  </button>
                </div>
              </div>
            </div>
            <div class="mb-5 mt-5">
              <label
                for="subject"
                className="mb-3 font-custom text-2xl block text-base font-medium text-[#07074D]"
              >
                제목
              </label>
              <input
                onChange={onChangeTitle}
                value={title}
                type="text"
                placeholder="제목을 입력해주세요.&nbsp; ex)연어초밥 같이 시켜먹어요!"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#42DDBB] focus:shadow-md"
              ></input>
            </div>
            <div class="mb-5">
              <label
                for="message"
                className="mb-3 font-custom text-2xl block text-base font-medium text-[#07074D]"
              >
                내용
              </label>
              <textarea
                onChange={onChangeContent}
                rows="9"
                id="message"
                placeholder="내용을 입력해주세요.&nbsp;ex) 배나온 초밥집에서 연어초밥 시킬건데 같이 드실 분은 댓글 주세요!"
                class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#42DDBB] "
              ></textarea>
            </div>
            <div className="h-16 w-40 float-right">
              <button
                onClick={onSubmit}
                class=" rounded-md bg-[#42DDBB] w-full h-full text-2xl font-semibold text-white outline-none"
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
