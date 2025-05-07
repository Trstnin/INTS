import React from 'react'
import {createContext,useState} from "react"

export const UserDataContext = createContext();

const UserContext = ({children}) => {
     const[user,setUser] = useState({
        Email:"",
        FirstName:"",
        LastName:"",
        avatarUrl:""
     })


     return(
        <div>
            <UserDataContext.Provider value={{user,setUser}}>
                {children}
            </UserDataContext.Provider>
        </div>
     )
}

export default UserContext