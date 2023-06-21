import { createContext, useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { deleteSettlement, getSettlementToEdit } from "../../ApiManager"

// Create the context variable using createContext
const SettlementFormContext = createContext()

export const SettlementFormProvider = ({ children }) => {

    const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)

    const location = useLocation()
    const { settlementId } = useParams()
    const navigate = useNavigate()

    const isEditPage = location.pathname === `/settlement/${settlementId}`

    // This defines the settlement state object and allows it to be updated using update
    const [settlement, update] = useState({
        name: "",
        survivalLimit: 0,
        population: 0,
        userId: deathUserObject.id
    })

    const deleteButton = () => {
        return <button onClick={() =>
            deleteSettlement(parseInt(settlementId))
                .then(navigate("/"))
        }>Delete</button>
    }

    useEffect(
        () => {
            if (isEditPage) {
                getSettlementToEdit(settlementId)
                    .then((settlementToEdit) => {
                        update(settlementToEdit)
                    })
            }
        },
        []
    )

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <SettlementFormContext.Provider
            value={{ settlement, update, settlementId, isEditPage, navigate, deleteButton }}
        >
            {children}
        </SettlementFormContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useSettlementForm = () => useContext(SettlementFormContext)

