import { useNavigate } from "react-router-dom"
import { createAchievedMilestone, createSettlement, createSettlementEvents, createSettlementInventory } from "../ApiManager"

export const Save = ({settlement, settlementInventory, achievedMilestones, settlementEvents }) => {

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        debugger
        event.preventDefault()

        // This posts/adds the new settlement to the list of settlements in the database and then reroutes the user to /
        createSettlement(settlement)
            .then((newSettlement) => {
                settlementInventory.map((settlementItem) => {
                    settlementItem.settlementId = newSettlement.id
                    createSettlementInventory(settlementItem)
                })
                debugger
                settlementEvents.map((settlementEvent) => {
                    settlementEvent.settlementId = newSettlement.id
                    createSettlementEvents(settlementEvent)
                })
                achievedMilestones.map((achievedMilestone) => {
                    if (achievedMilestone.reached === true) {
                        achievedMilestone.settlementId = newSettlement.id
                        createAchievedMilestone(achievedMilestone)
                    }
                })
            })
        navigate("/")
    }

    return <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
        Submit Settlement
    </button>
}