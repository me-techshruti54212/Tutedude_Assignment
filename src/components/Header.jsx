import React from 'react'
import { useState, useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import { formatDate } from "../components/constants/functions";
import { useNavigate } from "react-router-dom";
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import { useUser } from "../GlobalContext/UserContext";
const Header = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const {user,setUser} = useUser();
const [showpwd,setShowpwd]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    setCurrentDate(formatDate(date));
  }, []);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
  

  

    <div className="md:flex hidden justify-between items-center">

      <span className="font-semibold">{currentDate}</span>
      <div className="relative z-50">
        <div
          className="border border-black px-6 py-1 flex items-center gap-2 rounded-2xl cursor-pointer"
          onClick={handleToggleDropdown}
        >
          <BsPersonFill size={22} />
          <span className="font-semibold text-xl">Account</span>
        </div>
        {showDropdown && (
           <div className="absolute right-0 mt-2 w-[18rem]  bg-gray-200 rounded-lg shadow-lg p-7 flex flex-col gap-4 text-sm">
            <h1 className="text-center font-bold text-2xl">Account</h1>
            <div className="flex items-center p-2  shadow-lg rounded-2xl border border-gray-600 ">
              <BsPersonFill size={15} className="ml-8" />
              <span className="ml-3 mr-8 font-semibold"> {user.username} </span>
            </div>
            <div className="flex items-center p-2 shadow-lg rounded-2xl border border-gray-600 ">
              <span className="font-bold ml-8 cursor-pointer" onClick={()=>setShowpwd(!showpwd)}>{showpwd ? <BsEyeSlash/> :<BsEye/>}</span>
              <input type={showpwd? "text":"password"} className="ml-3  mr-8 font-semibold outline-none border-none w-full bg-transparent text-ellipsis overflow-hidden" value={user.password}/>
            </div>
           
            <div className="flex justify-center">
            <button
              className=" shadow-lg  w-32 py-2 text-white bg-[#4C35DE] rounded-2xl mt-4 "
              onClick={() => {
                 setUser({})
                navigate("/login")
                }}
            >
              Logout
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header