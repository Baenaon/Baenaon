import React from "react";
import { backUrl } from "../../../config/config";
import { useEffect,useState } from "react";
import axios from "axios";

import Router from "next/router";
const OAuth2RedirectHandler = (props) => {
    const [code, setcode] = useState("");
    // 인가코드
    useEffect(() => {
        setcode(new URL(window.location.href).searchParams.get("code"));
    }, []);
    axios
      .get(`${backUrl}/api/user/login/kakao/callback?code=${code}`,{
        code : code
      } 
      )
      .then((res) => {
        const refresh_token = res.data.refresh_token;
        const access_token = res.data.access_token;
        console.log(res.data);
	const address = res.data.address;
        window.localStorage.setItem("access_token", access_token);
        window.localStorage.setItem("refresh_token", refresh_token);
	window.localStorage.setItem("address", address); 
     	if (res.data.address == ''){
          Router.push("/kakaoaddress")
        }
      	else{
          Router.push("/");
        }
      });
    console.log(code);
  };
  
  export default OAuth2RedirectHandler;
