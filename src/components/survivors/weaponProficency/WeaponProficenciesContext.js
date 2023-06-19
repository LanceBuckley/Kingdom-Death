import { createContext, useContext, useEffect, useState } from "react"
import { getWeaponProficencies } from "../../ApiManager"

// Create the context variable using createContext
const WeaponProficenciesContext = createContext()

// Code as normal, all things data related, useState, useeffect, etc. Make sure to pass children as a parameter
export const WeaponProficenciesProvider = ({ children }) => {
    const [allProficencies, setProficencies] = useState([])
    const [chosenProficency, setChosenProficency] = useState({
        id: 0,
        name: null
    })

    useEffect(
        () => {
            getWeaponProficencies()
                .then((weaponProficencies) => {
                    setProficencies(weaponProficencies)
                })
        },
        []
    )

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <WeaponProficenciesContext.Provider
            value={{ allProficencies, chosenProficency, setChosenProficency }}
        >
            {children}
        </WeaponProficenciesContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useWeaponProficencies = () => useContext(WeaponProficenciesContext)