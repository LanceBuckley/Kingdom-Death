import React, { createContext, useContext, useState } from "react"

// Create the context variable using createContext
const KingdomDeathContext = createContext()

// Code as normal, all things data related, useState, useEffect, etc. Make sure to pass children as a parameter
export const KingdomDeathProvider = ({ children }) => {

    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [isGameMaster, setIsGameMasterState] = useState(localStorage.getItem('is_game_master'))

    const setToken = (newToken) => {
        localStorage.setItem('auth_token', newToken)
        setTokenState(newToken)
    }
    
    const setIsGameMaster = (isGameMaster) => {
        localStorage.setItem('is_game_master', isGameMaster)
        setIsGameMasterState(isGameMaster)
    }

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <KingdomDeathContext.Provider
            value={{ token, isGameMaster, setToken, setIsGameMaster }}
        >
            {children}
        </KingdomDeathContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useKingdomDeath = () => useContext(KingdomDeathContext)



