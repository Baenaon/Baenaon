
import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../pages/components/header";
import CommentForm from "../pages/commentForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { backUrl } from "../config/config";
import Router from "next/router";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";

const Comment = ({ comments }) => {
  const [access_token, set_access_token] = useState({});
  const [ifrewrite, set_ifrewrite] = useState(true);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  const router = useRouter();
  const id = router.query.id;
  console.log(id);

  useEffect(() => {
    setCommentText(comments.content);
    set_access_token(window.localStorage.getItem("access_token"));
  }, [access_token]);

  const onRemove = useCallback(
    (e) => {
      set_ifrewrite(!ifrewrite);
    },
    [ifrewrite]
  );

  const onRemove_re = useCallback((e) => {
    axios
      .delete(`${backUrl}/api/posts/${comments.id}/comments/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (response) {
        Router.push(`/content/${id}`);
      })
      .catch(function (error) {
        console.log(error.message);
        if (error.message) {
          swal("댓글 삭제 실패", "권한이 없습니다.", "warning");
        }
      });
  });

  const onRewrite = useCallback((e) => {
    axios
      .put(
        `${backUrl}/api/posts/${comments.id}/comments/`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(function (response) {
        set_ifrewrite(!ifrewrite);
        Router.push(`/content/${id}`);
      })
      .catch(function (error) {
        console.log(error.message);
        if (error.response.status == 400) {
          set_ifrewrite(!ifrewrite);
          setCommentText(comments.content);
          swal("댓글 수정 실패", "댓글을 작성해 주세요.", "warning").then(
            Router.push(`/content/${id}`)
          );
        } else if (error.message) {
          set_ifrewrite(!ifrewrite);
          swal("댓글 수정 실패", "권한이 없습니다.", "warning").then(
            Router.push(`/content/${id}`)
          );
        }
      });
  });

  return (
    <div className="flex mb-4 p-5 bg-indigo-50/40 outline-none rounded-md">
      <div className="flex flex-col w-full">
        <div className="flex justify-between w-full">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
            {comments.user}&nbsp;(
            {comments.updated_at.split("T")[0]}{" "}
            {comments.updated_at.split("T")[1].split(".")[0]})
          </h2>
          <div class="flex text-[#555555]">
            <div class="mr-3" onClick={onRemove_re}>
              삭제
            </div>
            <div onClick={onRemove}>수정</div>
          </div>
        </div>
        {ifrewrite ? (
          <div>
            <div className="ml-20 whitespace-pre-line ...">
              {comments.content}
            </div>
          </div>
        ) : (
          <div class="flex">
            <textarea
              className="flex-auto w-70 h-12 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
              name="comment"
              placeholder="내용을 입력해주세요. ex) 저도 같이 먹을래요!"
              onChange={onChangeCommentText}
              value={commentText}
            ></textarea>

            <button
              onClick={onRewrite}
              className="ml-2 hover:shadow-form rounded-md bg-[#42DDBB]  px-5 text-base font-semibold text-white outline-none"
            >
              등록
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

