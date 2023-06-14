import { useNavigate } from "react-router-dom"
import { createAchievedMilestone, createSettlementEvents, createSettlementInventory, deleteAchievedMilestones, deleteSettlementEvents, deleteSettlementInventory, editSettlement, editSettlementEvents, editSettlementInventory } from "../ApiManager"

export const SaveEdit = ({ settlement, settlementId, settlementInventory, achievedMilestones, findAchievedMilestone, filteredEvents, settlementEvents }) => {

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const findOldSEvents = () => {
        const oldSEvents = settlementEvents.filter((sEvent) => { return sEvent.settlementId === parseInt(settlementId) })
        return oldSEvents
    }

    const saveSEvents = () => {
        const oldSEvents = findOldSEvents()
        const currentEvents = filteredEvents.filter((fEvent) => oldSEvents.some((sEvent) => sEvent.year === fEvent.year))
        const newEvents = filteredEvents.filter((fEvent) => !oldSEvents.some((sEvent) => sEvent.year === fEvent.year))
        const removedEvents = oldSEvents.filter((sEvent) => sEvent.eventId === 0)
        if (currentEvents) {
            currentEvents.forEach((currentEvent) => {
                editSettlementEvents(currentEvent)
            })
        }
        if (newEvents) {
            newEvents.forEach((newEvent) => {
                newEvent.settlementId = settlementId
                createSettlementEvents(newEvent)
            })
        }
        if (removedEvents) {
            removedEvents.forEach((removedEvent) => {
                deleteSettlementEvents(removedEvent)
            })
        }
    }

    const saveSInventory = () => {
        const existingItems = settlementInventory.filter((settlementItem) => settlementItem.hasOwnProperty('id') && settlementItem.amount !== 0)
        const newItems = settlementInventory.filter((settlementItem) => !settlementItem.hasOwnProperty('id'))
        const removedItems = settlementInventory.filter((settlementItem) => settlementItem.amount === 0)
        if (existingItems) {
            existingItems.forEach((existingItem) => {
                editSettlementInventory(existingItem);
            })
        }
        if (newItems) {
            newItems.forEach((newItem) => {
                newItem.settlementId = parseInt(settlementId)
                createSettlementInventory(newItem);
            })
        }
        if (removedItems) {
            removedItems.forEach((removedItem) => {
                deleteSettlementInventory(removedItem);
            })
        }
    }

    const saveAchievedMilestones = () => {
        achievedMilestones.forEach((achievedMilestone) => {
            if (findAchievedMilestone(achievedMilestone.milestoneId) && achievedMilestone.reached) {
            } else if (findAchievedMilestone(achievedMilestone.milestoneId)) {
                deleteAchievedMilestones(achievedMilestone)
            } else if (achievedMilestone.reached) {
                createAchievedMilestone(achievedMilestone)
            } else {
            }
        })
}

const handleSaveButtonClick = async (event) => {
    event.preventDefault()

    await editSettlement(settlementId, settlement)
    saveSEvents()
    saveSInventory()
    saveAchievedMilestones()
    navigate("/")
}

return <button
    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="btn btn-primary">
    Submit Settlement
</button>
}