import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "../pages/components/header";
import Comment from "../pages/comment";

const MyComment = () => {
  const [access_token, set_access_token] = useState({});
  const [user_comments, set_user_comments] = useState({});

  useEffect(() => {
    set_access_token(window.localStorage.getItem("access_token"));
    axios
      .get("http://127.0.0.1:8000/api/user/mypage/comments/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (response) {
        set_user_comments(response.data);
      })
      .catch(function (error) {});
  }, [access_token]);

  console.log(user_comments);
  return (
    <div>
      <Header />
      <div className=" items-center justify-center p-12">
        {/*container*/}
        <div className="m-5 mx-auto w-full max-w-[700px]">
          {Object.keys(user_comments).map((comment) => (
            <Comment
              key={user_comments[comment].id}
              comments={user_comments[comment]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyComment;