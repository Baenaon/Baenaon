import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const PostCard = ({ post }) => {
  console.log(post)
  const [day , time] = post.content.updated_at.split("T");
  const hours = time.split(".")[0].split(':')[0];
  const minutes = time.split(".")[0].split(':')[1];
  const seconds = time.split(".")[0].split(':')[2];

  return (
    <div className="h-160 w-73 p-8 m-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-3 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-2 text-base font-medium text-indigo-700  md:py-4 md:px-10 md:text-lg">
        {post.content.category}
      </div>

      <div className=" ">
        <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.content.title} 
        </h5>

        <p className="mb-2 text-s font-normal tracking-tight text-gray-900 dark:text-white">
          {day}  &nbsp;{hours+":"+minutes+":"+seconds}
          
        </p>

      <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {post.content.writer}
      </span>
      </div>
      

      <div className="grid grid-cols-3 gap-4">
        <a className=" m-3 col-end-7 col-span-1 inline-flex items-center rounded-md border border-transparent bg-indigo-100 py-2 px-3 text-sm font-medium text-center text-white bg-[#6A64F1] rounded-lg hover:bg-[#5f57ff] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {post.content.comments_count} 
          <Link
            href={{
              pathname: `/content/[post_id]`,
              query: { address: JSON.stringify(post.address) ,post_id:post.content.id},
           
            }}
       
          >
          명과 함께 배달
          </Link>
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PostCard;
