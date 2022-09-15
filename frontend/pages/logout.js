import React, { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";

const Logout = () => {

  useEffect(() => {
    
    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token")
    console.log("access", access_token);
    console.log("refresh", refresh_token);
    axios
      .post("http://127.0.0.1:8000/api/user/logout/", {refresh_token: refresh_token},{
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (response) {
        Router.push("http://localhost:3000");
        window.localStorage.clear();

      })
      .catch(function (error) {
        Router.push("http://localhost:3000");
        window.localStorage.clear();
        console.log(error);
      });
  },);

  return;
};

export default Logout;
