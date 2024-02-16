import { createContext, useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getSurvivorToEdit } from "../../../managers/survivorManager"

// Create the context variable using createContext
const SurvivorContext = createContext()

// Code as normal, all things data related, useState, useeffect, etc. Make sure to pass children as a parameter
export const SurvivorFormProvider = ({ children }) => {


    const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)

    const location = useLocation()
    const { survivorId } = useParams()
    const navigate = useNavigate()

    const isEditPage = location.pathname === `/survivor/${survivorId}`

    const [survivor, update] = useState({
        userId: deathUserObject.id,
        name: "",
        survival: 0,
        insanity: 0,
        huntXp: 0,
        gender: null,
    })

    useEffect(
        () => {
            if (isEditPage) {
                getSurvivorToEdit(survivorId)
                    .then((survivorToEdit) => {
                        update(survivorToEdit)
                    })
            }
        },
        []
    )

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <SurvivorContext.Provider
            value={{ survivor, update, navigate, isEditPage }}
        >
            {children}
        </SurvivorContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useSurvivor = () => useContext(SurvivorContext)

