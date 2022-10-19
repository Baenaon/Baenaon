import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/header";
import PostCard from "./postCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { END } from "redux-saga";
import { useRouter } from "next/router";
import Link from "next/link";

const categoryPost = () => {
  return (
    <div>
      <Header />
      <div class="">
        <div class="flex justify-center m-3 ">
          <div class=" text-2xl">
            <div class="font-custom h-7 flex m-8 ">
              <div>게시글&nbsp; </div>
              <div class="text-[#42DDBB]">카테고리</div> <div>&nbsp;선택</div>
            </div>
            <div class="font-custom h-7 text-center mb-5">음식종류</div>
          </div>
        </div>

        <div class="w-[52rem] mx-auto ">
          <div class="flex flex-nowrap space-x-4 m-5">
            <a>
              <Link
                href={{
                  pathname: `/posts`,
                  query: {
                    // address: JSON.stringify(post.address),
                    category: "a",
                  },
                }}
              >
                <img src="한식.png"></img>
              </Link>
            </a>
            <div clas="">
              <a>
                <Link
                  href={{
                    pathname: `/posts`,
                    query: {
                      // address: JSON.stringify(post.address),
                      category: "b",
                    },
                  }}
                >
                  <img src="중식.png"></img>
                </Link>
              </a>
            </div>
            <div clas="">
              <a>
                <Link
                  href={{
                    pathname: `/posts`,
                    query: {
                      // address: JSON.stringify(post.address),
                      category: "c",
                    },
                  }}
                >
                  <img src="일식.png"></img>
                </Link>
              </a>
            </div>
          </div>

          <div class="flex flex-nowrap space-x-4 m-5">
            <div clas="hover-">
              <a>
                <Link
                  href={{
                    pathname: `/posts`,
                    query: {
                      // address: JSON.stringify(post.address),
                      category: "d",
                    },
                  }}
                >
                  <img src="치킨.png"></img>
                </Link>
              </a>
            </div>
            <div clas="">
              <a>
                <Link
                  href={{
                    pathname: `/posts`,
                    query: {
                      // address: JSON.stringify(post.address),
                      category: "e",
                    },
                  }}
                >
                  <img src="분식.png"></img>
                </Link>
              </a>
            </div>
            <div clas="">
              <a>
                <Link
                  href={{
                    pathname: `/posts`,
                    query: {
                      // address: JSON.stringify(post.address),
                      category: "f",
                    },
                  }}
                >
                  <img src="디저트.png"></img>
                </Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default categoryPost;
