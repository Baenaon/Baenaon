import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../pages/components/header";
import { ADD_POST_REQUEST, ADD_POST_SUCCESS } from "../../reducers/post";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";
import Router from "next/router";
import { useHistory } from "react-router-dom";
import Link from "next/link";
import swal from "sweetalert";
import { LOAD_POST_REQUEST, REMOVE_POST_REQUEST } from "../../reducers/post";
import { backUrl } from "../../config/config";
const EditForm = () => {
  const { singlePost } = useSelector((state) => state.post);
  const { addPostDone, addPostLoading } = useSelector((state) => state.post);
  const router = useRouter();
  const id = router.query.id;

  const address1 = router.query.address;
  const [title, onChangeTitle, setTitle] = useInput("");
  const [content, onChangeContent, setContent] = useInput("");

  const dispatch = useDispatch();
  const address_id = router.query.id;

  const [address2, setaddress2] = useState({});
  const [address3, setaddress3] = useState({});
  const [access_token, set_access_token] = useState({});
  const [category, set_Menu] = useState("");

  const map1 = new Map();
  var menu = "";
  map1.set("a", "한식");
  map1.set("b", "중식");
  map1.set("c", "일식");
  map1.set("d", "치킨");
  map1.set("e", "분식");
  map1.set("f", "카페/디저트");

  useEffect(() => {
    if (typeof id !== "undefined") {
      dispatch({
        type: LOAD_POST_REQUEST,
        data: id,
      });
    }
  }, [id]);

  useEffect(() => {
    if (singlePost != null) {
      setTitle(singlePost.title);
      setContent(singlePost.content);
      set_Menu(singlePost.category);
    }
  }, [singlePost]);

  useEffect(() => {
    set_access_token(window.localStorage.getItem("access_token"));
    console.log(access_token);
    if (!access_token) {
      swal(
        "권한이 없습니다.",
        "로그인/회원가입을 해주시길 바랍니다.",
        "warning"
      ).then((value) => {
        if (value) {
          return Router.push("/loginform");
        }
      });
    }
    setaddress3(window.localStorage.getItem("address"));
  }, [access_token]);

  const setMenu = useCallback((e) => {
    menu = e.target.value;
    set_Menu(menu);
  });

  const onSubmit = useCallback((e) => {
    const formData = {
      send: {
        title: title,
        content: content,
        category: category,
      },
    };

    axios
      .put(`${backUrl}/api/posts/${id}/`, formData.send, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (response) {
        Router.push("/categorypost");
      })
      .catch(function (error) {
        console.log(error.message);
        if (error.response.status == 400) {
          if (!title || !content || !category) {
            swal(
              "양식이 틀렸습니다.",
              "카테고리, 제목, 내용은 필수 항목입니다.",
              "warning"
            ).then((value) => {
              if (value) {
                return Router.push(`/editpost/${id}`);
              }
            });
          } else {
            Router.push(`/posts?category=${category}`);
          }
        } else if (error.response.status == 403) {
          swal("게시글 수정 실패", "권한이 없습니다..", "warning").then(
            (value) => {
              if (value) {
                return Router.push(`/content/${id}`);
              }
            }
          );
        }
      });

    e.preventDefault();
    console.log("category", category);
  });

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
            </label>
          </div>
          <form>
            <div class="mb-5">
              <div class="flex items-center">
                <label className="mb-3 mr-10 font-custom text-2xl block text-base font-medium text-[#07074D]">
                  음식 종류
                </label>
                <label class="mb-3 block text-base font-medium text-[#07074D]">
                  {`${map1.get(category)}`}
                </label>
              </div>
              <div class=" items-center  justify-center mb-3">
                <div class="flex justify-between focus:shadow-lg">
                  <button
                    onClick={setMenu}
                    type="button"
                    value="a"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white "
                  >
                    한식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="b"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white e "
                  >
                    중식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="c"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white  "
                  >
                    일식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="d"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white  "
                  >
                    치킨
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="e"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-white text-[#FFD15C] hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white "
                  >
                    분식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="f"
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
                // placeholder="제목을 입력해주세요.&nbsp; ex)연어초밥 같이 시켜먹어요!"
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
                value={content}
                rows="9"
                id="message"
                placeholder="내용을 입력해주세요.&nbsp;ex) 배나온 초밥집에서 연어초밥 시킬건데 같이 드실 분은 댓글 주세요!"
                class="w-full whitespace-pre-line resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#42DDBB] "
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

export default EditForm;
