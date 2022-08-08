import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const ForgotPassword = (props) => {
  const { data: layoutData, dispatch: layoutDispatch } = useContext(
    LayoutContext
  );

  const [data, setData] = useState({
    email: "",
    password: "",
    cPassword: "",
		otp:'',
		loading:false
  });

	const [user, setUser] = useState(null);
	const [msg, setMsg] = useState(null);
	const [msg1, setMsg1] = useState(null);
  const formSubmit = async () => {
    setMsg(null);setMsg1(null)
    try {
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if (email_reg.test(data.email) == false) {				
        setMsg('Invalid email address')
				return
			}
      if(!user){
				setData({ ...data, loading: true });
				let res = await axios.post(`${apiURL}/api/user/getuser-bymail`, data);
				if(res.data.error){
					setMsg1(null)
					setMsg(res.data.error)
				} else {
					setMsg(null)
					setMsg1(res.data.massage)
					setUser(res.data.User)
				}
				setData({ ...data, loading: false });
			}else{
				if(!data.password || data.password !== data.cPassword){
					setMsg('Password mismatch')
					setMsg1(null)
				} else if (data.password.length < 8) {
					setMsg('Password must be 8 charecter')
					setMsg1(null)
				} else {
					setData({ ...data, loading: true });
					let res = await axios.post(`${apiURL}/api/user/forgotPass`, {_id:user._id,password:data.password,otp:data.otp});
					if(res.data.error  ==='invalidOtp'){
						setMsg('Invalid OTP')
					}					
					if(res.data.massage  ==='done'){
						setMsg1('Password changed successfully')
						setMsg(null)
						setUser(null)
						setData({password:'',cPassword:'',email:''})
					}
					setData({ ...data, loading: false });	
				}			
			}
    } catch (error) {
      console.log(error);
    }
  };


	if (data.loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          class="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
			{msg && <div className="text-xs text-red-500">{msg}</div>}
			{msg1 && <div className="text-xs text-green-500">{msg1}</div>}
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">
            email address
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, email: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.email}
            type="email"
            id="name"
						required
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border`}
          />
        </div>
				{user && <>
				<div className="flex flex-col">
          <label htmlFor="otp">
            OTP 
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                otp: e.target.value,
              })
            }
            value={data.otp}
            type="password"
            className={`${
              data.error?.otp ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border`}
          />
        </div>
				<div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                password: e.target.value,
              })
            }
            value={data.password}
            type="password"
            id="password"
            className={`${
              data.error?.password ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="cPassword">
            Confirm password
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                cPassword: e.target.value,
              })
            }
            value={data.cPassword}
            type="password"
            id="cPassword"
            className={`${
              data.error?.cPassword ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border`}
          />
        </div>
				</>}
        <div
          onClick={(e) => formSubmit()}
          style={{ background: "#000" }}
          className="font-medium px-4 py-2 text-white text-center cursor-pointer"
        >
          {!user ? <div>Submit Email</div> : <div>Set New Password</div>}
        </div>
      </form>
    </Fragment>
  );
};

export default ForgotPassword;
