import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../pages/components/header";
import CommentForm from "../pages/commentForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Comment = ({ comments }) => {
  
  return (
    <div className="flex flex-wrap m-7 -m-200 p-5 bg-indigo-50/40 outline-none rounded-md">
      <div className="flex flex-col">
        <div className="flex flex-row">
      <div className="w-10 h-10 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center bg-indigo-50 outline-none rounded-md text-indigo-500 flex-shrink-0">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
      </div>
        <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
          {comments.user}&nbsp;({comments.created_at.split("T")[0]}&nbsp;{String(parseInt(comments.created_at.split("T")[1].split(".")[0].split(':')[0]))+":"+comments.created_at.split("T")[1].split(".")[0].split(':')[1]+":"+comments.created_at.split("T")[1].split(".")[0].split(':')[2]})
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
