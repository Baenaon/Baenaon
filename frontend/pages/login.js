import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
// import axiosInstance from "../axios";
// import LocalStorage from "../localStorage";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const username = "wlals";

  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [token, onChangeToken] = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    const users = {
      username: username,
      email: email,
      password: password,
    };

    const userss = JSON.stringify(users);

    console.log("users:", usersss);
    console.log(typeof usersss == "object");

    axios
      .post("http://127.0.0.1:8000/user/api/token", {
        // credentials: "include",
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "JWT" + localStorage.getItem("access_token")
            : null,
          "content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.parse(userss),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <>
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Full Name
            </label>
          </div>

          {/*아이디*/}
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              onChange={onChangeEmail}
              required
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              Password
            </label>
          </div>

          {/*비밀번호*/}
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              placeholder="******************"
              onChange={onChangePassword}
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3"></div>
          <label class="md:w-2/3 block text-gray-500 font-bold">
            <input class="mr-2 leading-tight" type="checkbox" />
            <span class="text-sm">Send me your newsletter!</span>
          </label>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            {/*버튼*/}
            <button
              class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={onSubmit}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
