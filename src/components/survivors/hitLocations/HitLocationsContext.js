import { createContext, useContext, useState } from "react"

const HitLocationsContext = createContext()

export const HitLocationsProvider = ({children}) => {
    const [hitLocations, setHitLocations] = useState({
        headArmor: 0,
        headWound: false,
        armArmor: 0,
        armLightWound: false,
        armHeavyWound: false,
        bodyArmor: 0,
        bodyLightWound: false,
        bodyHeavyWound: false,
        waistArmor: 0,
        waistLightWound: false,
        waistHeavyWound: false,
        legArmor: 0,
        legLightWound: false,
        legHeavyWound: false,
    })
    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <HitLocationsContext.Provider
            value={{ hitLocations, setHitLocations }}
        >
            {children}
        </HitLocationsContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useHitLocations = () => useContext(HitLocationsContext)