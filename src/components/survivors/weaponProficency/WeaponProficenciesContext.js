import { createContext, useContext, useEffect, useState } from "react"
import { getWeaponProficencies } from "../../ApiManager"

const WeaponProficenciesContext = createContext()

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

    return (
        <WeaponProficenciesContext.Provider
            value={{ allProficencies, chosenProficency, setChosenProficency }}
        >
            {children}
        </WeaponProficenciesContext.Provider>
    )
}

export const useWeaponProficencies = () => useContext(WeaponProficenciesContext)