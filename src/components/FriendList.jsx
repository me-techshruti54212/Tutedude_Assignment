import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useUser } from '../GlobalContext/UserContext';
import { BsPersonFill } from 'react-icons/bs';
const FriendList = ({friends,setFriends,search}) => {
  const {user}=useUser()
  
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
  const handleUnFriend=async(id)=>{
    await axios.post("https://tutedude-backend.vercel.app/api/user/unfriend",{
      userId:user.userId,
      friendId:id
    })
    setFriends(friends.filter((friend)=>friend._id !== id))
  }
  const searchfilter = (friends, search) => {
    return friends?.filter((one) =>
      one.username.toLowerCase().includes(search.toLowerCase())
    );
  };
  return (
    <div className="flex flex-col gap-4 md:w-[90%] mx-auto ">
    {
      friends.length> 0 ? searchfilter(friends, search).map((friend)=>{
          return (
            <div
              key={friend._id}
              className="flex border-2 px-4 py-3 rounded-lg justify-between"
            >
              <div className="flex items-center gap-4">
                <BsPersonFill size={25} />
                <div className="flex flex-col">
                <p className="text-black font-semibold">{friend.username}</p>

                <p className="text-black sm:block hidden">{friend.email}</p>
                </div>
              </div>
              <button className="text-white bg-[#4C35DE] rounded sm:px-3 self-center  sm:py-2 px-1 " onClick={()=>handleUnFriend(friend._id)}>
                Unfriend
              </button>
            </div>
          )

      })  :
      <div className='text-center'>
          <h1 className='text-lg'>Looks like you haven't added any friends yet!</h1>
      </div>
    }
    </div>
  )
}

export default FriendList