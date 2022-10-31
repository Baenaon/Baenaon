import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "../pages/components/header";
import PostCardnew from "../pages/newpostcard";
import { useRouter } from "next/router";
import Router from "next/router";
import { backUrl } from "../config/config";

const Posts = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mainPosts, setPost] = useState([]);

  const map1 = new Map();
  const [flag, setFlag] = useState(false);

  map1.set("a", "한식");
  map1.set("b", "중식");
  map1.set("c", "일식");
  map1.set("d", "치킨");
  map1.set("e", "분식");
  map1.set("f", "카페/디저트");

  const category = router.query.category;

  useEffect(() => {
    const access = window.localStorage.getItem("access_token");

    console.log("useffect", category, flag);
    axios
      .get(`${backUrl}/api/posts/search/category/?search=${category}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then(function (response) {
        setPost(response.data.result);
        setFlag(true);
      })
      .catch(function (error) {
        if (error.message) {
          swal(
            "No Post !",
            "권한이 없습니다. 로그인을 해주세요.",
            "warning"
          ).then((value) => {
            if (value) {
              return Router.push("/loginform");
            }
          });
        }
      });
  }, [category]);

  const goMenu = (e) => {
    Router.push("/categorypost");
  };

  return (
    <div>
      {mainPosts.length !== 0 ? (
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
      ) : (
        <div>
          {" "}
          <Header />
          <div class="flex flex-col mt-40  items-center justify-center ">
            <div class="mb-4">아직 게시글이 존재하지 않습니다.</div>
            <button
              onClick={goMenu}
              className=" mt-2 hover:shadow-form rounded-md bg-[#42DDBB]  px-5 py-3 text-base font-semibold text-white outline-none"
            >
              다른 메뉴 선택 하러가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
