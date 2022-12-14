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
import { backUrl } from "../config/config";
import Router from "next/router";
import swal from "sweetalert";
const UserNearPost = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { ids } = router.query;
  const { postcards, setpostcards } = useState([]);
  const { token, setToken } = useState("");
  const map1 = new Map();
  const [mainPosts, setPost] = useState([]);
  const [flag, setFlag] = useState(false);
  map1.set("a", "한식");
  map1.set("b", "중식");
  map1.set("c", "일식");
  map1.set("d", "치킨");
  map1.set("e", "분식");
  map1.set("f", "카페/디저트");
  useEffect(() => {
    const access = window.localStorage.getItem("access_token");
    if (flag == false){
      const test = axios
        .get(`${backUrl}/api/posts/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
        .then(function (response) {
          setPost(response.data.result);
	  console.log("nopost오냐",mainPosts);
	  if (mainPosts == "NoPost"){
		swal(
        	"No Post !",
        	"게시글이 없습니다. 새로 글을 작성해 주세요.",
        	"warning"
     		).then((value) => {
			if (value){
	  			return Router.push('/categorypost')
			}
		});
	  }
	  else if (mainPosts.length > 0){
	    console.log(mainPosts);
            setFlag(true);
          }
        });
    }
  }, [mainPosts]);
  if (flag == true){
  return (
    <div>
      {" "}
      {mainPosts && mainPosts.length > 0 ? (
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
        </div>
      ) : (
        <div>loading…</div>
      )}
    </div>
  );
}
};
export default UserNearPost;
