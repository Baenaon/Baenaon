import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
import useInput from "../hooks/useInput";
import Router from "next/router";

const CommentForm = ({ post_id }) => {
  const dispatch = useDispatch();
  const [access_token, set_access_token] = useState({});

  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.post
  );

  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    set_access_token(window.localStorage.getItem("access_token"));
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        send: { content: commentText },
        id: post_id,
        access_token: access_token,
      },
    });
    setTimeout(() => {
      if (window.localStorage.getItem("comment_success") != "true") {
        Router.push("/loginform");
      }
    }, 1000);
  }, [commentText, post_id]);

  return (
    <div action="" className="w-full ">
      <div className="mb-2">
        <label
          for="message"
          className="mb-3 font-custom text-[25px] block text-base font-medium text-[#07074D]"
        >
          댓글
        </label>

        <div class="flex">
          <textarea
            className="flex-auto w-70 h-12 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="comment"
            placeholder="내용을 입력해주세요. ex) 저도 같이 먹을래요!"
            onChange={onChangeCommentText}
            value={commentText}
          ></textarea>

          <button
            onClick={onSubmitComment}
            className="ml-2 hover:shadow-form rounded-md bg-[#42DDBB]  px-5 text-base font-semibold text-white outline-none"
            loading={addCommentLoading}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
