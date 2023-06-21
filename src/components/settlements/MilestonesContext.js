import { createContext, useContext, useEffect, useState } from "react"
import { getAchievedMilestones, getMilestones } from "../ApiManager"
import { useSettlementForm } from "./SettlementFormContext"

// Create the context variable using createContext
const MilestonesContext = createContext()

export const MilestonesProvider = ({ children }) => {

    const { isEditPage, settlementId } = useSettlementForm()

    const [milestones, setMilestones] = useState([])
    const [storedMilestones, setStoredMilestones] = useState([])
    const [milestoneObject, setMilestoneObject] = useState({
        milestoneId: 0,
        reached: false
    })


    useEffect(
        () => {
            getMilestones()
                .then((milestones) => {
                    setMilestones(milestones)
                })
        },
        []
    )

    useEffect(
        () => {
            if (isEditPage) {
                getAchievedMilestones(settlementId)
                    .then((storedMilestones) => {
                        setStoredMilestones(storedMilestones)
                    })
            }
        },
        []
    )

    const handleChange = (evt) => {
        const milestone = { ...milestoneObject }
        milestone.milestoneId = parseInt(evt.target.value)
        milestone.reached = evt.target.checked
        const copy = [...storedMilestones]
        const updatedMilestone = copy.find((oldMilestone) => oldMilestone.milestoneId === parseInt(evt.target.value))
        if (updatedMilestone) {
            updatedMilestone.milestoneId = milestone.milestoneId
            updatedMilestone.reached = milestone.reached
        } else {
            copy.push(milestone)
        }
        setStoredMilestones(copy)
    }


    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <MilestonesContext.Provider
            value={{ handleChange, milestones, storedMilestones }}
        >
            {children}
        </MilestonesContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useMilestones = () => useContext(MilestonesContext)

