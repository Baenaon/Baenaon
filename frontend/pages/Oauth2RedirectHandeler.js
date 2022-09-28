import React from "react";

const OAuth2RedirectHandler = (props) => {

    // 인가코드
    let code = new URL(window.location.href).searchParams.get("code");
  
    axios
      .post("http://127.0.0.1:8000/api/user/login/kakao/callback/", {
        // credentials: "include",
        code: code,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };
  
  export default OAuth2RedirectHandler;