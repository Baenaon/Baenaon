import React from "react";
import {backUrl} from "../config/config";

const OAuth2RedirectHandler = (props) => {

    // 인가코드
    let code = new URL(window.location.href).searchParams.get("code");
  
    axios
      .post(backUrl + "/api/user/login/kakao/callback/", {
        // credentials: "include",
        code: code,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };
  
  export default OAuth2RedirectHandler;