import React,{useState} from 'react'
import {useUser} from "../GlobalContext/UserContext"
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import FriendList from "../components/FriendList"
import Searchbar from '../components/Searchbar';
import ViewUsers from '../components/ViewUsers';
import FriendRequests from "../components/FriendRequests"
import Recommendations from "../components/Recommendations"
const Home = () => {
  const [users,setUsers]=useState([]);
  const [search,setSearch]=useState("")
  const [state,setState]=useState(1);
  const [friends,setFriends]=useState([]);
  
  return (<>
 
  
  <div className=" flex h-screen flex-col md:flex-row">
      <Sidebar setState={setState}/>
      <div className="flex flex-col gap-5 px-3 py-5 w-full md:w-[74%] mx-auto ">
        <Header />
        <Searchbar setUsers={setUsers} search={search} setSearch={setSearch} setFriends={setFriends} state={state}/>
  <div className='p-4 shadow-md h-full rounded-lg overflow-y-scroll'>
   
       {state==1 && <ViewUsers users={users} search={search} setUsers={setUsers} friends={friends}/>}
       {state==2 && <FriendList friends={friends} search={search} setFriends={setFriends}/>}
       {state==3 && <FriendRequests search={search}  friends={friends}  setFriends={setFriends}/>}
       {state==4 && <Recommendations search={search}/>}


   </div>
</div>
</div>
  </>

  )
}

export default Home