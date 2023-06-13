import { useNavigate } from "react-router-dom"
import { createAchievedMilestone, createSettlementEvents, createSettlementInventory, deleteAchievedMilestones, deleteSettlementEvents, deleteSettlementInventory, editSettlement, editSettlementEvents, editSettlementInventory } from "../ApiManager"

export const SaveEdit = ({ settlement, settlementId, filteredInventory, settlementInventory, achievedMilestones, findAchievedMilestone, filteredEvents, settlementEvents }) => {

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const findOldInventory = () => {
        const oldInventory = settlementInventory.filter((item) => { return item.settlementId === parseInt(settlementId) })
        return oldInventory
    }

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
            currentEvents.map((currentEvent) => {
                editSettlementEvents(currentEvent)
            })
        }
        if (newEvents) {
            newEvents.map((newEvent) => {
                newEvent.settlementId = settlementId
                createSettlementEvents(newEvent)
            })
        }
        if (removedEvents) {
            removedEvents.map((removedEvent) => {
                deleteSettlementEvents(removedEvent)
            })
        }
    }

    const saveSInventory = () => {
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
    }

    const saveAchievedMilestones = () => {
        achievedMilestones.map((achievedMilestone) => {
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