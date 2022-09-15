import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
import useInput from "../hooks/useInput";
import  Router  from "next/router";

const CommentForm = ({ post_id }) => {
  const dispatch = useDispatch();
  const [access_token, set_access_token] = useState({});
 
  console.log("post_id", post_id);
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
      if (window.localStorage.getItem("comment_success")!="true") {
        Router.push("/loginform");
      }
    }, 1000);
  
    
  }, [commentText, post_id]);






  console.log("commenttext", commentText);
  return (
    <div action="" className="w-full ">
      <div className="mb-2">
        <label htmlFor="comment" className="text-lg text-gray-600">
          댓글
        </label>
        <textarea
          className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
          name="comment"
          onChange={onChangeCommentText}
          value={commentText}
        ></textarea>
      </div>
      <div className="flex flex-row-reverse space-x-4 space-x-reverse ">
        <button
          onClick={onSubmitComment}
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-2 px-4 text-base font-semibold text-white outline-none"
          loading={addCommentLoading}
        >
          댓글 등록
        </button>
      </div>
    </div>
  );
};

export default CommentForm;