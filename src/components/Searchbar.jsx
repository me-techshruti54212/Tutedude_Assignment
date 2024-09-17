import React,{useEffect} from 'react'
import axios from 'axios';
import {IoMdRefresh} from "react-icons/io"
import {IoSearch} from "react-icons/io5"
import { useUser } from '../GlobalContext/UserContext';

const Searchbar = ({setUsers,search,setSearch,setFriends,state}) => {
  const { user } = useUser();

  async function getallUsers()
  {
    await axios.get("https://tutedude-backend.vercel.app/api/user/getallUsers").then(({data})=>{setUsers(data.users);
      console.log(data.users)
    })
  }
  useEffect(()=>{
    getallUsers()
  },[])
  async function getFriendsList(){
    await axios.post("https://tutedude-backend.vercel.app/api/user/getFriendsList",{
      userId:user?.userId
    }).then(({data})=>{
      if(data.success)
      {setFriends(data.friends)}
    })
}
useEffect(()=>{
getFriendsList()
},[])

  return (
    <div className="border-2 rounded-2xl px-2 py-2 border-black hidden gap-3 w-full shadow-lg md:flex">
          <span className="font-semibold ">Filter by:</span>
          <div className="flex justify-between px-2 w-[90%] ">
            
            <div className="flex gap-3 items-center">
              <IoSearch className="" />
              <input
                type="text"
                className="font-medium bg-[#f5f5f5] outline-none w-[90%] placeholder-black "
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>
        </div>
  )
}

export default Searchbar