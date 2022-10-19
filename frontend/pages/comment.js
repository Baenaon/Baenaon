import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../pages/components/header";
import CommentForm from "../pages/commentForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Comment = ({ comments }) => {
  return (
    <div className="flex flex-wrap  mb-4 p-5 bg-indigo-50/40 outline-none rounded-md">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
            {comments.user}&nbsp;({comments.created_at.split("T")[0]}&nbsp;
            {String(
              parseInt(
                comments.created_at.split("T")[1].split(".")[0].split(":")[0]
              )
            ) +
              ":" +
              comments.created_at.split("T")[1].split(".")[0].split(":")[1] +
              ":" +
              comments.created_at.split("T")[1].split(".")[0].split(":")[2]}
            )
          </h2>
        </div>
        <div>
          <div className="ml-20 whitespace-pre-line ...">
            {comments.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
