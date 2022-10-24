import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../pages/components/header";
import PostCardnew from "../pages/newpostCard";
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

  const category = router.query.category;

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: { category: category },
    });
  }, [category, mainPosts]);

  console.log("mainPosts", mainPosts.length);
  return (
    <div>
      <Header />
      <div class="">
        <div class="flex justify-center m-3 ">
          <div class=" text-2xl">
            <div class="font-custom h-7 flex m-8 ">
              <div class="text-[#42DDBB]">&nbsp;{map1.get(category)} </div>
              <div>을 원하는 이웃들 </div>{" "}
            </div>
          </div>
        </div>
      </div>

      <div class=" mx-auto w-full max-w-[700px]">
        <div className="m-3 flex justify-between">
          <div className="mb-3 block text-base font-medium text-[#6B7280]"></div>
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
