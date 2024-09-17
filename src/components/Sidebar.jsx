import React from 'react'

const Sidebar = ({setState}) => {
  return (
    <div className="md:w-[23%] lg:w-[20%] bg-[#ECECEC] rounded-e-lg px-3 py-5 md:h-screen h-16 w-full gap-20 flex flex-col ">
      <img src="/assets/connect.png" className="w-2/3 md:inline hidden" />
        <div className="flex md:flex-col gap-5 justify-around md:items-start items-center">
            <button className="font-semibold sm:text-lg text-sm  " onClick={()=>setState(1)}>View Users</button>
            <button className="font-semibold sm:text-lg text-sm " onClick={()=>setState(2)}>My Friends</button>
            <button className="font-semibold sm:text-lg text-sm " onClick={()=>setState(3)}>Friend Requests</button>
            <button className="font-semibold text-sm sm:text-lg" onClick={()=>setState(4)}>Recommendations</button>
        </div>
       
    </div>

  )
}

export default Sidebar