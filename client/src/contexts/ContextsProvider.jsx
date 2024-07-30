import React, { createContext ,useContext,useState} from 'react'

const StateContext = createContext();

const initialState = {
    userProfile: false,
}

export const ContextProvider =({children})=>{
    const [activeMenu, setActiveMenu] =useState(true)
    const [login,setLogin] = useState(false)
    const [user,setUser] = useState([])
    const[isClicked,setIsClicked]=useState(initialState)

    const handleClick  = (clicked)=>{
        setIsClicked({ ...initialState,[clicked]:true})
    }

    return(
        <StateContext.Provider 
        value={{
            activeMenu,
            setActiveMenu,
            isClicked,
            setIsClicked,
            handleClick,
            login,
            setLogin,
            user,
            setUser
        }}>

        
        {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext)