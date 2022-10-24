return (
    <div> {mainPosts ? (
        <div>
        <Header />
        <div class="">
            <div class="flex justify-center m-3 ">
            <div class=" text-2xl">
                <div class="font-custom h-7 flex m-8 ">
                <div>내 주위 이웃들의 게시글</div>{" "}
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
        </div>) :
        (<div>loading...</div>)}
        </div>
  );
};return (
    <div> {mainPosts ? (
        <div>
        <Header />
        <div class="">
            <div class="flex justify-center m-3 ">
            <div class=" text-2xl">
                <div class="font-custom h-7 flex m-8 ">
                <div>내 주위 이웃들의 게시글</div>{" "}
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
        </div>) :
        (<div>loading...</div>)}
        </div>
  );
};import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../pages/components/header";
import PostCardnew from "../pages/newpostcard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { END } from "redux-saga";
import { useRouter } from "next/router";
import Link from "next/link";
import { backUrl } from "../config/config";

const UserNearPost = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { ids } = router.query;
  const { postcards, setpostcards } = useState([]);
  const { token, setToken } = useState("");
  const map1 = new Map();
  const [mainPosts, setPost] = useState({});
  map1.set("a", "한식");
  map1.set("b", "중식");
  map1.set("c", "일식");
  map1.set("d", "치킨");
  map1.set("e", "분식");
  map1.set("f", "카페/디저트");
  useEffect(() => {
    const access = window.localStorage.getItem("access_token");

    const test = axios
      .get(`${backUrl}/api/posts/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then(function (response) {
	setPost(response.data.result);
	console.log("진짜 마지막",mainPosts)
      })
	  console.log("밖에서 보이나?", mainPosts);
});

return (
    <div> {mainPosts ? (
        <div>
        <Header />
        <div class="">
            <div class="flex justify-center m-3 ">
            <div class=" text-2xl">
                <div class="font-custom h-7 flex m-8 ">
                <div>내 주위 이웃들의 게시글</div>{" "}
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
        </div>) :
        (<div>loading...</div>)}
        </div>
  );
};
export default UserNearPost;

