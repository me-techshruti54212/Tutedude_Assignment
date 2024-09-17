import React, { useState } from 'react'
import {BsPersonFill} from "react-icons/bs"
import {TbLockFilled} from "react-icons/tb"
import { useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"
import axios from "axios"
// import {AiFillExclamationCircle} from "react-icons/ai"
// import { CiCircleCheck } from "react-icons/ci";
import { useUser } from '../GlobalContext/UserContext'
import { CustomToastIcon, SuccessToastIcon } from '../components/constants/functions'

const LoginPage = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("")
    const [toggle1,setToggle1]=useState(false);
    const [toggle2,setToggle2]=useState(false);
    const navigate=useNavigate()
    const {user,setUser}=useUser()
    
    const handleSignin=async(e)=>{
      e.preventDefault();
      if( !password || !username)
        {
          toast.error("Please enter all details", {
            icon: <CustomToastIcon />,
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
          return;
        }
        if(username.length<4)
          {
            toast.error("Username must be at least 4 characters long", {
              icon: <CustomToastIcon />,
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });
            return;
          }
          if(password.length<6)
          {
            toast.error("Password must be at least 6 characters long", {
              icon: <CustomToastIcon />,
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });
            return;
          }
          await axios.post("https://tutedude-backend.vercel.app/api/user/login",{
            username,password
          }).then(({data})=>{
            
            if(data.success)
            {
              toast.success(data.message, {
                icon: <SuccessToastIcon/>,
                style: {
                  backgroundColor: "green",
                  color: "white",
                },
              });
            // sessionStorage.setItem('token', data.token);
           setUser(()=>{return {username:username,password:password,token:data.token,userId:data.userId}})
           console.log("user",user)

              navigate("/")
              return;
            }
            else{
              toast.error(data.message, {
                icon: <CustomToastIcon />,
                style: {
                  backgroundColor: "red",
                  color: "white",
                },
              })
            }
          })
    }
  return (
   <>
     <div className="flex">
      <div className="lg:w-[60%] md:w-[80%] flex items-center justify-center w-full">
        <div className="flex flex-col gap-12 w-[85%] items-center">
          <h2 className="font-semibold text-4xl text-center">Welcome Back!</h2>  
          <form className="flex flex-col gap-6" onSubmit={handleSignin}>
            <div className="flex items-center gap-6 border border-black rounded-2xl px-8 py-1 w-[100%] relative">
              <BsPersonFill
                size={32}
                className={`absolute bg-[#f5f5f5] transition duration-200 ${
                  username?.length > 0 || toggle1 ? "transform -translate-y-7 -translate-x-1 scale-50" : ""
                }`}
              />
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="text-xl outline-none placeholder-black w-full bg-transparent py-1.5 px-2"
                onFocus={() => setToggle1(true)}
                onBlur={() => setToggle1(false)}
              />
              <label
                className={`font-semibold text-xl absolute left-20 transition duration-200 pointer-events-none bg-[#f5f5f5] ${
                  username?.length > 0 || toggle1 ? "transform -translate-y-7 -translate-x-10 scale-75" : ""
                }`}
              >
               Username
              </label>
            </div>
            <div className="flex items-center gap-6 border border-black rounded-2xl px-8 py-1 relative">
              <TbLockFilled
                size={32}
                className={`absolute bg-[#f5f5f5] input-text transition duration-200 ${
                  password?.length > 0 || toggle2 ? "transform -translate-y-7 -translate-x-1 scale-50" : ""
                }`}
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="text-xl outline-none placeholder-black w-full bg-transparent py-1.5 px-2"
                onFocus={() => setToggle2(true)}
                onBlur={() => setToggle2(false)}
              />
              <label
                className={`font-semibold text-xl absolute left-20 transition duration-200 pointer-events-none bg-[#f5f5f5] ${
                  password?.length > 0 || toggle2 ? "transform -translate-y-7 -translate-x-10 scale-75" : ""
                }`}
              >
                Password
              </label>
            </div>
            <p className='font-medium px-2'>Don't have an account ? <span className='cursor-pointer font-bold'  onClick={()=>navigate("/signup")}>Click here</span></p>
            <button
              type="submit"
              className="font-semibold text-white px-10 py-2.5 bg-gradient-to-r from-[#01B6DA] to-[#4C35DE] rounded-2xl self-center"
            >
              Login
            </button>
           
          </form>

          </div>
      </div>
      <div className="h-screen">
        <img src="assets/loginimg.svg" className="object-cover h-full md:inline hidden" alt="Login Illustration" />
      </div>
      </div>  
   </>
  )
}

export default LoginPage