import React, { Fragment, useState,useEffect, useContext } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgetPassword";
import { LayoutContext } from "../index";

import { handleGuestLogin } from "./fetchApi";

const LoginSignup = (props) => {


  const { data, dispatch } = useContext(LayoutContext);
  const [login, setLogin] = useState(true);
	const [forgotPass, setForgotPass] = useState(false);
  const [loginValue, setLoginValue] = useState("Create an account");
  const loginSignupModalToggle = () =>
    {
			setLogin(true);setForgotPass(false)
			data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });}

  const changeLoginSignup = () => {
    if (login) {
      setLogin(false);
			setForgotPass(false)
      setLoginValue("Login");
    } else {
      setLogin(true);
			setForgotPass(false)
      setLoginValue("Create an account");
    }
  };

	const loginAsGuest = async () => {
        const result = await handleGuestLogin();
        console.log('result', result);
        if (result.success) {
          localStorage.setItem("jwt", JSON.stringify({
            token: result.token,
            user:{_id: result.id, role: '0'}
          }));
          window.location.href = "/";
        }
        // localStorage.setItem("jwt", JSON.stringify({
				// 	token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJndWVzdEBtYWlsLmNvbSIsInJvbGUiOiIwIn19.1EQ5qudt7XEqh7h_QtaFQIMGXFBTyCDAV4WF4lCXg5E',
				// 	user:{_id:'guest',role:'0'}
				// }));
        // window.location.href = "/";
  };

  return (
    <Fragment>
      {/* Black Overlay  */}
      <div
        onClick={(e) => loginSignupModalToggle()}
        className={` ${
          data.loginSignupModal ? "" : "hidden"
        } fixed top-0 z-40 w-full h-screen bg-black opacity-50 cursor-pointer`}
      ></div>
      {/* Signup Login Component Render */}
      <section
        className={` ${
          data.loginSignupModal ? "" : "hidden"
        } fixed z-40 inset-0 my-8 md:my-20 flex items-start justify-center overflow-auto`}
      >
        <div className="w-11/12 md:w-3/5 lg:w-2/4 relative space-y-4 bg-white p-6 md:px-12 md:py-6">
          {forgotPass ? <ForgotPassword setForgotPass={setForgotPass}/> : <>{login?<Login setForgotPass={setForgotPass}/>: <Signup setForgotPass={setForgotPass}/>}</>}
          <div className="flex items-center space-x-2">
            <span className="border-b border-gray-500 w-full" />
            <span className="font-medium">or</span>
            <span className="border-b border-gray-500 w-full" />
          </div>
          <div
            onClick={(e) => changeLoginSignup()}
            style={{ color: "#303031", border: "1px solid #303031" }}
            className="px-4 py-2 font-medium text-center cursor-pointer"
          >
            {loginValue}
          </div>
					<div
            onClick={(e) => loginAsGuest()}
            style={{ color: "#303031", border: "1px solid #303031" }}
            className="px-4 py-2 font-medium text-center cursor-pointer"
          >
            Continue as guest
          </div>
          {/*  Modal Close Button */}
          <div className="absolute top-0 right-0 mx-4">
            <svg
              onClick={(e) => {
                loginSignupModalToggle();
                dispatch({ type: "loginSignupError", payload: false });
              }}
              className="w-6 h-6 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginSignup;
