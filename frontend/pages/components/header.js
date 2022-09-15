import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const [islogin, setislogin] = useState(false)
 

  useEffect (() => {
    const refresh = window.localStorage.getItem("refresh_token");
    if (refresh == null) {
      setislogin(false);
    }
    
    else {
    axios.post("http://127.0.0.1:8000/api/user/refresh/",{refresh:refresh})
    .then(function(response){
      window.localStorage.setItem("access_token",response.data.access);
      console.log("acc",response);
      setislogin(true)
      
    }).catch(function(error) {
      setislogin(false);
      console.log(error);
      window.localStorage.clear();
    })}
  },[])


  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/#">
            <img className="w-10 h-10" src="../../icon.png" />
            <span className="ml-3 text-xl">배나온</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900" href="/#">
              Home
            </a>
            <a className="mr-5 hover:text-gray-900" href="/map">
              지도
            </a>
            { islogin ? (
              <div>
              <a className="mr-5 hover:text-gray-900" href="/useprofile">
                마이페이지
              </a>
               <a className="mr-5 hover:text-gray-900" href="/logout">
               로그아웃
             </a>
             </div>
            ) : (
              <a className="mr-5 hover:text-gray-900" href="/loginform">
                로그인
              </a>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}