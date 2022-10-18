import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const PostCard = () => {
  return (
    <div>
      <div className="border-2 p-4 border-black rounded-lg">
        <div className="flex justify-between">
          <div className="font-custom text-2xl">
            저랑 연어초밥 같이 시켜 먹어요
          </div>
          <div class="text-[#555555] text-m">2022-10-17 22:48:00</div>
        </div>
        <div class="w-30 pt-4">
          <div class="text-[#555555]  ">
            어제부터 연어 초밥이 너무 먹고 싶었는데 같이 먹을 사람이 없어요 혹시
            배달 시켜서 같이 드실 분 찾습니다.
          </div>
        </div>
        <div class="relative">
          <div class="absolute bottom-0 right-0 flex text-[#555555]">
            <div>작성자 : </div>
            <div> &nbsp;김지민</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
