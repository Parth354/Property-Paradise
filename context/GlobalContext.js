'use client';
import { createContext , useContext , useState } from "react";

//Create context
const GlobalContext=createContext();

//Create Provider
export function GlobalProvider({children}){
    const [unReadCount , setUnreadCount]= useState(0)
    return (
        <GlobalContext.Provider value={{
            unReadCount,
            setUnreadCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

//Create Custom Hook To aceess Context
export function useGlobalContext(){
    return useContext(GlobalContext);
}