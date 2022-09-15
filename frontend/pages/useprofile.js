import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../pages/components/header";
import Router from "next/router";

const userprofile = () => {
  const [user_profile, set_user_profile] = useState({});
  const [access_token, set_access_token] = useState({});
  function refreshToken(){
    const refresh = window.localStorage.getItem("refresh_token");
    return axios.post("http://127.0.0.1:8000/api/user/refresh/", {
      refresh : refresh
    });
  }

  useEffect(() => {
    set_access_token(window.localStorage.getItem("access_token"));
    axios
      .get("http://127.0.0.1:8000/api/user/mypage/",{
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
      )
      .then(function (response) {
        set_user_profile(response.data);
      })
      .catch(function (error) {
        
      });
  },[access_token]);
  console.log(user_profile);



  return (
    <div>
      <Header />
      {Object.keys(user_profile).map((user) => (
        <div className="flex justify-center  items-center h-screen">
          <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-blue-50 w-full mb-6 shadow-lg rounded-xl mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full flex justify-center">
                  <div className="relative"></div>
                </div>
                <div className="w-full text-center mt-20">
                  <div className="text-center mt-2">
                    <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                      {user_profile[user].nickname}
                    </h3>
                    <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                      {user_profile[user].address}
                    </div>
                  </div>
                  <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                        {user_profile[user].len_posts}
                      </span>
                      <a
                        href="/mypagepost"
                        className="font-normal text-slate-700 hover:text-slate-400"
                      >
                        내가 쓴 글
                      </a>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                        {user_profile[user].len_comments}
                      </span>
                      <a
                        href="/mypagecomment"
                        className="font-normal text-slate-700 hover:text-slate-400"
                      >
                        내가 쓴 댓글
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 py-6 border-t border-slate-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4">
                    <p className="font-light leading-relaxed text-slate-600 mb-4">
                      당신의 주문을 기다리고 있어요 !
                    </p>
                    <a
                      href="/map"
                      className="font-normal text-slate-700 hover:text-slate-400"
                    >
                      주문하러 가기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default userprofile;
