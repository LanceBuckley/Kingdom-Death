import { useNavigate } from "react-router-dom"
import { createAchievedMilestone, createSettlementEvents, createSettlementInventory, deleteAchievedMilestones, deleteSettlementEvents, deleteSettlementInventory, editSettlement, editSettlementEvents, editSettlementInventory } from "../ApiManager"

export const SaveEdit = ({ settlement, settlementId, settlementInventory, achievedMilestones, settlementEvents }) => {

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const saveSEvents = () => {
        const currentEvents = settlementEvents.filter((sEvent) => sEvent.hasOwnProperty('id') && sEvent.eventId !== 0)
        const newEvents = settlementEvents.filter((sEvent) => !sEvent.hasOwnProperty('id'))
        const removedEvents = settlementEvents.filter((sEvent) => sEvent.eventId === 0)
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
        const removedMilestones = achievedMilestones.filter((achievedMilestone) => achievedMilestone.hasOwnProperty('id') && achievedMilestone.reached === false)
        const newMilestones = achievedMilestones.filter((achievedMilestone) => !achievedMilestone.hasOwnProperty('id') && achievedMilestone.reached === true)
        if (removedMilestones) {
            removedMilestones.forEach((removedMilestone) => {
                deleteAchievedMilestones(removedMilestone)
            })
        }
        if (newMilestones) {
            newMilestones.forEach((newMilestone) => {
                createAchievedMilestone(newMilestone)
            })
        }
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