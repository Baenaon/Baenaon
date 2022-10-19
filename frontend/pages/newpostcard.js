import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const PostCardnew = ({ post }) => {
  const [day, time] = post.content.updated_at.split("T");
  const hours = time.split(".")[0].split(":")[0];
  const minutes = time.split(".")[0].split(":")[1];
  const seconds = time.split(".")[0].split(":")[2];
  return (
    <a className="">
      <Link
        href={{
          pathname: `/content/[post_id]`,
          query: {
            // address: JSON.stringify(post.address),
            post_id: post.content.id,
          },
        }}
      >
        <div className="border-2 p-4 border-black rounded-lg">
          <div className="flex justify-between">
            <div className="font-custom text-2xl">{post.content.title}</div>
            <div class="text-[#555555] text-m">
              {day} &nbsp;{hours + ":" + minutes + ":" + seconds}
            </div>
          </div>
          <div class="w-30 pt-4">
            <div class="text-[#555555]  ">
              어제부터 연어 초밥이 너무 먹고 싶었는데 같이 먹을 사람이 없어요
            </div>
          </div>
          <div class="relative">
            <div class="absolute bottom-0 right-0 flex text-[#555555]">
              <div>작성자 : </div>
              <div> &nbsp;{post.content.writer}</div>
            </div>
          </div>
        </div>
      </Link>
    </a>
  );
};

export default PostCardnew;
