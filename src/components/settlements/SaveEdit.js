import { useNavigate } from "react-router-dom"
import { createAchievedMilestone, createSettlementInventory, deleteAchievedMilestones, deleteSettlementInventory, editSettlement, editSettlementInventory } from "../ApiManager"

export const SaveEdit = ({ settlement, settlementId, filteredInventory, settlementInventory, achievedMilestones, findAchievedMilestone }) => {

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const findOldInventory = () => {
        const oldInventory = settlementInventory.filter((item) => { return item.settlementId === parseInt(settlementId) })
        return oldInventory
    }

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        editSettlement(settlementId, settlement)
        const oldInventory = findOldInventory()
        const existingItems = filteredInventory.filter((settlementItem) => oldInventory.some((item) => item.resourceId === settlementItem.resourceId))
        const newItems = filteredInventory.filter((settlementItem) => !oldInventory.some((item) => item.resourceId === settlementItem.resourceId))
        const removedItems = oldInventory.filter((item) => !filteredInventory.some((settlementItem) => settlementItem.resourceId === item.resourceId))
        if (existingItems) {
            existingItems.map((existingItem) => {
                editSettlementInventory(existingItem);
            })
        }
        if (newItems) {
            newItems.map((newItem) => {
                newItem.settlementId = parseInt(settlementId)
                createSettlementInventory(newItem);
            })
        }
        if (removedItems) {
            removedItems.map((removedItem) => {
                deleteSettlementInventory(removedItem);
            })
        }


        achievedMilestones.map((achievedMilestone) => {
            if (findAchievedMilestone(achievedMilestone.milestoneId) && achievedMilestone.reached) {
            } else if (findAchievedMilestone(achievedMilestone.milestoneId)) {
                deleteAchievedMilestones(achievedMilestone)
            } else if (achievedMilestone.reached) {
                createAchievedMilestone(achievedMilestone)
            } else {
            }
        })
        navigate("/")
    }

    return <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
        Submit Settlement
    </button>
}