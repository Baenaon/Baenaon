import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "../pages/components/header";
import Comment from "../pages/comment";
import { backUrl } from "../config/config";
import Link from "next/link";

const MyComment = () => {
  const [access_token, set_access_token] = useState({});
  const [user_posts, set_user_comments] = useState({});
  const map1 = new Map();
  map1.set("a", "한식");
  map1.set("b", "중식");
  map1.set("c", "일식");
  map1.set("d", "치킨");
  map1.set("e", "분식");
  map1.set("f", "카페/디저트");

  useEffect(() => {
    set_access_token(window.localStorage.getItem("access_token"));
    axios
      .get(backUrl + "/api/user/mypage/comments/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (response) {
        set_user_comments(response.data);
      })
      .catch(function (error) {});
  }, [access_token]);

  return (
    <div>
      <div>
        {user_posts.length != 0 ? (
          <div>
            <Header />
            <div class=" mx-auto w-full max-w-[700px]">
              <div className="grid grid-cols-2">
                {Object.keys(user_posts).map((post) => (
                  <div className="h-160 w-73 p-8 m-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="mb-3 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-2 text-base font-medium text-indigo-700  md:py-4 md:px-10 md:text-lg">
                      {map1.get(user_posts[post].category)}
                    </div>
                    <div className=" ">
                      <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <Link
                          href={{
                            pathname: `/content/[post_id]`,
                            query: { post_id: user_posts[post].id },
                          }}
                        >
                          {user_posts[post].title}
                        </Link>
                      </h5>
                      <p className="mb-2 text-s font-normal tracking-tight text-gray-900 dark:text-white">
                        {user_posts[post].updated_at.split("T")[0]} &nbsp;
                        {
                          user_posts[post].updated_at
                            .split("T")[1]
                            .split(".")[0]
                        }
                      </p>

                      <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {user_posts[post].writer}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>loading..</div>
        )}
      </div>
    </div>
  );
};

export default MyComment;
