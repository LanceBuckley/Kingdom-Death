import { createContext, useContext, useState } from "react"

// Create the context variable using createContext
const StatsContext = createContext()

export const StatsProvider = ({ children }) => {

    const [stats, update] = useState({
        movement: 5,
        accuracy: 0,
        strength: 0,
        evasion: 0,
        speed: 0,
        luck: 0,
        understanding: 0,
        courage: 0
    })

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <StatsContext.Provider
            value={{ stats, update }}
        >
            {children}
        </StatsContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useStats = () => useContext(StatsContext)

