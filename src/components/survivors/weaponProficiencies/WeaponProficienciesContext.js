import { createContext, useContext, useEffect, useState } from "react"
import { getWeaponProficiencies } from "../../../managers/weaponProfManager"

// Create the context variable using createContext
const WeaponProficienciesContext = createContext()

// Code as normal, all things data related, useState, useeffect, etc. Make sure to pass children as a parameter
export const WeaponProficienciesProvider = ({ children }) => {
    const [allProficiencies, setProficiencies] = useState([])
    const [chosenProficiency, setChosenProficiency] = useState({
        id: 0,
        name: null
    })

    useEffect(
        () => {
            getWeaponProficiencies()
                .then((weaponProficiencies) => {
                    setProficiencies(weaponProficiencies)
                })
        },
        []
    )

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <WeaponProficienciesContext.Provider
            value={{ allProficiencies, chosenProficiency, setChosenProficiency }}
        >
            {children}
        </WeaponProficienciesContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useWeaponProficiencies = () => useContext(WeaponProficienciesContext)