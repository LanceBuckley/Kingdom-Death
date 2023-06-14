import { useNavigate } from "react-router-dom"
import { createAchievedMilestone, createSettlementEvents, createSettlementInventory, deleteAchievedMilestones, deleteSettlementEvents, deleteSettlementInventory, editSettlement, editSettlementEvents, editSettlementInventory } from "../ApiManager"

export const SaveEdit = ({ settlement, settlementId, settlementInventory, achievedMilestones, settlementEvents }) => {

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const saveSEvents = async () => {
        const currentEvents = settlementEvents.filter((sEvent) => sEvent.hasOwnProperty('id') && sEvent.eventId !== 0)
        const newEvents = settlementEvents.filter((sEvent) => !sEvent.hasOwnProperty('id'))
        const removedEvents = settlementEvents.filter((sEvent) => sEvent.eventId === 0)
        for (const currentEvent of currentEvents) {
            await editSettlementEvents(currentEvent);
          }
        
          for (const newEvent of newEvents) {
            newEvent.settlementId = settlementId;
            await createSettlementEvents(newEvent);
          }
        
          for (const removedEvent of removedEvents) {
            await deleteSettlementEvents(removedEvent);
          }
    }

    const saveSInventory = async () => {
        const existingItems = settlementInventory.filter((settlementItem) => settlementItem.hasOwnProperty('id') && settlementItem.amount !== 0)
        const newItems = settlementInventory.filter((settlementItem) => !settlementItem.hasOwnProperty('id'))
        const removedItems = settlementInventory.filter((settlementItem) => settlementItem.amount === 0)
        for (const existingItem of existingItems) {
            await editSettlementInventory(existingItem)
        }

        for (const newItem of newItems) {
            newItem.settlementId = parseInt(settlementId)
            await createSettlementInventory(newItem)
        }

        for (const removedItem of removedItems) {
            await deleteSettlementInventory(removedItem)
        }
    }

    const saveAchievedMilestones = async () => {
        const removedMilestones = achievedMilestones.filter((achievedMilestone) => achievedMilestone.hasOwnProperty('id') && achievedMilestone.reached === false)
        const newMilestones = achievedMilestones.filter((achievedMilestone) => !achievedMilestone.hasOwnProperty('id') && achievedMilestone.reached === true)
        for (const removedMilestone of removedMilestones) {
            await deleteAchievedMilestones(removedMilestone)
        }
        for (const newMilestone of newMilestones) {
            await createAchievedMilestone(newMilestone)
        }
    }

    const handleSaveButtonClick = async (event) => {
        event.preventDefault()

        await editSettlement(settlementId, settlement)
        await saveSEvents()
        await saveSInventory()
        await saveAchievedMilestones()
        navigate("/")
    }

    return <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
        Submit Settlement
    </button>
}