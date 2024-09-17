import React from 'react'
import { useState,useContext,createContext,useEffect } from 'react'

const UserContext = createContext(undefined);
// const defaultUser={
//     token:sessionStorage.getItem("token"),
//     username:"",
//     password:"",
//     userId:""
// }
const getInitialState=()=>{
  const currentUser=sessionStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
}
export const UserProvider  = ({ children }) => {
    const [user, setUser] = useState(getInitialState);
  useEffect(()=>{
      sessionStorage.setItem("currentUser",JSON.stringify(user))
  },[user])
    return (
      <UserContext.Provider value={{ user, setUser }}>
      {children}
      </UserContext.Provider>
    );
  };
  

  export const useUser = () => {
    const context = useContext(UserContext);
    if (context === null) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };