import { useNavigate } from "react-router-dom"
import { createAchievedMilestone, createSettlement, createSettlementEvents, createSettlementInventory } from "../ApiManager"

export const Save = ({ settlement, settlementInventory, achievedMilestones, settlementEvents }) => {

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const saveInventory = (newSettlement) => {
            settlementInventory.forEach((settlementItem) => {
                settlementItem.settlementId = newSettlement.id
                createSettlementInventory(settlementItem)
            })
        }

        const saveEvents = (newSettlement) => {
            settlementEvents.forEach((settlementEvent) => {
                settlementEvent.settlementId = newSettlement.id
                createSettlementEvents(settlementEvent)
            })
        }

        const saveAchievedMilestones = (newSettlement) => {
            achievedMilestones.forEach((achievedMilestone) => {
                if (achievedMilestone.reached === true) {
                    achievedMilestone.settlementId = newSettlement.id
                    createAchievedMilestone(achievedMilestone)
                }
            })
        }

        // This posts/adds the new settlement to the list of settlements in the database and then reroutes the user to /
        createSettlement(settlement)
            .then((newSettlement) => {
                saveInventory(newSettlement)
                saveEvents(newSettlement)
                saveAchievedMilestones(newSettlement)
            }).then(
                navigate("/")
            )
    }

    return <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
        Submit Settlement
    </button>
}