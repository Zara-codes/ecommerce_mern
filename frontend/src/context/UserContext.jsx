import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";


export const userDataContext = createContext()

const UserContext = ({children}) => {
    let [userData, setUserData] = useState("")
    let {serverUrl} = useContext(AuthDataContext)
    
    const getCurrentUser = async () => {
        try {
            let result = await axios.post(
                `${serverUrl}/api/user/getCurrentUser`,
                {}, 
                {
                    withCredentials: true
                }
            )
            setUserData(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(`getCurrentUser error: ${error}`)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    let value = {
        userData, setUserData, getCurrentUser
    }

    
  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext