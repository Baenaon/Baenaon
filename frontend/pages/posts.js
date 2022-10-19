import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../pages/components/header";
import PostCardnew from "../pages/newpostcard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { END } from "redux-saga";
import { useRouter } from "next/router";
import Link from "next/link";

const Posts = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { ids } = router.query;
  const { mainPosts, loadPostsDone } = useSelector((state) => state.post);
  const { postcards, setpostcards } = useState([]);
  const { token, setToken } = useState("");
  const map1 = new Map();
  map1.set("a", "한식");
  map1.set("b", "중식");
  map1.set("c", "일식");
  map1.set("d", "치킨");
  map1.set("e", "분식");
  map1.set("f", "카페/디저트");

  console.log("음식종류", map1.get("f"));

  //   useEffect(() => {
  //     setToken(localStorage.getItem("access_token"));
  //   }, []);

  const category = router.query.category;

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: { category: category },
    });
  }, [category]);

  return (
    <div>
      <Header />

      <div class="">
        <div class="flex justify-center m-3 ">
          <div class=" text-2xl">
            <div class="font-custom h-7 flex m-8 ">
              <div class="">카테고리</div> <div>&nbsp;선택 </div>{" "}
              <div class="text-[#42DDBB]">&nbsp;{map1.get(category)} </div>
            </div>
          </div>
        </div>
      </div>

      <div class=" mx-auto w-full max-w-[700px]">
        <div className="m-3 flex justify-between">
          {/* <a
            className="
               m-3 col-start-7 col-span-1 items-center py-2.5 px-4 text-base font-medium text-center text-white bg-[#6A64F1] rounded-lg hover:bg-[#5f57ff] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {/* <Link
              href={{
                pathname: `/postForm`,
                query: {
                  address: JSON.stringify(mainPosts[0].addressname[0]),
                  id: id,
                },
              }}
            >
              글쓰기
            </Link> */}
          {/* </a> */}
          <div className="mb-3 block text-base font-medium text-[#6B7280]">
            {/* <div>{mainPosts[0].address[0].addressname}</div>
            <div className="float-right">
              {mainPosts[0].address[0].locationname}
            </div> */}
          </div>
        </div>
        <div className="">
          <div className="flex flex-col space-y-4">
            {mainPosts.map((content) => {
              return (
                <div class="mb-3">
                  <PostCardnew
                    key={content.id}
                    post={{
                      content,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
