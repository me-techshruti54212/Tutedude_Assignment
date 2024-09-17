import React,{useEffect, useState} from "react";
import { useUser } from "../GlobalContext/UserContext";
import { BsPersonFill } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { SuccessToastIcon } from "./constants/functions";

const ViewUsers = ({ users, search ,setUsers,friends}) => {
  const { user } = useUser();
  // const friendIds=friends.map((friend)=>friend._id)
  async function getallUsers()
  {
    await axios.get("https://tutedude-backend.vercel.app/api/user/getallUsers").then(({data})=>{setUsers(data.users);
      console.log(data.users)
    })
  }
  useEffect(()=>{
    getallUsers()
  },[])
  const searchfilter = (users, search) => {
    return users?.filter((one) =>
      one.username.toLowerCase().includes(search.toLowerCase())
    );
  };
  const handleAddFriendRequest=async(id)=>{
    await axios.post("https://tutedude-backend.vercel.app/api/user/sendfriendRequest",{
      userId:user.userId,
      friendId:id
    }).then((res)=>{
      if(res.data.success)
      {
        toast.success(res.data.message, {
          icon: <SuccessToastIcon/>,
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      }
    })
  }

  return (
    <div className="flex flex-col gap-4 md:w-[90%] mx-auto ">
      {searchfilter(users, search)
        ?.filter((oneuser) => {
          return oneuser._id !== user.userId;
        })
        .map((oneuser) => {
          return (
            <div
              key={oneuser._id}
              className="flex border-2 px-4 py-3 rounded-lg justify-between"
            >
              <div className="flex items-center gap-4">
                <BsPersonFill size={25} />
                <div className="flex flex-col">
                <p className="text-black font-semibold">{oneuser.username}</p>

                <p className="text-black sm:block hidden">{oneuser.email}</p>
                </div>
              </div>
              {!(friends.map((friend)=>friend._id)).includes(oneuser._id) ?
                <button className="text-white bg-[#4C35DE] rounded sm:px-3 self-center  sm:py-2 px-1 " onClick={()=>handleAddFriendRequest(oneuser._id)}>
                Add as Friend
              </button>:<button className="text-white bg-[#4C35DE] rounded sm:px-3 self-center  sm:py-2 px-1 ">My Friend</button>}
            </div>
          );
        })}
    </div>
  );
};

export default ViewUsers;
