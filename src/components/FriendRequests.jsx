import React,{useEffect, useState} from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { useUser } from '../GlobalContext/UserContext'
import axios from 'axios'
import { SuccessToastIcon } from './constants/functions'
import toast from 'react-hot-toast'

const FriendRequests = ({search,friends,setFriends}) => {
  const [friendRequests,setFriendRequests]=useState([])
  const {user}=useUser()
  
  async function getFriendRequests(){
    await axios.post("https://tutedude-backend.vercel.app/api/user/getfriendRequests",{
      userId:user?.userId
    }).then(({data})=>{
      if(data.success)
      {setFriendRequests(data.friendRequests)}
    })
}
useEffect(()=>{
getFriendRequests()
},[])
  const searchfilter = (friendRequests, search) => {
    return friendRequests?.filter((one) =>
      one.username.toLowerCase().includes(search.toLowerCase())
    );
  };
  const handleAcceptRequest=async(id)=>{
    await axios.post("https://tutedude-backend.vercel.app/api/user/acceptfriendRequest",{
      userId:user.userId,
      friendId:id
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
    setFriendRequests(friendRequests.filter((request)=>request._id!==id))

      }
    })
  }
  const handleRejectRequest=async(id)=>{
    await axios.post("https://tutedude-backend.vercel.app/api/user/rejectfriendRequest",{
      userId:user.userId,
      friendId:id
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
        setFriendRequests(friendRequests.filter((request)=>request._id!==id))
      }
    })
    
  }
  return (
    <div className="flex flex-col gap-4 md:w-[90%] mx-auto ">
    {
      friendRequests.length> 0 ? searchfilter(friendRequests, search).map((request)=>{
          return (
            <div
              key={request._id}
              className="flex border-2 px-4 py-3 rounded-lg justify-between"
            >
              <div className="flex items-center gap-4">
                <BsPersonFill size={25} />
                <div className="flex flex-col">
                <p className="text-black font-semibold">{request.username}</p>

                <p className="text-black sm:block hidden">{request.email}</p>
                </div>
              </div>
              <div className='flex gap-4'>
              <button className="text-white bg-[#4C35DE] rounded sm:px-3 self-center  sm:py-2 px-1 "
               onClick={()=>handleAcceptRequest(request._id)}
               >
                Accept
              </button>
              <button className="text-white bg-[#4C35DE] rounded sm:px-3 self-center  sm:py-2 px-1 " 
              onClick={()=>handleRejectRequest(request._id)}
              >
                Reject
              </button>
              </div>
            </div>
          )

      })  :
      <div className='text-center'>
          <h1 className='text-lg'>Looks like you don't have any friend requests yet!</h1>
      </div>
    }
    </div>
  )
}

export default FriendRequests