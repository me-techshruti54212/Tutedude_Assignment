import React, { useState } from 'react'
import {BsPersonFill} from "react-icons/bs"
import {TbLockFilled} from "react-icons/tb"
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { MdEmail } from "react-icons/md";

import axios from "axios"
import { CustomToastIcon, SuccessToastIcon } from '../components/constants/functions'

const SignupPage = () => {
    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("")
    const [toggle1,setToggle1]=useState(false);
    const [toggle2,setToggle2]=useState(false);
    const [toggle3,setToggle3]=useState(false);
    const navigate=useNavigate()
const handleSignUp=async(e)=>{
  e.preventDefault();
  if(!email || !password || !username)
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
  const validemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!validemail.test(email))
  {
    toast.error("Please enter a valid email address", {
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
  await axios.post("https://tutedude-backend.vercel.app/api/user/register",{
    username,email,password
  }).then(({data})=>{
    console.log(data)
    console.log(data.success)
    if(data.success)
    {

      toast.success(data.message, {
        icon: <SuccessToastIcon/>,
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      navigate("/login")
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
          <h2 className="font-semibold text-4xl text-center">Welcome!</h2>  
          <form className="flex flex-col gap-6" onSubmit={handleSignUp}>
          <div className="flex items-center gap-6 border border-black rounded-2xl px-8 py-1 relative">
              <MdEmail
                size={29}
                className={`absolute bg-[#f5f5f5] input-text transition duration-200 ${
                  email?.length > 0 || toggle3 ? "transform -translate-y-7 -translate-x-1 scale-50" : "" 
                }`}
              />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="text-xl outline-none placeholder-black w-full bg-transparent py-1.5 px-2"
                name="email"
                onFocus={() => setToggle3(true)}
                onBlur={() => setToggle3(false)}
              />
              <label
                className={`font-semibold text-xl absolute left-20 transition duration-200 pointer-events-none bg-[#f5f5f5] ${
                  email?.length > 0 || toggle3 ? "transform -translate-y-7 -translate-x-9 scale-75" : ""
                }`}
              >
                Email
              </label>
            </div>
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
                name="username"

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
                name="password"
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
            <p className='font-medium px-2'>Already have an account ? <span className='cursor-pointer font-bold' onClick={()=>navigate("/login")}>Click here</span></p>
            <button
              type="submit"
              className="font-semibold text-white px-10 py-2.5 bg-gradient-to-r from-[#01B6DA] to-[#4C35DE] rounded-2xl self-center"
            >
              Signup
            </button>
           
          </form>

          </div>
      </div>
      <div className="h-screen">
        <img src="assets/loginimg.svg" className="object-cover h-full md:inline hidden" alt="Login Illustration" />
      </div>

      </div> 
      {/* <ToastContainer/> */}
     
{/* <div>

</div> */}

   </>
  )
}

export default SignupPage