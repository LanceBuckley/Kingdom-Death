import { createContext, useContext, useEffect, useState } from "react"
import { getAbilities } from "../../../managers/abilityManager"

// Create the context variable using createContext
const AbilitiesContext = createContext()

// Code as normal, all things data related, useState, useeffect, etc. Make sure to pass children as a parameter
export const AbilitiesProvider = ({ children }) => {
    const [allAbilities, setAbilities] = useState([])
    const [chosenAbilities, setChosenAbilities] = useState([])

    useEffect(
        () => {
            getAbilities()
                .then((abilities) => {
                    setAbilities(abilities)
                })
        },
        []
    )

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <AbilitiesContext.Provider
            value={{ allAbilities, chosenAbilities, setChosenAbilities }}
        >
            {children}
        </AbilitiesContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useAbilities = () => useContext(AbilitiesContext)