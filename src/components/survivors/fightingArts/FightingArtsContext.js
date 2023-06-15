import { createContext, useContext, useEffect, useState } from "react"
import { getFightingArts } from "../../ApiManager"

// Create the context variable using createContext
const FightingArtsContext = createContext()

// Code as normal, all things data related, useState, useeffect, etc. Make sure to pass children as a parameter
export const FightingArtsProvider = ({ children }) => {
    const [allFightingArts, setFightingArts] = useState([])
    const [chosenFightingArts, setChosenFightingArts] = useState([])

    useEffect(
        () => {
            getFightingArts()
                .then((fightingArts) => {
                    setFightingArts(fightingArts)
                })
        },
        []
    )

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <FightingArtsContext.Provider
            value={{ allFightingArts, chosenFightingArts, setChosenFightingArts }}
        >
            {children}
        </FightingArtsContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useFightingArts = () => useContext(FightingArtsContext)