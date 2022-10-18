import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../pages/components/header";
import PostCard from "../pages/postCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { END } from "redux-saga";
import { useRouter } from "next/router";
import Link from "next/link";

const Posts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, loadPostsDone } = useSelector((state) => state.post);
  const { postcards, setpostcards } = useState([]);
  const { token, setToken } = useState("");

  //   useEffect(() => {
  //     setToken(localStorage.getItem("access_token"));
  //   }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: { category: "한식" },
    });
  }, []);

  console.log(mainPosts);

  return (
    <div>
      <Header />

      <div class="">
        <div class="flex justify-center m-3 ">
          <div class=" text-2xl">
            <div class="font-custom h-7 flex m-8 ">
              <div class="">카테고리</div> <div>&nbsp;선택 </div>{" "}
              <div class="text-[#42DDBB]">&nbsp;일식 </div>
            </div>
            <div class="font-custom h-7 text-center mb-5">음식종류</div>
          </div>
        </div>
      </div>

      <div class=" mx-auto w-full max-w-[700px]">
        <div className="m-3 flex justify-between">
          <a
            className="
               m-3 col-start-7 col-span-1 items-center py-2.5 px-4 text-base font-medium text-center text-white bg-[#6A64F1] rounded-lg hover:bg-[#5f57ff] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {/* <Link
              href={{
                pathname: `/postForm`,
                query: {
                  address: JSON.stringify(mainPosts[0].address[0]),
                  id: id,
                },
              }}
            > */}
            {/* 글쓰기
            </Link> */}
          </a>
          <div className="mb-3 block text-base font-medium text-[#6B7280]">
            {/* <div>{mainPosts[0].address[0].addressname}</div>
            <div className="float-right">
              {mainPosts[0].address[0].locationname}
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-2">
          {/* {mainPosts[0].posts.map((content) => {
            return (
              <PostCard
                key={content.id}
                post={{
                  content,
                  address: mainPosts[0].address[0],
                }}
              />
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Posts;
