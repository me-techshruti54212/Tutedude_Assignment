import React, { useEffect, useState } from 'react'
import { useUser } from '../GlobalContext/UserContext'
import { BsPersonFill } from 'react-icons/bs'
import axios from 'axios'

const Recommendations = ({search}) => {
  const [recommendations,setRecommendations]=useState([])
  const {user}=useUser()
  
  async function getFriendRecommendations(){
    await axios.post("https://tutedude-backend.vercel.app/api/user/recommendations",{
      userId:user?.userId
    }).then(({data})=>{
      if(data.success)
      {setRecommendations(data.recommendations);
        console.log("recommendations",data.recommendations);
      }
    })
}
useEffect(()=>{
  getFriendRecommendations()
},[])
const searchfilter = (recommendations, search) => {
  return recommendations?.filter((one) =>
    one.username.toLowerCase().includes(search.toLowerCase())
  );
};
const handleSendRequest=async(e)=>{

}
  return (
    <div className="flex flex-col gap-4 md:w-[90%] mx-auto">
    {
      recommendations?.length> 0 ? searchfilter(recommendations, search).map((user)=>{
          return (
            <div
              key={user._id}
              className="flex border-2 px-4 py-3 rounded-lg justify-between"
            >
              <div className="flex items-center gap-4">
                <BsPersonFill size={25} />
                <div className="flex flex-col">
                <p className="text-black font-semibold">{user.username}</p>

                <p className="text-black sm:block hidden">{user.email}</p>
                </div>
              </div>
              <button className="text-white bg-[#4C35DE] rounded sm:px-3 self-center  sm:py-2 px-1 "
               onClick={()=>handleSendRequest(user._id)}
               >
                Send Request
              </button>
             
            </div>
          )

      })  :
      <div className='text-center'>
          <h1 className='text-lg'>"Looks like there aren't any friend recommendations at the moment. Check back later for new connections!</h1>
      </div>
    }
    </div>
  )
}

export default Recommendations